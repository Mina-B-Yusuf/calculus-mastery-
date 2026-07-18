# Friction Journal — studying with the app, not testing it

**Protocol.** Implementation frozen. I sat a study session as a student would:
*"Exam in 10 days. Tonight: Chapter 1, section 1.2 — learn it, practise it,
move on."* Then the lookups, drills, exam rehearsal and reference walks that a
real week would contain, on a 390px phone viewport. Every hesitation, every
moment I would have reached for YouTube/Google/paper, every flow break —
recorded, not fixed. Bugs discovered during the session are **journaled, not
patched**.

**Honesty note.** This is a compressed session, not a lived week. Entries
marked `[needs-week]` can only be judged by a human studying daily on a real
phone — battery, retention, habit, fatigue. Those are open observation slots,
not findings.

**Severity.** ▲ flow-breaker · ● real hesitation · ○ paper-cut.
**Product tags.** `[T]` the Tutor loses · `[O]` the Observatory loses · `[T×O]` they fight.

---

## A · Cold open & orientation

- **F1 ▲ [T×O]** Boot splash plays ~2.4s of atmosphere on every cold open (new
  tab/day); the skip flag is per-tab sessionStorage. A student opening the app
  between lectures pays the theatre daily before they can study.
- **F2 ●** Home's "Continue where you stopped" can point into a drill URL
  (`lastPlace` records drill routes). Tapping it *restarts* the drill at Q1 —
  the button's promise is false exactly where it matters.
- **F3 ●** The home log names the unsettled idea ("One idea still stands
  unsettled — X") but nothing is tappable. The observatory tells me what's
  wrong and doesn't open the door to it.
- **F4 ●** Setting the exam date opens a raw browser `prompt()` dialog —
  system chrome in the middle of the place. (Same pattern in classic home.)
- **F5 ▲** Any interruption mid-drill (tab close, phone call, accidental back)
  silently loses session position and the remaining questions. Attempts are
  recorded per answer, but the *session* is unrecoverable.
- **F6 ○** During study the exam countdown vanishes; it exists only on Home.
  `[needs-week]` — does ambient deadline pressure help or hurt?
- **F7 ●** Tab named "Recognize" is app-language. A student looks for
  "Practice" or "Drill". (The Journey tab's momentum flows have made the
  Recognize tab's *role* unclear too — see F44.)
- **F8 ○** Greeting is hard-coded to first name + whimsy ("Still up, Mina?").
  At 01:00 before an exam, whimsy reads differently than at 14:00. `[needs-week]`

## B · Finding what to study (the lookup race)

- **F9 ▲ [T]** There is **no search anywhere** — not concepts, not formulas,
  not questions. Every lookup is a tree walk.
- **F10 ▲ [T]** Lookup race, timed: *"derivative of arcsin?"* = Journey tab →
  scroll 10 chapters → ch 3 path → find section 3.5 → open unit → find skill →
  open monograph. ~5 taps + 3 long scrolls, ≈40s. Google: ≈5s. The Reference
  loses every lookup race it could win *offline*.
- **F11 ●** The Concepts browse view is orphaned: since the tab became
  Journey, the chapter-level reference list is reachable only via a small
  "Full reference" link inside a Section Unit.
- **F12 ●** Journey landing mixes Calc 1 and Calc 2 in one list; a student
  enrolled in one course scrolls past the other's five chapters every time.
- **F13 ●** **Preliminaries sorts LAST.** `'P'` compares after `'9'` in the
  numeric-aware sort, so The Groundwork — the first thing a weak student needs
  — is listed at the *bottom* of Calculus 1 on every screen that sorts chapters.
- **F14 ○** Chapter rows on the landing carry no progress; I can't see where I
  left off without opening each path.
- **F15 ●** Radar/Status answers "how is the structure?" never "what should I
  do *next*?" — no link from a weak hall to its chapter path, no proposed plan.
- **F16 ●** No way to tell the app "my exam covers chapters 1–4 only".
  Priority.js exists but is invisible and uncontrollable by the learner.
- **F17 ○ [O]** Hall names lead everywhere ("The Mirror Hall") with syllabus
  names demoted to sub-labels. When cross-referencing a syllabus that says
  "Ch 3: Transcendental Functions", every hop requires translation.

## C · The Reference as a learning tool

- **F18 ▲ [T]** **The data holds 871 worked examples (median 3 per skill, up
  to 6); the Reference shows exactly 1** (`arch[0]` by code). The fluency layer
  — example, near-miss, harder variant — already exists and is hidden.
- **F19 ●** Factor-and-cancel (a core technique): no Theorem, no Key formulas,
  one example. The monograph structure is right; this page is *thin* — and the
  learner can't tell whether that's the maths or the app.
- **F20 ●** The lede under a skill title is archetype[0]'s recognition cue.
  For factor-and-cancel it describes the *complex-fraction variant* — a
  misleading first sentence for the whole skill. (Same pattern observed on the
  Section Unit: "One-sided limits" summarized by an absolute-value cue.)
- **F21 ●** "How to recognise it" lists cues from different archetypes with no
  examples attached: "The limit variable is h…" floats free of the problem it
  describes.
- **F22 ▲ [T]** Common mistakes are *named*, never *shown*: "Sign error
  combining the inner fractions" without the wrong line of algebra is a
  warning label, not a lesson.
- **F23 ▲ [T]** No Idea / visual-intuition layer above the formal definition.
  The definition paragraph is correct and dense; the *why* lives only in the
  single authored walk (ch 2). Everywhere else, understanding is outsourced —
  in practice, to Professor Leonard.
- **F24 ●** Worked example shows *plan-level* steps ("multiply by the
  conjugate…") and then the bare answer ("2"). The algebra itself — the thing
  a stuck student needs to *see* — is never displayed. This alone sends me to
  YouTube on nearly every hard item.
- **F25 ●** No counterexamples or false-friend pairs (e.g., a limit that looks
  conjugate-shaped but is direct substitution). Fluency is discrimination;
  the Reference never shows two things side by side.
- **F26 ●** No Connections section. `merged_topics` and the observatory's own
  CONNECTIONS graph exist in data; concept pages are islands.
- **F27 ●** Real papers ask theory ("state and prove the Mean-Value Theorem");
  the Reference contains **zero proof content**. The theory third of the exam
  is unpreppable in-app.
- **F28 ○** No prev/next within a monograph; every skill page exits via back.
- **F29 ○** Monograph footer "Study this in the hall" links to #/hall — the
  Vessel (ch 5) — regardless of the skill's chapter. Wrong room for 9/10 skills.
- **F30 ○** No bookmark / "still confusing" flag on a concept; Notes exist but
  are disconnected from concepts.
- **F31 ○** Historical notes, professor tips, exam-trap layers (the
  Encyclopedia vision): absent in data — an authoring effort, not a rendering fix.

## D · The section drill

- **F32 ▲ [T]** **Peeking at the Reference mid-drill destroys the session.**
  Observed directly: left Q1 to check the technique, returned — new shuffled
  session at Q1. The moment of maximal curiosity is punished.
- **F33 ▲ [T]** There is **no link from drill feedback to the concept's
  Reference page.** Feedback offers cue/steps/answer reveals, but no door to
  the full page — and taking the manual detour costs the session (F32).
- **F34 ●** After a wrong answer, the slip-classification is asked *before*
  the reveals are opened — I'm asked to diagnose my error before I've seen
  what the right process was.
- **F35 ●** Correct answers force a Hard/Good/Easy choice, no default, no
  tap-through: 19–25 mandatory ratings per section drill. Rating fatigue was
  real by question six.
- **F36 ●** A missed question leaves the session forever (SRS will resurface
  it in days). Tonight, I wanted to fix it *tonight* — no in-session relearn
  step.
- **F37 ▲ [T]** The drill never asks me to **compute** anything. Recognition
  only. I can "steady" a section without once taking a limit. The
  application layer — do it, enter the answer, be checked — doesn't exist.
- **F38 ▲ [T]** The Diagnosis layer doesn't exist while **1,946 tagged
  common-error descriptions sit unused in the data.** "Here is a student's
  solution — find the slip" is buildable from existing content and directly
  attacks the sloppy-mistakes problem this app was born from.
- **F39 ●** "Work it out" opens the math keyboard as a scratchpad, but nothing
  checks what I write. It's a notepad wearing an input's clothes.
- **F40 ○** Four choices × full skill titles = up to 3 lines each on 390px;
  scanning 12 lines per question is slow. (The near-miss *content* is good.)
- **F41 ○** Session summary reports counts ("2 concepts strengthened") but
  never *names them*. Which two? The names are the useful part.
- **F42 ○** Spelling splits mid-flow: kicker "Practice", button "Practise".
- **F43 ○** No way to end a session early with credit + the momentum message;
  quitting is only abandonment.
- **F44 ●** With section-practice now primary, the Recognize tab's mixed drill
  has no explained role ("why are these mixed? which am I supposed to do?").
- **F45 ○ [T×O]** Speed round: "Chain correct answers for a **combo
  multiplier**", "Best: 0" — scoreboard language inside a world whose Canon
  says *nothing congratulates the learner*. The two products visibly fight here.

## E · Progress honesty

- **F46 ▲ [O]** **The path lies.** A section shows the ✓ "steadied" state when
  every archetype has been *attempted* — including all-wrong. A student can
  fail 19/19 and see a checkmark. Everywhere else the world is
  evidence-tempered; here it congratulates rubble. (Bug journaled, not fixed.)
- **F47 ●** "N of M sections steadied" therefore overcounts; the honest word
  for attempted-but-shaky exists in the observatory's own vocabulary
  (Unstable/Settling) and isn't used on the path.
- **F48 ●** No per-section accuracy anywhere on the path — position without
  honesty. Orientation good; integrity missing.

## F · The guided walk (ch 2)

- **F49 ● [T]** Ratio check: 818 words of prose, 15 beats, 6 interactions.
  Roughly 80% of the walk is still *reading*. Try–fail–repair happens in 3
  beats. Better than any textbook page; still more lecture than lab.
- **F50 ●** The invent beat — the single most valuable moment — is a bare
  textarea. Typing `f'(x) = lim h→0 …` on a phone keyboard is miserable, and
  the app's own math keyboard isn't offered. Most students will skip the
  best beat.
- **F51 ○** Predictions accept any tap and reveal the same text; the reveal
  never addresses *my* guess ("you said it blows up — watch what actually
  happens").
- **F52 ●** Figure drag targets are ~13px dots; on a thumb they demand
  precision. Only the zoom figure got a slider. `[needs-device]`
- **F53 ○** No resume for a half-finished walk; scroll position lost on any
  exit.
- **F54 ○** Reflection answers persist to localStorage and are never
  resurfaced — not on the path, not before the exam. Written and buried.
- **F55 ○** 1 of 10 chapters has a walk; other paths correctly omit the hero,
  but nothing signals the walk *concept* exists — a student who starts in ch 1
  never learns ch 2 has one.

## G · Exam preparation

- **F56 ▲ [T]** **All eight past papers are Calculus 2** (1MA404/1MA104). A
  Calculus 1 student — the person studying chapters P–5 — has zero exam
  material. The tab most named after the goal serves half the course.
- **F57 ●** Mock exam: "Try it closed-book (5 h)" — no timer, no attempt
  record, no way to mark which problems I got. **Exam practice leaves no trace
  in the observatory** — the world forgets exactly where memory matters most.
- **F58 ●** No route from a failed exam problem back to the skill/section that
  teaches it. The loop exam → study is severed.
- **F59 ●** Theory questions appear in papers; no theory exists in-app (pairs
  with F27).
- **F60 ○** Papers carry no topic tags; can't choose "the one heavy on series".
- **F61 ○** "Generate a mock exam" is strong and is never suggested by any
  momentum flow (e.g., after a chapter review goes green).
- **F62 ●** Formula drill's opening item blanked a pathological footnote
  ("? = 0, yet f ≠ 0 — non-analytic example") — machine-chosen blanks are
  unaudited; the first impression was an unanswerable riddle. (Observed live.)

## H · Ergonomics & posture

- **F63 ●** Repeat-visit inversion: on a *second* visit to a Section Unit, I
  want "Practise" first, but the reference list always precedes the chooser —
  scroll past six ideas every time.
- **F64 ○ [T×O]** Home runs the 3D world by default; commute study that
  starts at Home pays GPU/battery for atmosphere before every session.
  Pause-on-hidden exists; the tax is at open. `[needs-device]`
- **F65 ○** Dark-mode contrast of figures/plates unaudited on OLED at low
  brightness. `[needs-device]`
- **F66 ○** More-page icons: "My notes" and "Recurring cracks" share the same
  notebook glyph — small, but scanning is by icon.
- **F67 ○** iOS dynamic type / text-zoom behaviour unverified. `[needs-device]`

## I · The reach-for-another-resource ledger

The five moments I would have left the app tonight, ranked by frequency:

- **F68 ▲** To *see the algebra done* (F24) → YouTube. Near-every hard item.
- **F69 ▲** To *do* ten problems by hand and get checked (F37) → textbook
  problem sets + solutions.
- **F70 ▲** To *look something up fast* (F9/F10) → Google.
- **F71 ●** To *understand why* (F23) → Professor Leonard.
- **F72 ●** For *theory questions* (F27/F59) → lecture notes.
- **F73 ○** For a *study plan* ("is 10 days enough? what order?") → nothing
  in-app proposes one; priority data exists silently. `[needs-week]`

## J · Open observation slots — only a real week can fill these

- **F74–F88** *(reserved, honest blanks)*: retention after 3 days (do drills
  resurface at the right moment?); rating-fatigue curve across a week;
  whether the home log ever says something that changes behaviour; whether
  "presence" language lands or grates; battery across a library afternoon;
  whether the Vessel is ever visited twice voluntarily; whether reflections
  get re-read unprompted; whether the exam countdown motivates or stresses;
  walk completion rate; whether Speed round is ever chosen; notes usage in
  anger; whether anyone uses the scratchpad instead of paper; dark-room
  legibility; one-handed drill posture; and the ten-minute test with no
  questions due.

---

## Synthesis — where the journal points

**Count: 73 recorded observations + 15 open slots.** No fixes were made.

**The two products, scored honestly.** Tonight the Observatory never blocked
me — but it never *helped* me study either (F1, F45, F64 are the fights). The
Tutor lost on its own: it cannot show algebra (F24), cannot check my work
(F37), cannot be searched (F9), loses my session for curiosity (F32), lies
about progress (F46), and has no Calc-1 exam (F56). **Verdict: the Observatory
is good enough; the Tutor is the weak product.** Exactly the inversion the
roadmap predicts.

**Top of the stack, by (frequency × severity), mapped to the roadmap:**

1. **Learning flow** — F32/F33 (mid-drill reference destroys session, no door
   from failure to concept), F2, F5. The single worst minute of the session.
2. **Examples** — F18: *871 exist, 1 is shown.* Cheapest huge win in the app.
3. **Question quality / application** — F37 (no computation anywhere), F62.
4. **Error diagnosis** — F38: 1,946 tagged mistakes, zero exercises. The
   sloppy-mistakes weapon this app was founded to build.
5. **Progress honesty** — F46/F47: the path must not out-lie the Canon.
6. **Content quality** — F23/F24/F27: intuition layer, shown algebra, theory.
7. **Mobile ergonomics** — F35, F52, F63. `[needs-device]` cluster.
8. **Environments last** — nothing here blocks study today. Freeze holds.

*Nothing in this file is a design. It is what studying felt like.*

---

## Addendum — observed while building the three-phase drill

- **F89 ● [T]** 21 of 871 archetype prompts name their own technique
  ("Differentiate … **using the Reciprocal Rule**"), which hands the Recognize
  phase its answer. Some are legitimate exam phrasings where the technique is
  prescribed; each needs a per-item call (reword, or mark as
  recognition-exempt) in the question-quality pass. Not display-hacked.
- **F90 ○** Plan-phase first-moves come from the confusable skills' archetypes;
  a few open by naming their technique, which softens the distractor. Same
  audit, same pass.

---

## The exam sit — as Mina, closed book

**Protocol.** Generated a professor-style mock (8 problems: 6 computational ×
5 credits, 2 theory proofs), sat it as a student with paper, revealed
solutions to self-mark. Compressed session; nothing fixed — including the
one thing that begged to be.

- **F91 ▲ [T]** **Problem 1 was garbled by our own typography engine.** The
  signature template (T1, Taylor/Maclaurin limit) rendered as
  `cos(x²))/x(ln(1+x` — the plain-text→fraction converter breaks on nested
  parentheses. The raw data is clean; the renderer mangles it. The app's own
  rule — no maths KaTeX can't render — violated by its converter, on the
  professor's most-loved problem, at the moment of highest stakes. *Journaled,
  not fixed, per the no-fix week — this is the single entry I'd break the
  freeze for.*
- **F92 ● [T]** Solutions are cribs, not marking schemes: one inline
  paragraph, numbered step markers fused into adjacent formulas ("x⁴/2."
  then "2."), no display equations, no line breaks. Decoding the solution was
  its own exam.
- **F93 ● [T]** Problems announce "5 credits" but solutions carry no mark
  breakdown — no method/accuracy/presentation split, nothing to think like
  the examiner *with*. (The examiner-Diagnosis vision has no raw material on
  the page yet.)
- **F94 ● [T]** The sit leaves no trace. I finished a full paper with marks
  tallied on my paper and nowhere to put them — no per-problem "got it /
  slipped", so the observatory doesn't know I sat an exam at all. The
  world's memory fails exactly at the highest-stakes practice. (F57,
  confirmed in the flesh.)
- **F95 ● [T]** The anatomy ends where "Solve" begins: drills now run
  Observe → Recognize → Plan → Execute, but the exam reveal hands everything
  at once — no technique gate before the solution, no reconstruction after.
  Scaffold-fading needs its far end.
- **F96 ○** "Drill this skill" under each solution links to the *generic*
  mixed drill (#/drill), not the problem's skill or section — a door to
  somewhere else.
- **F97 ○** Honest positives: a full paper is compact (~3 screens),
  templates are labeled, theory statements render correctly, regeneration
  works, and non-nested statements read cleanly.

**The sit's verdict in one line:** the app can *pose* an exam but cannot yet
*witness* one — problem 1 unreadable (F91), solutions undecodable as marking
schemes (F92/F93), and the observatory blind to the whole event (F94).
