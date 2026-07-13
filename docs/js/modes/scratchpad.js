// Standalone calculus keyboard / formula pad. Also the place the "work it out"
// answer flow reuses. Fully offline — no evaluation, it's a typesetting scratchpad
// so you can write solutions with proper structure while you drill.

window.ScratchpadMode = {
  async render(root) {
    root.innerHTML = `
      <div class="card">
        <h2>Scratchpad</h2>
        <p class="small">A calculus keyboard for writing expressions with proper structure — fractions, integrals, powers, roots, Greek letters. Everything you build renders live above the keys.</p>
        <div id="kb-host"></div>
      </div>
      <div class="card">
        <h3>Tips</h3>
        <ul class="small" style="padding-left:18px;margin:0;">
          <li>Template keys (fraction, √, xⁿ, ∫, lim, Σ) drop a <strong>□ box</strong> and put the cursor inside it — type the box's contents, then use → to step out.</li>
          <li>⌫ deletes the last symbol (or a whole function like <em>sin</em>) at the cursor.</li>
          <li>Use the tabs (123 · f(x) · sin · αβ) to switch key sets.</li>
        </ul>
      </div>
    `;
    const kb = window.MathKeyboard.create({ initial: '' });
    document.getElementById('kb-host').appendChild(kb.el);
  },
};
