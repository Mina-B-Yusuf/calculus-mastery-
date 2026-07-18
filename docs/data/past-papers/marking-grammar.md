# The marking grammar

Every solution is writable in one language — the examiner's. Get the atoms
right once, and authoring 70 or 700 marked solutions is mechanical; Compare
and Diagnosis inherit the same vocabulary with no new architecture.

## The atoms

Three kinds, mirroring how university markers actually award credit:

| Atom | Meaning | Falls when… |
|---|---|---|
| **M** | Method mark — a correct *decision* (technique chosen, step attempted) | the wrong attack, or a step never attempted |
| **A** | Accuracy mark — a correct *result* of the nearest preceding M | right idea, wrong algebra |
| **P** | Presentation mark — correct *communication* (+C, justification, stated conditions) | correct maths, sloppy writing |

These are the four failure moments in exam form: M-marks fall at *noticing and
approach*, A-marks at *execution*, P-marks at *communication*.

## Rules for writing atoms

1. **One claim per atom.** Never two skills in one mark.
2. **Verb-first, ≤ 9 words.** "Recognizes partial fractions", not a paragraph.
3. **Solution order.** Atoms read top-to-bottom as the ideal script.
4. **The first atom is always the recognition M1.** Every problem's first mark
   is choosing the right attack — the grammar encodes the anatomy.
5. **A-marks bind to the nearest preceding M.** If the M fell, its A-marks
   fall with it (markers call this "M0 → A0").
6. **P comes last**, and only where the paper actually awards it.
7. **Atoms are data, not prose.** No LaTeX beyond what KaTeX-safe plain
   notation needs; they are read in one glance during self-marking.

## JSON shape

Inside a past-paper problem:

```json
"marks": [
  {"k": "M1", "text": "Recognizes partial fractions over (x+1)² and (x²+4)"},
  {"k": "A1", "text": "Correct decomposition form A/(x+1)+B/(x+1)²+(Cx+D)/(x²+4)"},
  {"k": "A1", "text": "Coefficients A, B, C, D correct"},
  {"k": "M1", "text": "Integrates each term by standard forms"},
  {"k": "A1", "text": "ln, −1/(x+1) and arctan terms correct"},
  {"k": "P1", "text": "Constant of integration stated"}
]
```

## What the atoms buy (the decisions)

- **Self-marking** becomes *"which mark fell first?"* instead of held/lost —
  the examiner's question, answered by the learner about their own paper.
- **Diagnosis** (future) shows a worked student solution and asks the same
  question — same vocabulary, zero new architecture.
- **Compare** (future) annotates three rival solutions in the same atoms, so
  "which earns full marks?" has an objective answer.

## Authoring order

Do not write all seventy. Write the atoms for one problem per template
(T1–T8) first, sit them against the professor-test, then scale. The exemplar
lives on paper `2011b-05-31`, problem A3.
