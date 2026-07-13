async function computeHomeStats() {
  const [archetypes, attempts] = await Promise.all([DB.getAll('archetypes'), DB.getAllAttempts()]);
  const dueDrill = await SRS.getDueItems('archetype', 500);
  const allFormulaIds = (await DB.getAll('microSkills')).flatMap((ms) => ms.formulas.map((_, i) => `${ms.id}::${i}`));
  const dueFormula = await SRS.getDueItems('formula', 500);
  const newFormulaCount = allFormulaIds.length - (await DB.getAllSrs()).filter((r) => r.kind === 'formula').length;

  const bySkill = {};
  for (const a of attempts) {
    bySkill[a.microSkillId] = bySkill[a.microSkillId] || { total: 0, correct: 0 };
    bySkill[a.microSkillId].total += 1;
    if (a.correct) bySkill[a.microSkillId].correct += 1;
  }
  const microSkills = await DB.getAll('microSkills');
  const weakest = microSkills
    .map((ms) => {
      const s = bySkill[ms.id];
      const mastery = s && s.total >= 2 ? s.correct / s.total : null;
      return { ms, mastery, attempts: s ? s.total : 0 };
    })
    .filter((x) => x.mastery !== null)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);

  const recentErrorTypes = {};
  attempts.filter((a) => !a.correct && a.errorType).forEach((a) => {
    recentErrorTypes[a.errorType] = (recentErrorTypes[a.errorType] || 0) + 1;
  });
  const topError = Object.entries(recentErrorTypes).sort((a, b) => b[1] - a[1])[0];

  return {
    totalArchetypes: archetypes.length,
    totalAttempts: attempts.length,
    dueDrillCount: dueDrill.length,
    dueFormulaCount: dueFormula.length + Math.max(0, newFormulaCount),
    weakest,
    topError,
  };
}

window.HomeMode = {
  async render(root) {
    const stats = await computeHomeStats();
    const weakestHtml = stats.weakest.length
      ? stats.weakest.map((w) => `
          <li>${w.ms.microSkill} <span class="small">(${Math.round(w.mastery * 100)}% over ${w.attempts} tries)</span></li>
        `).join('')
      : '<li class="small">Do a few drills first — weak spots show up here.</li>';

    root.innerHTML = `
      <div class="card">
        <h2>Today's session</h2>
        <div class="stat-row">
          <div class="stat-tile"><div class="num">${stats.dueDrillCount}</div><div class="label">recognition due</div></div>
          <div class="stat-tile"><div class="num">${stats.dueFormulaCount}</div><div class="label">formulas due</div></div>
          <div class="stat-tile"><div class="num">${stats.totalAttempts}</div><div class="label">total reps</div></div>
        </div>
      </div>

      <div class="btn-block-list">
        <a class="btn btn-primary" href="#/drill" style="text-decoration:none;display:block;text-align:center;">Start Recognition Drill</a>
        <a class="btn btn-secondary" href="#/formula" style="text-decoration:none;display:block;text-align:center;">Formula Memory</a>
      </div>

      <div class="card" style="margin-top:14px;">
        <h3>Weakest micro-skills</h3>
        <ul style="padding-left:18px;margin:0;">${weakestHtml}</ul>
      </div>

      ${stats.topError ? `
      <div class="card">
        <h3>Most frequent mistake type</h3>
        <p class="small" style="margin:0;">${labelForErrorType(stats.topError[0])} — ${stats.topError[1]} times. <a href="#/errors">See error notebook →</a></p>
      </div>` : ''}
    `;
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
