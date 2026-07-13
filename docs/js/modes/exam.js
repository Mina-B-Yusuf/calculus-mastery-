// Exam Mode: browse the 8 real past papers (problem -> reveal solution), and
// generate a professor-style mock exam that follows the recurring template.

let PAPERS = null;
let META = null;

async function loadPapers() {
  if (PAPERS) return;
  const data = await DataLoader.fetchJSON('data/past-papers/past-papers.json');
  PAPERS = data.papers;
  META = data;
}

function templateBadge(t) {
  const label = (META && META.templates && META.templates[t]) || t;
  return `<span class="pill">${escapeHtml(t)} · ${escapeHtml(label)}</span>`;
}

function problemCard(prob, paperId) {
  const cueId = `sol-${paperId}-${prob.num}`;
  const drill = (prob.sections || []).length
    ? `<a class="small" style="color:var(--accent);" href="#/drill">▶ Drill this skill</a>`
    : '';
  return `
    <div class="card">
      <div class="flex-between">
        <strong>${escapeHtml(prob.num)}</strong>
        ${prob.template ? templateBadge(prob.template) : ''}
      </div>
      <div class="example-block">${MathRender.inline(prob.statement)}</div>
      <button class="btn-secondary reveal-sol" data-target="${cueId}">Reveal solution</button>
      <div id="${cueId}" class="sol-area" style="display:none;">
        ${prob.answer ? `<p class="small"><strong>Answer:</strong> ${MathRender.inline(prob.answer)}</p>` : ''}
        ${prob.solution ? `<p class="small">${MathRender.inline(prob.solution)}</p>` : ''}
        ${drill}
      </div>
    </div>
  `;
}

function wireReveals(root) {
  root.querySelectorAll('.reveal-sol').forEach((btn) => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(btn.dataset.target);
      const open = el.style.display !== 'none';
      el.style.display = open ? 'none' : 'block';
      btn.textContent = open ? 'Reveal solution' : 'Hide solution';
    });
  });
}

window.ExamMode = {
  async render(root, sub) {
    await loadPapers();

    // routes: #/exam  (list) | #/exam/paper/<id> | #/exam/mock
    if (sub && sub[0] === 'paper') {
      return this.renderPaper(root, sub[1]);
    }
    if (sub && sub[0] === 'mock') {
      return this.renderMock(root);
    }

    const list = PAPERS.map((p) => `
      <a class="card" style="display:block;text-decoration:none;color:inherit;" href="#/exam/paper/${encodeURIComponent(p.id)}">
        <strong>${escapeHtml(p.title)}</strong>
        <div class="small">${p.problems.filter((x) => x.part === 'A').length} computational · ${p.problems.filter((x) => x.part !== 'A').length} theory</div>
      </a>
    `).join('');

    root.innerHTML = `
      <div class="card">
        <h2>Exam Mode</h2>
        <p class="small">${escapeHtml(META.course)}. Every past paper reuses the same ~8 problem templates — see the Professor Playbook. Browse a real paper, or generate one in your professor's style.</p>
        <a class="btn btn-primary" href="#/exam/mock" style="text-decoration:none;display:block;text-align:center;">🎲 Generate a professor-style mock exam</a>
      </div>
      <h3 style="margin:6px 4px;">Past papers</h3>
      ${list}
    `;
  },

  async renderPaper(root, id) {
    const paper = PAPERS.find((p) => p.id === id);
    if (!paper) { root.innerHTML = '<div class="card">Paper not found. <a href="#/exam">Back</a></div>'; return; }
    const partA = paper.problems.filter((p) => p.part === 'A');
    const theory = paper.problems.filter((p) => p.part !== 'A');
    root.innerHTML = `
      <a class="small" href="#/exam" style="color:var(--accent);">← All papers</a>
      <div class="card"><h2>${escapeHtml(paper.title)}</h2>
        <p class="small">Part A: 6 problems (5 credits each, need 15 to pass). Part B/C: theory proofs.</p></div>
      <h3 style="margin:6px 4px;">A · Computational</h3>
      ${partA.map((p) => problemCard(p, paper.id)).join('')}
      <h3 style="margin:6px 4px;">B/C · Theory</h3>
      ${theory.map((p) => problemCard(p, paper.id)).join('')}
    `;
    wireReveals(root);
  },

  async renderMock(root) {
    // Professor-style Part A blueprint: Taylor limit, two integrals, improper, a
    // series, and a radius/sequence/ODE problem; plus two theory proofs.
    const byTemplate = {};
    PAPERS.forEach((p) => p.problems.forEach((pr) => {
      (byTemplate[pr.template] = byTemplate[pr.template] || []).push(pr);
    }));
    const pick = (t) => {
      const pool = byTemplate[t] || [];
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    };
    const blueprintA = ['T1', 'T3', 'T2', 'T4', 'T6', ['T7', 'T5', 'T8']];
    const partA = blueprintA.map((slot) => {
      if (Array.isArray(slot)) {
        const t = slot[Math.floor(Math.random() * slot.length)];
        return pick(t) || pick(slot[0]);
      }
      return pick(slot);
    }).filter(Boolean);

    const theoryPool = byTemplate['TH'] || [];
    const theory = [];
    const seen = new Set();
    for (let i = 0; i < theoryPool.length && theory.length < 2; i++) {
      const p = theoryPool[Math.floor(Math.random() * theoryPool.length)];
      if (!seen.has(p.statement)) { seen.add(p.statement); theory.push(p); }
    }

    let n = 0;
    const renderProb = (p) => {
      n += 1;
      const clone = Object.assign({}, p, { num: String(n) });
      return problemCard(clone, 'mock');
    };

    root.innerHTML = `
      <a class="small" href="#/exam" style="color:var(--accent);">← Exam Mode</a>
      <div class="card">
        <h2>Mock exam · professor style</h2>
        <p class="small">Assembled from the real template. Try it closed-book (5 h, no calculator), then reveal each solution. Regenerate for a fresh set.</p>
        <a class="btn btn-secondary" href="#/exam/mock" onclick="location.reload&&0" style="text-decoration:none;display:block;text-align:center;" id="regen">🎲 Regenerate</a>
      </div>
      <h3 style="margin:6px 4px;">A · Computational (5 credits each)</h3>
      ${partA.map(renderProb).join('')}
      <h3 style="margin:6px 4px;">B · Theory</h3>
      ${theory.map((p) => problemCard(p, 'mock-th')).join('')}
    `;
    wireReveals(root);
    const regen = document.getElementById('regen');
    if (regen) regen.addEventListener('click', (e) => { e.preventDefault(); this.renderMock(root); });
  },
};
