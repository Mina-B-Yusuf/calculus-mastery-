// The observatory's instruments — the secondary tools, kept off the main tab bar
// but presented as part of the place, not as a phone's settings drawer. An
// editorial header, then grouped hairline rows, each instrument named for what
// it does for the learner.

window.MoreMode = {
  async render(root) {
    const groups = [
      ['Daily practice', [
        ['bolt', 'Speed round', '60 seconds of rapid recognition', '#/speed'],
        ['cards', 'Flashcards', 'Concepts & formulas, one swipe at a time', '#/flashcards'],
        ['formulas', 'Formula memory', 'Recall each formula from its blanks', '#/formula'],
      ]],
      ['Memory & reference', [
        ['star', 'The essentials', 'Derivatives, theorems and series worth knowing cold', '#/memorize'],
        ['notebook', 'My notes', 'Questions and ideas you set aside', '#/notes'],
        ['keyboard', 'Scratchpad', 'A calculus keyboard for working things out', '#/scratchpad'],
      ]],
      ['The observatory', [
        ['chart', 'Structural status', 'The standing of each hall', '#/radar'],
        ['notebook', 'Recurring cracks', 'The mistakes that keep returning, sorted', '#/errors'],
      ]],
      ['', [
        ['settings', 'Settings', 'Offline content, backup and reset', '#/settings'],
      ]],
    ];

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">tools</div>
        <div class="fg">
          <div class="kicker">Instruments</div>
          <div class="display">The workshop</div>
          <div class="lede">Everything the halls don't need front and centre — the ways of practising, remembering, and taking the observatory's measure.</div>
        </div>
      </div>
      ${groups.map(([label, items]) => `
        ${label ? `<div class="kicker" style="margin:26px 2px 2px;">${label}</div>` : '<div style="height:20px;"></div>'}
        <div class="cx-list">
          ${items.map(([icon, title, sub, href]) => `
            <a class="cx-row" href="${href}">
              <span class="cx-ico">${Icon(icon)}</span>
              <span class="cx-main"><span class="cx-title">${title}</span><span class="cx-sub">${sub}</span></span>
              <span class="cx-chev">${Icon('chevron')}</span>
            </a>`).join('')}
        </div>
      `).join('')}
    `;
  },
};
