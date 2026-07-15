// The Journey — where understanding is born. A chapter is not a list of
// definitions; it is a single idea coming into focus. This mode walks the
// learner through that idea as a narrative corridor: one question, an image, an
// experiment, the pattern, and only then the definition — the way a lecture
// teaches, before the textbook is ever opened. Concepts is the textbook; this
// is the lecture.
//
// A journey is authored content (data/journeys/*.json), never computed here.
// The renderer reuses the observatory's own visuals (Sculptures) and never
// invents state.

let JN_INDEX = null;

async function journeyIndex() {
  if (JN_INDEX) return JN_INDEX;
  try { JN_INDEX = await DataLoader.fetchJSON('data/journeys/index.json'); }
  catch (e) { JN_INDEX = { journeys: [] }; }
  return JN_INDEX;
}

// Forced inline math: these spans are known to be mathematics, so typeset them
// directly rather than leaning on the prose heuristic (which leaves lone
// variables like x and h as plain text).
function jmath(s) {
  try {
    return window.katex.renderToString(MathRender.toLatex(s), { throwOnError: false, displayMode: false, strict: false });
  } catch (e) { return '<span class="math-fallback">' + MathRender.escapeText(s) + '</span>'; }
}

// Curator's prose: $…$ becomes inline mathematics, *…* becomes emphasis, and
// everything else is escaped. No maths is ever left as plain text.
function richText(s) {
  s = String(s || '');
  let out = '', i = 0, m;
  const re = /\$([^$]+)\$|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  while ((m = re.exec(s))) {
    out += MathRender.escapeText(s.slice(i, m.index));
    if (m[1] != null) out += jmath(m[1]);
    else if (m[2] != null) out += '<strong>' + MathRender.escapeText(m[2]) + '</strong>';
    else out += '<em>' + MathRender.escapeText(m[3]) + '</em>';
    i = m.index + m[0].length;
  }
  out += MathRender.escapeText(s.slice(i));
  return out;
}

const P = (s) => s ? `<p class="jb-p">${richText(s)}</p>` : '';
const ASIDE = (s) => s ? `<p class="jb-aside">${richText(s)}</p>` : '';

// An equation, presented like a plate in an art book: centred, framed by air,
// optionally numbered and captioned.
function plate(math, opts) {
  if (!math) return '';
  opts = opts || {};
  return `<figure class="jb-plate">${MathRender.block(math)}`
    + (opts.label ? `<figcaption class="jb-plate-num">${richText(opts.label)}</figcaption>` : '')
    + (opts.caption ? `<figcaption class="jb-plate-cap">${richText(opts.caption)}</figcaption>` : '')
    + `</figure>`;
}

// An interactive figure the learner drives; its content is discovered, so a
// hidden line can be revealed only once the figure fires onDiscover.
function figure(b) {
  return `<div class="jb-fig" data-figure="${escapeHtml(b.figure)}"></div>`
    + (b.reveal ? `<p class="jb-p jb-reveal" data-reveal>${richText(b.reveal)}</p>` : '');
}

function renderBeat(b, i) {
  const kick = b.kicker ? `<div class="jb-kick">${escapeHtml(b.kicker)}</div>` : '';
  let inner = '';
  switch (b.type) {
    case 'arrival':
      inner = `${b.title ? `<h2 class="jb-title">${richText(b.title)}</h2>` : ''}${P(b.body)}`;
      break;
    case 'question':
      inner = `<div class="jb-question">${richText(b.body)}</div>${ASIDE(b.aside)}`;
      break;
    case 'play': case 'observation': case 'failure':
      inner = `${P(b.body)}${figure(b)}`;
      break;
    case 'application':
      inner = `${P(b.body)}${figure(b)}${ASIDE(b.aside)}`;
      break;
    case 'prediction':
      inner = `${P(b.body)}`
        + `<div class="jb-choices">${(b.choices || []).map((c, k) => `<button class="jb-choice" data-guess="${k}">${richText(c)}</button>`).join('')}</div>`
        + (b.reveal ? `<p class="jb-p jb-reveal" data-reveal>${richText(b.reveal)}</p>` : '');
      break;
    case 'insight':
      inner = `${P(b.body)}${(b.words || []).length ? `<div class="jb-words">${b.words.map((w) => `<span class="jb-word">${escapeHtml(w)}</span>`).join('')}</div>` : ''}${P(b.after)}`;
      break;
    case 'definition':
      inner = `${P(b.body)}${plate(b.math, { label: b.label, caption: b.caption })}${P(b.after)}`;
      break;
    case 'proof':
      inner = `${P(b.body)}`
        + (b.steps && b.steps.length ? `<ol class="mono-steps jb-steps">${b.steps.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>` : '')
        + plate(b.math, { label: b.label })
        + P(b.after);
      break;
    case 'reflection':
      inner = `${P(b.body)}`
        + `<div class="jb-reflect">${(b.prompts || []).map((pr, k) => `
            <label class="jb-reflect-q"><span>${richText(pr)}</span>
            <textarea class="jb-reflect-in" data-reflect="${i}-${k}" rows="2" placeholder="In your own words…"></textarea></label>`).join('')}`
        + (b.draw ? `<div class="jb-draw">${richText(b.draw)}</div>` : '')
        + `</div>`;
      break;
    case 'summary':
      inner = `${P(b.body)}${b.one_idea ? `<div class="jb-idea">${richText(b.one_idea)}</div>` : ''}${P(b.after)}`;
      break;
    default: // confusion, and any prose+maths beat
      inner = `${P(b.body)}${b.math ? plate(b.math, { label: b.label, caption: b.caption }) : ''}${P(b.after)}${ASIDE(b.aside)}`;
  }
  return `<section class="jb jb-${escapeHtml(b.type)}">${kick}<div class="jb-body">${inner}</div></section>`;
}

window.JourneyMode = {
  async render(root, sub) {
    if (sub && sub[0]) return this.renderJourney(root, decodeURIComponent(sub[0]));
    return this.renderLanding(root);
  },

  async renderLanding(root) {
    const [index, microSkills] = await Promise.all([journeyIndex(), DB.getAll('microSkills')]);
    const walkable = new Set((index.journeys || []).map((j) => String(j.chapter)));
    const seen = new Map();
    microSkills.forEach((ms) => {
      const c = String(ms.chapter);
      if (!seen.has(c)) seen.set(c, { chapter: c, course: ms.course, title: ms.chapterTitle });
    });
    const chapters = [...seen.values()].sort((a, b) =>
      (a.course || '').localeCompare(b.course || '') ||
      a.chapter.localeCompare(b.chapter, undefined, { numeric: true }));

    const row = (ch) => {
      const place = Geography.placeName(ch.chapter);
      if (walkable.has(ch.chapter)) {
        return `<a class="jn-row walkable" href="#/journey/${encodeURIComponent(ch.chapter)}">
          <span class="jn-mark">${Icon('path')}</span>
          <span class="jn-main"><span class="jn-title">${escapeHtml(place)}</span><span class="jn-sub">${escapeHtml(ch.title)} · a guided walk</span></span>
          <span class="jn-chev">${Icon('forward')}</span></a>`;
      }
      const key = `${ch.course}|${ch.chapter}|${ch.title}`;
      return `<a class="jn-row" href="#/concepts/ch/${encodeURIComponent(key)}">
        <span class="jn-mark quiet">${Icon('concepts')}</span>
        <span class="jn-main"><span class="jn-title">${escapeHtml(place)}</span><span class="jn-sub">${escapeHtml(ch.title)} · reference only, for now</span></span>
        <span class="jn-chev">${Icon('chevron')}</span></a>`;
    };

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">journey</div>
        <div class="fg">
          <div class="kicker">Guided study</div>
          <div class="display">Walk the idea</div>
          <div class="lede">Before the definitions, the story. Each chapter is one idea coming into focus — a question, an image, an experiment, and only then the mathematics. Walk it once; afterwards the Concepts pages are your reference.</div>
        </div>
      </div>
      <div class="jn-list">${chapters.map(row).join('')}</div>
    `;
  },

  async renderJourney(root, chapter) {
    const index = await journeyIndex();
    const entry = (index.journeys || []).find((j) => String(j.chapter) === String(chapter));
    if (!entry) {
      root.innerHTML = `<div class="card"><h2>This path isn't laid yet</h2><p class="small">This chapter is reference-only for now. <a href="#/concepts">Open the Concepts reference.</a></p></div>`;
      return;
    }
    let data;
    try { data = await DataLoader.fetchJSON(`data/journeys/${entry.file}`); }
    catch (e) { root.innerHTML = `<div class="card">Couldn't load this journey. <a href="#/journey">Back</a></div>`; return; }

    const refKey = `${data.course}|${data.chapter}|${data.chapter_title}`;
    root.innerHTML = `
      <a class="crumb" href="#/journey">${Icon('back')} All journeys</a>
      <div class="journey">
        <header class="jn-open">
          <div class="kicker">${escapeHtml(data.hall)} · ${escapeHtml(data.duration || 'a short walk')}</div>
          <h1 class="jn-open-title">${escapeHtml(data.chapter_title)}</h1>
          <p class="jn-open-idea">${richText(data.one_idea)}</p>
          <div class="jn-open-hint">${Icon('down')} Scroll to walk</div>
        </header>
        <div class="jcorridor">
          ${(data.beats || []).map((b, i) => renderBeat(b, i)).join('')}
        </div>
        <footer class="jn-close">
          <div class="kicker">You've walked the idea</div>
          <p class="jb-p">Now the reference becomes useful — not as a lesson, but as the shelf you reach for when a detail slips.</p>
          <div class="jn-close-actions">
            <a class="rc-go" href="#/concepts/ch/${encodeURIComponent(refKey)}">${Icon('concepts')}&nbsp; Open the reference</a>
            <a class="jn-secondary" href="#/drill">${Icon('drill')}&nbsp; Take it to the drills</a>
          </div>
        </footer>
      </div>
    `;

    // Mount the interactive figures. Each reveals its sibling discovery line the
    // first time the learner reaches the key state — the word after the doing.
    window.__journeyFigs = [];
    root.querySelectorAll('.jb-fig[data-figure]').forEach((el) => {
      const kind = el.getAttribute('data-figure');
      if (!(window.JourneyFigures && JourneyFigures.has(kind))) return;
      const section = el.closest('.jb');
      const onDiscover = () => {
        const r = section && section.querySelector('[data-reveal]');
        if (r) r.classList.add('shown');
      };
      try { window.__journeyFigs.push(JourneyFigures.mount(el, kind, { onDiscover })); } catch (e) {}
    });

    // Predictions: any commitment reveals the truth (a prediction has no wrong).
    root.querySelectorAll('.jb-prediction').forEach((section) => {
      const reveal = section.querySelector('[data-reveal]');
      section.querySelectorAll('.jb-choice').forEach((btn) => btn.addEventListener('click', () => {
        section.querySelectorAll('.jb-choice').forEach((b) => b.classList.remove('chosen'));
        btn.classList.add('chosen');
        section.classList.add('answered');
        if (reveal) reveal.classList.add('shown');
      }));
    });

    // Reflection: kept only for the learner, persisted locally so it survives to
    // exam night. Restore any prior answers.
    root.querySelectorAll('.jb-reflect-in').forEach((ta) => {
      const key = `reflect:${data.chapter}:${ta.getAttribute('data-reflect')}`;
      ta.value = localStorage.getItem(key) || '';
      ta.addEventListener('input', () => localStorage.setItem(key, ta.value));
    });

    // Reveal each station as it enters view — the corridor lights ahead of you.
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const beats = [...root.querySelectorAll('.jb')];
    if (reduced || !('IntersectionObserver' in window)) {
      beats.forEach((b) => b.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      beats.forEach((b) => io.observe(b));
    }
  },
};
