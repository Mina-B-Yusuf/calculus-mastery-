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

function templateLabel(t) {
  const label = (META && META.templates && META.templates[t]) || '';
  return label ? `${t} · ${label}` : t;
}

// De-boxed problem: number + template kicker, floating statement, hairline
// reveal row that expands to the answer/solution (matches Recognize's reveals).
function problemCard(prob, paperId) {
  const cueId = `sol-${paperId}-${prob.num}`;
  const drill = (prob.sections || []).length
    ? `<a class="ex-drill" href="#/drill">${Icon('drill')} Drill this skill</a>`
    : '';
  return `
    <div class="ex-prob">
      <div class="ex-phead"><span class="ex-pnum">${escapeHtml(prob.num)}</span>${prob.template ? `<span class="ex-ptag">${escapeHtml(templateLabel(prob.template))}</span>` : ''}</div>
      <div class="ex-stmt">${MathRender.inline(prob.statement)}</div>
      <button class="rc-reveal reveal-sol" data-target="${cueId}" aria-expanded="false">${Icon('gist')}<span>Reveal solution</span><span class="rc-chev">${Icon('chevron')}</span></button>
      <div class="reveal-wrap" id="${cueId}"><div class="reveal-inner"><div class="rc-rbody">
        ${prob.answer ? `<div class="callout ex tint" style="margin:2px 0 8px;"><div class="callout-head"><span class="callout-icon">${Icon('check')}</span>Answer</div><div class="callout-body">${MathRender.inline(prob.answer)}</div></div>` : ''}
        ${prob.solution ? `<p style="margin:0 0 8px;">${MathRender.inline(prob.solution)}</p>` : ''}
        ${drill}
      </div></div></div>
    </div>
  `;
}

function wireReveals(root) {
  root.querySelectorAll('.reveal-sol').forEach((btn) => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(btn.dataset.target);
      const open = el.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const lbl = btn.querySelector('span:not(.rc-chev)');
      if (lbl) lbl.textContent = open ? 'Hide solution' : 'Reveal solution';
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

    const row = (p) => {
      const yr = (p.title.match(/(\d{4})/) || [])[1];
      const badge = yr ? `’${yr.slice(2)}` : Icon('exam');
      const comp = p.problems.filter((x) => x.part === 'A').length;
      const thy = p.problems.filter((x) => x.part !== 'A').length;
      return `<a class="cx-row" href="#/exam/paper/${encodeURIComponent(p.id)}">
        <span class="cx-num ex-yr">${badge}</span>
        <span class="cx-main"><span class="cx-title">${escapeHtml(p.title)}</span><span class="cx-sub">${comp} computational · ${thy} theory</span></span>
        <span class="cx-chev">${Icon('chevron')}</span></a>`;
    };
    // group by course code (e.g. 1MA404, 1MA104), newest code first
    const groups = {};
    PAPERS.forEach((p) => { const c = (p.title.match(/\((1MA\d+)\)/) || [])[1] || 'Papers'; (groups[c] = groups[c] || []).push(p); });
    const codes = Object.keys(groups).sort().reverse();

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">exam</div>
        <div class="fg">
          <div class="kicker">Exam Mode · Linnéuniversitetet</div>
          <div class="display">Sit the real thing</div>
          <div class="lede">Eight real past papers, all built from the same ~8 problem templates. Browse one, or generate a fresh paper in your professor's style.</div>
        </div>
      </div>
      <a class="begin" href="#/exam/mock">Generate a mock exam<small>Professor style · assembled from the real template</small></a>
      ${codes.map((c) => `
        <div class="kicker" style="margin:26px 2px 4px;">${escapeHtml(c)}</div>
        <div class="cx-list">${groups[c].map(row).join('')}</div>
      `).join('')}
    `;
  },

  async renderPaper(root, id) {
    const paper = PAPERS.find((p) => p.id === id);
    if (!paper) { root.innerHTML = '<div class="card">Paper not found. <a href="#/exam">Back</a></div>'; return; }
    const partA = paper.problems.filter((p) => p.part === 'A');
    const theory = paper.problems.filter((p) => p.part !== 'A');
    root.innerHTML = `
      <a class="crumb" href="#/exam">${Icon('back')} All papers</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml((paper.title.match(/(\d{4})/) || [''])[0])}</div>
        <div class="fg">
          <div class="kicker">Past paper</div>
          <div class="display">${escapeHtml(paper.title)}</div>
          <div class="lede">Part A — 6 problems, 5 credits each (15 to pass). Part B/C — theory proofs. Try it closed-book, then reveal each solution.</div>
        </div>
      </div>
      <div class="kicker ex-part">A · Computational</div>
      <div class="ex-list">${partA.map((p) => problemCard(p, paper.id)).join('')}</div>
      <div class="kicker ex-part">B / C · Theory</div>
      <div class="ex-list">${theory.map((p) => problemCard(p, paper.id)).join('')}</div>
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
      <a class="crumb" href="#/exam">${Icon('back')} Exam Mode</a>
      <div class="editorial">
        <div class="ghost-word">mock</div>
        <div class="fg">
          <div class="kicker">Professor style</div>
          <div class="display">Your mock exam</div>
          <div class="lede">Assembled from the real template. Try it closed-book (5 h, no calculator), then reveal each solution.</div>
        </div>
      </div>
      <button class="ex-regen" id="regen">${Icon('dice')} Regenerate</button>
      <div class="kicker ex-part">A · Computational · 5 credits each</div>
      <div class="ex-list">${partA.map(renderProb).join('')}</div>
      <div class="kicker ex-part">B · Theory</div>
      <div class="ex-list">${theory.map((p) => problemCard(p, 'mock-th')).join('')}</div>
    `;
    wireReveals(root);
    const regen = document.getElementById('regen');
    if (regen) regen.addEventListener('click', (e) => { e.preventDefault(); this.renderMock(root); });
  },
};
