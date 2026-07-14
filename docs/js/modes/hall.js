// The Hall of Accumulation — you study inside the place, and the place breathes.
//
// The 3D hall is a CLIENT of the Observatory simulation: it renders
// Observatory.hallState(5), it never computes it. The hall moves through three
// attention modes (see PHILOSOPHY.md):
//   Arrival    — the object dominates; wonder; no maths yet (~2.4s).
//   Study      — the object retreats; the mathematics is the hero.
//   Reflection — the object returns, CHANGED to reflect the session's growth.
//
// State is read at entry (stable through the session) and again at session end
// to reveal what was earned — settle between sessions, per the Law of Permanence.
// Falls back to the plain drill without WebGL.

window.HallMode = {
  async render(root) {
    const canRender = window.HallRenderer && window.World && World.available();
    if (!canRender) return window.RecognitionMode.render(root);

    if (window.__world) { window.__world.destroy(); window.__world = null; }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const entry = await Observatory.hallState(5);

    document.body.classList.add('world-active', 'in-hall');   // menus recede inside a place
    const bg = document.createElement('div');
    bg.id = 'hall-bg';
    document.body.insertBefore(bg, document.body.firstChild);
    const renderer = HallRenderer.mount(bg, entry);
    renderer.focus('arrival');
    window.__world = { destroy() { try { renderer.destroy(); } catch (e) {} bg.remove(); document.body.classList.remove('world-active', 'in-hall'); } };

    root.innerHTML = `
      <div class="hall mode-arrival" id="hall">
        <div class="hall-head">
          <a class="hall-exit" href="#/home">${Icon('back')} Observatory</a>
          <div class="kicker hall-name">The Hall of Accumulation</div>
        </div>
        <div class="hall-study" id="hall-study"></div>
      </div>
    `;
    if (window.Companion) window.__ferret = Companion.mountRailing(root.querySelector('.hall'));
    const hall = document.getElementById('hall');

    const enterStudy = () => {
      hall.classList.remove('mode-arrival');
      hall.classList.add('mode-study');
      renderer.focus('study');
      window.RecognitionMode.render(document.getElementById('hall-study'), {
        onComplete: async () => {                       // Reflection: the room returns, changed
          const after = await Observatory.hallState(5);
          if (after) renderer.update(after);
          renderer.focus('reflection');
          hall.classList.remove('mode-study');
          hall.classList.add('mode-reflect');
        },
      });
    };
    if (reduced) enterStudy(); else setTimeout(enterStudy, 2400);
  },
};
