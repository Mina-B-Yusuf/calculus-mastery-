// Concepts / Learn section — study each idea with color-coded blocks, plus a
// mind-map view of each chapter. Built from the taxonomy already in IndexedDB.

let CS_SKILLS = null;
let CS_ARCH = null;

async function ensureData() {
  if (CS_SKILLS) return;
  CS_SKILLS = await DB.getAll('microSkills');
  const arch = await DB.getAll('archetypes');
  CS_ARCH = {};
  arch.forEach((a) => (CS_ARCH[a.microSkillId] = CS_ARCH[a.microSkillId] || []).push(a));
}

function chapterKey(ms) { return `${ms.course}|${ms.chapter}|${ms.chapterTitle}`; }
const TOPIC_HUES = ['var(--thm)', 'var(--fml)', 'var(--def)', 'var(--ex)', 'var(--gist)', 'var(--trap)', 'var(--brand)'];

// Publication rule: a pure expression becomes its own centred display equation
// (it dominates); mixed prose+maths is typeset inline. No maths is ever left as
// plain text. Heuristic: a string with ≤2 long English words is an equation.
function isEquation(s) {
  const words = (String(s).match(/[A-Za-z]{4,}/g) || [])
    .filter((w) => !/^(sqrt|arcsin|arccos|arctan|sinh|cosh|tanh|frac|infty|lim|max|min|sec|csc|cot|log|exp|Delta|delta|theta|alpha|beta|gamma|lambda|sigma|omega|epsilon|pi)$/i.test(w));
  return String(s).length > 0 && words.length <= 2;
}
function eqOrProse(s) {
  return isEquation(s) ? MathRender.block(s) : `<p class="mono-p">${MathRender.inline(s)}</p>`;
}
// A worked-example prompt usually opens with an imperative ("Differentiate
// y = …"). Keep the instruction as upright prose and promote the expression to
// its own display equation, so the verb never gets italicised into the maths.
function renderPrompt(s) {
  const m = String(s).match(/^\s*(Differentiate|Integrate|Evaluate|Compute|Calculate|Find|Determine|Solve|Simplify|Sketch|Express|Verify|Show(?: that)?|Prove|State)\b[:.]?\s+(.*)$/i);
  if (m && m[2] && /[=^_/\\]|\\frac|\bx\b/.test(m[2])) {
    return `<p class="mono-p mono-prompt">${escapeHtml(m[1])}</p>${MathRender.block(m[2])}`;
  }
  return eqOrProse(s);
}

window.ConceptsMode = {
  async render(root, sub) {
    await ensureData();
    if (sub && sub[0] === 'ch') return this.renderChapter(root, decodeURIComponent(sub[1]), sub[2]);
    if (sub && sub[0] === 'skill') return this.renderSkill(root, decodeURIComponent(sub[1]));

    const byChapter = {};
    CS_SKILLS.forEach((ms) => {
      const k = chapterKey(ms);
      byChapter[k] = byChapter[k] || { ms, count: 0 };
      byChapter[k].count += 1;
    });
    const entries = Object.entries(byChapter).sort((a, b) =>
      (a[1].ms.course || '').localeCompare(b[1].ms.course || '') ||
      Geography.chapterOrder(a[1].ms.chapter) - Geography.chapterOrder(b[1].ms.chapter));
    const groups = {};
    entries.forEach(([k, v]) => {
      const place = Geography.placeName(v.ms.chapter);
      const row = `<a class="cx-row" href="#/concepts/ch/${encodeURIComponent(k)}">
        <span class="cx-num">${escapeHtml(String(v.ms.chapter))}</span>
        <span class="cx-main"><span class="cx-title">${escapeHtml(place)}</span><span class="cx-sub">${escapeHtml(v.ms.chapterTitle)} · ${v.count} concepts</span></span>
        <span class="cx-chev">${Icon('chevron')}</span></a>`;
      (groups[v.ms.course] = groups[v.ms.course] || []).push(row);
    });

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">learn</div>
        <div class="fg">
          <div class="kicker">Concepts</div>
          <div class="display">Learn it properly</div>
          <div class="lede">Every idea as colour-coded blocks — the gist, definition, theorems, formulas, a worked example, and the traps. Enter a place to see its map.</div>
        </div>
      </div>
      <div class="kicker" style="margin:26px 2px 4px;">Calculus 1</div>
      <div class="cx-list">${(groups['calculus-1'] || []).join('')}</div>
      <div class="kicker" style="margin:28px 2px 4px;">Calculus 2</div>
      <div class="cx-list">${(groups['calculus-2'] || []).join('')}</div>
    `;
  },

  async renderChapter(root, key, view) {
    const skills = CS_SKILLS.filter((ms) => chapterKey(ms) === key)
      .sort((a, b) => String(a.section).localeCompare(String(b.section), undefined, { numeric: true }));
    if (!skills.length) { root.innerHTML = '<div class="card">Not found. <a href="#/concepts">Back</a></div>'; return; }
    const head = skills[0];
    const bySub = {};
    skills.forEach((ms) => (bySub[ms.subtopic || ms.topic || 'General'] = bySub[ms.subtopic || ms.topic || 'General'] || []).push(ms));
    const isList = view === 'list';

    let bodyHtml;
    if (isList) {
      bodyHtml = Object.entries(bySub).map(([sub, list]) => `
        <div class="section-title">${escapeHtml(sub)}</div>
        ${list.map((ms) => `<a class="card" href="#/concepts/skill/${encodeURIComponent(ms.id)}">
          <div class="flex-between"><strong>${escapeHtml(ms.microSkill)}</strong><span class="pill">${escapeHtml(ms.section)}</span></div></a>`).join('')}
      `).join('');
    } else {
      const branches = Object.entries(bySub).map(([sub, list], i) => {
        const hue = TOPIC_HUES[i % TOPIC_HUES.length];
        const leaves = list.map((ms) => `
          <a class="mm-leaf" style="--tc:${hue}" href="#/concepts/skill/${encodeURIComponent(ms.id)}">
            <span>${escapeHtml(ms.microSkill)}</span>
            <span class="leaf-sec">${escapeHtml(ms.section)}</span>
            <span class="leaf-chevron">${Icon('chevron')}</span>
          </a>`).join('');
        return `<div class="mm-branch">
          <div class="mm-topic" style="--tc:${hue}"><span class="dot"></span>${escapeHtml(sub)}</div>
          <div class="mm-leaves">${leaves}</div>
        </div>`;
      }).join('');
      bodyHtml = `<div class="mindmap"><div class="mm-root">${Icon('map')} Ch. ${escapeHtml(String(head.chapter))} · ${escapeHtml(head.chapterTitle)}</div>${branches}</div>`;
    }

    root.innerHTML = `
      <a class="crumb" href="#/concepts">${Icon('back')} All chapters</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml(String(head.chapter))}</div>
        <div class="fg">
          <div class="kicker">${escapeHtml(head.chapterTitle)} · ${skills.length} concepts</div>
          <div class="display">${escapeHtml(Geography.placeName(head.chapter))}</div>
        </div>
      </div>
      <div class="ch-sculpt"><div class="ch-canvas" id="ch-hero"></div><div class="ch-vignette"></div></div>
      <div class="seg ch-seg">
        <button data-view="map" class="${isList ? '' : 'on'}">${Icon('map')} Map</button>
        <button data-view="list" class="${isList ? 'on' : ''}">${Icon('notebook')} List</button>
      </div>
      ${bodyHtml}
    `;
    const heroEl = document.getElementById('ch-hero');
    if (heroEl && window.Sculptures) {
      window.__sculpture = Sculptures.mount(heroEl, { kind: Sculptures.kindForChapter(head.chapter) });
    }
    root.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
      location.hash = `#/concepts/ch/${encodeURIComponent(key)}/${b.dataset.view}`;
    }));
  },

  async renderSkill(root, id) {
    const ms = CS_SKILLS.find((s) => s.id === id);
    if (!ms) { root.innerHTML = '<div class="card">Not found. <a href="#/concepts">Back</a></div>'; return; }
    const arch = (CS_ARCH[id] || []);

    // A monograph, not a stack of equal cards: a titled section with its own
    // accent, the equations dominating as centred display objects.
    const sec = (label, cls, inner) => inner
      ? `<section class="mono-sec"><h3 class="mono-h ${cls}">${escapeHtml(label)}</h3>${inner}</section>` : '';

    let html = `
      <a class="crumb" href="#/concepts/ch/${encodeURIComponent(chapterKey(ms))}">${Icon('back')} ${escapeHtml(Geography.placeName(ms.chapter))}</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml(ms.section)}</div>
        <div class="fg">
          <div class="kicker">${escapeHtml(ms.topic || '')}${ms.subtopic ? ' · ' + escapeHtml(ms.subtopic) : ''}</div>
          <div class="display">${escapeHtml(ms.microSkill)}</div>
        </div>
      </div>`;

    // Definition — the equation is the hero
    if ((ms.definitions || []).length) {
      html += sec('Definition', 'def', ms.definitions.map(eqOrProse).join(''));
    }

    // Theorem(s)
    if ((ms.theorems || []).length) {
      const inner = ms.theorems.map((t) => `
        ${t.name ? `<div class="mono-thm-name">${escapeHtml(t.name)}</div>` : ''}
        ${eqOrProse(t.statement || '')}
        ${(t.conditions && t.conditions.length) ? `<p class="mono-cond">Provided ${t.conditions.map((c) => MathRender.inline(c)).join(', ')}.</p>` : ''}
      `).join('<div class="mono-rule"></div>');
      html += sec(ms.theorems.length > 1 ? 'Theorems' : 'Theorem', 'thm', inner);
    }

    // Key formulas
    if ((ms.formulas || []).length) {
      html += sec('Key formulas', 'fml', ms.formulas.map(eqOrProse).join(''));
    }

    // Common mistakes
    const traps = []; const seen = new Set();
    arch.forEach((a) => (a.commonErrors || []).forEach((e) => {
      const k = (e.description || '').slice(0, 60);
      if (e.description && !seen.has(k)) { seen.add(k); traps.push(e); }
    }));
    if (traps.length) {
      html += sec('Common mistakes', 'trap', `<ul class="mono-list mono-traps">${traps.slice(0, 6).map((e) => `<li><span class="mono-tag">${escapeHtml(e.type || '')}</span> ${MathRender.inline(e.description || '')}</li>`).join('')}</ul>`);
    }

    // Worked examples — ALL of them, easiest first (F18: the data holds a
    // median of three per skill and the page was showing one). Fluency comes
    // from seeing the pattern several times, with its recognition cue attached
    // to the example it belongs to (F21).
    if (arch.length) {
      const ord = { easy: 0, medium: 1, hard: 2 };
      const sorted = arch.slice().sort((a, b) => (ord[a.difficulty] ?? 1) - (ord[b.difficulty] ?? 1));
      const inner = sorted.map((a, k) => `
        <div class="mono-ex-head"><span class="mono-ex-n">Example ${k + 1}</span>${a.difficulty ? `<span class="mono-diff ${escapeHtml(a.difficulty)}">${escapeHtml(a.difficulty)}</span>` : ''}</div>
        ${renderPrompt(a.example || a.promptTemplate || '')}
        ${a.recognitionCue ? `<p class="mono-cond"><em>Spot it:</em> ${MathRender.inline(a.recognitionCue)}</p>` : ''}
        ${(a.methodPlan || []).length ? `<ol class="mono-steps">${a.methodPlan.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>` : ''}
        ${a.answer ? `<div class="mono-answer"><span class="mono-answer-lbl">Answer</span>${eqOrProse(a.answer)}</div>` : ''}
      `).join('<div class="mono-rule"></div>');
      html += sec(sorted.length > 1 ? `Worked examples` : 'Worked example', 'ex', inner);
    }

    // Exit to this skill's own section practice (F29 — the old link led to
    // the Vessel regardless of chapter).
    html += `<a class="rc-go" href="#/drill/s/${encodeURIComponent(String(ms.chapter))}/${encodeURIComponent(String(ms.section))}" style="margin-top:26px;">${Icon('drill')}&nbsp; Practice this section</a>`;
    root.innerHTML = html;
  },
};
