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

function choices(list) {
  return `<div class="jb-choices">${(list || []).map((c, k) => `<button class="jb-choice" data-guess="${k}">${richText(c)}</button>`).join('')}</div>`;
}

// An interactive figure the learner drives. When it fires onDiscover we don't
// hand over the answer — if the beat carries a prediction, we stop the learner
// and ask it first; only their commitment reveals what happened.
function figure(b) {
  return `<div class="jb-fig" data-figure="${escapeHtml(b.figure)}"></div>`
    + (b.predict ? `<div class="jb-predict" data-predict><p class="jb-p jb-predict-q">${richText(b.predict.body)}</p>${choices(b.predict.choices)}</div>` : '')
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
    case 'play': case 'observation': case 'failure': case 'transfer':
      inner = `${P(b.body)}${figure(b)}`;
      break;
    case 'application':
      inner = `${P(b.body)}${figure(b)}${ASIDE(b.aside)}`;
      break;
    case 'prediction':
      inner = `${P(b.body)}${choices(b.choices)}`
        + (b.reveal ? `<p class="jb-p jb-reveal" data-reveal>${richText(b.reveal)}</p>` : '');
      break;
    case 'invent':
      inner = `${P(b.body)}`
        + `<textarea class="jb-reflect-in jb-invent-in" data-reflect="${i}-invent" rows="2" placeholder="Your rule — even a rough guess…"></textarea>`
        + P(b.after);
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
    case 'reflection': {
      // Three levels, hardest last, with the drawing in the middle. Each is a
      // rung: explain it, picture it, then reason about its absence.
      const steps = (b.levels || []).map((lv, k) => {
        const tag = lv.tag ? `<span class="jb-level">${escapeHtml(lv.tag)}</span>` : '';
        if (lv.draw) return `<div class="jb-reflect-q">${tag}<span>${richText(lv.prompt)}</span><div class="jb-draw">${richText(lv.draw)}</div></div>`;
        return `<label class="jb-reflect-q">${tag}<span>${richText(lv.prompt)}</span>`
          + `<textarea class="jb-reflect-in" data-reflect="${i}-${k}" rows="2" placeholder="In your own words…"></textarea></label>`;
      }).join('');
      inner = `${P(b.body)}<div class="jb-reflect">${steps}</div>`;
      break;
    }
    case 'summary':
      inner = `${P(b.body)}`
        + (b.image ? `<figure class="jb-image"><blockquote>${richText(b.image)}</blockquote></figure>` : '')
        + (b.one_idea ? `<div class="jb-idea">${richText(b.one_idea)}</div>` : '')
        + P(b.after);
      break;
    default: // confusion, and any prose+maths beat
      inner = `${P(b.body)}${b.math ? plate(b.math, { label: b.label, caption: b.caption }) : ''}${P(b.after)}${ASIDE(b.aside)}`;
  }
  return `<section class="jb jb-${escapeHtml(b.type)}">${kick}<div class="jb-body">${inner}</div></section>`;
}

window.JourneyMode = {
  async render(root, sub) {
    if (!sub || !sub[0]) return this.renderLanding(root);
    const chapter = sub[0];
    if (sub[1] === 'walk') return this.renderJourney(root, chapter);      // the authored narrative
    if (sub[1] === 's' && sub[2] != null) return this.renderSection(root, chapter, sub[2]);
    return this.renderChapterPath(root, chapter);                         // the section spine
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
      Geography.chapterOrder(a.chapter) - Geography.chapterOrder(b.chapter));

    // Every chapter now opens its path of sections; a guided narrative, where it
    // exists, is a badge — not a separate destination.
    const row = (ch) => {
      const place = Geography.placeName(ch.chapter);
      const walk = walkable.has(ch.chapter);
      return `<a class="jn-row${walk ? ' walkable' : ''}" href="#/journey/${encodeURIComponent(ch.chapter)}">
        <span class="jn-mark${walk ? '' : ' quiet'}">${Icon(walk ? 'path' : 'concepts')}</span>
        <span class="jn-main"><span class="jn-title">${escapeHtml(place)}</span><span class="jn-sub">${escapeHtml(ch.title)}${walk ? ' · guided walk inside' : ''}</span></span>
        <span class="jn-chev">${Icon('forward')}</span></a>`;
    };

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">study</div>
        <div class="fg">
          <div class="kicker">Guided study</div>
          <div class="display">One section at a time</div>
          <div class="lede">Each chapter is a path of small sections. Walk one, practise only it, then step straight to the next — the reference and the mixed review are always a tap away, never in your path.</div>
        </div>
      </div>
      <div class="jn-list">${chapters.map(row).join('')}</div>
    `;
  },

  // ---- the Chapter Path: sections as a spine, with orientation and a gated
  //      review at the end -----------------------------------------------------
  async renderChapterPath(root, chapter) {
    const [microSkills, archetypes, attempts, index] = await Promise.all([
      DB.getAll('microSkills'), DB.getAll('archetypes'), DB.getAllAttempts(), journeyIndex(),
    ]);
    const inCh = microSkills.filter((m) => String(m.chapter) === String(chapter));
    if (!inCh.length) { root.innerHTML = `<div class="card">Not found. <a href="#/journey">All chapters</a></div>`; return; }
    const head = inCh[0];
    // Honesty (F46): a question is "held" only if its LATEST attempt was
    // correct — and not a lucky guess (a guessed-right answer is not mastery).
    // A section is steadied when fully attempted AND ≥80% held — never a
    // checkmark over rubble.
    const latest = {};
    attempts.forEach((a) => {
      const cur = latest[a.archetypeId];
      if (!cur || (a.timestamp || 0) > cur.t) latest[a.archetypeId] = { t: a.timestamp || 0, c: !!a.correct && a.confidence !== 'guess' };
    });
    const archBySection = {};
    archetypes.forEach((a) => {
      const ms = microSkills.find((m) => m.id === a.microSkillId);
      if (ms && String(ms.chapter) === String(chapter)) (archBySection[ms.section] = archBySection[ms.section] || []).push(a.id);
    });
    const secs = [...new Set(inCh.map((m) => m.section))]
      .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
      .map((section) => {
        const skills = inCh.filter((m) => m.section === section);
        const archIds = archBySection[section] || [];
        const tried = archIds.filter((id) => latest[id]).length;
        const held = archIds.filter((id) => latest[id] && latest[id].c).length;
        const state = (archIds.length && tried >= archIds.length && held >= Math.ceil(archIds.length * 0.8))
          ? 'done' : tried > 0 ? 'started' : 'new';
        return { section, name: skills[0].subtopic || skills[0].topic || ('Section ' + section), archCount: archIds.length, state, tried, held };
      });
    const doneCount = secs.filter((s) => s.state === 'done').length;
    const startedAny = secs.some((s) => s.state !== 'new');
    const allDone = doneCount === secs.length;
    const walkable = new Set((index.journeys || []).map((j) => String(j.chapter))).has(String(chapter));

    const seg = secs.map((s) => `<span class="cp-seg ${s.state}"></span>`).join('');
    const rows = secs.map((s, i) => `
      <a class="cp-row ${s.state}" href="#/journey/${chapter}/s/${encodeURIComponent(s.section)}">
        <span class="cp-badge">${s.state === 'done' ? Icon('check') : escapeHtml(s.section)}</span>
        <span class="cp-main"><span class="cp-title">${escapeHtml(s.name)}</span><span class="cp-sub">Section ${i + 1} of ${secs.length} · ${s.archCount} question${s.archCount === 1 ? '' : 's'}${s.tried ? ` · ${s.held} of ${s.archCount} held` : ''}</span></span>
        <span class="jn-chev">${Icon('forward')}</span></a>`).join('');

    const review = startedAny
      ? `<a class="cp-review ${allDone ? 'ready' : ''}" href="#/drill/ch/${chapter}">
           <span class="cp-badge">${Icon('dice')}</span>
           <span class="cp-main"><span class="cp-title">Chapter Review</span><span class="cp-sub">${allDone ? 'Everything mixed — the real test' : 'Every section so far, mixed together'}</span></span>
           <span class="jn-chev">${Icon('forward')}</span></a>`
      : `<div class="cp-review locked">
           <span class="cp-badge">${Icon('dice')}</span>
           <span class="cp-main"><span class="cp-title">Chapter Review</span><span class="cp-sub">Practice a section first — then everything mixes here</span></span></div>`;

    root.innerHTML = `
      <a class="crumb" href="#/journey">${Icon('back')} All chapters</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml(String(chapter))}</div>
        <div class="fg">
          <div class="kicker">${escapeHtml(head.chapterTitle)}</div>
          <div class="display">${escapeHtml(Geography.placeName(chapter))}</div>
        </div>
      </div>
      <div class="cp-orient"><div class="cp-prog">${seg}</div><div class="cp-orient-lbl">${doneCount} of ${secs.length} sections steadied</div></div>
      ${walkable ? `<a class="cp-walk" href="#/journey/${chapter}/walk">${Icon('path')}<span><strong>Walk the guided journey</strong><span>Discover the whole idea, start to finish</span></span>${Icon('forward')}</a>` : ''}
      <div class="cp-list">${rows}</div>
      ${review}
    `;
  },

  // ---- a Section Unit: reference for one idea, then the next sensible move ----
  async renderSection(root, chapter, section) {
    const [microSkills, archetypes, attempts] = await Promise.all([
      DB.getAll('microSkills'), DB.getAll('archetypes'), DB.getAllAttempts(),
    ]);
    const inCh = microSkills.filter((m) => String(m.chapter) === String(chapter));
    const skills = inCh.filter((m) => String(m.section) === String(section));
    if (!skills.length) { root.innerHTML = `<div class="card">Not found. <a href="#/journey/${chapter}">Back</a></div>`; return; }
    const secList = [...new Set(inCh.map((m) => m.section))]
      .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
    const i = secList.indexOf(String(section));
    const head = inCh[0];
    const chapterKey = `${head.course}|${head.chapter}|${head.chapterTitle}`;
    const name = skills[0].subtopic || skills[0].topic || ('Section ' + section);
    const nextSec = i < secList.length - 1 ? secList[i + 1] : null;
    const prevSec = i > 0 ? secList[i - 1] : null;
    const nameOf = (s) => { const m = inCh.find((x) => String(x.section) === String(s)); return m ? (m.subtopic || m.topic || ('Section ' + s)) : s; };
    const skillIds = new Set(skills.map((s) => s.id));
    const archCount = archetypes.filter((a) => skillIds.has(a.microSkillId)).length;
    const arch = await DB.getAll('archetypes');
    const cueBySkill = {};
    arch.forEach((a) => { if (skillIds.has(a.microSkillId) && a.recognitionCue && !cueBySkill[a.microSkillId]) cueBySkill[a.microSkillId] = a.recognitionCue; });

    const seg = secList.map((s, k) => `<span class="cp-seg ${k === i ? 'now' : ''}"></span>`).join('');
    const refRows = skills.map((s) => `
      <a class="su-idea" href="#/concepts/skill/${encodeURIComponent(s.id)}">
        <span class="su-idea-main"><span class="su-idea-t">${escapeHtml(s.microSkill)}</span>${cueBySkill[s.id] ? `<span class="su-idea-cue"><em>Spot it:</em> ${MathRender.inline(cueBySkill[s.id])}</span>` : ''}</span>
        <span class="jn-chev">${Icon('chevron')}</span></a>`).join('');

    const nextBtn = nextSec
      ? `<a class="rc-go" href="#/journey/${chapter}/s/${encodeURIComponent(nextSec)}">Next · ${escapeHtml(nextSec)} ${escapeHtml(nameOf(nextSec))}&nbsp; ${Icon('forward')}</a>`
      : `<a class="rc-go" href="#/drill/ch/${chapter}">${Icon('dice')}&nbsp; Chapter Review — everything mixed</a>`;

    root.innerHTML = `
      <a class="crumb" href="#/journey/${chapter}">${Icon('back')} ${escapeHtml(Geography.placeName(chapter))}</a>
      <div class="cp-orient"><div class="cp-prog">${seg}</div><div class="cp-orient-lbl">Section ${i + 1} of ${secList.length}</div></div>
      <div class="editorial" style="padding-top:2px;">
        <div class="fg">
          <div class="kicker">${escapeHtml(head.chapterTitle)} · ${escapeHtml(String(section))}</div>
          <div class="display">${escapeHtml(name)}</div>
        </div>
      </div>
      <div class="section-title">In this section</div>
      <div class="su-ideas">${refRows}</div>
      <div class="su-next">
        <div class="kicker" style="margin-bottom:10px;">What next?</div>
        <a class="rc-go su-primary" href="#/drill/s/${chapter}/${encodeURIComponent(section)}">${Icon('drill')}&nbsp; Practice this section · ${archCount} question${archCount === 1 ? '' : 's'}</a>
        ${nextBtn}
        <div class="su-more">
          <a href="#/concepts/ch/${encodeURIComponent(chapterKey)}">${Icon('concepts')} Full reference</a>
          ${prevSec ? `<a href="#/journey/${chapter}/s/${encodeURIComponent(prevSec)}">${Icon('back')} ${escapeHtml(prevSec)} ${escapeHtml(nameOf(prevSec))}</a>` : ''}
        </div>
      </div>
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
      <a class="crumb" href="#/journey/${data.chapter}">${Icon('back')} ${escapeHtml(Geography.placeName(data.chapter))}</a>
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
            <a class="rc-go" href="#/journey/${data.chapter}">${Icon('path')}&nbsp; Study it section by section</a>
            <a class="jn-secondary" href="#/concepts/ch/${encodeURIComponent(refKey)}">${Icon('concepts')}&nbsp; Open the reference</a>
          </div>
        </footer>
      </div>
    `;

    // Mount the interactive figures. Reaching the key state does not hand over
    // the answer: if the beat carries a prediction, discovery surfaces the
    // question first; only the learner's commitment reveals what happened.
    window.__journeyFigs = [];
    root.querySelectorAll('.jb-fig[data-figure]').forEach((el) => {
      const kind = el.getAttribute('data-figure');
      if (!(window.JourneyFigures && JourneyFigures.has(kind))) return;
      const section = el.closest('.jb');
      const onDiscover = () => {
        const predict = section && section.querySelector('[data-predict]');
        if (predict && !predict.classList.contains('shown')) { predict.classList.add('shown'); return; }
        const r = section && section.querySelector('[data-reveal]');
        if (r) r.classList.add('shown');
      };
      try { window.__journeyFigs.push(JourneyFigures.mount(el, kind, { onDiscover })); } catch (e) {}
    });

    // Any prediction — standalone or inside a figure — reveals its truth once the
    // learner commits. A prediction has no wrong answer; committing is the point.
    root.querySelectorAll('.jb-choice').forEach((btn) => {
      const holder = btn.closest('[data-predict]') || btn.closest('.jb');
      const section = btn.closest('.jb');
      btn.addEventListener('click', () => {
        (holder ? holder.querySelectorAll('.jb-choice') : []).forEach((b) => b.classList.remove('chosen'));
        btn.classList.add('chosen');
        if (section) section.classList.add('answered');
        const reveal = section && section.querySelector('[data-reveal]');
        if (reveal) reveal.classList.add('shown');
      });
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
