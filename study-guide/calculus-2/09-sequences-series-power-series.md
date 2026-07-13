# Chapter 9: Sequences, Series, and Power Series

This is the single most heavily tested chapter on most Calculus 2 finals: professors love asking "does this series converge?" and "find the interval of convergence" because they compress a huge amount of technique into one short problem — master the test-selection skill below and you cover a disproportionate share of exam points.

## 9.1 Sequences and Convergence

A **sequence** $\{a_n\}$ is a function from the positive integers to $\mathbb{R}$. It can be given explicitly ($a_n$ as a formula in $n$) or recursively (each term defined from earlier ones, e.g. the Fibonacci sequence $a_1=a_2=1$, $a_{n+2}=a_n+a_{n+1}$).

**Terminology.** $\{a_n\}$ is **bounded above/below** if some $M/L$ satisfies $a_n\le M$ / $a_n\ge L$ for all $n$; **bounded** if both. It is **increasing** if $a_{n+1}\ge a_n$ for all $n$, **decreasing** if $a_{n+1}\le a_n$; **monotonic** if either. It is **alternating** if consecutive terms have opposite sign. Any of these properties holding only from some point on (not necessarily at the start) is called **ultimate** (e.g. "ultimately decreasing").

**Definition (Limit of a sequence).** $\lim_{n\to\infty}a_n=L$ if for every $\varepsilon>0$ there is an integer $N$ such that $n\ge N \Rightarrow |a_n-L|<\varepsilon$. A sequence **converges** if this limit exists (is finite); otherwise it **diverges** (possibly "to $\infty$" or "to $-\infty$" if it grows without bound in a signed sense, or just "diverges" if it has no limit at all, like $\{(-1)^n\}$).

**Connection to function limits.** If $\lim_{x\to\infty}f(x)=L$ and $a_n=f(n)$, then $\lim_{n\to\infty}a_n=L$. This lets you reuse **all** limit laws (sum, product, quotient, Squeeze Theorem, l'Hôpital's Rule after converting to a function of a real variable) from single-variable limits.

**Theorem.** If $\{a_n\}$ converges, then $\{a_n\}$ is bounded. (Converse false: $\{(-1)^n\}$ is bounded but does not converge.)

**Theorem (Bounded monotonic sequences converge).** If $\{a_n\}$ is (ultimately) increasing and bounded above, it converges; likewise if (ultimately) decreasing and bounded below. If increasing and *not* bounded above, it diverges to $\infty$.

**Theorem (Two workhorse limits).**
(a) If $|x|<1$, then $\displaystyle\lim_{n\to\infty}x^n=0$.
(b) For any real $x$, $\displaystyle\lim_{n\to\infty}\frac{x^n}{n!}=0$.

These two facts are the engine behind the ratio test later in this chapter — memorize them.

**Worked Example 1 (basic limit laws).** $\displaystyle\lim_{n\to\infty}\frac{2n^2-n-1}{5n^2+n-3}$. Divide numerator and denominator by $n^2$: $\to \dfrac{2-0-0}{5+0-0}=\dfrac25$.

**Worked Example 2 (Squeeze Theorem).** $\displaystyle\lim_{n\to\infty}\frac{\cos n}{n}=0$ since $-\tfrac1n\le\tfrac{\cos n}n\le\tfrac1n$ and both bounds $\to0$.

**Worked Example 3 (recursive sequence, monotone convergence).** $a_1=1$, $a_{n+1}=\sqrt{6+a_n}$. Show $\{a_n\}$ is increasing (by induction, using $a_2=\sqrt7>a_1$) and bounded above by 3 (by induction, since $a_k<3\Rightarrow a_{k+1}=\sqrt{6+a_k}<\sqrt9=3$). So the limit $a=\lim a_n$ exists; taking limits of both sides of the recursion, $a=\sqrt{6+a}\Rightarrow a^2-a-6=0\Rightarrow a=3$ or $a=-2$; since $a_n\ge1$ always, $a=3$.

**Worked Example 4 (l'Hôpital via the real-variable trick).** $\displaystyle\lim_{n\to\infty} n\tan^{-1}(1/n)$. Replace $n$ by $x\to\infty$, rewrite as $\dfrac{\tan^{-1}(1/x)}{1/x}$ (form $0/0$), apply l'Hôpital: limit $=1$.

> **Common mistakes:** Confusing a *sequence* converging with a *series* converging — these are entirely different objects (Section 9.2 clarifies this). Also, don't assume monotonic + bounded from the first few terms; check the *ultimate* behavior (some sequences dip before settling into monotonic behavior).

## 9.2 Infinite Series

A **series** $\sum_{n=1}^\infty a_n$ is defined via its sequence of **partial sums** $s_n=a_1+a_2+\cdots+a_n$.

**Definition (Convergence of a series).** $\sum_{n=1}^\infty a_n=s$ if $\lim_{n\to\infty}s_n=s$. If $\{s_n\}$ diverges, so does the series (possibly to $\pm\infty$).

**Geometric series.** $\displaystyle\sum_{n=1}^\infty ar^{n-1}=a+ar+ar^2+\cdots$. Partial sum $s_n=a\dfrac{1-r^n}{1-r}$ ($r\ne1$).

$$\sum_{n=1}^\infty ar^{n-1} = \begin{cases}\dfrac{a}{1-r} & |r|<1\\[4pt]\text{diverges} & |r|\ge1,\ a\ne0.\end{cases}$$

**Telescoping series.** If $a_n=b_n-b_{n+1}$, then $s_n=b_1-b_{n+1}$, so $\sum a_n$ converges iff $\{b_n\}$ converges, with sum $b_1-\lim b_n$. Classic example: $\dfrac1{n(n+1)}=\dfrac1n-\dfrac1{n+1}$, giving $\sum_{n=1}^\infty\dfrac1{n(n+1)}=1$.

**The harmonic series.** $\displaystyle\sum_{n=1}^\infty\frac1n$ **diverges to $\infty$**, even though $a_n\to0$. Proof by comparing partial sums to $\int_1^{n+1}dx/x=\ln(n+1)\to\infty$. This single fact — a series whose terms $\to0$ can still diverge — is the most important cautionary example in the whole chapter.

**Theorem ($n$th-Term Test for Divergence).** If $\sum a_n$ converges, then $\lim_{n\to\infty}a_n=0$. Contrapositive: if $a_n\not\to0$ (or the limit doesn't exist), $\sum a_n$ **diverges**.

> This is a one-way test — it can only prove divergence, never convergence. **The converse is false** (harmonic series: $a_n\to0$ but the series diverges). Always check the $n$th-term test *first*, since it's the fastest way to rule out convergence, but if $a_n\to0$ you have learned nothing yet.

**Theorem.** $\sum_{n=1}^\infty a_n$ converges iff $\sum_{n=N}^\infty a_n$ converges for any fixed $N$ — convergence depends only on the "tail" of a series (dropping finitely many terms never changes convergence/divergence, though it does change the sum).

**Theorem.** An (ultimately) positive series either converges (partial sums bounded above) or diverges to $\infty$ (partial sums unbounded) — it cannot oscillate.

**Theorem (Termwise operations).** If $\sum a_n\to A$ and $\sum b_n\to B$, then $\sum ca_n\to cA$ and $\sum(a_n\pm b_n)\to A\pm B$.

**Worked Example 1 (geometric series application — repeating decimal).** $0.\overline{32}=\sum_{n=1}^\infty \dfrac{32}{100}\Big(\dfrac1{100}\Big)^{n-1} = \dfrac{32/100}{1-1/100}=\dfrac{32}{99}.$

**Worked Example 2 (present value of an annuity, geometric series).** \$1000/year forever at 5% annual interest: value today is $\sum_{n=1}^\infty 1000(1.05)^{-n} = \dfrac{1000/1.05}{1-1/1.05}=\dfrac{1000}{0.05}=\$20{,}000.$

**Worked Example 3 (telescoping).** $\displaystyle\sum_{n=1}^\infty\frac1{n(n+1)}$: partial fractions $\dfrac1n-\dfrac1{n+1}$, so $s_n=1-\dfrac1{n+1}\to1$. Sum is $1$.

**Worked Example 4 ($n$th-term test).** $\displaystyle\sum_{n=1}^\infty\frac{n}{2n-1}$ diverges since $a_n\to\tfrac12\ne0$.

> **Common mistakes:** Believing $a_n\to0 \Rightarrow \sum a_n$ converges (false — harmonic series). Applying the geometric series sum formula when $|r|\ge1$. Forgetting that a series index can start anywhere; shifting the index changes $a_n$'s formula but not convergence.

## 9.3 Convergence Tests for Positive Series

All tests below apply to series that are (ultimately) **positive**, i.e., $a_n\ge0$ for $n$ large.

**Theorem (Integral Test).** If $a_n=f(n)$ where $f$ is positive, continuous, and (ultimately) decreasing on $[N,\infty)$, then $\sum_{n=1}^\infty a_n$ and $\int_N^\infty f(t)\,dt$ **both converge or both diverge**. (The integral's *value* is unrelated to the series' *sum* — the test only compares convergence behavior.)

**The $p$-series (memorize this).**
$$\sum_{n=1}^\infty \frac1{n^p} \ \text{converges if } p>1,\ \text{diverges (to }\infty\text{) if } p\le1.$$
This is the single most useful comparison series in the chapter.

**Estimating series sums with integral bounds.** If $a_k=f(k)$ with $f$ positive, continuous, decreasing on $[n,\infty)$, and $A_n=\int_n^\infty f(x)\,dx$, then $s_n+A_{n+1}\le s\le s_n+A_n$; the midpoint estimate $s\approx s_n+\tfrac12(A_n+A_{n+1})$ has error at most $\tfrac12(A_n-A_{n+1})$.

**Theorem (Comparison Test).** Suppose $0\le a_n\le Kb_n$ ultimately, for some constant $K>0$.
(a) If $\sum b_n$ converges, so does $\sum a_n$.
(b) If $\sum a_n$ diverges to $\infty$, so does $\sum b_n$.
(**Not** the other way — a smaller series converging tells you nothing about a larger one, and vice versa for divergence in the "wrong" direction.)

**Theorem (Limit Comparison Test).** Suppose $a_n,b_n>0$ and $L=\lim_{n\to\infty}a_n/b_n$ exists (finite) or is $+\infty$.
(a) If $L<\infty$ and $\sum b_n$ converges, then $\sum a_n$ converges.
(b) If $L>0$ and $\sum b_n$ diverges to $\infty$, then $\sum a_n$ diverges to $\infty$.
In particular, if $0<L<\infty$, the two series **always** share the same convergence behavior — this is the practical form used almost every time.

**Theorem (Ratio Test).** Let $a_n>0$ (ultimately) and $\rho=\lim_{n\to\infty}\dfrac{a_{n+1}}{a_n}$ (or $\rho=+\infty$).
- $0\le\rho<1$: $\sum a_n$ converges.
- $\rho>1$ (including $\rho=\infty$): $\sum a_n$ diverges to $\infty$ (in fact $a_n\to\infty$).
- $\rho=1$: **no information** — could converge or diverge.

**Theorem (Root Test).** Let $a_n>0$ (ultimately) and $\rho=\lim_{n\to\infty}(a_n)^{1/n}$ (or $+\infty$). Same three-way conclusion as the ratio test with the same thresholds.

**Estimating sums via geometric tails.** If $0\le a_k\le Kr^k$ for $k>n$ with $r<1$, then $0\le s-s_n\le \dfrac{Kr^{n+1}}{1-r}$ — the error shrinks geometrically, much faster than the $1/n^{p-1}$-type error from a $p$-series tail.

### Convergence Test Selection Guide (Positive Series)

This is the actual hard part — knowing *which* test to reach for. Work through these questions roughly in order:

1. **Does $a_n\to0$?** If not (or the limit doesn't exist), stop: **diverges** by the $n$th-term test. (Always check this first — it's free and instant.)
2. **Is it geometric** ($a_n=ar^{n-1}$, a constant ratio between consecutive terms)? Use the geometric series formula directly.
3. **Is it telescoping** (partial fractions collapse consecutive terms)? Find $s_n$ in closed form directly.
4. **Does $a_n$ involve $n!$ or $n^n$ (factorials, or $n$ in both base and exponent)?** Reach for the **Ratio Test** first — factorials collapse beautifully under $a_{n+1}/a_n$.
5. **Does $a_n$ look like $(\text{stuff})^n$ raised to the $n$th power overall (e.g. $\left(\frac{n}{n+1}\right)^{n^2}$)?** Try the **Root Test**.
6. **Is $a_n=f(n)$ for an $f$ you can easily antidifferentiate, and is $f$ positive/continuous/decreasing?** Try the **Integral Test** — especially useful for $\ln n$-type terms that don't fit clean comparisons ($\sum 1/(n\ln n)$, etc.).
7. **Otherwise — the default workhorse: Comparison / Limit Comparison against a $p$-series or geometric series.** Look at the dominant behavior of $a_n$ for large $n$ (ignore lower-order terms — "$3n+1$ behaves like $3n$," "$\sqrt{n^3+5}$ behaves like $n^{3/2}$") to guess the right $p$, then confirm with the **Limit Comparison Test** (easier algebra than ordinary comparison, and works whenever the limit $L$ is a finite positive number).
8. **Rational or algebraic functions of $n$** (polynomials, roots, no factorials/exponentials) almost always resolve via comparison with a $p$-series — the ratio and root tests give $\rho=1$ (no information) on these, so **don't waste time on them here**.
9. If several tests seem plausible, prefer **Limit Comparison** and **Ratio Test** — they usually require the least algebra.

**A key diagnostic:** the ratio test is *inconclusive* ($\rho=1$) for **every** $p$-series and for any series where $a_n$ is a rational (or more generally algebraic, non-exponential) function of $n$. If you compute $\rho=1$ on such a series, that is *expected*, not a sign of a mistake — switch immediately to a comparison test.

**Worked Example 1 (limit comparison, algebraic terms).** Test $\displaystyle\sum_{n=1}^\infty\frac{n+5}{n^3-2n+3}$. For large $n$, this behaves like $n/n^3=1/n^2$. Compare with $b_n=1/n^2$ ($p=2$, converges):
$$L=\lim_{n\to\infty}\frac{(n+5)/(n^3-2n+3)}{1/n^2}=\lim_{n\to\infty}\frac{n^3+5n^2}{n^3-2n+3}=1.$$
Since $0<L<\infty$ and $\sum 1/n^2$ converges, the given series **converges**.

**Worked Example 2 (ratio test, factorials).** Test $\displaystyle\sum_{n=1}^\infty\frac{(2n)!}{(n!)^2}$.
$$\rho=\lim_{n\to\infty}\frac{(2n+2)!/((n+1)!)^2}{(2n)!/(n!)^2}=\lim_{n\to\infty}\frac{(2n+2)(2n+1)}{(n+1)^2}=4>1 \ \Rightarrow\ \textbf{diverges to }\infty.$$

**Worked Example 3 (integral test, log terms).** Test $\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln n}$. Here $f(x)=1/(x\ln x)$ is positive, continuous, decreasing for $x\ge2$; $\int_2^\infty \dfrac{dx}{x\ln x}=\big[\ln(\ln x)\big]_2^\infty=\infty$. **Diverges.** (Comparison alone is awkward here since $\ln n$ grows too slowly to compare cleanly against a $p$-series — this is exactly the situation the integral test is built for.)

**Worked Example 4 (choosing between multiple valid approaches).** Test $\displaystyle\sum_{n=1}^\infty\frac{n^5}{2^n}$. Factorial/exponential flavor (has $2^n$) $\Rightarrow$ try ratio test:
$$\rho=\lim_{n\to\infty}\frac{(n+1)^5/2^{n+1}}{n^5/2^n}=\lim_{n\to\infty}\frac12\Big(\frac{n+1}{n}\Big)^5=\frac12<1 \ \Rightarrow\ \textbf{converges}.$$

> **Common mistakes:** (1) Using the ratio test on a $p$-series or rational-function series and getting $\rho=1$, then wrongly concluding "diverges" — $\rho=1$ means **no information**, not divergence. (2) Ordinary comparison in the "wrong direction" — e.g. trying to prove divergence by finding a *smaller* convergent series (proves nothing). (3) Forgetting the Limit Comparison Test requires $a_n,b_n>0$. (4) Sloppy "behaves like" reasoning without confirming via an actual limit computation.

## 9.4 Absolute and Conditional Convergence

**Definition (Absolute convergence).** $\sum a_n$ is **absolutely convergent** if $\sum|a_n|$ converges.

**Theorem.** Absolute convergence $\Rightarrow$ convergence. (Proof: $0\le a_n+|a_n|\le 2|a_n|$, compare.)

**Definition (Conditional convergence).** $\sum a_n$ converges but $\sum|a_n|$ diverges.

The comparison tests, integral test, ratio test, and root test — all from Section 9.3 — can be applied to *any* series (not just positive ones) by applying them to $\sum|a_n|$; this tests for **absolute** convergence. If the ratio test on $|a_n|$ gives $\rho>1$, then in fact $|a_n|\to\infty$ (so $a_n\not\to0$), meaning the original series diverges too — not just fails to converge absolutely.

**Theorem (Alternating Series Test).** Suppose $\{a_n\}$ satisfies, ultimately: (i) terms alternate in sign, (ii) $|a_{n+1}|\le|a_n|$ (sizes are ultimately non-increasing), (iii) $\lim_{n\to\infty}a_n=0$. Then $\sum a_n$ **converges**.

**Theorem (Alternating series error bound).** Under the above hypotheses, the error in using $s_n$ to approximate the sum $s$ satisfies
$$|s-s_n|\le|a_{n+1}| \quad(\text{the first omitted term}),$$
and the sign of the error matches the sign of $a_{n+1}$.

**Test-selection protocol for a general series $\sum a_n$:**
1. Try to show **absolute convergence** first (apply Section 9.3 tests to $|a_n|$) — if it converges absolutely, you're done; conditional convergence is a fallback, not a first resort.
2. If $\sum|a_n|$ diverges but $a_n$ **strictly alternates** and (ii)–(iii) hold, use the **Alternating Series Test** to get conditional convergence.
3. If the series doesn't alternate and isn't absolutely convergent, more advanced tools are needed (beyond this course) — but on an exam, if it's not alternating, absolute convergence tests are almost always what's intended.

**Worked Example 1 (absolute vs conditional, classic case).** $\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}{n}$ (alternating harmonic series). $\sum|a_n|=\sum 1/n$ diverges (harmonic), so **not absolutely convergent**. But $a_n=1/n$ is decreasing to $0$, alternating — **converges conditionally** by the Alternating Series Test. (Its sum is $\ln 2$, shown in Section 9.5.)

**Worked Example 2 (ratio test settles absolute convergence directly).** $\displaystyle\sum_{n=1}^\infty\frac{n\cos(n\pi)}{2^n}$ (note $\cos(n\pi)=(-1)^n$). Apply the ratio test to $|a_n|$:
$$\rho=\lim_{n\to\infty}\frac{n+1}{2n}=\frac12<1 \ \Rightarrow\ \textbf{absolutely convergent}.$$

**Worked Example 3 (interval of absolute/conditional convergence — a preview of power series).** For what $x$ does $\displaystyle\sum_{n=1}^\infty \frac{(x-5)^n}{n\,2^n}$ converge absolutely / conditionally / diverge? Ratio test on $|a_n|$:
$$\rho=\lim_{n\to\infty}\frac{n}{n+1}\Big|\frac{x-5}2\Big|=\Big|\frac{x-5}2\Big|.$$
Absolute convergence for $\Big|\dfrac{x-5}2\Big|<1 \Leftrightarrow 3<x<7$. At $x=3$: series becomes $\sum(-1)^n/n$ — conditionally convergent. At $x=7$: series becomes $\sum1/n$ — diverges. **Converges absolutely on $(3,7)$, conditionally at $x=3$, diverges elsewhere** (including $x=7$).

**Worked Example 4 (alternating series test fails to apply — check hypotheses).** Does the Alternating Series Test show $\displaystyle\sum_{n=1}^\infty(-1)^{n-1}\frac{n+1}{n}$ converges? **No** — condition (iii) fails: $a_n=(n+1)/n\to1\ne0$. In fact the series diverges by the $n$th-term test.

**Theorem (Rearrangement).**
(a) Rearranging the terms of an **absolutely** convergent series never changes its sum.
(b) A **conditionally** convergent series can be rearranged to converge to *any* prescribed real number (or to diverge to $+\infty$, $-\infty$, or oscillate) — conditional convergence is order-dependent. (Sketch: the positive-term subseries and negative-term subseries of a conditionally convergent series each diverge, to $+\infty$ and $-\infty$ respectively, so you can always add enough terms of one sign to overshoot any target, then switch signs.)

> **Common mistakes:** (1) Concluding "conditionally convergent" without first checking whether the series actually converges at all (must verify the Alternating Series Test hypotheses, not just "it alternates"). (2) Applying the Alternating Series Test to prove *absolute* convergence (it never does — it only shows plain convergence). (3) Forgetting to check condition (iii) ($a_n\to0$) — a series can alternate and have non-increasing $|a_n|$ that still doesn't tend to $0$ only if it's eventually constant in size, but always double-check this limit explicitly. (4) Treating "converges conditionally" and "converges" as different strengths when deciding *whether* a series converges (they're the same for that purpose) — the distinction only matters for rearrangement and for how "robust" the convergence is.

## 9.5 Power Series

**Definition (Power series).** A series of the form $\displaystyle\sum_{n=0}^\infty a_n(x-c)^n$ is a power series in powers of $x-c$, or "about $c$"; $c$ is the **centre of convergence**.

**Theorem.** For any power series, exactly one of the following holds:
(i) it converges only at $x=c$ (radius of convergence $R=0$);
(ii) it converges for all real $x$ ($R=\infty$);
(iii) there is $R>0$ such that it converges (absolutely) for $|x-c|<R$ and diverges for $|x-c|>R$, with the two **endpoints** $x=c\pm R$ requiring **separate** case-by-case investigation (it may converge absolutely, conditionally, or diverge at each endpoint independently).

The set of all $x$ where the series converges is the **interval of convergence**; $R$ is the **radius of convergence**.

**Finding $R$ (via the ratio test).** If $L=\lim_{n\to\infty}\left|\dfrac{a_{n+1}}{a_n}\right|$ exists or is $\infty$, then $R=1/L$ (with $R=\infty$ if $L=0$, $R=0$ if $L=\infty$).

### How to find the interval of convergence — a step-by-step recipe

1. Apply the **ratio test** (or root test) to the general term $a_n(x-c)^n$, treating $x$ as fixed; compute $\rho=\lim_{n\to\infty}|a_{n+1}(x-c)^{n+1}/(a_n(x-c)^n)|$. This will simplify to (something not involving $x$)$\times |x-c|$.
2. Solve $\rho<1$ for $x$: this gives the open interval $(c-R,\ c+R)$ of **absolute** convergence.
3. **Separately** test each endpoint $x=c-R$ and $x=c+R$ by substituting the exact value into the *original* series and using Section 9.3/9.4 tests (usually $p$-series, alternating series test, or the $n$th-term test — the ratio test will be useless here since it gives exactly $\rho=1$ at both endpoints, by construction).
4. State the final interval, being careful about open/closed brackets at each end independently.

**Worked Example 1 (full interval-of-convergence computation).** Find the centre, radius, and interval of convergence of $\displaystyle\sum_{n=0}^\infty \frac{(2x+5)^n}{(n^2+1)3^n}$.

Rewrite as $\displaystyle\sum_{n=0}^\infty \Big(\frac23\Big)^n\frac1{n^2+1}\Big(x+\frac52\Big)^n$; centre $c=-5/2$.
$$\frac1R = \lim_{n\to\infty}\left|\frac{(2/3)^{n+1}/((n+1)^2+1)}{(2/3)^n/(n^2+1)}\right| = \frac23\lim_{n\to\infty}\frac{n^2+1}{(n+1)^2+1}=\frac23 \ \Rightarrow\ R=\frac32.$$
Absolute convergence on $\big(-4,\,-1\big)$. At $x=-1$: series is $\sum 1/(n^2+1)$ — converges (compare to $p=2$). At $x=-4$: series is $\sum(-1)^n/(n^2+1)$ — converges absolutely (same comparison, since $|a_n|$ is the same convergent series). **Interval of convergence: $[-4,-1]$**, with absolute convergence at both endpoints too — so in fact the series converges absolutely everywhere on $[-4,-1]$.

**Worked Example 2 (endpoints behave differently — one open, one closed).** Find the interval of convergence of $\displaystyle\sum_{n=1}^\infty \frac{(x-1)^n}{n}$.
$$\rho = \lim_{n\to\infty}\frac{n}{n+1}|x-1| = |x-1| \ \Rightarrow\ R=1,\ \text{centre } c=1.$$
Open interval of absolute convergence: $(0,2)$. At $x=2$: $\sum 1/n$ — **diverges**. At $x=0$: $\sum(-1)^n/n$ — **converges conditionally** (Alternating Series Test). **Interval of convergence: $[0,2)$** — converges conditionally at $x=0$, absolutely on $(0,2)$, diverges at $x=2$ and beyond.

**Worked Example 3 (infinite radius of convergence).** $\displaystyle\sum_{n=0}^\infty \frac{x^n}{n!}$: $\rho=\lim_{n\to\infty}\dfrac{|x|}{n+1}=0$ for every $x$, so $R=\infty$ — converges absolutely for **all** real $x$. (This series turns out to equal $e^x$; see Section 9.6.)

**Worked Example 4 (radius zero).** $\displaystyle\sum_{n=0}^\infty n!\,x^n$: $\rho=\lim_{n\to\infty}(n+1)|x|=\infty$ for any $x\ne0$, so $R=0$ — converges **only** at $x=0$.

**Algebra of power series.** Two power series with the same centre can be added/subtracted termwise on their common interval of convergence, and multiplied via the **Cauchy product**: if $f(x)=\sum a_nx^n$ and $g(x)=\sum b_nx^n$, then $f(x)g(x)=\sum c_nx^n$ where $c_n=\sum_{j=0}^n a_jb_{n-j}$, at least on the smaller of the two radii of convergence.

**Theorem (Term-by-term differentiation and integration).** If $f(x)=\sum_{n=0}^\infty a_nx^n$ converges on $(-R,R)$, $R>0$, then $f$ is differentiable there and
$$f'(x) = \sum_{n=1}^\infty na_nx^{n-1}, \qquad \int_0^x f(t)\,dt = \sum_{n=0}^\infty \frac{a_n}{n+1}x^{n+1},$$
**both valid on the same open interval $(-R,R)$** (the radius of convergence is unchanged by differentiating or integrating termwise — though convergence *at the endpoints* can change: differentiating can lose endpoint convergence, integrating can gain it).

**Theorem (Abel's Theorem).** The sum of a power series is continuous everywhere on its full interval of convergence, including at any endpoint where it converges. In particular if $\sum a_nR^n$ converges, then $\lim_{x\to R^-}\sum a_nx^n=\sum a_nR^n$.

**Worked Example 5 (building new series from the geometric series).** Starting from $\dfrac1{1-x}=\sum_{n=0}^\infty x^n$ ($|x|<1$):
- Differentiate: $\dfrac1{(1-x)^2}=\sum_{n=1}^\infty nx^{n-1}$.
- Substitute $-t$ for $x$, then integrate $0$ to $x$: $\ln(1+x)=\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n-1}}n x^n$, valid on $(-1,1]$ (endpoint $x=1$ gained by Abel's theorem, recovering $\ln2=1-\tfrac12+\tfrac13-\cdots$).
- Substitute $-t^2$ for $x$, integrate: $\tan^{-1}x = \displaystyle\sum_{n=0}^\infty \frac{(-1)^n}{2n+1}x^{2n+1}$, valid on $[-1,1]$ (giving the famous $\pi/4=1-\tfrac13+\tfrac15-\cdots$ at $x=1$).

> **Common mistakes:** (1) Forgetting to check the endpoints separately — this is the single most common lost-points error on "find the interval of convergence" problems. (2) Using the ratio test *at* an endpoint (it always gives exactly $\rho=1$ there by construction — useless; you must plug in the exact numeric value and use a Section 9.3/9.4 test). (3) Sign errors substituting $-x$ or $-x^2$ into a known series (every odd-indexed term flips sign). (4) Assuming differentiating or integrating a series doesn't change endpoint behavior — it can (differentiating a series can lose convergence at an endpoint where the original series converged only conditionally).

## 9.6 Taylor and Maclaurin Series

**Theorem.** If $f(x)=\sum_{n=0}^\infty a_n(x-c)^n$ converges to $f(x)$ on $(c-R,c+R)$, $R>0$, then necessarily
$$a_k = \frac{f^{(k)}(c)}{k!}, \qquad k=0,1,2,\ldots$$

**Definition (Taylor / Maclaurin series).** If $f$ has derivatives of all orders at $c$, the **Taylor series of $f$ about $c$** is
$$\sum_{k=0}^\infty \frac{f^{(k)}(c)}{k!}(x-c)^k = f(c)+f'(c)(x-c)+\frac{f''(c)}{2!}(x-c)^2+\cdots$$
If $c=0$, this is called the **Maclaurin series**. (Partial sums are exactly the Taylor/Maclaurin polynomials from earlier in the course.)

**Definition (Analytic function).** $f$ is **analytic at $c$** if its Taylor series about $c$ converges to $f(x)$ on some open interval containing $c$. Having a Taylor series is *not* the same as being analytic — the series might converge to the wrong value, or converge nowhere except at $c$ itself (a pathological example: $f(x)=e^{-1/x^2}$, $f(0)=0$, has *every* derivative $0$ at $x=0$, so its Maclaurin series is identically $0$, yet $f(x)\ne0$ for $x\ne0$).

**Theorem (Taylor's Theorem with remainder).** If $f^{(n+1)}$ exists on an interval containing $c$ and $x$, then $f(x)=P_n(x)+E_n(x)$ where $P_n$ is the degree-$n$ Taylor polynomial and the error (remainder) can be written either as
$$\textbf{Lagrange form:}\quad E_n(x)=\frac{f^{(n+1)}(s)}{(n+1)!}(x-c)^{n+1}\ \text{for some } s \text{ between } c,x, \qquad \textbf{Integral form:}\quad E_n(x)=\frac1{n!}\int_c^x(x-t)^nf^{(n+1)}(t)\,dt.$$
Showing $\lim_{n\to\infty}E_n(x)=0$ on an interval is exactly what it means to prove $f$ is analytic there.

### Table of Standard Maclaurin Series (memorize all of these)

| Function | Series | Radius of convergence |
|---|---|---|
| $\dfrac1{1-x}$ | $\displaystyle\sum_{n=0}^\infty x^n = 1+x+x^2+x^3+\cdots$ | $R=1$ (converges on $(-1,1)$ only) |
| $\dfrac1{(1-x)^2}$ | $\displaystyle\sum_{n=1}^\infty nx^{n-1}=1+2x+3x^2+\cdots$ | $R=1$ |
| $e^x$ | $\displaystyle\sum_{n=0}^\infty \frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$ | $R=\infty$ |
| $\sin x$ | $\displaystyle\sum_{n=0}^\infty \frac{(-1)^n}{(2n+1)!}x^{2n+1}=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$ | $R=\infty$ |
| $\cos x$ | $\displaystyle\sum_{n=0}^\infty \frac{(-1)^n}{(2n)!}x^{2n}=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$ | $R=\infty$ |
| $\sinh x$ | $\displaystyle\sum_{n=0}^\infty \frac{x^{2n+1}}{(2n+1)!}=x+\frac{x^3}{3!}+\frac{x^5}{5!}+\cdots$ | $R=\infty$ |
| $\cosh x$ | $\displaystyle\sum_{n=0}^\infty \frac{x^{2n}}{(2n)!}=1+\frac{x^2}{2!}+\frac{x^4}{4!}+\cdots$ | $R=\infty$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n}x^n=x-\frac{x^2}2+\frac{x^3}3-\cdots$ | $R=1$ (converges on $(-1,1]$) |
| $\tan^{-1}x$ | $\displaystyle\sum_{n=0}^\infty \frac{(-1)^n}{2n+1}x^{2n+1}=x-\frac{x^3}3+\frac{x^5}5-\cdots$ | $R=1$ (converges on $[-1,1]$) |
| $(1+x)^r$ (binomial series, $r$ any real) | $\displaystyle 1+\sum_{n=1}^\infty \frac{r(r-1)\cdots(r-n+1)}{n!}x^n$ | $R=1$ in general (endpoints depend on $r$; if $r$ is a nonnegative integer, the series terminates and $R=\infty$) |

**Worked Example 1 (deriving $e^x$'s series from scratch, and proving convergence).** $f(x)=e^x$: all derivatives equal $e^x$, so $f^{(n)}(0)=1$, giving $\sum x^n/n!$. Ratio test shows $R=\infty$. To confirm the series actually equals $e^x$ (not just "has this Taylor series"), one shows $g(x)=\sum x^n/n!$ satisfies $g'=g$, $g(0)=1$ — the defining IVP for $e^x$ — so $g(x)=e^x$ for all $x$; hence $e^x$ is analytic everywhere.

**Worked Example 2 (Maclaurin series for $\sin x$, verified via a differential equation).** Direct differentiation gives $f^{(2k)}(0)=0$, $f^{(2k+1)}(0)=(-1)^k$, producing the series above. To verify convergence to $\sin x$ itself (not just formal agreement of derivatives at $0$): let $g(x)$ be the series sum; term-by-term differentiation gives $g''=-g$, with $g(0)=0,g'(0)=1$ — the same IVP satisfied by $\sin x$ — so $g(x)=\sin x$ for all $x$.

**Worked Example 3 (substitution to build new series).** Find the Maclaurin series for $e^{-x^2/3}$: substitute $-x^2/3$ for $x$ in the $e^x$ series:
$$e^{-x^2/3}=\sum_{n=0}^\infty \frac{(-1)^n}{3^nn!}x^{2n}, \quad \text{valid for all } x.$$

**Worked Example 4 (Taylor series about a nonzero centre, via substitution).** Find the Taylor series for $\ln x$ about $x=2$. Write $\ln x=\ln\big(2(1+\tfrac{x-2}2)\big)=\ln2+\ln(1+t)$ where $t=(x-2)/2$; substitute into the $\ln(1+t)$ series:
$$\ln x = \ln2+\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n\,2^n}(x-2)^n, \qquad \text{valid for } 0<x\le4.$$

**Worked Example 5 (series obtained by long division — no closed form for the general term).** Find the first three nonzero terms of the Maclaurin series for $\tan x=\sin x/\cos x$ by dividing series: $\tan x = x+\tfrac13x^3+\tfrac2{15}x^5+\cdots$. (Not every series manipulation yields a clean formula for the $n$th term — long division and series substitution often only give the first several terms in practice, and that is an acceptable final answer when no pattern is apparent.)

> **Common mistakes:** (1) Assuming that because a function has derivatives of all orders at $c$, its Taylor series automatically converges to $f$ — false in general (needs $E_n(x)\to0$, or an independent argument like matching a differential equation/initial condition). (2) Forgetting the alternating sign pattern $(-1)^n$ or $(-1)^{n-1}$ (off-by-one sign errors are extremely common — always sanity-check against the first couple of terms you can compute directly). (3) Misindexing $(2n)!$ vs. $(2n+1)!$ between $\cos$ and $\sin$. (4) Forgetting that $\ln(1+x)$'s series requires $x$ (not $1+x$) as the expansion variable — don't confuse with a Taylor series for $\ln x$ centred elsewhere.

## 9.7 Applications of Taylor and Maclaurin Series

**Approximating function values.** Truncate a Taylor/Maclaurin series at a term where the *remaining* error is provably small — either via the Lagrange remainder bound (Section 9.6) or, when the series is alternating, via the much simpler **alternating series error bound** ($|s-s_n|\le|a_{n+1}|$, Section 9.4). Prefer expanding about a centre **as close as possible** to the point of evaluation — fewer terms are needed for the same accuracy.

**Worked Example 1 ($\cos 43°$ to 4 decimal places, two methods).** Using the Maclaurin series (centred at $0$) needs more terms than using the Taylor series centred at $\pi/4$ (since $43°$ is much closer to $45°$ than to $0°$):
$$\cos43^\circ=\cos\Big(\frac\pi4-\frac\pi{90}\Big)=\frac1{\sqrt2}\Big(1+\frac\pi{90}-\frac12\Big(\frac\pi{90}\Big)^2+\cdots\Big)\approx0.731358,$$
matching the true value $0.7313537\ldots$ to 5 decimals using only two terms — versus needing 4 terms of the Maclaurin series about $0$ for the same accuracy.

**Functions defined by integrals with no elementary antiderivative.** Integrate a known Maclaurin series term by term to get a series for the antiderivative, then evaluate numerically.

**Worked Example 2.** $E(x)=\int_0^x e^{-t^2}\,dt$ (related to the error function, no elementary closed form). Its Maclaurin series is $\displaystyle\sum_{n=0}^\infty \frac{(-1)^nx^{2n+1}}{(2n+1)n!}$; evaluating at $x=1$ and using the alternating series bound gives $E(1)\approx0.747$ to 3 decimals (needs 6 terms).

**Indeterminate forms via series (an alternative to l'Hôpital).** Substitute the Maclaurin series of each factor, expand, and cancel algebraically — often *faster* than repeated l'Hôpital differentiation, especially for products/quotients of several transcendental factors.

**Worked Example 3.** $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^3}$. Using $\sin x = x-\tfrac{x^3}{3!}+\tfrac{x^5}{5!}-\cdots$:
$$\frac{x-\sin x}{x^3}=\frac{\tfrac{x^3}{3!}-\tfrac{x^5}{5!}+\cdots}{x^3}=\frac1{3!}-\frac{x^2}{5!}+\cdots \ \xrightarrow{x\to0}\ \frac16.$$

**Worked Example 4 (a limit that would need repeated l'Hôpital).** $\displaystyle\lim_{x\to0}\frac{(e^{2x}-1)\ln(1+x^3)}{(1-\cos3x)^2}$. Leading-order series: numerator $\approx (2x)(x^3)=2x^4$; denominator $\approx\big(\tfrac{9x^2}2\big)^2=\tfrac{81x^4}4$. Limit $=\dfrac{2}{81/4}=\dfrac{8}{81}$.

> **Common mistakes:** (1) Truncating a series too early for the required accuracy — always state *why* the remaining terms are small enough (cite the alternating series bound or a Lagrange remainder estimate; don't just "eyeball it"). (2) In indeterminate-form problems, not keeping enough terms — you must keep terms up through the *first nonzero* order in both numerator and denominator after cancellation, which sometimes requires more than the "obvious" number of terms.

## 9.8 The Binomial Theorem and Binomial Series

**Theorem (Binomial Theorem, $n$ a positive integer).**
$$(a+x)^n = \sum_{k=0}^n \binom{n}{k}a^{n-k}x^k, \qquad \binom{n}{k}=\frac{n!}{(n-k)!\,k!}.$$
Provable via Taylor's Theorem: for $f(x)=(a+x)^n$, $f^{(k)}(x)=0$ for $k>n$, so the Lagrange remainder vanishes exactly and the Taylor "series" is a finite sum (a polynomial), valid for **all** $x$.

**Theorem (Binomial Series, $r$ any real number).** For $|x|<1$,
$$(1+x)^r = 1+rx+\frac{r(r-1)}{2!}x^2+\frac{r(r-1)(r-2)}{3!}x^3+\cdots = 1+\sum_{n=1}^\infty \frac{r(r-1)\cdots(r-n+1)}{n!}x^n.$$
If $r$ is a nonnegative integer, this reduces to the finite Binomial Theorem sum above. Otherwise it is a genuine infinite series with $R=1$; endpoint behavior at $x=\pm1$ depends on the specific value of $r$. Proved by showing the series satisfies the IVP $(1+x)f'(x)=rf(x)$, $f(0)=1$, which uniquely determines $f(x)=(1+x)^r$.

**Worked Example 1 (a standard binomial-series expansion).** Find the Maclaurin series for $\dfrac1{\sqrt{1+x}}=(1+x)^{-1/2}$:
$$(1+x)^{-1/2} = 1-\frac12x+\frac{1\cdot3}{2^2\cdot2!}x^2-\frac{1\cdot3\cdot5}{2^3\cdot3!}x^3+\cdots = 1+\sum_{n=1}^\infty (-1)^n\frac{1\cdot3\cdots(2n-1)}{2^nn!}x^n,$$
valid on $(-1,1]$.

**Worked Example 2 (building $\sin^{-1}x$ from a binomial series).** Substitute $-t^2$ for $x$ in $(1+x)^{-1/2}$ to get a series for $1/\sqrt{1-t^2}$, then integrate term by term from $0$ to $x$:
$$\sin^{-1}x = x+\sum_{n=1}^\infty \frac{1\cdot3\cdots(2n-1)}{2^nn!(2n+1)}x^{2n+1} = x+\frac{x^3}6+\frac{3x^5}{40}+\cdots, \qquad |x|<1.$$

**Worked Example 3 (approximating a root with the first couple of binomial-series terms).** Estimate $\sqrt{1.1}=(1+0.1)^{1/2}$ using two terms: $1+\tfrac12(0.1)=1.05$ (true value $\approx1.0488$ — accurate to about $0.001$, consistent with the size of the next term $\tfrac{(1/2)(-1/2)}{2!}(0.1)^2=-0.00125$).

**The Multinomial Theorem (brief mention).** Generalizes the Binomial Theorem to more than two summands:
$$(x_1+x_2+\cdots+x_n)^k = \sum_{|\mathbf m|=k} \frac{k!}{m_1!m_2!\cdots m_n!}\,x_1^{m_1}x_2^{m_2}\cdots x_n^{m_n},$$
summed over all tuples of nonnegative integers $m_1+\cdots+m_n=k$. Mostly useful for counting arrangements (e.g. arranging $k$ objects of $n$ distinguishable types) — unlikely to be a major exam focus but good to recognize.

> **Common mistakes:** (1) Using the finite Binomial Theorem formula (with a stopping point at $n$) when $r$ is **not** a positive integer — the series is then genuinely infinite and never terminates. (2) Sign errors in the falling-factorial coefficient $r(r-1)(r-2)\cdots(r-n+1)$, especially when $r$ is negative or a fraction — write out the first 3–4 factors explicitly rather than trying to pattern-match. (3) Forgetting the radius of convergence is $1$ for the genuine (non-terminating) binomial series, regardless of how large $|r|$ is.

## 9.9 Fourier Series (brief overview)

Power series approximate a function locally near one point using polynomials; **Fourier series** instead represent a **periodic** function globally using sums of sines and cosines — appropriate for waveforms and other periodic phenomena that polynomials cannot represent (a nonconstant polynomial is never periodic).

**Definition.** If $f$ is periodic with period $T$ ($f(t+T)=f(t)$), continuous with piecewise continuous derivative, then
$$f(t) = \frac{a_0}2+\sum_{n=1}^\infty\big(a_n\cos(n\omega t)+b_n\sin(n\omega t)\big), \qquad \omega=\frac{2\pi}T,$$
where the **Fourier coefficients** are found via the orthogonality of sines/cosines over one period:
$$a_n = \frac2T\int_{-T/2}^{T/2} f(t)\cos(n\omega t)\,dt, \qquad b_n = \frac2T\int_{-T/2}^{T/2} f(t)\sin(n\omega t)\,dt.$$

**Theorem (Convergence of Fourier series).** For $f$ piecewise continuous and periodic with piecewise continuous derivative, the Fourier series converges to $f(t)$ at every point of continuity, and to the average of the left/right limits $\tfrac12[f(c^-)+f(c^+)]$ at any jump discontinuity.

This topic is typically a minor add-on in a Calc 2 course (sometimes not tested at all, or tested only conceptually) — know the definition, that coefficients come from integration using orthogonality, and the jump-discontinuity convergence behavior, but expect Taylor/power series to dominate exam weight.

---

## Chapter 9 Review Problems

*(Roughly easy to hard; mix of computation and conceptual "explain why" questions.)*

1. Determine whether $\{a_n\}=\left\{\dfrac{3n^2-1}{n^2+2n}\right\}$ converges, and if so find its limit.
2. Determine convergence or divergence: $\displaystyle\sum_{n=1}^\infty \frac{3^n}{5^n}$. If convergent, find the sum.
3. Determine convergence or divergence: $\displaystyle\sum_{n=1}^\infty \frac{1}{\sqrt n}$.
4. Determine convergence or divergence: $\displaystyle\sum_{n=1}^\infty \frac{n}{n^2+1}$.
5. Determine convergence or divergence: $\displaystyle\sum_{n=1}^\infty \frac{n!}{n^n}$.
6. Determine convergence or divergence: $\displaystyle\sum_{n=2}^\infty \frac{1}{n(\ln n)^2}$.
7. Determine whether $\displaystyle\sum_{n=1}^\infty \frac{(-1)^n\sqrt n}{n+4}$ converges absolutely, converges conditionally, or diverges.
8. Find the radius and interval of convergence of $\displaystyle\sum_{n=1}^\infty \frac{(x+3)^n}{n\,4^n}$.
9. Find the radius and interval of convergence of $\displaystyle\sum_{n=0}^\infty (-1)^n n!\,x^n$.
10. Find the Maclaurin series of $f(x)=x^2e^{-x}$ and give its radius of convergence.
11. Find the Maclaurin series of $f(x) = \dfrac{1}{4-x}$ and its interval of convergence.
12. Use a known Maclaurin series to evaluate $\displaystyle\lim_{x\to0}\frac{\cos x - 1+\tfrac{x^2}2}{x^4}$.
13. Use series to estimate $\displaystyle\int_0^1 \frac{\sin x}{x}\,dx$ to 3 decimal places.
14. **Explain why** a series can satisfy $a_n\to0$ and yet diverge, while also explaining why this is *impossible* for a series that is eventually **positive and decreasing enough** — connect this to the integral test and the borderline role of the harmonic series.
15. **Explain why** the interval of convergence of a power series must always be symmetric about its centre $c$, but need not be symmetric in terms of *open/closed* endpoints (i.e., why can one endpoint be included while the other is excluded?).

### Solutions

**1.** Divide by $n^2$: $\dfrac{3-1/n^2}{1+2/n}\to \dfrac{3}{1}=3$. **Converges to $3$.**

**2.** Geometric with $r=3/5$, $|r|<1$: $\displaystyle\sum_{n=1}^\infty \Big(\frac35\Big)^n = \frac{3/5}{1-3/5}=\frac{3/5}{2/5}=\frac32.$ **Converges to $3/2$.**

**3.** $p$-series with $p=1/2\le1$: **diverges** (to $\infty$).

**4.** Limit comparison with $b_n=1/n$: $L=\lim n\cdot\dfrac{n}{n^2+1}=1$. Since $\sum 1/n$ diverges and $0<L<\infty$, the given series **diverges to $\infty$**. (Also confirmable: $a_n\to0$ so the $n$th-term test gives no info — must use comparison.)

**5.** Ratio test: $\rho=\lim_{n\to\infty}\dfrac{(n+1)!/(n+1)^{n+1}}{n!/n^n} = \lim_{n\to\infty}\dfrac{n^n}{(n+1)^n}=\lim_{n\to\infty}\Big(1+\tfrac1n\Big)^{-n}=e^{-1}<1$. **Converges.**

**6.** Integral test with $f(x)=1/(x(\ln x)^2)$, positive/continuous/decreasing for $x\ge2$. Substitute $u=\ln x$: $\int_2^\infty \dfrac{dx}{x(\ln x)^2}=\int_{\ln2}^\infty u^{-2}\,du = \Big[-\dfrac1u\Big]_{\ln2}^\infty = \dfrac1{\ln2}<\infty$. **Converges.**

**7.** Check absolute convergence: $|a_n|=\dfrac{\sqrt n}{n+4}$, limit-compare with $b_n=1/\sqrt n$ ($p=1/2$, diverges): $L=\lim \dfrac{\sqrt n/(n+4)}{1/\sqrt n}=\lim\dfrac{n}{n+4}=1$, so $\sum|a_n|$ **diverges** — not absolutely convergent. Check the Alternating Series Test: $b_n=\sqrt n/(n+4)\to0$ (since $\sqrt n$ grows slower than $n$), and one can check (e.g. via $f(x)=\sqrt x/(x+4)$, $f'(x)<0$ for $x>4$) that $b_n$ is ultimately decreasing. **Converges conditionally.**

**8.** Ratio test: $\rho = \lim_{n\to\infty}\dfrac{n}{n+1}\cdot\dfrac{|x+3|}4 = \dfrac{|x+3|}4$. Absolute convergence for $|x+3|<4$, i.e., $-7<x<1$, so $R=4$, centre $c=-3$. At $x=1$: $\sum \dfrac1{n\,4^n}4^n=\sum\dfrac1n$ — diverges. At $x=-7$: $\sum\dfrac{(-4)^n}{n4^n}=\sum\dfrac{(-1)^n}n$ — converges conditionally. **Interval of convergence: $[-7,1)$, $R=4$.**

**9.** Ratio test: $\rho=\lim_{n\to\infty}(n+1)|x|=\infty$ for any $x\ne0$. **$R=0$; converges only at $x=0$.**

**10.** Substitute $-x$ into $e^x=\sum x^n/n!$ to get $e^{-x}=\sum(-1)^nx^n/n!$, then multiply by $x^2$:
$$x^2e^{-x} = \sum_{n=0}^\infty \frac{(-1)^n}{n!}x^{n+2} = x^2-x^3+\frac{x^4}2-\frac{x^5}6+\cdots, \qquad R=\infty.$$

**11.** $\dfrac1{4-x}=\dfrac14\cdot\dfrac1{1-x/4}=\dfrac14\sum_{n=0}^\infty\Big(\dfrac{x}4\Big)^n = \displaystyle\sum_{n=0}^\infty \frac{x^n}{4^{n+1}}$, valid for $|x/4|<1$, i.e. **interval of convergence $(-4,4)$** (check endpoints: at $x=\pm4$, terms don't $\to0$, so both diverge — interval stays open).

**12.** $\cos x = 1-\dfrac{x^2}2+\dfrac{x^4}{24}-\dfrac{x^6}{720}+\cdots$, so $\cos x-1+\dfrac{x^2}2 = \dfrac{x^4}{24}-\dfrac{x^6}{720}+\cdots$. Dividing by $x^4$ and letting $x\to0$: limit $=\dfrac1{24}$.

**13.** $\dfrac{\sin x}x = 1-\dfrac{x^2}{3!}+\dfrac{x^4}{5!}-\dfrac{x^6}{7!}+\cdots$ (removable singularity at $0$, define value there as $1$). Integrate termwise:
$$\int_0^1\frac{\sin x}x\,dx = 1-\frac1{3\cdot3!}+\frac1{5\cdot5!}-\frac1{7\cdot7!}+\cdots = 1-\frac1{18}+\frac1{600}-\frac1{35280}+\cdots$$
By the alternating series bound, summing through the $\tfrac1{600}$ term already gives error $<\tfrac1{35280}<0.0001$: $1-0.05556+0.001667-\cdots\approx 0.94608$, so $\displaystyle\int_0^1\frac{\sin x}x\,dx\approx 0.946$ to 3 decimals.

**14.** A series can have $a_n\to0$ while still diverging because convergence of $\sum a_n$ depends on how *fast* $a_n\to0$, not merely *that* it does — the partial sums $s_n=\sum_{k\le n}a_k$ can still grow without bound if the terms decay too slowly, exactly as happens for the harmonic series $\sum1/n$ (terms $\to0$, but $s_n\sim\ln n\to\infty$). The integral test formalizes this "speed of decay" threshold: for a positive, decreasing $f(n)=a_n$, $\sum a_n$ converges iff $\int^\infty f(x)\,dx$ converges, and $\int^\infty x^{-1}\,dx$ diverges (logarithmically) while $\int^\infty x^{-p}\,dx$ converges for any $p>1$ — the harmonic series ($p=1$) sits exactly on the dividing line between the two behaviors, which is why it's the standard example that "$a_n\to0$" is *not* sufficient for convergence. There is no contradiction with "positive decreasing enough" series converging: those are precisely the ones whose terms decay faster than the harmonic threshold (e.g. any $p$-series with $p>1$), and the integral test / comparison tests are exactly the tools that make "fast enough" precise.

**15.** The interval of convergence must be **symmetric in radius** about $c$ because of how the proof of Theorem 17 works: if the series converges (even just converges, not necessarily absolutely) at some point $x_0\ne c$, it must converge *absolutely* at **every** point closer to $c$ than $x_0$ is — this pulls in from both sides symmetrically, since the argument only depends on $|x-c|<|x_0-c|$, a condition symmetric in direction. So the set of points of convergence, restricted to where it's guaranteed by that argument, is automatically a symmetric interval $(c-R,c+R)$. However, the **endpoints** $x=c-R$ and $x=c+R$ are exactly the two points where that absolute-convergence argument stops applying (they're not "closer to $c$ than themselves") — convergence exactly at $x_0=c\pm R$ has to be checked by plugging in the literal boundary value and applying an entirely separate test (often the Alternating Series Test on one side, since flipping the sign of $x-c$ at the two endpoints frequently turns a divergent positive series at one end into a conditionally-convergent alternating series at the other, as in $\sum x^n/n$). There's no symmetry principle governing *that* separate check, so the two endpoints can behave completely independently.
