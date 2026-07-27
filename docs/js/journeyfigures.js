// Interactive mathematical figures for the Journey. Not illustrations —
// instruments. The learner discovers the idea by moving something and watching
// the mathematics respond, before any word for it is offered. Each figure is a
// pure client: it computes from its own maths, mounts into a container, and
// returns { destroy }. SVG, not 3D — these ideas are clearest in two honest
// dimensions, and they cost almost nothing to run.
(function () {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const VW = 340, VH = 240;                       // viewBox
  const BOX = { x: 20, y: 16, w: 300, h: 196 };   // drawable area

  function el(name, attrs) {
    const n = document.createElementNS(SVGNS, name);
    for (const k in (attrs || {})) n.setAttribute(k, attrs[k]);
    return n;
  }
  function mapper(v) {
    const sx = BOX.w / (v.xmax - v.xmin), sy = BOX.h / (v.ymax - v.ymin);
    return {
      X: (x) => BOX.x + (x - v.xmin) * sx,
      Y: (y) => BOX.y + BOX.h - (y - v.ymin) * sy,
      invX: (px) => v.xmin + (px - BOX.x) / sx,
    };
  }
  function curve(f, v, m, n) {
    n = n || 72; let d = '';
    for (let i = 0; i <= n; i++) {
      const x = v.xmin + (v.xmax - v.xmin) * i / n;
      d += (i ? 'L' : 'M') + m.X(x).toFixed(1) + ' ' + m.Y(f(x)).toFixed(1);
    }
    return d;
  }
  function fmt(x) { return (Math.round(x * 100) / 100).toFixed(2); }

  // A figure scaffold: an SVG stage + an HTML readout strip beneath it.
  function stage(container) {
    const wrap = document.createElement('div');
    wrap.className = 'fig';
    const svg = el('svg', { viewBox: `0 0 ${VW} ${VH}`, class: 'fig-svg', role: 'img' });
    wrap.appendChild(svg);
    const read = document.createElement('div');
    read.className = 'fig-read';
    wrap.appendChild(read);
    container.appendChild(wrap);
    return { wrap, svg, read };
  }
  // Pointer → math-x, via the SVG's own coordinate box.
  function pointerX(svg, m, ev) {
    const r = svg.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width * VW;
    return m.invX(px);
  }
  function reduced() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }

  // ---- axes helper (quiet, never the subject) --------------------------------
  function axes(svg, v, m, opts) {
    opts = opts || {};
    if (v.ymin <= 0 && v.ymax >= 0) svg.appendChild(el('line', { class: 'fig-axis', x1: BOX.x, y1: m.Y(0), x2: BOX.x + BOX.w, y2: m.Y(0) }));
    if (v.xmin <= 0 && v.xmax >= 0 && !opts.noY) svg.appendChild(el('line', { class: 'fig-axis', x1: m.X(0), y1: BOX.y, x2: m.X(0), y2: BOX.y + BOX.h }));
  }

  // ===========================================================================
  // 1) SECANT → TANGENT — the discovery. Drag the second point toward the first
  //    and watch the average slope settle on a single number.
  // ===========================================================================
  function secant(container, opts) {
    opts = opts || {};
    const f = (x) => x * x, a = 1;
    const v = { xmin: -0.15, xmax: 2.25, ymin: -0.4, ymax: 3.4 };
    const s = stage(container);
    const m = mapper(v);
    axes(s.svg, v, m);
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve(f, v, m) }));
    const tangent = el('line', { class: 'fig-tangent' });          // faint target
    const secLine = el('line', { class: 'fig-secant' });
    const pP = el('circle', { class: 'fig-point fixed', r: 4.5, cx: m.X(a), cy: m.Y(f(a)) });
    const pQ = el('circle', { class: 'fig-point drag', r: 6.5, tabindex: '0' });
    s.svg.append(tangent, secLine, pP, pQ);
    // faint tangent (slope 2 at a): drawn once, revealed by opacity via CSS state
    const drawLineThrough = (node, x0, y0, slope) => {
      const L = v.xmin, R = v.xmax;
      node.setAttribute('x1', m.X(L)); node.setAttribute('y1', m.Y(y0 + slope * (L - x0)));
      node.setAttribute('x2', m.X(R)); node.setAttribute('y2', m.Y(y0 + slope * (R - x0)));
    };
    drawLineThrough(tangent, a, f(a), 2 * a);

    let asked = false, curX = a + 1.0;
    const update = (xq) => {
      curX = Math.max(a + 0.02, Math.min(v.xmax - 0.05, xq));     // stay right of P
      const h = curX - a, slope = curX + a;                       // exact for x^2
      pQ.setAttribute('cx', m.X(curX)); pQ.setAttribute('cy', m.Y(f(curX)));
      drawLineThrough(secLine, a, f(a), slope);
      s.read.innerHTML = `<span class="fig-r"><i>step</i> h = <b>${fmt(h)}</b></span>`
        + `<span class="fig-r accent"><i>average slope</i> = <b>${fmt(slope)}</b></span>`;
      s.wrap.classList.toggle('settling', h <= 0.16);
      if (h <= 0.06) s.wrap.classList.add('discovered');          // the tangent locks in
      if (h <= 0.30 && !asked) { asked = true; if (opts.onDiscover) opts.onDiscover(); } // interrupt to predict
    };
    update(a + 1.0);

    // drag + keyboard
    let dragging = false;
    const down = (e) => { dragging = true; update(pointerX(s.svg, m, e)); e.preventDefault(); };
    const move = (e) => { if (dragging) update(pointerX(s.svg, m, e)); };
    const up = () => { dragging = false; };
    s.svg.addEventListener('pointerdown', down);
    s.svg.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    pQ.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      update(curX + (e.key === 'ArrowLeft' ? -0.06 : 0.06)); e.preventDefault();
    });

    return { destroy() { window.removeEventListener('pointerup', up); container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 2) ZOOM — local linearity. Zoom into the curve at a point; it straightens.
  // ===========================================================================
  function zoom(container, opts) {
    opts = opts || {};
    const f = (x) => x * x, a = 1, slope = 2;
    const s = stage(container);
    let level = 1;
    const curveP = el('path', { class: 'fig-curve' });
    const tan = el('line', { class: 'fig-tangent show' });
    const pt = el('circle', { class: 'fig-point fixed', r: 4.5 });
    s.svg.append(tan, curveP, pt);
    const redraw = () => {
      const half = 1.2 / level;
      const v = { xmin: a - half, xmax: a + half, ymin: f(a) - half * 2.2, ymax: f(a) + half * 2.2 };
      const m = mapper(v);
      curveP.setAttribute('d', curve(f, v, m, 90));
      const L = v.xmin, R = v.xmax;
      tan.setAttribute('x1', m.X(L)); tan.setAttribute('y1', m.Y(f(a) + slope * (L - a)));
      tan.setAttribute('x2', m.X(R)); tan.setAttribute('y2', m.Y(f(a) + slope * (R - a)));
      pt.setAttribute('cx', m.X(a)); pt.setAttribute('cy', m.Y(f(a)));
      s.read.innerHTML = `<span class="fig-r"><i>zoom</i> <b>${level < 10 ? level.toFixed(1) : Math.round(level)}×</b></span>`
        + (level >= 16 ? `<span class="fig-r accent">the curve <b>is</b> its tangent line</span>` : `<span class="fig-r">keep zooming…</span>`);
      s.wrap.classList.toggle('discovered', level >= 16);
      if (level >= 16 && opts.onDiscover) opts.onDiscover();
    };
    const range = document.createElement('input');
    range.type = 'range'; range.min = '0'; range.max = '100'; range.value = '0';
    range.className = 'fig-slider'; range.setAttribute('aria-label', 'Zoom');
    range.addEventListener('input', () => { level = 1 + Math.pow(parseFloat(range.value) / 100, 2) * 63; redraw(); });
    s.wrap.appendChild(range);
    redraw();
    return { destroy() { container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 3) VELOCITY — the same slope, felt as speed. Drag time; read the speedometer.
  // ===========================================================================
  function velocity(container, opts) {
    opts = opts || {};
    const s0 = (t) => 0.55 * t * t;                 // position
    const v = { xmin: 0, xmax: 2.3, ymin: 0, ymax: 3.2 };
    const s = stage(container);
    const m = mapper(v);
    axes(s.svg, v, m);
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve(s0, v, m) }));
    const tan = el('line', { class: 'fig-tangent show' });
    const dot = el('circle', { class: 'fig-point drag', r: 6.5, tabindex: '0' });
    s.svg.append(tan, dot);
    const update = (t) => {
      t = Math.max(0.15, Math.min(v.xmax - 0.1, t));
      const y = s0(t), slope = 1.1 * t;             // s'(t) = 1.1 t
      dot.setAttribute('cx', m.X(t)); dot.setAttribute('cy', m.Y(y));
      const L = Math.max(v.xmin, t - 0.9), R = Math.min(v.xmax, t + 0.9);
      tan.setAttribute('x1', m.X(L)); tan.setAttribute('y1', m.Y(y + slope * (L - t)));
      tan.setAttribute('x2', m.X(R)); tan.setAttribute('y2', m.Y(y + slope * (R - t)));
      s.read.innerHTML = `<span class="fig-r"><i>time</i> t = <b>${fmt(t)}</b></span>`
        + `<span class="fig-r accent"><i>speed now</i> = slope = <b>${fmt(slope)}</b></span>`;
    };
    update(1.2);
    let dragging = false;
    const down = (e) => { dragging = true; update(pointerX(s.svg, m, e)); e.preventDefault(); };
    const move = (e) => { if (dragging) update(pointerX(s.svg, m, e)); };
    const up = () => { dragging = false; };
    s.svg.addEventListener('pointerdown', down); s.svg.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return { destroy() { window.removeEventListener('pointerup', up); container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 4) THE CORNER — where the derivative fails. Approach from each side; the two
  //    slopes disagree, so there is no single direction.
  // ===========================================================================
  function corner(container, opts) {
    opts = opts || {};
    const f = (x) => Math.abs(x - 1) + 0.4, a = 1;
    const v = { xmin: -0.15, xmax: 2.15, ymin: 0, ymax: 2.0 };
    const s = stage(container);
    const m = mapper(v);
    axes(s.svg, v, m, { noY: true });
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve(f, v, m, 40) }));
    const secLine = el('line', { class: 'fig-secant' });
    const pP = el('circle', { class: 'fig-point fixed', r: 5, cx: m.X(a), cy: m.Y(f(a)) });
    const pQ = el('circle', { class: 'fig-point drag', r: 6.5, tabindex: '0' });
    s.svg.append(secLine, pP, pQ);
    let sawL = false, sawR = false;
    const update = (xq) => {
      xq = Math.max(v.xmin + 0.05, Math.min(v.xmax - 0.05, xq));
      if (Math.abs(xq - a) < 0.08) xq = a + (xq >= a ? 0.08 : -0.08);
      const slope = (f(xq) - f(a)) / (xq - a);
      pQ.setAttribute('cx', m.X(xq)); pQ.setAttribute('cy', m.Y(f(xq)));
      const L = v.xmin, R = v.xmax;
      secLine.setAttribute('x1', m.X(L)); secLine.setAttribute('y1', m.Y(f(a) + slope * (L - a)));
      secLine.setAttribute('x2', m.X(R)); secLine.setAttribute('y2', m.Y(f(a) + slope * (R - a)));
      const side = xq < a ? 'from the left' : 'from the right';
      s.read.innerHTML = `<span class="fig-r"><i>approaching</i> ${side}</span>`
        + `<span class="fig-r accent"><i>slope</i> = <b>${slope > 0 ? '+' : ''}${fmt(slope)}</b></span>`;
      if (xq < a) sawL = true; else sawR = true;
      if (sawL && sawR) { s.wrap.classList.add('discovered'); if (opts.onDiscover) opts.onDiscover(); }
    };
    update(a + 0.7);
    let dragging = false;
    const down = (e) => { dragging = true; update(pointerX(s.svg, m, e)); e.preventDefault(); };
    const move = (e) => { if (dragging) update(pointerX(s.svg, m, e)); };
    const up = () => { dragging = false; };
    s.svg.addEventListener('pointerdown', down); s.svg.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return { destroy() { window.removeEventListener('pointerup', up); container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 5) THE HILL — application. The summit is exactly where the slope is zero.
  // ===========================================================================
  function optimize(container, opts) {
    opts = opts || {};
    const f = (x) => -(x - 1) * (x - 1) + 1.1, a = 1;
    const v = { xmin: -0.1, xmax: 2.1, ymin: -0.15, ymax: 1.35 };
    const s = stage(container);
    const m = mapper(v);
    axes(s.svg, v, m, { noY: true });
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve(f, v, m) }));
    const tan = el('line', { class: 'fig-tangent show' });
    const dot = el('circle', { class: 'fig-point drag', r: 6.5, tabindex: '0' });
    const flag = el('circle', { class: 'fig-summit', r: 3, cx: m.X(a), cy: m.Y(f(a)) });
    s.svg.append(tan, flag, dot);
    const update = (x) => {
      x = Math.max(v.xmin + 0.05, Math.min(v.xmax - 0.05, x));
      const y = f(x), slope = -2 * (x - 1);
      dot.setAttribute('cx', m.X(x)); dot.setAttribute('cy', m.Y(y));
      const L = Math.max(v.xmin, x - 0.7), R = Math.min(v.xmax, x + 0.7);
      tan.setAttribute('x1', m.X(L)); tan.setAttribute('y1', m.Y(y + slope * (L - x)));
      tan.setAttribute('x2', m.X(R)); tan.setAttribute('y2', m.Y(y + slope * (R - x)));
      const flat = Math.abs(slope) < 0.08;
      s.wrap.classList.toggle('settling', flat);
      s.read.innerHTML = `<span class="fig-r"><i>slope</i> = <b>${slope > 0 ? '+' : ''}${fmt(slope)}</b></span>`
        + (flat ? `<span class="fig-r accent">flat — the summit</span>` : `<span class="fig-r">tilt it toward level…</span>`);
      if (flat) { s.wrap.classList.add('discovered'); if (opts.onDiscover) opts.onDiscover(); }
    };
    update(0.35);
    let dragging = false;
    const down = (e) => { dragging = true; update(pointerX(s.svg, m, e)); e.preventDefault(); };
    const move = (e) => { if (dragging) update(pointerX(s.svg, m, e)); };
    const up = () => { dragging = false; };
    s.svg.addEventListener('pointerdown', down); s.svg.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return { destroy() { window.removeEventListener('pointerup', up); container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 6) TRANSFER — the idea on a curve that has nothing to do with x². A seedling's
  //    height over two weeks: on which day was it growing fastest? Judge by the
  //    tilt of the tangent alone — no numbers. The steepest point is the
  //    inflection, and finding it means the learner carried the idea outside
  //    calculus.
  // ===========================================================================
  function growth(container, opts) {
    opts = opts || {};
    const L = 3, k = 1.9, t0 = 1.15;
    const f = (t) => L / (1 + Math.exp(-k * (t - t0)));
    const v = { xmin: 0, xmax: 2.3, ymin: 0, ymax: 3.25 };
    const s = stage(container);
    const m = mapper(v);
    if (v.ymin <= 0) s.svg.appendChild(el('line', { class: 'fig-axis', x1: BOX.x, y1: m.Y(0), x2: BOX.x + BOX.w, y2: m.Y(0) }));
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve(f, v, m, 90) }));
    const seg = el('line', { class: 'fig-secant' });                // the tangent tilt, no number
    const dot = el('circle', { class: 'fig-point drag', r: 6.5, tabindex: '0' });
    s.svg.append(seg, dot);
    const day = (t) => Math.round(1 + t / v.xmax * 13);
    const update = (t) => {
      t = Math.max(0.12, Math.min(v.xmax - 0.1, t));
      const y = f(t), slope = k * y * (1 - y / L);
      dot.setAttribute('cx', m.X(t)); dot.setAttribute('cy', m.Y(y));
      const L2 = t - 0.34, R2 = t + 0.34;
      seg.setAttribute('x1', m.X(L2)); seg.setAttribute('y1', m.Y(y + slope * (L2 - t)));
      seg.setAttribute('x2', m.X(R2)); seg.setAttribute('y2', m.Y(y + slope * (R2 - t)));
      const near = Math.abs(t - t0) < 0.13;
      s.wrap.classList.toggle('settling', near);
      s.read.innerHTML = `<span class="fig-r"><i>day</i> <b>${day(t)}</b></span>`
        + `<span class="fig-r">${near ? 'steepest tilt — right here?' : 'where does it climb fastest?'}</span>`;
      if (near) { s.wrap.classList.add('discovered'); if (opts.onDiscover) opts.onDiscover(); }
    };
    update(0.35);
    let dragging = false;
    const down = (e) => { dragging = true; update(pointerX(s.svg, m, e)); e.preventDefault(); };
    const move = (e) => { if (dragging) update(pointerX(s.svg, m, e)); };
    const up = () => { dragging = false; };
    s.svg.addEventListener('pointerdown', down); s.svg.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return { destroy() { window.removeEventListener('pointerup', up); container.innerHTML = ''; } };
  }

  // ===========================================================================
  // 7) THE PROMISE — a polynomial pretending to be eˣ. Raise the degree and watch
  //    each new term buy a little more territory: "I'll behave like the real
  //    function just a little farther." The number that matters is how far the
  //    imitation holds, so that is what the readout shows.
  // ===========================================================================
  function taylor(container, opts) {
    opts = opts || {};
    const v = { xmin: -3, xmax: 3, ymin: -1.5, ymax: 9 };
    const s = stage(container);
    const m = mapper(v);
    axes(s.svg, v, m);
    const clamp2 = (y) => Math.max(v.ymin - 2, Math.min(v.ymax + 2, y));
    s.svg.appendChild(el('path', { class: 'fig-curve', d: curve((x) => clamp2(Math.exp(x)), v, m, 140) }));
    const poly = el('path', { class: 'fig-secant fig-poly' });
    s.svg.appendChild(poly);
    const T = (x, n) => { let sum = 0, term = 1; for (let k = 0; k <= n; k++) { if (k) term *= x / k; sum += term; } return sum; };
    // how far the promise holds: the largest |x| where the imitation stays within 1%
    const reach = (n) => {
      let r = 0;
      for (let x = 0; x <= 3; x += 0.02) {
        const e = Math.exp(x);
        if (Math.abs(T(x, n) - e) / e > 0.01 || Math.abs(T(-x, n) - Math.exp(-x)) / Math.exp(-x) > 0.01) break;
        r = x;
      }
      return r;
    };
    let n = 1;
    const NAMES = ['a constant', 'a straight line', 'a parabola', 'a cubic', 'a quartic', 'a quintic'];
    const redraw = () => {
      poly.setAttribute('d', curve((x) => clamp2(T(x, n)), v, m, 200));
      const r = reach(n);
      s.read.innerHTML = `<span class="fig-r"><i>degree</i> <b>${n}</b> — ${escapeHtmlLocal(NAMES[n] || 'one more promise')}</span>`
        + `<span class="fig-r accent"><i>holds to</i> <b>|x| ≈ ${r.toFixed(2)}</b></span>`;
      s.wrap.classList.toggle('discovered', n >= 6);
      if (n >= 6 && opts.onDiscover) opts.onDiscover();
    };
    const range = document.createElement('input');
    range.type = 'range'; range.min = '0'; range.max = '9'; range.value = '1';
    range.className = 'fig-slider'; range.setAttribute('aria-label', 'Polynomial degree');
    range.addEventListener('input', () => { n = parseInt(range.value, 10); redraw(); });
    s.wrap.appendChild(range);
    redraw();
    return { destroy() { container.innerHTML = ''; } };
  }
  function escapeHtmlLocal(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  const FIGS = { secant, zoom, velocity, corner, optimize, growth, taylor };
  function mount(container, kind, opts) {
    const fn = FIGS[kind];
    if (!fn) { container.innerHTML = ''; return { destroy() {} }; }
    try { return fn(container, opts || {}); }
    catch (e) { container.innerHTML = ''; return { destroy() {} }; }
  }
  window.JourneyFigures = { mount, has: (k) => !!FIGS[k] };
})();
