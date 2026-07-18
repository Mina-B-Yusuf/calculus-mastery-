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

// The observatory witnesses a sitting: every checked problem leaves a trace —
// which attack the learner reconstructed, and whether their paper held.
const SIT_KEY = 'examSits';
function sitRecords() {
  try { return JSON.parse(localStorage.getItem(SIT_KEY) || '[]'); } catch (e) { return []; }
}
function recordSit(rec) {
  const all = sitRecords();
  all.push(Object.assign({ t: Date.now() }, rec));
  try { localStorage.setItem(SIT_KEY, JSON.stringify(all.slice(-500))); } catch (e) {}
}

// De-boxed problem: number + template kicker, floating statement. The check
// flow witnesses the sit: Reconstruct (which attack?) → solution → "did your
// paper hold?" — solve first, name the anatomy after (scaffolding at its far
// end fades to "just Solve", then reconstructs).
// Marked solutions render as the examiner's atoms (see marking-grammar.md);
// the map lets wireReveals find a card's atoms without re-threading the data.
const CARD_MARKS = {};

function problemCard(prob, paperId) {
  const cueId = `sol-${paperId}-${prob.num}`;
  if (prob.marks && prob.marks.length) CARD_MARKS[cueId] = prob.marks;
  const scheme = (prob.marks && prob.marks.length) ? `
    <div class="ex-scheme">
      ${prob.marks.map((m) => `<div class="ex-atom"><span class="ex-atom-k ${escapeHtml(m.k[0])}">${escapeHtml(m.k)}</span><span class="ex-atom-t">${MathRender.inline(m.text)}</span></div>`).join('')}
    </div>` : '';
  const sec = (prob.sections || [])[0];
  const drill = sec
    ? `<a class="ex-drill" href="#/drill/s/${encodeURIComponent(sec.split('.')[0])}/${encodeURIComponent(sec)}">${Icon('drill')} Practice this skill's section</a>`
    : '';
  return `
    <div class="ex-prob" data-template="${escapeHtml(prob.template || '')}" data-num="${escapeHtml(prob.num)}" data-paper="${escapeHtml(paperId)}">
      <div class="ex-phead"><span class="ex-pnum">${escapeHtml(prob.num)}</span>${prob.template ? `<span class="ex-ptag">${escapeHtml(templateLabel(prob.template))}</span>` : ''}</div>
      <div class="ex-stmt">${MathRender.inline(prob.statement)}</div>
      <button class="rc-reveal reveal-sol" data-target="${cueId}" aria-expanded="false">${Icon('gist')}<span>I've worked it — check</span><span class="rc-chev">${Icon('chevron')}</span></button>
      <div class="ex-recon" id="rec-${cueId}"></div>
      <div class="reveal-wrap" id="${cueId}"><div class="reveal-inner"><div class="rc-rbody">
        ${prob.answer ? `<div class="callout ex tint" style="margin:2px 0 8px;"><div class="callout-head"><span class="callout-icon">${Icon('check')}</span>Answer</div><div class="callout-body">${MathRender.inline(prob.answer)}</div></div>` : ''}
        ${scheme}
        ${prob.solution ? `<p style="margin:0 0 8px;">${MathRender.inline(prob.solution)}</p>` : ''}
        ${drill}
        <div class="ex-mark" id="mark-${cueId}"></div>
      </div></div></div>
    </div>
  `;
}

function wireReveals(root) {
  root.querySelectorAll('.reveal-sol').forEach((btn) => {
    const probEl = btn.closest('.ex-prob');
    const tpl = probEl.dataset.template;
    const cueId = btn.dataset.target;
    const templates = (META && META.templates) || {};
    // Theory has one template — nothing to reconstruct there.
    let reconPending = tpl && tpl !== 'TH' && Object.keys(templates).length >= 4;
    let reconResult = null;

    const mountMark = () => {
      const host = document.getElementById('mark-' + cueId);
      if (!host || host.innerHTML) return;
      const done = (held, markFell) => {
        recordSit({
          paper: probEl.dataset.paper.replace(/^mock.*/, 'mock'),
          num: probEl.dataset.num, template: tpl || null,
          recon: reconResult, held, markFell: markFell || null,
        });
        host.innerHTML = `<div class="ex-marked">${Icon(held ? 'check' : 'x')}<span>${held ? 'Full marks.' : `Lost at ${markFell}.`} The observatory remembers this sitting.</span></div>`;
      };
      const marks = CARD_MARKS[cueId];
      if (marks) {
        // The examiner's question: not "did it hold?" but WHICH mark fell first.
        host.innerHTML = `
          <div class="rc-phase">Mark your paper — which mark fell first?</div>
          <div class="rc-choices ex-fell">
            ${marks.map((m, i) => `<button class="rc-choice" data-i="${i}"><span class="ex-atom-k ${escapeHtml(m.k[0])}">${escapeHtml(m.k)}</span><span class="rc-ctext">${MathRender.inline(m.text)}</span></button>`).join('')}
            <button class="rc-choice ex-full" data-i="full"><span class="rc-mark"></span><span class="rc-ctext">None fell — full marks</span></button>
          </div>`;
        host.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
          const i = b.dataset.i;
          if (i === 'full') return done(true, null);
          done(false, `${marks[Number(i)].k} · ${marks[Number(i)].text}`);
        }));
        return;
      }
      host.innerHTML = `
        <div class="rc-phase">Your paper — did it hold?</div>
        <div class="rc-rate"><button data-held="1">It held</button><button data-held="0">Lost marks</button></div>`;
      host.querySelectorAll('[data-held]').forEach((b) => b.addEventListener('click', () => {
        const held = b.dataset.held === '1';
        recordSit({
          paper: probEl.dataset.paper.replace(/^mock.*/, 'mock'),
          num: probEl.dataset.num, template: tpl || null,
          recon: reconResult, held,
        });
        host.innerHTML = `<div class="ex-marked">${Icon(held ? 'check' : 'x')}<span>${held ? 'Held.' : 'Noted.'} The observatory remembers this sitting.</span></div>`;
      }));
    };
    const openSolution = () => {
      const el = document.getElementById(cueId);
      el.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const lbl = btn.querySelector('span:not(.rc-chev)');
      if (lbl) lbl.textContent = 'Hide solution';
      mountMark();
    };

    btn.addEventListener('click', () => {
      const el = document.getElementById(cueId);
      if (el.classList.contains('open')) {
        el.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        const lbl = btn.querySelector('span:not(.rc-chev)');
        if (lbl) lbl.textContent = "I've worked it — check";
        return;
      }
      if (!reconPending) return openSolution();
      const host = document.getElementById('rec-' + cueId);
      if (host.innerHTML) return;   // gate already showing — answer it to proceed
      const others = Object.keys(templates).filter((k) => k !== 'TH' && k !== tpl);
      const opts = [tpl, ...shuffleT(others).slice(0, 3)];
      shuffleT(opts);
      host.innerHTML = `
        <div class="rc-phase"><span class="rc-phase-n">Reconstruct</span> Before the solution — which attack did this need?</div>
        <div class="rc-choices">${opts.map((t) => `
          <button class="rc-choice" data-t="${escapeHtml(t)}"><span class="rc-mark"></span><span class="rc-ctext">${escapeHtml(templates[t] || t)}</span></button>`).join('')}
        </div>`;
      host.querySelectorAll('button').forEach((ob) => ob.addEventListener('click', () => {
        if (reconResult != null) return;
        reconResult = ob.dataset.t === tpl;
        host.querySelectorAll('button').forEach((x) => {
          x.disabled = true;
          if (x.dataset.t === tpl) x.classList.add('correct');
          else if (x === ob) x.classList.add('incorrect');
        });
        reconPending = false;
        setTimeout(openSolution, reconResult ? 450 : 1100);
      }));
    });
  });
}

function shuffleT(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
      ${this.shelfHtml()}
    `;
  },

  // The shelf of sittings — examinations belong to the observatory's memory.
  shelfHtml() {
    const sits = sitRecords();
    if (!sits.length) return '';
    const agg = {};
    sits.forEach((r) => {
      const day = new Date(r.t).toISOString().slice(0, 10);
      const key = day + '|' + r.paper;
      const a = (agg[key] = agg[key] || { day, paper: r.paper, held: 0, total: 0, t: 0 });
      a.total += 1; if (r.held) a.held += 1; a.t = Math.max(a.t, r.t);
    });
    const shelf = Object.values(agg).sort((a, b) => b.t - a.t).slice(0, 6);
    const nameOf = (id) => id === 'mock' ? 'Mock exam — professor style'
      : ((PAPERS.find((p) => p.id === id) || {}).title || id);
    return `
      <div class="kicker" style="margin:28px 2px 4px;">Sittings</div>
      <div class="cx-list">${shelf.map((s) => `
        <div class="cx-row">
          <span class="cx-num ex-yr">${escapeHtml(s.day.slice(5))}</span>
          <span class="cx-main"><span class="cx-title">${escapeHtml(nameOf(s.paper))}</span><span class="cx-sub">${s.held} of ${s.total} problems held</span></span>
        </div>`).join('')}
      </div>`;
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
