import { LOCALES, SITE_ORIGIN, UI_COPY, localePath } from "../data/site-data.mjs";

export function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function brandLogoSvg(className = "brand-emblem") {
  return `<svg class="${className}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#0D1B2E"/>
    <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" stroke="#294A78" stroke-width="1.5"/>
    <path d="M12 18L29 30" stroke="#60A5FA" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M10 32H28" stroke="#93C5FD" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M12 46L29 34" stroke="#60A5FA" stroke-width="2.6" stroke-linecap="round"/>
    <polygon points="32,19 41,25.5 41,38.5 32,45 23,38.5 23,25.5" fill="#08111D" stroke="#1D5BFF" stroke-width="2.6"/>
    <circle cx="32" cy="32" r="3.6" fill="#34D399"/>
    <path d="M41 32H53M53 32L48 27M53 32L48 37" stroke="#F3F7FC" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

export function renderLayout({ lang, routeSlug, title, description, bodyHtml }) {
  const ui = UI_COPY[lang];
  const canonicalUrl = `${SITE_ORIGIN}${localePath(routeSlug, lang)}`;

  const hreflangs = LOCALES.map(
    (loc) => `<link rel="alternate" hreflang="${loc}" href="${SITE_ORIGIN}${localePath(routeSlug, loc)}">`
  ).join("\n  ");

  const fontPreloads =
    lang === "fa"
      ? `<link rel="preload" href="/fonts/YekanBakh-VF.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/IRANYekanXVF.woff2" as="font" type="font/woff2" crossorigin>`
      : lang === "ar"
      ? `<link rel="preload" href="/fonts/IBMPlexSansArabic-arabic-0.woff2" as="font" type="font/woff2" crossorigin>`
      : `<link rel="preload" href="/fonts/PlusJakartaSans-latin-1.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/Inter-Normal-latin.woff2" as="font" type="font/woff2" crossorigin>`;

  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Leadvium",
    url: SITE_ORIGIN,
    description:
      "Autonomous B2B Lead Generation, 14-Page Diagnostic Intelligence & Done-For-You Multi-Channel Outbound Revenue Engineering.",
    areaServed: ["AE", "SA", "QA", "OM", "EU", "JP", "SG"],
    knowsLanguage: ["en", "fa", "ar"]
  });

  const navLinksDesktop = ui.nav
    .map((item) => {
      const active = item.slug === routeSlug ? " is-active" : "";
      return `<a href="${localePath(item.slug, lang)}" class="nav-item${active}">${esc(item.label)}</a>`;
    })
    .join("");

  const navLinksMobile = ui.nav
    .map((item) => {
      const active = item.slug === routeSlug ? " is-active" : "";
      return `<a href="${localePath(item.slug, lang)}" class="mobile-nav-link${active}">${esc(item.label)}</a>`;
    })
    .join("");

  const langSwitchHtml = [
    { code: "en", label: "EN", isLatin: true },
    { code: "fa", label: "فا", isLatin: false },
    { code: "ar", label: "عر", isLatin: false }
  ]
    .map((l) => {
      const active = l.code === lang ? " is-active" : "";
      const cls = l.isLatin ? " ltr-code" : "";
      return `<a href="${localePath(routeSlug, l.code)}" class="lang-pill${active}${cls}" dir="${
        l.isLatin ? "ltr" : "rtl"
      }" aria-label="${esc(UI_COPY[l.code].langName)}">${l.label}</a>`;
    })
    .join("");

  const lightboxCloseText = lang === "fa" ? "بستن بزرگ‌نمایی" : lang === "ar" ? "إغلاق العرض" : "Close Preview";

  return `<!DOCTYPE html>
<html lang="${ui.langCode}" dir="${ui.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangs}
  <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${localePath(routeSlug, "en")}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#08111D">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(ui.brandName)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${SITE_ORIGIN}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE_ORIGIN}/og-image.png">
  ${fontPreloads}
  <link rel="stylesheet" href="/css/styles.css">
  <script type="application/ld+json">${schemaOrg}</script>
</head>
<body>
  <a href="#main-content" class="skip-link">${esc(ui.skipToContent)}</a>
  <div id="scroll-laser" class="scroll-laser" aria-hidden="true"></div>

  <header class="site-header">
    <div class="lv-container header-inner">
      <a href="${localePath("/", lang)}" class="brand-link">
        ${brandLogoSvg()}
        <span>${esc(ui.brandName)}</span>
      </a>

      <nav class="desktop-nav" aria-label="${esc(ui.menuLabel)}">
        ${navLinksDesktop}
      </nav>

      <div class="header-controls">
        <div class="lang-switcher" role="group" aria-label="Language">
          ${langSwitchHtml}
        </div>
        <a href="${localePath("/start/", lang)}" class="btn-primary btn-sm header-cta-desktop" data-magnetic>${esc(
    ui.primaryCta
  )}</a>
        <button type="button" id="mobile-menu-toggle" class="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="${esc(
          ui.menuLabel
        )}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div id="mobile-drawer" class="mobile-drawer" hidden>
      <nav class="mobile-nav-list" aria-label="${esc(ui.menuLabel)}">
        ${navLinksMobile}
      </nav>
      <a href="${localePath("/start/", lang)}" class="btn-primary">${esc(ui.primaryCta)}</a>
    </div>
  </header>

  <main id="main-content">
    ${bodyHtml}
  </main>

  <div id="studio-lightbox" class="lightbox-backdrop" role="dialog" aria-modal="true" hidden>
    <div class="lightbox-panel">
      <div class="lightbox-top">
        <strong id="studio-lightbox-title"></strong>
        <button type="button" id="studio-lightbox-close" class="btn-ghost-dark btn-sm">${esc(lightboxCloseText)}</button>
      </div>
      <img id="studio-lightbox-img" src="/assets/screens/studio-analytics.webp" alt="">
    </div>
  </div>

  <footer class="site-footer">
    <div class="lv-container">
      <div class="footer-grid">
        <div>
          <a href="${localePath("/", lang)}" class="brand-link">
            ${brandLogoSvg()}
            <span>${esc(ui.brandName)}</span>
          </a>
          <p class="lead-prose" style="font-size:0.93rem;margin-top:14px">${esc(ui.footer.statement)}</p>
          <div class="footer-status-pill">
            <span class="pulse-dot"></span>
            <span>${esc(ui.footer.operationalBadge)}</span>
          </div>
        </div>

        <div>
          <div class="footer-col-title">${esc(ui.footer.colEngine)}</div>
          <ul class="footer-links">
            ${ui.footer.linksEngine
              .map((l) => `<li><a href="${localePath(l.slug.split("#")[0] || "/", lang)}${l.slug.includes("#") ? "#" + l.slug.split("#")[1] : ""}">${esc(l.label)}</a></li>`)
              .join("")}
          </ul>
        </div>

        <div>
          <div class="footer-col-title">${esc(ui.footer.colCommercial)}</div>
          <ul class="footer-links">
            ${ui.footer.linksCommercial
              .map((l) => `<li><a href="${localePath(l.slug.split("#")[0] || "/", lang)}${l.slug.includes("#") ? "#" + l.slug.split("#")[1] : ""}">${esc(l.label)}</a></li>`)
              .join("")}
          </ul>
        </div>

        <div>
          <div class="footer-col-title">${esc(ui.footer.colGovernance)}</div>
          <ul class="footer-links">
            ${ui.footer.linksGovernance
              .map((l) => `<li><a href="${localePath(l.slug.split("#")[0] || "/", lang)}${l.slug.includes("#") ? "#" + l.slug.split("#")[1] : ""}">${esc(l.label)}</a></li>`)
              .join("")}
          </ul>
        </div>
      </div>

      <div class="footer-monument">
        <div style="font-size:0.86rem;color:var(--muted-on-dark)">${esc(ui.footer.rights)}</div>
        <div class="footer-wordmark-giant ltr-code" dir="ltr" aria-hidden="true">LEADVIUM</div>
      </div>
    </div>
  </footer>

  <script src="/vendor/motion-bundle.min.js" defer></script>
  <script src="/js/signal-canvas.js" defer></script>
  <script src="/js/interactive.js" defer></script>
  <script src="/js/motion.js" defer></script>
</body>
</html>`;
}
