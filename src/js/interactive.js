(function () {
  "use strict";

  var html = document.documentElement;
  var lang = html.lang === "fa" ? "fa" : html.lang === "ar" ? "ar" : "en";
  var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

  function fmt(val) {
    var s = String(val);
    if (lang === "fa") {
      return s.replace(/,/g, "٬").replace(/\d/g, function (d) {
        return FA_DIGITS[Number(d)];
      });
    }
    return s;
  }

  /* 1. Mobile Navigation Drawer */
  var menuBtn = document.getElementById("mobile-menu-toggle");
  var drawer = document.getElementById("mobile-drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var isHidden = drawer.hasAttribute("hidden");
      if (isHidden) {
        drawer.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      } else {
        drawer.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 2. Generic Tab Switchers ([data-tab-group]) */
  document.querySelectorAll("[data-tab-group]").forEach(function (groupEl) {
    var groupName = groupEl.getAttribute("data-tab-group");
    var buttons = groupEl.querySelectorAll("[data-tab-target]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-tab-target");
        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        document.querySelectorAll('[data-tab-panel="' + groupName + '"]').forEach(function (panel) {
          if (panel.getAttribute("data-panel-id") === targetId) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        });
      });
    });
  });

  /* 3. Studio Screenshot Lightbox Zoom */
  var lightbox = document.getElementById("studio-lightbox");
  var lightboxImg = document.getElementById("studio-lightbox-img");
  var lightboxTitle = document.getElementById("studio-lightbox-title");
  var lightboxClose = document.getElementById("studio-lightbox-close");

  if (lightbox && lightboxImg) {
    document.querySelectorAll("[data-zoom-src]").forEach(function (imgEl) {
      imgEl.addEventListener("click", function () {
        lightboxImg.src = imgEl.getAttribute("data-zoom-src");
        lightboxImg.alt = imgEl.getAttribute("alt") || "";
        if (lightboxTitle) {
          lightboxTitle.textContent = imgEl.getAttribute("data-zoom-title") || "";
        }
        lightbox.removeAttribute("hidden");
      });
    });

    var closeLb = function () {
      lightbox.setAttribute("hidden", "");
    };
    if (lightboxClose) lightboxClose.addEventListener("click", closeLb);
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox) closeLb();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !lightbox.hasAttribute("hidden")) closeLb();
    });
  }

  /* 4. Pricing Cycle Switcher (Monthly vs Quarterly vs Project) */
  var billingBtns = document.querySelectorAll("[data-billing-mode]");
  if (billingBtns.length) {
    billingBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-billing-mode");
        billingBtns.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        document.querySelectorAll("[data-price-monthly]").forEach(function (el) {
          var m = el.getAttribute("data-price-monthly");
          var q = el.getAttribute("data-price-quarterly");
          el.textContent = mode === "quarterly" ? q : m;
        });
      });
    });
  }

  /* 5. Interactive 9-Point Domain Readiness Simulator (/engine/) */
  var scanRoot = document.getElementById("scanner-simulator");
  if (scanRoot) {
    var signalBtns = scanRoot.querySelectorAll("[data-gap-weight]");
    var scoreOut = document.getElementById("scan-score-val");
    var tierOut = document.getElementById("scan-tier-val");
    var wedgeOut = document.getElementById("scan-wedge-val");

    var updateScanner = function () {
      var total = 18;
      signalBtns.forEach(function (b) {
        if (b.classList.contains("has-gap")) {
          total += Number(b.getAttribute("data-gap-weight") || 0);
        }
      });
      total = Math.min(98, Math.max(18, total));
      if (scoreOut) scoreOut.textContent = fmt(total + " / 100");

      var tierText = "";
      var wedgeText = "";
      if (total >= 65) {
        tierText =
          lang === "fa"
            ? "رده الف · اولویت فوری ارسال ممیزی ۱۴ صفحه‌ای"
            : lang === "ar"
            ? "الفئة A · أولوية قصوى لإرسال تقرير 14 صفحة"
            : "Tier A · High-Priority 14-Page Audit PDF Candidate";
        wedgeText =
          lang === "fa"
            ? "ارسال پیشنهاد تحلیل رایگان وب‌سایت ← تحویل خودکار کتابچه ۱۴ صفحه‌ای"
            : lang === "ar"
            ? "عرض مراجعة مجانية ← إرسال آلي لتقرير PDF من 14 صفحة"
            : "Offer Free Site Review → Dispatch Automated 14-Page Branded PDF";
      } else if (total >= 40) {
        tierText =
          lang === "fa"
            ? "رده ب · مناسب سکانس ارزش‌آفرین چندمرحله‌ای"
            : lang === "ar"
            ? "الفئة B · مناسب لسلسلة رسائل استشارية"
            : "Tier B · Qualified for Consultative Multi-Step Sequence";
        wedgeText =
          lang === "fa"
            ? "مقایسه شاخص سرعت و فرم استعلام با نمونه‌کار هم‌صنف"
            : lang === "ar"
            ? "مقارنة معيارية مع نماذج القطاع المماثلة"
            : "Industry Benchmark Hook + Relevant Portfolio Case Match";
      } else {
        tierText =
          lang === "fa"
            ? "رده ج · زیرساخت دیجیتال سالم (مسیر همکاری تجاری مستقیم)"
            : lang === "ar"
            ? "الفئة C · موقع جيد (مسار شراكة تجارية مباشرة)"
            : "Tier C · Strong Existing Site (Route to Direct Partnership)";
        wedgeText =
          lang === "fa"
            ? "عدم ارسال پیشنهاد بازطراحی؛ انتقال به لیست شراکت تامین"
            : lang === "ar"
            ? "استبعاد عرض إعادة التصميم؛ تحويل لمسار التوريد"
            : "Skip Redesign Pitch · Route to Direct Supply / OS Wedge";
      }
      if (tierOut) tierOut.textContent = tierText;
      if (wedgeOut) wedgeOut.textContent = wedgeText;
    };

    signalBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        b.classList.toggle("has-gap");
        updateScanner();
      });
    });
    updateScanner();
  }

  /* 6. Interactive Custom Solution & Investment Estimator (/pricing/ & Home) */
  var estRoot = document.getElementById("scope-estimator");
  if (estRoot) {
    var modeChips = estRoot.querySelectorAll("[data-est-mode]");
    var chChips = estRoot.querySelectorAll("[data-est-channel]");
    var regChips = estRoot.querySelectorAll("[data-est-region]");
    var volSlider = document.getElementById("est-volume-slider");
    var volDisplay = document.getElementById("est-volume-display");
    var priceDisplay = document.getElementById("est-price-display");
    var noteDisplay = document.getElementById("est-note-display");
    var domainsDisplay = document.getElementById("est-domains-display");
    var ctaLink = document.getElementById("est-start-link");

    var currentMode = "monthly_managed";

    var recalcEstimator = function () {
      var vol = volSlider ? Number(volSlider.value || 1500) : 1500;
      if (volDisplay) volDisplay.textContent = fmt(vol.toLocaleString("en-US"));

      var chCount = 0;
      chChips.forEach(function (c) {
        if (c.classList.contains("is-selected")) chCount++;
      });
      chCount = Math.max(1, chCount);

      var regCount = 0;
      regChips.forEach(function (r) {
        if (r.classList.contains("is-selected")) regCount++;
      });
      regCount = Math.max(1, regCount);

      var domainsNeeded = Math.max(2, Math.ceil(vol / 600) + (regCount > 2 ? 1 : 0));
      var mailboxesNeeded = domainsNeeded * 2;

      var amount = 2400;
      var suffix = "";
      if (currentMode === "pilot_project") {
        amount = 2900 + Math.max(0, chCount - 2) * 350;
        suffix =
          lang === "fa"
            ? " دلار (پروژه کامل ۴ هفته‌ای)"
            : lang === "ar"
            ? " دولار (مشروع متكامل لـ 4 أسابيع)"
            : " one-time 4-week custom sprint";
      } else if (currentMode === "sovereign_pod") {
        amount = 4800 + Math.max(0, Math.floor((vol - 3000) / 1000)) * 450;
        suffix =
          lang === "fa"
            ? " دلار در ماه · پاد اختصاصی چندمنطقه‌ای"
            : lang === "ar"
            ? " دولار / شهرياً · وحدة سيادية مخصصة"
            : " / month · Dedicated Sovereign Pod";
      } else {
        amount = 2400 + Math.max(0, Math.floor((vol - 2000) / 1000)) * 400 + Math.max(0, chCount - 3) * 250;
        suffix =
          lang === "fa"
            ? " دلار در ماه · مدیریت کامل صفر تا صد"
            : lang === "ar"
            ? " دولار / شهرياً · إدارة متكاملة"
            : " / month · Done-For-You Managed Engine";
      }

      if (priceDisplay) {
        priceDisplay.textContent =
          lang === "fa"
            ? fmt(amount.toLocaleString("en-US")) + suffix
            : "$" + amount.toLocaleString("en-US") + suffix;
      }
      if (domainsDisplay) {
        domainsDisplay.textContent =
          lang === "fa"
            ? fmt(domainsNeeded) + " دامنه خواهر ایزوله · " + fmt(mailboxesNeeded) + " صندوق گرم‌شده"
            : lang === "ar"
            ? domainsNeeded + " نطاقات شقيقة · " + mailboxesNeeded + " صناديق بريد مُحماة"
            : domainsNeeded + " Isolated Sister-Domains · " + mailboxesNeeded + " Warmed Mailboxes";
      }
      if (noteDisplay) {
        noteDisplay.textContent =
          lang === "fa"
            ? fmt(regCount) + " منطقه هدف · " + fmt(chCount) + " کانال فعال · گارد صحت‌سنجی فعال"
            : lang === "ar"
            ? regCount + " مناطق مستهدفة · " + chCount + " قنوات نشطة · حوكمة الحقائق مفعلة"
            : regCount + " Target Regions · " + chCount + " Active Channels · FACTS.md Guard Active";
      }
      if (ctaLink) {
        var base = ctaLink.getAttribute("data-base-href") || "/start/";
        ctaLink.setAttribute("href", base + "?mode=" + encodeURIComponent(currentMode) + "&vol=" + encodeURIComponent(vol));
      }
    };

    modeChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentMode = btn.getAttribute("data-est-mode") || "monthly_managed";
        modeChips.forEach(function (b) {
          b.classList.toggle("is-selected", b === btn);
        });
        recalcEstimator();
      });
    });

    chChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("is-selected");
        recalcEstimator();
      });
    });

    regChips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("is-selected");
        recalcEstimator();
      });
    });

    if (volSlider) volSlider.addEventListener("input", recalcEstimator);
    recalcEstimator();
  }

  /* 7. Live NEVER-CLAIM Copy Linter (/trust/) */
  var linterInput = document.getElementById("linter-test-input");
  var linterVerdict = document.getElementById("linter-verdict-box");
  if (linterInput && linterVerdict) {
    var presetBtns = document.querySelectorAll("[data-linter-sample]");
    var evaluateCopy = function () {
      var txt = (linterInput.value || "").trim();
      var lower = txt.toLowerCase();
      var blockedRules = [];

      if (/guarantee|#1|number one|100%|رتبه یک|تضمین قطعی|نضمن المركز الأول|مضمون 100/i.test(lower)) {
        blockedRules.push(
          lang === "fa"
            ? "قانون منع وعده ۱: ادعای تضمین رتبه یا نتیجه قطعی غیرمستند مسدود شد."
            : lang === "ar"
            ? "قاعدة الحظر 1: تم حظر الوعد بنتائج أو ترتيب مضمون غير موثق."
            : "NEVER-CLAIM #1: Unverified ranking or guaranteed outcome promise blocked."
        );
      }
      if (/i am a real human|not an ai|من انسان واقعی هستم|ربات نیستم|أنا إنسان حقيقي/i.test(lower)) {
        blockedRules.push(
          lang === "fa"
            ? "قانون بنیادین هویت: جعل هویت انسانی ممنوع است؛ باید به مدیر ارجاع شود."
            : lang === "ar"
            ? "قاعدة الهوية: يُمنع انتحال الهوية البشرية؛ يتم التحويل للمالك."
            : "GROUND RULE #1: Human impersonation blocked — routes to Owner Action Card."
        );
      }
      if (/quick 15-min call|hop on zoom|جلسه تلفنی فوری|تماس تصویری فردا|مكالمة زووم سريعة/i.test(lower)) {
        blockedRules.push(
          lang === "fa"
            ? "قانون کانال مکتوب: تحمیل جلسه تلفنی در پیام اول مسدود شد؛ ارائه ارزش مکتوب جایگزین می‌شود."
            : lang === "ar"
            ? "قاعدة التواصل الكتابي: تم إيقاف فرض مكالمة مبكرة واستبداله بعرض قيمة مكتوب."
            : "POLICY GUARD: Premature meeting push intercepted — lead with written diagnostic value first."
        );
      }

      if (blockedRules.length > 0) {
        linterVerdict.style.background = "rgba(239, 68, 68, 0.14)";
        linterVerdict.style.borderColor = "rgba(248, 113, 113, 0.45)";
        linterVerdict.innerHTML =
          "<strong style='color:#FCA5A5'>" +
          (lang === "fa" ? "⛔ مسدود توسط گیت ارسال:" : lang === "ar" ? "⛔ تم الاعتراض بواسطة بوابة الأمان:" : "⛔ INTERCEPTED BEFORE SEND:") +
          "</strong><div style='margin-top:6px'>" +
          blockedRules.join(" · ") +
          "</div>";
      } else {
        linterVerdict.style.background = "rgba(16, 185, 129, 0.14)";
        linterVerdict.style.borderColor = "rgba(52, 211, 153, 0.45)";
        linterVerdict.innerHTML =
          "<strong style='color:#6EE7B7'>" +
          (lang === "fa"
            ? "✓ تایید گیت صحت‌سنجی — مجاز برای ارسال از دامنه خواهر"
            : lang === "ar"
            ? "✓ اجتاز فحص الحقائق — جاهز للإرسال عبر النطاق الشقيق"
            : "✓ VERIFIED BY FACTS.md CRITIC — Cleared for Sister-Domain Dispatch") +
          "</strong>";
      }
    };

    linterInput.addEventListener("input", evaluateCopy);
    presetBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        linterInput.value = b.getAttribute("data-linter-sample") || "";
        evaluateCopy();
      });
    });
    evaluateCopy();
  }

  /* 8. Custom Launch Brief Form (/start/) -> POST /api/intake */
  var briefForm = document.getElementById("custom-brief-form");
  if (briefForm) {
    // Prefill from query params if linked from estimator or pricing card
    try {
      var params = new URLSearchParams(window.location.search);
      var modeParam = params.get("mode");
      if (modeParam) {
        var modeSelect = briefForm.querySelector('[name="engagementMode"]');
        if (modeSelect) modeSelect.value = modeParam;
      }
    } catch (_) {}

    briefForm.querySelectorAll("[data-multi-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        chip.classList.toggle("is-selected");
      });
    });

    var receiptBox = document.getElementById("brief-receipt-box");
    var errorBox = document.getElementById("brief-error-box");
    var submitBtn = document.getElementById("brief-submit-btn");

    briefForm.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      if (errorBox) errorBox.setAttribute("hidden", "");

      var formData = new FormData(briefForm);
      var regions = [];
      briefForm.querySelectorAll('[data-multi-chip="region"].is-selected').forEach(function (c) {
        regions.push(c.getAttribute("data-val"));
      });
      var channels = [];
      briefForm.querySelectorAll('[data-multi-chip="channel"].is-selected').forEach(function (c) {
        channels.push(c.getAttribute("data-val"));
      });

      var payload = {
        locale: lang,
        company: String(formData.get("company") || "").trim(),
        website: String(formData.get("website") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        handle: String(formData.get("handle") || "").trim(),
        engagementMode: String(formData.get("engagementMode") || "monthly_managed"),
        dealSize: String(formData.get("dealSize") || ""),
        product: String(formData.get("product") || "").trim(),
        notes: String(formData.get("notes") || "").trim(),
        company_fax_hp: String(formData.get("company_fax_hp") || ""),
        regions: regions,
        channels: channels
      };

      if (!payload.company || !payload.email || !payload.product || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        if (errorBox) {
          errorBox.removeAttribute("hidden");
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      var refId = "LV-" + Date.now().toString(36).toUpperCase().slice(-6);
      try {
        var res = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          var json = await res.json();
          if (json && json.referenceId) refId = json.referenceId;
        }
      } catch (_) {
        // Offline / static preview graceful dossier receipt
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }

      var refSpan = document.getElementById("receipt-ref-id");
      var compSpan = document.getElementById("receipt-company");
      var modeSpan = document.getElementById("receipt-mode");
      if (refSpan) refSpan.textContent = refId;
      if (compSpan) compSpan.textContent = payload.company;
      if (modeSpan) {
        var modeSel = briefForm.querySelector('[name="engagementMode"]');
        modeSpan.textContent =
          modeSel && modeSel.selectedIndex >= 0
            ? modeSel.options[modeSel.selectedIndex].text
            : payload.engagementMode;
      }
      if (receiptBox) {
        receiptBox.removeAttribute("hidden");
        receiptBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
})();
