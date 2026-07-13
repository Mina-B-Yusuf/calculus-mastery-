function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function buildRecognitionSession(limit = 15) {
  const archetypes = await DB.getAll('archetypes');
  const allIds = archetypes.map((a) => a.id);
  const ids = await SRS.getNewOrDueIds('archetype', shuffle(allIds), limit);
  const byId = Object.fromEntries(archetypes.map((a) => [a.id, a]));
  const microSkills = Object.fromEntries((await DB.getAll('microSkills')).map((m) => [m.id, m]));
  return ids.map((id) => byId[id]).filter(Boolean).map((a) => ({
    archetype: a,
    microSkill: microSkills[a.microSkillId],
  }));
}

function pickDistractors(pool, correctMicroSkillId, correctLabel, n) {
  const labels = new Set([correctLabel]);
  const candidates = shuffle(pool.filter((m) => m.id !== correctMicroSkillId && m.microSkill !== correctLabel));
  for (const m of candidates) {
    if (labels.size >= n + 1) break;
    labels.add(m.microSkill);
  }
  return shuffle([...labels]);
}

window.RecognitionMode = {
  async render(root) {
    const session = await buildRecognitionSession(15);
    if (!session.length) {
      root.innerHTML = `<div class="card"><h2>All caught up 🎉</h2><p class="small">No recognition drills due right now. Check back later, or study a chapter's review problems.</p></div>`;
      return;
    }
    const microSkills = await DB.getAll('microSkills');
    let idx = 0;
    let sessionCorrect = 0;

    const renderQuestion = () => {
      const { archetype, microSkill } = session[idx];
      const sameCourse = microSkills.filter((m) => m.course === microSkill.course);
      const choices = pickDistractors(sameCourse, microSkill.id, microSkill.microSkill, 3);

      root.innerHTML = `
        <div class="progressbar"><div style="width:${(idx / session.length) * 100}%"></div></div>
        <p class="small">Question ${idx + 1} of ${session.length} · <span class="pill chapter">Ch. ${archetype.chapter}</span></p>
        <div class="card">
          <h2>What technique does this need?</h2>
          <div class="example-block">${MathRender.inline(archetype.example)}</div>
          <div class="btn-block-list" id="choices">
            ${choices.map((c) => `<button class="btn-choice" data-choice="${escapeHtml(c)}">${MathRender.inline(c)}</button>`).join('')}
          </div>
        </div>
        <div id="feedback"></div>
      `;

      root.querySelectorAll('#choices button').forEach((btn) => {
        btn.addEventListener('click', () => onAnswer(btn.dataset.choice, microSkill.microSkill, archetype, microSkill));
      });
    };

    const onAnswer = (chosen, correctLabel, archetype, microSkill) => {
      const correct = chosen === correctLabel;
      if (correct) sessionCorrect += 1;
      root.querySelectorAll('#choices button').forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.choice === correctLabel) btn.classList.add('correct');
        else if (btn.dataset.choice === chosen) btn.classList.add('incorrect');
      });

      const fb = document.getElementById('feedback');
      fb.innerHTML = `
        <div class="card">
          <h3>${correct ? '✅ Correct' : '❌ Not quite'} — ${MathRender.inline(correctLabel)}</h3>
          <p class="small"><strong>Recognition cue:</strong> ${MathRender.inline(archetype.recognitionCue || '')}</p>
          <ol class="method-plan">${(archetype.methodPlan || []).map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>
          ${archetype.answer ? `<p class="small"><strong>Answer:</strong> ${MathRender.inline(archetype.answer)}</p>` : ''}
          <button class="btn-secondary" id="workout-toggle" style="margin-top:6px;">✍️ Work it out on the keyboard</button>
          <div id="workout-host"></div>
          ${!correct ? errorTagPickerHtml() : ''}
          <div class="btn-block-list" style="margin-top:12px;">
            ${correct ? `
              <button class="btn-choice" data-q="1">Hard</button>
              <button class="btn-choice" data-q="2">Good</button>
              <button class="btn-choice" data-q="3">Easy</button>
            ` : `<button class="btn btn-primary" id="continue-btn">Continue</button>`}
          </div>
        </div>
      `;

      const workoutToggle = document.getElementById('workout-toggle');
      const workoutHost = document.getElementById('workout-host');
      workoutToggle.addEventListener('click', () => {
        if (workoutHost.childElementCount) {
          workoutHost.innerHTML = '';
          workoutToggle.textContent = '✍️ Work it out on the keyboard';
        } else {
          const kb = window.MathKeyboard.create({ initial: '' });
          workoutHost.appendChild(kb.el);
          workoutToggle.textContent = '✕ Hide keyboard';
        }
      });

      let selectedErrorType = null;
      fb.querySelectorAll('.error-tag').forEach((tag) => {
        tag.addEventListener('click', () => {
          fb.querySelectorAll('.error-tag').forEach((t) => t.classList.remove('selected'));
          tag.classList.add('selected');
          selectedErrorType = tag.dataset.type;
        });
      });

      const finish = async (quality) => {
        await SRS.recordReview('archetype', archetype.id, quality);
        await DB.recordAttempt({
          archetypeId: archetype.id,
          microSkillId: microSkill.id,
          mode: 'recognition',
          correct,
          errorType: correct ? null : selectedErrorType,
        });
        idx += 1;
        if (idx >= session.length) {
          renderSummary();
        } else {
          renderQuestion();
        }
      };

      if (correct) {
        fb.querySelectorAll('[data-q]').forEach((btn) => {
          btn.addEventListener('click', () => finish(Number(btn.dataset.q)));
        });
      } else {
        document.getElementById('continue-btn').addEventListener('click', () => finish(0));
      }
    };

    const renderSummary = () => {
      root.innerHTML = `
        <div class="card">
          <h2>Session complete</h2>
          <p>${sessionCorrect} / ${session.length} recognized correctly on the first try.</p>
          <div class="btn-block-list">
            <a class="btn btn-primary" href="#/drill" style="text-decoration:none;display:block;text-align:center;">Go again</a>
            <a class="btn btn-secondary" href="#/home" style="text-decoration:none;display:block;text-align:center;">Back home</a>
          </div>
        </div>
      `;
    };

    renderQuestion();
  },
};

function errorTagPickerHtml() {
  const types = [
    ['conceptual', 'Wrong technique'],
    ['procedural', 'Right idea, messed up steps'],
    ['algebra', 'Algebra slip'],
    ['presentation', 'Missing +C / justification'],
    ['strategy', 'Overthought it / ran out of time'],
  ];
  return `
    <p class="small" style="margin-bottom:0;">What kind of mistake was it? (optional, helps your Error Notebook)</p>
    <div class="error-tag-row">
      ${types.map(([v, l]) => `<button type="button" class="error-tag" data-type="${v}">${l}</button>`).join('')}
    </div>
  `;
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
window.escapeHtml = window.escapeHtml || escapeHtml;
