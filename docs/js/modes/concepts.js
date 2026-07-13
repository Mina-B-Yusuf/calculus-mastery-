// Concepts / Learn section — browse every concept and actually study it:
// definitions, theorems (with hypotheses), the gist in plain English, a fully
// worked example, and the common traps. Built from the taxonomy already in IndexedDB.

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

window.ConceptsMode = {
  async render(root, sub) {
    await ensureData();
    if (sub && sub[0] === 'ch') return this.renderChapter(root, decodeURIComponent(sub[1]));
    if (sub && sub[0] === 'skill') return this.renderSkill(root, decodeURIComponent(sub[1]));

    // chapter index, grouped by course
    const byChapter = {};
    CS_SKILLS.forEach((ms) => {
      const k = chapterKey(ms);
      byChapter[k] = byChapter[k] || { ms, count: 0 };
      byChapter[k].count += 1;
    });
    const entries = Object.entries(byChapter).sort((a, b) => {
      const A = a[1].ms, B = b[1].ms;
      return (A.course || '').localeCompare(B.course || '') || String(A.chapter).localeCompare(String(B.chapter), undefined, { numeric: true });
    });
    const groups = { 'calculus-1': [], 'calculus-2': [] };
    entries.forEach(([k, v]) => {
      const card = `<a class="card" style="display:block;text-decoration:none;color:inherit;margin-bottom:10px;" href="#/concepts/ch/${encodeURIComponent(k)}">
        <strong>Ch. ${escapeHtml(String(v.ms.chapter))} — ${escapeHtml(v.ms.chapterTitle)}</strong>
        <div class="small">${v.count} concepts</div></a>`;
      (groups[v.ms.course] || (groups[v.ms.course] = [])).push(card);
    });

    root.innerHTML = `
      <div class="card">
        <h2>Concepts</h2>
        <p class="small">Learn each idea properly: definition, the gist in plain English, a worked example, and the traps. Pick a chapter.</p>
      </div>
      <h3 style="margin:6px 4px;">Calculus 1</h3>
      ${(groups['calculus-1'] || []).join('')}
      <h3 style="margin:6px 4px;">Calculus 2</h3>
      ${(groups['calculus-2'] || []).join('')}
    `;
  },

  async renderChapter(root, key) {
    const skills = CS_SKILLS.filter((ms) => chapterKey(ms) === key)
      .sort((a, b) => String(a.section).localeCompare(String(b.section), undefined, { numeric: true }));
    if (!skills.length) { root.innerHTML = '<div class="card">Not found. <a href="#/concepts">Back</a></div>'; return; }
    const head = skills[0];
    // group by subtopic
    const bySub = {};
    skills.forEach((ms) => (bySub[ms.subtopic || ms.topic || ''] = bySub[ms.subtopic || ms.topic || ''] || []).push(ms));
    const body = Object.entries(bySub).map(([sub, list]) => `
      <h3 style="margin:10px 4px 4px;">${escapeHtml(sub)}</h3>
      ${list.map((ms) => `
        <a class="card" style="display:block;text-decoration:none;color:inherit;margin-bottom:8px;" href="#/concepts/skill/${encodeURIComponent(ms.id)}">
          <div class="flex-between"><strong>${escapeHtml(ms.microSkill)}</strong><span class="pill">${escapeHtml(ms.section)}</span></div>
        </a>`).join('')}
    `).join('');
    root.innerHTML = `
      <a class="small" href="#/concepts" style="color:var(--accent);">← All chapters</a>
      <div class="card"><h2>Ch. ${escapeHtml(String(head.chapter))} — ${escapeHtml(head.chapterTitle)}</h2>
        <p class="small">${skills.length} concepts</p></div>
      ${body}
    `;
  },

  async renderSkill(root, id) {
    const ms = CS_SKILLS.find((s) => s.id === id);
    if (!ms) { root.innerHTML = '<div class="card">Not found. <a href="#/concepts">Back</a></div>'; return; }
    const arch = (CS_ARCH[id] || []);
    const worked = arch[0];

    const defs = (ms.definitions || []).map((d) => `<li>${MathRender.inline(d)}</li>`).join('');
    const thms = (ms.theorems || []).map((t) => `
      <div style="margin-bottom:8px;">
        <strong>${escapeHtml(t.name || 'Theorem')}.</strong> ${MathRender.inline(t.statement || '')}
        ${(t.conditions && t.conditions.length) ? `<div class="small">Requires: ${t.conditions.map((c) => MathRender.inline(c)).join('; ')}</div>` : ''}
      </div>`).join('');
    const formulas = (ms.formulas || []).map((f) => `<div class="example-block" style="font-size:1em;">${MathRender.inline(f)}</div>`).join('');

    // "gist" in plain English, synthesized from the recognition cue of the archetypes
    const cues = [...new Set(arch.map((a) => a.recognitionCue).filter(Boolean))];
    const gist = cues.length ? `<p>${MathRender.inline(cues[0])}</p>` : '';

    // worked example
    let workedHtml = '';
    if (worked) {
      workedHtml = `
        <div class="example-block">${MathRender.inline(worked.example || worked.promptTemplate || '')}</div>
        ${(worked.methodPlan || []).length ? `<ol class="method-plan">${worked.methodPlan.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>` : ''}
        ${worked.answer ? `<p class="small"><strong>Answer:</strong> ${MathRender.inline(worked.answer)}</p>` : ''}
      `;
    }

    // common traps — aggregate across archetypes, dedupe
    const traps = [];
    const seen = new Set();
    arch.forEach((a) => (a.commonErrors || []).forEach((e) => {
      const key = (e.description || '').slice(0, 60);
      if (e.description && !seen.has(key)) { seen.add(key); traps.push(e); }
    }));
    const trapsHtml = traps.slice(0, 6).map((e) => `<li><span class="pill">${escapeHtml(e.type || '')}</span> ${MathRender.inline(e.description || '')}</li>`).join('');

    root.innerHTML = `
      <a class="small" href="#/concepts/ch/${encodeURIComponent(chapterKey(ms))}" style="color:var(--accent);">← ${escapeHtml(ms.chapterTitle)}</a>
      <div class="card">
        <div class="flex-between"><h2 style="margin:0;">${escapeHtml(ms.microSkill)}</h2><span class="pill chapter">${escapeHtml(ms.section)}</span></div>
        <p class="small" style="margin:4px 0 0;">${escapeHtml(ms.topic || '')}${ms.subtopic ? ' › ' + escapeHtml(ms.subtopic) : ''}</p>
      </div>

      ${gist ? `<div class="card"><h3>💡 The gist</h3>${gist}</div>` : ''}
      ${defs ? `<div class="card"><h3>Definition</h3><ul style="padding-left:18px;margin:0;">${defs}</ul></div>` : ''}
      ${thms ? `<div class="card"><h3>Theorems</h3>${thms}</div>` : ''}
      ${formulas ? `<div class="card"><h3>Key formulas</h3>${formulas}</div>` : ''}
      ${workedHtml ? `<div class="card"><h3>Worked example</h3>${workedHtml}</div>` : ''}
      ${trapsHtml ? `<div class="card"><h3>⚠️ Common traps</h3><ul style="padding-left:18px;margin:0;">${trapsHtml}</ul></div>` : ''}

      <a class="btn btn-primary" href="#/drill" style="text-decoration:none;display:block;text-align:center;">Drill this →</a>
    `;
  },
};
