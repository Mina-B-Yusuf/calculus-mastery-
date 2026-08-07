# Authoring a question family — forensically

**Never invent a taxonomy from the textbook.** Start with the questions the
examiner actually set and work backward. A family written from a syllabus
describes what *could* be asked; a family written from papers describes what
*is* asked, and only the second one shrinks the exam.

## The eight questions, in order

1. **What is the canonical skeleton?** Strip every problem in this family to
   the same sentence. If you cannot, you may be looking at two families.
2. **What stays invariant across papers?** These become the `steps` — what the
   question always asks of you, regardless of the twist.
3. **What merely got reskinned?** Constants, signs, a swapped function that
   changes no method. Record it as a reskin, never as a new variant.
4. **What genuinely changed mathematically?** Only these are mutations.
5. **Which operator caused that change?** One of the fifteen. If none fits,
   *do not invent one* — record the miss and wait for recurrence across
   unrelated families.
6. **Where did the marks actually become difficult?** Mark exactly one
   mutation `loadBearing`. Operators present ≠ the operator responsible.
7. **Is this mutation, method, or recall?** Get this wrong and the study
   experience is wrong: *what changed?* · *which instrument?* · *can you
   reconstruct it?*
8. **What is the smallest set of examples that makes the family feel finite?**

## Question 8 is the one that matters

The target is not coverage. Do not aim for *"we documented all variants."* Aim
for the moment a learner meets an unseen past-paper question and thinks:

> **"Oh. It's *that* question."**

If a family needs nine variants to produce that feeling, it has been
over-documented. Four usually suffice. Cut until cutting starts to hurt.

## Cite the evidence

Every family carries an `evidence` line naming the real papers behind it:
*"8 of 8 papers carry this family. Blind audit: 1 base, 3 hide-the-structure,
2 change-the-domain, 2 change-the-object."* If a family cannot cite papers, it
is a textbook family, and it should say so rather than borrow authority it has
not earned.

## Reskins are the headline, not a footnote

The blind audit found **13 of 33** mutation-family exam questions carried *no
meaningful mutation at all* — two integrals differing by one sign, two ODEs
differing by a sign, two recursive sequences differing only in constants.

So the message a family should leave behind is not "here are six variants" but:

> **The exam is much smaller than it looks.** A new paper does not mean new
> mathematics. Usually the examiner changed the constants, the signs, or the
> surface, and left the intellectual problem intact.

Record known reskin pairs in `reskins`. In practice they should eventually be
shown as *"Same question. New clothes — what actually changed?"*, where the
correct answer is often **nothing that changes my method.**

## What the final stage looks like

The endpoint of good authoring is the *removal* of everything authored. No
genome labels, no operator tags, no hints — just the past-paper question. If
the learner's first reaction is *"I've seen this before"* when they literally
have not, the authoring worked.

## Recorded, not fixed

The blind audit's prediction **miss** — an examiner reaching across families
for the same underlying skill (showing a limit exists via a sum minus a
logarithm rather than a recursion) — is left open on purpose. Family structure
and competency structure are not the same thing. Let evidence accumulate across
more papers before deciding whether that is a real higher-order relationship or
simply an examiner being an examiner.

## Do not add a fourth family type

Three types were forced out of real evidence. A fourth needs the same standard:
recurrence across unrelated families in real papers, not a case that is merely
awkward to file.
