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

## Two modes of understanding

Learning is not one activity. Computers organise information as *concept →
memorise → recognise → practise*; humans build understanding differently, and
the observatory must respect the human order, not the machine's.

There are two distinct modes, and conflating them was the app's deepest flaw:

- **The Journey — where understanding is *born*.** Linear, narrative, visual.
  A chapter is not a list of definitions; it is **one idea coming into focus.**
  Each chapter is walked as a single red thread — *arrival → question →
  intuition → picture → experiment → pattern → definition → formula → example →
  connection → summary* — the way a lecture teaches, ending in the one sentence
  the whole hall exists to defend. This is the curator, not the manual.
- **Everything else *preserves* it.** Concepts is the **reference manual** —
  used after the lecture, never as the lecture. Recognise is pattern retrieval,
  Memorise is retention, Exam is application. None of them may carry the burden
  of first teaching; that burden belongs to the Journey alone.

Like a university: you learn from lectures, then keep the textbook on the shelf.
A definition index does not shape how someone thinks — **a carefully sequenced
journey through an idea does.** This is the most direct expression of the Canon:
*the observatory exists to shape the learner's way of thinking, not merely their
way of studying.* A chapter that leaves the learner asking "why did I just learn
all of that?" has failed at **sequencing**, not content. Every chapter owes a
**red thread**: why the idea exists, the problem it answers, the intuition, the
picture, the formal definition, the techniques, and how it leads into the next
hall.

A journey is **authored content**, never computed — it lives in `data/journeys/`
and is rendered by a client that reuses the observatory's own visuals and
invents no state, exactly like every other renderer.

### The Journey's craft (prove one before writing ten)

A second journey may not be written until the first is the best digital lesson
we can make. Coverage is not the bottleneck; **craft is.** Once the teaching
language is right, the remaining halls are almost mechanical — so the whole
project's leverage sits in perfecting one.

- **Discovery before the name.** The learner *moves something and notices* before
  any word is offered. The secant is dragged into a tangent, and the slope is
  felt to settle, *before* "limit" or "derivative" ever appears. Museums guide
  attention; they do not narrate the exhibit before you have seen it.
- **The rhythm breathes; the definition is not first.** Question → Play →
  Confusion → Observation → Prediction → Failure → Insight → **Definition
  (past the midpoint)** → Proof → Application → Reflection. The symbol is only
  worth writing once the idea is already in the learner's hands.
- **Figures are instruments, not illustrations.** Every picture is *mathematical*
  and *interactive* — a thing the learner drives and the mathematics answers.
  Two honest dimensions beat a decorative 3D scene. Productive failure earns its
  own figure: the corner where the derivative does not exist.
- **Equations are read like an art book.** Centred, framed by air, plated, never
  left as inline HTML. No mathematics appears as plain text if KaTeX can set it.
- **Predict before you teach.** The single highest-value moment: stop the learner
  mid-play and make them *commit* to what happens next — *does the slope settle,
  or change forever?* — before anything is revealed. Prediction is where
  understanding begins; a reveal that follows a guess lands, a reveal that
  follows nothing washes over.
- **Let them invent the rule before you show it.** After the discovery, ask the
  learner to write the rule themselves, and let them struggle — even fail. Then
  Newton's quotient is not "here is the formula" but "someone solved *exactly*
  the problem you just felt." That emotional difference is the lesson.
- **Make them fail once, on purpose.** Non-differentiability is not a theorem to
  state; it is an experience to have. Ask the learner to *do* the thing that
  just worked (make the slope settle) at a corner, and let it refuse.
- **End in reflection, not drilling — three rungs, hardest last.** Explain it to
  a friend, draw it, then reason about its *absence* (what must be true of a
  curve where the derivative fails?). Kept only for the learner, to exam night.
- **Test transfer, outside the subject.** The proof of teaching a concept rather
  than a procedure is whether it travels: after the derivative, ask which day a
  *plant* grew fastest. If the idea moves to a curve with no $x$ in it, it was
  learned.
- **One unforgettable image (Canon truth 13).** Design the whole room around the
  single picture the learner keeps: *derivative →* "the curve became straight
  because I got close enough"; *integration →* "tiny pieces quietly became a
  whole"; *convergence →* "the motion stopped changing, though it never stopped
  moving." Not the formula, not the name — the image.

The bar: *could a first-year student genuinely prefer this to a good lecture on
the same idea?* Until the answer is yes, do not scale — a second journey only
multiplies whatever is still missing in the first. This is the slow, valuable
phase: one interaction may take days, and changing a single sentence can matter
more than a hundred features. That is where museums, textbooks, and great
teachers all arrive — refine until it feels inevitable.

## The unit is the section; the app carries the momentum

The app is organised around **sections, not chapters.** A chapter is too broad to
learn or to drill; the learning unit is the subsection (1.1, 1.2, 3.4) — one
subtopic, its handful of micro-skills, its own set of questions.

- **A section is a complete unit:** its own reference, its own practice, its own
  place in the path. "Practise this" means *only this section's questions* — never
  the whole chapter dumped at once, which breaks the flow the moment it starts.
- **The chapter is a spine, not a menu.** Sections run in order with a quiet
  orientation ("Section 2 of 5") — position, never a score. The map is somewhere
  you go only if you *want* to; it is never the way forward.
- **Momentum is the product.** Every time the learner finishes something, the app
  answers the only question that matters — *what is the next most sensible
  thing?* — and offers it: finish a section, and the next section is one tap
  away. The learner should never have to navigate **back** to continue.
- **Mixed practice is earned, and placed last.** A Chapter Review — everything
  mixed together — unlocks only after a section has been practised, and becomes
  the primary mode once the whole chapter is done. Mixed questions are the *test*
  of learning, not its beginning.

Organising around momentum instead of content is what decides whether the
observatory is *used*. It is the foundation the atmosphere sits on.

### The anatomy of a problem: Observe → Recognize → Plan → Execute

The app exists to prevent mistakes **before** they happen, not to react after.
Students rarely fail because they "can't do calculus" — they fail at one of
**four moments**: they didn't *notice* the important feature, they chose the
wrong *approach*, they *executed* poorly, or they *communicated* poorly. The
app is an operating system for those four moments, and the exam is only the
proof — the product is mathematical thinking.

- **Observe** — before anything, what do you *notice*? Experts don't magically
  know the method; they perceive features novices miss. Two seconds, one tiny
  screen — perception is trained, not assumed. (The correct observation is the
  archetype's recognition cue; the false ones are the confusable techniques'
  cues — features this problem does not have.)
- **Recognize** — which technique does this need? The first move of every
  problem, not a separate game mode.
- **Plan** — before touching the algebra, what is the first move? Committed
  *before* execution, against the confusable attacks.
- **Execute** — on paper, where mathematics actually happens; the app checks,
  it does not replace the pen.

**Confidence is the answer's second dimension — and hesitation its third.**
Confidence is asked before the verdict (so it cannot be contaminated by it):
a lucky guess is never mastery; *certain-but-wrong* is the most valuable
signal the simulation receives and is surfaced first, by name. Time-to-answer
is logged beside it, never shown as a score: certain-in-one-second and
certain-after-twenty-seconds are different states of knowledge.

**Scaffolding fades.** Early, the phases are explicit. Late, the question is
only *Solve* — and the phases are reconstructed afterwards. Independence is
the goal, so support is designed to be removed. Diagnosis, when it comes,
thinks like the examiner — a marking scheme, and *which mark was lost first* —
because the anatomy of mistakes mirrors the anatomy of problems.

### The variable ledger — remember what matters, not what happened

Every recorded variable must answer one question: **what decision becomes
better because this exists?** A variable with no decision is deleted — the
observatory remembers everything that *matters*, not everything that
*happened*. The ledger:

| Variable | The decision it buys |
|---|---|
| `correct` | scheduling; structural integrity |
| `confidence` | was this mastery or luck? (guessed-right is never mastery) |
| `msTaken` | is recognition automatic yet? (certain-but-slow caps the interval) |
| `observeCorrect` | pattern-matched or perceived? (missed observation caps the interval) |
| `planCorrect` | right attack, or lucky landing? (caps the interval) |
| `execOk` | does paper execution hold? (slip caps to the short interval) |
| `errorType` | which of the four moments failed (feeds the error notebook) |
| `recon` (exam) | did the learner understand the method *after* solving? |
| `held` / `markFell` (exam) | is the template stable — and which mark falls first? |

Adding a variable means adding a row — with a real decision in the right-hand
column — or not adding the variable.

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
