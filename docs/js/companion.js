// The ferret — a restrained, behavioural companion, not a mascot sticker.
// Per the design bible it lives only at the base of the Home "observatory"
// (the sculpture well): it rests facing the sculpture and occasionally strolls
// along the base. Never on nav, on buttons, over maths, or during timed work.
// A neutral silhouette until a premium asset exists; honours reduced-motion.

(function () {
  const EYE = '#15121b';

  function leg(cx, t) {
    return `M${cx - 4} ${t} C${cx - 5} ${t + 9} ${cx - 5} ${t + 18} ${cx - 2} ${t + 19} `
      + `C${cx} ${t + 20} ${cx + 2} ${t + 20} ${cx + 3} ${t + 19} `
      + `C${cx + 5} ${t + 18} ${cx + 4} ${t + 8} ${cx + 4} ${t} Z`;
  }

  // Long, low, arched mustelid profile facing right — filled with currentColor.
  function silhouette() {
    const body = `M8 40 C3 38 6 33 14 31 C28 27 40 22 52 19 C64 16 72 12 82 12 `
      + `C93 12 99 16 105 19 C109 21 111 20 114 18 C114 13 118 10 122 12 `
      + `C127 14 133 18 139 23 C140 24 140 26 138 27 C133 28 127 28 121 28 `
      + `C110 29 98 30 86 31 C72 32 56 33 42 34 C28 35 16 37 10 40 C9 40 8 40 8 40 Z`;
    const legs = [[104, 29], [96, 30], [60, 31], [52, 32]]
      .map(([x, t]) => `<path d="${leg(x, t)}" fill="currentColor"/>`).join('');
    return `<svg class="ferret-svg" viewBox="0 0 150 62" aria-hidden="true">`
      + `<path d="${body}" fill="currentColor"/>${legs}`
      + `<circle cx="129" cy="18" r="1.4" fill="${EYE}" opacity=".5"/></svg>`;
  }

  // Live only at the Home observatory base. Returns { destroy() }.
  function mountObservatory(container) {
    if (!container) return { destroy() {} };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = document.createElement('div');
    el.className = 'ferret-sil';
    el.innerHTML = `<div class="ferret-flip"><div class="ferret-inner">${silhouette()}</div></div>`;
    container.appendChild(el);

    let x = 0.15;                 // resting position (fraction of width)
    el.style.left = (x * 100) + '%';
    const faceCentre = () => el.classList.toggle('flip', x > 0.5);
    faceCentre();

    let timer = null;
    if (!reduced) {
      const stroll = () => {
        const nx = 0.10 + Math.random() * 0.64;
        el.classList.toggle('flip', nx < x);   // face the direction of travel
        x = nx;
        el.style.left = (x * 100) + '%';
        setTimeout(faceCentre, 6200);           // settle facing the sculpture
        timer = setTimeout(stroll, 32000 + Math.random() * 22000);
      };
      timer = setTimeout(stroll, 9000);
    }
    return { destroy() { if (timer) clearTimeout(timer); el.remove(); } };
  }

  // In a Hall, the ferret sits on the railing and watches you work — present,
  // never blocking the study surface.
  function mountRailing(container) {
    if (!container) return { destroy() {} };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = document.createElement('div');
    el.className = 'ferret-rail';
    el.innerHTML = `<div class="ferret-flip flip"><div class="ferret-inner">${silhouette()}</div></div>`;
    container.appendChild(el);
    // arrive with tiny footsteps a moment after you enter
    if (!reduced) { el.style.opacity = '0'; el.style.transform = 'translateX(-14px)';
      setTimeout(() => { el.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(.4,0,.2,1)'; el.style.opacity = ''; el.style.transform = ''; }, 1400); }
    return { destroy() { el.remove(); } };
  }

  // Behavioural API kept as no-ops: the ferret never appears during timed or
  // graded work, and is not a pop-up mascot. (Callers in drills stay harmless.)
  const Companion = {
    mountObservatory,
    mountRailing,
    silhouette,
    mount() {},
    ferret() { return ''; },
    setExpr() {}, say() {}, react() {}, celebrate() {},
  };
  window.Companion = Companion;
})();
