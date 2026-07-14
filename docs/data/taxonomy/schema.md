# Taxonomy JSON schema

One file per chapter: `data/taxonomy/NN-chapter-slug.json`, matching the `study-guide` chapter files 1:1 (`00-preliminaries.json` … `09-sequences-series-power-series.json`).

This is the data backbone for the app: every drill mode (Pattern Recognition, Formula Memory, Weakness Radar, Zero-Loss, Exam Simulator) reads from this, nothing else. Question banks, mastery tracking, and spaced repetition all key off `micro_skill.id` and `archetype.id`.

## Top-level shape

```jsonc
{
  "chapter": "6",
  "chapter_title": "Techniques of Integration",
  "course": "calculus-2",              // "calculus-1" | "calculus-2"
  "source_file": "study-guide/calculus-2/06-techniques-of-integration.md",
  "micro_skills": [ /* MicroSkill[] */ ]
}
```

## MicroSkill

A micro-skill is the smallest independently-testable unit — finer than a book section. A section like "6.2 Integrals of Rational Functions" typically yields 2-4 micro-skills (e.g. distinct linear factors, repeated linear factors, irreducible quadratic factors).

```jsonc
{
  "id": "6.2-partial-fractions-repeated-linear",   // kebab-case, unique across the whole taxonomy
  "section": "6.2",                                 // book section number this lives in
  "topic": "Integration Techniques",
  "subtopic": "Partial Fractions",
  "micro_skill": "Repeated linear factors",
  "definitions": ["string, precise, exam-usable"],
  "theorems": [
    { "name": "string", "statement": "string", "conditions": ["hypothesis 1", "hypothesis 2"] }
  ],
  "formulas": ["LaTeX or plain-text formula strings"],
  "prerequisites": ["micro_skill id", "micro_skill id"],  // ids of skills this depends on
  "difficulty_levels": ["easy", "medium", "hard"],          // which levels this skill actually has archetypes for
  "question_archetypes": [ /* Archetype[] */ ]
}
```

## Archetype

A distinct *way* the micro-skill gets tested. Aim for 3-6 per micro-skill — enough to cover real variation, not padding.

```jsonc
{
  "id": "6.2-partial-fractions-repeated-linear-basic",
  "difficulty": "medium",                     // "easy" | "medium" | "hard"
  "prompt_template": "Evaluate ∫ P(x)/[(x-r)^k · Q(x)] dx where the denominator has one repeated linear factor",
  "example": "∫ (3x+5)/((x-1)^2(x+2)) dx",
  "answer": "string — final answer or answer form",
  "recognition_cue": "What in the problem statement should trigger this archetype — e.g. 'denominator factors with a squared linear term'",
  "method_plan": [
    "Set up A/(x-1) + B/(x-1)^2 + C/(x+2)",
    "Clear denominators, expand, match coefficients (or plug convenient x-values)",
    "Integrate each term: linear terms give ln, repeated term gives -1/(x-1)"
  ],
  "full_mark_rubric": [
    "M1: correct partial-fraction setup with right number of unknowns",
    "A1: correct coefficients",
    "M1: correct integration of each term",
    "A1: +C included, final answer simplified"
  ],
  "common_errors": [
    { "type": "procedural", "description": "Only using one unknown for the repeated factor instead of two (missing the 1/(x-1)^2 term)" },
    { "type": "presentation", "description": "Forgetting +C" }
  ],
  "merged_topics": ["definite integrals", "improper integrals"],  // other micro_skill ids or free-text topics this commonly combines with
  "similar_past_exam_questions": []   // filled in later once past papers are uploaded: [{ "paper": "2022-final-q4", "similarity": "high" }]
}
```

## Error taxonomy (fixed vocabulary for `common_errors[].type`)

Use exactly these five buckets so the Error Notebook / Weakness Radar can aggregate consistently:

- `conceptual` — wrong theorem, ignored hypothesis, wrong test/technique chosen
- `procedural` — right technique, wrong execution of its steps (e.g. stopped IBP too early, wrong substitution)
- `algebra` — sign/factoring/exponent/arithmetic slip unrelated to the calculus itself
- `presentation` — missing +C, no conclusion, no justification, skipped required step, bad notation
- `strategy` — inefficient method choice, ran out of time, didn't check the answer, missed a shortcut

## ID conventions

- MicroSkill id: `<section>-<slug>` e.g. `4.3-lhopital-0-over-0`
- Archetype id: `<micro_skill.id>-<slug>` e.g. `4.3-lhopital-0-over-0-with-algebraic-prep`
- IDs are permanent once created — the app keys spaced-repetition and mastery data off them, so don't rename an id after data exists for it; add a new one instead.
