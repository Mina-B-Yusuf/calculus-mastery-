# Working in this repository

**Read [`CANON.md`](CANON.md) first — it is supreme and immutable — then
[`PHILOSOPHY.md`](PHILOSOPHY.md), the design constitution, and
[`ANTI_PATTERNS.md`](ANTI_PATTERNS.md), the compromise catcher.** Obey all three;
they outrank convenience and habit.

*Don't build an app that teaches calculus. Build a place mathematicians would
recognise as home, then let calculus happen inside it.*

The north star: *mathematics should feel like a place, not like software.* If a
change makes it feel like software, delete it. Frozen and not to be reinvented:
the Constitution, the interaction grammar (Arrival → Study → Reflection), and the
observatory physics (one simulation, many renderers — a renderer never invents
state). No hall begins in code: Meaning → Metaphor → Emotional vocabulary →
Simulation → Renderer (Three.js is the last step).

The one law: *everything the user sees is a physical manifestation of
mathematical understanding.* Every element must carry pedagogical, symbolic, and
aesthetic meaning **at once** — an element that satisfies only one or two is
redesigned or removed.

The four non-negotiable principles:

1. Nothing decorative.
2. The world is the interface (menus recede inside a place, return in the hub).
3. Progress is environmental (no XP / progress-bar numbers).
4. Discovery over reward.

## The app

- The shipped app is `docs/` (GitHub Pages serves it). It is an offline-first
  PWA: vanilla JS, hash routing, IndexedDB, a versioned service worker, KaTeX
  and Three.js vendored under `docs/vendor/`.
- Content (the micro-skill/archetype question bank) lives in
  `docs/data/` — the single source of truth. Bump `CACHE_VERSION` in
  `docs/service-worker.js` whenever shipped files change.
- Reliability, offline storage, and battery life outrank the artistic layer.
  The 3D world must degrade gracefully (WebGL fallback) and honour
  `prefers-reduced-motion`.
