# Calculus Mastery — Design Bible & Direction
**Status: specification only. No implementation until approved.**

This is a spec, not code. It defines the visual identity, exact rules, and a home-screen
plan with three variants. We move through approval gates; nothing ships to the app until
you pick a direction.

---

## GATE 1 — Audit of the current UI

### Feels generic / cheap / disconnected (fix or remove)
1. **The ferret is pasted on, not integrated.** It floats over tiles and content, unrelated to what's on screen. (Ref critique: "hamster sticker glued to an Apple site.")
2. **Three focal objects compete on Home** — the ghosted "calculus" wordmark, the torus, and the ferret all fight for attention. A premium screen has *one* focal point.
3. **The tile grid is a dashboard.** Six colorful gradient-icon tiles read as a generic app launcher, not a "place." The critique explicitly says: no dashboard-style card grid.
4. **Gradient icon chips** (each tile's colored square) are decorative, not meaningful — six different gradients = visual noise.
5. **The torus is inert & generic.** It's attractive but it doesn't mean anything specific, doesn't react, and doesn't relate to what you're studying.
6. **Home shows too much at once** — stats, tiles, weakest list, progress. The critique wants "remove almost everything": greeting, one sculpture, today's mission, one button.

### Worth keeping
- Dark, warm palette and the **violet→pink** accent.
- **Serif display + letter-spaced kicker** typographic pairing.
- **Glass floating navigation.**
- **Hairline rules** and generous spacing.
- **KaTeX** math rendering with stacked fractions.
- **Semantic color-coded concept callouts** (gist/def/thm/…): these are meaning-bearing, keep.
- The whole **feature set & offline architecture** — untouched by this redesign.

### Verdict
Bones are good (7.5/8 per the critique). The gap is **atmosphere and hierarchy**: too many focal
elements, a launcher-style home, a decorative (not meaningful) hero, and a mascot that isn't
part of the world. This bible fixes those with rules, not vibes.

---

## GATE 2 — The Design Bible

### 1. Brand character
A **mathematical observatory**: quiet, precise, a little cosmic. It behaves like a high-end
instrument (Linear/Arc/Nothing), not an edu-app. Curiosity over cheerfulness. Calm over busy.

### 2. Emotional tone
Focused · unhurried · intriguing · trustworthy. The user should feel they've entered *a place*
that respects their attention. Never hyped, never babyish, never cluttered.

### 3. Visual principles
- **One hero per screen.** A single dominant focal object (usually the mathematical sculpture).
- **Content floats in space,** separated by hairlines and negative space — not boxed in cards.
- **Depth via light, not borders.** Soft shadow + subtle gradient, minimal outlines.
- **Type carries structure**: kicker → display → body. Math is first-class, always legible.
- **Motion is atmospheric, never decorative during work.**

### 4. Anti-principles (PROHIBITED)
- ❌ Dashboard/card grids of equal tiles.
- ❌ More than **one** dominant focal object per screen.
- ❌ More than **two** accent colors on one screen (semantic callout hues excepted, inside their own blocks).
- ❌ Thick cartoon outlines anywhere.
- ❌ Mascot on navigation, on buttons, or covering math.
- ❌ Decorative gradient chips used purely for looks.
- ❌ Text over visually noisy backgrounds.
- ❌ Any looping/decorative animation during timed or graded work.
- ❌ Random 3D shapes unrelated to the chapter.

### 5. Color system (exact)
Dark is the primary theme; light is supported.

**Dark (primary)**
- bg `#15121b`; bg-elev `#1c1826`; surface `#211b2b`; surface-2 `#2a2338`
- ink `#ece6f3`; ink-soft `#b1a6c1`; ink-faint `#7f7591`
- hairline `#2b2438` (1px, ~70% opacity)
- accent-A (violet) `#b79af0`; accent-B (pink) `#eaa6cb`; gradient = 135° A→B
- Semantic (concept blocks only): gist `#e6b45a` · def `#86a8ec` · thm `#c0a0ea` · fml `#57c3b6` · ex `#83c690` · trap `#ec93a2`

**Light**
- bg `#f6f3f7`; surface `#fffdff`; ink `#241f2c`; ink-soft `#6c6479`; hairline `#e8e1ec`
- same accents (accent-ink darkened to `#7a4fb0` for text on light)

**Rule:** on any screen, only the violet→pink accent may act as the "brand" color. Semantic hues
appear **only inside their own callout** and never as page chrome.

### 6. Typography system
- Display (serif): `"Iowan Old Style", Palatino, Georgia, ui-serif, serif` — weights 600. Used for greeting, chapter titles, hero numbers.
- Text (sans): system stack. Body 16px/1.6, small 13px/1.5.
- Kicker: 11px, 700, uppercase, letter-spacing .22em, accent-ink.
- Scale (rem): 0.72 · 0.8 · 0.9 · 1 · 1.15 · 1.5 · 2 · 2.6. Nothing between.
- Math: KaTeX; inline math never smaller than 1em of its context.
- **Prohibited:** more than 2 type sizes visible in one component; italic serif for body.

### 7. Spacing system
4-pt base. Allowed gaps: **4 · 8 · 12 · 16 · 24 · 32 · 48**. Screen side padding 16 (mobile).
Section rhythm 24–32. **Prohibited:** arbitrary values (e.g., 7px, 18px).

### 8. Grid system
Single column, max-width 720, centered. Content column 16px gutters. No multi-card grids on
Home. Lists are full-width rows separated by hairlines.

### 9. Radius system
- Surfaces/sheets: 20
- Controls/buttons: 14
- Chips/pills: 999
- Inner elements: 10
Exactly these four. **Prohibited:** mixing other radii.

### 10. Border system
Borders are hairlines only: 1px at hairline color. Used to *separate*, never to *frame* a focal
object. **Prohibited:** 2px+ borders, colored borders as decoration.

### 11. Shadow system
- soft: `0 1px 2px rgba(0,0,0,.3), 0 12px 30px -14px rgba(0,0,0,.5)`
- lift (hero/sheets): `0 2px 8px rgba(0,0,0,.4), 0 28px 56px -22px rgba(0,0,0,.7)`
Two levels only. Light theme uses violet-tinted low-alpha shadows. **Prohibited:** glows/neon.

### 12. Glass & transparency
Only the **nav bar** and transient **sheets/toasts** use glass:
`background: color-mix(surface 82%, transparent); backdrop-filter: blur(16px) saturate(1.4)`.
**Prohibited:** glass on content cards, on the hero, or stacked glass over glass.

### 13. Lighting
One implied light source, top-left. Sculpture lit top-left, shadow bottom-right. The ferret and
any 3D object obey the same light. **Prohibited:** conflicting light directions on one screen.

### 14. Motion system
- Durations: micro 120ms · standard 220ms · entrance 340ms · ambient (loops) 4–8s.
- Easing: standard `cubic-bezier(.4,0,.2,1)`; entrance `cubic-bezier(.16,1,.3,1)`.
- Ambient motion (sculpture rotation, breathing) only on idle screens.
- **PROHIBITED during timed/graded work:** any looping/ambient motion, mascot animation, sculpture rotation. Work screens are still.
- Every motion honors `prefers-reduced-motion` → static state.

### 15. Icon system
One family: current line set, 1.75 stroke, 24-grid, `currentColor`. Icons never multicolor,
never inside decorative gradient chips on Home. Nav icons are monochrome; active = accent + tint pill.

### 16. Illustration system
No spot illustrations except: (a) the mathematical sculpture, (b) the ferret. No stock shapes,
no emoji, no stickers. Any placeholder art is a neutral silhouette until a real asset exists.

### 17. Mathematical object system (the hero sculpture)
One sculpture is the hero. It is **chapter-meaningful**, not chosen for looks. Each object defines:
mathematical meaning · idle animation · touch/scroll interaction · mastery transformation ·
color behavior · reduced-motion still · low-perf fallback (static SVG).

| Chapter | Sculpture | Meaning | Idle | Mastery transform |
|---|---|---|---|---|
| P Preliminaries | Coordinate lattice / number-line field | the plane itself | slow parallax drift | lattice sharpens |
| 1 Limits | Two surfaces approaching a boundary | approach / ε-δ | gap narrows & reopens | gap closes to a clean seam |
| 2 Differentiation | Curve with a gliding tangent line | instantaneous slope | tangent slides along curve | tangent locks, curve smooths |
| 3 Transcendental | eˣ and ln surfaces crossing | inverse pair | gentle counter-rotation | curves meet at y=x |
| 4 Applications of diff. | Optimization surface, moving extremum | max/min | marker roams to peak | marker rests at the extremum |
| 5 Integration | Area filling under a curve | accumulation | area sweeps L→R and resets | region fills fully, glows once |
| 6 Techniques | Interlocking transforms (torus ↔ knot) | substitution/parts | slow morph between forms | resolves to a clean torus |
| 7 Applications of int. | Cross-sections stacking into a solid | volume | slices assemble/disassemble | solid completes |
| 8 Parametric & polar | Orbits / radial rose | curves from a parameter | petals trace out | rose completes symmetrically |
| 9 Sequences & series | Rough geometry converging to a smooth object | convergence | facets refine then coarsen | converges to a perfect sphere/torus |

Home uses a neutral "observatory" sculpture (the torus) that becomes the chapter object on entry.
**Prohibited:** a sculpture that doesn't map to the current context; more than one sculpture on screen.

### 18. Ferret companion system (behavioral, not decorative)
The ferret is an **environmental companion**, never a logo/sticker/icon.
- **Never**: on nav, on buttons, over math, more than once per screen, thick outlines, exaggerated faces, primary focus.
- **Appears only when its behavior adds meaning.**
- Allowed behaviors, each with trigger · purpose · max duration · cooldown · reduced-motion fallback:
  - walks across the base of the observatory (home idle; 4s; 60s cooldown; RM: absent)
  - reads near the active object (concept open; static; RM: static)
  - looks toward the sculpture (screen enter; 1s; RM: static)
  - sleeps (inactivity >2min; static; RM: static)
  - brief smile + scurries off (correct streak ≥3; 1.5s; 30s cooldown; RM: none)
  - carries a note (≥3 careless mistakes; static; RM: static)
- Until a premium asset exists, use a **restrained silhouette**, not the current illustration, in these behaviors.
- **Prohibited during timed work entirely.**

### 19. Mobile behavior
Single column; primary action reachable one-handed (bottom third). Tap targets ≥44×44. Nav never
covers content (content bottom-padding ≥ nav height + 24). Sculpture caps at ~38vh.

### 20. Desktop behavior
Same single-column max-720 centered (it's a study companion, not a marketing site). Sculpture may
grow; nav may move to a slim left rail (later gate). Not a priority.

### 21. Accessibility
Contrast ≥ 4.5:1 for text (verify accent-ink on bg). Color never the sole signal (callouts pair
hue with icon+label; correct/wrong pair color with icon). Full `prefers-reduced-motion`. Focus
states on all controls. Math has readable size.

### 22. Performance constraints
Sculpture: ≤ ~1.5ms/frame budget; pause when tab hidden or screen not visible; static frame under
reduced-motion; SVG fallback if canvas unavailable. No layout thrash from animations (transform/opacity only).

### 23. Offline constraints
Everything above is self-contained (no external fonts/CDN). Sculptures are procedural (canvas/SVG),
not video/asset downloads. Works in airplane mode after first load.

### 24. Screen hierarchy (home)
1. Central sculpture (hero)
2. Today's action (Begin)
3. Progress state (mission summary)
4. Secondary navigation

### 25. Content hierarchy (home)
Greeting → sculpture → **Today's mission** (review N · master X · exam in D days) → **Begin** →
restrained nav. Remove tiles, stats grid, weakest-list from the hero screen (move into "Begin" flow / Progress).

---

## GATE 3 — Home screen specification + three variants

**Content (identical across variants):**
Greeting ("Good evening") · one sculpture · Today's Mission (3 forgotten skills · master
"Integration by Parts" · exam in 18 days) · one primary **Begin** button · restrained nav. Nothing else.

**Hierarchy:** sculpture → Begin → mission → nav.

Three variants share content & structure; only density, motion, atmosphere differ:

- **A — Cinematic.** Sculpture huge (38vh), near full-bleed, slow rotation + parallax; greeting overlaps it; mission is one quiet line; Begin is a wide gradient bar. Most "wow," least info density. Risk: least glanceable.
- **B — Balanced (recommended).** Sculpture ~30vh in a calm well; greeting above, mission as three hairline-separated micro-rows below, Begin prominent. One accent. Wow + usable.
- **C — Minimal focus.** Small centered sculpture; mission as a single sentence; enormous Begin; everything else hidden behind nav. Calmest, most "instrument-like."

**Begin button spec (all variants):** height ≥52px mobile; default → pressed (scale .99, 120–180ms, light response); no bounce, no glow loop; loading + offline-safe states; the single most prominent interactive element.

---

## Process / approval gates
1. Audit ✓ (this doc) → 2. Design bible ✓ (this doc) → 3. Home wireframe/spec ✓ (this doc) →
4. **Static visual prototype of the 3 home variants** ← *next, on approval* → 5. Motion → 6. Mobile →
7. Offline → 8. A11y → 9. Final home implementation → 10. Roll out to other screens (sculptures per chapter) → ferret behaviors **last**.

**Order: structure → atmosphere → motion → character.**
