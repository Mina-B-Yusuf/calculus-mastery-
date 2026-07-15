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
  const microSkills = Object.fromEntries((await DB.getAll('microSkills')).map((m) => [m.id, m]));
  await Priority.load();
  // Order candidate ids so exam-priority archetypes are preferred (shuffled within tier).
  const withSection = shuffle(archetypes).map((a) => ({
    id: a.id,
    section: (microSkills[a.microSkillId] || {}).section,
  }));
  const orderedIds = Priority.prioritize(withSection).map((x) => x.id);
  const ids = await SRS.getNewOrDueIds('archetype', orderedIds, limit);
  const byId = Object.fromEntries(archetypes.map((a) => [a.id, a]));
  return ids.map((id) => byId[id]).filter(Boolean).map((a) => ({
    archetype: a,
    microSkill: microSkills[a.microSkillId],
  }));
}

// Distractors must be plausible near-misses, not absurd cross-topic options: a
// student who half-knows the material should feel the pull of each wrong choice.
// Two sources, in order of pedagogical value:
//   1. the techniques THIS archetype is commonly confused with (merged_topics),
//      mapped onto real skill labels so every option reads consistently;
//   2. the nearest taxonomic neighbours — same subtopic, then topic, then
//      chapter — because confusion lives between adjacent ideas.
function pickDistractors(microSkills, correctMs, archetype, n) {
  const correctLabel = correctMs.microSkill;
  const chosen = [];
  const used = new Set([correctLabel.trim().toLowerCase()]);
  const add = (label) => {
    const key = String(label || '').trim().toLowerCase();
    if (!key || used.has(key)) return;
    used.add(key);
    chosen.push(label);
  };

  // 1) Commonly-confused techniques for this specific archetype.
  shuffle(archetype.mergedTopics || []).forEach((mt) => {
    if (chosen.length >= n) return;
    const q = String(mt).trim().toLowerCase();
    if (!q) return;
    const match = microSkills.find((m) => {
      const label = m.microSkill.toLowerCase();
      return m.id !== correctMs.id && (label.includes(q) || q.includes(label));
    });
    if (match) add(match.microSkill);
  });

  // 2) Nearest taxonomic neighbours within the same course, ranked by closeness.
  const scored = microSkills
    .filter((m) => m.course === correctMs.course && m.id !== correctMs.id)
    .map((m) => {
      let score = 0;
      if (String(m.chapter) === String(correctMs.chapter)) score += 2;
      if (m.topic && m.topic === correctMs.topic) score += 3;
      if (m.subtopic && m.subtopic === correctMs.subtopic) score += 4;
      return { m, score };
    });
  const tiers = {};
  scored.forEach((r) => (tiers[r.score] = tiers[r.score] || []).push(r.m));
  Object.keys(tiers).sort((a, b) => b - a).forEach((score) => {
    shuffle(tiers[score]).forEach((m) => { if (chosen.length < n) add(m.microSkill); });
  });

  return shuffle([correctLabel, ...chosen.slice(0, n)]);
}

window.RecognitionMode = {
  async render(root, opts) {
    opts = opts || {};
    const session = await buildRecognitionSession(15);
    if (!session.length) {
      root.innerHTML = `<div class="card"><h2>All caught up</h2><p class="small mb0">No recognition drills due right now. Come back later, or explore the Concepts tab.</p></div>`;
      return;
    }
    const microSkills = await DB.getAll('microSkills');
    let idx = 0;
    let sessionCorrect = 0;
    // Discoveries — what changed in you this session (not XP).
    const strengthened = new Set(), corrected = new Set(), slipped = new Set();
    const priorWrong = new Set((await DB.getAllAttempts()).filter((a) => !a.correct).map((a) => a.microSkillId));

    const renderQuestion = () => {
      const { archetype, microSkill } = session[idx];
      const choices = pickDistractors(microSkills, microSkill, archetype, 3);

      root.innerHTML = `
        <div class="rc">
          <div class="rc-prog"><span style="width:${(idx / session.length) * 100}%"></span></div>
          <div class="rc-kick kicker">Recognize · ${escapeHtml(Geography.placeName(archetype.chapter))} · ${idx + 1} of ${session.length}</div>

          <div class="rc-stage">
            <div class="rc-ask">What technique does this need?</div>
            <div class="rc-hero">${MathRender.inline(archetype.example)}</div>
          </div>

          <div class="rc-choices" id="choices">
            ${choices.map((c) => `
              <button class="rc-choice" data-choice="${escapeHtml(c)}">
                <span class="rc-mark"></span><span class="rc-ctext">${MathRender.inline(c)}</span>
              </button>`).join('')}
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
      const sid = microSkill.id;
      if (correct) { if (priorWrong.has(sid)) corrected.add(sid); else strengthened.add(sid); }
      else { slipped.add(sid); priorWrong.add(sid); }
      root.querySelectorAll('#choices button').forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.choice === correctLabel) btn.classList.add('correct');
        else if (btn.dataset.choice === chosen) btn.classList.add('incorrect');
      });

      Companion.react(correct ? 'correct' : 'wrong');

      const fb = document.getElementById('feedback');
      const reveal = (id, icon, label, inner) => `
        <button class="rc-reveal reveal-sol" data-target="${id}" aria-expanded="false">${Icon(icon)}<span>${label}</span><span class="rc-chev">${Icon('chevron')}</span></button>
        <div class="reveal-wrap" id="${id}"><div class="reveal-inner"><div class="rc-rbody">${inner}</div></div></div>`;
      fb.innerHTML = `
        <div class="rc-fb">
          <div class="rc-verdict ${correct ? 'ok' : 'no'}">${Icon(correct ? 'check' : 'x')}<span>${correct ? 'Correct' : 'Not quite'} — <em>${MathRender.inline(correctLabel)}</em></span></div>

          <div class="rc-reveals">
            ${reveal('rv-cue', 'gist', 'Why this one', `${MathRender.inline(archetype.recognitionCue || '')}`)}
            ${(archetype.methodPlan || []).length ? reveal('rv-method', 'example', 'Steps', `<ol class="method-plan" style="margin:0;padding-left:18px;">${archetype.methodPlan.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>`) : ''}
            ${archetype.answer ? reveal('rv-ans', 'check', 'Answer', `${MathRender.inline(archetype.answer)}`) : ''}
            ${reveal('rv-kb', 'keyboard', 'Work it out', '<div id="workout-host"></div>')}
          </div>

          ${!correct ? errorTagPickerHtml() : ''}

          <div class="rc-actions">
            ${correct ? `
              <div class="rc-rate">
                <button data-q="1">Hard</button>
                <button data-q="2">Good</button>
                <button data-q="3">Easy</button>
              </div>` : `<button class="rc-go" id="continue-btn">Continue</button>`}
          </div>
          <div class="rc-sub"><button id="note-q">${Icon('plus')} Save to notes</button></div>
        </div>
      `;

      fb.querySelectorAll('.reveal-sol').forEach((btn) => btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.target);
        const open = el.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (btn.dataset.target === 'rv-kb' && open && !document.querySelector('#workout-host .mk-wrap')) {
          document.getElementById('workout-host').appendChild(window.MathKeyboard.create({ initial: '' }).el);
        }
      }));
      document.getElementById('note-q').addEventListener('click', () => {
        window.saveToNotes(`Q: ${archetype.example}`, correctLabel);
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
        await Progress.award(correct);   // keeps internal counters; no XP shown
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

    const renderSummary = async () => {
      if (opts.onComplete) { try { opts.onComplete(); } catch (e) {} }   // hall enters Reflection
      const integ = (await Observatory.state()).integrity;
      const rows = [
        strengthened.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${strengthened.size}</span><span>concept${strengthened.size === 1 ? '' : 's'} strengthened</span></div>` : '',
        corrected.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${corrected.size}</span><span>misconception${corrected.size === 1 ? '' : 's'} corrected</span></div>` : '',
        slipped.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${slipped.size}</span><span>noted to revisit</span></div>` : '',
      ].join('');
      root.innerHTML = `
        <div class="rc-done">
          <div class="rc-kick kicker">Today's discoveries</div>
          <div class="rc-disc">${rows || `<div class="rc-disc-row"><span class="rc-disc-n">${sessionCorrect}</span><span>recognized</span></div>`}</div>
          <div class="rc-ask" style="margin-top:18px;">Structural integrity ${integ.pct}% · ${integ.held} skills held solid</div>

          <a class="rc-go" href="#/drill" style="margin-top:26px;">Continue</a>
          <div class="rc-sub" style="justify-content:center;"><a href="#/home" style="color:var(--ink-faint);text-decoration:none;">Back to the observatory</a></div>
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
    <div class="rc-slip">
      <div class="kicker" style="margin-bottom:10px;">What kind of slip?</div>
      <div class="error-tag-row">
        ${types.map(([v, l]) => `<button type="button" class="error-tag" data-type="${v}">${l}</button>`).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
window.escapeHtml = window.escapeHtml || escapeHtml;
