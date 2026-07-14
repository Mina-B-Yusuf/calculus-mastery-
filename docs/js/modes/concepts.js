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
      String(a[1].ms.chapter).localeCompare(String(b[1].ms.chapter), undefined, { numeric: true }));
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
    const worked = arch[0];
    const cues = [...new Set(arch.map((a) => a.recognitionCue).filter(Boolean))];

    const callout = (variant, icon, label, chip, inner) => `
      <div class="callout ${variant} tint">
        <div class="callout-head"><span class="callout-icon">${Icon(icon)}</span>${label}${chip ? `<span class="chip">${escapeHtml(chip)}</span>` : ''}</div>
        <div class="callout-body">${inner}</div>
      </div>`;

    let html = `
      <a class="crumb" href="#/concepts/ch/${encodeURIComponent(chapterKey(ms))}">${Icon('back')} ${escapeHtml(ms.chapterTitle)}</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml(ms.section)}</div>
        <div class="fg">
          <div class="kicker">${escapeHtml(ms.topic || '')}${ms.subtopic ? ' · ' + escapeHtml(ms.subtopic) : ''}</div>
          <div class="display">${escapeHtml(ms.microSkill)}</div>
        </div>
      </div>`;

    if (cues.length) html += callout('gist', 'gist', 'The gist', '', `<p style="margin:0;">${MathRender.inline(cues[0])}</p>`);

    if ((ms.definitions || []).length) {
      const inner = `<ul>${ms.definitions.map((d) => `<li>${MathRender.inline(d)}</li>`).join('')}</ul>`;
      html += callout('def', 'definition', 'Definition', '', inner);
    }

    if ((ms.theorems || []).length) {
      const inner = ms.theorems.map((t) => `
        <div class="theorem-item">
          <span class="thm-name">${escapeHtml(t.name || 'Theorem')}.</span> ${MathRender.inline(t.statement || '')}
          ${(t.conditions && t.conditions.length) ? `<div class="thm-cond">Requires: ${t.conditions.map((c) => MathRender.inline(c)).join('; ')}</div>` : ''}
        </div>`).join('');
      html += callout('thm', 'theorem', 'Theorems', '', inner);
    }

    if ((ms.formulas || []).length) {
      const inner = ms.formulas.map((f) => `<div class="example-block" style="font-size:1em;margin:8px 0;">${MathRender.inline(f)}</div>`).join('');
      html += callout('fml', 'formula', 'Key formulas', '', inner);
    }

    if (worked) {
      const inner = `
        <div class="example-block">${MathRender.inline(worked.example || worked.promptTemplate || '')}</div>
        ${(worked.methodPlan || []).length ? `<ol class="method-plan">${worked.methodPlan.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>` : ''}
        ${worked.answer ? `<p class="small" style="margin:6px 0 0;"><strong>Answer:</strong> ${MathRender.inline(worked.answer)}</p>` : ''}`;
      html += callout('ex', 'example', 'Worked example', worked.difficulty || '', inner);
    }

    const traps = []; const seen = new Set();
    arch.forEach((a) => (a.commonErrors || []).forEach((e) => {
      const k = (e.description || '').slice(0, 60);
      if (e.description && !seen.has(k)) { seen.add(k); traps.push(e); }
    }));
    if (traps.length) {
      const inner = `<ul>${traps.slice(0, 6).map((e) => `<li><span class="pill" style="color:var(--trap);background:color-mix(in srgb,var(--trap) 14%,transparent);">${escapeHtml(e.type || '')}</span> ${MathRender.inline(e.description || '')}</li>`).join('')}</ul>`;
      html += callout('trap', 'trap', 'Common traps', '', inner);
    }

    html += `<a class="btn btn-primary" href="#/drill" style="margin-top:4px;">${Icon('drill')} Drill this</a>`;
    root.innerHTML = html;
  },
};
