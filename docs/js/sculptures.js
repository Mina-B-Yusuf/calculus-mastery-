// Per-chapter mathematical sculptures — one meaningful, quietly animated line
// drawing per chapter, in the brand gradient, matching the home torus aesthetic.
// The bible: mathematics is the hero, and each object *means* something about its
// chapter. Chapter 6 (techniques / substitution) reuses the 3D torus (MathHero).
//
// Honours prefers-reduced-motion (draws one representative still frame) and pauses
// when the tab is hidden. mount(container, {kind}) -> { destroy() }.

(function () {
  const VIOLET = '#a97fd8', PINK = '#e6a3c9';

  // chapter value ('P','1'..'9') -> sculpture kind
  const CHAPTER_KIND = {
    P: 'lattice', 1: 'limit', 2: 'tangent', 3: 'inverse', 4: 'optimize',
    5: 'area', 6: 'torus', 7: 'volume', 8: 'rose', 9: 'converge',
  };
  function kindForChapter(ch) { return CHAPTER_KIND[String(ch)] || 'lattice'; }

  function grad(ctx, x0, x1) {
    const g = ctx.createLinearGradient(x0, 0, x1, 0);
    g.addColorStop(0, VIOLET); g.addColorStop(1, PINK);
    return g;
  }
  // map maths coords -> pixels inside a padded box (y up)
  function mapper(box, dx0, dx1, dy0, dy1) {
    return {
      X: (v) => box.x + ((v - dx0) / (dx1 - dx0)) * box.w,
      Y: (v) => box.y + box.h - ((v - dy0) / (dy1 - dy0)) * box.h,
    };
  }
  function curve(ctx, f, dx0, dx1, X, Y, steps) {
    steps = steps || 140;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = dx0 + (dx1 - dx0) * (i / steps);
      const px = X(x), py = Y(f(x));
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.stroke();
  }
  // faint axes through the origin
  function axes(ctx, box, X, Y, a) {
    ctx.save();
    ctx.strokeStyle = 'rgba(150,130,175,' + (a || 0.22) + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(box.x, Y(0)); ctx.lineTo(box.x + box.w, Y(0));
    ctx.moveTo(X(0), box.y); ctx.lineTo(X(0), box.y + box.h);
    ctx.stroke();
    ctx.restore();
  }

  // ---- individual sculptures: draw(ctx, box, t, W, H) --------------------------
  const DRAW = {
    // Preliminaries — the coordinate plane itself: a lattice with a slow parallax drift.
    lattice(ctx, box, t) {
      const dx = Math.sin(t * 0.3) * 5, dy = Math.cos(t * 0.24) * 4;
      const { X, Y } = mapper(box, -3, 3, -2, 2);
      ctx.save(); ctx.translate(dx, dy);
      ctx.strokeStyle = 'rgba(150,130,175,0.16)'; ctx.lineWidth = 1;
      for (let x = -3; x <= 3; x++) { ctx.beginPath(); ctx.moveTo(X(x), box.y - 6); ctx.lineTo(X(x), box.y + box.h + 6); ctx.stroke(); }
      for (let y = -2; y <= 2; y++) { ctx.beginPath(); ctx.moveTo(box.x - 6, Y(y)); ctx.lineTo(box.x + box.w + 6, Y(y)); ctx.stroke(); }
      ctx.fillStyle = grad(ctx, box.x, box.x + box.w);
      for (let x = -3; x <= 3; x++) for (let y = -2; y <= 2; y++) {
        ctx.globalAlpha = 0.35 + 0.4 * Math.abs(Math.sin(x * 0.7 + y * 0.9 + t * 0.4));
        ctx.beginPath(); ctx.arc(X(x), Y(y), 2.1, 0, 7); ctx.fill();
      }
      ctx.restore();
    },

    // Limits — the ε–δ picture: a band around the limit L that narrows and reopens.
    limit(ctx, box, t) {
      const { X, Y } = mapper(box, -3, 3, -2, 2);
      const a = 0, L = 0;
      const eps = 0.25 + 0.75 * (0.5 + 0.5 * Math.cos(t * 0.5));
      const del = eps * 0.9;
      // epsilon band (horizontal) + delta band (vertical)
      ctx.fillStyle = 'rgba(169,127,216,0.10)';
      ctx.fillRect(box.x, Y(L + eps), box.w, Y(L - eps) - Y(L + eps));
      ctx.fillStyle = 'rgba(230,163,201,0.08)';
      ctx.fillRect(X(a - del), box.y, X(a + del) - X(a - del), box.h);
      axes(ctx, box, X, Y, 0.16);
      ctx.strokeStyle = grad(ctx, box.x, box.x + box.w); ctx.lineWidth = 1.7;
      curve(ctx, (x) => L + 0.62 * x + 0.12 * Math.sin(x * 1.4), -3, 3, X, Y);
      // the point being approached
      ctx.fillStyle = '#e6a3c9'; ctx.beginPath(); ctx.arc(X(a), Y(L), 3.4, 0, 7); ctx.fill();
    },

    // Differentiation — a curve with a tangent line gliding along it.
    tangent(ctx, box, t) {
      const { X, Y } = mapper(box, -2.3, 2.3, -2.2, 2.2);
      const f = (x) => 0.26 * x * x * x - 0.62 * x;
      const df = (x) => 0.78 * x * x - 0.62;
      axes(ctx, box, X, Y, 0.16);
      ctx.strokeStyle = grad(ctx, box.x, box.x + box.w); ctx.lineWidth = 1.8;
      curve(ctx, f, -2.3, 2.3, X, Y);
      const a = 1.85 * Math.sin(t * 0.5), m = df(a), y0 = f(a);
      ctx.strokeStyle = 'rgba(230,163,201,0.85)'; ctx.lineWidth = 1.4;
      const span = 1.15;
      ctx.beginPath();
      ctx.moveTo(X(a - span), Y(y0 + m * -span));
      ctx.lineTo(X(a + span), Y(y0 + m * span));
      ctx.stroke();
      ctx.fillStyle = '#a97fd8'; ctx.beginPath(); ctx.arc(X(a), Y(y0), 4, 0, 7); ctx.fill();
    },

    // Transcendental — e^x and ln x as a reflected inverse pair across y = x.
    inverse(ctx, box, t) {
      const { X, Y } = mapper(box, -2.6, 2.6, -2.6, 2.6);
      const s = 1 + 0.03 * Math.sin(t * 0.6);
      axes(ctx, box, X, Y, 0.16);
      ctx.save(); ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(150,130,175,0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(-2.6), Y(-2.6)); ctx.lineTo(X(2.6), Y(2.6)); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = grad(ctx, box.x, box.x + box.w); ctx.lineWidth = 1.8;
      curve(ctx, (x) => Math.min(2.7, Math.exp(x * s) - 1), -2.6, 1.2, X, Y);
      ctx.strokeStyle = 'rgba(230,163,201,0.9)';
      curve(ctx, (x) => Math.max(-2.7, Math.log(x + 1) / s), -0.95, 2.6, X, Y);
    },

    // Applications of differentiation — a marker roaming, then resting at the max.
    optimize(ctx, box, t) {
      const { X, Y } = mapper(box, -2.4, 2.4, -0.4, 2.2);
      const pk = 0.5, f = (x) => 1.7 - 0.42 * (x - pk) * (x - pk);
      axes(ctx, box, X, Y, 0.16);
      ctx.strokeStyle = grad(ctx, box.x, box.x + box.w); ctx.lineWidth = 1.8;
      curve(ctx, f, -2.4, 2.4, X, Y);
      const ph = (t * 0.14) % 1;                       // 0..1 loop
      const xm = pk + 1.9 * Math.cos(ph * Math.PI * 4) * (1 - ph);
      const ym = f(xm);
      ctx.strokeStyle = 'rgba(150,130,175,0.35)'; ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(xm), Y(0)); ctx.lineTo(X(xm), Y(ym)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#e6a3c9'; ctx.beginPath(); ctx.arc(X(xm), Y(ym), 4, 0, 7); ctx.fill();
    },

    // Integration — area accumulating under the curve, sweeping left to right.
    area(ctx, box, t) {
      const { X, Y } = mapper(box, -2.6, 2.6, 0, 2.4);
      const f = (x) => 1.15 + 0.72 * Math.cos(x * 0.82);
      const sweep = -2.6 + 5.2 * ((t * 0.16) % 1);
      // filled region up to the sweep line
      ctx.beginPath();
      ctx.moveTo(X(-2.6), Y(0));
      for (let x = -2.6; x <= sweep; x += 0.06) ctx.lineTo(X(x), Y(f(x)));
      ctx.lineTo(X(sweep), Y(0)); ctx.closePath();
      const fg = ctx.createLinearGradient(0, box.y, 0, box.y + box.h);
      fg.addColorStop(0, 'rgba(169,127,216,0.28)'); fg.addColorStop(1, 'rgba(230,163,201,0.05)');
      ctx.fillStyle = fg; ctx.fill();
      axes(ctx, box, X, Y, 0.16);
      ctx.strokeStyle = grad(ctx, box.x, box.x + box.w); ctx.lineWidth = 1.8;
      curve(ctx, f, -2.6, 2.6, X, Y);
    },

    // Applications of integration — cross-sections stacking into a solid of revolution.
    volume(ctx, box, t) {
      const { X, Y } = mapper(box, -2.6, 2.6, -1.6, 1.6);
      const f = (x) => 0.55 + 0.55 * Math.sin(x * 0.7 + 1.1);
      axes(ctx, box, X, Y, 0.14);
      ctx.strokeStyle = 'rgba(169,127,216,0.5)'; ctx.lineWidth = 1.4;
      curve(ctx, f, -2.6, 2.6, X, Y);
      curve(ctx, (x) => -f(x), -2.6, 2.6, X, Y);
      const n = 13, shown = 3 + Math.floor(((t * 0.2) % 1) * (n - 2));
      for (let i = 0; i < n; i++) {
        const x = -2.4 + 4.8 * (i / (n - 1));
        const ry = (Y(0) - Y(f(x)));
        ctx.strokeStyle = i <= shown ? grad(ctx, box.x, box.x + box.w) : 'rgba(150,130,175,0.12)';
        ctx.globalAlpha = i <= shown ? 0.85 : 1;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(X(x), Y(0), Math.max(1, ry * 0.34), ry, 0, 0, 7); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    },

    // Conics / parametric / polar — a rose curve tracing itself out.
    rose(ctx, box, t) {
      const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      const R = Math.min(box.w, box.h) * 0.44, k = 4;
      const prog = (t * 0.12) % 1;
      const end = 2 * Math.PI * (0.05 + 0.95 * prog);
      ctx.strokeStyle = grad(ctx, cx - R, cx + R); ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (let th = 0; th <= end; th += 0.02) {
        const r = R * Math.cos(k * th);
        const px = cx + r * Math.cos(th), py = cy + r * Math.sin(th);
        th ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke();
    },

    // Sequences & series — a rough loop refining to a smooth circle and back.
    converge(ctx, box, t) {
      const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      const R = Math.min(box.w, box.h) * 0.4, n = 15;
      const amp = 0.42 * (0.5 + 0.5 * Math.cos(t * 0.4));   // roughness breathes to 0
      // target smooth circle
      ctx.strokeStyle = 'rgba(150,130,175,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      ctx.strokeStyle = grad(ctx, cx - R, cx + R); ctx.lineWidth = 1.7;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = (i % n) / n * 2 * Math.PI;
        const jitter = Math.sin(i * 12.9898) * 43758.5453; // deterministic pseudo-noise
        const rr = R * (1 + amp * (jitter - Math.floor(jitter) - 0.5));
        const px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = grad(ctx, cx - R, cx + R);
      for (let i = 0; i < n; i++) {
        const a = i / n * 2 * Math.PI;
        const jitter = Math.sin(i * 12.9898) * 43758.5453;
        const rr = R * (1 + amp * (jitter - Math.floor(jitter) - 0.5));
        ctx.beginPath(); ctx.arc(cx + rr * Math.cos(a), cy + rr * Math.sin(a), 2, 0, 7); ctx.fill();
      }
    },
  };
  // a representative still time for each kind (reduced-motion / low-perf frame)
  const STILL_T = { lattice: 0, limit: 0, tangent: 1.7, inverse: 0, optimize: 3.5, area: 3.4, volume: 2.6, rose: 4.6, converge: 3.9 };

  function mount(container, opts) {
    opts = opts || {};
    const kind = opts.kind || 'lattice';
    if (kind === 'torus' && window.MathHero) return window.MathHero.mount(container, opts);
    const draw = DRAW[kind] || DRAW.lattice;

    const canvas = document.createElement('canvas');
    canvas.className = 'math-hero-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, box = null, raf = null, running = true, t0 = performance.now();

    function resize() {
      const rect = container.getBoundingClientRect();
      W = rect.width; H = rect.height || 190;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      box = { x: W * 0.10, y: H * 0.13, w: W * 0.80, h: H * 0.74 };
    }
    function frame() {
      const t = reduced ? (STILL_T[kind] || 0) : (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      draw(ctx, box, t, W, H);
      if (running && !reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    frame();
    const onResize = () => { resize(); if (reduced) frame(); };
    window.addEventListener('resize', onResize);
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced && !raf) raf = requestAnimationFrame(frame);
      else if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
    };
    document.addEventListener('visibilitychange', onVis);

    return {
      destroy() {
        running = false; if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        canvas.remove();
      },
    };
  }

  window.Sculptures = { mount, kindForChapter };
})();
