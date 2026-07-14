// A slowly rotating 3D wireframe torus, rendered live on canvas in the brand
// gradient — the premium "the mathematics is the hero" centrepiece.
// Honours prefers-reduced-motion (renders a single still frame) and pauses when
// the tab is hidden.

(function () {
  const NU = 26, NV = 15;        // grid resolution (around major / minor circle)
  const R = 1.15, r = 0.44;       // torus radii
  const PERSP = 3.4;

  // brand endpoints (violet -> pink)
  const A = [169, 127, 216], B = [230, 163, 201];
  function mix(t) { return [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]; }

  function torusPoint(u, v) {
    const cu = Math.cos(u), su = Math.sin(u), cv = Math.cos(v), sv = Math.sin(v);
    return [(R + r * cv) * cu, (R + r * cv) * su, r * sv];
  }

  function mount(container, opts) {
    opts = opts || {};
    const canvas = document.createElement('canvas');
    canvas.className = 'math-hero-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ax = -0.5, ay = 0.2, raf = null, running = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const rect = container.getBoundingClientRect();
      W = rect.width; H = rect.height || 190;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // precompute grid
    const grid = [];
    for (let i = 0; i <= NU; i++) {
      const row = [];
      for (let j = 0; j <= NV; j++) row.push(torusPoint((i / NU) * 2 * Math.PI, (j / NV) * 2 * Math.PI));
      grid.push(row);
    }

    function project(p, sinX, cosX, sinY, cosY, scale) {
      // rotate around X then Y
      let y = p[1] * cosX - p[2] * sinX;
      let z = p[1] * sinX + p[2] * cosX;
      let x = p[0] * cosY + z * sinY;
      z = -p[0] * sinY + z * cosY;
      const d = PERSP / (PERSP - z);
      return [W / 2 + x * scale * d, H / 2 + y * scale * d, z];
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const scale = Math.min(W, H) * 0.34;
      const sinX = Math.sin(ax), cosX = Math.cos(ax), sinY = Math.sin(ay), cosY = Math.cos(ay);
      const P = grid.map((row) => row.map((p) => project(p, sinX, cosX, sinY, cosY, scale)));

      const seg = (a, b, t) => {
        const depth = (a[2] + b[2]) / 2;           // -~1.5..1.5
        const alpha = 0.18 + 0.42 * (depth + 1.5) / 3;
        const c = mix(t);
        ctx.strokeStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.6 + 0.9 * (depth + 1.5) / 3;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      };

      // draw back-to-front for nicer overlap
      for (let i = 0; i < NU; i++) {
        const t = i / NU;
        for (let j = 0; j < NV; j++) {
          seg(P[i][j], P[i + 1][j], t);       // along major
          seg(P[i][j], P[i][j + 1], t);       // along minor
        }
      }

      if (running && !reduced) { ax += 0.0032; ay += 0.0057; raf = requestAnimationFrame(frame); }
    }

    resize();
    frame();
    const onResize = () => { resize(); if (reduced) frame(); };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running && !reduced && !raf) { raf = requestAnimationFrame(frame); }
      else if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
    });

    return { destroy() { running = false; if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); canvas.remove(); } };
  }

  window.MathHero = { mount };
})();
