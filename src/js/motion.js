/* Leadvium Choreography Engine — GSAP 3 + ScrollTrigger + Lenis
 * Strict FIX #1 compliance: ZERO initial opacity:0 hides. Every section renders cleanly at rest.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* 1. Cursor Spotlight Radial Surface Tracking */
  if (!reduced && finePointer) {
    document.querySelectorAll(".arch-card, .plan-card, .studio-showcase-shell, .interactive-workbench").forEach(function (card) {
      card.classList.add("spotlight-card");
      card.addEventListener(
        "pointermove",
        function (ev) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", ev.clientX - r.left + "px");
          card.style.setProperty("--my", ev.clientY - r.top + "px");
        },
        { passive: true }
      );
    });
  }

  if (reduced || typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") {
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  /* 2. Desktop Lenis Smooth Inertial Scroll synced to GSAP Ticker */
  if (window.innerWidth >= 1024 && typeof window.Lenis !== "undefined") {
    try {
      var lenis = new window.Lenis({ lerp: 0.11, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } catch (_) {}
  }

  /* 3. Top Viewport Scroll Progress Laser */
  var laser = document.getElementById("scroll-laser");
  if (laser) {
    gsap.to(laser, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15
      }
    });
  }

  /* 4. Magnetic Primary Action Buttons */
  if (finePointer) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
      var yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });
      btn.addEventListener("pointermove", function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
        var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.16;
        xTo(dx);
        yTo(dy);
      });
      btn.addEventListener("pointerleave", function () {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* 5. Word-by-Word Editorial Manifesto Illumination (WCAG-safe rest color -> full ink) */
  var manifesto = document.querySelector("[data-illuminate-manifesto]");
  if (manifesto) {
    var words = manifesto.querySelectorAll(".manifesto-word");
    if (words.length) {
      gsap.fromTo(
        words,
        { color: "#64748B" },
        {
          color: "#0B1626",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: manifesto,
            start: "top 82%",
            end: "bottom 52%",
            scrub: 0.25
          }
        }
      );
    }
  }

  /* 6. 1 -> 4 14-Page Audit Dossier Tactile Fan Elevation */
  var fanGrid = document.querySelector(".dossier-fan-grid");
  if (fanGrid && window.innerWidth >= 1024) {
    var sheets = fanGrid.querySelectorAll(".dossier-sheet");
    sheets.forEach(function (sheet, idx) {
      var tilt = (idx - 1.5) * 1.4;
      gsap.fromTo(
        sheet,
        { y: 18, rotate: 0 },
        {
          y: 0,
          rotate: tilt,
          ease: "power2.out",
          scrollTrigger: {
            trigger: fanGrid,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.3
          }
        }
      );
    });
  }
})();
