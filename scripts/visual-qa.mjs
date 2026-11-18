#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("/home/hamid/github/meridian-site/node_modules/playwright");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const QA_OUT = "/tmp/leadvium-qa-shots";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json"
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = (req.url || "/").split("?")[0];
      if (urlPath === "/api/intake" && req.method === "POST") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, referenceId: "LV-QA-VERIFIED" }));
        return;
      }
      let target = path.join(DIST, urlPath);
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        target = path.join(target, "index.html");
      } else if (!fs.existsSync(target) && fs.existsSync(target + ".html")) {
        target = target + ".html";
      }
      if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(target);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(target).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

const ROUTES_TO_CHECK = [
  "/",
  "/engine/",
  "/platform/",
  "/solutions/",
  "/pricing/",
  "/trust/",
  "/work/",
  "/start/",
  "/fa/",
  "/fa/engine/",
  "/fa/platform/",
  "/fa/solutions/",
  "/fa/pricing/",
  "/fa/trust/",
  "/fa/work/",
  "/fa/start/",
  "/ar/",
  "/ar/pricing/",
  "/ar/start/"
];

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 }
];

(async () => {
  fs.mkdirSync(QA_OUT, { recursive: true });
  const { server, port } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;
  const defects = [];

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
  });

  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();

      const consoleErrs = [];
      page.on("pageerror", (e) => consoleErrs.push(e.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrs.push(msg.text());
      });

      for (const route of ROUTES_TO_CHECK) {
        consoleErrs.length = 0;
        await page.goto(baseUrl + route, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);

        // Studio screenshots live in lazy-loaded, hidden tab panels: the
        // browser never fetches them until their tab is activated, so a
        // bare naturalWidth check flags healthy images as broken. Activate
        // every tab first so the check measures real load failures.
        const tabBtns = await page.$$(".studio-tab-btn");
        for (const btn of tabBtns) {
          await btn.click().catch(() => {});
          await page.waitForTimeout(250);
        }
        if (tabBtns.length > 0) await page.waitForTimeout(200);

        const metrics = await page.evaluate(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const imgs = Array.from(document.querySelectorAll("img"));
          const brokenImgs = imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src);
          return { docW, winW, brokenImgs };
        });

        if (metrics.docW > metrics.winW) {
          defects.push(`${vp.name} ${route}: Horizontal overflow scrollWidth=${metrics.docW} > innerWidth=${metrics.winW}`);
        }
        if (metrics.brokenImgs.length > 0) {
          defects.push(`${vp.name} ${route}: Broken images: ${metrics.brokenImgs.join(", ")}`);
        }
        if (consoleErrs.length > 0) {
          defects.push(`${vp.name} ${route}: Console errors: ${consoleErrs.join(" | ")}`);
        }

        // Save key eye-check screenshots
        if (["/", "/fa/", "/ar/", "/pricing/", "/fa/pricing/", "/platform/", "/start/", "/fa/start/"].includes(route)) {
          const slug = route === "/" ? "en-home" : route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
          await page.screenshot({
            path: path.join(QA_OUT, `${slug}-${vp.name}.png`),
            fullPage: false
          });
        }
      }

      // E2E test the /fa/start/ brief submission flow
      await page.goto(baseUrl + "/fa/start/", { waitUntil: "networkidle" });
      await page.fill("#bf-company", "شرکت نمونه صادراتی پارس");
      await page.fill("#bf-email", "export@example.com");
      await page.fill("#bf-product", "صادرات پسته و زعفران به امارات و اروپا");
      await page.click("#brief-submit-btn");
      await page.waitForTimeout(250);
      const receiptVisible = await page.evaluate(() => {
        const el = document.getElementById("brief-receipt-box");
        return Boolean(el && !el.hasAttribute("hidden"));
      });
      if (!receiptVisible) {
        defects.push(`${vp.name} /fa/start/: Receipt card did not appear on valid brief submission`);
      }

      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (defects.length > 0) {
    console.error("VISUAL QA NO-GO:");
    for (const d of defects) console.error(" - " + d);
    process.exit(1);
  }

  console.log(`VISUAL QA GO: ${ROUTES_TO_CHECK.length * VIEWPORTS.length} route-viewports passed (1440px & 390px, 0px overflow, 0 errors). Screenshots in ${QA_OUT}`);
})();
