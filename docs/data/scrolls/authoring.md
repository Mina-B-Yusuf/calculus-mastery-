# Authoring a Mathematical Scroll

A scroll is not a lesson. It is the answer to *why did anyone ever care?* — the
thing that makes the lesson worth opening. It exists for the moment a learner
is about to close the app and instead remembers that mathematics is
interesting.

## The two kinds — and why the difference matters

**Not every section gets a scroll.** If every section receives the same
dramatic treatment, the dramatic ones stop feeling dramatic. The contrast *is*
the design.

| | **Scroll** (2–5 min) | **Micro-scroll** (~1 min) | **Nothing** |
|---|---|---|---|
| For | a genuine mystery or profound idea | a supporting technique with one clean intuition | routine drill material |
| Has | mystery · story · figure · turn · picture | mystery · one image · picture | — |
| Examples | Taylor, Zeno's limits, Archimedes' areas, the Basel problem, Euler's identity, L'Hôpital's refusal | partial fractions, trig substitution, the trapezoid rule | most computational sub-skills |

Ask honestly: **is there something here a person could find astonishing?** If
yes, write the scroll. If there is only one clean intuition, write the micro.
If neither, write nothing — the section already has a Reference and a Drill.

## The three obligations

### 1. Open with the central mystery, not a hook

A hook is a teaser. A **mystery** is a real question with a real answer, and
the reader keeps scrolling because they want it resolved. It must be resolved
before the scroll ends.

- *"How can one point know the whole curve?"* (Taylor)
- *"Why should a problem about whole numbers end with $\pi$?"* (Basel)
- *"If you must first walk half the distance forever, how do you ever arrive?"* (Zeno)
- *"Sometimes mathematics doesn't fail — it refuses to answer the question you asked."* (L'Hôpital)
- *"He invented integration two thousand years before anyone knew what an integral was."* (Archimedes)
- *"Why is one fraction harder than three?"* (partial fractions, micro)

### 2. History illuminates the mathematics — never the reverse

Nobody needs the publication year. They need to know **why someone would ever
think that thought.** Use a person only where their struggle explains the idea:
the navigator who needs five decimals, the generation that felt the vertigo in
Taylor's recipe. If a historical fact does not make the mathematics clearer,
cut it.

### 3. Close with the mathematician's picture

If the reader forgets every equation, they should still keep the picture. Not
the formula — the *image*.

- **Taylor** — a smooth curve carries enough information at a single point to rebuild itself.
- **Derivatives** — zoom in far enough, and every smooth curve becomes a straight line.
- **Integration** — area can be assembled from infinitely many pieces that are individually too small to matter.
- **Limits** — we can understand a destination without ever standing on it.
- **Convergence** — infinity isn't a number; it's a process that sometimes settles down.
- **Partial fractions** — a complicated fraction is several simple ones that were added together.

## Shape

Cards are complete thoughts, one per screenful. The closing three are fixed:
**the mathematician's picture · try it yourself · continue** into the section.

```json
{ "id": "09-taylor", "chapter": "9", "section": "9.6", "kind": "scroll",
  "mystery": "…", "picture": "…", "minutes": 3,
  "cards": [
    { "type": "mystery", "text": "the question the whole scroll resolves" },
    { "type": "beat",    "text": "prose; \n gives a deliberate line break" },
    { "type": "figure",  "figure": "taylor", "caption": "…" },
    { "type": "math",    "tex": "…", "caption": "…" },
    { "type": "turn",    "text": "…", "text2": "the sentence they will remember" },
    { "type": "story",   "who": "Brook Taylor · 1715", "text": "…" },
    { "type": "picture", "text": "…" },
    { "type": "try",     "text": "…", "link": { "label": "…", "href": "#/journey/9/s/9.6" } }
  ] }
```

Prose supports `$maths$`, `**bold**` and `*emphasis*`. Every scroll passes
`node tools/verify-notation.mjs` before it ships.

## The one test

Write the sentence you want remembered a year later. If the scroll does not
contain it, it is not finished. *(For Taylor: "we never once looked at what
$e^x$ does anywhere else.")*
