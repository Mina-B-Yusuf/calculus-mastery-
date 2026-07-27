// Mathematical Scrolls — the fourth format.
//
// A Journey teaches an idea. A Reference stores it. A Drill hardens it. A
// Scroll does none of those: in two or three minutes it answers the question
// that makes the other three worth opening — *why did anyone ever care?* It
// exists for the moment a learner is about to close the app, and remembers
// instead that mathematics is interesting.
//
// The pacing is borrowed honestly from serial feeds: one card, one complete
// thought, scroll for the next. What is NOT borrowed is the emptiness — every
// card carries an idea, and the last three are always the same three:
// one idea you should never forget · try it yourself · continue.

let SC_INDEX = null;

async function scrollIndex() {
  if (SC_INDEX) return SC_INDEX;
  try { SC_INDEX = await DataLoader.fetchJSON('data/scrolls/index.json'); }
  catch (e) { SC_INDEX = { scrolls: [] }; }
  return SC_INDEX;
}
window.scrollIndex = scrollIndex;

// Authored line breaks are pacing, not accident — a beat may be three lines.
function lines(s) {
  return String(s || '').split('\n').map((l) => richText(l)).join('<br>');
}

function scrollCard(c) {
  switch (c.type) {
    // The opening is not a hook — it is the central MYSTERY. The reader keeps
    // scrolling because they want it resolved, so it must be a real question
    // with a real answer at the end, never a teaser.
    case 'mystery':
    case 'hook':
      return `<section class="sc-card sc-hook"><h1>${lines(c.text)}</h1></section>`;
    case 'figure':
      return `<section class="sc-card sc-fig">
        <div class="jb-fig" data-figure="${escapeHtml(c.figure)}"></div>
        ${c.caption ? `<p class="sc-cap">${lines(c.caption)}</p>` : ''}</section>`;
    case 'math':
      return `<section class="sc-card sc-math">
        <figure class="jb-plate">${MathRender.block(c.tex)}</figure>
        ${c.caption ? `<p class="sc-p">${lines(c.caption)}</p>` : ''}</section>`;
    case 'turn':
      return `<section class="sc-card sc-turn"><p class="sc-p">${lines(c.text)}</p>${c.text2 ? `<p class="sc-p">${lines(c.text2)}</p>` : ''}</section>`;
    case 'story':
      return `<section class="sc-card sc-story">
        ${c.who ? `<div class="sc-who">${escapeHtml(c.who)}</div>` : ''}
        <p class="sc-p">${lines(c.text)}</p></section>`;
    // If the reader forgets every equation, they should still keep the picture.
    case 'picture':
    case 'never_forget':
      return `<section class="sc-card sc-never">
        <div class="sc-never-lbl">The mathematician's picture</div>
        <blockquote>${lines(c.text)}</blockquote></section>`;
    case 'try':
      return `<section class="sc-card sc-try">
        <div class="sc-try-lbl">Try it yourself</div>
        <p class="sc-p">${lines(c.text)}</p>
        ${c.link ? `<a class="rc-go" href="${escapeHtml(c.link.href)}">${escapeHtml(c.link.label)}</a>` : ''}</section>`;
    default:
      return `<section class="sc-card"><p class="sc-p">${lines(c.text)}</p></section>`;
  }
}

window.ScrollMode = {
  async render(root, sub) {
    const index = await scrollIndex();
    const id = sub && sub[0];
    const entry = (index.scrolls || []).find((s) => s.id === id);
    if (!entry) {
      root.innerHTML = `<div class="card"><h2>No such scroll</h2><p class="small">This story hasn't been written yet. <a href="#/journey">Back to study.</a></p></div>`;
      return;
    }
    let data;
    try { data = await DataLoader.fetchJSON(`data/scrolls/${entry.file}`); }
    catch (e) { root.innerHTML = `<div class="card">Couldn't load this scroll. <a href="#/journey">Back</a></div>`; return; }

    const cont = data.section
      ? `<a class="sc-cont" href="#/journey/${data.chapter}/s/${encodeURIComponent(data.section)}">Continue${Icon('forward')}</a>`
      : `<a class="sc-cont" href="#/journey/${data.chapter}">Continue${Icon('forward')}</a>`;

    const micro = data.kind === 'micro';
    root.innerHTML = `
      <div class="scroll${micro ? ' scroll-micro' : ''}">
        <a class="crumb sc-exit" href="#/journey/${data.chapter}">${Icon('back')} ${escapeHtml(data.hall || 'Back')}</a>
        <div class="sc-meta">${micro ? 'A one-minute intuition' : escapeHtml(data.hall || '')} · ${data.minutes || 3} min</div>
        ${(data.cards || []).map(scrollCard).join('')}
        <section class="sc-card sc-end">${cont}</section>
      </div>`;

    // The one interactive figure, mounted the same way a Journey mounts one.
    window.__journeyFigs = window.__journeyFigs || [];
    root.querySelectorAll('.jb-fig[data-figure]').forEach((el) => {
      const kind = el.getAttribute('data-figure');
      if (window.JourneyFigures && JourneyFigures.has(kind)) {
        try { window.__journeyFigs.push(JourneyFigures.mount(el, kind, {})); } catch (e) {}
      }
    });

    // Each card arrives as it is reached — the serial rhythm, not decoration.
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = [...root.querySelectorAll('.sc-card')];
    if (reduced || !('IntersectionObserver' in window)) cards.forEach((c) => c.classList.add('in'));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
      cards.forEach((c) => io.observe(c));
    }
  },
};
