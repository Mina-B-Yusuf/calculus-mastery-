# Professor Exam Playbook — Linnéuniversitetet Calculus 2 (1MA104 / 1MA404)

Built from **8 past exams** (2010, 2011×2, 2012, 2014, 2020, 2023×2). The striking thing about this course: **the professor reuses the same ~8 problem templates every year.** If you can do these eight things cold, you pass — and if you can also do the Part B/C proofs, you get "high pass" (VG).

> ⚠️ Scope note: every past paper is **Calculus 2** ("Analys 2"). This exam is **not** about volumes/centroids (ch. 7) or conics/polar (ch. 8). It is about **Taylor-series limits, integration techniques, improper integrals, sequences, series convergence, power-series radius, one 2nd-order ODE, and real-analysis proofs.** Spend your time there.

## Exam format & grading

- **Part A** — 6 computational problems, **5 credits each** (30 max). Need **≥ 15** to pass.
- **Part B (+ C on newer 1MA404 papers)** — theory: definitions & proofs. Need **1–2 completely correct** proofs to pass; they also add credits toward **"high pass"** (23+).
- 5 hours, **no tools/calculator**. Answers must be "carefully motivated and in readable style" — i.e. **presentation is graded**. Use the Zero-Loss habits: state every theorem's hypotheses, justify each step, write a concluding sentence.

---

## Part A — the 8 recurring templates

### ① The Taylor/Maclaurin limit (appears on EVERY exam — the signature problem)

A `0/0` limit as `x→0` that you crack by expanding **every** term with its Maclaurin series to just-enough order, using the course's bounded-remainder notation `xⁿBₙ(x)` (Bₙ bounded near 0), then cancelling.

Instances:
- `lim (e^{x²/2} − cos x − x²)/(x sin x − x²)` = −1/2 (2011)
- `lim ((1+x²)^{1/2} − cos x − x²)/(x arctan x − x²)` = 1/2 (2010)
- `lim (eˣ − cos x − sin x − x² − x³/3)/(x²(1 − cos x²))` (2011b)
- `lim (1 − cos(x²))/(x(ln(1+x) + e^{−x} − 1))` (2012)
- `lim (ln(1+x) + arctan x − 2x + x²/2)/(x − sin x)` (2014)
- `lim (arctan x − x·e^{−x²/3})/(x³ − x² sin x)` (2020)
- `lim (arctan x − x(1−x²)^{1/3})/(x³ − x ln(1+x²))` (2023) and the Aug-2023 variant
- Twist: `f'(x)=x²+f(x)², f(0)=0, find lim f(x)/x³` — differentiate the ODE to build the Taylor coefficients (2010).

**Method:** memorize the standard series to order needed — `eᵗ, sin, cos, ln(1+x), arctan x, (1+x)^α`. Expand top and bottom to the **lowest order that survives**, keep an `xⁿBₙ(x)` remainder, divide. → App micro-skills `9.6-*` (Maclaurin series) + `4.10` Taylor / `4.3` indeterminate forms.

### ② Trig integral ∫cosᵐ(ax)·sinⁿ(bx) dx

Product-to-sum identities (different inner frequencies `a≠b`), then integrate term by term.
- `∫cos³(5x)sin²(2x)dx`, `∫cos(3x)sin⁴(2x)dx`, `∫cos²(2x)sin³(3x)dx`, `∫cos²(4x)sin⁴(2x)dx`.
→ micro-skills `6.1`/`5.6` trig integrals.

### ③ Inverse / trig substitution & partial-fraction integrals

- Trig-sub roots: `∫x²√(x²−4)dx`, `∫√(x²−1)/x dx`, `∫1/(1+√(x²+1))dx`.
- Partial fractions with a repeated linear + irreducible quadratic: `∫(2x³+5x²+6x−2)/((x+1)²(4+x²))dx`.
- IBP: `∫x² ln x dx`.
→ micro-skills `6.2`, `6.3`, `6.1`.

### ④ Improper-integral convergence (comparison test — nearly every exam)

Decide convergence of `∫₁^∞ …`, usually by comparison with a `p`-integral; the professor often **gives a hint comparison function**.
- `∫₁^∞ (1/√x) sin(1/x)dx`, `∫₂^∞(√(x+1)−√(x−1))arctan(1/x)dx`, `∫₁^∞(1−cos(1/x))dx`, `∫₁^∞ tan(1/x)·1/(1+(ln x)²)dx` (hinted), `∫₀^∞((x³+1)/x³)^{1/4}(1−e^{−1/x²})dx`.
**Method:** find the leading `1/xᵖ` behaviour via a Taylor expansion of the integrand as `x→∞`, then p-test + comparison/limit-comparison. → micro-skills `6.5`.

### ⑤ Recursive sequence — show the limit exists, then find it

`a₀ = …, aₙ₊₁ = √(c·aₙ − d) + e`. Prove **bounded** and **monotone** by induction ⇒ limit exists; then solve `L = √(cL−d)+e` and reject the spurious root.
- `a₀=12, aₙ₊₁=√(7aₙ−3)−1` → 4; `a₀=6, aₙ₊₁=√(2aₙ−3)+2`. → micro-skills `9.1`.

### ⑥ Series convergence, multi-part (a/b/c) — EVERY exam

A three-parter mixing tests. Classic traps: `Σ(1−1/n²)` diverges (nth-term ≠ 0); `Σ n·sin(1/n³)` converges by limit-comparison with `1/n²`; root test on `Σ2ⁿ(1−1/n²)^{n³}` → `2e^{−1}<1`. Also binomial-coefficient ratio monsters (use ratio test): `Σ (3n choose n)(4n choose n)/(5n choose 2n)`.
→ **This is where the app's `9.3-test-selection` drill pays off directly.** Also `Σ(−1)ⁿ/(n(ln n)^r)` and `Σ1/(n ln n (ln ln n)²)` (integral-test / parameter).

### ⑦ Power-series radius of convergence (newer 1MA404 papers)

`Σ aₙxⁿ`, find R via ratio/root on `aₙ`.
- `Σn²xⁿ`, `Σn⁵xⁿ`, `Σ3ⁿxⁿ/2^{n²}`, `Σ((n+1)!−(n−1)!)/n! · xⁿ`, `Σ(n!)⁵2^{−n²}xⁿ`. → micro-skills `9.5-radius-interval-of-convergence`.

### ⑧ (1MA404 additions) 2nd-order linear ODE & asymptotic-constant limit

- **ODE:** `y'' ± 4y' + 5y = e^{±2x}·x·sin x` — characteristic roots complex, RHS needs **undetermined coefficients** with a polynomial×exp×trig ansatz (watch resonance). → micro-skills `3.7`.
- **Asymptotic limit at ∞:** choose constant `a` so that `lim_{x→∞}[… + x²ln x − x²ln(a+x)]` is finite; expand `ln(a+x)=ln x + a/x − …`. Also `lim(Σ₁ⁿ 1/k − ln n)` exists (Euler–Mascheroni; monotone+bounded).

---

## Part B / C — the theory bank (memorize these proofs)

These recycle heavily. Priority = how often they appear:

| Proof / definition | Appears | Priority |
|---|---|---|
| **Limit product law**: lim f·g = A·B | 2010, 2011, 2012, 2023×2 | ★★★ must-know |
| **Limit quotient law**: lim f/g = A/B (B≠0) | 2014, 2023×2 | ★★★ |
| **Absolute convergence ⇒ convergence** | 2011 | ★★ |
| **Root test** (0≤M<1 ⇒ converges) | 2011b, 2014, 2020 | ★★ |
| **Ratio test** proof | 2012 | ★★ |
| **Integral test** proof | 2012 | ★★ |
| **Uniqueness of Taylor expansion** (aₙ=bₙ) | 2011b, 2023 | ★★ |
| **Taylor's formula** with remainder | 2020 | ★★ |
| **Geometric series** Σxᵏ = 1/(1−x), \|x\|<1 | 2011b | ★ |
| Define **sup/inf**, bounded sets | 2011 | ★ |

**Strategy:** the two limit-law proofs (product & quotient, the classic ε-δ arguments) show up on almost every paper — nail those two and you've essentially secured your Part B pass. Then learn root **or** ratio test proof (same skeleton) and Taylor uniqueness.

---

## Your study priority for THIS exam (ranked)

1. **Taylor-series limits** (template ①) — guaranteed, worth 5 credits, and underpins ④'s asymptotics. Drill until automatic.
2. **Series convergence + test selection** (⑥, ⑦) — worth ~10 credits across two problems every exam. Use the app's `9.3-test-selection` recognition drills hard.
3. **Integration techniques** (②③) — 5–10 credits.
4. **Improper integrals** (④) — 5 credits, and it's just Taylor-at-∞ + p-test.
5. **The two limit-law proofs** — cheap insurance for the Part B pass.
6. **Recursive sequences** (⑤) and the **ODE** (⑧) — 5 credits each, very templated.

Everything above lives in the app's Chapters **6 (techniques), 9 (series/Taylor)**, plus `3.7` (ODE), `4.3/4.10` (indeterminate forms/Taylor), `6.5` (improper). You can safely down-prioritize ch. 7 & 8 for this particular exam.
