// Simple "More" menu — houses the secondary tools so the bottom tab bar stays lean.

window.MoreMode = {
  async render(root) {
    const items = [
      ['⌨️', 'Scratchpad', 'Calculus keyboard for writing expressions', '#/scratchpad'],
      ['📊', 'Weakness Radar', 'Mastery per chapter', '#/radar'],
      ['📓', 'Error Notebook', 'Your mistakes, categorized', '#/errors'],
      ['⚙️', 'Settings', 'Offline content, backup, reset', '#/settings'],
    ];
    root.innerHTML = `
      <div class="card"><h2>More</h2></div>
      <div class="btn-block-list">
        ${items.map(([icon, title, sub, href]) => `
          <a class="card" style="display:flex;gap:12px;align-items:center;text-decoration:none;color:inherit;margin-bottom:0;" href="${href}">
            <span style="font-size:1.6rem;">${icon}</span>
            <span><strong>${title}</strong><br><span class="small">${sub}</span></span>
          </a>
        `).join('')}
      </div>
    `;
  },
};
