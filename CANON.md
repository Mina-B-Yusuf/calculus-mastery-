# The Observatory Canon

> **Don't build an app that teaches calculus. Build a place that mathematicians
> would recognise as their home, then let calculus happen inside it.**
>
> **The observatory exists to shape the learner's way of thinking, not merely the
> learner's way of studying.**

The supreme document. It sits **above** [`PHILOSOPHY.md`](PHILOSOPHY.md): the
constitution says how the world is designed; the Canon says what the world *is*.
The Canon is immutable — it changes only if the project's very identity changes,
never for a feature.

---

## The north star

> **Mathematics should feel like a place, not like software.**

Every decision faces one question: *does this make mathematics feel more like a
place, or more like software?* If it makes it feel like software — **delete it.**

And the place has one purpose:

> **The observatory witnesses your mathematical thinking, not merely your
> answers.**

The Journey witnesses discovery. The halls witness growth. The drills witness
observation, planning, confidence, and execution. The examinations witness the
sitting. Anything the observatory merely *administers* without witnessing is
unfinished.

## The immutable truths

1. There is only one observatory.
2. Mathematics is **discovered**, never unlocked.
3. Rooms are **restored**, never built.
4. Every object represents **one** mathematical idea.
5. Nothing congratulates the learner.
6. The world is older than the learner.
7. Beauty exists to reveal truth, never to decorate.
8. The observatory remembers.
9. The learner leaves traces.
10. Silence is the default.
11. The world **ages**, it does not merely grow — stone polishes, handrails
    smooth, the library accumulates annotations, certain lights always flicker.
    Age, never decay: generations were here before you.
12. Nothing exists because a developer wanted it — only because mathematicians
    needed it, learners left traces, knowledge accumulated, and time passed.
13. Every journey leaves the learner with exactly **one unforgettable mental
    image** — not a formula, not a name. For the derivative it is *"the curve
    became straight because I got close enough."* Design the room around the
    image the learner should still hold in five years.

## One iconic object per hall

A room contains an object; people remember the **object**. (The Louvre → the
glass pyramid. The Pantheon → the oculus. Notre-Dame → the rose window.) So each
hall is known internally by its object, not its topic:

- Integration → **The Vessel** (not "the integration room").
- Limits → the approaching planes. Convergence → the aligning stars.
  Differentiation → the frozen tangent. Optimization → the settling landscape.

Name the object. Build the room around it. Let everything else recede.

## Frozen — do not reinvent

- **The Constitution** ([`PHILOSOPHY.md`](PHILOSOPHY.md)) — settled.
- **The interaction grammar** — Arrival → Study → Reflection. Never invent a new
  transition unless it is one of these three.
- **The observatory physics** — one simulation, many renderers. A renderer
  interprets state; it may **never** invent or recompute state.

## The production pipeline (Three.js is the LAST step)

No hall begins in code. Build meaning first, pixels last — the way a film is
figured out before it is animated:

- **A · Meaning** — what does this hall *teach*? (No pixels.)
- **B · Metaphor** — if the idea were architecture, what would it be? (One page.)
- **C · Emotional vocabulary** — exactly five words. Nothing more.
- **D · Simulation** — what variables describe its state? (Extend `observatory.js`.)
- **E · Renderer** — only now, Three.js. A client of D.

A hall may not advance a phase until the previous one is done.

## The discipline

Stop asking "what should I build next?" Success is the danger now: once the style
is understood, ideas multiply — libraries, gardens, planetariums, audio,
particles, weather. **Resist.** A cathedral is memorable not because it contains
everything, but because everything belongs.

The next hundred decisions should make the observatory feel more **inevitable**,
not more impressive. If, one day, someone opens a room and feels it could only
ever have been designed this one way — we have succeeded.

## Version 1.0 — conceptually complete

The foundation is done: canon, constitution, anti-patterns, interaction grammar,
a simulation-first architecture, and one hall proving the system. **Stop
redesigning the foundation.** The next teacher is reality — real learners.

- **No new foundational documents.** Everything belongs in `CANON`, `PHILOSOPHY`,
  `ANTI_PATTERNS`, or `CLAUDE`. If an idea fits none of the four, it is not
  foundational. Maintain a product, not a religion.
- **The Canon protects principles, not implementation.** The truths do not move;
  the expressions may. The Vessel itself may evolve if a better embodiment of
  accumulation is found — reality and real learners outrank our taste.
- **How we know it worked** — not downloads, retention, or streaks, but a learner
  who says *"I remembered the room during the exam."* The observatory succeeds
  when it changes how someone **thinks**, not how they study.
- **This is environmental design for learning.** The nearest teachers now are
  architecture, museum/exhibition design, environmental and cognitive psychology
  (memory & spatial encoding), wayfinding, and monastic/library architecture —
  fields that have shaped how places shape thought for centuries.

*This is an educational world. Calculus is merely its first subject.*
