# Anti-patterns — the compromise catcher

Projects rarely die from bad principles. They die from hundreds of tiny,
reasonable-sounding compromises. This file exists to catch them.

> Good design is as little design as possible. — Dieter Rams
> **A good observatory feels inevitable.** Not clever, not impressive — inevitable.

## The reflex → the discipline

Every time you feel one of these reflexes, stop and ask the question instead.

| Never… | Instead ask |
|---|---|
| Add animation because something feels empty | *Why* does the space feel empty? |
| Add a statistic because there's room | Does the learner actually need another measurement? |
| Add a room because you have an idea | Have the existing rooms finished saying what they mean? |
| Add particles because it looks premium | What do these particles *represent*? |
| Add sound because silence feels boring | Is silence the *correct* emotion here? |
| Add a reward because motivation dropped | Why isn't the *mathematics* rewarding enough? |
| Add a new mode because the idea is good | Could an existing **verb** (Observe, Recognize, Reconstruct…) become 10% better instead? |
| Record a variable because it's measurable | What **decision** becomes better because this exists? |

If the question has no honest answer, the thing does not belong.

## Guard the identity fiercely

- **Never let AI-generated assets define the visual identity.** The early
  hamster-looking ferret happened because a *visual* problem was solved instead
  of a *design* problem. The identity of this world is **architecture, not
  characters.**
- **The ferret is a resident, never a mascot.** It exists because the observatory
  is lived-in — never to be cute, never to sell. If people remember a cute animal
  instead of The Vessel and the whisper-quiet halls, the wrong brand was built.
- What people should remember in five years: The Vessel · the Convergence
  Observatory · the hush of the halls · the feeling of *entering.* Those are the
  brand.

## Our references are institutions, not interfaces

We began with premium websites — Nike, Apple, perfume, museums. Those are no
longer the closest references. The closest references now are **an old
observatory, a cathedral, a museum, a research library, a conservatory.** Not
interfaces — *institutions.* Nobody believes an old university was designed
yesterday; it feels *discovered.* Build for that feeling.

## The Design Review Board

Foundational decisions are over; what remains are product decisions. Every new
feature must survive **five reviews** before a line of code is written. Fail any
one, and it does not ship.

1. **Mathematical** — *Is it mathematically honest?* (Does The Vessel truly
   represent accumulation? Is the metaphor sound? Are we teaching intuition, or a
   misconception?) — not "does it look cool?"
2. **Learning** — *Does it make learning easier?* (retrieval, transfer, fewer
   careless mistakes, help under exam pressure) — not "is it engaging?"
3. **Architectural** — *Does it belong? Is it inevitable? Could another
   observatory exist without it?* If it could, don't build it.
4. **Technical** — *Will it survive three years?* (Does it violate the
   simulation architecture? Duplicate state? Hurt offline reliability? Add
   maintenance weight?) — not "can I code it?"
5. **Emotional** — *What should the learner feel?* If you cannot answer in **one
   sentence**, the feature is not ready.

## Bug priorities — trust outranks everything

Not all bugs are bugs. Some are **trust violations**, and those are a different
species. The app's entire value proposition is *"I can trust this"* — one
garbled formula during an exam and the learner wonders whether *any* formula is
right. That doubt is catastrophic and irreversible.

- **P0 · Trust** — anything that makes the mathematics questionable: broken
  rendering, a wrong formula, wrong answer, wrong theorem, parser bugs,
  ambiguity. **Fixed immediately. No discussion.** P0 outranks every freeze,
  every roadmap, every rule in this repository — including a research
  no-fix week.
- **P1 · Learning** — anything that hurts understanding: poor examples,
  confusing explanations, weak distractors.
- **P2 · Flow** — navigation, momentum, interruptions, dead ends.
- **P3 · Polish** — animation, lighting, atmosphere.

A P0 fix must carry **trust-grade verification**: prove across the whole
content corpus that the fix garbles nothing else, before it ships.

## The forbidden sentence

If anyone ever says **"it would be cool if…"** — stop, immediately. Replace it
with **"the observatory needs…"**. That one shift changes the motivation from
decoration to necessity.

## The ten-minute test

Before shipping anything that claims to be *a place*: close every tool, open the
app, and sit in the observatory for ten minutes doing nothing. Ask — *would I
stay here if there were no calculus questions?* If yes, it is a place. If no, it
is software with beautiful assets. Those are different achievements.

The only outcome that judges success: a student who, seeing an integration
problem in an exam, thinks *"I remember The Vessel"* — and chooses the right
approach because of it.

---

*Read alongside [`CANON.md`](CANON.md). When the Canon says what the world is,
this file says what would quietly betray it.*
