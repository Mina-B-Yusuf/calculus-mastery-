function masteryColor(m) {
  if (m === null) return 'var(--border)';
  if (m < 0.5) return 'var(--bad)';
  if (m < 0.75) return 'var(--warn)';
  return 'var(--good)';
}

async function computeTopicMastery() {
  const [microSkills, attempts] = await Promise.all([DB.getAll('microSkills'), DB.getAllAttempts()]);
  const bySkill = {};
  attempts.forEach((a) => {
    bySkill[a.microSkillId] = bySkill[a.microSkillId] || { total: 0, correct: 0 };
    bySkill[a.microSkillId].total += 1;
    if (a.correct) bySkill[a.microSkillId].correct += 1;
  });

  const byChapter = {};
  microSkills.forEach((ms) => {
    const key = `${ms.chapter}·${ms.chapterTitle}`;
    byChapter[key] = byChapter[key] || { total: 0, correct: 0, attempted: 0, skillCount: 0 };
    byChapter[key].skillCount += 1;
    const s = bySkill[ms.id];
    if (s) {
      byChapter[key].total += s.total;
      byChapter[key].correct += s.correct;
      byChapter[key].attempted += 1;
    }
  });

  return Object.entries(byChapter)
    .map(([key, v]) => ({
      key,
      mastery: v.total > 0 ? v.correct / v.total : null,
      coverage: v.skillCount ? v.attempted / v.skillCount : 0,
      reps: v.total,
    }))
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
}

window.RadarMode = {
  async render(root) {
    const topics = await computeTopicMastery();
    const rows = topics.map((t) => {
      const pct = t.mastery === null ? 0 : Math.round(t.mastery * 100);
      const label = t.key.split('·')[1] || t.key;
      return `
        <div class="radar-row">
          <div class="radar-label"><span>${escapeHtml(label)}</span><span class="small">${t.mastery === null ? 'not started' : `${pct}% (${t.reps} reps)`}</span></div>
          <div class="radar-bar"><div style="width:${pct}%;background:${masteryColor(t.mastery)}"></div></div>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      <div class="card">
        <h2>Weakness radar</h2>
        <p class="small">Mastery per chapter, based on your recognition &amp; formula reps. Red = focus here first.</p>
        ${rows || '<p class="small">No attempts yet — do a drill to populate this.</p>'}
      </div>
      <div class="card">
        <a href="#/errors" class="small" style="color:var(--accent);">Open Error Notebook →</a>
      </div>
    `;
  },
};
