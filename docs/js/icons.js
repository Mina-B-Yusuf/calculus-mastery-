// Inline line-icon set (no emoji). Consistent 24px grid, 1.75 stroke, currentColor.
// Usage: Icon('gist')  ->  '<svg ...>...</svg>'
(function () {
  const P = {
    home: '<path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-5h5v5"/>',
    concepts: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5A1.5 1.5 0 0 1 20 20.5z"/>',
    recognize: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    exam: '<path d="M7 3h7l4 4v14H7z" transform="translate(-1 0)"/><path d="M13 3v4h4"/><path d="M8 12h6M8 15.5h6"/>',
    more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    gist: '<path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z"/><path d="M9.5 20.5h5M10.5 22.5h3"/>',
    definition: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v15.5H6a2 2 0 0 0-2 2z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12"/><path d="M12 4v15.5"/>',
    theorem: '<path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z"/><path d="M9.2 12.2 11 14l4-4.2"/>',
    formula: '<path d="M14 5h-2.2A1.8 1.8 0 0 0 10 6.8V9m-2.5 0h5"/><path d="M8 19c1.6 0 2-1.2 2-3v-7"/><path d="M13.5 12.5l5 6M18.5 12.5l-5 6"/>',
    example: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
    trap: '<path d="M12 4 2.8 20h18.4z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.6" r=".3" fill="currentColor"/>',
    drill: '<path d="M13 3 5 13h5l-1 8 8-11h-5z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    forward: '<path d="M9 5l7 7-7 7"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none"/>',
    keyboard: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="2.6" height="5" rx="1" fill="currentColor" stroke="none"/><rect x="12" y="8" width="2.6" height="9" rx="1" fill="currentColor" stroke="none"/><rect x="17" y="5" width="2.6" height="12" rx="1" fill="currentColor" stroke="none"/>',
    notebook: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 3v18M12 8h4M12 12h4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 7l1.9 1.1M17.9 15.9l1.9 1.1M4.2 17l1.9-1.1M17.9 8.1l1.9-1.1"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5 9 15M15 9l2.5-2.5"/>',
    map: '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
    book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 1 6.5 18H19v3H6.5A1.5 1.5 0 0 1 5 19.5z"/>',
    formulas: '<path d="M14 5h-2.2A1.8 1.8 0 0 0 10 6.8V9m-2.5 0h5"/><path d="M8 19c1.6 0 2-1.2 2-3v-7"/>',
    integral: '<path d="M15 5.5c0-1.4-.9-2.5-2.2-2.5C11 3 10.5 4.4 10.3 6L8.8 18c-.2 1.6-.7 3-2.5 3-1.3 0-2.2-1.1-2.2-2.5" transform="translate(2 0)"/>',
    flame: '<path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-1.7 1-3 1-3s.5 1.5 2 2c0-2 2-5 2-8Z"/>',
    cards: '<rect x="3" y="7" width="13" height="14" rx="2.5"/><path d="M7.5 4.2 18 2.1a2 2 0 0 1 2.4 1.6l2 11"/><path d="M7 12h5M7 15.5h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
    trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/><path d="M12 13v4M9 21h6M10 17h4"/>',
    bolt: '<path d="M13 3 5 13h5l-1 8 8-11h-5z"/>',
  };

  function Icon(name, cls) {
    const body = P[name] || P.spark;
    // width/height default to ~text size; component CSS (.btn svg, .callout-icon svg, …) overrides.
    return `<svg class="icon ${cls || ''}" width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }
  window.Icon = Icon;
})();
