# The Observatory — Design Constitution

This document governs every design and engineering decision in the app. It
outranks convenience, habit, and "it looks cool." When in doubt, obey it.

---

## The law

> **Everything the learner perceives must be a manifestation of mathematical understanding.**

*Perceives*, not *sees* — this binds motion, sound, lighting, transitions,
interactions, and atmosphere, not just pixels.

Expanded, the working test is threefold. **Everything the learner perceives
should either (1) teach mathematics, (2) reveal the state of their understanding,
or (3) deepen their sense of place. If it does none of those, it does not
belong.** The third clause matters: architecture need not teach directly — a
distant, unreachable arch is not calculus, but it tells the mind *"this
observatory is larger than today's lesson,"* and that context gives everything
else meaning.

## The feeling

Three seconds after opening, the user should feel one thing:

> **"I want to understand mathematics."**

Not *"I want to study."* Not *"I should study."* Understanding, not obligation.

## The test (apply to every element)

Every screen, object, animation, transition, and sound must carry **three
meanings at once**:

1. **Pedagogical** — it helps someone learn, remember, or self-assess.
2. **Symbolic** — it stands for a real mathematical idea or a real learning state.
3. **Aesthetic** — it is beautiful, calm, and inevitable.

An element that satisfies only one or two is **redesigned or removed**. No exceptions.

> If an element cannot explain why it exists in terms of learning, mathematics,
> and beauty, it does not belong.

## Four principles (non-negotiable)

1. **Nothing decorative.** Every visual represents a mathematical idea, a learning state, or a system status.
2. **The world is the interface.** Navigation is movement through meaningful places. Menus recede inside a place and return in the hub — they are never the primary way to move.
3. **Progress is environmental.** Knowledge changes the observatory itself, never a number on a bar.
4. **Discovery over reward.** The reward is unlocking another room, not earning points. Draw people to explore mathematics.

---

## The simulation (world → screens)

The app is not a set of screens. It is a **simulation** whose current state
happens to be visualised through screens. The renderer, animation system,
typography, and Three.js scenes are **clients** of the simulation — never the
simulation itself. If the UI became VR, AR, or a hologram tomorrow, the
underlying state model would not change.

- **Every visual state must be computable from learning data.** First define the
  world's laws; the renderer is only their final expression. Never ask "what
  animation should happen?" — ask "what is the *state* of this hall?" and derive.
- **The engine is pure.** `Observatory.compute(data)` is deterministic: same
  learning data in, same world state out. It can be tested without a screen.
- **Observatory DNA.** Every hall exposes the same facets — *geometry, structure,
  light, atmosphere, integrity, memory, connections, restoration* — and each hall
  renders them differently (Integration → cross-sections, Series → an infinite
  staircase, Limits → approaching surfaces, Optimization → a landscape of valleys).
  One engine, not ten rooms.
- **Every hall answers one sentence,** and everything inside — geometry, light,
  eventually sound — reinforces it. *Accumulation:* "many local pieces become one
  whole." *Convergence:* "infinite processes can have finite destinations."
  *Limits:* "we can understand what is approached without ever arriving."
- **Observatory Wisdom (hidden).** Alongside Structural Integrity there is a
  second, never-shown variable: understanding, not memorisation. It grows from
  retention, merged-topic connections, and first-pass recognition — not raw
  correctness — so the world eventually rewards *connection over repetition*, and
  the app never collapses into "just another SRS."

## The Law of Restraint

**Every room contains exactly one unforgettable object.** Not twenty — not
particles *and* columns *and* glass *and* rings *and* fog *and* glyphs *and*
floating equations *and* orbs. One masterpiece; everything else exists only to
support it.

- Hall of Accumulation → the accumulation vessel. Done.
- The Limit → the two approaching surfaces. Done.
- Optimization → the impossible landscape. Done.
- Convergence → the convergence staircase. Done.
- The Armillary → the celestial instrument. Done.

**No glowing sci-fi for its own sake.** The references impress because the light
has *purpose*, not because there is light. A hall is a **sacred place where an
idea is understood**, not cyberpunk. The renderer must almost disappear: the room
never says "look at my shaders" — the learner notices the *mathematics*.

## You belong to the observatory

Not the reverse. When you enter a hall, the room is not waiting for you — it
simply exists, and you are visiting. This makes the place feel ancient, real, and
independent. **Leave mystery:** never finish the world. A far, unreachable bridge;
a wing you have not explored — not "level-locked," but because the observatory is
*enormous*. The learner should always feel "I've only seen one wing."

## The world

- **Geography of ideas, not chapters.** Places are named for what they *are*:
  Hall of Accumulation (integration), Convergence Observatory (series),
  Optimization Atrium, the Limit (two glass planes approaching forever),
  the Polar Armillary, the Tangent Gallery. The textbook already exists; this
  gives mathematics a geography you can *remember* (method of loci).
- **One masterpiece per hall.** The idea, embodied. Nothing competes with it.
- **The sky is the map.** Every micro-skill is a star; learning lights it,
  mastering neighbours draws the **constellations** (Product ↔ Chain ↔ Implicit;
  Substitution ↔ Parts ↔ Partial Fractions; Limits → Continuity →
  Differentiability → Optimization). A weak family shows a missing link. You
  travel into a hall from its constellation — this *is* the navigation.
- **The Library is memory.** Books with bookmarks on forgotten theorems,
  ribbons on repeated mistakes, your initials on mastered ones. Not "weak topics."
- **The Living Observatory.** The place grows *smarter*, not brighter: a
  telescope is earned, the roof opens once limits are understood, a fountain
  flows once integration is, a wing unlocks with a new domain. Every change
  represents understanding; none is arbitrary.
- **The core is a symbol that evolves.** The observatory's torus is not
  decoration and is never discarded — it matures with the learner (a faint
  wireframe → stars orbiting it → drawn into the observatory → its beating
  heart). It is the app's one recognizable emblem, earned over months.
- **Presence, not streaks.** Time is shown as ambient state, never a score:
  *"Observatory active — last visited yesterday evening"*, *"quiet for 4 days."*
- **Earned & lived-in.** A room contains only what you have earned — the
  masterpiece assembling as you master it, and dim peripheral history
  (notebooks, unfinished constructions, your initials) revealed only on
  approach. Nothing is placed for looks.
- **Silence is the default.** The observatory is nearly still — dust, distance,
  faint ambience. **The world waits; motion is a response, never a demand for
  attention.** The user moves, then the world answers — never the reverse.
- **The Law of Permanence.** The observatory is older than the learner. They
  *discover* it; they do not rebuild it on every visit. Major change settles
  **between** sessions, so returning feels like coming back to a real place that
  continued to exist while you were away.
- **Restoration, not construction.** A hall already exists — as incomplete
  scaffolding: cracks, floating slices, dim gaps. Mastery does not *create* the
  architecture; it **stabilises and restores** it. You are repairing an
  institution, not filling a bar.
- **You become a mathematician.** After a session, a **discoveries log**, never XP:
  *"3 concepts strengthened · 1 forgotten theorem recovered · 1 misconception corrected."*
- **Loading belongs to the world.** Not a spinner:
  *"Preparing observatory… Reconstructing the Hall of Accumulation… Reviewing yesterday's discoveries… Observatory stable."*

## The three time scales

Feedback lives on three clocks, and the slow ones matter most:

1. **Immediate (seconds).** Almost imperceptible. A slice glows, one particle
   settles, the ferret glances over. Never a celebration. Never a ✨ per answer.
2. **Session (minutes).** After study, on reflection: the room quietens, a few
   structural elements lock into place, a missing bridge appears — *"today's
   discoveries have been integrated."*
3. **Long-term (days).** The magic. Return tomorrow and the environment has
   changed while you were away — knowledge has *set*: the sculpture more
   continuous, the light warmer, the hall more whole. This is what creates
   attachment.

Rhythm: **respond → reflect → return → discover.** Celebrate understanding after
reflection, never every correct answer.

## Forgetting has dignity

Absence is not punished. No "you lost your streak." Instead the observatory grows
quiet: dust gathers, a few lights dim, a bridge flickers, the ferret has left a
note — *"some rooms have become quiet."* Returning restores them.

## Structural Integrity (not a score)

The one number the learner may see is **Structural Integrity** — because the
architecture literally depends on understanding. It is honest (starts low, rises
only with reliable command) and it reads as maintenance, not a game:

> **Observatory status** — Structural Integrity 82%
> Recently stabilised: Integration by Parts, u-substitution
> Inspection recommended: Improper Integrals

## The three attention modes (a hall breathes)

A hall is not one scene — it has three emotional states, and the masterpiece
expands, recedes, and returns with them. The question is never "how visible is
the object?" but "what is the learner's attention doing right now?"

1. **Arrival — wonder.** ~90% object, 10% interface. The room is dark; the object
   breathes; architecture stretches upward; dust drifts. No mathematics yet — just
   silence. Two to three seconds. *The learner has arrived.*
2. **Study — focus.** ~30% object, 70% interface. The object *retreats* (never
   disappears) — like a cathedral ceiling you feel without staring at. It softens
   into the environment beyond the glass, and the **mathematics becomes the hero.**
3. **Reflection — meaning.** ~80% object, 20% interface. The panel recedes, the
   room quietens, and the object returns — *changed.* One more slice, one crack
   repaired, a warmer tone, a new bridge. **No fanfare, no fireworks** — just
   *"…something is different."* Infinitely better than +25 XP.

The object becomes like breathing: it expands, it recedes, it returns.

## Emotional vocabulary (every hall is unlike any other)

Each hall has its own *feeling*, not merely its own geometry — and that feeling
drives every choice (light, sound, motion, type, transition speed):

- **Hall of Accumulation** — warm · patient · grounded · continuous · flowing.
- **Convergence Observatory** — distant · cold · precise · inevitable · stars aligning.
- **Tangent Gallery** — sharp · bright · elegant · fleeting · motion frozen for an instant.
- **Optimization Atrium** — balance · tension · symmetry · everything leaning toward one minimum.

**The rule for expansion:** every new hall must be recognisably part of the same
observatory, yet **emotionally impossible to confuse with any other.** People
should remember not just the topic, but *where they learned it.*

**The whisper.** The space itself should lower the mind's pace — the way a great
museum makes you instinctively quiet. If someone opens the app in a noisy café,
they should feel it slow them down, without being told.

## The artifact doctrine

An artifact must **behave like the mathematics it embodies**, not merely depict it.

Integration's masterpiece is not a bar filling 0 → 100%. It is a volume that
performs the definition: a few cross-sections exist → the slices begin to
connect → a continuous surface emerges → the surface becomes perfectly smooth.
That progression *is* the limit of Riemann sums. Mastery is not "brighter" — it
is **continuity achieved**.

Every other masterpiece is held to the same bar: the object should let a
watchful user *rediscover the idea* by looking at it.

## Forbidden

- XP, levels, and points. (Presence/streak may appear only as ambient state, never a score.)
- Menus as the *primary* way to move. (A nav bar may exist in the hub; it recedes inside a hall.)
- Spinners and the word "Loading…".
- Decorative or looping motion during study; motion with no meaning anywhere.
- Chapter numbers used as identity ("Chapter 6").
- Mascots or ornaments that only entertain.
- Any element justified by "it looks cool."

---

## Craft gates & the review ritual

Building a hall is craft, judged like architecture, not engineering.

**Gate 2.5 — Atmosphere Validation** (before polishing any geometry). With every
label and all UI removed, the room must answer:
- What *idea* does it communicate? What *emotion*? What *physical metaphor*?
- Which mathematical sentence is visible in the architecture itself?
- Could a stranger, seeing only the room, correctly say "this is about
  accumulation"? If not, the room has failed — simplify, don't decorate.

**The Museum Test.** If the Louvre commissioned one room to represent Integration,
they would not build purple neon — they would build one breathtaking installation.
Hold the hall to that.

**The photograph test.** After building, take ten screenshots with the UI removed.
If they could run in an architecture magazine and still be beautiful, keep going.
If not, simplify.

**The review ritual.** Stop asking "what should I build?" Ask "what would violate
the constitution?" Every change begins with a Constitution Review:

> Permanence ✓ · Discovery over reward ✓ · Nothing decorative ✓ · World is the
> interface ✓ · Progress is environmental ✓ · Law of Restraint ✓ · Atmosphere
> Validation ✓ · Museum Test ✓ · Pedagogical + Symbolic + Aesthetic ✓

Only then does implementation begin.

---

*Pinned. Every pull request is measured against this file.*
