# Chapter 4: More Applications of Differentiation

This chapter turns derivatives into a problem-solving toolkit — related rates, root-finding, limits, curve sketching, and (especially exam-heavy) optimization word problems — plus polynomial approximation (linearization, Taylor polynomials) with rigorous error bounds; expect a mix of "grind through the algebra" and "set up the right equation" questions.

## 4.1 Related Rates

When two or more time-dependent quantities are linked by an equation, differentiating that equation with respect to $t$ (implicitly, via the Chain Rule) relates their rates of change.

**How to solve related-rates problems:**
1. Read carefully; identify what's given and what's wanted.
2. Sketch a diagram.
3. Define symbols for all relevant quantities (as functions of time).
4. Find equation(s) relating the variables.
5. Differentiate implicitly with respect to $t$ — **do this before** substituting specific numeric values.
6. Substitute the known values and solve for the unknown rate.
7. State the answer in context, with correct units, and sanity-check it.

**Example 1 (ladder sliding down a wall).** The top of a 5 m ladder rests against a vertical wall; the bottom is pulled away from the wall at $\tfrac13$ m/s. How fast is the top sliding down when the bottom is 3 m from the wall?
*Solution.* Let $x$ = distance of base from wall, $y$ = height of top. $x^2+y^2=25$. Differentiate: $2x\dfrac{dx}{dt}+2y\dfrac{dy}{dt}=0$. When $x=3$, $y=4$ (since $3^2+y^2=25$). Given $dx/dt=1/3$:
$$2(3)\!\left(\frac13\right)+2(4)\frac{dy}{dt}=0 \implies 2+8\frac{dy}{dt}=0\implies \frac{dy}{dt}=-\frac14.$$
The top is sliding down at $1/4$ m/s.

**Example 2 (leaky conical tank).** A conical tank (vertex down), depth 5 m, top radius 2 m, leaks at $1/12\ \text{m}^3/\text{min}$ when the water is 4 m deep. How fast is the water level dropping?
*Solution.* Let $r,h$ be the surface radius and depth. By similar triangles $r/h=2/5\Rightarrow r=2h/5$. Volume $V=\tfrac13\pi r^2h = \tfrac13\pi\left(\tfrac{2h}{5}\right)^2h = \tfrac{4\pi}{75}h^3$. Then
$$\frac{dV}{dt}=\frac{4\pi}{25}h^2\frac{dh}{dt}.$$
At $h=4$, $dV/dt=-1/12$: $-\dfrac1{12}=\dfrac{4\pi}{25}(16)\dfrac{dh}{dt}\Rightarrow \dfrac{dh}{dt}=-\dfrac{25}{768\pi}\approx-0.0104$ m/min. The level drops at about 1.04 cm/min.

**Example 3 (shadow / similar triangles).** A man 2 m tall walks toward a 5 m lamppost at 0.5 m/s. How fast is the tip of his shadow moving when he is 3 m from the post?
*Solution.* Let $x$ = distance of man from post, $s$ = distance of shadow tip from post (i.e., from the base of the lamp). By similar triangles, $\dfrac{5}{s} = \dfrac{2}{s-x} \Rightarrow 5(s-x)=2s\Rightarrow 3s=5x\Rightarrow s=\tfrac53x$. Then $\dfrac{ds}{dt}=\dfrac53\dfrac{dx}{dt}=\dfrac53(-0.5)=-\dfrac56$ m/s (note $x$ decreases as he approaches). The shadow tip moves toward the post at $5/6$ m/s ($\approx 0.833$ m/s); this is the speed of the tip's position, independent of the 3 m detail (it cancels), though the *shadow length* rate would use different algebra.

**Example 4 (rotating beacon).** A lighthouse 2 km from shore rotates at 3 rev/min. How fast is the illuminated spot moving along the shore when it is 4 km from the closest point $A$?
*Solution.* Let $\theta$ = angle from the perpendicular, $x$ = distance along shore. $x=2\tan\theta$, so $\dfrac{dx}{dt}=2\sec^2\theta\,\dfrac{d\theta}{dt}$. Convert rate: $d\theta/dt = 3\text{ rev/min}\times2\pi = 6\pi$ rad/min. At $x=4$: $\tan\theta=2$, $\sec^2\theta=1+4=5$. So $dx/dt = 2(5)(6\pi)=60\pi\approx188.5$ km/min.

**Example 5 (aircraft and radio beacon — Pythagorean setup).** An aircraft flies horizontally at 600 km/h. How fast is the distance to a beacon increasing 1 min after passing 5 km directly above it?
*Solution.* Let $x$ = horizontal distance traveled since passing over, $s$ = distance to beacon. $s^2=x^2+25$. Differentiate: $2s\,ds/dt=2x\,dx/dt$. $dx/dt=600$ km/h $=10$ km/min, so at $t=1$ min, $x=10$ km, $s=\sqrt{100+25}=5\sqrt5$ km. $ds/dt = \dfrac{x}{s}\dfrac{dx}{dt}=\dfrac{10}{5\sqrt5}(600)=\dfrac{1200}{\sqrt5}\approx536.7$ km/h.

**Common mistakes:** Substituting the specific numeric values into the equation *before* differentiating (this "freezes" a variable and gives a wrong, constant derivative). Forgetting to convert units (rev/min to rad/min, or minutes to hours) so that all rates are in compatible units. Mixing up which quantity is increasing (positive rate) vs. decreasing (negative rate) — always assign the sign based on the physical situation.

## 4.2 Finding Roots of Equations

**Fixed-Point Iteration.** To solve $x=f(x)$, iterate $x_{n+1}=f(x_n)$ from a starting guess $x_0$.

**Theorem 1 (a fixed-point theorem).** If $f$ maps $I=[a,b]$ into itself, and there is $K$ with $0<K<1$ such that $|f(u)-f(v)|\le K|u-v|$ for all $u,v\in I$ (a "contraction"), then $f$ has a unique fixed point $r\in I$, and $x_n\to r$ from any $x_0\in I$. (Geometrically: iteration converges if $|f'(x)|<1$ near the fixed point — "staircase" or "spiral" convergence; it diverges if $|f'(x)|>1$.)

**Newton's Method.** To solve $f(x)=0$, use the tangent-line $x$-intercept iteration:
$$\boxed{x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}}$$
This is fixed-point iteration applied to $g(x)=x-f(x)/f'(x)$. Convergence, when it happens, is typically much faster ("quadratic") than the Bisection Method.

**Theorem 2 (error bounds for Newton's Method).** If $f,f',f''$ are continuous near a root $r$, $|f''(x)|\le K$, and $|f'(x)|\ge L>0$ nearby, then
$$|x_{n+1}-r|\le \frac{K}{2L}|x_n-r|^2.$$
So once $x_n$ is close enough, the number of correct digits roughly doubles each step.

**Example 1 (fixed-point iteration).** Solve $\cos x=5x$.
*Solution.* Write $x=f(x)=\tfrac15\cos x$. Start $x_0=0.2$. Iterating $x_{n+1}=\tfrac15\cos x_n$ converges quickly (since $|f'(x)|=\tfrac15|\sin x|<1$) to $r\approx0.19616428$.

**Example 2 (Newton's method for a cube root).** Find $\sqrt[3]{2}$ by solving $f(x)=x^3-2=0$.
*Solution.* $f'(x)=3x^2$; $x_{n+1}=x_n-\dfrac{x_n^3-2}{3x_n^2}=\dfrac{2x_n^3+2}{3x_n^2}$. Start $x_0=1.3$: $x_1=\dfrac{2(2.197)+2}{3(1.69)}=\dfrac{6.394}{5.07}\approx1.2612$; continuing gives rapid convergence to $r\approx1.259921$.

**Example 3 (Newton's method for a transcendental equation).** Solve $x^3=\cos x$.
*Solution.* $f(x)=x^3-\cos x$, $f'(x)=3x^2+\sin x$. Start $x_0=0.8$: $x_1 = x_0-\dfrac{(0.8)^3-\cos(0.8)}{3(0.8)^2+\sin(0.8)} \approx 0.8700$; iterating converges to $r\approx0.865474$.

**Example 4 (when Newton's method fails).** Apply Newton's method to $f(x)=x^{1/3}$ starting at $x_0=1$.
*Solution.* $f'(x)=\tfrac13x^{-2/3}$, so $x_{n+1}=x_n - \dfrac{x_n^{1/3}}{\tfrac13x_n^{-2/3}} = x_n-3x_n = -2x_n$. The iterates are $1,-2,4,-8,16,\ldots$ — they diverge (oscillating and growing) instead of converging to the actual root $x=0$, because $|f''|$ is unbounded (the tangent line is nearly vertical) near the root.

**Common mistakes:** Starting Newton's Method too far from the root, or at a point where $f'(x_n)\approx0$ (nearly horizontal tangent), causing wild jumps or divergence. Applying Newton's Method to an equation $g(x)=h(x)$ without first rewriting it as $f(x)=g(x)-h(x)=0$. Assuming convergence without checking that successive iterates and $f(x_n)$ are actually shrinking.

## 4.3 Indeterminate Forms

**Types:** $[0/0]$, $[\infty/\infty]$, $[0\cdot\infty]$, $[\infty-\infty]$, $[0^0]$, $[1^\infty]$, $[\infty^0]$.

**Theorem 3 (first l'Hôpital Rule).** If $f,g$ are differentiable near $a$ (with $g'\ne0$), and $\displaystyle\lim_{x\to a}f(x)=\lim_{x\to a}g(x)=0$, and $\displaystyle\lim_{x\to a}\frac{f'(x)}{g'(x)}=L$ (finite, $\infty$, or $-\infty$), then $\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)}=L$.

**Theorem 4 (second l'Hôpital Rule).** Same conclusion holds when $\lim_{x\to a}g(x)=\pm\infty$ (i.e. for the $[\infty/\infty]$ form), under analogous hypotheses. Both versions extend to one-sided limits and to $a=\pm\infty$.

**Strategy for other indeterminate types:** convert to $[0/0]$ or $[\infty/\infty]$:
- $[0\cdot\infty]$: rewrite $fg$ as $f/(1/g)$ or $g/(1/f)$.
- $[\infty-\infty]$: combine into a single fraction.
- $[0^0],[1^\infty],[\infty^0]$: take $\ln$ of $y=f(x)^{g(x)}$ to get $\ln y = g(x)\ln f(x)$, an indeterminate product; then exponentiate the resulting limit.

**Example 1.** $\displaystyle\lim_{x\to1}\frac{\ln x}{x^2-1}$.
*Solution.* $[0/0]$: $=\displaystyle\lim_{x\to1}\frac{1/x}{2x}=\frac12$.

**Example 2 ($[\infty-\infty]$).** $\displaystyle\lim_{x\to0^+}\left(\frac1x-\frac1{\sin x}\right)$.
*Solution.* Combine: $=\displaystyle\lim_{x\to0^+}\frac{\sin x-x}{x\sin x}\ [0/0]$. Differentiate twice: $\displaystyle\lim\frac{\cos x-1}{\sin x+x\cos x}\ [0/0] = \lim\frac{-\sin x}{2\cos x-x\sin x}=\frac{0}{2}=0$.

**Example 3 ($[0^0]$).** $\displaystyle\lim_{x\to0^+}x^x$.
*Solution.* Let $y=x^x$; $\ln y = x\ln x\ [0\cdot(-\infty)] = \dfrac{\ln x}{1/x}\ [-\infty/\infty]=\displaystyle\lim\frac{1/x}{-1/x^2}=\lim(-x)=0$. So $\ln y\to0\Rightarrow y\to e^0=1$.

**Example 4 (not indeterminate — beware!).** $\displaystyle\lim_{x\to1^+}\frac{x}{\ln x}$.
*Solution.* The numerator $\to1\ne0$ while denominator $\to0^+$, so this is **not** indeterminate; direct substitution logic gives $\displaystyle\lim_{x\to1^+}\frac{x}{\ln x} = \frac{1}{0^+}=+\infty$. (Applying l'Hôpital here — differentiating to get $1/(1/x)=x\to1$ — would give the *wrong* answer.)

**Common mistakes:** Applying l'Hôpital to a non-indeterminate limit (Example 4 is the classic trap). Differentiating the *quotient* $f/g$ (using the Quotient Rule) instead of taking the quotient of the *separate* derivatives $f'/g'$. Forgetting to re-check that the new limit is still indeterminate before applying l'Hôpital again — stop as soon as it isn't. Forgetting to exponentiate back ($y=e^{\lim\ln y}$) after computing $\lim \ln y$ for $0^0,1^\infty,\infty^0$ forms.

## 4.4 Extreme Values

**Definition 1 (absolute extrema).** $f(x_0)$ is the absolute max of $f$ if $f(x)\le f(x_0)$ for all $x$ in the domain (similarly for min).

**Definition 2 (local extrema).** $f(x_0)$ is a local max if $f(x)\le f(x_0)$ for all $x$ near $x_0$ (within some $h>0$) in the domain.

**Theorem 5 (existence).** If $f$ is continuous on a closed, finite interval (or finite union of such), $f$ **must** attain an absolute max and min there.

**Theorem 6 (where extrema occur).** Local extrema can occur only at:
(i) **critical points** ($f'(x)=0$), (ii) **singular points** ($f'(x)$ undefined), or (iii) **endpoints** of the domain.

**Theorem 7 (First Derivative Test).** At an interior point $x_0$: if $f'>0$ just left and $f'<0$ just right, local max; if $f'<0$ then $f'>0$, local min. At a left endpoint $a$: $f'>0$ nearby $\Rightarrow$ local min at $a$; $f'<0\Rightarrow$ local max at $a$ (reversed logic at a right endpoint).

**Theorem 8 (extrema on open/infinite intervals).** If $f$ is continuous on $(a,b)$ with $\lim_{x\to a^+}f=L$, $\lim_{x\to b^-}f=M$, and $f(u)>L,M$ for some $u$, then $f$ has an absolute max on $(a,b)$ (similarly for min with $<$).

**Example 1 (closed interval).** Find extrema of $g(x)=x^3-3x^2-9x+2$ on $[-2,2]$.
*Solution.* $g'(x)=3x^2-6x-9=3(x+1)(x-3)$; critical points $x=-1,3$, but $3\notin[-2,2]$. Check $x=-2,-1,2$: $g(-2)=0$, $g(-1)=7$, $g(2)=-20$. Max $=7$ at $x=-1$; min $=-20$ at $x=2$.

**Example 2 (singular point).** Find extrema of $h(x)=3x^{2/3}-2x$ on $[-1,1]$.
*Solution.* $h'(x)=2x^{-1/3}-2 = 2(x^{-1/3}-1)$, undefined at $x=0$ (singular point). Critical point at $x^{-1/3}=1\Rightarrow x=1$ (also an endpoint). Check $x=-1,0,1$: $h(-1)=5$, $h(0)=0$, $h(1)=1$. Max $=5$ at $x=-1$; min $=0$ at the singular point $x=0$.

**Example 3 (First Derivative Test with a chart).** Classify critical points of $f(x)=x^4-2x^2-3$ on $[-2,2]$.
*Solution.* $f'(x)=4x^3-4x=4x(x-1)(x+1)$, zero at $x=-1,0,1$.

| $x$ | $-2$ | $(-2,-1)$ | $-1$ | $(-1,0)$ | $0$ | $(0,1)$ | $1$ | $(1,2)$ | $2$ |
|---|---|---|---|---|---|---|---|---|---|
| $f'$ | | $-$ | $0$ | $+$ | $0$ | $-$ | $0$ | $+$ | |
| $f$ | max(EP) | $\searrow$ | min | $\nearrow$ | max | $\searrow$ | min | $\nearrow$ | max(EP) |

$f(0)=-3$, $f(\pm1)=-4$, $f(\pm2)=5$. Absolute max $=5$ at $x=\pm2$; absolute min $=-4$ at $x=\pm1$.

**Example 4 (open interval).** Show $f(x)=x+4/x$ has an absolute minimum on $(0,\infty)$ and find it.
*Solution.* $\lim_{x\to0^+}f=\infty$, $\lim_{x\to\infty}f=\infty$, and $f(1)=5<\infty$, so by Theorem 8 a minimum exists. $f'(x)=1-4/x^2=0\Rightarrow x=2$ (only positive critical point). $f(2)=2+2=4$ is the minimum.

**Common mistakes:** Forgetting to check singular points (where $f'$ doesn't exist) in addition to critical points. Forgetting to check the endpoints on a closed interval. Assuming a critical point is automatically an extremum without applying a test (e.g., $f'$ could have the same sign on both sides, giving neither a max nor min — as with $f(x)=x^3$ at $x=0$).

## 4.5 Concavity and Inflections

**Definition 3.** $f$ is **concave up** on an interval if $f'$ is increasing there; **concave down** if $f'$ is decreasing.

**Definition 4 (inflection point).** $(x_0,f(x_0))$ is an inflection point if the graph has a tangent line there (possibly vertical) **and** concavity is opposite on the two sides of $x_0$.

**Theorem 9.** (a) $f''>0$ on $I\Rightarrow$ concave up on $I$. (b) $f''<0\Rightarrow$ concave down. (c) If $f$ has an inflection at $x_0$ and $f''(x_0)$ exists, then $f''(x_0)=0$ (but the converse is false — see $f(x)=x^4$ at 0, where $f''(0)=0$ but there's no inflection).

**Theorem 10 (Second Derivative Test).** At a critical point $x_0$ (where $f'(x_0)=0$): if $f''(x_0)<0$, local max; if $f''(x_0)>0$, local min; if $f''(x_0)=0$, **no conclusion** (could be max, min, or inflection — must fall back on the First Derivative Test).

**Example 1.** Find inflection points of $f(x)=x^6-10x^4$.
*Solution.* $f''(x)=30x^4-120x^2=30x^2(x-2)(x+2)$, zero at $x=0,\pm2$. Sign of $f''$: positive on $(-\infty,-2)$, negative on $(-2,0)$, negative on $(0,2)$ (since $x^2\ge0$ doesn't change sign there), positive on $(2,\infty)$. Concavity changes at $x=\pm2$ (inflections, since $f(\pm2)=-96$) but **not** at $x=0$ (no sign change, so no inflection despite $f''(0)=0$).

**Example 2.** Classify critical points of $f(x)=x^2e^{-x}$.
*Solution.* $f'(x) = (2x-x^2)e^{-x}=x(2-x)e^{-x}=0$ at $x=0,2$. $f''(x)=(x^2-4x+2)e^{-x}$; $f''(0)=2>0\Rightarrow$ local min at $x=0$; $f''(2)=-2e^{-2}<0\Rightarrow$ local max at $x=2$.

**Example 3 (Second Derivative Test fails).** Consider $f(x)=x^4$ and $g(x)=-x^4$ and $h(x)=x^3$, all with $f'(0)=g'(0)=h'(0)=0$ and $f''(0)=g''(0)=h''(0)=0$.
*Solution.* $x^4$ has a local (and absolute) min at $0$; $-x^4$ has a local max at $0$; $x^3$ has neither (it has an inflection at $0$). This shows $f''(x_0)=0$ genuinely gives no information — the First Derivative Test (or higher-derivative test) is required.

**Example 4.** Find and classify all critical points of $f(x)=x^4-2x^3+1$.
*Solution.* $f'(x)=4x^3-6x^2=2x^2(2x-3)=0$ at $x=0,\,3/2$. $f''(x)=12x^2-12x=12x(x-1)$. $f''(0)=0$ (inconclusive — use First Derivative Test: $f'<0$ on both sides of $0$ since $2x^2\ge0$ and $2x-3<0$ nearby, so no extremum, but $f''$ changes sign at $x=0$, giving an inflection there). $f''(3/2)=12(1.5)(0.5)=9>0\Rightarrow$ local min at $x=3/2$, value $f(3/2)=-11/16$.

**Common mistakes:** Concluding an inflection point exists merely because $f''(x_0)=0$, without checking that concavity actually *changes sign* there (see Example 1, $x=0$). Using the Second Derivative Test when $f''(x_0)=0$ — it gives no conclusion; switch to the First Derivative Test instead.

## 4.6 Sketching the Graph of a Function

**Definition 5 (vertical asymptote):** $x=a$ is one if $\lim_{x\to a^-}f=\pm\infty$ or $\lim_{x\to a^+}f=\pm\infty$.

**Definition 6 (horizontal asymptote):** $y=L$ is one if $\lim_{x\to\infty}f=L$ or $\lim_{x\to-\infty}f=L$.

**Definition 7 (oblique asymptote):** $y=ax+b$ ($a\ne0$) is one if $\lim_{x\to\pm\infty}[f(x)-(ax+b)]=0$.

**Asymptotes of a rational function** $f=P_m/Q_n$ (no common factors):
- Vertical asymptote at every zero of $Q_n$.
- If $m<n$: horizontal asymptote $y=0$.
- If $m=n$: horizontal asymptote $y=$ (ratio of leading coefficients).
- If $m=n+1$: oblique asymptote from polynomial long division, $f(x)=ax+b+R(x)/Q_n(x)$.
- If $m>n+1$: no horizontal or oblique asymptote.

**Checklist for curve sketching:**
1. Compute $f'$, $f''$ in factored form.
2. From $f$: domain, asymptotes, symmetry (even/odd), intercepts.
3. From $f'$: critical points, points where $f'$ undefined, sign chart (increasing/decreasing, local max/min).
4. From $f''$: zeros of $f''$, sign chart (concavity, inflection points).
5. Assemble a careful sketch showing all the above.

**Example 1 (oblique asymptote).** Sketch $y=\dfrac{x^2+2x+4}{2x}$.
*Solution.* Rewrite $y=\dfrac x2+1+\dfrac2x$. Oblique asymptote $y=\tfrac x2+1$; vertical asymptote $x=0$. $y'=\dfrac12-\dfrac2{x^2}=\dfrac{x^2-4}{2x^2}$, zero at $x=\pm2$; $y''=4/x^3$. Sign chart gives local max at $x=-2$ ($y=-1$, concave down there) and local min at $x=2$ ($y=3$, concave up).

**Example 2 (two vertical asymptotes).** Sketch $f(x)=\dfrac{x^2-1}{x^2-4}$.
*Solution.* Vertical asymptotes $x=\pm2$; horizontal asymptote $y=1$; even function (symmetric about $y$-axis); intercepts $(0,1/4)$, $(\pm1,0)$. $f'(x)=\dfrac{-6x}{(x^2-4)^2}$, only critical point $x=0$ (local max, $f(0)=1/4$); $f''(x)=\dfrac{6(3x^2+4)}{(x^2-4)^3}$, always positive for $|x|>2$ and negative for $|x|<2$ (no interior zero, so no inflection points; concavity switches only across the asymptotes).

**Example 3 (no asymptote, symmetric, uses $e^{-x^2}$ decay).** Sketch $y=xe^{-x^2/2}$.
*Solution.* Domain all reals; odd function; horizontal asymptote $y=0$ both directions (exponential decay beats the linear factor). $y'=(1-x^2)e^{-x^2/2}$, critical points $x=\pm1$ (local min at $-1$, local max at $1$); $y''=x(x^2-3)e^{-x^2/2}$, inflections at $x=0,\pm\sqrt3$.

**Common mistakes:** Forgetting the oblique asymptote case ($\deg P=\deg Q+1$) and reporting "no horizontal asymptote" as the final word. Believing a curve can never cross its horizontal/oblique asymptote (false — Example 2's function $g(x)=(x^4+x^2)/(x^4+1)$ from the book crosses $y=1$ twice; asymptotic behavior is only about the limit at $\pm\infty$).

## 4.8 Extreme-Value Problems (Optimization)

**Procedure:**
1. Read carefully; identify the quantity $Q$ to optimize.
2. Sketch a diagram.
3. Define symbols.
4. Express $Q$ as a function of the relevant variable(s).
5. Find constraint equation(s) linking the variables if there is more than one.
6. Use the constraint(s) to write $Q$ as a function of **one** variable, and determine that variable's valid interval.
7. Find the extreme value using Section 4.4's techniques (check critical points, singular points, **and** endpoints).
8. State the conclusion in context; sanity-check the answer.

**Example 1 (fence/enclosure — the "one-side-free" classic).** A rectangular enclosure uses an existing wall as one side; the other three sides use 100 m of fence. Maximize the area.
*Solution.* Let $x$ = side parallel to wall, $y$ = each perpendicular side. $x+2y=100\Rightarrow x=100-2y$. $A(y) = xy = (100-2y)y = 100y-2y^2$, $0\le y\le50$. $A'(y)=100-4y=0\Rightarrow y=25$. $A(0)=A(50)=0$, so the max is at $y=25$: $A=1250\ \text{m}^2$ (with $x=50$ m).

**Example 2 (box-volume optimization — open box from a sheet).** A box with no top is made from a $70\text{ cm}\times150\text{ cm}$ sheet by cutting equal squares of side $x$ from each corner and folding up the sides. Maximize the volume.
*Solution.* Base dimensions become $(150-2x)\times(70-2x)$, height $x$, with $0<x<35$. $V(x)=x(150-2x)(70-2x) = 4x^3-440x^2+10500x$. $V'(x)=12x^2-880x+10500$. Solve $12x^2-880x+10500=0$: $x=\dfrac{880\pm\sqrt{880^2-4(12)(10500)}}{24}=\dfrac{880\pm\sqrt{774400-504000}}{24}=\dfrac{880\pm\sqrt{270400}}{24}=\dfrac{880\pm520}{24}$. So $x=58.33$ (rejected, $>35$) or $x=15$. Check $V(0)=V(35)=0$, so $x=15$ gives the maximum: $V(15)=15(120)(40)=72{,}000\ \text{cm}^3$.

**Example 3 (economical cylinder — two related variables via a constraint).** Find the most economical shape (minimum surface area for given volume $V$) of a cylindrical can.
*Solution.* $V=\pi r^2h$ (constant) and $S=2\pi rh+2\pi r^2$. Solve $h=V/(\pi r^2)$ and substitute: $S(r) = \dfrac{2V}{r}+2\pi r^2$, $r>0$. $\lim_{r\to0^+}S=\lim_{r\to\infty}S=\infty$, so a minimum exists (Theorem 8). $S'(r) = -\dfrac{2V}{r^2}+4\pi r=0\Rightarrow r^3 = \dfrac{V}{2\pi}=\dfrac12 r^2h \Rightarrow h=2r$. The most economical can has height equal to diameter.

**Example 4 (ladder over a fence — extreme value via angle parametrization).** Find the shortest ladder that reaches from the ground, over a 2 m fence standing 1 m from a wall, to the wall.
*Solution.* Let $\theta$ = angle of the ladder with the ground. $L(\theta) = \dfrac{1}{\cos\theta}+\dfrac{2}{\sin\theta}$, $0<\theta<\pi/2$. $L\to\infty$ at both ends, so a minimum exists at a critical point. $L'(\theta)=\dfrac{\sin\theta}{\cos^2\theta}-\dfrac{2\cos\theta}{\sin^2\theta}=0\Rightarrow \tan^3\theta=2$. Using $\sec^2\theta=1+2^{2/3}$, one finds $L_{\min} = (1+2^{2/3})^{3/2}\approx4.16$ m.

**Example 5 (a case where the extremum is at an endpoint, not a critical point).** A man who runs twice as fast as he swims stands at $A$ on a circular pool of diameter 40 m and wants to reach the diametrically opposite point $B$ fastest, by running along the arc to $C$ then swimming straight to $B$. Where should $C$ be?
*Solution.* With $\theta=\angle AOC\in[0,\pi]$ and swim speed $k$: $t(\theta) = \dfrac{20}{2k}+\dfrac{40}{k}\sin\left(\dfrac{\pi-\theta}2\right)$. Setting $t'(\theta)=0$ gives the critical point $\theta=\pi/3$, but checking values shows $t(\pi/3)\approx45.11/k$ is actually the **worst** (a local *max* of time), while the endpoint $\theta=\pi$ (run the whole way) gives $t(\pi)=10\pi/k\approx31.4/k$, the true minimum. **Lesson: always compare critical points against endpoints — the critical point is not automatically the answer.**

**Common mistakes:** Forgetting to restrict the domain of the single-variable function to physically meaningful values (e.g., $0\le y\le50$, not all reals) — this is essential for invoking Theorem 5/8 to *guarantee* an extremum exists. Finding a critical point and assuming it's the desired extremum without checking endpoints or comparing values (Example 5). Sign errors when eliminating a variable via the constraint equation. Failing to define variables/set up the constraint equation clearly before differentiating, leading to differentiating the wrong expression.

## 4.9 Linear Approximations

**Definition 8.** The **linearization** of $f$ about $a$ is $L(x)=f(a)+f'(a)(x-a)$ (the tangent-line equation), and $f(x)\approx L(x)$ for $x$ near $a$.

**Theorem 11 (error formula).** If $f''$ exists on an interval containing $a,x$, then the error $E(x)=f(x)-L(x)$ satisfies
$$E(x) = \frac{f''(s)}{2}(x-a)^2 \quad\text{for some } s \text{ between } a \text{ and } x.$$

**Corollaries:**
- **A.** If $f''$ has constant sign between $a,x$, $E(x)$ has that same sign (concave up $\Rightarrow f(x)>L(x)$; concave down $\Rightarrow f(x)<L(x)$).
- **B.** If $|f''(t)|<K$ throughout, then $|E(x)|<\dfrac K2(x-a)^2$.
- **C.** If $M<f''(t)<N$ throughout, $L(x)+\dfrac M2(x-a)^2 < f(x) < L(x)+\dfrac N2(x-a)^2$.

**Example 1.** Approximate $\sqrt{26}$ using linearization about $x=25$; bound the error.
*Solution.* $f(x)=\sqrt x$, $f'(x)=\tfrac1{2\sqrt x}$. $L(x)=5+\tfrac1{10}(x-25)$. $\sqrt{26}\approx L(26)=5.1$. $f''(x)=-\tfrac14x^{-3/2}<0$ on $(25,26)$, so error is negative: $\sqrt{26}<5.1$. $|f''(t)|\le\tfrac14\cdot25^{-3/2}=\tfrac1{500}$ for $t\ge25$, so $|E|<\tfrac12\cdot\tfrac1{500}\cdot1^2=0.001$. Hence $\sqrt{26}\in(5.099,5.1)$.

**Example 2.** Approximate $\cos36°=\cos(\pi/5)$ using linearization about $\pi/6$; bound the error.
*Solution.* $f(t)=\cos t$; $L(x)=\cos\tfrac\pi6-\sin\tfrac\pi6(x-\tfrac\pi6) = \tfrac{\sqrt3}2-\tfrac12(x-\tfrac\pi6)$. With $x-\tfrac\pi6=\tfrac\pi{30}$: $\cos36°\approx\tfrac{\sqrt3}2-\tfrac12\cdot\tfrac\pi{30}\approx0.81367$. $f''(t)=-\cos t<0$ on $(\pi/6,\pi/5)$, so true value is less: $\cos36°<0.81367$; $|f''|<\cos(\pi/6)=\sqrt3/2$, so $|E|<\tfrac{\sqrt3}4(\pi/30)^2\approx0.00475$. So $\cos36°\in(0.80892, 0.81367)$.

**Example 3 (percent change / physical application).** A spherical balloon's radius grows from 20.00 cm to 20.20 cm. Estimate the change in volume.
*Solution.* $V=\tfrac43\pi r^3$, $dV/dr=4\pi r^2$. $\Delta V\approx4\pi(20)^2(0.2) = 320\pi\approx1005.3\ \text{cm}^3$.

**Common mistakes:** Forgetting to determine the *sign* of the error (via the sign of $f''$) so as to state whether the approximation over- or under-estimates. Using $K=|f''(a)|$ instead of a bound valid over the *entire* interval between $a$ and $x$ (need the max of $|f''|$ on that interval, not just at the endpoint).

## 4.10 Taylor Polynomials

**Definition.** The $n$th-order Taylor polynomial of $f$ about $a$ is
$$P_n(x) = f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)^2+\cdots+\frac{f^{(n)}(a)}{n!}(x-a)^n,$$
matching $f$ and its first $n$ derivatives at $x=a$ (Taylor polynomials about $0$ are called **Maclaurin polynomials**).

**Theorem 12 (Taylor's Theorem with Lagrange remainder).** If $f^{(n+1)}$ exists on an interval containing $a,x$, then
$$\boxed{f(x) = P_n(x) + E_n(x),\qquad E_n(x) = \frac{f^{(n+1)}(s)}{(n+1)!}(x-a)^{n+1}\ \text{ for some } s \text{ between } a,x.}$$

**Big-O notation (Definition 9).** $f(x)=O(u(x))$ as $x\to a$ means $|f(x)|\le K|u(x)|$ near $a$ for some constant $K$. Properties: $O(u)+O(u)=O(u)$; $C\cdot O(u)=O(u)$; if $f=O((x-a)^ku(x))$ then $f/(x-a)^k=O(u(x))$.

**Theorem 13 (uniqueness).** If $f(x)=Q_n(x)+O((x-a)^{n+1})$ for a degree-$\le n$ polynomial $Q_n$, then $Q_n=P_n$ (the Taylor polynomial) — this lets us find Taylor polynomials by algebraic manipulation of known series instead of repeated differentiation.

**Key Maclaurin formulas (memorize these six):**
$$e^x = 1+x+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}+O(x^{n+1})$$
$$\cos x = 1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots+(-1)^n\frac{x^{2n}}{(2n)!}+O(x^{2n+2})$$
$$\sin x = x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots+(-1)^n\frac{x^{2n+1}}{(2n+1)!}+O(x^{2n+3})$$
$$\frac1{1-x}=1+x+x^2+\cdots+x^n+O(x^{n+1})$$
$$\ln(1+x)=x-\frac{x^2}2+\frac{x^3}3-\cdots+(-1)^{n-1}\frac{x^n}n+O(x^{n+1})$$
$$\tan^{-1}x = x-\frac{x^3}3+\frac{x^5}5-\cdots+(-1)^n\frac{x^{2n+1}}{2n+1}+O(x^{2n+3})$$

**Example 1.** Find $P_2(x)$ for $f(x)=\sqrt x$ about $x=25$, and use it (with Taylor's Theorem) to approximate $\sqrt{26}$ with an error bound.
*Solution.* $f'(x)=\tfrac12x^{-1/2}$, $f''(x)=-\tfrac14x^{-3/2}$. $P_2(x)=5+\tfrac1{10}(x-25)-\tfrac1{1000}(x-25)^2$. $\sqrt{26}\approx P_2(26)=5+0.1-0.001=5.099$. $f'''(x)=\tfrac38x^{-5/2}$; for $25<s<26$, $|f'''(s)|\le\tfrac38\cdot25^{-5/2}=\tfrac1{83333}$ roughly $= 1.2\times10^{-5}$-ish (book gets $3/25000$); the resulting bound is $|E_2(26)|\le \dfrac{1}{50000}=0.00002$, so $\sqrt{26}\in(5.09898,5.09902)$ — much tighter than the linear approximation.

**Example 2.** Find the Maclaurin polynomial $P_7(x)$ for $e^x$ and use Taylor's Theorem to confirm $P_7(1)$ gives $e$ correct to 3 decimals.
*Solution.* $P_n(x)=\sum_{k=0}^n x^k/k!$. $P_7(1) = 1+1+\tfrac12+\tfrac16+\tfrac1{24}+\tfrac1{120}+\tfrac1{720}+\tfrac1{5040}\approx2.71825$. Error: $E_7(1) = \dfrac{e^s}{8!}$ for some $0<s<1$, so $E_7(1)<\dfrac{e}{40320}<\dfrac{3}{40320}\approx0.0000744<0.0005$, confirming 3-decimal accuracy.

**Example 3 (combining known series — Theorem 13 shortcut).** Find $P_3(x)$ for $e^{2x}$ about $x=1$ using the Maclaurin series for $e^t$.
*Solution.* Write $2x = 2+2(x-1)$, so $e^{2x}=e^2\cdot e^{2(x-1)}$. Substituting $t=2(x-1)$ into the $e^t$ Maclaurin formula:
$$e^{2x} = e^2\left[1+2(x-1)+\frac{[2(x-1)]^2}{2!}+\frac{[2(x-1)]^3}{3!}+O((x-1)^4)\right],$$
so by Theorem 13, $P_3(x) = e^2\left[1+2(x-1)+2(x-1)^2+\dfrac43(x-1)^3\right]$.

**Example 4 (Taylor series to evaluate a limit — alternative to l'Hôpital).** Evaluate $\displaystyle\lim_{x\to0}\frac{2\sin x-\sin(2x)}{2e^x-2-2x-x^2}$.
*Solution.* Expand each piece to order 3: $2\sin x = 2x-\tfrac{x^3}3+O(x^5)$; $\sin2x = 2x-\tfrac{8x^3}6+O(x^5)=2x-\tfrac{4x^3}3+O(x^5)$; numerator $=2x-\tfrac{x^3}3-2x+\tfrac{4x^3}3+O(x^5) = x^3+O(x^5)$. Denominator: $2e^x = 2+2x+x^2+\tfrac{x^3}3+O(x^4)$, so $2e^x-2-2x-x^2=\tfrac{x^3}3+O(x^4)$. Ratio $\to \dfrac{x^3}{x^3/3}=3$.

**Common mistakes:** Using a Taylor polynomial of too-low order in a limit computation, so that all surviving terms cancel to $0/0$ again — always go at least one order higher than where the leading terms of numerator/denominator first cancel. Forgetting that the point $s$ in the Lagrange remainder is *unknown* (not $a$ or $x$) — you can only *bound* $|f^{(n+1)}(s)|$, not evaluate it exactly. Confusing "Taylor polynomial about $a$" with "Maclaurin polynomial" (the latter is specifically about $a=0$).

## 4.11 Roundoff Error, Truncation Error, and Computers

**Two distinct error sources:**
- **Truncation error** — the error from cutting off an infinite/exact process after finitely many terms, e.g. approximating $f(x)$ by a degree-$n$ Taylor polynomial and discarding the $O((x-a)^{n+1})$ remainder. This is a *mathematical* approximation error, present even with infinite-precision arithmetic.
- **Roundoff error** — the error from a computer's finite-precision (floating-point) representation of real numbers. Computers store numbers as a **mantissa** $\times$ **base**$^{\text{exponent}}$ using finitely many bits, so most real numbers must be rounded to the nearest representable value.

**Machine epsilon** $\varepsilon$: the smallest positive floating-point number such that the computer recognizes $1+\varepsilon>1$; for a typical 64-bit double with 52 mantissa bits, $\varepsilon=2^{-52}\approx2.22\times10^{-16}$. Any positive $x<\varepsilon$ added to 1 is rounded away and the computer returns exactly 1.

**Key takeaway for exams:** truncation error is controllable — you can always shrink it by using a higher-order polynomial (more terms) or evaluating closer to the expansion point $a$. Roundoff error is a hardware/software limitation that persists no matter the mathematical method used, and it becomes the *dominant* source of error precisely where truncation error becomes very small (e.g. very close to $a$, or after adding/subtracting many nearly-equal floating-point numbers, which can cause catastrophic cancellation).

**Example.** Estimate the truncation error in approximating $\sin(0.1)$ by its degree-3 Maclaurin polynomial $P_3(x)=x-x^3/6$.
*Solution.* By Taylor's Theorem, $E_3(x) = \dfrac{f^{(4)}(s)}{4!}x^4 = \dfrac{\sin(s)}{24}x^4$ for some $s$ between $0$ and $0.1$. Since $|\sin s|\le1$, $|E_3(0.1)| \le \dfrac{(0.1)^4}{24}\approx4.2\times10^{-7}$ — this is *truncation* error, independent of what machine performs the arithmetic. If a calculator with only 8 significant digits then rounds the result of $P_3(0.1)=0.09983\overline{3}$, an additional (much smaller) *roundoff* error is introduced on top.

**Common mistakes:** Using "roundoff error" and "truncation error" interchangeably — they arise from different causes (finite arithmetic precision vs. discarding higher-order terms) and are controlled by different means (more precision vs. more terms/closer expansion point).

---

## Chapter 4 Review Problems

1. A square's side is increasing at 2 cm/min. How fast is the area increasing when the side is 8 cm?
2. Use Newton's Method (two iterations, $x_0=1.5$) to approximate the root of $x^3-x-1=0$.
3. Evaluate $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}$.
4. Evaluate $\displaystyle\lim_{x\to\infty}x^2e^{-x}$.
5. Find and classify all local extrema of $f(x)=x^3-3x+1$.
6. Find the inflection points of $f(x)=x^4-4x^3$.
7. Sketch (describe: asymptotes, symmetry, extrema, concavity) $f(x)=\dfrac{x}{x^2-1}$.
8. **(Related rates)** A 13 m ladder leans against a wall; the bottom slides away at 2 m/s. How fast is the top sliding down when the bottom is 5 m from the wall?
9. **(Related rates)** Water drains from an inverted conical tank (top radius 3 m, depth 6 m) at $2\ \text{m}^3/\text{min}$. How fast is the depth falling when the depth is 4 m?
10. **(Optimization)** A closed rectangular box with a square base is to have volume $32\ \text{m}^3$. Minimize the total surface area.
11. **(Optimization)** Find the point on the parabola $y=x^2$ closest to the point $(0,3)$.
12. Find the linearization of $f(x)=\tan x$ about $x=\pi/4$, and use it to approximate $\tan(44°)$ ($44° = \pi/4 - \pi/180$ rad).
13. Find the 3rd-order Maclaurin polynomial for $f(x)=\ln(1+2x)$, and give the Lagrange remainder form for $E_3(x)$.
14. **(Conceptual)** Explain why the Second Derivative Test gives no information at a critical point where $f''(x_0)=0$, using $f(x)=x^3$ and $f(x)=x^4$ as contrasting examples.
15. **(Conceptual)** A student uses l'Hôpital's Rule on $\displaystyle\lim_{x\to0}\dfrac{x+\sin x}{x}$ and gets $\displaystyle\lim_{x\to0}\dfrac{1+\cos x}{1}=2$. The direct answer is also 2. Was using l'Hôpital's Rule valid here? Explain.

### Solutions

**1.** $A=s^2$, $dA/dt = 2s\,ds/dt = 2(8)(2)=32\ \text{cm}^2/\text{min}$.

**2.** $f(x)=x^3-x-1$, $f'(x)=3x^2-1$. $x_1 = 1.5-\dfrac{1.5^3-1.5-1}{3(1.5)^2-1}=1.5-\dfrac{0.875}{5.75}\approx1.3478$. $x_2 = 1.3478-\dfrac{(1.3478)^3-1.3478-1}{3(1.3478)^2-1}\approx1.3252$. (Converging toward the true root $\approx1.32472$.)

**3.** $[0/0]$: $\displaystyle\lim\frac{\sin x}{2x}\ [0/0] = \lim\frac{\cos x}{2}=\frac12$.

**4.** $\displaystyle\lim_{x\to\infty}\frac{x^2}{e^x}\ [\infty/\infty] = \lim\frac{2x}{e^x}\ [\infty/\infty]=\lim\frac2{e^x}=0$ (exponentials beat powers — Theorem 5 of Section 3.4/4.3).

**5.** $f'(x)=3x^2-3=0\Rightarrow x=\pm1$. $f''(x)=6x$; $f''(-1)=-6<0\Rightarrow$ local max at $x=-1$, $f(-1)=3$; $f''(1)=6>0\Rightarrow$ local min at $x=1$, $f(1)=-1$.

**6.** $f''(x)=12x^2-24x=12x(x-2)$, zero at $x=0,2$; sign changes at both (from $+$ to $-$ at $0$, from $-$ to $+$ at $2$), so both are inflection points: $(0,0)$ and $(2,-16)$.

**7.** Domain: $x\ne\pm1$; odd function; vertical asymptotes $x=\pm1$; horizontal asymptote $y=0$. $f'(x)=\dfrac{-(x^2+1)}{(x^2-1)^2}<0$ everywhere in the domain, so $f$ is decreasing on each interval of its domain (no local extrema). $f''(x)=\dfrac{2x(x^2+3)}{(x^2-1)^3}$: concave down for $x<-1$, concave up for $-1<x<0$, concave down for $0<x<1$, concave up for $x>1$ (inflection at $x=0$ only, since the others are asymptotes not domain points).

**8.** $x^2+y^2=169$. $2x\,dx/dt+2y\,dy/dt=0$. At $x=5$: $y=12$. $dx/dt=2$: $2(5)(2)+2(12)\,dy/dt=0\Rightarrow dy/dt=-\dfrac{20}{24}=-\dfrac56$ m/s (top sliding down at $5/6$ m/s).

**9.** $r/h=3/6=1/2\Rightarrow r=h/2$. $V=\tfrac13\pi r^2h=\tfrac13\pi(h/2)^2h=\tfrac{\pi}{12}h^3$. $dV/dt = \tfrac{\pi}4h^2\,dh/dt$. Draining, so $dV/dt=-2$; at $h=4$: $-2=\tfrac\pi4(16)\dfrac{dh}{dt}\Rightarrow \dfrac{dh}{dt}=-\dfrac{2}{4\pi}=-\dfrac1{2\pi}\approx-0.159$ m/min.

**10.** Let side of base $=x$, height $=y$; $V=x^2y=32\Rightarrow y=32/x^2$. $S(x)=2x^2+4xy = 2x^2+128/x$, $x>0$. $S'(x)=4x-128/x^2=0\Rightarrow x^3=32\Rightarrow x=32^{1/3}=2\cdot2^{2/3}$ (i.e. $x=\sqrt[3]{32}\approx3.17$ m); $y=32/x^2\approx3.17$ m as well (a cube-like shape, since $y=x$ can be checked directly: $32/x^2=x\Rightarrow x^3=32$, same equation). $S_{\min}=2x^2+128/x\approx2(10.08)+40.4\approx60.6\ \text{m}^2$.

**11.** Minimize $D^2=x^2+(x^2-3)^2$ (using $D^2$ avoids the square root). $\dfrac{d(D^2)}{dx}=2x+2(x^2-3)(2x)=2x[1+2(x^2-3)]=2x(2x^2-5)=0\Rightarrow x=0$ or $x^2=5/2$. Testing: $x=0$ gives $D^2=9$; $x^2=5/2$ gives $D^2 = \tfrac52+(\tfrac52-3)^2=\tfrac52+\tfrac14=\tfrac{11}4=2.75<9$. So the closest points are $x=\pm\sqrt{5/2}$, $y=5/2$.

**12.** $f(\pi/4)=1$, $f'(x)=\sec^2x$, $f'(\pi/4)=2$. $L(x)=1+2(x-\pi/4)$. $44°$ is $\pi/4-\pi/180$ rad, so $x-\pi/4=-\pi/180$: $\tan(44°)\approx1-2\pi/180 = 1-\pi/90\approx1-0.0349=0.9651$.

**13.** $f(x)=\ln(1+2x)$; using the known series with $t=2x$: $\ln(1+2x) = 2x-\dfrac{(2x)^2}2+\dfrac{(2x)^3}3+O(x^4) = 2x-2x^2+\dfrac{8x^3}3+O(x^4)$. So $P_3(x)=2x-2x^2+\tfrac83x^3$. Lagrange remainder: $E_3(x) = \dfrac{f^{(4)}(s)}{4!}x^4$ for some $s$ between $0,x$, where $f^{(4)}(t) = \dfrac{-2^4\cdot3!}{(1+2t)^4}=\dfrac{-96}{(1+2t)^4}$, so $E_3(x) = \dfrac{-4}{(1+2s)^4}x^4$.

**14.** Both functions satisfy $f'(0)=f''(0)=0$. For $f(x)=x^4$: $f'(x)=4x^3$ is negative for $x<0$ and positive for $x>0$, so by the First Derivative Test $x=0$ is a local (in fact absolute) minimum. For $f(x)=x^3$: $f'(x)=3x^2\ge0$ on *both* sides of $0$ (never negative), so there's no sign change and hence no local extremum at $x=0$ — instead $x^3$ has an inflection point there. Since $f''(x_0)=0$ is consistent with *both* outcomes (extremum in one case, inflection in the other), knowing only that $f''(x_0)=0$ can never by itself distinguish between them; more information (like the First Derivative Test or a higher-order derivative test) is required.

**15.** Yes, the application was valid. As $x\to0$, the numerator $x+\sin x\to0+0=0$ and the denominator $x\to0$ as well, so the limit genuinely is of the indeterminate form $[0/0]$, which is exactly the hypothesis Theorem 3 requires. Differentiating numerator and denominator separately gives $\lim_{x\to0}(1+\cos x)/1 = 1+1=2$, which matches the answer obtained by direct algebraic simplification, $\lim_{x\to0}(1+\sin x/x)=1+1=2$. Contrast this with Example 4 of Section 4.3 ($\lim_{x\to1^+}x/\ln x$), where the numerator does *not* approach 0 — there l'Hôpital's Rule would not apply, and blindly differentiating top and bottom would give a wrong answer. The lesson: always explicitly verify both numerator and denominator individually approach $0$ (or both $\pm\infty$) before invoking l'Hôpital; in this problem the check passes, so the application was legitimate.
