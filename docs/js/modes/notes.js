// Notes — jot questions/thoughts that pop up, optionally with the calculus keyboard.

window.NotesMode = {
  async render(root) {
    const notes = await DB.getNotes();
    root.innerHTML = `
      <div class="card">
        <h2>My notes</h2>
        <p class="small">Capture a question or idea the moment it pops up. Add math with the keyboard.</p>
        <textarea id="note-input" rows="3" placeholder="e.g. why does the ratio test fail when L=1?"></textarea>
        <div id="note-kb-host" style="margin-top:8px;"></div>
        <div class="btn-block-list" style="margin-top:10px;">
          <button class="btn btn-secondary" id="note-kb-toggle">${Icon('keyboard')} Add math</button>
          <button class="btn btn-primary" id="note-save">${Icon('plus')} Save note</button>
        </div>
      </div>
      <div id="note-list"></div>`;

    let kb = null;
    const host = document.getElementById('note-kb-host');
    document.getElementById('note-kb-toggle').addEventListener('click', () => {
      if (kb) { host.innerHTML = ''; kb = null; return; }
      kb = window.MathKeyboard.create({ initial: '' });
      host.appendChild(kb.el);
    });

    const save = async () => {
      const text = document.getElementById('note-input').value.trim();
      const math = kb ? kb.getValue().trim() : '';
      if (!text && !math) return;
      await DB.addNote({ text, math, context: '' });
      document.getElementById('note-input').value = '';
      if (kb) { host.innerHTML = ''; kb = null; }
      Companion.say('Saved!', 'happy', 1400);
      this.renderList(document.getElementById('note-list'));
    };
    document.getElementById('note-save').addEventListener('click', save);

    this.renderList(document.getElementById('note-list'));
  },

  async renderList(el) {
    const notes = await DB.getNotes();
    if (!notes.length) { el.innerHTML = '<p class="small" style="text-align:center;padding:20px;">No notes yet.</p>'; return; }
    el.innerHTML = `<div class="section-title">${Icon('notebook')} Saved (${notes.length})</div>` + notes.map((n) => `
      <div class="note">
        ${n.context ? `<div class="note-context">${escapeHtml(n.context)}</div>` : ''}
        ${n.text ? `<div>${escapeHtml(n.text)}</div>` : ''}
        ${n.math ? `<div class="example-block" style="margin-top:6px;">${window.katex ? katexSafe(n.math) : escapeHtml(n.math)}</div>` : ''}
        <div class="note-meta">
          <span class="note-date">${new Date(n.created).toLocaleDateString()} · ${new Date(n.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button class="note-del" data-id="${n.id}" aria-label="Delete">${Icon('x')}</button>
        </div>
      </div>`).join('');
    el.querySelectorAll('.note-del').forEach((b) => b.addEventListener('click', async () => {
      await DB.deleteNote(Number(b.dataset.id));
      this.renderList(el);
    }));
  },
};

function katexSafe(latex) {
  try { return window.katex.renderToString(latex, { throwOnError: false, displayMode: true }); }
  catch (e) { return escapeHtml(latex); }
}

// Helper other modes can call to save a question straight to notes.
window.saveToNotes = async function (text, context) {
  await DB.addNote({ text, math: '', context: context || '' });
  if (window.Companion) Companion.say('Added to notes!', 'happy', 1500);
};
