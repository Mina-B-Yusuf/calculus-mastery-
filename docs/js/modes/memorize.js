// Memorize — a curated, extensive "must-know" reference (derivatives, integrals,
// limits, identities, series, tests, theorems…). Browse, hide answers to self-test,
// or send any category straight to flashcards.

let MEM = null;

async function ensureMem() {
  if (MEM) return;
  MEM = await DataLoader.fetchJSON('data/memorize/memorize.json');
}

function toCards(items, kicker) {
  return items.map((it) => ({ kicker, front: it.q, back: it.a }));
}

function studyAsFlashcards(cards) {
  window.__extDeck = cards;
  location.hash = '#/flashcards/ext';
}

window.MemorizeMode = {
  async render(root, sub) {
    await ensureMem();
    if (sub && sub[0] === 'cat') return this.renderCategory(root, decodeURIComponent(sub[1]));

    const total = MEM.categories.reduce((n, c) => n + c.items.length, 0);
    const cats = MEM.categories.map((c) => `
      <a class="card mem-cat" href="#/memorize/cat/${encodeURIComponent(c.id)}">
        <span class="menu-ico">${Icon(c.icon || 'formulas')}</span>
        <span style="flex:1;">
          <strong>${escapeHtml(c.name)}</strong>
          <span class="small" style="display:block;">${c.items.length} to memorise · ${escapeHtml(c.blurb || '')}</span>
        </span>
        <span class="leaf-chevron">${Icon('chevron')}</span>
      </a>`).join('');

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">recall</div>
        <div class="fg">
          <div class="kicker">Memorize</div>
          <div class="display">Everything to know by heart</div>
          <div class="lede">${total} curated facts — derivatives, integrals, limits, identities, series, tests and theorems. Hide answers to test yourself, or turn any set into flashcards.</div>
        </div>
      </div>
      <button class="btn btn-primary" id="mem-all" style="margin:4px 0 14px;">${Icon('cards')} Flashcard everything (${total})</button>
      <div class="btn-block-list">${cats}</div>
    `;
    document.getElementById('mem-all').addEventListener('click', () => {
      const all = MEM.categories.flatMap((c) => toCards(c.items, c.name));
      studyAsFlashcards(all);
    });
  },

  async renderCategory(root, id) {
    const cat = MEM.categories.find((c) => c.id === id);
    if (!cat) { root.innerHTML = '<div class="card">Not found. <a href="#/memorize">Back</a></div>'; return; }

    const items = cat.items.map((it, i) => `
      <div class="mem-item" data-i="${i}">
        <div class="mem-q">${MathRender.inline(it.q)}</div>
        <div class="mem-a">${MathRender.inline(it.a)}</div>
      </div>`).join('');

    root.innerHTML = `
      <a class="crumb" href="#/memorize">${Icon('back')} All sets</a>
      <div class="editorial">
        <div class="ghost-word">${escapeHtml(String(cat.items.length))}</div>
        <div class="fg">
          <div class="kicker">Memorize</div>
          <div class="display">${escapeHtml(cat.name)}</div>
        </div>
      </div>
      <div class="flex-between" style="margin:2px 2px 12px;">
        <button class="btn-secondary" id="toggle-hide" style="width:auto;">${Icon('recognize')} Test me</button>
        <button class="btn-secondary" id="cat-cards" style="width:auto;">${Icon('cards')} Flashcards</button>
      </div>
      <div id="mem-list" class="mem-list">${items}</div>
    `;

    const list = document.getElementById('mem-list');
    let hidden = false;
    document.getElementById('toggle-hide').addEventListener('click', (e) => {
      hidden = !hidden;
      list.classList.toggle('hide-answers', hidden);
      list.querySelectorAll('.mem-item').forEach((el) => el.classList.remove('revealed'));
      e.currentTarget.innerHTML = hidden ? `${Icon('check')} Show answers` : `${Icon('recognize')} Test me`;
    });
    list.querySelectorAll('.mem-item').forEach((el) => el.addEventListener('click', () => {
      if (hidden) el.classList.toggle('revealed');
    }));
    document.getElementById('cat-cards').addEventListener('click', () => studyAsFlashcards(toCards(cat.items, cat.name)));
  },
};
