// Observatory Status — a maintenance report. This view is a CLIENT of the
// Observatory simulation: it reads state, it does not compute it.

window.RadarMode = {
  async render(root) {
    const st = await Observatory.state();
    const integ = st.integrity;

    const list = (arr) => arr.map((n) => `<li>${escapeHtml(n)}</li>`).join('');
    const stateCls = { Sound: 'st-sound', Settling: 'st-settling', Unstable: 'st-unstable', Unbuilt: 'st-unbuilt' };

    const rows = Object.keys(st.halls)
      .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
      .map((c) => {
        const h = st.halls[c];
        const place = Geography.placeName(c);
        const note = h.introduced === 0
          ? 'not yet visited'
          : `${Math.round(h.accumulationCompleteness * 100)}% restored${h.unresolvedCracks ? ` · ${h.unresolvedCracks} crack${h.unresolvedCracks === 1 ? '' : 's'}` : ''}`;
        return `<div class="os-row">
          <span class="os-place">${escapeHtml(place)}</span>
          <span class="os-note">${note}</span>
          <span class="os-state ${stateCls[h.word]}">${h.word}</span>
        </div>`;
      }).join('');

    root.innerHTML = `
      <div class="editorial">
        <div class="ghost-word">status</div>
        <div class="fg">
          <div class="kicker">Observatory status · ${escapeHtml(st.presence)}</div>
          <div class="display">Structural integrity ${integ.pct}%</div>
          <div class="lede">${integ.held} of ${integ.total} skills hold the structure${st.bridges ? ` · ${st.bridges} bridge${st.bridges === 1 ? '' : 's'} formed` : ''}. The observatory is restored by understanding, not by points.</div>
        </div>
      </div>

      ${integ.stabilized.length ? `<div class="kicker os-head">Recently stabilised</div><ul class="os-tags os-good">${list(integ.stabilized)}</ul>` : ''}
      ${integ.inspect.length ? `<div class="kicker os-head">Inspection recommended</div><ul class="os-tags os-bad">${list(integ.inspect)}</ul>` : ''}

      <div class="kicker os-head">The halls</div>
      <div class="os-list">${rows}</div>

      <a class="os-link" href="#/errors">${Icon('notebook')} Recurring cracks — the error notebook</a>
    `;
  },
};
