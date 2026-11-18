export const SITE_ORIGIN = "https://leadvium.pages.dev";

export const LOCALES = ["en", "fa", "ar"];

export const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toFaDigits(input) {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function fmtNum(input, lang) {
  const str = String(input);
  if (lang === "fa") {
    return str.replace(/,/g, "٬").replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
  }
  return str;
}

export function localePath(routeSlug, lang) {
  const clean = routeSlug === "/" ? "/" : `/${routeSlug.replace(/^\/+|\/+$/g, "")}/`;
  if (lang === "en") return clean;
  return clean === "/" ? `/${lang}/` : `/${lang}${clean}`;
}

export const MOBBIN_COLLECTION = {
  name: "leadvium-v1-flagship",
  id: "6b75feca-6fc2-43cf-8e8b-afd2e299d546",
  url: "https://mobbin.com/collections/6b75feca-6fc2-43cf-8e8b-afd2e299d546/mobile/screens",
  keepersCount: 13
};

export const UI_COPY = {
  en: {
    langCode: "en",
    dir: "ltr",
    langName: "English",
    brandName: "Leadvium",
    brandTag: "Autonomous Outbound & Revenue Engineering",
    skipToContent: "Skip to main content",
    menuLabel: "Menu",
    closeLabel: "Close",
    statusPill: "Sister-Domain Shield · Verified Send Gate",
    primaryCta: "Start Custom Brief",
    secondaryCta: "Explore 6-Stage Engine",
    nav: [
      { slug: "/", label: "Overview" },
      { slug: "/engine/", label: "6-Stage Engine" },
      { slug: "/platform/", label: "Studio & Cockpit" },
      { slug: "/solutions/", label: "Custom Solutions" },
      { slug: "/pricing/", label: "Engagement & Pricing" },
      { slug: "/trust/", label: "Safety & Governance" },
      { slug: "/work/", label: "Blueprints" }
    ],
    footer: {
      statement:
        "You introduce your business, margins, and target markets. We architect, isolate, warm up, and operate your complete B2B lead discovery and multi-channel outbound revenue engine — on a fixed project sprint or managed monthly retainer.",
      colEngine: "Architecture",
      colCommercial: "Commercial",
      colGovernance: "Governance & Proof",
      operationalBadge: "2,030+ Automated Tests · Strict Workspace Isolation · Zero Primary-Domain Risk",
      rights: "© 2026 Leadvium Revenue Engineering. Built for global exporters, B2B studios, and industrial leaders.",
      linksEngine: [
        { slug: "/engine/", label: "6-Stage Pipeline" },
        { slug: "/platform/", label: "Outreach Studio UI" },
        { slug: "/platform/#cockpit", label: "12-View Executive Cockpit" },
        { slug: "/engine/#audit-pdf", label: "14-Page Audit PDF Engine" }
      ],
      linksCommercial: [
        { slug: "/solutions/", label: "Industry Playbooks" },
        { slug: "/pricing/", label: "Project vs. Monthly Plans" },
        { slug: "/pricing/#estimator", label: "Custom Scope Estimator" },
        { slug: "/start/", label: "Submit Business Brief" }
      ],
      linksGovernance: [
        { slug: "/trust/", label: "Sister-Domain Shield" },
        { slug: "/trust/#facts-vault", label: "FACTS.md Truth Linter" },
        { slug: "/work/", label: "Production Blueprints" },
        { slug: "/start/", label: "Request Architecture Review" }
      ]
    }
  },
  fa: {
    langCode: "fa",
    dir: "rtl",
    langName: "فارسی",
    brandName: "لیدویوم",
    brandTag: "مهندسی اوتریچ خودکار و زیرساخت فروش شرکتی",
    skipToContent: "پرش به محتوای اصلی",
    menuLabel: "منو",
    closeLabel: "بستن",
    statusPill: "سپر دامنه خواهر · گیت ارسال وریفای‌شده",
    primaryCta: "ثبت بریف اختصاصی",
    secondaryCta: "معماری موتور ۶ مرحله‌ای",
    nav: [
      { slug: "/", label: "نمای کلی" },
      { slug: "/engine/", label: "موتور ۶ مرحله‌ای" },
      { slug: "/platform/", label: "استودیو و پیشخوان" },
      { slug: "/solutions/", label: "راهکارهای اختصاصی" },
      { slug: "/pricing/", label: "مدل همکاری و تعرفه" },
      { slug: "/trust/", label: "امنیت و حکمرانی" },
      { slug: "/work/", label: "بلوپرینت‌ها" }
    ],
    footer: {
      statement:
        "شما فقط کسب‌وکار، حاشیه سود و بازارهای هدف خود را معرفی می‌کنید؛ تیم مهندسی لیدویوم کل زیرساخت اختصاصی کشف سرنخ، ممیزی خودکار و مذاکره چندکاناله را به‌صورت پروژه‌ای یا مدیریت ماهانه برای شما می‌سازد، گرم می‌کند و مقیاس می‌دهد.",
      colEngine: "معماری فنی",
      colCommercial: "همکاری تجاری",
      colGovernance: "ایمنی و شواهد",
      operationalBadge: "بیش از ۲٬۰۳۰ تست خودکار · جداسازی کامل هر کسب‌وکار · ریسک صفر برای دامنه اصلی",
      rights: "© ۲۰۲۶ لیدویوم — آزمایشگاه مهندسی فروش و اوتریچ اختصاصی برای صادرکنندگان، آژانس‌ها و صنایع.",
      linksEngine: [
        { slug: "/engine/", label: "پایپ‌لاین ۶ مرحله‌ای" },
        { slug: "/platform/", label: "استودیو اوتریچ اختصاصی" },
        { slug: "/platform/#cockpit", label: "پیشخوان مدیریتی ۱۲ نمایی" },
        { slug: "/engine/#audit-pdf", label: "موتور گزارش ۱۴ صفحه‌ای" }
      ],
      linksCommercial: [
        { slug: "/solutions/", label: "پلی‌بوک صنایع مختلف" },
        { slug: "/pricing/", label: "همکاری پروژه‌ای و ماهانه" },
        { slug: "/pricing/#estimator", label: "تخمین‌گر هوشمند اسکوپ" },
        { slug: "/start/", label: "ارسال بریف کسب‌وکار" }
      ],
      linksGovernance: [
        { slug: "/trust/", label: "سپر دامنه خواهر" },
        { slug: "/trust/#facts-vault", label: "گارد صحت‌سنجی ادعاها" },
        { slug: "/work/", label: "بلوپرینت‌های اجرایی" },
        { slug: "/start/", label: "درخواست طراحی معماری" }
      ]
    }
  },
  ar: {
    langCode: "ar",
    dir: "rtl",
    langName: "العربية",
    brandName: "ليدفيوم",
    brandTag: "هندسة الاستقطاب الذاتي وبنية المبيعات للشركات",
    skipToContent: "الانتقال إلى المحتوى الرئيسي",
    menuLabel: "القائمة",
    closeLabel: "إغلاق",
    statusPill: "درع النطاقات الشقيقة · بوابة إرسال موثقة",
    primaryCta: "ابدأ ملخص مشروعك",
    secondaryCta: "استكشف المحرك السداسي",
    nav: [
      { slug: "/", label: "نظرة عامة" },
      { slug: "/engine/", label: "المحرك السداسي" },
      { slug: "/platform/", label: "الاستوديو ولوحة القيادة" },
      { slug: "/solutions/", label: "حلول مخصصة" },
      { slug: "/pricing/", label: "نماذج التعاقد والأسعار" },
      { slug: "/trust/", label: "الحوكمة والأمان" },
      { slug: "/work/", label: "النماذج الهندسية" }
    ],
    footer: {
      statement:
        "عرّفنا بنشاطك التجاري وهوامش ربحك وأسواقك المستهدفة؛ ونحن نبني ونعزل وندير منظومة متكاملة لاكتشاف العملاء المحتملين والتواصل متعدد القنوات، سواء بنظام المشروع المحدد أو الإدارة الشهرية المستمرة.",
      colEngine: "البنية الهندسية",
      colCommercial: "نماذج العمل",
      colGovernance: "الأمان والحوكمة",
      operationalBadge: "أكثر من 2,030 اختباراً آلياً · عزل كامل لكل عميل · حماية تامة للنطاق الرئيسي",
      rights: "© 2026 ليدفيوم لهندسة الإيرادات. صُمم للمصدرين والوكالات والقطاعات الصناعية.",
      linksEngine: [
        { slug: "/engine/", label: "مسار المراحل الست" },
        { slug: "/platform/", label: "استوديو التواصل الذكي" },
        { slug: "/platform/#cockpit", label: "لوحة القيادة التنفيذية" },
        { slug: "/engine/#audit-pdf", label: "محرك تقارير التدقيق (14 صفحة)" }
      ],
      linksCommercial: [
        { slug: "/solutions/", label: "خطط القطاعات المخصصة" },
        { slug: "/pricing/", label: "التعاقد الشهري أو بالمشروع" },
        { slug: "/pricing/#estimator", label: "حاسبة النطاق والتكلفة" },
        { slug: "/start/", label: "إرسال ملخص الأعمال" }
      ],
      linksGovernance: [
        { slug: "/trust/", label: "حماية النطاقات الشقيقة" },
        { slug: "/trust/#facts-vault", label: "مدقق الحقائق الموثقة" },
        { slug: "/work/", label: "مخططات الإنتاج" },
        { slug: "/start/", label: "طلب مراجعة معمارية" }
      ]
    }
  }
};

export const PRICING_TIERS = {
  en: [
    {
      id: "pilot_project",
      badge: "Project-Based · Fixed 4-Week Sprint",
      name: "Custom Pilot Sprint",
      priceMain: "$2,900",
      priceUnit: "one-time project",
      quarterlyPrice: "$2,900",
      setupNote: "Zero recurring lock-in · Full setup included",
      summary:
        "Ideal for founders and B2B teams who want us to architect, validate, and prove a custom outbound engine in 30 days before moving to a monthly retainer.",
      featured: false,
      cta: "Launch 4-Week Pilot",
      modeParam: "pilot_project",
      metrics: [
        { k: "Verified Tier-A Accounts", v: "500 enriched companies" },
        { k: "Sister-Domain Infra", v: "2 isolated domains + 4 mailboxes" },
        { k: "Custom Value Wedge", v: "9-Point Scan or Custom Brief PDF" }
      ],
      features: [
        "Dedicated SQLite workspace & custom ICP scoring matrix",
        "Codified FACTS.md (verified claims) & NEGOTIATION.md envelope",
        "Sister-domain DNS setup (SPF, DKIM, DMARC) + progressive warm-up",
        "100–200 lead Canary validation batch before full 500-lead rollout",
        "Email + Assisted LinkedIn / Telegram sequence copy & Spintax",
        "Complete CSV/SQLite export & pilot performance readout at Day 30"
      ]
    },
    {
      id: "monthly_managed",
      badge: "Most Popular · Done-For-You Monthly Engine",
      name: "Managed Growth Retainer",
      priceMain: "$2,400",
      priceUnit: "/ month",
      quarterlyPrice: "$1,950",
      setupNote: "+ $1,500 one-time custom architecture setup (waived on quarterly)",
      summary:
        "Your complete outsourced outbound engineering department. Tell us your ideal buyer; we harvest leads, run diagnostics, warm domains, converse, and hand you warm deals.",
      featured: true,
      cta: "Start Monthly Engine",
      modeParam: "monthly_managed",
      metrics: [
        { k: "Monthly Verified Supply", v: "1,500 – 3,000 ICP companies / mo" },
        { k: "Multi-Channel Fleet", v: "Email + WhatsApp + Telegram + Radar" },
        { k: "Executive Time Required", v: "~5 minutes / day via Action Cards" }
      ],
      features: [
        "Continuous harvesting across 240+ registries, trade fairs & spatial maps",
        "Automated 14-page A4 Executive Audit PDF or custom technical brief per warm lead",
        "4 sister-domains + up to 10 warmed mailboxes with auto bounce tripwires",
        "Dedicated 1-IP-per-number WhatsApp bridge & Telegram outreach routing",
        "3-Column Unibox triage + 6-Column CRM + Telegram one-tap owner approvals",
        "Live 12-view Read-Only Executive Cockpit + weekly A/B angle iteration"
      ]
    },
    {
      id: "sovereign_pod",
      badge: "Enterprise & Multi-Brand · Dedicated Infra",
      name: "Sovereign Revenue Pod",
      priceMain: "$4,800",
      priceUnit: "/ month (or custom turnkey)",
      quarterlyPrice: "$4,100",
      setupNote: "Includes dedicated VPS/VPC deployment or turnkey handover option",
      summary:
        "Built for export groups, industrial holdings, and multi-product studios operating across Gulf, Europe, East Asia, and MENA with strict data sovereignty.",
      featured: false,
      cta: "Architect Sovereign Pod",
      modeParam: "sovereign_pod",
      metrics: [
        { k: "Isolated Workspaces", v: "Up to 4 brands / regional desks" },
        { k: "Monthly Verified Supply", v: "6,000+ custom-harvested entities" },
        { k: "Deployment Mode", v: "Managed Dedicated VPS or Self-Hosted" }
      ],
      features: [
        "Custom Python scrapers built for your exact niche fairs, chambers & tenders",
        "Multilingual outbound playbooks (EN, FA, AR, DE, FR, JP, TR) in local business hours",
        "Self-healing Watchdog, Shadow → Canary → Live release gates & encrypted backups",
        "Multi-principal brokerage routing & 3-way supplier WhatsApp group handoff",
        "Custom CRM / ERP webhook sync + dedicated revenue engineer on Slack",
        "Option for full turnkey source & infrastructure handover"
      ]
    }
  ],
  fa: [
    {
      id: "pilot_project",
      badge: "مدل پروژه‌ای · اسپرینت ۴ هفته‌ای با اسکوپ مشخص",
      name: "پایلوت اختصاصی (پروژه‌ای)",
      priceMain: "۲٬۹۰۰ دلار",
      priceUnit: "پرداخت یک‌باره پروژه‌ای",
      quarterlyPrice: "۲٬۹۰۰ دلار",
      setupNote: "بدون تعهد تمدید ماهانه · شامل راه‌اندازی صفر تا صد",
      summary:
        "مناسب مدیران و شرکت‌هایی که می‌خواهند ابتدا موتور اختصاصی کشف لید و اوتریچ کسب‌وکارشان طی ۳۰ روز ساخته و با داده واقعی اعتبارسنجی شود و سپس وارد همکاری ماهانه شوند.",
      featured: false,
      cta: "شروع پایلوت ۴ هفته‌ای",
      modeParam: "pilot_project",
      metrics: [
        { k: "شرکت‌های هدف رده الف", v: "۵۰۰ شرکت غنی‌سازی و تاییدشده" },
        { k: "زیرساخت دامنه خواهر", v: "۲ دامنه ایزوله + ۴ صندوق ارسال" },
        { k: "قلاب ارزش‌آفرین اختصاصی", v: "اسکن ۹گانه یا گزارش اختصاصی" }
      ],
      features: [
        "فضای کاری ایزوله اختصاصی و تدوین ماتریس امتیازدهی مشتری ایده‌آل",
        "تدوین منشور حقایق تاییدشده و دامنه مجاز مذاکره قیمتی کسب‌وکار شما",
        "تنظیم کامل رکوردهای احراز هویت دامنه خواهر و وارم‌آپ پله‌ای ایمن",
        "اجرای بچ آزمایشی ۱۰۰ تا ۲۰۰ تایی پیش از مقیاس‌دهی به کل لیست ۵۰۰ تایی",
        "طراحی سکانس چندمرحله‌ای ایمیل، لینکدین کمکی و تلگرام با تنوع متنی",
        "تحویل کامل بانک داده سرنخ‌ها و گزارش تحلیلی قیفی در پایان روز سی‌ام"
      ]
    },
    {
      id: "monthly_managed",
      badge: "محبوب‌ترین مدل · واحد مهندسی فروش برون‌سپاری‌شده",
      name: "موتور رشد مدیریت‌شده (ماهانه)",
      priceMain: "۲٬۴۰۰ دلار",
      priceUnit: "در ماه",
      quarterlyPrice: "۱٬۹۵۰ دلار",
      setupNote: "+ ۱٬۵۰۰ دلار راه‌اندازی اولیه معماری (رایگان در قرارداد فصلی)",
      summary:
        "واحد کامل و تمام‌خودکار فروش برون‌مرزی و شرکتی شما. فقط محصول و بازار هدف را معرفی کنید؛ کشف لید، ممیزی، وارم‌آپ، ارسال چندکاناله و مذاکره اولیه کامل با ماست.",
      featured: true,
      cta: "راه‌اندازی موتور ماهانه",
      modeParam: "monthly_managed",
      metrics: [
        { k: "تامین سرنخ تاییدشده ماهانه", v: "۱٬۵۰۰ تا ۳٬۰۰۰ شرکت منطبق در ماه" },
        { k: "ناوگان چندکاناله هماهنگ", v: "ایمیل + واتس‌اپ + تلگرام + رادار تقاضا" },
        { k: "زمان موردنیاز مدیر کسب‌وکار", v: "حدود ۵ دقیقه در روز با کارت اقدام" }
      ],
      features: [
        "استخراج مستمر از بیش از ۲۴۰ رجیستری رسمی، کاتالوگ نمایشگاهی و نقشه تجاری",
        "تولید خودکار گزارش ممیزی ۱۴ صفحه‌ای اختصاصی برای هر سرنخ گرم",
        "۴ دامنه خواهر ایزوله + تا ۱۰ صندوق گرم‌شده با قطع‌کن خودکار بانس و اسپم",
        "پل اختصاصی واتس‌اپ (یک آی‌پی مجزا به ازای هر خط) و مسیریابی هوشمند تلگرام",
        "تریاژ پاسخ‌ها در صندوق واحد ۳ ستونه، کانبان فروش و ربات تایید تک‌کلیکی تلگرام",
        "دسترسی زنده به پیشخوان مدیریتی ۱۲ صفحه‌ای + بهینه‌سازی هفتگی زاویه پیام‌ها"
      ]
    },
    {
      id: "sovereign_pod",
      badge: "سازمانی و چندبرندی · زیرساخت اختصاصی ایزوله",
      name: "پاد اختصاصی درآمد و بروکریج",
      priceMain: "۴٬۸۰۰ دلار",
      priceUnit: "در ماه (یا تحویل کلیدبه‌دست)",
      quarterlyPrice: "۴٬۱۰۰ دلار",
      setupNote: "شامل استقرار روی سرور اختصاصی یا امکان تحویل کامل مالکیت زیرساخت",
      summary:
        "طراحی‌شده برای هلدینگ‌های صادراتی، کارخانجات بزرگ، بروکرهای بین‌المللی و استودیوهای چندمحصولی در بازارهای خلیج فارس، اروپا، شرق آسیا و داخل کشور.",
      featured: false,
      cta: "طراحی پاد اختصاصی",
      modeParam: "sovereign_pod",
      metrics: [
        { k: "فضاهای کاری کاملاً مجزا", v: "تا ۴ برند یا میز منطقه‌ای مستقل" },
        { k: "ظرفیت کشف و پالایش ماهانه", v: "بیش از ۶٬۰۰۰ شرکت هدف اختصاصی" },
        { k: "مدل استقرار فنی", v: "سرور اختصاصی مدیریت‌شده یا کلیدبه‌دست" }
      ],
      features: [
        "توسعه خزنده‌های اختصاصی برای نمایشگاه‌ها، اتاق‌های بازرگانی و مناقصات صنعت شما",
        "مذاکره و اوتریچ چندزبانه (انگلیسی، فارسی، عربی، آلمانی، فرانسوی، ترکی، ژاپنی) در ساعت محلی",
        "واچ‌داگ خودترمیم‌گر، انتشار مرحله‌ای سایه به قناری و بکاپ رمزنگاری‌شده روزانه",
        "مسیریابی بروکریج چندتامین‌کننده و تشکیل گروه سه‌جانبه واتس‌اپ با خریدار نهایی",
        "اتصال وب‌هوک به نرم‌افزارهای سازمانی + مهندس فروش اختصاصی در کانال مشترک",
        "امکان قرارداد پروژه‌ای انتقال کامل زیرساخت روی سرور اختصاصی کارفرما"
      ]
    }
  ],
  ar: [
    {
      id: "pilot_project",
      badge: "تعاقد بالمشروع · سبرينت محدد لمدة 4 أسابيع",
      name: "مشروع الإطلاق التجريبي المخصص",
      priceMain: "$2,900",
      priceUnit: "دفعة مشروع لمرة واحدة",
      quarterlyPrice: "$2,900",
      setupNote: "دون التزام شهري طويل الأجل · يشمل التأسيس الكامل",
      summary:
        "مصمم للمؤسسين والشركات الراغبة في بناء واختبار منظومة استقطاب مخصصة بالكامل خلال 30 يوماً ببيانات حقيقية قبل الانتقال إلى الإدارة الشهرية.",
      featured: false,
      cta: "ابدأ مشروع 4 أسابيع",
      modeParam: "pilot_project",
      metrics: [
        { k: "شركات مستهدفة موثقة (فئة A)", v: "500 شركة مدققة البيانات" },
        { k: "بنية النطاقات الشقيقة", v: "نطاقان معزولان + 4 صناديق بريد" },
        { k: "أداة القيمة المخصصة", v: "فحص من 9 نقاط أو ملف تعريفي مخصص" }
      ],
      features: [
        "مساحة عمل معزولة بقاعدة بيانات مستقلة ومعايير تأهيل مخصصة لنشاطك",
        "توثيق سجل الحقائق المعتمدة ونطاق التسعير والتفاوض المسموح به",
        "إعداد سجلات SPF وDKIM وDMARC للنطاقات الشقيقة مع إحماء تدريجي آمن",
        "دفعة اختبار استطلاعية (100–200 عميل) قبل الإطلاق الكامل لقائمة 500 شركة",
        "صياغة سلاسل رسائل متعددة المراحل للبريد ولينكدإن وتيليجرام",
        "تسليم كامل لقاعدة البيانات وتقرير الأداء التفصيلي في اليوم الثلاثين"
      ]
    },
    {
      id: "monthly_managed",
      badge: "الأكثر طلباً · إدارة شهرية متكاملة نيابةً عنك",
      name: "محرك النمو الشهري المُدار",
      priceMain: "$2,400",
      priceUnit: "/ شهرياً",
      quarterlyPrice: "$1,950",
      setupNote: "+ $1,500 تأسيس معماري لمرة واحدة (مجاني في التعاقد الفصلي)",
      summary:
        "قسم هندسة مبيعات واستقطاب خارجي يعمل بالكامل لأجلك. أخبرنا بمواصفات عميلك المثالي؛ ونحن نتولى البحث والتدقيق والإحماء والمحادثات وتسليم الصفقات الجاهزة.",
      featured: true,
      cta: "فعّل المحرك الشهري",
      modeParam: "monthly_managed",
      metrics: [
        { k: "إمداد شهري موثق", v: "1,500 – 3,000 شركة مطابقة شهرياً" },
        { k: "أسطول متعدد القنوات", v: "بريد + واتساب + تيليجرام + رادار الطلب" },
        { k: "وقت المالك اليومي", v: "نحو 5 دقائق يومياً عبر بطاقات القرار" }
      ],
      features: [
        "استخراج مستمر من أكثر من 240 سجلاً تجارياً ومعرضاً دولياً وخريطة أعمال",
        "توليد آلي لتقرير تدقيق تنفيذي من 14 صفحة PDF لكل عميل محتمل متفاعل",
        "4 نطاقات شقيقة معزولة + حتى 10 صناديق بريد مُحماة مع قواطع أمان تلقائية",
        "جسر واتساب مخصص (عنوان IP مستقل لكل رقم) وتوجيه ذكي عبر تيليجرام",
        "فرز الردود في صندوق موحد ثلاثي الأعمدة ولوحة كانبان للمبيعات وموافقات فورية",
        "وصول مباشر إلى لوحة القيادة التنفيذية ذات 12 واجهة مع تحسين أسبوعي للحملات"
      ]
    },
    {
      id: "sovereign_pod",
      badge: "للمؤسسات والمجموعات التصديرية · بنية سيادية مستقلة",
      name: "وحدة الإيرادات السيادية المخصصة",
      priceMain: "$4,800",
      priceUnit: "/ شهرياً (أو تسليم مفتاح)",
      quarterlyPrice: "$4,100",
      setupNote: "يشمل النشر على خادم مخصص أو خيار التسليم الكامل للبنية",
      summary:
        "مصمم لمجموعات التصدير والمصانع الكبرى وشركات الوساطة متعددة العلامات في الخليج وأوروبا وشرق آسيا والشرق الأوسط مع سيادة كاملة على البيانات.",
      featured: false,
      cta: "صمّم وحدتك السيادية",
      modeParam: "sovereign_pod",
      metrics: [
        { k: "مساحات عمل معزولة", v: "حتى 4 علامات تجارية أو مكاتب إقليمية" },
        { k: "سعة الاستقطاب الشهرية", v: "+6,000 منشأة مستخرجة خصيصاً" },
        { k: "نمط التشغيل", v: "خادم مخصص مُدار أو استضافة ذاتية" }
      ],
      features: [
        "بناء جامعات بيانات مخصصة لمعارضك وغرف التجارة والمناقصات الخاصة بقطاعك",
        "تواصل وتفاوض متعدد اللغات ضمن ساعات العمل المحلية لكل دولة مستهدفة",
        "مراقب ذاتي الإصلاح وإطلاق متدرج ونسخ احتياطية مشفرة يومياً",
        "توجيه صفقات الوساطة متعددة الموردين وإنشاء مجموعات واتساب ثلاثية للإغلاق",
        "ربط مباشر بأنظمة CRM المؤسسية + مهندس نمو مخصص عبر Slack",
        "إمكانية التعاقد بنظام تسليم المفتاح على خوادم العميل الخاصة"
      ]
    }
  ]
};
