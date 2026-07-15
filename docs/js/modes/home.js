function greeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Still up, Mina?';
  if (h < 12) return 'Good morning, Mina';
  if (h < 18) return 'Good afternoon, Mina';
  return 'Good evening, Mina';
}

function examDays() {
  const d = localStorage.getItem('examDate');
  if (!d) return null;
  const days = Math.ceil((new Date(d + 'T00:00:00') - new Date()) / 86400000);
  return isNaN(days) ? null : days;
}

// Skill names range from "The Product Rule" to full sentences; keep journey rows
// and the mission to a single terse line.
function terse(s, max = 34) {
  s = String(s || '').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trimEnd() + '…';
}

// The observatory reads its own state back to you — so opening the app feels
// like entering a place that changed while you were gone, not a fresh render.
function timeLight() {
  const h = new Date().getHours();
  if (h < 5) return 'The observatory keeps one lamp against the dark.';
  if (h < 12) return 'Morning light reaches into the halls.';
  if (h < 17) return 'Afternoon light lies long across the floor.';
  if (h < 21) return 'The halls settle into evening.';
  return 'The observatory holds its night-quiet.';
}
function observatoryLog(world) {
  const lines = [{ t: timeLight() }];
  const halls = Object.values(world.halls || {});
  const settled = halls
    .filter((h) => h.introduced && h.daysSinceVisit != null && h.daysSinceVisit >= 1 && (h.word === 'Settling' || h.word === 'Sound'))
    .sort((a, b) => b.structuralIntegrity - a.structuralIntegrity)[0];
  if (settled) lines.push({ t: `${Geography.placeName(settled.chapter)} has settled since you were away.` });
  const weak = (world.integrity.inspect || [])[0];
  if (weak) lines.push({ t: `One idea still stands unsettled — ${terse(weak, 30)}.`, dim: true });
  const steady = (world.integrity.stabilized || [])[0];
  if (steady && lines.length < 4) lines.push({ t: `Your last steadied idea: ${terse(steady, 30)}.`, dim: true });
  if (lines.length === 1) lines.push({ t: 'The halls are newly restored, and quiet. Nothing has been disturbed yet.', dim: true });
  return lines;
}

// Master (weakest) + Challenge (an exam-priority skill) for Today's Journey.
async function journeyPicks() {
  const [microSkills, attempts] = await Promise.all([DB.getAll('microSkills'), DB.getAllAttempts()]);
  const by = {};
  attempts.forEach((a) => { by[a.microSkillId] = by[a.microSkillId] || { t: 0, c: 0 }; by[a.microSkillId].t++; if (a.correct) by[a.microSkillId].c++; });
  const ranked = microSkills
    .map((m) => ({ m, s: by[m.id] }))
    .filter((x) => x.s && x.s.t >= 2)
    .sort((a, b) => (a.s.c / a.s.t) - (b.s.c / b.s.t));
  await Priority.load();
  const master = ranked.length
    ? ranked[0].m.microSkill
    : ((microSkills.find((m) => Priority.isPrioritySection(m.section)) || {}).microSkill || 'Integration by Parts');
  const pri = microSkills.filter((m) => Priority.isPrioritySection(m.section) && m.microSkill !== master);
  const challenge = pri.length
    ? pri[Math.floor(Math.random() * pri.length)].microSkill
    : ((microSkills[Math.floor(Math.random() * microSkills.length)] || {}).microSkill || 'Optimization');
  return { master, challenge };
}

window.HomeMode = {
  async render(root) {
    const [prog, due, picks, world] = await Promise.all([
      Progress.getState(),
      SRS.getDueItems('archetype', 500).then((a) => a.length),
      journeyPicks(),
      Observatory.state(),                     // the simulation is the source of world-state
    ]);
    const days = examDays();
    const integ = world.integrity;
    const presence = world.presence;
    const log = observatoryLog(world);
    if (window.World && World.available()) return this.renderArrival(root, { prog, due, picks, days, integ, presence, log });
    return this.renderClassic(root, { prog, due, master: picks.master, days, integ, presence, log });
  },

  // The Arrival — you enter the observatory. DOM composites over the 3D world.
  renderArrival(root, { prog, due, picks, days, integ, presence, log }) {
    const countdown = days != null
      ? `<button class="arr-exam" id="exam-set">${days} day${days === 1 ? '' : 's'} until your exam</button>`
      : `<button class="arr-exam" id="exam-set">Set your exam date</button>`;
    const last = localStorage.getItem('lastPlace') || '#/journey/2';
    const contSub = due > 0 ? `${due} idea${due === 1 ? '' : 's'} waiting to be revisited` : `Structural integrity ${integ.pct}% · ${presence}`;

    root.innerHTML = `
      <div class="arrival" id="arrival">
        <div class="arr-top">
          <div class="display arr-greet">${greeting()}</div>
          ${countdown}
        </div>
        <div class="arr-mid"></div>
        <div class="arr-journey">
          <div class="arr-log">
            ${log.map((l) => `<div class="arr-log-line${l.dim ? ' dim' : ''}">${escapeHtml(l.t)}</div>`).join('')}
          </div>
          <a class="arr-continue" id="arr-continue" href="${last}">Continue where you stopped<span class="arr-cont-sub">${escapeHtml(contSub)}</span></a>
          <a class="arr-more" href="#/journey">Walk a chapter from the start</a>
        </div>
      </div>
    `;

    if (window.__world) { window.__world.destroy(); window.__world = null; }
    window.__world = World.create();

    const arr = document.getElementById('arrival');
    const introMs = (window.__world.introDur || 3.6) * 1000;
    setTimeout(() => arr && arr.classList.add('reveal-top'), 350);
    setTimeout(() => arr && arr.classList.add('reveal'), Math.min(1600, introMs * 0.5));

    const setExam = () => {
      const cur = localStorage.getItem('examDate') || '';
      const v = prompt('Your exam date (YYYY-MM-DD):', cur);
      if (v === null) return;
      if (v.trim() === '') localStorage.removeItem('examDate'); else localStorage.setItem('examDate', v.trim());
      this.render(root);
    };
    const btn = document.getElementById('exam-set');
    if (btn) btn.addEventListener('click', setExam);
  },

  // Classic 2D home — fallback when WebGL/THREE is unavailable.
  renderClassic(root, { prog, due, master, days, integ, presence, log }) {
    const last = localStorage.getItem('lastPlace') || '#/journey/2';
    root.innerHTML = `
      <div class="hm">
      <div class="hm-hero">
        <div class="kicker">The observatory</div>
        <div class="display hm-greet">${greeting()}</div>
      </div>

      <div class="hm-sculpt"><div class="hm-canvas" id="math-hero"></div><div class="hm-vignette"></div></div>

      <div class="arr-log hm-log">
        ${(log || []).map((l) => `<div class="arr-log-line${l.dim ? ' dim' : ''}">${escapeHtml(l.t)}</div>`).join('')}
      </div>

      <div style="flex:1;min-height:12px;"></div>

      <a class="begin" href="${last}">Continue where you stopped<small>${due > 0 ? `${due} idea${due === 1 ? '' : 's'} waiting · ~${Math.max(3, Math.round(due * 0.8))} min` : `Structural integrity ${integ.pct}%`}</small></a>
      <div class="hm-foot">
        <button class="hm-foot-btn" id="exam-row">${days != null ? `${days} day${days === 1 ? '' : 's'} until your exam` : 'Set your exam date'}</button><span class="hm-sep">·</span>
        <span>${presence}</span><span class="hm-sep">·</span>
        <a href="#/journey" style="color:inherit;">Walk a chapter</a>
      </div>
      </div>
    `;

    const heroEl = document.getElementById('math-hero');
    if (heroEl && window.MathHero) window.__mathHero = MathHero.mount(heroEl);
    const wellEl = root.querySelector('.hm-sculpt');
    if (wellEl && window.Companion) window.__ferret = Companion.mountObservatory(wellEl);

    document.getElementById('exam-row').addEventListener('click', () => {
      const cur = localStorage.getItem('examDate') || '';
      const v = prompt('Your exam date (YYYY-MM-DD):', cur);
      if (v === null) return;
      if (v.trim() === '') localStorage.removeItem('examDate');
      else localStorage.setItem('examDate', v.trim());
      this.render(root);
    });
  },
};

function labelForErrorType(t) {
  return {
    conceptual: 'Conceptual (wrong theorem/technique choice)',
    procedural: 'Procedural (right idea, wrong steps)',
    algebra: 'Algebra slip',
    presentation: 'Presentation (missing +C, no justification, etc.)',
    strategy: 'Strategy (inefficient method / time management)',
  }[t] || t;
}
window.labelForErrorType = labelForErrorType;
