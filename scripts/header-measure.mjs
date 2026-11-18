#!/usr/bin/env node
// Header crowding probe: measures .site-header children at desktop widths
// against the built dist/ on ubuntu-dev. Prints widths/heights + saves a
// 1919px screenshot per route. Usage: node scripts/header-measure.mjs
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("/home/hamid/github/meridian-site/node_modules/playwright");

const ROOT = "/home/hamid/github/leadvium-site";
const DIST = path.join(ROOT, "dist");
const OUT = "/tmp/leadvium-header-shots";
fs.mkdirSync(OUT, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
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
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

const ROUTES = ["/", "/fa/", "/ar/pricing/"];
const WIDTHS = [1919, 1600, 1440, 1366, 1280, 1152];

const { server, port } = await startStaticServer();
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"]
});
let fail = 0;
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 998 } });
  for (const route of ROUTES) {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle", timeout: 30000 });
    const m = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const r = (el) => el ? { w: el.offsetWidth, h: el.offsetHeight, sw: el.scrollWidth, text: (el.textContent || "").trim().slice(0, 40) } : null;
      const cta = q(".header-cta-desktop");
      const pill = [...document.querySelectorAll(".lang-pill")].find((p) => p.textContent.trim() === "EN");
      return {
        docScrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        header: r(q(".header-inner")),
        brand: r(q(".brand-link")),
        nav: r(q(".desktop-nav")),
        controls: r(q(".header-controls")),
        switcher: r(q(".lang-switcher")),
        pillEN: r(pill),
        cta: r(cta),
        // Line count via Range rects: the old height/line-height ratio
        // rounded a 37px single-line button (16px padding + ~19px text)
        // to "2 lines" — a false positive.
        ctaLines: cta ? (() => { const range = document.createRange(); range.selectNodeContents(cta); return range.getClientRects().length; })() : null
      };
    });
    const overflow = m.docScrollW - m.innerW;
    // Pill stacked (E over N) = narrow (~25px) and tall (~49px). A single-line
    // pill is ~33px wide; FA pages render it ~31px tall (font metrics), which
    // is fine — only flag a genuinely stacked pill.
    const pillBad = m.pillEN && (m.pillEN.w < 30 || m.pillEN.h > 40);
    const bad = overflow > 0 || pillBad || (m.ctaLines && m.ctaLines > 1);
    if (bad) fail++;
    console.log(`${width}px ${route} overflow=${overflow} headerW=${m.header?.w} navW=${m.nav?.w} controlsW=${m.controls?.w} pillEN=${m.pillEN?.w}x${m.pillEN?.h} cta=${m.cta?.w}x${m.cta?.h} lines=${m.ctaLines} ${bad ? "BAD" : "ok"}`);
    if (width === 1919) {
      await page.screenshot({ path: `${OUT}/header-${route.replaceAll("/", "_") || "root"}.png` });
    }
  }
  await page.close();
}
await browser.close();
server.close();
console.log(fail === 0 ? "HEADER MEASURE OK" : `HEADER MEASURE: ${fail} bad combos`);
process.exit(fail === 0 ? 0 : 1);
