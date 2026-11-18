(function () {
  "use strict";

  var canvas = document.getElementById("hero-signal-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isRtl = document.documentElement.dir === "rtl";
  var width = 0;
  var height = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var running = false;
  var rafId = null;

  var pulses = [];
  for (var i = 0; i < 22; i++) {
    pulses.push({
      lane: i % 5,
      progress: (i / 22) % 1,
      speed: 0.0016 + (i % 4) * 0.00045,
      verified: i % 3 !== 0
    });
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    width = Math.max(320, rect.width);
    height = Math.max(420, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFrame();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    // Subtle architectural coordinate grid
    ctx.strokeStyle = "rgba(91, 142, 255, 0.06)";
    ctx.lineWidth = 1;
    var step = 64;
    for (var x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (var y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Soft radial ambient glow around gate node
    var gateX = isRtl ? width * 0.34 : width * 0.66;
    var gateY = height * 0.5;
    var grad = ctx.createRadialGradient(gateX, gateY, 20, gateX, gateY, Math.min(width, height) * 0.52);
    grad.addColorStop(0, "rgba(29, 91, 255, 0.19)");
    grad.addColorStop(0.55, "rgba(13, 159, 110, 0.06)");
    grad.addColorStop(1, "rgba(8, 17, 29, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Signal lanes converging to verification gate
    var startX = isRtl ? width + 20 : -20;
    var endX = isRtl ? -20 : width + 20;
    var lanesY = [0.22, 0.36, 0.5, 0.64, 0.78];

    lanesY.forEach(function (ly) {
      var sy = height * ly;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(148, 178, 218, 0.11)";
      ctx.lineWidth = 1;
      ctx.moveTo(startX, sy);
      ctx.bezierCurveTo(
        (startX + gateX) * 0.5,
        sy,
        gateX,
        (sy + gateY) * 0.5,
        gateX,
        gateY
      );
      ctx.lineTo(endX, gateY + (sy - gateY) * 0.28);
      ctx.stroke();
    });

    // Animated signal pulses
    pulses.forEach(function (p) {
      var sy = height * lanesY[p.lane];
      var px, py, color;
      if (p.progress < 0.55) {
        var t = p.progress / 0.55;
        px = startX + (gateX - startX) * t;
        py = sy + (gateY - sy) * (t * t);
        color = "rgba(91, 142, 255, 0.65)";
      } else {
        if (!p.verified) return;
        var t2 = (p.progress - 0.55) / 0.45;
        px = gateX + (endX - gateX) * t2;
        py = gateY + (sy - gateY) * 0.28 * t2;
        color = "rgba(52, 211, 153, 0.78)";
      }
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(px, py, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop() {
    if (!running) return;
    for (var i = 0; i < pulses.length; i++) {
      pulses[i].progress += pulses[i].speed;
      if (pulses[i].progress >= 1) pulses[i].progress -= 1;
    }
    drawFrame();
    rafId = window.requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              rafId = window.requestAnimationFrame(loop);
            }
          } else {
            running = false;
            if (rafId) window.cancelAnimationFrame(rafId);
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
  }
})();
