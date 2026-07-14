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
    if (window.World && World.available()) return this.renderArrival(root, { prog, due, picks, days, integ, presence });
    return this.renderClassic(root, { prog, due, master: picks.master, days, integ, presence });
  },

  // The Arrival — you enter the observatory. DOM composites over the 3D world.
  renderArrival(root, { prog, due, picks, days, integ, presence }) {
    const countdown = days != null
      ? `<button class="arr-exam" id="exam-set">${days} day${days === 1 ? '' : 's'} until your exam</button>`
      : `<button class="arr-exam" id="exam-set">Set your exam date</button>`;
    const reviewWhat = due > 0 ? `${due} skill${due === 1 ? '' : 's'} to review` : 'You’re all caught up';

    root.innerHTML = `
      <div class="arrival" id="arrival">
        <div class="arr-top">
          <div class="display arr-greet">${greeting()}</div>
          ${countdown}
        </div>
        <div class="arr-mid"></div>
        <div class="arr-journey">
          <div class="kicker">Today’s journey</div>
          <div class="arr-line"><span class="arr-role">Review</span><span class="arr-what">${escapeHtml(terse(reviewWhat, 30))}</span></div>
          <div class="arr-line"><span class="arr-role">Master</span><span class="arr-what">${escapeHtml(terse(picks.master, 30))}</span></div>
          <div class="arr-line"><span class="arr-role">Challenge</span><span class="arr-what">${escapeHtml(terse(picks.challenge, 30))}</span></div>
          <a class="arr-continue" id="arr-continue" href="#/hall">Continue<span class="arr-cont-sub">Structural integrity ${integ.pct}% · ${presence}</span></a>
          <a class="arr-more" href="#/more">More ways to study</a>
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
  renderClassic(root, { prog, due, master, days, integ, presence }) {
    root.innerHTML = `
      <div class="hm">
      <div class="hm-hero">
        <div class="kicker">Today</div>
        <div class="display hm-greet">${greeting()}</div>
      </div>

      <div class="hm-sculpt"><div class="hm-canvas" id="math-hero"></div><div class="hm-vignette"></div></div>

      <div class="kicker" style="margin:6px 2px 2px;">Today's mission</div>
      <div class="hm-mission">
        <a class="hm-row" href="#/drill">
          <span class="hm-dot"></span><span class="hm-lbl">Review due skills</span><span class="hm-val">${due}</span>
        </a>
        <a class="hm-row" href="#/drill">
          <span class="hm-dot"></span><span class="hm-lbl">Master</span><span class="hm-val" title="${escapeHtml(master)}">${escapeHtml(terse(master))}</span>
        </a>
        <button class="hm-row" id="exam-row">
          <span class="hm-dot"></span><span class="hm-lbl">Exam in</span><span class="hm-val">${days != null ? `${days} day${days === 1 ? '' : 's'}` : 'Set date'}</span>
        </button>
      </div>

      <div style="flex:1;min-height:12px;"></div>

      <a class="begin" href="#/drill">Begin<small>${due > 0 ? `${due} due · ~${Math.max(3, Math.round(due * 0.8))} min` : 'A fresh set · ~10 min'}</small></a>
      <div class="hm-foot">
        <span>Structural integrity ${integ.pct}%</span><span class="hm-sep">·</span>
        <span>${presence}</span><span class="hm-sep">·</span>
        <a href="#/more" style="color:inherit;">More ways to study</a>
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
