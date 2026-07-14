// Swipe flashcards — tap to flip, swipe (or tap buttons) to rate. Low friction.

function fcShuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

async function buildDeck(limit = 16) {
  const microSkills = await DB.getAll('microSkills');
  const arch = await DB.getAll('archetypes');
  await Priority.load();
  const archBySkill = {};
  arch.forEach((a) => (archBySkill[a.microSkillId] = archBySkill[a.microSkillId] || []).push(a));
  const cards = [];
  microSkills.forEach((ms) => {
    (ms.formulas || []).slice(0, 1).forEach((f) => cards.push({ kicker: 'Formula · ' + (ms.topic || ''), front: ms.microSkill, back: MathRender.block(f), section: ms.section }));
    const a = (archBySkill[ms.id] || [])[0];
    if (a && a.recognitionCue) cards.push({ kicker: 'Concept · ' + (ms.subtopic || ms.topic || ''), front: ms.microSkill, back: MathRender.inline(a.recognitionCue), section: ms.section });
  });
  // prioritise exam sections, then shuffle within
  const pri = Priority.prioritize(cards.map((c, i) => ({ id: i, section: c.section }))).map((x) => cards[x.id]);
  return fcShuffle(pri.slice(0, Math.max(limit, 24))).slice(0, limit);
}

window.FlashcardsMode = {
  async render(root, sub) {
    // #/flashcards/ext runs a deck handed over by another mode (e.g. Memorize)
    let deck;
    if (sub && sub[0] === 'ext' && window.__extDeck && window.__extDeck.length) deck = window.__extDeck;
    else deck = await buildDeck(16);
    this.runDeck(root, deck);
  },

  runDeck(root, deck) {
    if (!deck.length) { root.innerHTML = '<div class="card">No cards yet.</div>'; return; }
    let idx = 0, rated = 0, known = 0;

    const shell = () => {
      root.innerHTML = `
        <div class="flex-between" style="margin:2px 4px 6px;">
          <span class="small">Card ${Math.min(idx + 1, deck.length)} of ${deck.length}</span>
          <span class="mini-chip level">${Icon('check')} ${known} known</span>
        </div>
        <div class="deck" id="deck"></div>
        <div class="deck-actions">
          <button class="btn btn-secondary" id="btn-again">${Icon('back')} Review</button>
          <button class="btn btn-secondary" id="btn-flip">Flip</button>
          <button class="btn btn-primary" id="btn-know">Got it ${Icon('check')}</button>
        </div>`;
      document.getElementById('btn-again').addEventListener('click', () => rate(false));
      document.getElementById('btn-know').addEventListener('click', () => rate(true));
      document.getElementById('btn-flip').addEventListener('click', () => flip());
      showCard();
    };

    let flipped = false;
    const showCard = () => {
      const deckEl = document.getElementById('deck');
      if (idx >= deck.length) return finish();
      const c = deck[idx];
      flipped = false;
      deckEl.innerHTML = `
        <div class="swipe-card" id="card">
          <div class="sc-badge know">GOT IT</div><div class="sc-badge again">REVIEW</div>
          <div class="sc-kicker">${escapeHtml(c.kicker)}</div>
          <div class="sc-front" id="card-content">${MathRender.inline(c.front)}</div>
          <div class="sc-hint" id="card-hint">tap to flip · swipe to rate</div>
        </div>`;
      attachDrag(document.getElementById('card'));
    };

    const flip = () => {
      const c = deck[idx];
      flipped = !flipped;
      document.getElementById('card-content').innerHTML = flipped ? c.back : MathRender.inline(c.front);
      document.getElementById('card-hint').textContent = flipped ? 'swipe → got it · ← review' : 'tap to flip · swipe to rate';
    };

    const rate = async (know) => {
      rated += 1; if (know) known += 1;
      const r = await Progress.award(know, know ? 6 : 3);
      if (r.leveledUp) Companion.celebrate(`Level ${r.state.level}!`);
      idx += 1;
      showCard();
      const chip = root.querySelector('.mini-chip.level');
      if (chip) chip.innerHTML = `${Icon('check')} ${known} known`;
      const counter = root.querySelector('.small');
      if (counter) counter.textContent = `Card ${Math.min(idx + 1, deck.length)} of ${deck.length}`;
    };

    const attachDrag = (card) => {
      let sx = 0, sy = 0, dx = 0, dragging = false, moved = false;
      const know = card.querySelector('.sc-badge.know');
      const again = card.querySelector('.sc-badge.again');
      const down = (x, y) => { sx = x; sy = y; dragging = true; moved = false; card.style.transition = 'none'; };
      const move = (x, y) => {
        if (!dragging) return;
        dx = x - sx; const dy = y - sy;
        if (Math.abs(dx) > 6) moved = true;
        card.style.transform = `translate(${dx}px, ${dy * 0.2}px) rotate(${dx * 0.05}deg)`;
        know.style.opacity = dx > 0 ? Math.min(1, dx / 90) : 0;
        again.style.opacity = dx < 0 ? Math.min(1, -dx / 90) : 0;
      };
      const up = () => {
        if (!dragging) return; dragging = false;
        card.style.transition = 'transform .3s var(--ease-out)';
        if (Math.abs(dx) > 90) {
          const dir = dx > 0 ? 1 : -1;
          card.style.transform = `translate(${dir * 500}px, 0) rotate(${dir * 20}deg)`;
          setTimeout(() => rate(dir > 0), 180);
        } else {
          card.style.transform = '';
          know.style.opacity = 0; again.style.opacity = 0;
          if (!moved) flip();
        }
        dx = 0;
      };
      card.addEventListener('pointerdown', (e) => { card.setPointerCapture(e.pointerId); down(e.clientX, e.clientY); });
      card.addEventListener('pointermove', (e) => move(e.clientX, e.clientY));
      card.addEventListener('pointerup', up);
      card.addEventListener('pointercancel', up);
    };

    const finish = () => {
      Companion.celebrate('Deck done! Proud of you.');
      root.innerHTML = `
        <div class="card" style="text-align:center;">
          <h2>Deck complete</h2>
          <p class="small">${known} of ${deck.length} marked known.</p>
          <div class="btn-block-list">
            <button class="btn btn-primary" id="again-deck">New deck</button>
            <a class="btn btn-secondary" href="#/home">Back home</a>
          </div>
        </div>`;
      document.getElementById('again-deck').addEventListener('click', () => this.render(root));
    };

    shell();
  },
};
