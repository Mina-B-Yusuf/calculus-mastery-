window.ErrorNotebookMode = {
  async render(root) {
    const attempts = await DB.getAllAttempts();
    const wrong = attempts.filter((a) => !a.correct);

    const byType = {};
    wrong.forEach((a) => {
      const t = a.errorType || 'untagged';
      byType[t] = byType[t] || { count: 0, last: 0 };
      byType[t].count += 1;
      byType[t].last = Math.max(byType[t].last, a.timestamp || 0);
    });

    const microSkills = Object.fromEntries((await DB.getAll('microSkills')).map((m) => [m.id, m]));
    const bySkill = {};
    wrong.forEach((a) => {
      bySkill[a.microSkillId] = bySkill[a.microSkillId] || { count: 0, last: 0 };
      bySkill[a.microSkillId].count += 1;
      bySkill[a.microSkillId].last = Math.max(bySkill[a.microSkillId].last, a.timestamp || 0);
    });

    const typeRows = Object.entries(byType)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([type, v]) => `
        <li><strong>${window.labelForErrorType(type)}</strong> — ${v.count} times
          <span class="small">· last ${daysAgo(v.last)}</span></li>
      `).join('') || '<li class="small">No mistakes logged yet.</li>';

    const skillRows = Object.entries(bySkill)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([id, v]) => `
        <li>${escapeHtml(microSkills[id] ? microSkills[id].microSkill : id)} — ${v.count} times
          <span class="small">· last ${daysAgo(v.last)}</span></li>
      `).join('') || '<li class="small">No mistakes logged yet.</li>';

    root.innerHTML = `
      <div class="card">
        <h2>Error notebook</h2>
        <p class="small">Not "wrong" — categorized. Fix the pattern, not just the problem.</p>
      </div>
      <div class="card">
        <h3>By mistake type</h3>
        <ul style="padding-left:18px;margin:0;">${typeRows}</ul>
      </div>
      <div class="card">
        <h3>Most-missed micro-skills</h3>
        <ul style="padding-left:18px;margin:0;">${skillRows}</ul>
      </div>
    `;
  },
};

function daysAgo(ts) {
  if (!ts) return 'never';
  const d = Math.floor((Date.now() - ts) / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return 'yesterday';
  return `${d} days ago`;
}
