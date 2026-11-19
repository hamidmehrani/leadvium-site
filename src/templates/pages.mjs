import { UI_COPY, fmtNum, localePath } from "../data/site-data.mjs";
import {
  BLUEPRINT_CASES,
  HERO_SCENARIOS,
  INDUSTRY_PLAYBOOKS,
  UNIBOX_SANDBOX
} from "../data/engine-data.mjs";
import { esc } from "./layout.mjs";
import {
  renderAuditDossierFan,
  renderClosingPortal,
  renderPipelineDeck,
  renderPricingSection,
  renderScopeEstimator,
  renderStudioShowcase
} from "./sections.mjs";

/* ==========================================================================
   1. HOME PAGE (/)
   ========================================================================== */
export function renderHomePage(lang) {
  const scenarios = HERO_SCENARIOS[lang];
  const H = {
    en: {
      metaTitle: "Leadvium — Custom B2B Lead Generation & Autonomous Outbound Engine",
      metaDesc:
        "Introduce your business and target markets. Leadvium engineers, isolates, warms up, and operates your custom B2B lead discovery and multi-channel outreach engine — per project or monthly.",
      kicker: "Done-For-You Revenue Infrastructure · Project Sprint or Monthly Managed",
      h1: "You introduce your business. We engineer, launch, and scale your B2B outbound engine.",
      sub: "Stop buying recycled lead lists or burning your main domain on generic AI spam. We build an isolated, custom-coded discovery, 14-page diagnostic, and multi-channel outreach machine tailored to your exact buyers — operated per project or monthly.",
      cta1: "Start Your Custom Brief",
      cta2: "Inspect 6-Stage Engine",
      stats: [
        { n: "240+", l: "Verified Registry & Fair Sources" },
        { n: "62,062+", l: "Indexed B2B Entities" },
        { n: "14 Pages", l: "Auto-Generated Audit PDF" },
        { n: "2,030+", l: "Automated Safety & Unit Tests" }
      ],
      consoleTitle: "Live Outbound Telemetry Preview",
      lblCompany: "Target Account",
      lblSource: "Discovery Signal",
      lblScore: "Readiness / Fit Score",
      lblGap: "Measured Opportunity",
      lblChannel: "Routed Path",
      lblAsset: "Value Wedge Sent",
      tape: [
        "Zero Primary-Domain Risk (Sister-Domain Shield)",
        "Playwright 1440px & 390px Headless Diagnostics",
        "FACTS.md & NEVER-CLAIM Pre-Send Critic",
        "1 Dedicated IP per WhatsApp Bridge",
        "Project Sprint ($2,900) or Monthly Retainer ($2,400/mo)",
        "5-Minute Daily Executive Action Cards"
      ],
      manifestoKicker: "Why Conventional Cold Outreach Fails",
      manifesto:
        "Cold outreach fails when everyone rents the same scraped database and blasts templated pitches. Real B2B buyers reply when you verify a concrete gap in their business, reach them on a warmed sister domain in their local business hours, and lead with a tailored diagnostic before asking for anything.",
      howKicker: "How Our Partnership Works",
      howTitle: "Tell us what you sell. We build and run the entire machine.",
      howSteps: [
        {
          n: "01",
          t: "Business & Economics Intake",
          d: "Share your product, deal size, margins, and target regions. Choose a 4-week custom project sprint or ongoing monthly operation."
        },
        {
          n: "02",
          t: "Custom Infra & Fact-Vault Build",
          d: "We provision isolated sister domains (SPF/DKIM/DMARC), codify your FACTS.md & NEGOTIATION.md guardrails, and wire custom source harvesters."
        },
        {
          n: "03",
          t: "Enrichment, Diagnostics & Canary",
          d: "Our engine crawls prospects, generates 9-point scans & 14-page audit PDFs, and validates positive reply rates on a 100–200 lead canary batch."
        },
        {
          n: "04",
          t: "Multi-Channel Scale & 5-Min Handoff",
          d: "We scale across Email, WhatsApp, Telegram, and LinkedIn — filtering noise and delivering qualified, ready-to-close buyers straight to your Unibox."
        }
      ]
    },
    fa: {
      metaTitle: "لیدویوم — موتور اختصاصی کشف سرنخ و اوتریچ هوشمند شرکتی (پروژه‌ای و ماهانه)",
      metaDesc:
        "کسب‌وکار خود را معرفی کنید؛ لیدویوم زیرساخت اختصاصی کشف لید، ممیزی خودکار ۱۴ صفحه‌ای و مذاکره چندکاناله را به‌صورت پروژه‌ای یا ماهانه برای شما می‌سازد و اجرا می‌کند.",
      kicker: "زیرساخت اختصاصی مهندسی فروش · همکاری پروژه‌ای یا مدیریت ماهانه",
      h1: "شما کسب‌وکارتان را معرفی کنید؛ ما موتور اختصاصی کشف لید و فروش شما را می‌سازیم و مقیاس می‌دهیم.",
      sub: "به‌جای خرید بانک‌های شماره تکراری یا سوزاندن دامنه اصلی شرکت با پیام‌های انبوه، ما یک موتور اختصاصی، ایزوله و مقیاس‌پذیر برای کشف مشتریان واقعی، تولید گزارش تحلیلی ۱۴ صفحه‌ای و مذاکره چندکاناله در بازار هدف شما طراحی و اجرا می‌کنیم.",
      cta1: "ثبت بریف اختصاصی کسب‌وکار",
      cta2: "بررسی موتور ۶ مرحله‌ای",
      stats: [
        { n: "۲۴۰+", l: "رجیستری رسمی و منبع نمایشگاهی" },
        { n: "۶۲٬۰۶۲+", l: "واحد تجاری نمایه‌شده" },
        { n: "۱۴ صفحه", l: "گزارش ممیزی اختصاصی خودکار" },
        { n: "۲٬۰۳۰+", l: "تست خودکار ایمنی و صحت عملکرد" }
      ],
      consoleTitle: "پیش‌نمایش زنده تله‌متری موتور شکار و مذاکره",
      lblCompany: "شرکت هدف کشف‌شده",
      lblSource: "منبع سیگنال",
      lblScore: "امتیاز انطباق و فرصت",
      lblGap: "شکاف تجاری سنجش‌شده",
      lblChannel: "مسیر ارتباطی امن",
      lblAsset: "خروجی ارزش‌آفرین ارسالی",
      tape: [
        "محافظت ۱۰۰٪ از دامنه اصلی برند با دامنه‌های خواهر",
        "اسکن واقعی دسکتاپ ۱۴۴۰ و موبایل ۳۹۰ پیکسل",
        "گارد منع وعده‌های غیرمستند پیش از ارسال",
        "یک آی‌پی اختصاصی به ازای هر شماره واتس‌اپ",
        "مدل همکاری منعطف: پروژه‌ای ۴ هفته‌ای یا اشتراک ماهانه",
        "فقط ۵ دقیقه زمان روزانه مدیر با کارت اقدام تلگرام"
      ],
      manifestoKicker: "چرا ۹۹ درصد کمپین‌های پیام سرد شکست می‌خورند؟",
      manifesto:
        "پیام سرد زمانی شکست می‌خورد که همه یک لیست آماده را بخرند و متن‌های کلیشه‌ای بفرستند. خریداران واقعی زمانی پاسخ می‌دهند که نیاز دقیق کسب‌وکارشان را مستند سنجیده باشید، از دامنه گرم‌شده در ساعت اداری کشورشان پیام بدهید و پیش از هر درخواستی، یک تحلیل عینی ارزشمند روی میز بگذارید.",
      howKicker: "مدل کاری ما چگونه است؟",
      howTitle: "کسب‌وکارتان را معرفی کنید؛ صفر تا صد ساخت، یافتن لید و اوتریچ با ماست.",
      howSteps: [
        {
          n: "۰۱",
          t: "دریافت مشخصات کسب‌وکار و اقتصاد معامله",
          d: "محصول، حاشیه سود، اندازه قرارداد و بازارهای هدف خود را مشخص می‌کنید و بین همکاری پروژه‌ای ۳۰ روزه یا مدیریت کامل ماهانه انتخاب می‌کنید."
        },
        {
          n: "۰۲",
          t: "ساخت زیرساخت ایزوله و منشور حقایق",
          d: "دامنه‌های خواهر ایزوله و صندوق‌های ارسال را راه‌اندازی کرده، منشور ادعاهای مجاز و سقف مذاکره قیمت شما را کدگذاری می‌کنیم و خزنده‌های اختصاصی را می‌بندیم."
        },
        {
          n: "۰۳",
          t: "استخراج لید، ممیزی خودکار و پایلوت قناری",
          d: "موتور ما شرکت‌های هدف را کشف و ممیزی کرده، کتابچه ۱۴ صفحه‌ای اختصاصی تولید می‌کند و ابتدا روی بچ ۱۰۰ تا ۲۰۰ تایی نرخ پاسخ مثبت را اعتبارسنجی می‌کند."
        },
        {
          n: "۰۴",
          t: "مقیاس‌دهی چندکاناله و تحویل مشتری گرم",
          d: "ارسال هماهنگ در ایمیل، واتس‌اپ، تلگرام و لینکدین مقیاس می‌گیرد و فقط خریداران جدی و واجد شرایط مستقیم وارد صندوق واحد و تلگرام شما می‌شوند."
        }
      ]
    },
    ar: {
      metaTitle: "ليدفيوم — منظومة استقطاب العملاء الذاتية وهندسة المبيعات المخصصة للشركات",
      metaDesc:
        "عرّفنا بنشاطك التجاري وأسواقك المستهدفة؛ تبني ليدفيوم وتدير محرك استقطاب وتواصل متعدد القنوات مخصصاً بالكامل لشركتك بنظام المشروع أو الاشتراك الشهري.",
      kicker: "بنية استقطاب متكاملة تُدار نيابةً عنك · بالمشروع أو شهرياً",
      h1: "عرّفنا بنشاطك التجاري؛ ونحن نبني ونشغّل ونوسّع محرك استقطاب العملاء لشركتك.",
      sub: "توقف عن شراء القوائم المستهلكة أو المخاطرة بنطاق شركتك الرئيسي. نصمم ونشغّل منظومة معزولة ومخصصة لاكتشاف المشترين وتوليد تقارير تشخيصية من 14 صفحة والتواصل متعدد القنوات.",
      cta1: "ابدأ ملخص مشروعك المخصص",
      cta2: "استعرض المحرك السداسي",
      stats: [
        { n: "+240", l: "سجلاً رسمياً ودليل معارض موثق" },
        { n: "+62,062", l: "منشأة تجارية مفهرسة" },
        { n: "14 صفحة", l: "تقرير تدقيق آلي مخصص" },
        { n: "+2,030", l: "اختبار أمان وجودة آلي" }
      ],
      consoleTitle: "معاينة حية لمؤشرات الاستقطاب والتأهيل",
      lblCompany: "الشركة المستهدفة",
      lblSource: "مصدر الإشارة",
      lblScore: "درجة الملاءمة والفرصة",
      lblGap: "الفجوة المقاسة",
      lblChannel: "مسار التواصل الآمن",
      lblAsset: "أداة القيمة المرسلة",
      tape: [
        "حماية كاملة للنطاق الرئيسي عبر النطاقات الشقيقة",
        "فحص فعلي بمتصفح Chromium لسطح المكتب والجوال",
        "مدقق الحقائق الموثقة قبل كل إرسال",
        "عنوان IP مخصص لكل رقم واتساب",
        "تعاقد مرن: مشروع 4 أسابيع ($2,900) أو إدارة شهرية ($2,400)",
        "5 دقائق يومياً فقط للمالك عبر بطاقات القرار"
      ],
      manifestoKicker: "لماذا تفشل حملات التواصل البارد التقليدية؟",
      manifesto:
        "تفشل الرسائل الباردة عندما يعتمد الجميع على القوائم المكررة نفسها والقوالب الجاهزة. يستجيب صناع القرار عندما ترصد فجوة حقيقية في أعمالهم، وتتواصل عبر نطاق شقيق مُحمّى في ساعات عملهم المحلية، وتقدم تشخيصاً قيّماً قبل أي طلب.",
      howKicker: "كيف نعمل معاً؟",
      howTitle: "أخبرنا بما تبيعه؛ ونحن نبني وندير المنظومة بالكامل.",
      howSteps: [
        {
          n: "01",
          t: "دراسة النشاط التجاري واقتصاديات الصفقة",
          d: "تشاركنا منتجك وحجم الصفقة والأسواق المستهدفة، وتختار بين مشروع تأسيسي لـ 4 أسابيع أو إدارة شهرية مستمرة."
        },
        {
          n: "02",
          t: "تجهيز البنية المعزولة وسجل الحقائق",
          d: "نؤسس النطاقات الشقيقة وسجلات التوثيق، ونبرمج حدود التسعير والحقائق المعتمدة وجامعات البيانات المخصصة."
        },
        {
          n: "03",
          t: "التدقيق الآلي ودفعة الاختبار الاستطلاعية",
          d: "يفحص المحرك الشركات ويولّد تقارير من 14 صفحة، ويتحقق من نسبة الرد الإيجابي على دفعة أولى من 100–200 شركة."
        },
        {
          n: "04",
          t: "التوسع متعدد القنوات وتسليم الصفقات الدافئة",
          d: "نوسع الحملات عبر البريد وواتساب وتيليجرام ولينكدإن، ونسلّم المشترين الجاهزين مباشرة إلى صندوقك الموحد."
        }
      ]
    }
  }[lang];

  const manifestoWords = H.manifesto
    .split(" ")
    .map((w) => `<span class="manifesto-word">${esc(w)}</span>`)
    .join(" ");

  const scenarioTabs = scenarios
    .map(
      (sc, i) =>
        `<button type="button" class="scenario-tab${i === 0 ? " is-active" : ""}" data-tab-target="hero-sc-${
          sc.id
        }" aria-selected="${i === 0 ? "true" : "false"}">${esc(sc.tab)}</button>`
    )
    .join("");

  const scenarioPanels = scenarios
    .map(
      (sc, i) => `
      <div data-tab-panel="hero-scenarios" data-panel-id="hero-sc-${sc.id}"${i === 0 ? "" : " hidden"}>
        <div class="telemetry-rows">
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblCompany)}</span><span class="telemetry-val">${esc(
        sc.company
      )} · <span style="color:#93C5FD">${esc(sc.region)}</span></span></div>
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblSource)}</span><span class="telemetry-val">${esc(
        sc.source
      )}</span></div>
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblScore)}</span><span class="telemetry-val" style="color:#34D399">${esc(
        sc.score
      )}</span></div>
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblGap)}</span><span class="telemetry-val">${esc(
        sc.gap
      )}</span></div>
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblChannel)}</span><span class="telemetry-val">${esc(
        sc.channel
      )}</span></div>
          <div class="telemetry-row"><span class="telemetry-key">${esc(H.lblAsset)}</span><span class="telemetry-val">${esc(
        sc.asset
      )}</span></div>
        </div>
        <div class="telemetry-reply-box">
          <p class="telemetry-reply-quote">${esc(sc.reply)}</p>
          <div class="telemetry-action-chip">⚡ ${esc(sc.action)}</div>
        </div>
      </div>`
    )
    .join("");

  const bodyHtml = `
  <section class="hero-stage surface-dark">
    <canvas id="hero-signal-canvas" class="hero-signal-canvas" aria-hidden="true"></canvas>
    <div class="lv-container">
      <div class="hero-grid">
        <div>
          <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(H.kicker)}</span></span>
          <h1 class="display-xl">${esc(H.h1)}</h1>
          <p class="lead-prose">${esc(H.sub)}</p>
          <div class="hero-actions">
            <a href="${localePath("/start/", lang)}" class="btn-primary" data-magnetic>${esc(H.cta1)}</a>
            <a href="${localePath("/engine/", lang)}" class="btn-ghost-dark">${esc(H.cta2)}</a>
          </div>
          <div class="hero-metrics-bar">
            ${H.stats
              .map(
                (st) => `
              <div>
                <div class="hero-stat-num">${esc(st.n)}</div>
                <div class="hero-stat-label">${esc(st.l)}</div>
              </div>`
              )
              .join("")}
          </div>
        </div>

        <div class="telemetry-console">
          <div class="console-top-bar">
            <div class="console-window-dots" aria-hidden="true"><span></span><span></span><span></span></div>
            <strong style="font-size:0.84rem;color:#CFE0FF">${esc(H.consoleTitle)}</strong>
          </div>
          <div class="scenario-tabs" data-tab-group="hero-scenarios" role="tablist">
            ${scenarioTabs}
          </div>
          ${scenarioPanels}
        </div>
      </div>
    </div>
  </section>

  <div class="safeguard-tape">
    <div class="lv-container">
      <div class="tape-track">
        ${H.tape
          .map((item) => `<span class="tape-item"><span class="tape-sep">◆</span><span>${esc(item)}</span></span>`)
          .join("")}
      </div>
    </div>
  </div>

  <section class="lv-section surface-white">
    <div class="lv-container manifesto-block">
      <span class="kicker-pill"><span>${esc(H.manifestoKicker)}</span></span>
      <blockquote class="manifesto-quote" data-illuminate-manifesto>${manifestoWords}</blockquote>
    </div>
  </section>

  <section class="lv-section surface-light">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(H.howKicker)}</span></span>
          <h2 class="display-lg">${esc(H.howTitle)}</h2>
        </div>
      </div>
      <div class="cards-grid-2">
        ${H.howSteps
          .map(
            (st) => `
          <article class="arch-card">
            <span class="stage-num-badge" style="width:fit-content;padding-inline:12px">${esc(st.n)}</span>
            <h3 class="heading-md">${esc(st.t)}</h3>
            <p style="margin:0;color:var(--muted-ink)">${esc(st.d)}</p>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${renderPipelineDeck(lang)}
  ${renderStudioShowcase(lang)}
  ${renderAuditDossierFan(lang)}
  ${renderPricingSection(lang, true)}
  ${renderScopeEstimator(lang)}
  ${renderClosingPortal(lang)}
  `;

  return { title: H.metaTitle, description: H.metaDesc, bodyHtml };
}

/* ==========================================================================
   2. 6-STAGE ENGINE PAGE (/engine/)
   ========================================================================== */
export function renderEnginePage(lang) {
  const E = {
    en: {
      metaTitle: "6-Stage Autonomous Engine & 9-Point Scanner — Leadvium",
      metaDesc:
        "Deep technical dive into Leadvium's 240+ source connectors, Playwright headless scanner, 14-page audit PDF pipeline, and sister-domain routing.",
      kicker: "System Architecture · 2,030+ Automated Tests",
      h1: "Engineered like critical infrastructure, not a marketing script.",
      sub: "Inspect every layer of the Leadvium pipeline — from multi-registry discovery and real Chromium rendering to grounded AI qualification and single-path outbound governance.",
      srcTitle: "240+ Verified B2B Discovery Connectors",
      srcSub: "We drop crowded freelance boards and scraped junk, focusing strictly on entities with real commercial footprint.",
      srcHeaders: ["Source Category", "Representative Connectors & Signals", "Qualification Signal"],
      srcRows: [
        ["Corporate Registries", "UK Companies House, France INSEE, Norway Brønnøysund, Finland PRH, Regional National IDs", "Verified legal entity, industry code & director names"],
        ["Trade Fair Exhibitors", "Gulfood, SIAL, Ambiente, Inhorgenta, Vicenzaoro & regional expo catalogs", "Companies investing real capital in international trade stands"],
        ["Chambers of Commerce", "Dubai, Abu Dhabi, Qatar, Arab-British & Arab-German Chambers", "Active cross-border importers, distributors & wholesalers"],
        ["Spatial & No-Site Grid", "OpenStreetMap, HERE & Foursquare industrial city grids", "High-margin traditional firms with broken or missing digital presence"],
        ["Live Demand Radar", "140+ moderated trade forums, Discourse communities & public RFQs", "Real-time buying questions routed to assisted/direct outreach"]
      ],
      simKicker: "Interactive 9-Point Readiness Scanner",
      simTitle: "Test how our headless Chromium scanner scores a prospect domain.",
      simSub: "Toggle technical & commercial gaps below to watch how studio_finder.py computes the Opportunity Score and chooses the outreach wedge.",
      signals: [
        { label: "Plain HTTP / Missing SSL", w: 22, on: true },
        { label: "Missing Mobile 390px Viewport", w: 16, on: true },
        { label: "No Bulk RFQ / Quote Form", w: 18, on: true },
        { label: "Mobile LCP Slower Than 4.0s", w: 10, on: false },
        { label: "Single-Language Only (No Export I18n)", w: 10, on: true },
        { label: "Oversized Uncompressed Images", w: 6, on: false },
        { label: "Missing Structured Org Schema", w: 6, on: false },
        { label: "Missing HTTP Security Headers", w: 5, on: false },
        { label: "Buried Contact / Role Email Only", w: 5, on: false }
      ],
      simOutScore: "Computed Opportunity Score",
      simOutTier: "Assigned ICP Tier",
      simOutWedge: "Automated Outreach Action"
    },
    fa: {
      metaTitle: "معماری موتور ۶ مرحله‌ای و اسکنر ۹گانه — لیدویوم",
      metaDesc:
        "بررسی عمیق فنی بیش از ۲۴۰ منبع کشف سرنخ، مرورگر واقعی کرومیوم، خط تولید گزارش ۱۴ صفحه‌ای و گاردهای ارسال لیدویوم.",
      kicker: "معماری مهندسی سیستم · بیش از ۲٬۰۳۰ تست خودکار",
      h1: "مهندسی‌شده در تراز زیرساخت حیاتی؛ نه یک اسکریپت تبلیغاتی ساده.",
      sub: "تمامی لایه‌های موتور لیدویوم را کالبدشکافی کنید؛ از استخراج داده از رجیستری‌های رسمی و رندر واقعی کرومیوم تا امتیازدهی مستند و مسیر واحد ارسال امن.",
      srcTitle: "بیش از ۲۴۰ منبع رسمی و تاییدشده کشف مشتریان شرکتی",
      srcSub: "ما پلتفرم‌های شلوغ فریلنسری و بانک‌های شماره فله‌ای را حذف کرده‌ایم و فقط سراغ کسب‌وکارهای دارای ردپای واقعی تجاری می‌رویم.",
      srcHeaders: ["دسته منبع داده", "نمونه رجیستری‌ها و کاتالوگ‌های متصل", "سیگنال اعتبارسنجی تجاری"],
      srcRows: [
        ["رجیستری ثبت شرکت‌ها", "ثبت شرکت‌های بریتانیا، فرانسه، نروژ، فنلاند و شناسه ملی ۱۱ رقمی شرکت‌ها", "شخصیت حقوقی فعال، کد صنفی دقیق و نام مدیران تصمیم‌گیرنده"],
        ["غرفه‌داران نمایشگاه‌های تجاری", "کاتالوگ رسمی گلفود، سیال، آمبینته، اینهورگنتا و ویچنزا", "شرکت‌هایی که بودجه واقعی برای حضور در تجارت بین‌الملل هزینه کرده‌اند"],
        ["اتاق‌های بازرگانی", "اتاق بازرگانی دبی، ابوظبی، قطر و اتاق‌های مشترک بازرگانی اروپا و خلیج فارس", "واردکنندگان، توزیع‌کنندگان و عمده‌فروشان دارای مجوز فعال"],
        ["شبکه مکانی و رادار فاقد سایت", "پایش شبکه‌ای شهرهای صنعتی در نقشه‌های باز و دایرکتوری‌های شهری", "شرکت‌های باسابقه سنتی که وب‌سایت ضعیف دارند یا فاقد پورتال هستند"],
        ["رادار زنده تقاضای خرید", "بیش از ۱۴۰ انجمن تخصصی صنعتی و تردهای عمومی استعلام خرید", "شناسایی لحظه‌ای سوالات خرید واقعی و تولید پیش‌نویس پاسخ تخصصی"]
      ],
      simKicker: "شبیه‌ساز تعاملی اسکنر ۹گانه دامنه",
      simTitle: "امتحان کنید موتور ما چگونه وب‌سایت شرکت هدف را نمره‌دهی می‌کند.",
      simSub: "نواقص فنی و تجاری زیر را روشن یا خاموش کنید تا ببینید ماژول ممیزی چگونه امتیاز فرصت را محاسبه و نوع پیشنهاد اولیه را انتخاب می‌کند.",
      signals: [
        { label: "نبود گواهی امنیتی و پروتکل رمزنگاری", w: 22, on: true },
        { label: "به‌هم‌ریختگی نمای موبایل ۳۹۰ پیکسل", w: 16, on: true },
        { label: "نبود فرم ثبت سفارش و استعلام عمده", w: 18, on: true },
        { label: "کندی بارگذاری موبایل بالای ۴ ثانیه", w: 10, on: false },
        { label: "تک‌زبانه بودن در بازار صادراتی", w: 10, on: true },
        { label: "تصاویر حجیم و بهینه‌نشده کاتالوگ", w: 6, on: false },
        { label: "نبود داده‌های ساخت‌یافته سازمانی", w: 6, on: false },
        { label: "فقدان هدرهای امنیتی مرورگر", w: 5, on: false },
        { label: "پنهان بودن مسیر ارتباط مستقیم", w: 5, on: false }
      ],
      simOutScore: "امتیاز محاسبه‌شده فرصت تجاری",
      simOutTier: "طبقه مشتری هدف",
      simOutWedge: "اقدام خودکار موتور اوتریچ"
    },
    ar: {
      metaTitle: "المحرك السداسي وفاحص 9 نقاط التفاعلي — ليدفيوم",
      metaDesc:
        "استعراض هندسي شامل لأكثر من 240 مصدراً تجارياً وفاحص Chromium الآلي ومحرك تقارير التدقيق من 14 صفحة.",
      kicker: "البنية الهندسية للنظام · +2,030 اختباراً آلياً",
      h1: "مُصمم كبنية تحتية حرجة، لا كأداة تسويق تقليدية.",
      sub: "تعرّف على كل طبقة في محرك ليدفيوم؛ من السجلات التجارية الرسمية وفحص المتصفح الحقيقي إلى التأهيل الموثق وبوابات الأمان المتسلسلة.",
      srcTitle: "+240 مصدراً رسمياً موثقاً لاكتشاف الشركات",
      srcSub: "نستبعد القوائم العشوائية ونركز حصرياً على المنشآت ذات النشاط التجاري الفعلي القابل للتحقق.",
      srcHeaders: ["فئة المصدر", "أبرز السجلات والأدلة المتصلة", "مؤشر الجاهزية التجارية"],
      srcRows: [
        ["السجلات التجارية الرسمية", "سجلات الشركات في بريطانيا وفرنسا والنرويج وفنلندا وأرقام التسجيل الوطني", "كيان قانوني نشط ورمز نشاط معتمد وأسماء المديرين"],
        ["أدلة المعارض الدولية", "عارضو جلفود وسيال وأمبيينتي وفيتشينزا والمعارض الإقليمية", "شركات تستثمر فعلياً في التواجد التجاري الدولي"],
        ["غرف التجارة والصناعة", "غرف دبي وأبوظبي وقطر والغرف العربية الأوروبية المشتركة", "مستوردون وموزعون وتجار جملة نشطون"],
        ["المسح المكاني للشركات", "شبكات الخرائط المفتوحة للمدن والمناطق الصناعية", "شركات تقليدية ذات قدرة شرائية ومواقع قديمة أو غائبة"],
        ["رادار الطلب الحي", "+140 منتدى صناعياً ومجتمع أعمال متخصص", "رصد فوري لطلبات الشراء والاستفسارات الحية"]
      ],
      simKicker: "محاكي فاحص الجاهزية من 9 نقاط",
      simTitle: "جرّب كيف يقيّم محركنا نطاق الشركة المستهدفة.",
      simSub: "فعّل أو أوقف الفجوات التقنية أدناه لمشاهدة كيفية حساب درجة الفرصة واختيار مدخل التواصل الأمثل.",
      signals: [
        { label: "غياب شهادة التشفير الآمن HTTPS", w: 22, on: true },
        { label: "عدم توافق العرض مع الجوال 390 بكسل", w: 16, on: true },
        { label: "غياب نموذج طلب عروض الأسعار بالجملة", w: 18, on: true },
        { label: "بطء التحميل على الجوال لأكثر من 4 ثوانٍ", w: 10, on: false },
        { label: "موقع أحادي اللغة لشركة مصدرة", w: 10, on: true },
        { label: "صور ثقيلة غير مضغوطة", w: 6, on: false },
        { label: "غياب البيانات المهيكلة للشركة", w: 6, on: false },
        { label: "نقص ترويسات الأمان الأساسية", w: 5, on: false },
        { label: "صعوبة الوصول لبيانات التواصل المباشر", w: 5, on: false }
      ],
      simOutScore: "درجة الفرصة المحسوبة",
      simOutTier: "تصنيف العميل المثالي",
      simOutWedge: "الإجراء الآلي الموصى به"
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(E.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:900px">${esc(E.h1)}</h1>
      <p class="lead-prose">${esc(E.sub)}</p>
    </div>
  </section>

  ${renderPipelineDeck(lang)}

  <section class="lv-section surface-light">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <h2 class="display-lg">${esc(E.srcTitle)}</h2>
          <p class="lead-prose">${esc(E.srcSub)}</p>
        </div>
      </div>

      <div class="table-scroll-wrap">
        <table class="lv-table">
          <thead>
            <tr>
              ${E.srcHeaders.map((h) => `<th>${esc(h)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${E.srcRows
              .map(
                (r) =>
                  `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="lv-section surface-white">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(E.simKicker)}</span></span>
          <h2 class="display-lg">${esc(E.simTitle)}</h2>
          <p class="lead-prose">${esc(E.simSub)}</p>
        </div>
      </div>

      <div id="scanner-simulator" class="interactive-workbench">
        <div class="workbench-split">
          <div class="scanner-checks-grid">
            ${E.signals
              .map(
                (sig) =>
                  `<button type="button" class="scan-signal-btn${sig.on ? " has-gap" : ""}" data-gap-weight="${
                    sig.w
                  }"><span>${esc(sig.label)}</span><span>+${esc(fmtNum(sig.w, lang))}</span></button>`
              )
              .join("")}
          </div>

          <div class="estimator-summary-card">
            <div style="font-size:0.84rem;color:var(--muted-on-dark)">${esc(E.simOutScore)}</div>
            <div id="scan-score-val" class="display-lg" style="color:#34D399;margin-top:6px"></div>
            <div style="margin-top:18px;font-size:0.83rem;color:var(--muted-on-dark)">${esc(E.simOutTier)}</div>
            <div id="scan-tier-val" style="font-weight:700;color:#FFFFFF;margin-top:4px"></div>
            <div style="margin-top:16px;font-size:0.83rem;color:var(--muted-on-dark)">${esc(E.simOutWedge)}</div>
            <div id="scan-wedge-val" style="color:#93C5FD;font-weight:600;margin-top:4px"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderAuditDossierFan(lang)}
  ${renderClosingPortal(lang)}
  `;

  return { title: E.metaTitle, description: E.metaDesc, bodyHtml };
}

/* ==========================================================================
   3. STUDIO & COCKPIT PAGE (/platform/)
   ========================================================================== */
export function renderPlatformPage(lang) {
  const cases = UNIBOX_SANDBOX[lang];
  const P = {
    en: {
      metaTitle: "Outreach Studio, Unibox & 12-View Executive Cockpit — Leadvium",
      metaDesc:
        "Tour Leadvium's pure-white Outreach Studio, 3-Column Unibox, FACTS.md smart drafts, and <13ms read-only Executive Cockpit.",
      kicker: "Inside the Software · Pure-White Studio + Executive Cockpit",
      h1: "Full transparency for your leadership. Zero daily busywork for your team.",
      sub: "Every client engagement runs on dedicated workspaces inside Leadvium Studio and our 12-view Read-Only Executive Cockpit — giving you real-time pipeline clarity in 5 minutes a day.",
      sbKicker: "Interactive Unibox & Guardrail Sandbox",
      sbTitle: "Click any inbound buyer scenario to see how our state machine responds.",
      sbSub: "Every reply is grounded in your workspace FACTS.md and NEGOTIATION.md — never inventing discounts, never claiming AI is human, and executing same-day atomic opt-outs.",
      lblProspect: "Prospect & Thread",
      lblInbound: "Inbound Buyer Message",
      lblGate: "Outbound Gate Verdict",
      lblDraft: "System Action / Grounded Reply",
      lblRule: "Governance Rule Enforced"
    },
    fa: {
      metaTitle: "استودیو اوتریچ، صندوق واحد و پیشخوان مدیریتی ۱۲ نمایی — لیدویوم",
      metaDesc:
        "تور کامل نرم‌افزار اختصاصی لیدویوم شامل استودیو اوتریچ، صندوق پاسخگویی ۳ ستونه مقید به حقایق و پیشخوان مدیریتی زیر ۱۳ میلی‌ثانیه.",
      kicker: "درون پلتفرم اختصاصی · استودیو عملیات + پیشخوان مدیران",
      h1: "شفافیت لحظه‌ای برای مدیرعامل؛ بدون درگیر کردن تیم شما در کارهای روزمره.",
      sub: "پروژه هر کارفرما روی یک فضای کاری کاملاً مجزا در استودیو لیدویوم و پیشخوان مدیریتی ۱۲ صفحه‌ای اجرا می‌شود تا با ۵ دقیقه بررسی روزانه روی تمام قیف فروش مسلط باشید.",
      sbKicker: "شبیه‌ساز تعاملی صندوق واحد و گارد مذاکره",
      sbTitle: "روی هر سناریوی پیام مشتری کلیک کنید تا واکنش دقیق موتور را ببینید.",
      sbSub: "تمامی پاسخ‌ها مقید به منشور حقایق و دامنه مجاز قیمت کسب‌وکار شما هستند؛ بدون تخفیف سرخود، بدون جعل هویت انسانی و با لغو اشتراک اتمیک فوری.",
      lblProspect: "مشتری و پرونده گفتگو",
      lblInbound: "پیام دریافتی از خریدار",
      lblGate: "حکم گیت ایمنی و صحت‌سنجی",
      lblDraft: "پاسخ مستند یا اقدام سیستم",
      lblRule: "قانون حکمرانی اعمال‌شده"
    },
    ar: {
      metaTitle: "استوديو الاستقطاب والصندوق الموحد ولوحة القيادة — ليدفيوم",
      metaDesc:
        "تعرّف على استوديو ليدفيوم الموحد ونظام الردود المقيد بالحقائق ولوحة القيادة التنفيذية ذات 12 واجهة.",
      kicker: "داخل المنصة · استوديو العمليات + لوحة القيادة التنفيذية",
      h1: "رؤية تنفيذية كاملة للإدارة دون أعباء تشغيلية يومية.",
      sub: "يعمل كل عميل ضمن مساحة معزولة بالكامل داخل استوديو ليدفيوم ولوحة القيادة التنفيذية لمتابعة الصفقات في 5 دقائق يومياً.",
      sbKicker: "محاكي الصندوق الموحد وحواجز الأمان",
      sbTitle: "اختر أي سيناريو لرد المشتري لمعاينة استجابة المحرك الموثقة.",
      sbSub: "تُصاغ كل استجابة وفق ملف الحقائق ونطاق التفاوض المعتمد لديكم، مع حظر الخصومات العشوائية وتنفيذ إلغاء الاشتراك الفوري.",
      lblProspect: "العميل والمحادثة",
      lblInbound: "رسالة المشتري الواردة",
      lblGate: "قرار بوابة الحوكمة",
      lblDraft: "الرد الموثق أو إجراء النظام",
      lblRule: "القاعدة المطبقة"
    }
  }[lang];

  const sbTabs = cases
    .map(
      (c, i) =>
        `<button type="button" class="studio-tab-btn${i === 0 ? " is-active" : ""}" data-tab-target="unibox-${
          c.id
        }" aria-selected="${i === 0 ? "true" : "false"}">${esc(c.intent)}</button>`
    )
    .join("");

  const sbPanels = cases
    .map(
      (c, i) => `
      <div data-tab-panel="unibox-sim" data-panel-id="unibox-${c.id}"${i === 0 ? "" : " hidden"}>
        <div class="cards-grid-2">
          <div class="arch-card" style="background:var(--bg-light)">
            <div style="font-size:0.82rem;color:var(--muted-ink);font-weight:600">${esc(P.lblProspect)}</div>
            <strong>${esc(c.prospect)}</strong>
            <div style="font-size:0.82rem;color:var(--muted-ink);font-weight:600;margin-top:8px">${esc(P.lblInbound)}</div>
            <p style="margin:0;padding:12px;background:#FFFFFF;border-radius:10px;border:1px solid var(--border-light)">${esc(
              c.inbound
            )}</p>
          </div>

          <div class="arch-card" style="background:#08111D;color:#F3F7FC;border-color:var(--border-dark-strong)">
            <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">
              <span style="font-size:0.8rem;color:#9CB1CB">${esc(P.lblGate)}</span>
              <span style="font-size:0.8rem;font-weight:700;color:#34D399">${esc(c.gateStatus)}</span>
            </div>
            <div style="font-size:0.82rem;color:#9CB1CB;margin-top:6px">${esc(P.lblDraft)}</div>
            <p style="margin:0;padding:12px;background:rgba(255,255,255,0.06);border-radius:10px;font-size:0.92rem">${esc(
              c.response
            )}</p>
            <div style="font-size:0.8rem;color:#93C5FD;margin-top:6px">⚙ ${esc(P.lblRule)}: ${esc(c.ruleApplied)}</div>
          </div>
        </div>
      </div>`
    )
    .join("");

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(P.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:900px">${esc(P.h1)}</h1>
      <p class="lead-prose">${esc(P.sub)}</p>
    </div>
  </section>

  ${renderStudioShowcase(lang)}

  <section id="cockpit" class="lv-section surface-white">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(P.sbKicker)}</span></span>
          <h2 class="display-lg">${esc(P.sbTitle)}</h2>
          <p class="lead-prose">${esc(P.sbSub)}</p>
        </div>
      </div>

      <div class="interactive-workbench">
        <div class="studio-tab-bar" data-tab-group="unibox-sim" role="tablist">
          ${sbTabs}
        </div>
        ${sbPanels}
      </div>
    </div>
  </section>

  ${renderClosingPortal(lang)}
  `;

  return { title: P.metaTitle, description: P.metaDesc, bodyHtml };
}

/* ==========================================================================
   4. CUSTOM SOLUTIONS PAGE (/solutions/)
   ========================================================================== */
export function renderSolutionsPage(lang) {
  const playbooks = INDUSTRY_PLAYBOOKS[lang];
  const S = {
    en: {
      metaTitle: "Custom B2B Outbound Solutions & Industry Playbooks — Leadvium",
      metaDesc:
        "Tailored B2B lead discovery and multi-channel outbound playbooks for exporters, agencies, SaaS platforms, industrial brokers, and MENA expansion.",
      kicker: "Custom Turnkey Solutions · Built Around Your Business",
      h1: "Every industry buys differently. We custom-engineer your exact wedge.",
      sub: "You don't adapt your business to rigid software templates. We configure custom registry harvesters, diagnostic assets, channel priorities, and negotiation rules for your sector.",
      lblSources: "Primary Data Sources",
      lblWedge: "Custom Value Wedge",
      lblChannels: "Channel Sequence",
      lblFit: "Recommended Commercial Track",
      rollTitle: "30-Day Custom Engineering & Launch Timeline",
      rollHeaders: ["Window", "Engineering Milestone", "Concrete Client Deliverable"],
      rollRows: [
        ["Days 1 – 5", "Business Intake, Sister-Domains & Fact Vault", "2–4 isolated domains (SPF/DKIM/DMARC), codified FACTS.md & NEGOTIATION.md"],
        ["Days 6 – 12", "Custom Harvester Wiring & Diagnostic Asset", "500+ enriched Tier-A prospects + custom 14-page Audit PDF or technical brief"],
        ["Days 13 – 21", "Controlled Canary Batch (100–200 Prospects)", "Live A/B angle test gated on ≥3% positive reply benchmark before scaling"],
        ["Days 22 – 30+", "Multi-Channel Scale & 5-Min Unibox Handoff", "Full Email + WhatsApp + Telegram cadence + live 12-view Executive Cockpit"]
      ]
    },
    fa: {
      metaTitle: "راهکارهای اختصاصی صنایع و پلی‌بوک‌های اوتریچ شرکتی — لیدویوم",
      metaDesc:
        "طراحی و اجرای اختصاصی موتور کشف سرنخ و فروش چندکاناله ویژه صادرکنندگان، آژانس‌های فنی، پلتفرم‌های نرم‌افزاری، کارخانجات و بازار خلیج فارس.",
      kicker: "راهکارهای کلیدبه‌دست اختصاصی · منطبق با مدل تجاری شما",
      h1: "هر صنعت منطق خرید متفاوتی دارد؛ ما موتور اختصاصی صنف خودتان را می‌سازیم.",
      sub: "شما مجبور نیستید کسب‌وکارتان را با قالب‌های خشک آماده تطبیق دهید. ما منابع استخراج لید، قلاب ارزش‌آفرین، اولویت کانال‌ها و قواعد مذاکره را دقیقاً برای بازار شما مهندسی می‌کنیم.",
      lblSources: "منابع اصلی کشف سرنخ",
      lblWedge: "قلاب ارزش‌آفرین اختصاصی",
      lblChannels: "ترتیب کانال‌های تماس",
      lblFit: "مدل همکاری پیشنهادی",
      rollTitle: "جدول زمان‌بندی ۳۰ روزه طراحی، ساخت و راه‌اندازی اختصاصی",
      rollHeaders: ["بازه زمانی", "گام مهندسی و عملیاتی", "خروجی ملموس تحویلی به کارفرما"],
      rollRows: [
        ["روز ۰۱ تا ۰۵", "دریافت بریف، دامنه‌های خواهر و منشور حقایق", "راه‌اندازی ۲ تا ۴ دامنه ایزوله، تنظیم رکوردهای امنیتی و تدوین منشور مذاکره"],
        ["روز ۰۶ تا ۱۲", "اتصال خزنده‌های اختصاصی و ساخت فایل ارزش‌آفرین", "استخراج بیش از ۵۰۰ شرکت رده الف + آماده‌سازی قالب گزارش ۱۴ صفحه‌ای اختصاصی"],
        ["روز ۱۳ تا ۲۱", "اجرای بچ آزمایشی قناری (۱۰۰ تا ۲۰۰ شرکت)", "تست هم‌زمان دو زاویه پیام و سنجش معیار حداقل ۳ درصد پاسخ مثبت پیش از مقیاس"],
        ["روز ۲۲ تا ۳۰+", "مقیاس‌دهی چندکاناله و تحویل در صندوق واحد", "فعال‌سازی چرخه کامل ایمیل، واتس‌اپ و تلگرام به همراه دسترسی پیشخوان ۱۲ نمایی"]
      ]
    },
    ar: {
      metaTitle: "حلول الاستقطاب المخصصة وخطط القطاعات — ليدفيوم",
      metaDesc:
        "حلول استقطاب وتواصل متعدد القنوات مصممة خصيصاً للمصدرين والوكالات ومنصات البرمجيات والمصانع والتوسع في الخليج.",
      kicker: "حلول مخصصة بالكامل · تُبنى حول نموذج أعمالك",
      h1: "لكل قطاع آلية شراء مختلفة؛ ونحن نهندس المدخل الأمثل لسوقك.",
      sub: "لا نفرض عليك قوالب جامدة؛ بل نبرمج مصادر البيانات وأدوات التشخيص وأولوية القنوات وقواعد التفاوض خصيصاً لنشاطك.",
      lblSources: "مصادر البيانات الرئيسية",
      lblWedge: "مدخل القيمة المخصص",
      lblChannels: "تتابع القنوات",
      lblFit: "المسار التعاقدي الموصى به",
      rollTitle: "الجدول الزمني الهندسي للإطلاق خلال 30 يوماً",
      rollHeaders: ["الفترة", "المرحلة الهندسية", "المخرجات الملموسة للعميل"],
      rollRows: [
        ["الأيام 1 – 5", "تحليل النشاط والنطاقات الشقيقة وسجل الحقائق", "تجهيز 2–4 نطاقات معزولة وتوثيق سجل الحقائق وسقف التفاوض"],
        ["الأيام 6 – 12", "ربط مصادر الاستخراج وأداة التشخيص", "تأهيل +500 شركة فئة A وتجهيز قالب التقرير التنفيذي ذي 14 صفحة"],
        ["الأيام 13 – 21", "دفعة الاختبار الاستطلاعية (100–200 شركة)", "اختبار زوايا الرسائل والتحقق من تجاوز 3% ردود إيجابية قبل التوسع"],
        ["الأيام 22 – +30", "التوسع متعدد القنوات وتسليم الصفقات", "تشغيل البريد وواتساب وتيليجرام مع تفعيل لوحة القيادة التنفيذية"]
      ]
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(S.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:900px">${esc(S.h1)}</h1>
      <p class="lead-prose">${esc(S.sub)}</p>
    </div>
  </section>

  <section class="lv-section surface-light">
    <div class="lv-container">
      <div class="cards-grid-2">
        ${playbooks
          .map(
            (pb) => `
          <article class="arch-card">
            <h2 class="heading-md">${esc(pb.title)}</h2>
            <div style="font-size:0.9rem;color:var(--cobalt);font-weight:600">${esc(pb.subtitle)}</div>
            <div style="display:grid;gap:8px;margin-top:8px;font-size:0.9rem">
              <div><strong>${esc(S.lblSources)}:</strong> <span style="color:var(--muted-ink)">${esc(pb.sources)}</span></div>
              <div><strong>${esc(S.lblWedge)}:</strong> <span style="color:var(--muted-ink)">${esc(pb.wedge)}</span></div>
              <div><strong>${esc(S.lblChannels)}:</strong> <span style="color:var(--muted-ink)">${esc(pb.channels)}</span></div>
              <div style="padding-top:8px;border-top:1px solid var(--border-light)"><strong>${esc(
                S.lblFit
              )}:</strong> <span style="color:var(--emerald);font-weight:600">${esc(pb.model)}</span></div>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="lv-section surface-white">
    <div class="lv-container">
      <h2 class="display-lg" style="margin-bottom:28px">${esc(S.rollTitle)}</h2>
      <div class="table-scroll-wrap">
        <table class="lv-table">
          <thead>
            <tr>${S.rollHeaders.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${S.rollRows
              .map(
                (r) =>
                  `<tr><td><strong>${esc(r[0])}</strong></td><td><strong>${esc(r[1])}</strong></td><td>${esc(
                    r[2]
                  )}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  ${renderScopeEstimator(lang)}
  ${renderClosingPortal(lang)}
  `;

  return { title: S.metaTitle, description: S.metaDesc, bodyHtml };
}

/* ==========================================================================
   5. ENGAGEMENT & PRICING PAGE (/pricing/)
   ========================================================================== */
export function renderPricingPage(lang) {
  const PR = {
    en: {
      metaTitle: "Engagement Models & Pricing (Project or Monthly) — Leadvium",
      metaDesc:
        "Transparent commercial models: launch a fixed $2,900 4-Week Pilot Sprint, scale with a $2,400/mo Managed Growth Retainer, or deploy a Dedicated Sovereign Pod.",
      kicker: "Transparent Commercial Engineering",
      h1: "Start with a fixed 4-week project, or run us as your monthly outbound department.",
      sub: "Every engagement includes dedicated workspace isolation, sister-domain DNS protection, codified fact guardrails, and full ownership of your enriched prospect data.",
      cmpTitle: "Side-by-Side Architecture & Scope Comparison",
      cmpHeaders: ["Capability / Deliverable", "Pilot Sprint ($2,900 Project)", "Managed Growth ($2,400/mo)", "Sovereign Pod ($4,800/mo)"],
      cmpRows: [
        ["Commercial Structure", "One-time 4-week fixed project", "Monthly retainer (or $1,950/mo quarterly)", "Monthly multi-brand pod or turnkey build"],
        ["Verified Tier-A Prospect Supply", "500 enriched companies", "1,500 – 3,000 companies / month", "6,000+ custom-harvested entities / month"],
        ["Isolated Sister-Domains & Mailboxes", "2 domains · 4 mailboxes", "4 domains · up to 10 mailboxes", "8+ domains · custom regional fleet"],
        ["Outbound Channels", "Email + Assisted LinkedIn/Telegram", "Email + WhatsApp (1-IP) + Telegram + Radar", "All channels + 3-way brokerage groups"],
        ["Automated Diagnostic Wedge", "9-Point Domain Scan or Brief PDF", "Full 14-Page Branded A4 Audit PDF", "Custom multi-language PDF + proforma engine"],
        ["Unibox & Cockpit Access", "30-day pilot readout + CSV/SQLite export", "Live 3-Col Unibox + 12-View Cockpit", "Dedicated VPS/VPC + custom CRM webhooks"]
      ]
    },
    fa: {
      metaTitle: "مدل‌های همکاری و تعرفه (پروژه‌ای و ماهانه) — لیدویوم",
      metaDesc:
        "انتخاب شفاف بین پایلوت پروژه‌ای ۴ هفته‌ای (۲٬۹۰۰ دلار)، اشتراک مدیریت کامل ماهانه (۲٬۴۰۰ دلار) یا پاد اختصاصی چندبرندی.",
      kicker: "مدل‌های تجاری شفاف و انعطاف‌پذیر",
      h1: "با یک پروژه ۴ هفته‌ای مستقل شروع کنید یا کل واحد اوتریچ ماهانه‌تان را به ما بسپارید.",
      sub: "در تمامی مدل‌ها، جداسازی کامل فضای کاری، سپر محافظت دامنه خواهر، کدگذاری منشور حقایق و مالکیت ۱۰۰ درصدی بانک داده سرنخ‌های غنی‌شده متعلق به شماست.",
      cmpTitle: "جدول مقایسه دقیق تحویلی‌ها در مدل پروژه‌ای و ماهانه",
      cmpHeaders: ["قابلیت و تعهد مهندسی", "پایلوت اختصاصی (۲٬۹۰۰ دلار پروژه‌ای)", "موتور رشد ماهانه (۲٬۴۰۰ دلار/ماه)", "پاد اختصاصی سازمانی (۴٬۸۰۰ دلار/ماه)"],
      cmpRows: [
        ["ساختار قرارداد مالی", "پروژه‌ای یک‌باره ۴ هفته‌ای بدون تعهد تمدید", "اشتراک ماهانه (یا ۱٬۹۵۰ دلار در قرارداد فصلی)", "ماهانه چندبرندی یا تحویل کلیدبه‌دست سرور"],
        ["ظرفیت تامین شرکت‌های رده الف", "۵۰۰ شرکت غنی‌سازی و تاییدشده", "۱٬۵۰۰ تا ۳٬۰۰۰ شرکت تاییدشده در ماه", "بیش از ۶٬۰۰۰ واحد تجاری اختصاصی در ماه"],
        ["دامنه‌های خواهر و صندوق‌های ارسال", "۲ دامنه ایزوله · ۴ صندوق گرم‌شده", "۴ دامنه ایزوله · تا ۱۰ صندوق گرم‌شده", "بیش از ۸ دامنه · ناوگان منطقه‌ای مجزا"],
        ["کانال‌های ارتباطی فعال", "ایمیل + لینکدین کمکی و تلگرام", "ایمیل + واتس‌اپ آی‌پی مجزا + تلگرام + رادار", "تمامی کانال‌ها + گروه سه‌جانبه بروکریج"],
        ["خروجی ارزش‌آفرین خودکار", "اسکن ۹گانه یا خلاصه مدیریتی اختصاصی", "کتابچه ممیزی خودکار ۱۴ صفحه‌ای اختصاصی", "گزارش چندزبانه + موتور پیش‌فاکتور رسمی"],
        ["دسترسی نرم‌افزاری و مالکیت داده", "تحویل کامل دیتابیس و گزارش پایان پایلوت", "دسترسی زنده به صندوق واحد و پیشخوان ۱۲ نمایی", "استقرار روی سرور اختصاصی + اتصال وب‌هوک"]
      ]
    },
    ar: {
      metaTitle: "نماذج التعاقد والأسعار (بالمشروع أو شهرياً) — ليدفيوم",
      metaDesc:
        "اختر بين مشروع تجريبي محدد لمدة 4 أسابيع ($2,900) أو محرك نمو شهري مُدار ($2,400/شهرياً) أو وحدة إيرادات سيادية مخصصة.",
      kicker: "شفافية تعاقدية وهندسية كاملة",
      h1: "ابدأ بمشروع محدد لـ 4 أسابيع، أو اعتمدنا كقسم استقطاب شهري متكامل.",
      sub: "تشمل جميع الباقات عزل مساحة العمل، وحماية النطاقات الشقيقة، وتوثيق الحقائق، وملكيتك الكاملة لقاعدة بيانات العملاء المؤهلين.",
      cmpTitle: "مقارنة تفصيلية بين نظام المشروع والإدارة الشهرية",
      cmpHeaders: ["الميزة / المخرجات", "مشروع 4 أسابيع ($2,900)", "محرك النمو الشهري ($2,400/شهرياً)", "الوحدة السيادية ($4,800/شهرياً)"],
      cmpRows: [
        ["طبيعة التعاقد", "دفعة مشروع لمرة واحدة لمدة 4 أسابيع", "اشتراك شهري (أو $1,950 فصلياً)", "إدارة متعددة العلامات أو تسليم مفتاح"],
        ["إمداد الشركات الموثقة (فئة A)", "500 شركة مدققة", "1,500 – 3,000 شركة شهرياً", "+6,000 منشأة مستخرجة خصيصاً شهرياً"],
        ["النطاقات الشقيقة وصناديق البريد", "نطاقان · 4 صناديق بريد", "4 نطاقات · حتى 10 صناديق بريد", "+8 نطاقات · أسطول إقليمي مستقل"],
        ["القنوات المفعلة", "البريد + لينكدإن وتيليجرام", "البريد + واتساب مستقل + تيليجرام + الرادار", "جميع القنوات + مجموعات الوساطة الثلاثية"],
        ["أداة القيمة التشخيصية", "فحص 9 نقاط أو ملف تعريفي", "تقرير تدقيق آلي من 14 صفحة PDF", "تقارير متعددة اللغات + فواتير مبدئية آلية"],
        ["الوصول للمنصة والبيانات", "تقرير ختامي وتصدير كامل للبيانات", "صندوق موحد حي + لوحة قيادة 12 واجهة", "خادم مخصص + ربط مباشر بأنظمة CRM"]
      ]
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(PR.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:920px">${esc(PR.h1)}</h1>
      <p class="lead-prose">${esc(PR.sub)}</p>
    </div>
  </section>

  ${renderPricingSection(lang, false)}
  ${renderScopeEstimator(lang)}

  <section class="lv-section surface-light">
    <div class="lv-container">
      <h2 class="display-lg" style="margin-bottom:28px">${esc(PR.cmpTitle)}</h2>
      <div class="table-scroll-wrap">
        <table class="lv-table">
          <thead>
            <tr>${PR.cmpHeaders.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${PR.cmpRows
              .map(
                (r) =>
                  `<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td><strong>${esc(
                    r[2]
                  )}</strong></td><td>${esc(r[3])}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  ${renderClosingPortal(lang)}
  `;

  return { title: PR.metaTitle, description: PR.metaDesc, bodyHtml };
}

/* ==========================================================================
   6. TRUST, DELIVERABILITY & GOVERNANCE PAGE (/trust/)
   ========================================================================== */
export function renderTrustPage(lang) {
  const T = {
    en: {
      metaTitle: "Safety, Sister-Domain Shield & FACTS.md Governance — Leadvium",
      metaDesc:
        "How Leadvium protects your brand reputation: hard-blocked primary domains, 7 sequential outbound gates, and live NEVER-CLAIM copy linting.",
      kicker: "Brand & Domain Protection Architecture",
      h1: "Your reputation is worth more than any campaign. Every message passes 7 hard gates.",
      sub: "Most outbound agencies burn your primary corporate domain and hallucinate promises. Leadvium enforces safety in code — inside studio_safety.py and core/outbound.py — before a single byte leaves the server.",
      gatesTitle: "The 7 Sequential Outbound Gates (core/outbound.py)",
      gates: [
        ["01 · Global Suppression Gate", "Checks domain & contact against permanent opt-out ledger before enrichment or send."],
        ["02 · Tenant & Channel Kill Switch", "Instant per-workspace and per-channel circuit breakers triggered automatically on bounce spikes."],
        ["03 · Sister-Domain Isolation Shield", "Root corporate domains (*.yourbrand.com) are hard-blocked; outreach runs strictly on warmed sister domains."],
        ["04 · Tier Qualification Filter", "Only verified Tier-A (and approved Tier-B) entities pass; Tier-C and excluded markets are dropped."],
        ["05 · FACTS.md & NEVER-CLAIM Critic", "Blocks unverified ranking promises, unauthorized discounts, or AI-human impersonation."],
        ["06 · Single-Thread-Per-Contact Lock", "Guarantees two channels never message the same buyer simultaneously."],
        ["07 · Lead-Local Business Hours", "Holds dispatch until the buyer's exact regional workweek (EU, Gulf Sun–Thu, Iran Sat–Thu, East Asia)."]
      ],
      linterKicker: "Interactive Pre-Flight Copy Linter",
      linterTitle: "Test our NEVER-CLAIM critic live.",
      linterSub: "Click a sample draft below or write your own cold outreach line to see how Leadvium blocks risky claims before dispatch.",
      defaultSample:
        "Noticed your export catalog runs over plain HTTP without a bulk RFQ form — would a 14-page diagnostic PDF be useful?",
      samples: [
        {
          label: "✓ Verified Diagnostic Offer",
          text: "Noticed your export catalog runs over plain HTTP without a bulk RFQ form — would a 14-page diagnostic PDF be useful?"
        },
        {
          label: "⛔ Ranking Guarantee Trap",
          text: "We guarantee #1 Google ranking and 100% buyer growth in 30 days!"
        },
        {
          label: "⛔ Human Impersonation Trap",
          text: "Yes, I am a real human typing this manually, not an AI assistant."
        },
        {
          label: "⛔ Premature Call Push",
          text: "Let's hop on Zoom for a quick 15-min call tomorrow morning!"
        }
      ]
    },
    fa: {
      metaTitle: "امنیت برند، سپر دامنه خواهر و حاکمیت حقایق — لیدویوم",
      metaDesc:
        "چگونه لیدویوم از اعتبار برند و دامنه اصلی شما محافظت می‌کند: ۷ گیت متوالی ارسال، دامنه‌های خواهر ایزوله و ممیز زنده منع وعده‌های ساختگی.",
      kicker: "معماری حفاظت از اعتبار برند و دامنه",
      h1: "اعتبار تجاری شما ارزشمندتر از هر کمپینی است؛ عبور هر پیام از ۷ گیت سخت‌افزاری.",
      sub: "آژانس‌های سنتی دامنه اصلی شرکت شما را مسدود می‌کنند یا وعده‌های غیرواقعی می‌دهند. در لیدویوم، قوانین ایمنی به‌صورت کدهای غیرقابل‌دورزدن پیش از ارسال هر بایت اعمال می‌شوند.",
      gatesTitle: "۷ گیت ایمنی متوالی در مسیر واحد ارسال",
      gates: [
        ["۰۱ · گیت فهرست سیاه سراسری", "بررسی آنی دامنه و مخاطب در دفتر کل لغو اشتراک پیش از هرگونه مصرف منابع یا ارسال."],
        ["۰۲ · کلید قطع اضطراری هوشمند", "توقف خودکار هر صندوق در صورت مشاهده کوچک‌ترین نوسان در نرخ برگشت یا اسپم."],
        ["۰۳ · سپر ایزوله دامنه خواهر", "مسدودسازی کامل دامنه اصلی برند شما برای ارسال سرد؛ استفاده انحصاری از دامنه‌های خواهر گرم‌شده."],
        ["۰۴ · فیلتر سخت‌گیرانه طبقه سرنخ", "عبور انحصاری شرکت‌های تاییدشده رده الف و حذف خودکار رقبا و بازارهای غیرهدف."],
        ["۰۵ · ممیز منشور حقایق و منع وعده", "جلوگیری از ارسال هرگونه تضمین رتبه، تخفیف خارج از چارچوب یا ادعای غیرمستند."],
        ["۰۶ · قفل تک‌رشته‌ای هر مخاطب", "تضمین عدم ارسال پیام موازی در ایمیل و واتس‌اپ به یک شخص واحد."],
        ["۰۷ · تطبیق دقیق ساعت و تقویم مقصد", "ارسال انحصاری در روز و ساعت کاری کشور خریدار (اروپا، خلیج فارس، شرق آسیا و شنبه تا پنج‌شنبه ایران)."]
      ],
      linterKicker: "آزمایشگاه زنده ممیز متن پیش از ارسال",
      linterTitle: "ممیز هوشمند منع وعده‌های غیرمستند را همین‌جا امتحان کنید.",
      linterSub: "یکی از جملات نمونه زیر را انتخاب کنید یا متن دلخواه خود را بنویسید تا واکنش لحظه‌ای گارد ارسال لیدویوم را ببینید.",
      defaultSample:
        "کاتالوگ صادراتی دامنه شما را بررسی کردیم؛ فرم استعلام خرید عمده فعال نیست. مایلید گزارش تحلیلی ۱۴ صفحه‌ای آن را برایتان ارسال کنم؟",
      samples: [
        {
          label: "✓ پیشنهاد مستند و مجاز",
          text: "کاتالوگ صادراتی دامنه شما را بررسی کردیم؛ فرم استعلام خرید عمده فعال نیست. مایلید گزارش تحلیلی ۱۴ صفحه‌ای آن را برایتان ارسال کنم؟"
        },
        {
          label: "⛔ تله تضمین رتبه یک",
          text: "ما رتبه یک گوگل و تضمین قطعی فروش در ماه اول را به شما می‌دهیم!"
        },
        {
          label: "⛔ تله جعل هویت انسانی",
          text: "بله من انسان واقعی هستم و اصلاً ربات نیستم."
        },
        {
          label: "⛔ تحمیل جلسه تلفنی زودهنگام",
          text: "همین فردا یک جلسه تلفنی فوری ۱۵ دقیقه‌ای بگذاریم!"
        }
      ]
    },
    ar: {
      metaTitle: "حوكمة الإرسال ودرع النطاقات الشقيقة — ليدفيوم",
      metaDesc:
        "كيف تحمي ليدفيوم سمعة علامتك ونطاقك الرئيسي عبر 7 بوابات أمان متسلسلة ومدقق الحقائق الموثقة قبل كل إرسال.",
      kicker: "هندسة حماية السمعة والنطاق الرئيسي",
      h1: "سمعة علامتك التجارية أغلى من أي حملة؛ كل رسالة تعبر 7 بوابات أمان صارمة.",
      sub: "تحرق الأدوات العشوائية نطاقات الشركات وتطلق وعوداً غير دقيقة. في ليدفيوم، تُطبق ضوابط الأمان برمجياً قبل خروج أي رسالة.",
      gatesTitle: "بوابات الأمان السبع المتتالية قبل الإرسال",
      gates: [
        ["01 · بوابة سجل الحظر الشامل", "فحص النطاق وجهة الاتصال مقابل قائمة إلغاء الاشتراك الدائمة قبل أي خطوة."],
        ["02 · قاطع الأمان التلقائي", "إيقاف فوري لأي صندوق بريد عند رصد ارتفاع في الارتداد أو الشكاوى."],
        ["03 · درع عزل النطاقات الشقيقة", "حظر استخدام النطاق الرئيسي لشركتك في الحملات الباردة والاعتماد حصراً على نطاقات شقيقة مُحماة."],
        ["04 · مرشح فئات التأهيل", "تمرير شركات الفئة A الموثقة فقط واستبعاد الأسواق غير المستهدفة والمنافسين."],
        ["05 · مدقق الحقائق ومنع الوعود", "اعتراض أي وعود بترتيب مضمون أو خصومات غير معتمدة أو انتحال هوية بشرية."],
        ["06 · قفل المحادثة الواحدة", "منع إرسال رسائل متوازية لنفس الشخص عبر قنوات متعددة في آنٍ واحد."],
        ["07 · نافذة ساعات العمل المحلية", "جدولة الإرسال حصراً ضمن أيام وساعات العمل الرسمية لبلد المشتري."]
      ],
      linterKicker: "مختبر فحص النصوص الحي قبل الإرسال",
      linterTitle: "اختبر مدقق منع الادعاءات غير الموثقة مباشرةً.",
      linterSub: "اضغط على أحد النماذج أدناه أو اكتب جملتك الخاصة لترى كيف يعترض النظام الصياغات المحظورة.",
      defaultSample:
        "لاحظنا أن دليل التصدير لديكم يعمل بدون تشفير آمن أو نموذج طلب جملة — هل ترغبون في استلام تقرير تشخيصي من 14 صفحة؟",
      samples: [
        {
          label: "✓ عرض تشخيصي موثق",
          text: "لاحظنا أن دليل التصدير لديكم يعمل بدون تشفير آمن أو نموذج طلب جملة — هل ترغبون في استلام تقرير تشخيصي من 14 صفحة؟"
        },
        {
          label: "⛔ وعد بترتيب مضمون",
          text: "نضمن المركز الأول في نتائج البحث ونمواً مضمون 100% خلال شهر!"
        },
        {
          label: "⛔ انتحال هوية بشرية",
          text: "نعم أنا إنسان حقيقي أكتب لك بنفسي ولست نظاماً آلياً."
        },
        {
          label: "⛔ إلحاح على مكالمة سريعة",
          text: "لنحدد مكالمة زووم سريعة غداً صباحاً!"
        }
      ]
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(T.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:920px">${esc(T.h1)}</h1>
      <p class="lead-prose">${esc(T.sub)}</p>
    </div>
  </section>

  <section id="facts-vault" class="lv-section surface-light">
    <div class="lv-container">
      <h2 class="display-lg" style="margin-bottom:32px">${esc(T.gatesTitle)}</h2>
      <div class="cards-grid-2">
        ${T.gates
          .map(
            (g) => `
          <article class="arch-card">
            <h3 class="heading-md" style="font-size:1.12rem;color:var(--cobalt)">${esc(g[0])}</h3>
            <p style="margin:0;color:var(--muted-ink)">${esc(g[1])}</p>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="lv-section surface-dark">
    <div class="lv-container">
      <div class="section-head">
        <div class="section-head-main">
          <span class="kicker-pill"><span>${esc(T.linterKicker)}</span></span>
          <h2 class="display-lg">${esc(T.linterTitle)}</h2>
          <p class="lead-prose">${esc(T.linterSub)}</p>
        </div>
      </div>

      <div class="interactive-workbench">
        <div class="toggle-chip-grid" style="margin-bottom:16px">
          ${T.samples
            .map(
              (s) =>
                `<button type="button" class="chip-toggle" data-linter-sample="${esc(s.text)}">${esc(s.label)}</button>`
            )
            .join("")}
        </div>
        <textarea id="linter-test-input" class="form-textarea" aria-label="${esc(T.linterTitle)}">${esc(
    T.defaultSample
  )}</textarea>
        <div id="linter-verdict-box" style="margin-top:16px;padding:16px;border-radius:12px;border:1px solid rgba(52,211,153,0.45)"></div>
      </div>
    </div>
  </section>

  ${renderClosingPortal(lang)}
  `;

  return { title: T.metaTitle, description: T.metaDesc, bodyHtml };
}

/* ==========================================================================
   7. PRODUCTION BLUEPRINTS PAGE (/work/)
   ========================================================================== */
export function renderWorkPage(lang) {
  const blueprints = BLUEPRINT_CASES[lang];
  const W = {
    en: {
      metaTitle: "Production Outbound Blueprints & Verified Architectures — Leadvium",
      metaDesc:
        "Inspect real multi-tenant outbound architectures engineered on Leadvium across export web transformation, commodity brokerage, and industrial B2B.",
      kicker: "Evidence-First Engineering · Zero Fabricated Testimonials",
      h1: "Three production architectures built on this exact engine.",
      sub: "We never invent fake logos or unverifiable vanity metrics. Below are three real multi-tenant outbound architectures codified inside our codebase, showing exact source pools, wedges, and guardrails.",
      lblMarket: "Target Geography & Buyers",
      lblChallenge: "Commercial Problem",
      lblArch: "Engineered Solution"
    },
    fa: {
      metaTitle: "بلوپرینت‌های اجرایی و معماری‌های پیاده‌سازی‌شده — لیدویوم",
      metaDesc:
        "کالبدشکافی سه معماری واقعی پیاده‌سازی‌شده روی موتور لیدویوم در حوزه‌های صادرات دیجیتال، بروکریج سنگ و کالای عمده و صنایع تولیدی.",
      kicker: "مستندات واقعی مهندسی · بدون عددسازی یا رضایت‌نامه ساختگی",
      h1: "سه معماری عملیاتی پیاده‌سازی‌شده روی همین موتور.",
      sub: "ما هرگز لوگو یا آمار تبلیغاتی غیرواقعی منتشر نمی‌کنیم. در ادامه سه بلوپرینت واقعی که مستقیماً در کدبیس موتور لیدویوم ساخته و تست شده‌اند را با اعداد تاییدشده مشاهده می‌کنید.",
      lblMarket: "جغرافیا و خریداران هدف",
      lblChallenge: "مسئله تجاری بازار",
      lblArch: "معماری پیاده‌سازی‌شده"
    },
    ar: {
      metaTitle: "مخططات الإنتاج والبنى الهندسية الموثقة — ليدفيوم",
      metaDesc:
        "استعرض ثلاث منظومات استقطاب حقيقية مبنية على محرك ليدفيوم في قطاعات منصات التصدير والسلع بالجملة والتوريد الصناعي.",
      kicker: "هندسة مبنية على الأدلة · دون أرقام دعائية مختلقة",
      h1: "ثلاث بنى إنتاجية مبنية على هذا المحرك ذاته.",
      sub: "لا نستخدم شعارات وهمية أو إحصاءات مبالغاً فيها؛ إليك ثلاث منظومات حقيقية مبرمجة ومختبرة داخل قاعدة شفرات ليدفيوم.",
      lblMarket: "الأسواق والمشترون المستهدفون",
      lblChallenge: "التحدي التجاري",
      lblArch: "الحل الهندسي المنفذ"
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(W.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:920px">${esc(W.h1)}</h1>
      <p class="lead-prose">${esc(W.sub)}</p>
    </div>
  </section>

  <section class="lv-section surface-light">
    <div class="lv-container" style="display:grid;gap:26px">
      ${blueprints
        .map(
          (bp) => `
        <article class="interactive-workbench">
          <div style="font-size:0.82rem;font-weight:700;color:var(--cobalt)">${esc(bp.code)}</div>
          <h2 class="display-lg" style="font-size:clamp(1.35rem,2.2vw,1.9rem);margin-top:8px">${esc(bp.title)}</h2>
          <div style="margin-top:8px;font-weight:600;color:var(--muted-ink)">${esc(W.lblMarket)}: ${esc(bp.market)}</div>

          <div class="workbench-split" style="margin-top:20px">
            <div>
              <strong style="font-size:0.9rem">${esc(W.lblChallenge)}</strong>
              <p style="color:var(--muted-ink);margin:6px 0 16px">${esc(bp.challenge)}</p>
              <strong style="font-size:0.9rem">${esc(W.lblArch)}</strong>
              <ul class="plan-feature-list" style="margin-top:10px">
                ${bp.architecture
                  .map((line) => `<li><span class="check-badge">✓</span><span>${esc(line)}</span></li>`)
                  .join("")}
              </ul>
            </div>

            <div class="estimator-summary-card">
              <div style="display:grid;gap:14px">
                ${bp.metrics
                  .map(
                    (m) => `
                  <div style="padding-bottom:12px;border-bottom:1px solid var(--border-dark)">
                    <div style="font-size:0.82rem;color:var(--muted-on-dark)">${esc(m.k)}</div>
                    <div style="font-size:1.3rem;font-weight:700;color:#34D399;margin-top:3px">${esc(m.v)}</div>
                  </div>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </article>`
        )
        .join("")}
    </div>
  </section>

  ${renderStudioShowcase(lang)}
  ${renderClosingPortal(lang)}
  `;

  return { title: W.metaTitle, description: W.metaDesc, bodyHtml };
}

/* ==========================================================================
   8. START CUSTOM BRIEF PAGE (/start/)
   ========================================================================== */
export function renderStartPage(lang) {
  const ST = {
    en: {
      metaTitle: "Start Your Custom Outbound Brief — Leadvium",
      metaDesc:
        "Introduce your business, target markets, and preferred engagement model (4-week project or monthly retainer) to receive your custom Leadvium architecture.",
      kicker: "Direct Engineering Intake · Written Architecture Response",
      h1: "Introduce your business. Let's architect your custom lead & outreach engine.",
      sub: "Tell us what you sell, your target buyer profile, and whether you prefer a 4-week project sprint or ongoing monthly management. Our engineering desk responds in writing with a tailored channel & source blueprint.",
      fCompany: "Company / Brand Name *",
      pCompany: "e.g., Caspian Industrial Valves Co.",
      fWeb: "Current Website (or 'None yet')",
      pWeb: "https://example.com",
      fEmail: "Work Email *",
      pEmail: "founder@company.com",
      fHandle: "WhatsApp or Telegram Handle (for direct written brief)",
      pHandle: "+971 ... or @username",
      fMode: "Preferred Engagement Model",
      modes: [
        ["monthly_managed", "Managed Growth Retainer ($2,400 / mo · Done-For-You)"],
        ["pilot_project", "4-Week Custom Pilot Sprint ($2,900 one-time project)"],
        ["sovereign_pod", "Sovereign Multi-Brand Pod ($4,800 / mo or Turnkey)"],
        ["advisory_fit", "Not sure yet — recommend best fit for our margins"]
      ],
      fDeal: "Average B2B Deal / Order Value",
      deals: ["$1,500 – $5,000", "$5,000 – $25,000", "$25,000 – $100,000+", "Recurring Wholesale / Monthly Tonnage"],
      fRegions: "Target Buyer Regions",
      regions: [
        ["gulf_mena", "Gulf & MENA (UAE, KSA, Qatar, Oman)"],
        ["europe", "Europe & UK"],
        ["east_asia", "East Asia (Japan, Korea, Taiwan)"],
        ["domestic", "Domestic Industrial B2B"]
      ],
      fChannels: "Desired Outbound Channels",
      channels: [
        ["email", "Sister-Domain Email + 14-Page Audit PDF"],
        ["whatsapp", "WhatsApp Dedicated IP"],
        ["telegram", "Telegram Engine"],
        ["linkedin", "Assisted LinkedIn & Forum Radar"]
      ],
      fProduct: "Introduce Your Business, Product & Ideal Buyer *",
      pProduct: "What do you manufacture, export, or offer? Who is the exact decision-maker you want in your pipeline?",
      fNotes: "Additional Goals, Monthly Volume or Timeline Notes",
      pNotes: "Optional: specific trade fairs, languages needed, or target launch date...",
      submit: "Generate Blueprint Receipt & Submit Brief",
      errMsg: "Please enter your company name, a valid email address, and a short description of your business.",
      recTitle: "✓ Custom Architecture Brief Registered",
      recRef: "Blueprint Reference ID:",
      recComp: "Workspace Entity:",
      recMode: "Selected Track:",
      recNext:
        "Your brief has been structured for our revenue engineering desk. Save your Reference ID above — we review your domain/market fit and send your written source & channel plan without pushy sales calls."
    },
    fa: {
      metaTitle: "ثبت بریف اختصاصی کسب‌وکار — لیدویوم",
      metaDesc:
        "کسب‌وکار، محصول و بازار هدف خود را معرفی کنید تا معماری اختصاصی موتور کشف سرنخ و اوتریچ شما به‌صورت پروژه‌ای یا ماهانه طراحی شود.",
      kicker: "پذیرش مستقیم مهندسی فروش · پاسخ مکتوب با بلوپرینت اختصاصی",
      h1: "کسب‌وکارتان را معرفی کنید تا موتور اختصاصی فروش شما را طراحی کنیم.",
      sub: "محصول یا خدمت، مشخصات خریدار ایده‌آل و مدل همکاری مدنظرتان (پروژه‌ای ۴ هفته‌ای یا مدیریت کامل ماهانه) را وارد کنید تا طرح دقیق دامنه‌های خواهر، منابع کشف لید و کانال‌های اوتریچ برایتان آماده شود.",
      fCompany: "نام شرکت یا برند تجاری *",
      pCompany: "مثال: بازرگانی خشکبار و زعفران پارس",
      fWeb: "آدرس وب‌سایت فعلی (در صورت وجود)",
      pWeb: "https://example.com",
      fEmail: "ایمیل کاری معتبر *",
      pEmail: "info@company.com",
      fHandle: "شماره واتس‌اپ یا آیدی تلگرام (جهت ارسال مستقیم بلوپرینت)",
      pHandle: "شماره همراه یا شناسه تلگرام",
      fMode: "مدل همکاری موردنظر شما",
      modes: [
        ["monthly_managed", "موتور رشد مدیریت‌شده ماهانه (۲٬۴۰۰ دلار در ماه · صفر تا صد)"],
        ["pilot_project", "پایلوت اختصاصی پروژه‌ای ۴ هفته‌ای (۲٬۹۰۰ دلار یک‌باره)"],
        ["sovereign_pod", "پاد اختصاصی سازمانی / چندبرندی (۴٬۸۰۰ دلار در ماه یا کلیدبه‌دست)"],
        ["advisory_fit", "نیاز به راهنمایی دارم — بهترین مدل را بر اساس حاشیه سود پیشنهاد دهید"]
      ],
      fDeal: "میانگین ارزش هر قرارداد یا سفارش مشتری شما",
      deals: ["۱٬۵۰۰ تا ۵٬۰۰۰ دلار", "۵٬۰۰۰ تا ۲۵٬۰۰۰ دلار", "بیش از ۲۵٬۰۰۰ دلار", "خرید عمده تکرارشونده / تناژ ماهانه"],
      fRegions: "بازارها و مناطق جغرافیایی هدف",
      regions: [
        ["gulf_mena", "خلیج فارس و خاورمیانه (امارات، عربستان، قطر، عمان)"],
        ["europe", "اروپا و بریتانیا"],
        ["east_asia", "شرق آسیا (ژاپن، کره، تایوان)"],
        ["domestic", "فروش سازمانی بازار داخل (۳۱ استان)"]
      ],
      fChannels: "کانال‌های اوتریچ موردنظر",
      channels: [
        ["email", "ایمیل دامنه خواهر + گزارش ۱۴ صفحه‌ای خودکار"],
        ["whatsapp", "واتس‌اپ با آی‌پی اختصاصی"],
        ["telegram", "موتور هوشمند تلگرام"],
        ["linkedin", "لینکدین کمکی و رادار انجمن‌ها"]
      ],
      fProduct: "معرفی کسب‌وکار، محصول و مشتری ایده‌آل شما *",
      pProduct: "چه محصول یا خدمتی ارائه می‌دهید و دقیقاً چه شرکت‌ها یا مدیرانی خریدار اصلی شما هستند؟",
      fNotes: "توضیحات تکمیلی، ظرفیت مدنظر یا زمان‌بندی شروع",
      pNotes: "اختیاری: نمایشگاه‌های هدف، زبان‌های موردنیاز برای مکاتبه یا نکات خاص صنعتی...",
      submit: "ثبت بریف کسب‌وکار و دریافت کد رهگیری معماری",
      errMsg: "لطفاً نام کسب‌وکار، ایمیل معتبر و توضیح کوتاهی درباره محصول و مشتریان هدف خود وارد نمایید.",
      recTitle: "✓ بریف اختصاصی کسب‌وکار شما با موفقیت ثبت شد",
      recRef: "شناسه رهگیری بلوپرینت:",
      recComp: "نام مجموعه:",
      recMode: "مدل همکاری انتخابی:",
      recNext:
        "مشخصات کسب‌وکار شما در میز مهندسی درآمد ثبت شد. شناسه رهگیری بالا را نزد خود نگه دارید؛ تیم ما منابع کشف لید و ساختار دامنه‌های خواهر متناسب با بازار شما را به‌صورت مکتوب و شفاف ارسال می‌کند."
    },
    ar: {
      metaTitle: "ابدأ ملخص مشروعك المخصص — ليدفيوم",
      metaDesc:
        "عرّفنا بنشاطك التجاري وأسواقك المستهدفة ونموذج التعاقد المفضل (مشروع 4 أسابيع أو إدارة شهرية) لاستلام مخططك المعماري المخصص.",
      kicker: "استقبال هندسي مباشر · خطة مكتوبة ومفصلة",
      h1: "عرّفنا بنشاطك التجاري لنصمم محرك استقطاب العملاء الخاص بك.",
      sub: "أخبرنا بمنتجك ومواصفات المشتري المثالي ونموذج التعاقد المفضل لديك، وسنعد لك مخططاً متكاملاً لمصادر البيانات والقنوات والنطاقات الشقيقة.",
      fCompany: "اسم الشركة أو العلامة التجارية *",
      pCompany: "مثال: شركة الخليج للتوريدات الصناعية",
      fWeb: "الموقع الإلكتروني الحالي (إن وجد)",
      pWeb: "https://example.com",
      fEmail: "البريد الإلكتروني للعمل *",
      pEmail: "founder@company.com",
      fHandle: "رقم واتساب أو معرف تيليجرام للتواصل المباشر",
      pHandle: "+971 ... أو @username",
      fMode: "نموذج التعاقد المفضل",
      modes: [
        ["monthly_managed", "محرك النمو الشهري المُدار ($2,400 / شهرياً · شامل بالكامل)"],
        ["pilot_project", "مشروع الإطلاق التجريبي لمدة 4 أسابيع ($2,900 لمرة واحدة)"],
        ["sovereign_pod", "الوحدة السيادية متعددة العلامات ($4,800 / شهرياً أو تسليم مفتاح)"],
        ["advisory_fit", "أحتاج توصية هندسية — اقترحوا النموذج الأنسب لهوامش ربحنا"]
      ],
      fDeal: "متوسط قيمة الصفقة أو الطلبية الواحدة",
      deals: ["$1,500 – $5,000", "$5,000 – $25,000", "+$25,000", "عقود توريد شهرية متكررة بالجملة"],
      fRegions: "الأسواق الجغرافية المستهدفة",
      regions: [
        ["gulf_mena", "الخليج والشرق الأوسط (الإمارات، السعودية، قطر، عُمان)"],
        ["europe", "أوروبا والمملكة المتحدة"],
        ["east_asia", "شرق آسيا (اليابان، كوريا، تايوان)"],
        ["domestic", "القطاع الصناعي المحلي والإقليمي"]
      ],
      fChannels: "قنوات الاستقطاب المطلوبة",
      channels: [
        ["email", "بريد النطاقات الشقيقة + تقرير 14 صفحة PDF"],
        ["whatsapp", "واتساب بعنوان IP مستقل"],
        ["telegram", "محرك تيليجرام الذكي"],
        ["linkedin", "لينكدإن الموجه ورادار المنتديات"]
      ],
      fProduct: "اشرح نشاطك التجاري ومنتجك والعميل المثالي *",
      pProduct: "ماذا تنتجون أو تصدرون أو تقدمون؟ ومن هو صانع القرار المستهدف تحديداً؟",
      fNotes: "ملاحظات إضافية حول الحجم الشهري أو موعد الانطلاق",
      pNotes: "اختياري: اللغات المطلوبة أو المعارض المستهدفة...",
      submit: "توليد إيصال المخطط وإرسال الملخص",
      errMsg: "يرجى إدخال اسم الشركة وبريد إلكتروني صحيح ووصف موجز لنشاطك التجاري.",
      recTitle: "✓ تم تسجيل ملخص البنية المخصصة بنجاح",
      recRef: "رقم مرجع المخطط:",
      recComp: "اسم المنشأة:",
      recMode: "المسار المختار:",
      recNext:
        "تم استلام بيانات نشاطك في مكتب هندسة الإيرادات. احتفظ برقم المرجع أعلاه؛ سنقوم بمراجعة ملاءمة السوق وإرسال خطة المصادر والقنوات كتابياً بوضوح تام."
    }
  }[lang];

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(ST.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:900px">${esc(ST.h1)}</h1>
      <p class="lead-prose">${esc(ST.sub)}</p>
    </div>
  </section>

  <section class="lv-section surface-light">
    <div class="lv-container" style="max-width:940px">
      <form id="custom-brief-form" class="interactive-workbench" novalidate>
        <input type="text" name="company_fax_hp" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true">

        <div class="brief-form-grid">
          <div class="form-field">
            <label for="bf-company" class="form-label">${esc(ST.fCompany)}</label>
            <input id="bf-company" name="company" type="text" required class="form-input" placeholder="${esc(
              ST.pCompany
            )}">
          </div>

          <div class="form-field">
            <label for="bf-website" class="form-label">${esc(ST.fWeb)}</label>
            <input id="bf-website" name="website" type="text" dir="ltr" class="form-input" placeholder="${esc(
              ST.pWeb
            )}">
          </div>

          <div class="form-field">
            <label for="bf-email" class="form-label">${esc(ST.fEmail)}</label>
            <input id="bf-email" name="email" type="email" dir="ltr" required class="form-input" placeholder="${esc(
              ST.pEmail
            )}">
          </div>

          <div class="form-field">
            <label for="bf-handle" class="form-label">${esc(ST.fHandle)}</label>
            <input id="bf-handle" name="handle" type="text" dir="ltr" class="form-input" placeholder="${esc(
              ST.pHandle
            )}">
          </div>

          <div class="form-field">
            <label for="bf-mode" class="form-label">${esc(ST.fMode)}</label>
            <select id="bf-mode" name="engagementMode" class="form-select">
              ${ST.modes.map((m) => `<option value="${esc(m[0])}">${esc(m[1])}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label for="bf-deal" class="form-label">${esc(ST.fDeal)}</label>
            <select id="bf-deal" name="dealSize" class="form-select">
              ${ST.deals.map((d) => `<option value="${esc(d)}">${esc(d)}</option>`).join("")}
            </select>
          </div>

          <div class="form-field span-2">
            <span class="form-label">${esc(ST.fRegions)}</span>
            <div class="toggle-chip-grid">
              ${ST.regions
                .map(
                  (r, idx) =>
                    `<button type="button" class="chip-toggle${idx < 2 ? " is-selected" : ""}" data-multi-chip="region" data-val="${esc(
                      r[0]
                    )}">${esc(r[1])}</button>`
                )
                .join("")}
            </div>
          </div>

          <div class="form-field span-2">
            <span class="form-label">${esc(ST.fChannels)}</span>
            <div class="toggle-chip-grid">
              ${ST.channels
                .map(
                  (c, idx) =>
                    `<button type="button" class="chip-toggle${idx < 3 ? " is-selected" : ""}" data-multi-chip="channel" data-val="${esc(
                      c[0]
                    )}">${esc(c[1])}</button>`
                )
                .join("")}
            </div>
          </div>

          <div class="form-field span-2">
            <label for="bf-product" class="form-label">${esc(ST.fProduct)}</label>
            <textarea id="bf-product" name="product" required class="form-textarea" placeholder="${esc(
              ST.pProduct
            )}"></textarea>
          </div>

          <div class="form-field span-2">
            <label for="bf-notes" class="form-label">${esc(ST.fNotes)}</label>
            <textarea id="bf-notes" name="notes" class="form-textarea" style="min-height:80px" placeholder="${esc(
              ST.pNotes
            )}"></textarea>
          </div>
        </div>

        <div id="brief-error-box" hidden style="margin-top:16px;padding:13px 16px;border-radius:10px;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;font-weight:600">
          ${esc(ST.errMsg)}
        </div>

        <div style="margin-top:22px">
          <button id="brief-submit-btn" type="submit" class="btn-primary" style="width:100%" data-magnetic>${esc(
            ST.submit
          )}</button>
        </div>

        <div id="brief-receipt-box" hidden class="estimator-summary-card" style="margin-top:24px">
          <div style="color:#34D399;font-weight:700;font-size:1.1rem">${esc(ST.recTitle)}</div>
          <div style="display:grid;gap:8px;margin-top:14px;font-size:0.92rem">
            <div><span style="color:var(--muted-on-dark)">${esc(ST.recRef)}</span> <code id="receipt-ref-id" class="ltr-code" dir="ltr" style="color:#93C5FD;font-weight:700"></code></div>
            <div><span style="color:var(--muted-on-dark)">${esc(ST.recComp)}</span> <strong id="receipt-company"></strong></div>
            <div><span style="color:var(--muted-on-dark)">${esc(ST.recMode)}</span> <strong id="receipt-mode"></strong></div>
          </div>
          <p style="margin:14px 0 0;font-size:0.89rem;color:var(--muted-on-dark)">${esc(ST.recNext)}</p>
        </div>
      </form>
    </div>
  </section>`;

  return { title: ST.metaTitle, description: ST.metaDesc, bodyHtml };
}

/* ==========================================================================
   9. PAY PAGE (/pay/)
   ========================================================================== */

export function renderPayPage(lang) {
  const ST = {
    en: {
      metaTitle: "Pay Securely with Crypto — Leadvium",
      metaDesc:
        "Pay for your Leadvium engagement with crypto: one USD invoice, settled in USDT, on NOWPayments' hosted page — or send USDT directly on TRON.",
      kicker: "Crypto Checkout · No Card Required",
      h1: "Pay for your Leadvium engine with crypto.",
      sub: "One invoice, priced in USD, settled in USDT. You pay on NOWPayments' hosted page — we never see your wallet or your card details.",
      fPlan: "Choose your engagement",
      plans: [
        ["pilot_project", "Custom Pilot Sprint — $2,900 one-time project"],
        ["monthly_managed", "Managed Growth Retainer — $2,400 / month (first month)"],
        ["sovereign_pod", "Sovereign Revenue Pod — $4,800 / month (first month)"]
      ],
      fEmail: "Work email for your receipt *",
      pEmail: "founder@company.com",
      submit: "Create secure invoice & continue to payment",
      errMsg: "Please choose a plan and enter a valid email address.",
      creating: "Creating your secure invoice…",
      manualTitle: "Prefer to pay USDT directly?",
      manualSub:
        "Send USDT on the TRON network (TRC-20) to the address below. Put your reference in the transfer memo — without it we cannot match your payment.",
      manualAddr: "USDT address (TRON / TRC-20):",
      manualAmt: "Amount:",
      manualRef: "Reference (transfer memo):",
      manualNote: "Send exactly the amount above. A partial payment never activates a service.",
      claimTitle: "Already sent? Submit your transaction hash.",
      claimTx: "Transaction hash (64 characters)",
      claimEmail: "Your email *",
      claimSubmit: "Submit for on-chain verification",
      claimDone:
        "✓ Claim received. We will verify it on-chain and confirm by email — nothing is activated until verification passes.",
      claimErr: "Please enter a 64-character transaction hash and a valid email address.",
      whyTitle: "Why crypto, not card?",
      whyBody:
        "Leadvium is a new business with no registered company yet, so no card processor will onboard us. Crypto is the only way we can take payment today — stated plainly, not hidden. Card payments arrive when the company is registered. Prices are in USD and settlement is in USDT, so the amount you pay is stable. A partial payment never activates a service: if the amount received is short of the invoice, the invoice stays unpaid until you top it up or we refund you.",
      p2pTitle: "Don't hold crypto yet?",
      p2pBody:
        "Buy USDT in a few minutes: use P2P on Binance, Bybit, or OKX with your card or bank transfer, then return here and pay. The purchase is on your own exchange account — your verification, your business, not ours. We do not earn from the exchange and we never ask for your exchange login.",
      stPaid: "✓ Payment confirmed — thank you.",
      stAwaiting: "Waiting for payment — your invoice is open.",
      stPartial:
        "Partial payment received — the invoice is still unpaid. Top it up or contact us for a refund.",
      stFailed: "This invoice failed.",
      stExpired: "This invoice expired unpaid.",
      stManual: "✓ Claim received — we will verify it on-chain and confirm by email.",
      stUnknown: "Invoice not found.",
      stRef: "Order reference:",
      stPlan: "Plan:",
      stAmt: "Amount:"
    },
    fa: {
      metaTitle: "پرداخت امن با ارز دیجیتال — لیدویوم",
      metaDesc:
        "هزینه همکاری با لیدویوم را با ارز دیجیتال پرداخت کنید: یک فاکتور دلاری با تسویه تتر در صفحه امن درگاه — یا مستقیم تتر بفرستید.",
      kicker: "پرداخت کریپتویی · بدون نیاز به کارت",
      h1: "هزینه موتور لیدویوم را با ارز دیجیتال پرداخت کنید.",
      sub: "یک فاکتور، با قیمت دلاری و تسویه با تتر. پرداخت در صفحه امن درگاه انجام می‌شود — ما هرگز به کیف پول یا اطلاعات کارت شما دسترسی نداریم.",
      fPlan: "مدل همکاری را انتخاب کنید",
      plans: [
        ["pilot_project", "پایلوت اختصاصی (پروژه‌ای) — ۲٬۹۰۰ دلار یک‌باره"],
        ["monthly_managed", "موتور رشد مدیریت‌شده ماهانه — ۲٬۴۰۰ دلار در ماه (ماه اول)"],
        ["sovereign_pod", "پاد اختصاصی سازمانی / چندبرندی — ۴٬۸۰۰ دلار در ماه (ماه اول)"]
      ],
      fEmail: "ایمیل کاری برای ارسال رسید *",
      pEmail: "info@company.com",
      submit: "ساخت فاکتور امن و ادامه به پرداخت",
      errMsg: "لطفاً مدل همکاری را انتخاب کنید و ایمیل معتبر وارد نمایید.",
      creating: "در حال ساخت فاکتور امن…",
      manualTitle: "ترجیح می‌دهید مستقیم تتر بفرستید؟",
      manualSub:
        "تتر را روی شبکه ترون به آدرس زیر بفرستید. شناسه رهگیری را در توضیحات تراکنش بنویسید — بدون آن نمی‌توانیم پرداخت شما را تطبیق دهیم.",
      manualAddr: "آدرس تتر (شبکه ترون):",
      manualAmt: "مبلغ:",
      manualRef: "شناسه رهگیری (توضیحات تراکنش):",
      manualNote: "دقیقاً همین مبلغ را بفرستید. پرداخت ناقص هرگز خدمتی فعال نمی‌کند.",
      claimTitle: "ارسال کردید؟ هش تراکنش را ثبت کنید.",
      claimTx: "هش تراکنش (۶۴ کاراکتر)",
      claimEmail: "ایمیل شما *",
      claimSubmit: "ثبت برای بررسی روی زنجیره",
      claimDone:
        "✓ درخواست شما ثبت شد. روی زنجیره بررسی می‌کنیم و با ایمیل تأیید می‌کنیم — تا پیش از تأیید بررسی، چیزی فعال نمی‌شود.",
      claimErr: "لطفاً هش تراکنش ۶۴ کاراکتری و ایمیل معتبر وارد نمایید.",
      whyTitle: "چرا ارز دیجیتال، نه کارت؟",
      whyBody:
        "لیدویوم کسب‌وکاری تازه است و هنوز شرکت ثبت‌شده ندارد، پس هیچ درگاه کارتی ما را نمی‌پذیرد. ارز دیجیتال امروز تنها راه دریافت پرداخت ماست — صادقانه گفته شده، نه پنهان. پرداخت کارتی وقتی شرکت ثبت شود اضافه می‌شود. قیمت‌ها دلاری و تسویه با تتر است، پس مبلغ پرداختی ثابت می‌ماند. پرداخت ناقص هرگز خدمتی فعال نمی‌کند: اگر مبلغ دریافتی کمتر از فاکتور باشد، فاکتور پرداخت‌نشده می‌ماند تا تکمیل کنید یا بازپرداخت بگیرید.",
      p2pTitle: "هنوز ارز دیجیتال ندارید؟",
      p2pBody:
        "در چند دقیقه تتر بخرید: در بخش همتابه‌همتای صرافی‌های زیر {names} با کارت بانکی یا انتقال بانکی تتر بخرید و برگردید اینجا پرداخت کنید. خرید روی حساب صرافی خودتان است — احراز هویت شما، کار شما، نه کار ما. ما از صرافی درآمدی نداریم و هرگز اطلاعات ورود شما را نمی‌خواهیم.",
      p2pNames: "Binance / Bybit / OKX",
      stPaid: "✓ پرداخت تأیید شد — سپاسگزاریم.",
      stAwaiting: "در انتظار پرداخت — فاکتور شما باز است.",
      stPartial:
        "پرداخت ناقص دریافت شد — فاکتور هنوز پرداخت‌نشده است. تکمیل کنید یا برای بازپرداخت با ما تماس بگیرید.",
      stFailed: "این فاکتور ناموفق بود.",
      stExpired: "مهلت این فاکتور گذشت و پرداخت نشد.",
      stManual: "✓ درخواست شما ثبت شد — روی زنجیره بررسی می‌کنیم و با ایمیل تأیید می‌کنیم.",
      stUnknown: "فاکتوری یافت نشد.",
      stRef: "شناسه سفارش:",
      stPlan: "مدل همکاری:",
      stAmt: "مبلغ:"
    },
    ar: {
      metaTitle: "ادفع بأمان بالعملات الرقمية — ليدفيوم",
      metaDesc:
        "ادفع مقابل تعاقدك مع ليدفيوم بالعملات الرقمية: فاتورة واحدة بالدولار تُسوَّى بعملة USDT على الصفحة المستضافة الآمنة — أو أرسل USDT مباشرة على شبكة ترون.",
      kicker: "دفع بالعملات الرقمية · بدون بطاقة",
      h1: "ادفع مقابل محرك ليدفيوم بالعملات الرقمية.",
      sub: "فاتورة واحدة بالدولار، تُسوَّى بعملة USDT. تتم عملية الدفع على الصفحة المستضافة الآمنة — لا نرى محفظتك أو بيانات بطاقتك أبداً.",
      fPlan: "اختر نموذج التعاقد",
      plans: [
        ["pilot_project", "مشروع الإطلاق التجريبي لمدة 4 أسابيع — $2,900 لمرة واحدة"],
        ["monthly_managed", "محرك النمو الشهري المُدار — $2,400 / شهرياً (الشهر الأول)"],
        ["sovereign_pod", "الوحدة السيادية متعددة العلامات — $4,800 / شهرياً (الشهر الأول)"]
      ],
      fEmail: "البريد الإلكتروني للعمل لإرسال الإيصال *",
      pEmail: "founder@company.com",
      submit: "إنشاء فاتورة آمنة والمتابعة إلى الدفع",
      errMsg: "يرجى اختيار الخطة وإدخال بريد إلكتروني صحيح.",
      creating: "جارٍ إنشاء فاتورتك الآمنة…",
      manualTitle: "تفضل الدفع بعملة USDT مباشرة؟",
      manualSub:
        "أرسل USDT على شبكة ترون (TRC-20) إلى العنوان أدناه. ضع المرجع في ملاحظة التحويل — بدونه لا نستطيع مطابقة دفعتك.",
      manualAddr: "عنوان USDT (شبكة ترون / TRC-20):",
      manualAmt: "المبلغ:",
      manualRef: "المرجع (ملاحظة التحويل):",
      manualNote: "أرسل المبلغ نفسه بالضبط. الدفع الجزئي لا يفعّل أي خدمة أبداً.",
      claimTitle: "أرسلت بالفعل؟ أرسل رمز التحويل.",
      claimTx: "رمز التحويل (64 حرفاً)",
      claimEmail: "بريدك الإلكتروني *",
      claimSubmit: "إرسال للتحقق على السلسلة",
      claimDone:
        "✓ تم استلام الطلب. سنتحقق منه على السلسلة ونؤكده بالبريد الإلكتروني — لا يتم تفعيل أي شيء قبل اكتمال التحقق.",
      claimErr: "يرجى إدخال رمز تحويل من 64 حرفاً وبريد إلكتروني صحيح.",
      whyTitle: "لماذا العملات الرقمية وليس البطاقة؟",
      whyBody:
        "ليدفيوم مشروع جديد بلا شركة مسجلة بعد، لذا لا يقبلنا أي معالج بطاقات. العملات الرقمية هي الطريقة الوحيدة المتاحة اليوم لقبول الدفع — نذكر ذلك بوضوح ولا نخفيه. ستُضاف مدفوعات البطاقات عند تسجيل الشركة. الأسعار بالدولار والتسوية بعملة USDT، لذا يبقى المبلغ المستحق ثابتاً. الدفع الجزئي لا يفعّل أي خدمة أبداً: إذا كان المبلغ المستلم أقل من الفاتورة، تبقى الفاتورة غير مدفوعة حتى تكملها أو نعيد المبلغ إليك.",
      p2pTitle: "لا تملك عملات رقمية بعد؟",
      p2pBody:
        "اشترِ USDT في دقائق: استخدم التداول من نظير إلى نظير في Binance أو Bybit أو OKX ببطاقتك أو تحويلك البنكي، ثم عد إلى هنا وادفع. الشراء على حسابك الخاص في المنصة — تحققك وهويتك شأنك أنت، وليس شأننا. لا نكسب من المنصة ولا نطلب بيانات دخولك أبداً.",
      stPaid: "✓ تم تأكيد الدفع — شكراً لك.",
      stAwaiting: "بانتظار الدفع — فاتورتك مفتوحة.",
      stPartial:
        "تم استلام دفعة جزئية — الفاتورة ما زالت غير مدفوعة. أكملها أو تواصل معنا لاسترداد المبلغ.",
      stFailed: "فشلت هذه الفاتورة.",
      stExpired: "انتهت صلاحية هذه الفاتورة دون دفع.",
      stManual: "✓ تم استلام الطلب — سنتحقق منه على السلسلة ونؤكده بالبريد الإلكتروني.",
      stUnknown: "لم يتم العثور على فاتورة.",
      stRef: "مرجع الطلب:",
      stPlan: "نموذج التعاقد:",
      stAmt: "المبلغ:"
    }
  }[lang];

  // Status strings for the client-side receipt view (script content is
  // exempt from the /fa/ prose audit, so Latin keys are safe here).
  const statusCopy = {
    paid: ST.stPaid,
    awaiting: ST.stAwaiting,
    partial: ST.stPartial,
    failed: ST.stFailed,
    expired: ST.stExpired,
    manual_pending: ST.stManual,
    unknown: ST.stUnknown,
    creating: ST.creating,
    ref: ST.stRef,
    plan: ST.stPlan,
    amount: ST.stAmt
  };

  const p2pNames = ST.p2pNames
    ? ` <span class="ltr-code" dir="ltr">${esc(ST.p2pNames)}</span>`
    : "";
  const p2pHtml = esc(ST.p2pBody).replace("{names}", p2pNames);

  const bodyHtml = `
  <section class="lv-section surface-dark">
    <div class="lv-container">
      <span class="kicker-pill"><span class="pulse-dot"></span><span>${esc(ST.kicker)}</span></span>
      <h1 class="display-xl" style="max-width:900px">${esc(ST.h1)}</h1>
      <p class="lead-prose">${esc(ST.sub)}</p>
    </div>
  </section>

  <section class="lv-section surface-light">
    <div class="lv-container" style="max-width:940px">
      <div id="pay-status-box" hidden class="estimator-summary-card" style="margin-bottom:24px">
        <div id="pay-status-text" style="color:#34D399;font-weight:700;font-size:1.1rem"></div>
        <div style="display:grid;gap:8px;margin-top:14px;font-size:0.92rem">
          <div><span style="color:var(--muted-on-dark)">${esc(ST.stRef)}</span> <code id="pay-status-ref" class="ltr-code" dir="ltr" style="color:#93C5FD;font-weight:700"></code></div>
          <div><span style="color:var(--muted-on-dark)">${esc(ST.stPlan)}</span> <strong id="pay-status-plan"></strong></div>
          <div><span style="color:var(--muted-on-dark)">${esc(ST.stAmt)}</span> <strong id="pay-status-amount"></strong></div>
        </div>
      </div>

      <form id="pay-form" class="interactive-workbench" novalidate>
        <div class="brief-form-grid">
          <div class="form-field">
            <label for="pay-plan" class="form-label">${esc(ST.fPlan)}</label>
            <select id="pay-plan" name="plan" class="form-select">
              ${ST.plans.map((p) => `<option value="${esc(p[0])}">${esc(p[1])}</option>`).join("")}
            </select>
          </div>

          <div class="form-field">
            <label for="pay-email" class="form-label">${esc(ST.fEmail)}</label>
            <input id="pay-email" name="email" type="email" dir="ltr" required class="form-input" placeholder="${esc(
              ST.pEmail
            )}">
          </div>
        </div>

        <div id="pay-error-box" hidden style="margin-top:16px;padding:13px 16px;border-radius:10px;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;font-weight:600">
          ${esc(ST.errMsg)}
        </div>

        <div style="margin-top:22px">
          <button id="pay-submit-btn" type="submit" class="btn-primary" style="width:100%" data-magnetic>${esc(
            ST.submit
          )}</button>
        </div>
      </form>

      <div id="pay-manual-box" hidden class="estimator-summary-card" style="margin-top:24px">
        <div style="font-weight:700;font-size:1.1rem">${esc(ST.manualTitle)}</div>
        <p style="margin:10px 0 0;font-size:0.92rem;color:var(--muted-on-dark)">${esc(ST.manualSub)}</p>
        <div style="display:grid;gap:8px;margin-top:14px;font-size:0.92rem">
          <div><span style="color:var(--muted-on-dark)">${esc(ST.manualAddr)}</span> <code id="pay-manual-address" class="ltr-code" dir="ltr" style="color:#93C5FD;font-weight:700;word-break:break-all"></code></div>
          <div><span style="color:var(--muted-on-dark)">${esc(ST.manualAmt)}</span> <strong id="pay-manual-amount"></strong></div>
          <div><span style="color:var(--muted-on-dark)">${esc(ST.manualRef)}</span> <code id="pay-manual-ref" class="ltr-code" dir="ltr" style="color:#93C5FD;font-weight:700"></code></div>
        </div>
        <p style="margin:14px 0 0;font-size:0.89rem;color:var(--muted-on-dark)">${esc(ST.manualNote)}</p>

        <form id="pay-claim-form" style="margin-top:18px" novalidate>
          <div style="font-weight:700">${esc(ST.claimTitle)}</div>
          <div class="brief-form-grid" style="margin-top:12px">
            <div class="form-field">
              <label for="pay-claim-txhash" class="form-label">${esc(ST.claimTx)}</label>
              <input id="pay-claim-txhash" name="txHash" type="text" dir="ltr" required class="form-input" placeholder="a1b2…">
            </div>
            <div class="form-field">
              <label for="pay-claim-email" class="form-label">${esc(ST.claimEmail)}</label>
              <input id="pay-claim-email" name="email" type="email" dir="ltr" required class="form-input" placeholder="${esc(
                ST.pEmail
              )}">
            </div>
          </div>
          <div id="pay-claim-error-box" hidden style="margin-top:12px;padding:13px 16px;border-radius:10px;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;font-weight:600">
            ${esc(ST.claimErr)}
          </div>
          <div style="margin-top:14px">
            <button id="pay-claim-btn" type="submit" class="btn-primary" style="width:100%">${esc(
              ST.claimSubmit
            )}</button>
          </div>
          <div id="pay-claim-done-box" hidden style="margin-top:14px;padding:13px 16px;border-radius:10px;background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;font-weight:600">
            ${esc(ST.claimDone)}
          </div>
        </form>
      </div>

      <div class="estimator-summary-card" style="margin-top:24px">
        <div style="font-weight:700;font-size:1.1rem">${esc(ST.whyTitle)}</div>
        <p style="margin:10px 0 0;font-size:0.92rem;color:var(--muted-on-dark)">${esc(ST.whyBody)}</p>
      </div>

      <div class="estimator-summary-card" style="margin-top:24px">
        <div style="font-weight:700;font-size:1.1rem">${esc(ST.p2pTitle)}</div>
        <p style="margin:10px 0 0;font-size:0.92rem;color:var(--muted-on-dark)">${p2pHtml}</p>
      </div>
    </div>
  </section>
  <script type="application/json" id="pay-copy">${JSON.stringify(statusCopy)}</script>`;

  return { title: ST.metaTitle, description: ST.metaDesc, bodyHtml };
}

/* ==========================================================================
   10. 404 NOT FOUND PAGE
   ========================================================================== */
export function render404Page() {
  const ui = UI_COPY.en;
  return {
    title: "404 · Route Not Found — Leadvium",
    description: "The requested Leadvium route could not be found.",
    bodyHtml: `
    <section class="lv-section surface-dark" style="min-height:62vh;display:flex;align-items:center">
      <div class="lv-container" style="text-align:center">
        <span class="kicker-pill"><span>404 · Route Not Found</span></span>
        <h1 class="display-lg">This signal path does not exist.</h1>
        <p class="lead-prose" style="margin-inline:auto">Return to the Leadvium command overview or start a custom outbound brief in English, Persian, or Arabic.</p>
        <div class="hero-actions" style="justify-content:center">
          <a href="/" class="btn-primary">English Overview</a>
          <a href="/fa/" class="btn-ghost-dark">نمای کلی فارسی</a>
          <a href="/ar/" class="btn-ghost-dark">نظرة عامة بالعربية</a>
        </div>
      </div>
    </section>`
  };
}
