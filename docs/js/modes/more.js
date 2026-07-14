// Simple "More" menu — houses the secondary tools so the bottom tab bar stays lean.

window.MoreMode = {
  async render(root) {
    const items = [
      ['bolt', 'Speed round', '60-second rapid-fire recognition', '#/speed'],
      ['cards', 'Flashcards', 'Swipe through concepts & formulas', '#/flashcards'],
      ['star', 'Memorize', 'Must-know derivatives, theorems, series…', '#/memorize'],
      ['notebook', 'My Notes', 'Questions & ideas you saved', '#/notes'],
      ['formulas', 'Formula Memory', 'Fill-in-the-blank formula recall', '#/formula'],
      ['keyboard', 'Scratchpad', 'Calculus keyboard for writing expressions', '#/scratchpad'],
      ['chart', 'Observatory Status', 'Structural integrity of each hall', '#/radar'],
      ['notebook', 'Error Notebook', 'Recurring cracks, categorized', '#/errors'],
      ['settings', 'Settings', 'Offline content, backup, reset', '#/settings'],
    ];
    root.innerHTML = `
      <div class="card"><h2>More</h2></div>
      <div class="btn-block-list">
        ${items.map(([icon, title, sub, href]) => `
          <a class="card menu-row" href="${href}">
            <span class="menu-ico">${Icon(icon)}</span>
            <span style="flex:1;"><strong>${title}</strong><br><span class="small">${sub}</span></span>
            <span class="leaf-chevron">${Icon('chevron')}</span>
          </a>
        `).join('')}
      </div>
    `;
  },
};
