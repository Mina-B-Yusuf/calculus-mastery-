// The geography of ideas. Chapters are not identities — places are. Each domain
// is named for the mathematical idea it embodies; the textbook chapter is kept
// only as a quiet subtitle for orientation.

(function () {
  const PLACES = {
    P: { name: 'The Groundwork', idea: 'the plane itself' },
    1: { name: 'The Approach', idea: 'limits & continuity' },
    2: { name: 'The Tangent Gallery', idea: 'the derivative' },
    3: { name: 'The Mirror Hall', idea: 'inverse & transcendental functions' },
    4: { name: 'The Optimization Atrium', idea: 'extrema & shape' },
    5: { name: 'The Hall of Accumulation', idea: 'the integral' },
    6: { name: 'The Transformation Workshop', idea: 'techniques of integration' },
    7: { name: 'The Volume Foundry', idea: 'applications of the integral' },
    8: { name: 'The Armillary', idea: 'conics, parametric & polar' },
    9: { name: 'The Convergence Observatory', idea: 'sequences & series' },
  };
  const DEFAULT = { name: 'The Observatory', idea: '' };

  function place(chapter) { return PLACES[String(chapter)] || DEFAULT; }
  function placeName(chapter) { return place(chapter).name; }

  window.Geography = { place, placeName, PLACES };
})();
