# Chapter 1: Limits and Continuity

Limits are the foundation everything else in calculus is built on — derivatives, integrals, and series are all defined as limits — so mastering limit laws, the squeeze theorem, and continuity here is what makes every later chapter's definitions actually make sense on an exam.

## 1.1 Examples of Velocity, Growth Rate, and Area

This section motivates the limit concept through three settings, without giving a formal definition yet.

**Average velocity.** If position is $y=f(t)$, the average velocity over $[t_1,t_2]$ is
$$\frac{\Delta y}{\Delta t} = \frac{f(t_2)-f(t_1)}{t_2-t_1}$$

**Instantaneous velocity** at $t$ is the limit of average velocity over $[t,t+h]$ as $h\to0$:
$$v(t) = \lim_{h\to0}\frac{f(t+h)-f(t)}{h}$$

**Average rate of growth** of a quantity $m=f(t)$ over $[t_1,t_2]$ is the slope of the **secant line** joining $(t_1,f(t_1))$ and $(t_2,f(t_2))$. The **instantaneous rate of growth** at a point is the slope of the **tangent line**, obtained as the limit of secant slopes as the interval shrinks to a point.

**Area of a circle by a limiting process.** Inscribing regular $n$-gons in a circle of radius $r$: perimeter $P_n = 2rn\sin(\pi/n) \to 2\pi r$ and area $A_n = r^2n\sin(\pi/n)\cos(\pi/n) \to \pi r^2$ as $n\to\infty$, since $\cos(\pi/n)\to1$.

### Worked Examples

**Example 1.** A rock falls $y=4.9t^2$ m in $t$ seconds. Find its average velocity over $[1,2]$.
$$\frac{4.9(2)^2-4.9(1)^2}{2-1} = \frac{19.6-4.9}{1} = 14.7 \text{ m/s}$$

**Example 2.** Find the instantaneous velocity of the falling rock at $t=1$.
Average velocity over $[1,1+h]$: $\dfrac{4.9(1+h)^2-4.9(1)^2}{h} = \dfrac{4.9(2h+h^2)}{h} = 9.8+4.9h$. As $h\to0$, this approaches $9.8$ m/s.

**Example 3.** Find the general velocity function $v(t)$ for $y=4.9t^2$.
$$\frac{4.9(t+h)^2-4.9t^2}{h} = \frac{4.9(2th+h^2)}{h}=9.8t+4.9h \to 9.8t \text{ as } h\to0$$
So $v(t)=9.8t$.

**Common mistakes:** trying to plug $h=0$ directly into the difference quotient before simplifying (causes division by zero); confusing average rate (secant slope, over an interval) with instantaneous rate (tangent slope, at a point).

## 1.2 Limits of Functions

**Definition 1 (Informal definition of limit).** If $f(x)$ is defined for all $x$ near $a$ (except possibly at $a$), and we can make $f(x)$ as close as we want to $L$ by taking $x$ sufficiently close to (but not equal to) $a$, we say $f$ **approaches the limit $L$** as $x\to a$:
$$\lim_{x\to a} f(x) = L$$

Key point: the limit depends only on values of $f$ *near* $a$, never on $f(a)$ itself — $f$ need not even be defined at $a$.

**Definition 2 (One-sided limits).**
$$\lim_{x\to a^-}f(x)=L \ (\text{left limit, } x\to a \text{ from below}) \qquad \lim_{x\to a^+}f(x)=L \ (\text{right limit, } x\to a \text{ from above})$$

**Theorem 1 (Relationship between one- and two-sided limits).**
$$\lim_{x\to a}f(x)=L \iff \lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L$$

**Theorem 2 (Limit Rules).** If $\lim_{x\to a}f(x)=L$, $\lim_{x\to a}g(x)=M$, $k$ constant:
1. Sum: $\lim_{x\to a}[f(x)+g(x)]=L+M$
2. Difference: $\lim_{x\to a}[f(x)-g(x)]=L-M$
3. Product: $\lim_{x\to a}f(x)g(x)=LM$
4. Multiple: $\lim_{x\to a}kf(x)=kL$
5. Quotient: $\lim_{x\to a}\dfrac{f(x)}{g(x)}=\dfrac{L}{M}$ if $M\ne0$
6. Power: $\lim_{x\to a}[f(x)]^{m/n}=L^{m/n}$ ($L>0$ if $n$ even, $L\ne0$ if $m<0$)
7. Order preserved: if $f(x)\le g(x)$ near $a$, then $L\le M$

All rules also hold for one-sided limits.

**Theorem 3 (Limits of Polynomials and Rational Functions).**
1. $\lim_{x\to a}P(x)=P(a)$ for any polynomial $P$.
2. $\lim_{x\to a}\dfrac{P(x)}{Q(x)}=\dfrac{P(a)}{Q(a)}$ if $Q(a)\ne0$.

This is called **direct substitution** and is the first thing to try.

**Theorem 4 (The Squeeze Theorem).** If $f(x)\le g(x)\le h(x)$ near $a$ (except possibly at $a$), and $\lim_{x\to a}f(x)=\lim_{x\to a}h(x)=L$, then $\lim_{x\to a}g(x)=L$.

**Standard technique for $0/0$ forms:** factor and cancel, or rationalize (multiply by the conjugate).

### Worked Examples

**Example 1.** Evaluate $\displaystyle\lim_{x\to1}\frac{x^2-1}{x-1}$.
Factor: $\dfrac{(x-1)(x+1)}{x-1}=x+1$ for $x\ne1$. Limit $=1+1=2$.

**Example 2.** Evaluate $\displaystyle\lim_{x\to4}\frac{\sqrt x - 2}{x-4}$.
Multiply by conjugate: $\dfrac{(\sqrt x-2)(\sqrt x+2)}{(x-4)(\sqrt x+2)}=\dfrac{x-4}{(x-4)(\sqrt x+2)}=\dfrac{1}{\sqrt x+2}$. Limit $= \dfrac{1}{2+2}=\dfrac14$.

**Example 3.** Evaluate $\displaystyle\lim_{x\to0^-}\operatorname{sgn}(x)$ and $\displaystyle\lim_{x\to0^+}\operatorname{sgn}(x)$; does $\lim_{x\to0}\operatorname{sgn}(x)$ exist?
Left limit $=-1$, right limit $=1$. Since they differ, $\lim_{x\to0}\operatorname{sgn}(x)$ does not exist (Theorem 1).

**Example 4.** Given $x^2-x^4 \le u(x) \le x^2+x^4$ for all $x$, find $\lim_{x\to0}u(x)$.
Both bounding functions $\to 0$ as $x\to0$, so by the Squeeze Theorem, $\lim_{x\to0}u(x)=0$.

**Common mistakes:** substituting into a $0/0$ expression and concluding "the limit doesn't exist" without trying to simplify first; forgetting that canceling $(x-a)$ from numerator and denominator changes the function but not the limit (the function's value *at* $a$ is irrelevant to the limit); misapplying the Squeeze Theorem with bounds that don't actually share the same limit.

## 1.3 Limits at Infinity and Infinite Limits

**Definition 3 (Limits at infinity).** $\lim_{x\to\infty}f(x)=L$ means $f(x)$ can be made as close as desired to $L$ by taking $x$ sufficiently large positive; $\lim_{x\to-\infty}f(x)=M$ is analogous for $x$ large negative. A horizontal line $y=L$ approached this way is a **horizontal asymptote**.

**Key fact:** $\displaystyle\lim_{x\to\pm\infty}\frac{1}{x^n}=0$ for any positive integer $n$.

**Rational function limits at infinity — summary.** For $P_m(x)=a_mx^m+\cdots$, $Q_n(x)=b_nx^n+\cdots$ ($a_m,b_n\ne0$):
$$\lim_{x\to\pm\infty}\frac{P_m(x)}{Q_n(x)} = \begin{cases} 0 & m<n \\ a_m/b_n & m=n \\ \text{does not exist (}\pm\infty\text{)} & m>n\end{cases}$$
**Technique:** divide numerator and denominator by the highest power of $x$ in the denominator.

**Infinite limits (Definition, informal).** $\lim_{x\to a}f(x)=\infty$ means $f(x)$ grows arbitrarily large positive as $x\to a$ (not a true limit — $\infty$ is not a number, so the limit "does not exist," but this notation records *how* it fails to exist). Similarly for $-\infty$, and for one-sided versions. A vertical line $x=a$ approached this way is a **vertical asymptote**.

**Rationalizing technique for $\infty - \infty$ forms:** multiply and divide by the conjugate.

### Worked Examples

**Example 1.** Evaluate $\displaystyle\lim_{x\to\infty}\frac{2x^2-x+3}{3x^2+5}$.
Same degree ($m=n=2$): divide by $x^2$: $\dfrac{2-1/x+3/x^2}{3+5/x^2}\to \dfrac{2}{3}$.

**Example 2.** Evaluate $\displaystyle\lim_{x\to\infty}\frac{5x+2}{2x^3-1}$.
Numerator degree $<$ denominator degree: limit is $0$.

**Example 3.** Evaluate $\displaystyle\lim_{x\to\infty}(\sqrt{x^2+x}-x)$.
Multiply by conjugate: $\dfrac{(x^2+x)-x^2}{\sqrt{x^2+x}+x} = \dfrac{x}{\sqrt{x^2+x}+x} = \dfrac{1}{\sqrt{1+1/x}+1} \to \dfrac{1}{1+1}=\dfrac12$.

**Example 4.** Evaluate $\displaystyle\lim_{x\to2^+}\frac{x-3}{x^2-4}$ and $\displaystyle\lim_{x\to2^-}\frac{x-3}{x^2-4}$.
$\dfrac{x-3}{(x-2)(x+2)}$: numerator $\to -1$, and as $x\to2^+$, $(x-2)\to0^+$ so denominator $\to 0^+$, giving limit $-\infty$. As $x\to2^-$, denominator $\to 0^-$, giving limit $+\infty$. (Two-sided limit does not exist.)

**Common mistakes:** dividing by the wrong power of $x$ (always use the highest power in the *denominator*); forgetting that $\sqrt{x^2}=|x|$ (matters when $x\to-\infty$, e.g. $\sqrt{x^2+1}/x \to -1$, not $+1$, as $x\to-\infty$); writing "$=\infty$" as if it's an ordinary numeric limit value rather than a description of unbounded growth.

## 1.4 Continuity

**Definition 4 (Continuity at an interior point).** $f$ is continuous at interior point $c$ of its domain if
$$\lim_{x\to c}f(x) = f(c)$$
(This silently requires all three of: $f(c)$ exists, $\lim_{x\to c}f(x)$ exists, and they're equal.) Otherwise $f$ is **discontinuous** at $c$.

**Definition 5 (One-sided continuity).** $f$ is **right continuous** at $c$ if $\lim_{x\to c^+}f(x)=f(c)$; **left continuous** if $\lim_{x\to c^-}f(x)=f(c)$.

**Theorem 5.** $f$ is continuous at $c$ iff it is both left and right continuous at $c$.

**Definition 6 (Continuity at an endpoint).** $f$ is continuous at a left endpoint if right continuous there; continuous at a right endpoint if left continuous there.

**Definition 7 (Continuity on an interval).** $f$ is continuous on interval $I$ if continuous at every point of $I$. $f$ is a **continuous function** if continuous at every point of its domain.

**Functions continuous everywhere they are defined:** all polynomials; all rational functions; rational powers $x^{m/n}$; $\sin x,\cos x,\tan x,\sec x,\csc x,\cot x$; $|x|$.

**Theorem 6 (Combining continuous functions).** If $f,g$ continuous at $c$: $f\pm g$, $fg$, $kf$, $f/g$ (if $g(c)\ne0$), and $(f(x))^{1/n}$ (if $f(c)>0$ for even $n$) are all continuous at $c$.

**Theorem 7 (Composites of continuous functions).** If $\lim_{x\to c}g(x)=L$ and $f$ is continuous at $L$, then $\lim_{x\to c}f(g(x))=f(L)$. In particular, if $g$ is continuous at $c$, then $f\circ g$ is continuous at $c$.

**Removable discontinuity / continuous extension.** If $f(c)$ is undefined (or wrong) but $\lim_{x\to c}f(x)=L$ exists, define $F(x)=f(x)$ for $x\ne c$, $F(c)=L$. Then $F$ is the **continuous extension** of $f$ to $c$, and $f$ is said to have a **removable discontinuity** at $c$. For rational functions this is found by cancelling common factors.

**Theorem 8 (The Max-Min Theorem).** If $f$ is continuous on a closed, finite interval $[a,b]$, there exist $p,q\in[a,b]$ such that $f(p)\le f(x)\le f(q)$ for all $x\in[a,b]$. (So $f$ attains an absolute max and an absolute min on $[a,b]$, and consequently $f$ is bounded there.) This can fail if $f$ is not continuous or the interval is not closed/finite.

**Theorem 9 (The Intermediate-Value Theorem, IVT).** If $f$ is continuous on $[a,b]$ and $s$ is any number between $f(a)$ and $f(b)$, then there exists $c\in[a,b]$ with $f(c)=s$. Corollary: the range of $f$ on $[a,b]$ is the closed interval $[m,M]$ where $m,M$ are the min/max values.

**Application: locating roots.** If $f$ is continuous on $[a,b]$ and $f(a)$, $f(b)$ have opposite signs, IVT guarantees a root in $(a,b)$. The **Bisection Method** repeatedly halves such an interval, keeping the half whose endpoints still have opposite signs, to approximate the root to any desired accuracy.

### Worked Examples

**Example 1.** Show $f(x)=\dfrac{x^2-x}{x^2-1}$ has a removable discontinuity at $x=1$ and find the continuous extension.
For $x\ne1$: $f(x) = \dfrac{x(x-1)}{(x+1)(x-1)}=\dfrac{x}{x+1}$. So $\lim_{x\to1}f(x)=\dfrac12$. Define $F(x)=\dfrac{x}{x+1}$ (or $f(1):=\tfrac12$); $F$ is continuous at $1$.

**Example 2.** Determine where $f(x)=\begin{cases}x^2 & x\le1\\2-x & x>1\end{cases}$ is continuous.
For $x<1$ and $x>1$, $f$ is a polynomial piece, hence continuous. At $x=1$: $f(1)=1$. Left limit: $\lim_{x\to1^-}x^2=1$. Right limit: $\lim_{x\to1^+}(2-x)=1$. Both equal $f(1)=1$, so $f$ is continuous everywhere, including at $x=1$.

**Example 3.** Show $x^3-x-1=0$ has a root in $[1,2]$, and estimate it using two bisection steps.
$f(x)=x^3-x-1$ is a polynomial, continuous everywhere. $f(1)=-1<0$, $f(2)=5>0$; by IVT there's a root in $(1,2)$. Midpoint $1.5$: $f(1.5)=3.375-1.5-1=0.875>0$, so root is in $(1,1.5)$. Midpoint $1.25$: $f(1.25)=1.953-1.25-1=-0.297<0$, so root is in $(1.25,1.5)$.

**Example 4.** A field of perimeter 200 m is fenced into a rectangle with sides $x,y$. Find the maximum possible area using continuity (no calculus).
$y=100-x$, $A(x)=x(100-x)=100x-x^2 = 2500-(x-50)^2$ for $x\in[0,100]$. Since $A$ is continuous on a closed interval, Theorem 8 guarantees a maximum; it occurs at $x=50$ (where the subtracted square is $0$), giving $A=2500$ m².

**Common mistakes:** claiming a function "is discontinuous at $x=0$" when $0$ isn't even in the domain (e.g. $1/x$ — properly it's continuous on its domain, just undefined at 0); using IVT/Max-Min on an interval that isn't closed or a function that isn't continuous, where the conclusion can fail; forgetting IVT is an *existence* statement only — it doesn't tell you how to find $c$, only that it exists.

## 1.5 The Formal Definition of Limit

*(Often optional in a first course, but professors frequently test at least basic $\varepsilon$–$\delta$ verification.)*

**Definition 8 (Formal $\varepsilon$–$\delta$ definition of limit).**
$$\lim_{x\to a}f(x)=L$$
means: for every number $\varepsilon>0$ there exists a number $\delta>0$ such that
$$0<|x-a|<\delta \implies |f(x)-L|<\varepsilon$$

**Strategy for proofs:** start from the target inequality $|f(x)-L|<\varepsilon$, algebraically bound $|f(x)-L|$ by a multiple of $|x-a|$ (often assuming $\delta\le1$ first to control an extra factor), then solve for how small $|x-a|$ must be; take $\delta$ to be the minimum of any auxiliary bounds used.

**Definition 9 (Right limit, formal).** $\lim_{x\to a^+}f(x)=L$: for every $\varepsilon>0$ there is $\delta>0$ such that $a<x<a+\delta \implies |f(x)-L|<\varepsilon$. (Left limit analogous.)

**Definition 10 (Limit at infinity, formal).** $\lim_{x\to\infty}f(x)=L$: for every $\varepsilon>0$ there is $R$ such that $x>R \implies |f(x)-L|<\varepsilon$.

**Definition 11 (Infinite limit, formal).** $\lim_{x\to a}f(x)=\infty$: for every $B>0$ there is $\delta>0$ such that $0<|x-a|<\delta \implies f(x)>B$.

These formal definitions are what let us *prove* Theorems 2–4 of Section 1.2 rigorously (e.g. the Sum Rule, via the triangle inequality $|(f+g)-(L+M)|\le|f-L|+|g-M|$, each made $<\varepsilon/2$).

### Worked Examples

**Example 1.** Verify $\displaystyle\lim_{x\to2}x^2=4$ using the $\varepsilon$–$\delta$ definition.
$|x^2-4|=|x-2||x+2|$. Assume $\delta\le1$, so $|x-2|<1 \Rightarrow 1<x<3 \Rightarrow |x+2|<5$. Then $|x^2-4|<5|x-2|$. Requiring $5|x-2|<\varepsilon$ means $|x-2|<\varepsilon/5$. Take $\delta=\min\{1,\varepsilon/5\}$. Then $0<|x-2|<\delta \Rightarrow |x^2-4|<5\cdot\frac{\varepsilon}{5}=\varepsilon$. $\blacksquare$

**Example 2.** Verify $\displaystyle\lim_{x\to0^+}\sqrt x = 0$.
Given $\varepsilon>0$, want $|\sqrt x - 0|<\varepsilon$, i.e. $\sqrt x<\varepsilon$, i.e. $x<\varepsilon^2$. Take $\delta=\varepsilon^2$. Then $0<x<\delta \Rightarrow \sqrt x<\sqrt\delta=\varepsilon$. $\blacksquare$

**Example 3.** Verify $\displaystyle\lim_{x\to\infty}\frac1x=0$.
Given $\varepsilon>0$, want $\left|\frac1x-0\right|=\frac1x<\varepsilon$ for $x>0$, i.e. $x>1/\varepsilon$. Take $R=1/\varepsilon$. Then $x>R \Rightarrow |1/x|<\varepsilon$. $\blacksquare$

**Example 4.** Verify $\displaystyle\lim_{x\to0}\frac1{x^2}=\infty$.
Given $B>0$, want $\frac1{x^2}>B$, i.e. $x^2<1/B$, i.e. $|x|<1/\sqrt B$. Take $\delta=1/\sqrt B$. Then $0<|x|<\delta \Rightarrow x^2<\delta^2=1/B \Rightarrow 1/x^2>B$. $\blacksquare$

**Common mistakes:** forgetting the auxiliary restriction $\delta\le1$ (or similar) when the factor multiplying $|x-a|$ isn't already a constant; picking $\delta$ that depends on $x$ instead of only on $\varepsilon$; sign errors when bounding $|x+2|$ or similar expressions; forgetting $\delta = \min\{\ldots\}$ must satisfy *all* simultaneous requirements.

## Chapter 1 Review Problems

1. Find $\displaystyle\lim_{x\to3}(2x^2-5x+1)$.
2. Find $\displaystyle\lim_{x\to-1}\frac{x^2-1}{x+1}$.
3. Find $\displaystyle\lim_{x\to9}\frac{\sqrt x-3}{x-9}$.
4. Find $\displaystyle\lim_{x\to0}\frac{\sin x}{x}\cdot x$ using known behavior (state which limit law/fact you use), given $\lim_{x\to0}\frac{\sin x}{x}=1$.
5. Evaluate $\displaystyle\lim_{x\to2^-}\frac{|x-2|}{x-2}$ and $\displaystyle\lim_{x\to2^+}\frac{|x-2|}{x-2}$. Does the two-sided limit exist?
6. Evaluate $\displaystyle\lim_{x\to\infty}\frac{3x^3-2x+1}{5x^3+x^2}$.
7. Evaluate $\displaystyle\lim_{x\to\infty}(\sqrt{x^2+3x}-x)$.
8. Evaluate $\displaystyle\lim_{x\to1}\frac{1}{(x-1)^2}$ and describe the behavior (include the word "asymptote").
9. Let $f(x)=\dfrac{x^2-4}{x-2}$ for $x\ne2$. Is $f$ continuous at $x=2$? Find the continuous extension if it has a removable discontinuity.
10. **Explain why:** the function $g(x)=1/x$ is a "continuous function" even though its graph is "broken" at $x=0$.
11. Determine all points of discontinuity of $f(x)=\begin{cases}x+1 & x<0\\x^2 & 0\le x<2\\5-x & x\ge2\end{cases}$, and classify each (removable, jump, infinite).
12. Use the IVT to show $\cos x = x$ has a solution in $(0,\pi/2)$.
13. Use $\varepsilon$–$\delta$ to verify $\displaystyle\lim_{x\to3}(2x-1)=5$.
14. **Explain why:** if $f$ is continuous on $[0,1]$ with $0\le f(x)\le1$ for all $x$, there must exist $c\in[0,1]$ with $f(c)=c$ (a "fixed point"). (Hint: consider $g(x)=f(x)-x$.)
15. A rectangular box with a square base of side $x$ and fixed volume $V=32$ has surface area $S(x) = 2x^2 + \dfrac{4V}{x}$ for $x>0$. Explain why $S$ does **not** necessarily attain a minimum on the open interval $(0,\infty)$ by Theorem 8, and what additional information would be needed to guarantee a minimum exists.

### Solutions

**1.** Polynomial, direct substitution (Theorem 3): $2(9)-5(3)+1=18-15+1=4$.

**2.** Factor: $\dfrac{(x-1)(x+1)}{x+1}=x-1$ for $x\ne-1$. Limit $=-1-1=-2$.

**3.** Rationalize: $\dfrac{(\sqrt x-3)(\sqrt x+3)}{(x-9)(\sqrt x+3)}=\dfrac{x-9}{(x-9)(\sqrt x+3)}=\dfrac{1}{\sqrt x+3}$. Limit $=\dfrac1{3+3}=\dfrac16$.

**4.** $\dfrac{\sin x}{x}\cdot x = \sin x$ for $x\ne0$, so by the Product Rule (Theorem 2, part 3), $\lim_{x\to0}\left(\frac{\sin x}{x}\cdot x\right) = \left(\lim_{x\to0}\frac{\sin x}{x}\right)\left(\lim_{x\to0}x\right) = (1)(0)=0$. (Directly: $\lim_{x\to0}\sin x = 0$ too, consistent.)

**5.** For $x<2$: $|x-2|=2-x=-(x-2)$, so the ratio is $-1$; left limit $=-1$. For $x>2$: $|x-2|=x-2$, ratio is $1$; right limit $=1$. Since $-1\ne1$, the two-sided limit does not exist.

**6.** Same degree ($m=n=3$): limit is ratio of leading coefficients $=3/5$.

**7.** $\dfrac{(x^2+3x)-x^2}{\sqrt{x^2+3x}+x}=\dfrac{3x}{\sqrt{x^2+3x}+x}=\dfrac{3}{\sqrt{1+3/x}+1}\to\dfrac{3}{1+1}=\dfrac32$.

**8.** As $x\to1$, $(x-1)^2\to0^+$ always (square is nonnegative), so $\dfrac{1}{(x-1)^2}\to\infty$ (from both sides). $\lim_{x\to1}\dfrac1{(x-1)^2}=\infty$; $x=1$ is a vertical asymptote of the graph.

**9.** $f(x)=\dfrac{(x-2)(x+2)}{x-2}=x+2$ for $x\ne2$, so $\lim_{x\to2}f(x)=4$, but $f(2)$ is undefined — $f$ is **not** continuous at $2$ (it's not even in the domain), and it has a removable discontinuity there. Continuous extension: $F(x)=x+2$ for all $x$ (equivalently, define $f(2):=4$).

**10.** "Continuous function" (Definition 7) means continuous at every point of the function's *domain*. The domain of $g(x)=1/x$ is $(-\infty,0)\cup(0,\infty)$ — it does not include $0$. Since $g$ is continuous at every point of this domain (there is no requirement to check $x=0$, which isn't in the domain), $g$ qualifies as a continuous function even though its graph has two separate branches with a vertical asymptote at $x=0$.

**11.** At $x=0$: left limit $=\lim_{x\to0^-}(x+1)=1$; right value/limit from the $x^2$ piece: $f(0)=0^2=0$, $\lim_{x\to0^+}x^2=0$. Left limit $(1)\ne$ right limit $(0)$: **jump discontinuity** at $x=0$. At $x=2$: left limit $=\lim_{x\to2^-}x^2=4$; $f(2)=5-2=3$, right limit $=\lim_{x\to2^+}(5-x)=3$. Left limit $(4)\ne$ right/actual value $(3)$: **jump discontinuity** at $x=2$ as well (the right piece is continuous with $f(2)$, but the left limit disagrees). Elsewhere, each piece is a polynomial, so $f$ is continuous on $(-\infty,0)$, $(0,2)$, and $(2,\infty)$.

**12.** Let $h(x)=\cos x - x$, continuous everywhere (difference of continuous functions). $h(0)=\cos0-0=1>0$. $h(\pi/2)=\cos(\pi/2)-\pi/2 = 0-\pi/2<0$. Since $h(0)>0>h(\pi/2)$, by the IVT there exists $c\in(0,\pi/2)$ with $h(c)=0$, i.e. $\cos c=c$. $\blacksquare$

**13.** Given $\varepsilon>0$, want $|(2x-1)-5|<\varepsilon$, i.e. $|2x-6|<\varepsilon$, i.e. $2|x-3|<\varepsilon$, i.e. $|x-3|<\varepsilon/2$. Take $\delta=\varepsilon/2$. Then $0<|x-3|<\delta \Rightarrow |(2x-1)-5| = 2|x-3| < 2\delta = \varepsilon$. $\blacksquare$

**14.** Let $g(x)=f(x)-x$, continuous on $[0,1]$ since $f$ is continuous and $x$ is continuous. If $f(0)=0$ or $f(1)=1$ we're done immediately (take $c=0$ or $c=1$). Otherwise, since $0\le f(x)\le1$: $g(0)=f(0)-0=f(0)>0$ (as $f(0)\ne0$ means $f(0)>0$), and $g(1)=f(1)-1<0$ (as $f(1)\ne1$ means $f(1)<1$). Since $g(0)>0>g(1)$ and $g$ is continuous on $[0,1]$, the IVT guarantees some $c\in(0,1)$ with $g(c)=0$, i.e. $f(c)=c$. $\blacksquare$

**15.** Theorem 8 (Max-Min Theorem) requires the interval to be **closed and finite**; $(0,\infty)$ is neither closed (missing its left endpoint) nor finite (unbounded to the right). Indeed $S(x)\to\infty$ as $x\to0^+$ (the $4V/x$ term blows up) and $S(x)\to\infty$ as $x\to\infty$ (the $2x^2$ term dominates), so $S$ is unbounded near both "ends" of the open interval and Theorem 8 simply does not apply. To guarantee a minimum exists via Theorem 8 one would need to restrict to a closed, finite sub-interval $[a,b]\subset(0,\infty)$ known in advance to contain the minimizer (which calculus techniques in Chapter 4 will identify directly, without needing this restriction).
