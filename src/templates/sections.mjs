import { PRICING_TIERS, fmtNum, localePath } from "../data/site-data.mjs";
import { PIPELINE_STAGES, STUDIO_SCREENS } from "../data/engine-data.mjs";
import { esc } from "./layout.mjs";

export function renderPipelineDeck(lang) {
  const stages = PIPELINE_STAGES[lang];
  const L = {
    en: {
      kicker: "6-Stage Autonomous Revenue Pipeline",
      title: "From raw registry signal to a warm buyer in your Unibox.",
      sub: "Click any stage to inspect the live Python modules, verification gates, and concrete deliverables running inside your isolated workspace.",
      outHeading: "Stage Deliverables & Verified Outputs",
      deepCta: "Inspect Full Technical Architecture"
    },
    fa: {
      kicker: "پایپ‌لاین ۶ مرحله‌ای کشف و مذاکره خودکار",
      title: "از سیگنال خام رجیستری تا مشتری آماده قرارداد در صندوق واحد.",
      sub: "روی هر مرحله کلیک کنید تا ماژول‌های فنی، گیت‌های صحت‌سنجی و خروجی‌های دقیق همان گام را در فضای کاری ایزوله کسب‌وکارتان ببینید.",
      outHeading: "خروجی‌های مستند و تحویلی این مرحله",
      deepCta: "بررسی کامل معماری فنی موتور"
    },
    ar: {
      kicker: "مسار الإيرادات الذاتي من 6 مراحل",
      title: "من إشارات السجلات التجارية إلى مشترٍ جاهز للتعاقد في صندوقك الموحد.",
      sub: "اضغط على أي مرحلة لاستعراض الوحدات البرمجية وبوابات التحقق والمخرجات الموثقة داخل مساحة عملك المعزولة.",
      outHeading: "المخرجات الموثقة لهذه المرحلة",
      deepCta: "استعراض البنية التقنية الكاملة"
    }
  }[lang];

  const buttons = stages
    .map(
      (st, idx) => `
      <button type="button" class="stage-selector-btn${idx === 0 ? " is-active" : ""}" data-tab-target="stage-${st.key}" aria-selected="${
        idx === 0 ? "true" : "false"
      }">
        <span class="stage-num-badge">${esc(st.num)}</span>
        <span style="font-weight:600;font-size:0.95rem">${esc(st.title)}</span>
      </button>`
    )
    .join("");

  const panels = stages
    .map(
      (st, idx) => `
      <div class="stage-detail-card" data-tab-panel="pipeline-deck" data-panel-id="stage-${st.key}"${idx === 0 ? "" : " hidden"}>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px">
          <span class="kicker-pill" style="margin-bottom:0">${esc(st.num)}</span>
          <code class="ltr-code" dir="ltr" style="color:#93C5FD">${esc(st.code)}</code>
        </div>
        <h3 class="heading-md" style="color:#FFFFFF">${esc(st.title)}</h3>
        <p class="lead-prose" style="font-size:0.98rem">${esc(st.summary)}</p>
        <div class="stage-metrics-row">
          ${st.metrics.map((m) => `<div class="stage-metric-chip">${esc(m)}</div>`).join("")}
        </div>
        <div style="border-top:1px solid var(--border-dark);padding-top:16px">
          <strong style="font-size:0.88rem;color:#9CB1CB">${esc(L.outHeading)}</strong>
          <ul class="stage-outputs-list">
            ${st.outputs
              .map((o) => `<li><span class="check-badge">✓</span><span>${esc(o)}</span></li>`)
              .join("")}
          </ul>
        </div>
      </div>`
    )
    .join("");

  return `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(L.kicker)}</span></span>
          <h2 class="display-lg">${esc(L.title)}</h2>
          <p class="lead-prose">${esc(L.sub)}</p>
        </div>
        <a href="${localePath("/engine/", lang)}" class="btn-ghost-dark">${esc(L.deepCta)}</a>
      </div>

      <div class="pipeline-deck">
        <div class="stage-selector-list" data-tab-group="pipeline-deck" role="tablist">
          ${buttons}
        </div>
        <div>
          ${panels}
        </div>
      </div>
    </div>
  </section>`;
}

export function renderStudioShowcase(lang) {
  const screens = STUDIO_SCREENS[lang];
  const L = {
    en: {
      kicker: "Live Product Telemetry · Real Outreach Studio & Cockpit",
      title: "Built in-house. Zero duct-taped SaaS chaos.",
      sub: "Inspect real Retina captures from our proprietary Outreach Studio and 12-view Executive Cockpit. Click any image to open full-resolution inspection.",
      zoomHint: "Click image to inspect in 2880×1800 Retina",
      tourCta: "Open Full Studio & Unibox Sandbox"
    },
    fa: {
      kicker: "تصاویر واقعی محصول · استودیو اوتریچ و پیشخوان مدیریتی",
      title: "موتور اختصاصی یکپارچه؛ بی‌نیاز از چسباندن ده ابزار پراکنده.",
      sub: "نماهای واقعی و باکیفیت از استودیو اوتریچ و پیشخوان مدیریتی ۱۲ صفحه‌ای ما را بررسی کنید. برای بزرگ‌نمایی دقیق روی هر تصویر کلیک کنید.",
      zoomHint: "برای بزرگ‌نمایی کیفیت رتینا روی تصویر کلیک کنید",
      tourCta: "ورود به تور تعاملی استودیو و صندوق واحد"
    },
    ar: {
      kicker: "لقطات حية من المنصة · استوديو الاستقطاب ولوحة القيادة",
      title: "بنية برمجية متكاملة مطورة داخلياً بالكامل.",
      sub: "استعرض لقطات حقيقية عالية الدقة من استوديو التواصل ولوحة القيادة التنفيذية. اضغط على أي شاشة للتكبير الكامل.",
      zoomHint: "اضغط على الصورة للتكبير بدقة Retina",
      tourCta: "افتح جولة الاستوديو والصندوق التفاعلي"
    }
  }[lang];

  const tabsHtml = screens
    .map(
      (s, i) => `
      <button type="button" class="studio-tab-btn${i === 0 ? " is-active" : ""}" data-tab-target="screen-${s.id}" aria-selected="${
        i === 0 ? "true" : "false"
      }">${esc(s.label)}</button>`
    )
    .join("");

  const panelsHtml = screens
    .map(
      (s, i) => `
      <div data-tab-panel="studio-screens" data-panel-id="screen-${s.id}"${i === 0 ? "" : " hidden"}>
        <div class="studio-frame-wrap">
          <img
            src="${s.img}"
            alt="${esc(s.title)}"
            width="1440"
            height="900"
            loading="${i === 0 ? "eager" : "lazy"}"
            class="studio-screen-img"
            data-zoom-src="${s.img}"
            data-zoom-title="${esc(s.title)}"
          >
          ${s.pins
            .map(
              (p, pi) =>
                `<span class="studio-pin" style="left:${p.x};top:${p.y}" title="${esc(p.label)}">${esc(
                  fmtNum(pi + 1, lang)
                )}</span>`
            )
            .join("")}
        </div>
        <div class="studio-caption-bar">
          <div style="max-width:740px">
            <h3 class="heading-md">${esc(s.title)}</h3>
            <p style="margin:6px 0 0;color:var(--muted-ink);font-size:0.95rem">${esc(s.caption)}</p>
            <div class="studio-pins-legend">
              ${s.pins
                .map(
                  (p, pi) =>
                    `<span class="pin-legend-chip"><strong style="color:var(--cobalt)">${esc(
                      fmtNum(pi + 1, lang)
                    )}.</strong> ${esc(p.label)}</span>`
                )
                .join("")}
            </div>
          </div>
          <span style="font-size:0.82rem;font-weight:600;color:var(--cobalt)">🔍 ${esc(L.zoomHint)}</span>
        </div>
      </div>`
    )
    .join("");

  return `
  <section class="lv-section surface-light">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(L.kicker)}</span></span>
          <h2 class="display-lg">${esc(L.title)}</h2>
          <p class="lead-prose">${esc(L.sub)}</p>
        </div>
        <a href="${localePath("/platform/", lang)}" class="btn-secondary">${esc(L.tourCta)}</a>
      </div>

      <div class="studio-showcase-shell">
        <div class="studio-tab-bar" data-tab-group="studio-screens" role="tablist">
          ${tabsHtml}
        </div>
        ${panelsHtml}
      </div>
    </div>
  </section>`;
}

export function renderAuditDossierFan(lang) {
  const L = {
    en: {
      kicker: "Value-First Wedge · Automated 14-Page Executive Audit PDF",
      title: "Don't beg for 15 minutes. Deliver a 14-page executive diagnostic first.",
      sub: "When a qualified company replies with interest, our headless Chromium + Lighthouse worker automatically renders and delivers a custom 14-page A4 diagnostic PDF — turning cold outreach into high-trust consulting.",
      sheets: [
        {
          tag: "PAGES 01 – 03 · EXECUTIVE SCORE",
          title: "Readiness Score Ring & Commercial Leak Summary",
          desc: "SVG score rings across TLS security, mobile 390px responsiveness, international speed, and RFQ capture readiness.",
          bars: [86, 62, 91]
        },
        {
          tag: "PAGES 04 – 07 · VISUAL EVIDENCE",
          title: "1440×900 Desktop & 390×844 Mobile Chromium Captures",
          desc: "Side-by-side live viewport evidence neutralizing sticky headers and pinpointing broken mobile layouts or missing trust signals.",
          bars: [74, 88, 54]
        },
        {
          tag: "PAGES 08 – 11 · CORE VITALS & TLS",
          title: "Lighthouse Telemetry, Accessibility & Header Audit",
          desc: "Measured LCP, CLS, TBT, HTTP security headers, schema markup, and multilingual buyer friction benchmarks.",
          bars: [92, 79, 68]
        },
        {
          tag: "PAGES 12 – 14 · TAILORED ROADMAP",
          title: "Custom Remediation Plan & Grounded Package Envelope",
          desc: "Parsed directly from your workspace NEGOTIATION.md — clear scope, timeline, and written next step with zero pushy sales fluff.",
          bars: [95, 89, 84]
        }
      ]
    },
    fa: {
      kicker: "قلاب ارزش‌آفرین اختصاصی · کتابچه تحلیلی ۱۴ صفحه‌ای خودکار",
      title: "به‌جای التماس برای وقت جلسه، ابتدا یک ممیزی ۱۴ صفحه‌ای اختصاصی تحویل دهید.",
      sub: "به‌محض اعلام تمایل شرکت هدف، موتور کرومیوم و لایت‌هاوس ما به‌صورت خودکار یک گزارش ۱۴ صفحه‌ای اختصاصی در قطع استاندارد تولید و ارسال می‌کند تا پیام سرد به مشاوره سطح اول تبدیل شود.",
      sheets: [
        {
          tag: "صفحات ۰۱ تا ۰۳ · امتیاز کلان مدیریتی",
          title: "حلقه امتیاز سلامت دیجیتال و خلاصه گلوگاه‌های تجاری",
          desc: "نمودارهای برداری دقیق از وضعیت امنیت دامنه، واکنش‌گرایی موبایل، سرعت بارگذاری بین‌المللی و فرم ثبت سفارش عمده.",
          bars: [86, 62, 91]
        },
        {
          tag: "صفحات ۰۴ تا ۰۷ · شواهد تصویری زنده",
          title: "اسکرین‌شات واقعی دسکتاپ ۱۴۴۰ و موبایل ۳۹۰ پیکسل",
          desc: "ثبت تصویر واقعی از وب‌سایت مشتری در دو نمای دسکتاپ و موبایل برای نمایش عینی به‌هم‌ریختگی‌ها و کمبودهای اعتمادساز.",
          bars: [74, 88, 54]
        },
        {
          tag: "صفحات ۰۸ تا ۱۱ · شاخص‌های فنی و امنیتی",
          title: "کالبدشکافی سرعت، دسترس‌پذیری و هدرهای امنیتی",
          desc: "اندازه‌گیری دقیق زمان رندر، پایداری چیدمان، وضعیت گواهی امنیتی و آماده بودن زیرساخت چندزبانه برای خریدار خارجی.",
          bars: [92, 79, 68]
        },
        {
          tag: "صفحات ۱۲ تا ۱۴ · نقشه راه و پیشنهاد شفاف",
          title: "برنامه اجرایی اصلاح و جدول پکیج‌های پیشنهادی شما",
          desc: "استخراج مستقیم از منشور مذاکره کسب‌وکار شما؛ شامل زمان‌بندی دقیق، شرح خدمات و گام بعدی مکتوب بدون اغراق تبلیغاتی.",
          bars: [95, 89, 84]
        }
      ]
    },
    ar: {
      kicker: "مدخل القيمة الفورية · تقرير تدقيق تنفيذي آلي من 14 صفحة",
      title: "لا تطلب اجتماعاً بارداً؛ قدّم تقريراً تشخيصياً من 14 صفحة أولاً.",
      sub: "فور إبداء الشركة المستهدفة اهتمامها، يقوم محرك Chromium وLighthouse بتوليد وإرسال تقرير A4 مخصص من 14 صفحة يحوّل التواصل الأول إلى استشارة موثوقة.",
      sheets: [
        {
          tag: "الصفحات 01 – 03 · المؤشر التنفيذي",
          title: "حلقة تقييم الجاهزية وملخص الفرص الضائعة",
          desc: "مخططات دقيقة لأمان النطاق وتوافق الجوال وسرعة التصفح الدولية وجاهزية استقبال طلبات الجملة.",
          bars: [86, 62, 91]
        },
        {
          tag: "الصفحات 04 – 07 · الشواهد البصرية",
          title: "لقطات حقيقية لسطح المكتب 1440 والجوال 390 بكسل",
          desc: "معاينة بصرية حية لموقع العميل تكشف بوضوح عيوب العرض على الهواتف ونواقص عناصر الثقة.",
          bars: [74, 88, 54]
        },
        {
          tag: "الصفحات 08 – 11 · الأداء والأمان",
          title: "قياسات السرعة وترويسات الحماية واللغات",
          desc: "فحص شامل لمؤشرات الأداء الحيوية وشهادات التشفير وتجربة المشتري الدولي متعدد اللغات.",
          bars: [92, 79, 68]
        },
        {
          tag: "الصفحات 12 – 14 · خارطة التنفيذ والعرض",
          title: "خطة التطوير المخصصة وباقات التعاقد الواضحة",
          desc: "تُستخرج مباشرة من ملف التفاوض المعتمد لديكم بجدول زمني وتكلفة شفافة دون أي مبالغات.",
          bars: [95, 89, 84]
        }
      ]
    }
  }[lang];

  return `
  <section id="audit-pdf" class="lv-section surface-white">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(L.kicker)}</span></span>
          <h2 class="display-lg">${esc(L.title)}</h2>
          <p class="lead-prose">${esc(L.sub)}</p>
        </div>
      </div>

      <div class="dossier-fan-grid">
        ${L.sheets
          .map(
            (sh) => `
          <article class="dossier-sheet">
            <div class="dossier-sheet-top">
              <div class="dossier-page-tag">${esc(sh.tag)}</div>
              <h3 class="heading-md" style="font-size:1.12rem;color:#0F1E36">${esc(sh.title)}</h3>
              <p style="font-size:0.89rem;color:#42526B;margin:10px 0 0">${esc(sh.desc)}</p>
            </div>
            <div class="dossier-mini-bars" aria-hidden="true">
              ${sh.bars
                .map((w) => `<div class="dossier-bar-track"><div class="dossier-bar-fill" style="width:${w}%"></div></div>`)
                .join("")}
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

export function renderPricingSection(lang, showHeader = true) {
  const tiers = PRICING_TIERS[lang];
  const L = {
    en: {
      kicker: "Flexible Commercial Model · Project Sprint or Monthly Managed",
      title: "Work with us per project or on a monthly managed retainer.",
      sub: "Introduce your business, product margins, and target buyers. Whether you want a fixed 4-week validation project or a continuous monthly outbound department, we build and run everything end-to-end.",
      btnMonthly: "Monthly Retainer",
      btnQuarterly: "Quarterly Scale (-18% + Free Setup)"
    },
    fa: {
      kicker: "مدل همکاری منعطف · پروژه‌ای یا مدیریت کامل ماهانه",
      title: "امکان همکاری به‌صورت پروژه‌ای (اسپرینت ۳۰ روزه) یا اشتراک مدیریت‌شده ماهانه.",
      sub: "کسب‌وکار، محصول و بازار هدف خود را معرفی کنید؛ چه بخواهید ابتدا با یک پروژه ۴ هفته‌ای مستقل شروع کنید و چه یک واحد تمام‌عیار فروش و اوتریچ ماهانه داشته باشید، صفر تا صد ساخت و اجرا با ماست.",
      btnMonthly: "پرداخت ماهانه",
      btnQuarterly: "قرارداد فصلی (۱۸٪ تخفیف + راه‌اندازی رایگان)"
    },
    ar: {
      kicker: "نماذج تعاقد مرنة · بالمشروع أو بإدارة شهرية مستمرة",
      title: "تعاقد معنا بنظام المشروع المحدد أو الإدارة الشهرية الشاملة.",
      sub: "عرّفنا بنشاطك التجاري وأسواقك المستهدفة؛ سواء رغبت في مشروع تأسيسي لمدة 4 أسابيع أو قسم استقطاب شهري متكامل، نبني وندير كل شيء نيابةً عنك.",
      btnMonthly: "اشتراك شهري",
      btnQuarterly: "تعاقد فصلي (خصم 18% + تأسيس مجاني)"
    }
  }[lang];

  return `
  <section class="lv-section surface-light">
    <div class="lv-container">
      ${
        showHeader
          ? `<div class="section-head" style="justify-content:center;text-align:center">
        <div class="section-head-main" style="margin-inline:auto">
          <span class="kicker-pill"><span>${esc(L.kicker)}</span></span>
          <h2 class="display-lg">${esc(L.title)}</h2>
          <p class="lead-prose" style="margin-inline:auto">${esc(L.sub)}</p>
        </div>
      </div>`
          : ""
      }

      <div class="pricing-billing-bar">
        <div class="billing-segmented" role="group" aria-label="Billing Cycle">
          <button type="button" class="billing-btn is-active" data-billing-mode="monthly">${esc(L.btnMonthly)}</button>
          <button type="button" class="billing-btn" data-billing-mode="quarterly">${esc(L.btnQuarterly)}</button>
        </div>
      </div>

      <div class="pricing-grid">
        ${tiers
          .map(
            (t) => `
          <article class="plan-card${t.featured ? " is-featured" : ""}">
            <div>
              <span class="plan-badge">${esc(t.badge)}</span>
              <h3 class="heading-md">${esc(t.name)}</h3>
              <div class="plan-price-row">
                <span class="plan-price-val" data-price-monthly="${esc(t.priceMain)}" data-price-quarterly="${esc(
              t.quarterlyPrice
            )}">${esc(t.priceMain)}</span>
                <span class="plan-price-unit">${esc(t.priceUnit)}</span>
              </div>
              <div class="plan-setup-note">${esc(t.setupNote)}</div>
              <p style="font-size:0.92rem;opacity:0.88;margin:0 0 14px">${esc(t.summary)}</p>

              <div class="plan-metrics-box">
                ${t.metrics
                  .map(
                    (m) =>
                      `<div class="plan-metric-line"><span style="opacity:0.75">${esc(m.k)}</span><strong>${esc(
                        m.v
                      )}</strong></div>`
                  )
                  .join("")}
              </div>

              <ul class="plan-feature-list">
                ${t.features
                  .map((f) => `<li><span class="check-badge">✓</span><span>${esc(f)}</span></li>`)
                  .join("")}
              </ul>
            </div>

            <a href="${localePath("/start/", lang)}?mode=${encodeURIComponent(t.modeParam)}" class="${
              t.featured ? "btn-primary" : "btn-secondary"
            }" data-magnetic>${esc(t.cta)}</a>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

export function renderScopeEstimator(lang) {
  const L = {
    en: {
      kicker: "Interactive Custom Architecture Configurator",
      title: "Configure your target markets, channels, and engagement mode.",
      sub: "Adjust the parameters below to preview how we size sister-domains, warmed mailboxes, and monthly verified ICP capacity for your business.",
      lblMode: "1. Engagement Model",
      modes: [
        { id: "pilot_project", label: "4-Week Project Sprint" },
        { id: "monthly_managed", label: "Monthly Managed Retainer" },
        { id: "sovereign_pod", label: "Sovereign Multi-Brand Pod" }
      ],
      lblRegions: "2. Target Regions",
      regions: ["Gulf & MENA", "Europe (EU/UK)", "East Asia", "Domestic Industrial"],
      lblChannels: "3. Outbound Channels",
      channels: ["Sister-Domain Email", "WhatsApp Dedicated IP", "Telegram Engine", "Assisted LinkedIn"],
      lblVolume: "4. Verified Tier-A Companies / Month",
      outHeading: "Recommended Custom Infrastructure",
      delivItems: [
        "Isolated Workspace + Custom ICP Scoring Matrix",
        "Codified FACTS.md & NEGOTIATION.md Guardrails",
        "Canary Validation Gate (100–200 Leads First)",
        "3-Column Unibox + Telegram 1-Tap Action Cards"
      ],
      cta: "Lock This Blueprint & Submit Business Brief"
    },
    fa: {
      kicker: "تخمین‌گر تعاملی معماری و سرمایه‌گذاری",
      title: "بازار هدف، کانال‌ها و مدل همکاری دلخواه خود را تنظیم کنید.",
      sub: "پارامترهای کسب‌وکار خود را تغییر دهید تا تعداد دامنه‌های خواهر، صندوق‌های گرم‌شده و برآورد دقیق همکاری پروژه‌ای یا ماهانه را مشاهده کنید.",
      lblMode: "۱. انتخاب مدل همکاری",
      modes: [
        { id: "pilot_project", label: "پروژه‌ای (اسپرینت ۴ هفته‌ای)" },
        { id: "monthly_managed", label: "مدیریت کامل ماهانه" },
        { id: "sovereign_pod", label: "پاد اختصاصی چندبرندی" }
      ],
      lblRegions: "۲. مناطق جغرافیایی هدف",
      regions: ["خلیج فارس و خاورمیانه", "اروپا و بریتانیا", "شرق آسیا", "صنایع بازار داخل"],
      lblChannels: "۳. کانال‌های اوتریچ فعال",
      channels: ["ایمیل دامنه خواهر", "واتس‌اپ آی‌پی اختصاصی", "موتور تلگرام", "لینکدین کمکی"],
      lblVolume: "۴. ظرفیت شرکت‌های تاییدشده رده الف در ماه",
      outHeading: "معماری اختصاصی پیشنهادی برای کسب‌وکار شما",
      delivItems: [
        "فضای کاری ایزوله + ماتریس اختصاصی امتیازدهی سرنخ",
        "تدوین منشور حقایق مستند و دامنه مجاز مذاکره قیمت",
        "اجرای بچ آزمایشی ۱۰۰ تا ۲۰۰ تایی پیش از مقیاس‌دهی",
        "صندوق واحد ۳ ستونه + کارت اقدام تک‌کلیکی تلگرام"
      ],
      cta: "ثبت این معماری و ارسال مشخصات کسب‌وکار"
    },
    ar: {
      kicker: "حاسبة البنية المخصصة والتكلفة التفاعلية",
      title: "اضبط أسواقك المستهدفة وقنوات التواصل ونموذج التعاقد.",
      sub: "عدّل الخيارات أدناه لمعاينة عدد النطاقات الشقيقة وصناديق البريد المُحماة والتكلفة التقديرية لمشروعك.",
      lblMode: "1. نموذج التعاقد",
      modes: [
        { id: "pilot_project", label: "مشروع لمدة 4 أسابيع" },
        { id: "monthly_managed", label: "إدارة شهرية شاملة" },
        { id: "sovereign_pod", label: "وحدة سيادية متعددة العلامات" }
      ],
      lblRegions: "2. الأسواق المستهدفة",
      regions: ["الخليج والشرق الأوسط", "أوروبا والمملكة المتحدة", "شرق آسيا", "القطاع الصناعي الإقليمي"],
      lblChannels: "3. قنوات الاستقطاب",
      channels: ["بريد النطاقات الشقيقة", "واتساب بعنوان IP مستقل", "محرك تيليجرام", "لينكدإن الموجه"],
      lblVolume: "4. عدد الشركات الموثقة (فئة A) شهرياً",
      outHeading: "البنية الهندسية الموصى بها لنشاطك",
      delivItems: [
        "مساحة عمل معزولة + مصفوفة تأهيل مخصصة",
        "توثيق سجل الحقائق وسقف التفاوض السعري",
        "دفعة اختبار أولية (100–200 شركة) قبل التوسع",
        "صندوق موحد ثلاثي الأعمدة + بطاقات موافقة فورية"
      ],
      cta: "اعتماد هذا المخطط وإرسال ملخص نشاطك"
    }
  }[lang];

  return `
  <section id="estimator" class="lv-section surface-white">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(L.kicker)}</span></span>
          <h2 class="display-lg">${esc(L.title)}</h2>
          <p class="lead-prose">${esc(L.sub)}</p>
        </div>
      </div>

      <div id="scope-estimator" class="interactive-workbench">
        <div class="workbench-split">
          <div style="display:grid;gap:22px">
            <div>
              <div class="form-label">${esc(L.lblMode)}</div>
              <div class="toggle-chip-grid">
                ${L.modes
                  .map(
                    (m, idx) =>
                      `<button type="button" class="chip-toggle${idx === 1 ? " is-selected" : ""}" data-est-mode="${
                        m.id
                      }">${esc(m.label)}</button>`
                  )
                  .join("")}
              </div>
            </div>

            <div>
              <div class="form-label">${esc(L.lblRegions)}</div>
              <div class="toggle-chip-grid">
                ${L.regions
                  .map(
                    (r, idx) =>
                      `<button type="button" class="chip-toggle${idx < 2 ? " is-selected" : ""}" data-est-region="${esc(
                        r
                      )}">${esc(r)}</button>`
                  )
                  .join("")}
              </div>
            </div>

            <div>
              <div class="form-label">${esc(L.lblChannels)}</div>
              <div class="toggle-chip-grid">
                ${L.channels
                  .map(
                    (c, idx) =>
                      `<button type="button" class="chip-toggle${idx < 3 ? " is-selected" : ""}" data-est-channel="${esc(
                        c
                      )}">${esc(c)}</button>`
                  )
                  .join("")}
              </div>
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
                <label for="est-volume-slider" class="form-label">${esc(L.lblVolume)}</label>
                <strong id="est-volume-display" style="color:var(--cobalt);font-size:1.1rem">${esc(
                  fmtNum("1,500", lang)
                )}</strong>
              </div>
              <input id="est-volume-slider" type="range" min="500" max="6000" step="500" value="1500" class="range-slider">
            </div>
          </div>

          <div class="estimator-summary-card">
            <div style="font-size:0.84rem;color:var(--muted-on-dark);font-weight:600">${esc(L.outHeading)}</div>
            <div id="est-price-display" class="heading-md" style="font-size:1.55rem;color:#FFFFFF;margin-top:10px"></div>
            <div id="est-domains-display" style="margin-top:12px;color:#93C5FD;font-weight:600;font-size:0.92rem"></div>
            <div id="est-note-display" style="margin-top:6px;color:var(--muted-on-dark);font-size:0.86rem"></div>

            <ul class="stage-outputs-list" style="margin-block:18px 24px">
              ${L.delivItems
                .map((it) => `<li><span class="check-badge">✓</span><span>${esc(it)}</span></li>`)
                .join("")}
            </ul>

            <a id="est-start-link" data-base-href="${localePath("/start/", lang)}" href="${localePath(
    "/start/",
    lang
  )}" class="btn-primary" style="width:100%" data-magnetic>${esc(L.cta)}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderClosingPortal(lang) {
  const L = {
    en: {
      kicker: "Ready to Engineer Your Outbound Pipeline?",
      title: "Introduce your business. We build, warm, and run your custom lead engine.",
      sub: "Submit a 2-minute business brief — tell us what you sell, your deal economics, and which regions you want to penetrate. Receive a tailored architecture & channel plan within 24 business hours.",
      primary: "Submit Your Business Brief",
      secondary: "Compare Project & Monthly Plans"
    },
    fa: {
      kicker: "آماده ساخت موتور فروش اختصاصی کسب‌وکارتان هستید؟",
      title: "شما کسب‌وکارتان را معرفی کنید؛ ما زیرساخت، کشف سرنخ و مذاکره را می‌سازیم.",
      sub: "در کمتر از ۲ دقیقه محصول، حاشیه سود و بازارهای هدف خود را ثبت کنید تا معماری اختصاصی دامنه‌های خواهر، منابع کشف لید و برنامه اجرایی پروژه‌ای یا ماهانه برایتان تدوین شود.",
      primary: "ثبت بریف اختصاصی کسب‌وکار",
      secondary: "مشاهده تعرفه پروژه‌ای و ماهانه"
    },
    ar: {
      kicker: "هل أنت مستعد لبناء محرك مبيعاتك المخصص؟",
      title: "عرّفنا بنشاطك التجاري؛ ونحن نبني وندير منظومة الاستقطاب بالكامل.",
      sub: "أرسل ملخصاً سريعاً حول منتجك وأسواقك المستهدفة لتحصل على مخطط معماري وخطة قنوات مخصصة خلال 24 ساعة عمل.",
      primary: "أرسل ملخص مشروعك الآن",
      secondary: "قارن الباقات الشهرية والمشاريع"
    }
  }[lang];

  return `
  <section class="lv-section-tight surface-dark" style="border-top:1px solid var(--border-dark)">
    <div class="lv-container" style="text-align:center">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(L.kicker)}</span></span>
      <h2 class="display-lg" style="max-width:820px;margin-inline:auto">${esc(L.title)}</h2>
      <p class="lead-prose" style="margin-inline:auto">${esc(L.sub)}</p>
      <div class="hero-actions" style="justify-content:center">
        <a href="${localePath("/start/", lang)}" class="btn-primary" data-magnetic>${esc(L.primary)}</a>
        <a href="${localePath("/pricing/", lang)}" class="btn-ghost-dark">${esc(L.secondary)}</a>
      </div>
    </div>
  </section>`;
}
