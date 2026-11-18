#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LOCALES, SITE_ORIGIN, localePath } from "../src/data/site-data.mjs";
import { renderLayout } from "../src/templates/layout.mjs";
import {
  render404Page,
  renderEnginePage,
  renderHomePage,
  renderPlatformPage,
  renderPricingPage,
  renderSolutionsPage,
  renderStartPage,
  renderTrustPage,
  renderWorkPage
} from "../src/templates/pages.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const ROUTES = [
  { slug: "/", render: renderHomePage, priority: "1.0" },
  { slug: "/engine/", render: renderEnginePage, priority: "0.9" },
  { slug: "/platform/", render: renderPlatformPage, priority: "0.9" },
  { slug: "/solutions/", render: renderSolutionsPage, priority: "0.9" },
  { slug: "/pricing/", render: renderPricingPage, priority: "0.9" },
  { slug: "/trust/", render: renderTrustPage, priority: "0.8" },
  { slug: "/work/", render: renderWorkPage, priority: "0.8" },
  { slug: "/start/", render: renderStartPage, priority: "0.9" }
];

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function writeRouteHtml(urlPath, html) {
  const rel = urlPath === "/" ? "index.html" : path.join(urlPath.replace(/^\/+|\/+$/g, ""), "index.html");
  const full = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, "utf8");
}

function buildSitemap() {
  const entries = [];
  for (const r of ROUTES) {
    for (const loc of LOCALES) {
      const url = `${SITE_ORIGIN}${localePath(r.slug, loc)}`;
      const alternates = LOCALES.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt}" href="${SITE_ORIGIN}${localePath(r.slug, alt)}" />`
      ).join("\n");
      entries.push(`  <url>
    <loc>${url}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${localePath(r.slug, "en")}" />
    <priority>${r.priority}</priority>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  // 1. Copy static assets, CSS, and JS
  copyDir(path.join(ROOT, "src/static"), DIST);
  copyDir(path.join(ROOT, "src/css"), path.join(DIST, "css"));
  copyDir(path.join(ROOT, "src/js"), path.join(DIST, "js"));

  // 2. Render 24 localized pages
  let count = 0;
  for (const r of ROUTES) {
    for (const lang of LOCALES) {
      const pageData = r.render(lang);
      const html = renderLayout({
        lang,
        routeSlug: r.slug,
        title: pageData.title,
        description: pageData.description,
        bodyHtml: pageData.bodyHtml
      });
      writeRouteHtml(localePath(r.slug, lang), html);
      count++;
    }
  }

  // 3. Render 404.html
  const notFound = render404Page();
  const html404 = renderLayout({
    lang: "en",
    routeSlug: "/",
    title: notFound.title,
    description: notFound.description,
    bodyHtml: notFound.bodyHtml
  });
  fs.writeFileSync(path.join(DIST, "404.html"), html404, "utf8");

  // 4. Write sitemap.xml
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap(), "utf8");

  console.log(`Built ${count} localized HTML pages + 404.html + sitemap.xml into dist/`);
}

main();
