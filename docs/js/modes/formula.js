function splitFormula(f) {
  const eqIdx = f.indexOf('=');
  if (eqIdx > -1 && eqIdx < f.length - 1) {
    return { lhs: f.slice(0, eqIdx).trim(), rhs: f.slice(eqIdx + 1).trim(), hasEq: true };
  }
  return { lhs: f, rhs: '', hasEq: false };
}

async function buildFormulaSession(limit = 15) {
  const microSkills = await DB.getAll('microSkills');
  const allFormulas = [];
  microSkills.forEach((ms) => {
    (ms.formulas || []).forEach((f, i) => {
      allFormulas.push({ id: `${ms.id}::${i}`, text: f, microSkill: ms });
    });
  });
  const ids = await SRS.getNewOrDueIds('formula', shuffle(allFormulas.map((f) => f.id)), limit);
  const byId = Object.fromEntries(allFormulas.map((f) => [f.id, f]));
  return ids.map((id) => byId[id]).filter(Boolean);
}

window.FormulaMode = {
  async render(root) {
    const session = await buildFormulaSession(15);
    if (!session.length) {
      root.innerHTML = `<div class="card"><h2>All caught up 🎉</h2><p class="small">No formulas due for review right now.</p></div>`;
      return;
    }
    let idx = 0;

    const renderCard = () => {
      const item = session[idx];
      const { lhs, rhs, hasEq } = splitFormula(item.text);
      const blankSide = Math.random() < 0.5 ? 'rhs' : 'lhs';
      const shown = hasEq
        ? (blankSide === 'rhs' ? `${lhs} = _______` : `_______ = ${rhs}`)
        : `${item.text.slice(0, Math.floor(item.text.length * 0.6))}_______`;

      root.innerHTML = `
        <div class="progressbar"><div style="width:${(idx / session.length) * 100}%"></div></div>
        <p class="small">Formula ${idx + 1} of ${session.length} · ${escapeHtml(item.microSkill.topic || '')}</p>
        <div class="card">
          <h2>Fill in the blank</h2>
          <div class="example-block">${escapeHtml(shown)}</div>
          <button class="btn btn-primary" id="reveal-btn">Reveal</button>
          <div id="answer-area"></div>
        </div>
      `;
      document.getElementById('reveal-btn').addEventListener('click', () => {
        document.getElementById('answer-area').innerHTML = `
          <div class="example-block">${escapeHtml(item.text)}</div>
          <p class="small">How well did you know it?</p>
          <div class="btn-block-list">
            <button class="btn-choice" data-q="0">Forgot it</button>
            <button class="btn-choice" data-q="1">Hard</button>
            <button class="btn-choice" data-q="2">Good</button>
            <button class="btn-choice" data-q="3">Easy</button>
          </div>
        `;
        document.getElementById('reveal-btn').remove();
        document.querySelectorAll('#answer-area [data-q]').forEach((btn) => {
          btn.addEventListener('click', async () => {
            const q = Number(btn.dataset.q);
            await SRS.recordReview('formula', item.id, q);
            await DB.recordAttempt({
              archetypeId: null,
              microSkillId: item.microSkill.id,
              mode: 'formula',
              correct: q > 0,
            });
            idx += 1;
            if (idx >= session.length) renderSummary();
            else renderCard();
          });
        });
      });
    };

    const renderSummary = () => {
      root.innerHTML = `
        <div class="card">
          <h2>Formula review complete</h2>
          <p class="small">Reviewed ${session.length} formulas. Weak ones will come back sooner.</p>
          <div class="btn-block-list">
            <a class="btn btn-primary" href="#/formula" style="text-decoration:none;display:block;text-align:center;">Go again</a>
            <a class="btn btn-secondary" href="#/home" style="text-decoration:none;display:block;text-align:center;">Back home</a>
          </div>
        </div>
      `;
    };

    renderCard();
  },
};
