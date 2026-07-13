window.SettingsMode = {
  async render(root) {
    const [microSkills, archetypes, attempts] = await Promise.all([
      DB.getAll('microSkills'), DB.getAll('archetypes'), DB.getAllAttempts(),
    ]);
    const chapters = [...new Set(microSkills.map((m) => `Ch. ${m.chapter} — ${m.chapterTitle}`))]
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    root.innerHTML = `
      <div class="card">
        <h2>Offline content</h2>
        <p class="small">${chapters.length} chapters · ${microSkills.length} micro-skills · ${archetypes.length} question archetypes downloaded and available offline.</p>
        <ul style="padding-left:18px;margin:0;font-size:0.85rem;">
          ${chapters.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
        </ul>
      </div>

      <div class="card">
        <h2>Progress data</h2>
        <p class="small">${attempts.length} attempts logged. Everything is stored locally on this device (IndexedDB) — nothing is uploaded anywhere.</p>
        <div class="btn-block-list">
          <button class="btn btn-secondary" id="export-btn">Export progress (JSON backup)</button>
          <label class="btn btn-secondary" style="text-align:center;display:block;">
            Import progress
            <input type="file" id="import-file" accept="application/json" style="display:none;">
          </label>
        </div>
      </div>

      <div class="card">
        <h2>Reset</h2>
        <div class="btn-block-list">
          <button class="btn btn-secondary" id="reset-progress-btn">Reset progress only</button>
          <button class="btn btn-secondary" id="reset-all-btn" style="color:var(--bad);">Erase everything &amp; re-download</button>
        </div>
      </div>

      <div class="card small">
        Calculus Mastery · built on <em>Calculus: A Complete Course, 10th Ed.</em> (Adams &amp; Essex). Works fully offline once installed.
      </div>
    `;

    document.getElementById('export-btn').addEventListener('click', async () => {
      const data = await DB.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calc-mastery-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('import-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        await DB.importAll(data);
        alert('Progress imported.');
        location.hash = '#/home';
      } catch (err) {
        alert(`Import failed: ${err.message}`);
      }
    });

    document.getElementById('reset-progress-btn').addEventListener('click', async () => {
      if (!confirm('Reset all attempts and spaced-repetition progress? Question content stays installed.')) return;
      await DB.resetProgress();
      alert('Progress reset.');
      location.hash = '#/home';
    });

    document.getElementById('reset-all-btn').addEventListener('click', async () => {
      if (!confirm('Erase everything, including downloaded content? You will need internet to re-download.')) return;
      await DB.resetEverything();
      location.reload();
    });
  },
};
