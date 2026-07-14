// Speed round — 60 seconds, rapid-fire "spot the technique". Low text, big combos.

function sShuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

window.SpeedMode = {
  async render(root) {
    const archetypes = await DB.getAll('archetypes');
    const microSkills = await DB.getAll('microSkills');
    const msById = Object.fromEntries(microSkills.map((m) => [m.id, m]));
    await Priority.load();
    const pool = sShuffle(archetypes.filter((a) => a.example && msById[a.microSkillId]));

    const best = (await Progress.getState()).bestSpeed;

    // intro
    root.innerHTML = `
      <div class="card" style="text-align:center;">
        <h2>Speed round</h2>
        <p class="small">60 seconds. Tap the right technique as fast as you can. Chain correct answers for a combo multiplier.</p>
        <p class="mini-chip level" style="justify-content:center;">${Icon('trophy')} Best: ${best}</p>
        <button class="btn btn-primary" id="start-speed">${Icon('bolt')} Start</button>
      </div>`;
    document.getElementById('start-speed').addEventListener('click', () => this.play(root, pool, microSkills, msById));
  },

  play(root, pool, microSkills, msById) {
    let time = 60, score = 0, combo = 0, i = 0, answered = 0, correctCount = 0;
    let locked = false;

    root.innerHTML = `
      <div class="speed-hud">
        <div class="speed-time" id="sp-time">60</div>
        <div class="speed-score"><div class="sc" id="sp-score">0</div><div class="combo" id="sp-combo">&nbsp;</div></div>
      </div>
      <div class="progressbar"><div id="sp-bar" style="width:100%"></div></div>
      <div id="sp-q"></div>`;

    const timeEl = document.getElementById('sp-time');
    const barEl = document.getElementById('sp-bar');
    const scoreEl = document.getElementById('sp-score');
    const comboEl = document.getElementById('sp-combo');
    const qEl = document.getElementById('sp-q');

    const timer = setInterval(() => {
      time -= 1;
      timeEl.textContent = time;
      barEl.style.width = `${(time / 60) * 100}%`;
      timeEl.classList.toggle('low', time <= 10);
      if (time <= 0) { clearInterval(timer); end(); }
    }, 1000);

    const next = () => {
      if (i >= pool.length) i = 0;
      const a = pool[i++];
      const ms = msById[a.microSkillId];
      const sameCourse = microSkills.filter((m) => m.course === ms.course);
      const labels = new Set([ms.microSkill]);
      for (const m of sShuffle(sameCourse)) { if (labels.size >= 4) break; if (m.microSkill !== ms.microSkill) labels.add(m.microSkill); }
      const choices = sShuffle([...labels]);
      qEl.innerHTML = `
        <div class="card pop"><div class="example-block" style="text-align:center;">${MathRender.inline(a.example)}</div></div>
        <div class="speed-choices">${choices.map((c) => `<button class="btn-choice" data-c="${escapeHtml(c)}">${MathRender.inline(c)}</button>`).join('')}</div>`;
      locked = false;
      qEl.querySelectorAll('[data-c]').forEach((btn) => btn.addEventListener('click', () => answer(btn, ms.microSkill, ms, a)));
    };

    const answer = (btn, correctLabel, ms, a) => {
      if (locked) return; locked = true;
      const correct = btn.dataset.c === correctLabel;
      answered += 1;
      DB.recordAttempt({ archetypeId: a.id, microSkillId: ms.id, mode: 'speed', correct });
      if (correct) {
        combo += 1; correctCount += 1;
        score += 10 * combo;
        btn.classList.add('flash-correct');
        scoreEl.classList.remove('pop'); void scoreEl.offsetWidth; scoreEl.classList.add('pop');
        comboEl.innerHTML = combo >= 2 ? `${combo}× combo` : '&nbsp;';
        if (combo === 5) Companion.react('streak');
      } else {
        combo = 0; comboEl.innerHTML = '&nbsp;';
        btn.classList.add('flash-wrong');
        qEl.querySelectorAll('[data-c]').forEach((b) => { if (b.dataset.c === correctLabel) b.classList.add('correct'); });
      }
      scoreEl.textContent = score;
      setTimeout(next, correct ? 260 : 650);
    };

    const end = async () => {
      const best = await Progress.recordSpeedScore(score);
      const isBest = score >= best && score > 0;
      // award XP for the session's correct answers
      let leveled = false;
      for (let k = 0; k < answered; k++) { const r = await Progress.award(k < correctCount, k < correctCount ? 6 : 2); leveled = leveled || r.leveledUp; }
      Companion.celebrate(isBest ? 'New best! Amazing!' : 'Nice hustle!');
      root.innerHTML = `
        <div class="card" style="text-align:center;">
          <h2>${isBest ? 'New best score!' : 'Round over'}</h2>
          <div class="speed-time" style="font-size:3rem;">${score}</div>
          <p class="small">${correctCount} correct · best ${best}${leveled ? ' · leveled up!' : ''}</p>
          <div class="btn-block-list" style="margin-top:8px;">
            <button class="btn btn-primary" id="again">${Icon('bolt')} Go again</button>
            <a class="btn btn-secondary" href="#/home">Back home</a>
          </div>
        </div>`;
      document.getElementById('again').addEventListener('click', () => this.render(root));
    };

    next();
  },
};
