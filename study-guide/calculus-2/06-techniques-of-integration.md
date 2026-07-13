# Chapter 6: Techniques of Integration

This is the first chapter of Calculus 2 and by far the most heavily tested: it equips you with every remaining integration technique (parts, partial fractions, trig/hyperbolic substitutions, undetermined coefficients), teaches you to recognize and evaluate improper integrals, and gives you numerical methods (Trapezoid, Midpoint, Simpson) for when no antiderivative can be found. Expect exam problems that require you to *choose* the right technique as much as to execute it.

## 6.1 Integration by Parts

Inverse to the Product Rule: if $U,V$ are differentiable,
$$\int U\,dV = UV - \int V\,dU.$$

**Rules of thumb:**
- If the integrand is a polynomial times $e^{ax}$, $\sin(ax)$, $\cos(ax)$, etc., let $U=$ polynomial, $dV=$ the rest.
- If the integrand involves $\ln x$, an inverse trig function, or another "hard to integrate but easy to differentiate" factor, let that be $U$.
- Do not attach a constant of integration to $V$ until the *final* antiderivative is found.

**Repeated / self-reproducing integrals.** Sometimes after one or two integrations by parts the original integral $I$ reappears; solve the resulting linear equation for $I$. Key results worth memorizing:
$$\int \sec^3 x\,dx = \tfrac12\sec x\tan x + \tfrac12\ln|\sec x+\tan x| + C,$$
$$\int e^{ax}\cos bx\,dx = \frac{b\,e^{ax}\sin bx + a\,e^{ax}\cos bx}{a^2+b^2}+C.$$

**Reduction formulas.** For $I_n = \int x^n e^{-x}\,dx$: $I_n = -x^ne^{-x}+nI_{n-1}$.
For $I_n = \int_0^{\pi/2}\cos^n x\,dx$ ($n\ge2$): $I_n = \dfrac{n-1}{n}I_{n-2}$, with $I_0=\pi/2$, $I_1=1$ (this is the **Wallis formula** family).

**Worked Examples**

1. $\displaystyle\int xe^{-x}\,dx$: $U=x,\ dV=e^{-x}dx \Rightarrow dU=dx,\ V=-e^{-x}$: $= -xe^{-x}-\int(-e^{-x})dx = -xe^{-x}-e^{-x}+C.$

2. $\displaystyle\int x^2\sin x\,dx$ (two applications): $U=x^2,dV=\sin x\,dx$ gives $-x^2\cos x+2\int x\cos x\,dx$; then $U=x,dV=\cos x\,dx$ gives $\int x\cos x\,dx = x\sin x+\cos x$. Total: $-x^2\cos x+2x\sin x+2\cos x+C.$

3. $\displaystyle\int \tan^{-1}x\,dx$: $U=\tan^{-1}x,\ dV=dx \Rightarrow dU=\frac{dx}{1+x^2},\ V=x$: $=x\tan^{-1}x - \int\frac{x}{1+x^2}dx = x\tan^{-1}x - \tfrac12\ln(1+x^2)+C.$

4. **Self-reproducing:** $\displaystyle I=\int e^{2x}\sin3x\,dx$. First by parts ($U=e^{2x}$): $I = -\tfrac13e^{2x}\cos3x+\tfrac23\int e^{2x}\cos3x\,dx$. Second by parts on the new integral: $\int e^{2x}\cos3x\,dx = \tfrac13e^{2x}\sin3x - \tfrac23 I$. Substituting back: $I = -\tfrac13e^{2x}\cos3x + \tfrac29e^{2x}\sin3x - \tfrac49 I \Rightarrow \tfrac{13}9 I = -\tfrac13e^{2x}\cos3x+\tfrac29e^{2x}\sin3x$, so $I = \dfrac{e^{2x}(2\sin3x-3\cos3x)}{13}+C.$

**Common mistakes:** Choosing $U,dV$ so the new integral is harder, not easier (try the rules of thumb above, and if it backfires, swap the roles); dropping the "$-\int V\,dU$" term; forgetting to include the evaluation bracket $\big[UV\big]_a^b$ on the *integrated* term when doing a definite integral by parts; in a self-reproducing integral, switching which factor is $U$ between the first and second application (this exactly undoes the first step instead of producing a solvable equation).

## 6.2 Integrals of Rational Functions

**Setup.** For $\displaystyle\int \frac{P(x)}{Q(x)}\,dx$: if $\deg P \ge \deg Q$, do polynomial long division first to write $\dfrac{P}{Q} = (\text{polynomial}) + \dfrac{R(x)}{Q(x)}$ with $\deg R < \deg Q$.

**Linear denominator:** $\displaystyle\int \frac{dx}{ax+b} = \frac1a\ln|ax+b|+C.$

**Quadratic denominators** (after completing the square, reduce to $x^2\pm a^2$):
$$\int \frac{x\,dx}{x^2+a^2} = \tfrac12\ln(x^2+a^2)+C, \qquad \int\frac{x\,dx}{x^2-a^2}=\tfrac12\ln|x^2-a^2|+C,$$
$$\int\frac{dx}{x^2+a^2} = \frac1a\tan^{-1}\frac xa+C, \qquad \int\frac{dx}{x^2-a^2}=\frac1{2a}\ln\left|\frac{x-a}{x+a}\right|+C.$$

**Theorem 1 (General partial fraction decomposition).** If $\deg P<\deg Q$ and
$$Q(x) = K(x-a_1)^{m_1}\cdots(x-a_j)^{m_j}(x^2+b_1x+c_1)^{n_1}\cdots(x^2+b_kx+c_k)^{n_k}$$
(the quadratic factors irreducible — no real roots), then $P(x)/Q(x)$ decomposes as a sum of:

| Factor in $Q(x)$ | Partial fraction terms to include |
|---|---|
| $(x-a)^m$, distinct linear, unrepeated ($m=1$) | $\dfrac{A}{x-a}$ |
| $(x-a)^m$, repeated $m$ times | $\dfrac{A_1}{x-a}+\dfrac{A_2}{(x-a)^2}+\cdots+\dfrac{A_m}{(x-a)^m}$ |
| $(x^2+bx+c)^n$, irreducible, unrepeated ($n=1$) | $\dfrac{Bx+C}{x^2+bx+c}$ |
| $(x^2+bx+c)^n$, repeated $n$ times | $\dfrac{B_1x+C_1}{x^2+bx+c}+\cdots+\dfrac{B_nx+C_n}{(x^2+bx+c)^n}$ |

**Finding the constants — two methods:**
- **Method I (equate coefficients):** clear denominators, expand, match coefficients of like powers of $x$ on both sides — always works, generalizes to every case above.
- **Method II (cover-up / evaluate at roots):** for a *simple linear* factor $x-a_j$, multiply both sides by $(x-a_j)$ and plug in $x=a_j$: $A_j = \dfrac{P(a_j)}{\prod_{i\ne j}(a_j-a_i)}$. This shortcut does **not** directly give the constants for repeated or quadratic factors (though it can find the "leading" one).

**Worked Examples covering every case**

1. **Distinct linear factors.** $\displaystyle\int \frac{x+4}{x^2-5x+6}\,dx = \int\frac{x+4}{(x-2)(x-3)}dx$. Cover-up: $A = \left.\frac{x+4}{x-3}\right|_{x=2} = -6$, $B=\left.\frac{x+4}{x-2}\right|_{x=3}=7$. Result: $-6\ln|x-2|+7\ln|x-3|+C.$

2. **Repeated linear factor.** $\displaystyle\int \frac{dx}{x(x-1)^2}$: decomposition $\dfrac{A}{x}+\dfrac{B}{x-1}+\dfrac{C}{(x-1)^2}$. Equating coefficients gives $A=1,B=-1,C=1$. Result: $\ln|x|-\ln|x-1|-\dfrac1{x-1}+C = \ln\left|\dfrac{x}{x-1}\right|-\dfrac1{x-1}+C.$

3. **Irreducible quadratic factor.** $\displaystyle\int \frac{2+3x+x^2}{x(x^2+1)}\,dx$: decomposition $\dfrac{A}{x}+\dfrac{Bx+C}{x^2+1}$, giving $A=2,\ B=-1,\ C=3$. Result: $2\ln|x| - \tfrac12\ln(x^2+1)+3\tan^{-1}x+C.$

4. **Repeated irreducible quadratic.** $\displaystyle\int \frac{x^2+2}{x(2x^2+1)^2}\,dx$: decomposition $\dfrac{A}{x}+\dfrac{Bx+C}{2x^2+1}+\dfrac{Dx+E}{(2x^2+1)^2}$. Solving gives $A=2,B=-4,C=0,D=-3,E=0$. Result: $\ln\left(\dfrac{x^2}{2x^2+1}\right) + \dfrac{3}{4(2x^2+1)}+C.$

5. **Denominator with irreducible quadratic and needing completing the square.** $\displaystyle\int \frac{dx}{x^3+1} = \int\frac{dx}{(x+1)(x^2-x+1)}$: decomposition $\dfrac{A}{x+1}+\dfrac{Bx+C}{x^2-x+1}$, $A=\tfrac13,B=-\tfrac13,C=\tfrac23$. The quadratic piece needs $x^2-x+1=(x-\tfrac12)^2+\tfrac34$: result involves $-\tfrac16\ln(x^2-x+1)+\tfrac{1}{\sqrt3}\tan^{-1}\left(\tfrac{2x-1}{\sqrt3}\right)$ combined with $\tfrac13\ln|x+1|$.

**Common mistakes:** Forgetting to divide first when $\deg P\ge \deg Q$; using only a constant numerator ($A$) over a *quadratic* irreducible factor instead of a linear numerator ($Bx+C$); for a repeated factor $(x-a)^m$, writing only $\dfrac{A}{(x-a)^m}$ instead of the *full ladder* $\dfrac{A_1}{x-a}+\cdots+\dfrac{A_m}{(x-a)^m}$; trying to use the cover-up method on repeated or quadratic factors (it only cleanly isolates simple linear factors).

## 6.3 Inverse Substitutions

**Trig substitution summary table.**

| Integrand contains | Substitution | Identity used | Result contains |
|---|---|---|---|
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ | $1-\sin^2\theta=\cos^2\theta$ | $a\cos\theta$ |
| $\sqrt{a^2+x^2}$ or $\dfrac{1}{a^2+x^2}$ | $x=a\tan\theta$ | $1+\tan^2\theta=\sec^2\theta$ | $a\sec\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ | $\sec^2\theta-1=\tan^2\theta$ | $a\tan\theta$ (sign depends on branch) |
| $\sqrt{x^2-a^2}$ (alternative) | $x=a\cosh u$ | $\cosh^2u-1=\sinh^2u$ | $a\sinh u$ |
| $\sqrt{a^2+x^2}$ (alternative) | $x=a\sinh u$ | $1+\sinh^2u=\cosh^2u$ | $a\cosh u$ |
| $\sqrt{ax+b}$ | $ax+b=u^2$ | — | rational function of $u$ |
| $\sqrt[n]{ax+b}$ | $ax+b=u^n$ | — | rational function of $u$ |
| Several fractional powers $x^{1/p}, x^{1/q},\dots$ | $x=u^{\text{lcm}(p,q,\dots)}$ | — | rational function of $u$ |
| Rational function of $\sin\theta,\cos\theta$ | $x=\tan(\theta/2)$ (Weierstrass) | see below | rational function of $x$ |

**The $\tan(\theta/2)$ (Weierstrass) substitution.** If $x=\tan(\theta/2)$:
$$\cos\theta = \frac{1-x^2}{1+x^2}, \qquad \sin\theta = \frac{2x}{1+x^2}, \qquad d\theta = \frac{2\,dx}{1+x^2}.$$
This converts **any** rational function of $\sin\theta,\cos\theta$ into a rational function of $x$, integrable by Section 6.2's methods.

**Worked Examples**

1. $\displaystyle\int \frac{dx}{(5-x^2)^{3/2}}$: let $x=\sqrt5\sin\theta$: $=\dfrac15\int\sec^2\theta\,d\theta = \dfrac15\tan\theta+C = \dfrac{1}{5}\cdot\dfrac{x}{\sqrt{5-x^2}}+C.$

2. $\displaystyle\int \frac{dx}{\sqrt{4+x^2}}$: let $x=2\tan\theta$: $=\int\sec\theta\,d\theta = \ln|\sec\theta+\tan\theta|+C = \ln\left(\sqrt{4+x^2}+x\right)+C_1.$

3. $\displaystyle I=\int \frac{dx}{\sqrt{x^2-a^2}}$ ($x\ge a>0$): let $x=a\sec\theta$: $I=\int\sec\theta\,d\theta = \ln|x+\sqrt{x^2-a^2}|+C.$ (Same result via $x=a\cosh u$: $I=u+C=\cosh^{-1}(x/a)+C$, an equivalent logarithmic form.)

4. **Weierstrass substitution:** $\displaystyle\int \frac{d\theta}{2+\cos\theta}$: with $x=\tan(\theta/2)$, $\cos\theta=\frac{1-x^2}{1+x^2}$: $=\int \frac{2\,dx/(1+x^2)}{2+\frac{1-x^2}{1+x^2}} = 2\int\frac{dx}{3+x^2} = \frac{2}{\sqrt3}\tan^{-1}\frac{x}{\sqrt3}+C = \frac{2}{\sqrt3}\tan^{-1}\left(\frac1{\sqrt3}\tan\frac\theta2\right)+C.$

5. **Multiple fractional powers:** $\displaystyle\int \frac{dx}{x^{1/2}(1+x^{1/3})}$: let $x=u^6$ (lcm of $2,3$), $dx=6u^5du$: $=6\int\frac{u^2}{1+u^2}du = 6(u-\tan^{-1}u)+C = 6\left(x^{1/6}-\tan^{-1}x^{1/6}\right)+C.$

**Common mistakes:** Forgetting the absolute-value/branch subtlety in the secant substitution (whether $\sqrt{x^2-a^2}=a\tan\theta$ or $-a\tan\theta$ depends on whether $x\ge a$ or $x\le -a$); not converting back from $\theta$ to $x$ using a right triangle at the end; picking the trig substitution when the hyperbolic one (or vice versa) would avoid absolute-value headaches; forgetting the $d\theta = \frac{2\,dx}{1+x^2}$ factor in the Weierstrass substitution.

## 6.4 Other Methods for Evaluating Integrals

**Method of Undetermined Coefficients.** Guess the *family* of functions the antiderivative belongs to (based on what stays in that family under differentiation), differentiate the guess, and match coefficients against the integrand.

- Guess for $\displaystyle\int P(x)e^{ax}\,dx$ (P a polynomial of degree $n$): a polynomial of the *same* degree $n$ times $e^{ax}$.
- Guess for $\displaystyle\int x^m\cos(ax)\,dx$ or $\displaystyle\int x^m\sin(ax)\,dx$: $Q(x)\cos(ax)+R(x)\sin(ax)$ with $Q,R$ polynomials of degree $m$.
- Guess for $\displaystyle\int x^m(\ln x)^n\,dx$: a sum $x^{m+1}\sum_{k=0}^n c_k(\ln x)^k$.

**Worked Examples**

1. $\displaystyle I=\int (x^2+x+1)e^x\,dx$. Guess $I=(a_0+a_1x+a_2x^2)e^x$. Differentiating and matching: $a_2=1,\ a_1=-1,\ a_0=2$. So $I=(x^2-x+2)e^x+C.$

2. $\displaystyle I=\int x^3(\ln x)^2\,dx$. Guess $I = Px^4(\ln x)^2+Qx^4\ln x+Rx^4$. Differentiating and matching coefficients of $x^3(\ln x)^2$, $x^3\ln x$, $x^3$: $P=\tfrac14, Q=-\tfrac18,R=\tfrac1{32}$. So $I=\tfrac14x^4(\ln x)^2-\tfrac18x^4\ln x+\tfrac1{32}x^4+C.$

**Using tables and technology.** Integral tables (often reduction-formula based) and computer algebra systems (Maple, etc.) can evaluate integrals symbolically; using them still typically requires massaging the integral (substitutions) into a listed form first.

**Special functions.** Some integrals — like $\int e^{-x^2}dx$ — provably have no elementary closed form; they define new **special functions**, e.g. the **error function** $\operatorname{erf}(x) = \dfrac{2}{\sqrt\pi}\displaystyle\int_0^x e^{-t^2}\,dt$, so that $\displaystyle\int e^{-x^2}\,dx = \dfrac{\sqrt\pi}{2}\operatorname{erf}(x)+C$.

**Common mistakes:** Guessing a family whose degree is too low (always match the highest degree present in the integrand, and don't drop lower-order terms just because they "look like" they'll be zero); trying to force undetermined coefficients on integrands that are *not* closed under differentiation (e.g. $\ln x$ alone needs the log-family guess, not a pure polynomial).

## 6.5 Improper Integrals

**Type I** (infinite interval) and **Type II** (unbounded integrand) are both handled as limits of proper integrals.

**Definition 1 (Type I).**
$$\int_a^\infty f(x)\,dx = \lim_{R\to\infty}\int_a^R f(x)\,dx, \qquad \int_{-\infty}^b f(x)\,dx = \lim_{R\to-\infty}\int_R^b f(x)\,dx.$$
$\int_{-\infty}^\infty f\,dx$ splits into $\int_{-\infty}^0 f\,dx + \int_0^\infty f\,dx$; **both** pieces must converge for the whole to converge.

**Definition 2 (Type II).** If $f$ is unbounded near $a$ (continuous on $(a,b]$):
$$\int_a^b f(x)\,dx = \lim_{c\to a^+}\int_c^b f(x)\,dx,$$
and similarly if unbounded near $b$. If the integrand is unbounded at an interior point or at both ends, **split** into separate improper integrals there.

If the limit is finite, the integral **converges**; if it fails to exist as a finite number the integral **diverges** (possibly "diverges to $\infty$" or "$-\infty$" if the limit is infinite; otherwise it just "diverges," e.g. $\int_0^\infty \cos x\,dx$ oscillates).

**Theorem 2 ($p$-integrals).** For $0<a<\infty$:
$$\int_a^\infty x^{-p}\,dx \text{ converges (to } \tfrac{a^{1-p}}{p-1}\text{) iff } p>1; \text{ diverges to }\infty \text{ if } p\le1.$$
$$\int_0^a x^{-p}\,dx \text{ converges (to } \tfrac{a^{1-p}}{1-p}\text{) iff } p<1; \text{ diverges to }\infty \text{ if } p\ge1.$$

**Theorem 3 (Comparison Test).** If $0\le f(x)\le g(x)$ on $(a,b)$ (either type of improper interval):
- $\int_a^b g\,dx$ converges $\Rightarrow \int_a^b f\,dx$ converges (and is $\le \int_a^b g\,dx$).
- $\int_a^b f\,dx$ diverges to $\infty \Rightarrow \int_a^b g\,dx$ diverges to $\infty$.

**Big-O comparison.** If $f(x) = O(x^{-p})$ as $x\to\infty$ with $p>1$, then $\int_1^\infty f\,dx$ converges (compare to a $p$-integral); similarly near a finite singularity with $p<1$.

**Worked Examples**

1. $\displaystyle\int_1^\infty \frac{dx}{x^2} = \lim_{R\to\infty}\left[-\frac1x\right]_1^R = \lim_{R\to\infty}\left(1-\frac1R\right)=1.$ Converges.

2. $\displaystyle\int_1^\infty \frac{dx}{x} = \lim_{R\to\infty}\ln R = \infty.$ Diverges to $\infty$ (contrast with #1 — same shape, but the "spike" is too thick).

3. $\displaystyle\int_0^1 \frac{dx}{\sqrt x} = \lim_{c\to0^+}\left[2\sqrt x\right]_c^1 = 2.$ Converges (Type II, $p=1/2<1$).

4. **Comparison test:** Show $\displaystyle\int_0^\infty e^{-x^2}\,dx$ converges. Split at $x=1$: on $[0,1]$, $e^{-x^2}\le1$ so $\int_0^1 e^{-x^2}dx\le 1$; on $[1,\infty)$, $x^2\ge x\Rightarrow e^{-x^2}\le e^{-x}$, and $\int_1^\infty e^{-x}dx = 1/e$. So the integral converges and is bounded above by $1+1/e$.

5. **Determine convergence:** $\displaystyle\int_0^\infty \frac{dx}{\sqrt{x+x^3}}$. Split at $1$. Near $0$: $\sqrt{x+x^3}>\sqrt x$, so the piece is $<\int_0^1 x^{-1/2}dx$, which converges ($p=1/2<1$). Near $\infty$: $\sqrt{x+x^3}>\sqrt{x^3}$, so the piece is $<\int_1^\infty x^{-3/2}dx$, which converges ($p=3/2>1$). Both pieces converge, so the whole integral converges.

**Common mistakes:** Applying the Fundamental Theorem directly to an improper integral without taking the limit (e.g., writing $\int_{-1}^1 \frac{dx}{x^2} = \left[-\frac1x\right]_{-1}^1 = -2$ — **wrong**, because $1/x^2$ is unbounded at the interior point $x=0$, so this integral must be split there and each piece diverges); forgetting to check convergence *before* manipulating or "evaluating" — an expression like $\infty - \infty$ is meaningless, so you cannot cancel two divergent pieces even if they look symmetric; misapplying the comparison test with the inequality pointing the wrong way (to prove divergence you need your function to be *smaller* than a known divergent function, not bigger, and vice versa for convergence).

## 6.6 The Trapezoid and Midpoint Rules

Used when an antiderivative can't be found, or when only data points (not a formula) are known. Partition $[a,b]$ into $n$ equal subintervals, $h=(b-a)/n$, $x_j = a+jh$, $y_j = f(x_j)$.

**Definition 3 (Trapezoid Rule).**
$$T_n = h\left(\tfrac12 y_0+y_1+y_2+\cdots+y_{n-1}+\tfrac12 y_n\right).$$

**Definition 4 (Midpoint Rule).** With midpoints $m_j = a+(j-\tfrac12)h$:
$$M_n = h\big(f(m_1)+f(m_2)+\cdots+f(m_n)\big).$$

**Relationship:** $T_{2n} = \dfrac{T_n+M_n}{2}$ — lets you reuse already-computed function values.

**Theorem 4 (Error estimates).** If $f''$ is continuous on $[a,b]$ and $|f''(x)|\le K$ there:
$$\left|\int_a^b f\,dx - T_n\right| \le \frac{K(b-a)^3}{12n^2}, \qquad \left|\int_a^b f\,dx - M_n\right| \le \frac{K(b-a)^3}{24n^2}.$$
So the Midpoint error bound is about **half** the Trapezoid error bound, and both shrink like $O(1/n^2)$. Since $y=f(x)$ concave up makes $T_n$ over-estimate and $M_n$ under-estimate (and vice versa if concave down), $T_n$ and $M_n$ typically bracket the true value.

**Worked Examples**

1. **$I=\int_1^2 \frac1x\,dx = \ln2 \approx 0.693147$.** $T_4 = \frac14\left(\frac12(1)+\frac45+\frac23+\frac47+\frac12\cdot\frac12\right)\approx 0.697024$; $M_4\approx0.691220$. Both bracket $\ln 2$, with $|{\ln2-T_4}|\approx0.00388$ and $|\ln2-M_4|\approx0.00193$ — about half, as predicted.

2. **Error bound.** For the same integral, $f''(x)=2/x^3$, so $K=\max_{[1,2]}|f''|=2$. Theorem 4 gives $|{\ln2-T_4}|\le \frac{2\cdot1^3}{12\cdot16}\approx0.0104$ — consistent with (larger than) the actual error $0.00388$.

3. **Using $T_n$ and $M_n$ to get $T_{2n}$ for free.** Given $T_4\approx0.697024$ and $M_4\approx0.691220$: $T_8 = \frac{T_4+M_4}2 \approx 0.694122$ — matches direct computation, without needing 8 new function evaluations from scratch (only 4 new midpoints for $M_8$ are genuinely new).

**Common mistakes:** Using the plain Riemann/midpoint heights instead of *averaging endpoints* for the Trapezoid Rule (forgetting the $\tfrac12$ weights on $y_0,y_n$); assuming the error bound in Theorem 4 is the *actual* error (it is only an upper bound — actual errors are usually much smaller); trying to reuse Midpoint Rule data across different $n$ (unlike the Trapezoid Rule, $M_n$ data cannot be recycled into $M_{2n}$ since the midpoints move).

## 6.7 Simpson's Rule

Approximates $f$ on each pair of subintervals by a **parabola** through three consecutive data points, requiring $n$ **even**.

**Definition 5 (Simpson's Rule).**
$$S_n = \frac{h}{3}\Big(y_0+4y_1+2y_2+4y_3+2y_4+\cdots+2y_{n-2}+4y_{n-1}+y_n\Big) = \frac h3\left(\sum y_{\text{ends}} + 4\sum y_{\text{odds}} + 2\sum y_{\text{evens}}\right).$$

**Theorem 5 (Error estimate).** If $f^{(4)}$ is continuous on $[a,b]$ and $|f^{(4)}(x)|\le K$:
$$\left|\int_a^b f\,dx - S_n\right| \le \frac{K(b-a)^5}{180n^4}.$$
Error is $O(1/n^4)$ — much faster convergence than Trapezoid/Midpoint's $O(1/n^2)$. Simpson's Rule is **exact** for any cubic (in fact any polynomial of degree $\le3$), since $f^{(4)}\equiv 0$.

**Relationship to $T_n, M_n$:** $S_{2n} = \dfrac{T_n+2M_n}{3} = \dfrac{2T_{2n}+M_n}{3} = \dfrac{4T_{2n}-T_n}{3}.$

**Worked Examples**

1. **$I=\int_1^2\frac1x\,dx=\ln2$.** $S_4 = \frac{1/4}{3}\big(1+4(\tfrac45)+2(\tfrac23)+4(\tfrac47)+\tfrac12\big) \approx 0.693254$ — error $\approx 1.07\times10^{-4}$, already far better than $T_4$ or $M_4$.

2. **Error bound.** $f^{(4)}(x)=24/x^5$, so $K=24$ on $[1,2]$. Theorem 5: $|{\ln2-S_4}|\le \frac{24\cdot1}{180\cdot256}\approx0.00052$ — consistent with the small actual error above.

3. **From tabulated data.** Given $f(1)=0.1860$, $f(1.5)=0.9411$, $f(2)=1.1550$, $f(2.5)=1.4511$, $f(3)=1.2144$, and $|f^{(4)}|\le7$ on $[1,3]$: $S_4 = \frac{0.5}{3}\big(0.1860+4(0.9411+1.4511)+2(1.1550)+1.2144\big) = 2.2132$, with error bound $\frac{7\cdot2\cdot0.5^4}{180}<0.0049$, so $I\in(2.2083,2.2181)$.

**Common mistakes:** Using an odd number of subintervals (Simpson's Rule requires $n$ even — always check!); mis-assigning the $1,4,2,4,\dots,4,1$ weight pattern (the endpoints always get weight $1$, odd-indexed points get $4$, even-indexed interior points get $2$); forgetting that Simpson gives the *exact* value for any cubic polynomial, which is a good sanity check on your formula setup.

## 6.8 Other Aspects of Approximate Integration

**Fixing bad behavior before applying numerical methods.** If $f$ or its derivatives are unbounded near an endpoint (even if the integral is proper or improper-but-convergent), a substitution can smooth it out — e.g. for $\int_0^1 \sqrt x\,e^x\,dx$, substitute $x=t^2$ to get $2\int_0^1 t^2 e^{t^2}\,dt$, whose integrand has bounded derivatives near $0$.

**Approximating improper integrals numerically.** For an infinite interval, substitute (e.g. $x=1/t$) to map it to a finite interval before applying Trapezoid/Simpson.

**Taylor's formula method.** Expand the integrand in a Taylor polynomial with remainder, integrate term by term, and bound the remainder integral to guarantee a target accuracy (used, e.g., to evaluate $\int_0^1 e^{-x^2}dx$ to within $10^{-4}$).

**Romberg integration (Richardson extrapolation).** Since $I - T_n = \dfrac{C_1}{n^2}+\dfrac{C_2}{n^4}+\cdots$, combining Trapezoid estimates at doubled subdivision counts cancels the leading error term:
$$T^1_{k+1} = \frac{4T^0_{k+1}-T^0_k}{3} \; (= S_{2^{k+1}}), \qquad T^j_{k} = \frac{4^jT^{j-1}_k - T^{j-1}_{k-1}}{4^j-1}.$$
The diagonal entries $R_j = T^j_j$ converge extremely fast — each column eliminates one more power of $1/n^2$ in the error.

**Why higher-order methods matter.** A crude $O(1/n)$ Riemann-sum method needs astronomically more function evaluations than Simpson's $O(1/n^4)$ to reach the same precision — the text's back-of-envelope estimate for reaching 16-digit accuracy via naive Riemann sums is on the order of **1,400 years** of computation versus a fraction of a second for a good method.

**Worked Example**

**Romberg table for $I=\int_1^2\frac1x\,dx$:** Starting from $T_1=0.75$, $T_2\approx0.708333$, $T_4\approx0.697024$, $T_8\approx0.694122$, $T_{16}\approx0.693391$, the Romberg scheme produces $R_1=S_2\approx0.694444$, $R_2\approx0.693175$, $R_3\approx0.693147\,48$, $R_4\approx0.693147\,18$ — matching $\ln2$ to 8 decimal places using only the original $17$ function values.

**Common mistakes:** Applying numerical methods directly to an integral with an unbounded integrand or derivative near an endpoint without first substituting to smooth it out (this makes the stated $O(1/n^2)$ or $O(1/n^4)$ convergence *fail* to hold, giving misleadingly slow convergence); mixing up rows and columns in the Romberg table (each new entry uses the one directly above and the one to its upper-left); assuming Romberg/Simpson always beats Trapezoid — for functions with well-behaved but not smooth-enough derivatives (e.g. sign changes in the integrand or unbounded higher derivatives), the higher-order error bounds may not apply.

## Chapter 6 Review Problems

1. Evaluate $\displaystyle\int x\cos x\,dx$.
2. Evaluate $\displaystyle\int \ln x\,dx$.
3. Evaluate $\displaystyle\int x^2 e^{3x}\,dx$.
4. Evaluate $\displaystyle\int \frac{3x+1}{(x-1)(x+2)}\,dx$.
5. Evaluate $\displaystyle\int \frac{dx}{x^2(x-1)}$ (repeated linear factor at $x=0$).
6. Evaluate $\displaystyle\int \frac{2x^2+1}{x^3+x}\,dx$ (irreducible quadratic factor).
7. Evaluate $\displaystyle\int \frac{dx}{\sqrt{9-x^2}}\cdot x^2$, i.e. $\displaystyle\int \frac{x^2\,dx}{\sqrt{9-x^2}}$.
8. Evaluate $\displaystyle\int \frac{dx}{x^2\sqrt{x^2-4}}$ for $x>2$.
9. Determine whether $\displaystyle\int_1^\infty \frac{dx}{x^3+1}$ converges, and if so evaluate or bound it.
10. Determine whether $\displaystyle\int_0^1 \frac{dx}{x^{2/3}}$ converges, and if so evaluate it.
11. Evaluate $\displaystyle\int_0^\infty x e^{-x}\,dx$.
12. Using $n=4$, compute $T_4$ and $M_4$ for $\displaystyle\int_0^1 \frac{dx}{1+x^2}$, and compare to the exact value $\pi/4$.
13. Compute $S_4$ for the same integral as #12 and compare accuracy to $T_4, M_4$.
14. **Explain why** (conceptually): if a numerical integration scheme is exact for all cubic polynomials, is it necessarily exact for all quartic (degree-4) polynomials? Relate your answer to Simpson's Rule.
15. **Explain why** $\displaystyle\int_{-1}^1 \frac{dx}{x}$ must be treated as improper and, in fact, diverges — even though the integrand is an odd function on a symmetric interval (where naive cancellation would suggest the "answer" is $0$).

### Solutions

1. $U=x, dV=\cos x\,dx \Rightarrow dU=dx, V=\sin x$: $\int x\cos x\,dx = x\sin x - \int\sin x\,dx = x\sin x+\cos x+C.$

2. $U=\ln x, dV=dx \Rightarrow dU=dx/x, V=x$: $= x\ln x - \int dx = x\ln x - x+C.$

3. Two applications of parts (or the reduction formula with $a=3$): $U=x^2,dV=e^{3x}dx$ gives $\frac13x^2e^{3x}-\frac23\int xe^{3x}dx$; then $\int xe^{3x}dx = \frac13xe^{3x}-\frac19e^{3x}$. Total: $\frac13x^2e^{3x}-\frac29xe^{3x}+\frac2{27}e^{3x}+C.$

4. Partial fractions: $\dfrac{3x+1}{(x-1)(x+2)}=\dfrac{A}{x-1}+\dfrac{B}{x+2}$. Cover-up: $A=\left.\frac{3x+1}{x+2}\right|_{x=1}=\frac43$, $B=\left.\frac{3x+1}{x-1}\right|_{x=-2}=\frac{-5}{-3}=\frac53$. Result: $\frac43\ln|x-1|+\frac53\ln|x+2|+C.$

5. $\dfrac{1}{x^2(x-1)}=\dfrac{A}{x}+\dfrac{B}{x^2}+\dfrac{C}{x-1}$. Multiply out: $1=Ax(x-1)+B(x-1)+Cx^2$. At $x=0$: $B=-1$. At $x=1$: $C=1$. Coefficient of $x^2$: $A+C=0\Rightarrow A=-1$. Result: $-\ln|x| + \dfrac1x + \ln|x-1|+C = \ln\left|\dfrac{x-1}{x}\right|+\dfrac1x+C.$

6. $x^3+x=x(x^2+1)$. $\dfrac{2x^2+1}{x(x^2+1)} = \dfrac{A}{x}+\dfrac{Bx+C}{x^2+1}$. Multiply out: $2x^2+1 = A(x^2+1)+(Bx+C)x$. Constant term: $A=1$. Coefficient of $x^2$: $A+B=2\Rightarrow B=1$. Coefficient of $x$: $C=0$. Result: $\ln|x| + \tfrac12\ln(x^2+1)+C.$

7. Let $x=3\sin\theta$, $dx=3\cos\theta\,d\theta$, $\sqrt{9-x^2}=3\cos\theta$: $\int \frac{9\sin^2\theta\cdot3\cos\theta}{3\cos\theta}d\theta = 9\int\sin^2\theta\,d\theta = \frac92(\theta-\sin\theta\cos\theta)+C.$ Back-substitute $\theta=\sin^{-1}(x/3)$, $\sin\theta\cos\theta = \frac{x}{3}\cdot\frac{\sqrt{9-x^2}}{3}$: Result $= \frac92\sin^{-1}\left(\frac x3\right) - \frac x2\sqrt{9-x^2}+C.$

8. Let $x=2\sec\theta$, $dx=2\sec\theta\tan\theta\,d\theta$, $\sqrt{x^2-4}=2\tan\theta$ (for $x>2$): $\int \frac{2\sec\theta\tan\theta}{4\sec^2\theta\cdot2\tan\theta}d\theta = \frac14\int\cos\theta\,d\theta = \frac14\sin\theta+C.$ From the triangle, $\sin\theta = \dfrac{\sqrt{x^2-4}}{x}$. Result: $\dfrac{\sqrt{x^2-4}}{4x}+C.$

9. Compare with $1/x^3$ for $x\ge1$: since $x^3+1>x^3$, $\dfrac{1}{x^3+1}<\dfrac{1}{x^3}$, and $\int_1^\infty x^{-3}dx = \left[-\frac{1}{2x^2}\right]_1^\infty = \frac12$ converges ($p=3>1$). By the Comparison Test, the given integral converges too (and is $<\frac12$).

10. This is a $p$-integral with $p=2/3<1$ at the singularity $x=0$: converges. $\int_0^1 x^{-2/3}dx = \left[3x^{1/3}\right]_0^1 = 3.$

11. By parts, $U=x,dV=e^{-x}dx$: $\int_0^R xe^{-x}dx = \left[-xe^{-x}-e^{-x}\right]_0^R = 1-(R+1)e^{-R} \to 1$ as $R\to\infty$ (since $Re^{-R}\to0$). Converges to $\boxed{1}.$

12. $h=0.25$; $f(x)=1/(1+x^2)$: $y_0=1, y_1=1/1.0625\approx0.9412, y_2=0.8, y_3=1/1.5625=0.64, y_4=0.5$. $T_4 = 0.25\left(0.5+0.9412+0.8+0.64+0.25\right) = 0.25(3.1312)\approx0.7828.$ Midpoints $m=0.125,0.375,0.625,0.875$: $f(m)\approx0.9846,0.8767,0.7191,0.5664$. $M_4 = 0.25(0.9846+0.8767+0.7191+0.5664)=0.25(3.1468)\approx0.7867.$ Exact: $\pi/4\approx0.7854$. Both bracket the true value (as expected — $f$ changes concavity on $[0,1]$, so the bracketing is not guaranteed to be as tight as in a purely-convex example, but here it works out closely).

13. $S_4 = \frac{T_4+2M_4}{3} \approx \frac{0.7828+2(0.7867)}{3} = \frac{2.3562}{3}=0.7854$ — matches $\pi/4$ to 4 decimal places, far better than either $T_4$ or $M_4$ alone, illustrating Simpson's $O(1/n^4)$ convergence versus $O(1/n^2)$ for the others.

14. **Yes.** By Theorem 5, Simpson's Rule error involves $f^{(4)}$; for a quartic polynomial $f^{(4)}$ is a nonzero *constant*, not identically zero, so the error bound doesn't force exactness the way it does for cubics (where $f^{(4)}\equiv0$). In fact Simpson's Rule is *not* generally exact for quartics — being exact for cubics does not imply exactness for quartics; it only guarantees the error is $O(h^4)$, i.e. it vanishes fast but need not vanish identically for a degree-4 integrand.

15. The integrand $1/x$ is **unbounded** near $x=0$, which lies *inside* the interval $[-1,1]$, so this is a Type II improper integral that must be **split** at the singularity: $\int_{-1}^1\frac{dx}{x} = \int_{-1}^0\frac{dx}{x}+\int_0^1\frac{dx}{x}$. Each piece individually diverges to $\pm\infty$ (by the $p$-integral test with $p=1$), so the sum is the indeterminate form $-\infty+\infty$, which is **not** $0$ — it is undefined. You cannot invoke the "odd function on a symmetric interval" cancellation trick (Theorem 3(g) of Chapter 5) here because that theorem requires $f$ to be *integrable* (in particular, bounded/continuous) on the whole interval $[-a,a]$ first; the FTC's naive "evaluate the antiderivative at the endpoints" calculation is invalid whenever the integrand fails to be continuous somewhere in the interval of integration, and always fails silently in exactly this way.
