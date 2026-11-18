#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const errors = [];
const fail = (msg) => errors.push(msg);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function resolveInternalUrl(rawUrl) {
  const clean = rawUrl.split("#")[0].split("?")[0];
  if (!clean || !clean.startsWith("/")) return true;
  if (clean.startsWith("/api/")) return true;
  const direct = path.join(DIST, clean);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
  const asIndex = path.join(DIST, clean.replace(/^\/+/, ""), "index.html");
  if (fs.existsSync(asIndex)) return true;
  const asHtml = path.join(DIST, clean.replace(/^\/+/, "") + ".html");
  if (fs.existsSync(asHtml)) return true;
  return false;
}

function stripNonProseForFaAudit(html) {
  const bodyMatch = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html);
  let s = bodyMatch ? bodyMatch[1] : html;
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<svg\b[\s\S]*?<\/svg>/gi, " ");
  s = s.replace(/<([a-z0-9]+)\b[^>]*class="[^"]*\bltr-code\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, " ");
  s = s.replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, " ");
  s = s.replace(/<input\b[^>]*>/gi, " ");
  s = s.replace(/<textarea\b[^>]*>[\s\S]*?<\/textarea>/gi, " ");
  s = s.replace(/<[^>]+>/g, " ");
  s = s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, " ");
  return s;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error("dist/ does not exist. Run npm run build first.");
    process.exit(1);
  }

  // 1. Ensure functions/ never leaked into dist/
  if (fs.existsSync(path.join(DIST, "functions"))) {
    fail("dist/functions exists! Cloudflare Pages Functions must stay at repo root.");
  }

  // 2. Mandatory artifacts check
  const required = [
    "_headers",
    "_redirects",
    "robots.txt",
    "manifest.webmanifest",
    "favicon.svg",
    "og-image.png",
    "sitemap.xml",
    "404.html",
    "index.html",
    "fa/index.html",
    "ar/index.html",
    "engine/index.html",
    "fa/engine/index.html",
    "ar/engine/index.html",
    "platform/index.html",
    "fa/platform/index.html",
    "ar/platform/index.html",
    "solutions/index.html",
    "fa/solutions/index.html",
    "ar/solutions/index.html",
    "pricing/index.html",
    "fa/pricing/index.html",
    "ar/pricing/index.html",
    "trust/index.html",
    "fa/trust/index.html",
    "ar/trust/index.html",
    "work/index.html",
    "fa/work/index.html",
    "ar/work/index.html",
    "start/index.html",
    "fa/start/index.html",
    "ar/start/index.html",
    "fonts/YekanBakh-VF.woff2",
    "fonts/IRANYekanXVF.woff2",
    "vendor/motion-bundle.min.js"
  ];
  for (const rel of required) {
    if (!fs.existsSync(path.join(DIST, rel))) {
      fail(`Missing required artifact: dist/${rel}`);
    }
  }

  const allFiles = walk(DIST);
  const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
  const cssFiles = allFiles.filter((f) => f.endsWith(".css"));

  // 3. CSS zero initial opacity:0 trap check (FIX #1)
  for (const f of cssFiles) {
    const txt = fs.readFileSync(f, "utf8");
    for (const block of txt.matchAll(/([^{}]+)\{([^{}]*opacity\s*:\s*0\s*[;}][^{}]*)\}/gi)) {
      const sel = block[1].trim();
      if (!sel.includes(".hp-field")) {
        fail(`CSS initial opacity:0 trap detected in ${path.relative(DIST, f)} -> ${sel}`);
      }
    }
  }

  // 4. HTML link integrity, SVG filter ban, and /fa/ Persian prose & numeral audit
  for (const f of htmlFiles) {
    const rel = path.relative(DIST, f);
    const html = fs.readFileSync(f, "utf8");

    if (/<feTurbulence|<feDisplacementMap/i.test(html)) {
      fail(`Banned heavy SVG filter in ${rel}`);
    }

    for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const val = m[1];
      if (!val.startsWith("/") || val.startsWith("//")) continue;
      if (!resolveInternalUrl(val)) {
        fail(`Broken internal URL "${val}" in ${rel}`);
      }
    }

    if (rel === "fa/index.html" || rel.startsWith("fa/")) {
      const prose = stripNonProseForFaAudit(html);
      const latinDigits = prose.match(/[0-9]+/g);
      if (latinDigits) {
        fail(`Latin digits found in Persian route ${rel}: ${latinDigits.slice(0, 6).join(", ")}`);
      }
      const englishLeaks = prose.match(/[A-Za-z]{2,}/g);
      if (englishLeaks) {
        fail(`English word leaks found in Persian route ${rel}: ${englishLeaks.slice(0, 8).join(", ")}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("BUILD VERIFICATION FAILED:");
    for (const e of errors) console.error(" - " + e);
    process.exit(1);
  }

  console.log(`VERIFY OK: ${htmlFiles.length} HTML routes, 0 broken links, 0 opacity traps, 0 /fa/ leaks or Latin digits.`);
}

main();
