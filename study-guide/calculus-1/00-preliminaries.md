# Chapter P: Preliminaries

This chapter is pure review, but it is the toolbox every later chapter draws on — inequality manipulation, absolute values, lines, circles/parabolas, function domains, and trig identities show up inside almost every limit, derivative, and integral problem, so fluency here directly prevents algebra mistakes on exams.

## P.1 Real Numbers and the Real Line

**Real number system.** Real numbers correspond to points on the real line $\mathbb{R}$. Key subsets: natural numbers $1,2,3,\dots$; integers $0,\pm1,\pm2,\dots$; rational numbers $m/n$ ($n\neq0$, both integers) — these have terminating or repeating decimal expansions; irrational numbers (non-repeating, non-terminating), e.g. $\sqrt2$, $\pi$.

**Rules for inequalities.** If $a,b,c\in\mathbb{R}$:
1. $a<b \implies a+c<b+c$
2. $a<b \implies a-c<b-c$
3. $a<b,\ c>0 \implies ac<bc$
4. $a<b,\ c<0 \implies ac>bc$ (in particular $-a>-b$)
5. $a>0 \implies 1/a>0$
6. $0<a<b \implies 1/b<1/a$

Rules 1–4 and 6 (for $a>0$) also hold with $\le,\ge$. **Multiplying/dividing an inequality by a negative number reverses it.**

**Completeness.** Every nonempty set of reals bounded above has a least upper bound (supremum). This is what makes $\mathbb{R}$ "gap-free," unlike $\mathbb{Q}$; it underlies limit theorems proved later (e.g. existence of extreme values, IVT).

**Intervals.** Open $(a,b)$, closed $[a,b]$, half-open $[a,b)$, $(a,b]$; infinite intervals $(a,\infty)$, $(-\infty,a]$, $(-\infty,\infty)=\mathbb{R}$. $\infty$ is never itself a member of an interval.

**Absolute value.**
$$|x| = \begin{cases} x & x\ge0 \\ -x & x<0\end{cases} = \sqrt{x^2}$$

Properties of absolute value:
- $|-a| = |a|$
- $|ab| = |a||b|$, $\left|\dfrac{a}{b}\right| = \dfrac{|a|}{|b|}$
- **Triangle inequality:** $|a\pm b| \le |a|+|b|$

Distance interpretation: $|x-y|$ is the distance from $x$ to $y$ on the number line. For $D>0$:
$$|x-a|<D \iff a-D<x<a+D, \qquad |x-a|>D \iff x<a-D \text{ or } x>a+D$$

**Common mistakes:** writing $\sqrt{a^2}=a$ (true only if $a\ge0$; in general $\sqrt{a^2}=|a|$); forgetting to flip inequality direction when multiplying/dividing by a negative; splitting $|x-a|<D$ into a single wrong-direction inequality instead of the compound one.

### Worked Examples

**Example 1.** Solve $2x-1>x+3$.
Add 1: $2x>x+4$. Subtract $x$: $x>4$. Solution: $(4,\infty)$.

**Example 2.** Solve $\dfrac{2}{x-1}\le 5$.
Rewrite: $\dfrac{2}{x-1}-5\le0 \iff \dfrac{2-5(x-1)}{x-1}\le0 \iff \dfrac{7-5x}{x-1}\le0$.
Sign chart with critical points $x=1$ (undefined) and $x=7/5$ (zero): the expression is negative for $x<1$, positive for $1<x<7/5$, zero at $x=7/5$, negative for $x>7/5$. We need $\le 0$, so solution is $(-\infty,1)\cup[7/5,\infty)$. (Careful: original book example asks for $\ge$; here we solve $\le$ — always redo the sign chart for your own inequality direction.)

**Example 3.** Solve $|3x-2|\le 1$.
Equivalent to $-1\le 3x-2\le1 \iff 1\le 3x\le 3 \iff 1/3\le x\le 1$. Solution: $[1/3,1]$.

**Example 4.** Solve $x^2-5x+6<0$.
Factor: $(x-2)(x-3)<0$. This is negative exactly between the roots: $2<x<3$.

## P.2 Cartesian Coordinates in the Plane

**Coordinates.** A point $P(a,b)$ has $x$-coordinate $a$, $y$-coordinate $b$. The plane is divided into four quadrants I–IV.

**Increments and distance.** If a particle moves from $(x_1,y_1)$ to $(x_2,y_2)$: $\Delta x = x_2-x_1$, $\Delta y=y_2-y_1$.

$$\textbf{Distance formula: } D=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$

**Slope.** For two points on a nonvertical line, $m = \dfrac{\Delta y}{\Delta x} = \dfrac{y_2-y_1}{x_2-x_1}$ (same value for any two points on the line). Vertical lines have undefined slope. If $\phi$ is the line's inclination (angle from positive $x$-axis, $0\le \phi<180°$), then $m=\tan\phi$.

- Parallel lines: equal slopes.
- Perpendicular lines: $m_1 m_2 = -1$ (each slope is the negative reciprocal of the other).

**Equations of lines:**
$$\text{Point-slope: } y = m(x-x_1)+y_1 \qquad \text{Slope-intercept: } y=mx+b \qquad \text{Slope}-x\text{-intercept: } y=m(x-a)$$
$$\text{General linear equation: } Ax+By=C$$

### Worked Examples

**Example 1.** Find the equation of the line through $(1,-1)$ and $(3,5)$.
Slope $m = \dfrac{5-(-1)}{3-1}=3$. Using $(1,-1)$: $y=3(x-1)-1=3x-4$.

**Example 2.** Find the slope and intercepts of $8x+5y=20$.
Solve for $y$: $y=-\frac85x+4$, so $m=-8/5$, $y$-intercept $4$. Setting $y=0$: $x=5/2$.

**Example 3.** Show the lines $y=2x+1$ and $y=-\tfrac12x+3$ are perpendicular.
Slopes are $2$ and $-1/2$; product is $-1$, so yes, perpendicular.

**Common mistakes:** confusing rise/run order (using $x_2-x_1$ over $y_2-y_1$); forgetting that vertical lines have *no* slope (not slope 0); sign errors distributing $m(x-x_1)$.

## P.3 Graphs of Quadratic Equations

**Circle.** Centre $(h,k)$, radius $a\ge0$:
$$(x-h)^2+(y-k)^2=a^2$$
Completing the square turns $x^2+y^2+2ax+2by=c$ into $(x+a)^2+(y+b)^2=c+a^2+b^2$: a circle if the right side is positive, a point if it's zero, empty if negative.

**Parabola.** Locus of points equidistant from a focus $F$ and a directrix $L$. Standard forms (vertex at origin):
$$x^2=4py \ \left(\text{focus }(0,p),\ \text{directrix } y=-p\right), \qquad y^2=4px \ \left(\text{focus }(p,0),\ \text{directrix } x=-p\right)$$
$y=ax^2+bx+c$ is a parabola; complete the square to $y=a(x-h)^2+k$ to find vertex $(h,k)$.

**Ellipse:** $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$, centre origin, passes through $(\pm a,0),(0,\pm b)$.

**Hyperbola:** $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$, two branches, asymptotes $\dfrac{x}{a}\mp\dfrac{y}{b}=0$. Also $xy=1$ is a (rectangular) hyperbola with the coordinate axes as asymptotes.

**Scaling and shifting.**
- Replacing $x$ with $ax$ ($a>0$) compresses horizontal distances by factor $1/a$.
- To shift right $c$: replace $x$ with $x-c$. To shift up $c$: replace $y$ with $y-c$.
- Reflections: $x\to -x$ reflects in $y$-axis; $y\to-y$ reflects in $x$-axis; swapping $x,y$ reflects in $y=x$.

### Worked Examples

**Example 1.** Find centre/radius of $x^2+y^2-4x+6y=3$.
Complete squares: $(x-2)^2+(y+3)^2 = 3+4+9=16$. Centre $(2,-3)$, radius $4$.

**Example 2.** Describe $y=x^2-4x+3$.
$y=(x-2)^2-1$. Parabola $y=x^2$ shifted right 2, down 1; vertex $(2,-1)$.

**Example 3.** Identify $9x^2+16y^2=144$.
Divide by 144: $\dfrac{x^2}{16}+\dfrac{y^2}{9}=1$. Ellipse with $a=4$ (major axis along $x$), $b=3$.

**Common mistakes:** forgetting to add the same completed-square constant to both sides; mixing up which axis the major axis of an ellipse lies on (compare $a^2$ under $x^2$ vs. $y^2$); sign errors in shift direction (replacing $x$ with $x-c$ shifts *right* even though it looks like subtraction).

## P.4 Functions and Their Graphs

**Definition 1 (Function).** A function $f$ from set $D$ into set $S$ is a rule assigning a unique element $f(x) \in S$ to each $x \in D$. $D=D(f)$ is the **domain**; the **range** $R(f)$ is the set of all output values.

**Domain convention.** If a function is given by a formula with no domain specified, its domain is the largest set of reals for which the formula produces a real value (exclude division by 0 and even roots of negatives).

**Vertical line test.** A curve is the graph of a function iff every vertical line meets it at most once.

**Definition 2 (Even/odd functions).**
- $f$ is **even** if $f(-x)=f(x)$ for all $x$ in the domain — graph symmetric about the $y$-axis.
- $f$ is **odd** if $f(-x)=-f(x)$ — graph symmetric about the origin. If $0$ is in the domain of an odd function, $f(0)=0$.

Sums/differences/constant multiples of even (or odd) functions stay even (or odd); a function need be neither.

**Basic catalog of graphs to memorize:** $y=c$, $y=x$, $y=x^2$, $y=\sqrt x$, $y=x^3$, $y=x^{1/3}$, $y=1/x$, $y=1/x^2$, $y=\sqrt{1-x^2}$ (upper unit semicircle), $y=|x|$.

**Reflections in special lines:**
1. $x\to -x$: reflect in $y$-axis.
2. $y\to -y$: reflect in $x$-axis.
3. $x\to a-x$: reflect in line $x=a/2$.
4. $y\to b-y$: reflect in line $y=b/2$.
5. swap $x\leftrightarrow y$: reflect in line $y=x$.

### Worked Examples

**Example 1.** Find the domain of $h(x)=\dfrac{x}{x^2-4}$.
Denominator zero at $x=\pm2$. Domain: $(-\infty,-2)\cup(-2,2)\cup(2,\infty)$.

**Example 2.** Determine whether $f(x)=x^4-3x^2+1$ is even, odd, or neither.
$f(-x)=(-x)^4-3(-x)^2+1=x^4-3x^2+1=f(x)$. Even.

**Example 3.** Sketch $y=1+\sqrt{x-4}$.
This is $y=\sqrt x$ shifted right 4 and up 1; domain $[4,\infty)$, range $[1,\infty)$.

**Example 4.** Is $g(x)=x^2-2x$ even, odd, or neither? Describe its symmetry.
$g(-x)=x^2+2x\ne g(x)$ and $\ne -g(x)$, so neither. But $g(x)=(x-1)^2-1$ is symmetric about the vertical line $x=1$ (not the $y$-axis).

**Common mistakes:** claiming a function is even just because it "looks symmetric" without checking $f(-x)$ algebraically; forgetting piecewise functions (e.g. $|x|$) can still be even/odd; excluding domain points only for square roots but forgetting denominators, or vice versa.

## P.5 Combining Functions to Make New Functions

**Definition 3 (Algebraic combinations).** For $x$ in the domains of both $f,g$:
$$(f+g)(x)=f(x)+g(x),\quad (f-g)(x)=f(x)-g(x),\quad (fg)(x)=f(x)g(x),\quad \left(\frac{f}{g}\right)(x)=\frac{f(x)}{g(x)}\ (g(x)\ne0)$$
Domain of each (except quotients) is $D(f)\cap D(g)$; quotient domains further exclude zeros of the denominator.

**Definition 4 (Composite functions).** $(f\circ g)(x)=f(g(x))$. Domain of $f\circ g$: all $x\in D(g)$ such that $g(x)\in D(f)$. ($g$ = inner function, computed first; $f$ = outer function.)

**Piecewise-defined functions** — key named examples:
- **Heaviside (unit step) function:** $H(x)=\begin{cases}1 & x\ge0\\0&x<0\end{cases}$
- **Signum function:** $\operatorname{sgn}(x)=\dfrac{x}{|x|}=\begin{cases}1&x>0\\-1&x<0\\\text{undefined}&x=0\end{cases}$ (odd function)
- **Greatest integer (floor) function:** $\lfloor x\rfloor$ = greatest integer $\le x$.
- **Least integer (ceiling) function:** $\lceil x\rceil$ = smallest integer $\ge x$.

### Worked Examples

**Example 1.** $f(x)=\sqrt x$, $g(x)=\sqrt{1-x}$. Find $f\circ g(x)$ and its domain.
$f\circ g(x) = \sqrt{\sqrt{1-x}}=(1-x)^{1/4}$. Need $1-x\ge 0$ (domain of $g$) and $g(x)\ge0$ (automatic since square roots are $\ge0$). Domain: $(-\infty,1]$.

**Example 2.** $G(x)=\dfrac{1-x}{1+x}$. Compute $G\circ G(x)$ and its domain.
$$G(G(x)) = \frac{1-\frac{1-x}{1+x}}{1+\frac{1-x}{1+x}} = \frac{(1+x)-(1-x)}{(1+x)+(1-x)}=\frac{2x}{2}=x$$
Although the simplified result is $x$ (defined everywhere), the domain of $G\circ G$ must still exclude $x=-1$ (excluded from $D(G)$). Domain: all reals except $-1$.

**Example 3.** Given $f(x)=x+5$, $g(x)=x^2-3$, find $f\circ g(x)$ and $g\circ f(x)$.
$f\circ g(x) = (x^2-3)+5 = x^2+2$. $g\circ f(x) = (x+5)^2-3 = x^2+10x+22$. Note $f\circ g \ne g\circ f$.

**Common mistakes:** simplifying a composite algebraically and forgetting that the *domain* is determined before simplification (as in Example 2); reversing the order of composition ($f\circ g$ means apply $g$ first); dropping a piece of a piecewise function's domain restriction when combining functions.

## P.6 Polynomials and Rational Functions

**Definition 5 (Polynomial).** $P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0$, $a_n\ne0$ if $n>0$; $n$ is the **degree**.

**Definition 6 (Rational function).** $R(x)=P(x)/Q(x)$ with $Q$ not the zero polynomial; domain excludes zeros of $Q$.

**Division algorithm.** If $\deg A_m = m > n = \deg B_n$, then
$$\frac{A_m(x)}{B_n(x)} = Q_{m-n}(x) + \frac{R_k(x)}{B_n(x)}, \qquad k<n$$
found by polynomial long division.

**Theorem 1 (Factor Theorem).** $r$ is a root of $P$ (i.e. $P(r)=0$) if and only if $(x-r)$ is a factor of $P(x)$.

Consequence: a degree-$n$ polynomial ($n\ge1$) has exactly $n$ roots counting multiplicity (Fundamental Theorem of Algebra + Factor Theorem, allowing complex roots). Complex roots of a real polynomial occur in conjugate pairs, each with the same multiplicity.

**Quadratic Formula.** Solutions of $Ax^2+Bx+C=0$ ($A\ne0$):
$$x = \frac{-B\pm\sqrt{B^2-4AC}}{2A}$$
Discriminant $D=B^2-4AC$: $D>0$ two distinct real roots; $D=0$ one repeated (double) real root; $D<0$ two complex conjugate roots.

**Useful factoring identities:**
- Difference of squares: $x^2-a^2=(x-a)(x+a)$
- Difference of cubes: $x^3-a^3=(x-a)(x^2+ax+a^2)$
- Sum of cubes: $x^3+a^3=(x+a)(x^2-ax+a^2)$
- Difference of $n$th powers: $x^n-a^n=(x-a)(x^{n-1}+ax^{n-2}+\cdots+a^{n-1})$
- Sum of $n$th powers ($n$ odd): $x^n+a^n=(x+a)(x^{n-1}-ax^{n-2}+\cdots+a^{n-1})$

### Worked Examples

**Example 1.** Perform the division algorithm on $\dfrac{2x^3-3x^2+3x+4}{x^2+1}$.
Long division gives quotient $2x-3$, remainder $x+7$:
$$\frac{2x^3-3x^2+3x+4}{x^2+1}=2x-3+\frac{x+7}{x^2+1}$$

**Example 2.** Find all roots of $x^3-x^2-4x+4$.
Factor by grouping: $x^2(x-1)-4(x-1)=(x-1)(x^2-4)=(x-1)(x-2)(x+2)$. Roots: $1,2,-2$.

**Example 3.** Find the roots of $2x^2+x+1$.
$A=2,B=1,C=1$; discriminant $=1-8=-7<0$. Roots: $x=\dfrac{-1\pm i\sqrt7}{4}$ (complex conjugate pair).

**Example 4.** Factor $x^4+3x^2-4$.
Treat as quadratic in $x^2$: $(x^2+4)(x^2-1)=(x^2+4)(x-1)(x+1)$. Real roots $\pm1$; complex roots $\pm2i$.

**Common mistakes:** forgetting that a repeated root counts with multiplicity when totaling "$n$ roots"; sign errors expanding $(x-r)$ factors; assuming a cubic/quartic factors nicely — always check the discriminant test or try the quadratic formula on remaining quadratic factors.

## P.7 The Trigonometric Functions

**Definition 7 (Radian measure).** For real $t$, let $P_t$ be the point on the unit circle $x^2+y^2=1$ reached by traveling arc length $|t|$ from $A(1,0)$, counterclockwise if $t>0$. The radian measure of $\angle AOP_t$ is $t$. $\pi$ radians $=180°$.

**Arc length and sector area** (radius $r$, angle $t$ radians): arc length $s=rt$; sector area $A = \tfrac12 r^2 t$.

**Definition 8 (Cosine and sine).** $\cos t$, $\sin t$ are the $x$- and $y$-coordinates of $P_t$.

**Fundamental properties:**
- Range: $-1\le\cos t\le1$, $-1\le \sin t\le1$
- **Pythagorean identity:** $\cos^2 t + \sin^2 t = 1$
- **Periodicity:** period $2\pi$: $\cos(t+2\pi)=\cos t$, $\sin(t+2\pi)=\sin t$
- Cosine even: $\cos(-t)=\cos t$; sine odd: $\sin(-t)=-\sin t$
- Complementary angles: $\cos(\pi/2 - t)=\sin t$, $\sin(\pi/2-t)=\cos t$
- Supplementary angles: $\cos(\pi-t)=-\cos t$, $\sin(\pi - t)=\sin t$

**Special angle table:**

| Degrees | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ |
|---|---|---|---|---|---|
| Radians | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
| $\cos$ | $1$ | $\sqrt3/2$ | $1/\sqrt2$ | $1/2$ | $0$ |
| $\sin$ | $0$ | $1/2$ | $1/\sqrt2$ | $\sqrt3/2$ | $1$ |

**Theorem 2 (Addition Formulas).**
$$\cos(s+t)=\cos s\cos t - \sin s\sin t \qquad \sin(s+t)=\sin s\cos t+\cos s\sin t$$
$$\cos(s-t)=\cos s\cos t+\sin s\sin t \qquad \sin(s-t)=\sin s\cos t - \cos s\sin t$$

**Double-angle formulas** (from addition formulas with $s=t$):
$$\sin 2t = 2\sin t\cos t \qquad \cos 2t = \cos^2 t - \sin^2 t = 2\cos^2 t - 1 = 1-2\sin^2 t$$

**Half-angle (power-reduction) formulas:**
$$\cos^2 t = \frac{1+\cos2t}{2} \qquad \sin^2 t = \frac{1-\cos2t}{2}$$

**Definition 9 (Other trig functions):**
$$\tan t=\frac{\sin t}{\cos t}\quad \cot t=\frac{\cos t}{\sin t}=\frac{1}{\tan t}\quad \sec t=\frac{1}{\cos t}\quad \csc t=\frac{1}{\sin t}$$
Tangent and cotangent have period $\pi$; secant and cosecant have period $2\pi$. Tangent, cotangent, cosecant are odd; secant is even.

**Pythagorean identity variants:** $1+\tan^2x=\sec^2x$, $\quad 1+\cot^2x=\csc^2x$.

**Addition formula for tangent:**
$$\tan(s+t)=\frac{\tan s+\tan t}{1-\tan s\tan t}\qquad \tan(s-t)=\frac{\tan s-\tan t}{1+\tan s\tan t}$$

**CAST rule:** in quadrant I All three primary functions positive; quadrant II only Sine; quadrant III only Tangent; quadrant IV only Cosine.

**Theorem 3 (Sine Law and Cosine Law)** for triangle $ABC$ with sides $a,b,c$ opposite angles $A,B,C$:
$$\text{Sine Law: } \frac{\sin A}{a}=\frac{\sin B}{b}=\frac{\sin C}{c}$$
$$\text{Cosine Law: } a^2=b^2+c^2-2bc\cos A \quad(\text{and cyclic versions})$$

### Worked Examples

**Example 1.** Find $\cos(\pi/12)$.
$\pi/12 = \pi/3-\pi/4$. $\cos(\pi/3-\pi/4)=\cos\frac\pi3\cos\frac\pi4+\sin\frac\pi3\sin\frac\pi4 = \frac12\cdot\frac1{\sqrt2}+\frac{\sqrt3}2\cdot\frac1{\sqrt2}=\frac{1+\sqrt3}{2\sqrt2}$.

**Example 2.** Find $\sin\theta$ and $\tan\theta$ given $\cos\theta=-1/3$ with $\theta\in[\pi,3\pi/2]$ (third quadrant).
$\sin^2\theta = 1-1/9=8/9$, so $\sin\theta=\pm\frac{2\sqrt2}{3}$. Third quadrant $\Rightarrow$ sine negative: $\sin\theta=-\frac{2\sqrt2}{3}$. $\tan\theta = \sin\theta/\cos\theta = \dfrac{-2\sqrt2/3}{-1/3}=2\sqrt2$.

**Example 3.** A triangle has $a=2$, $b=3$, $C=40°$. Find $c$.
Cosine Law: $c^2=a^2+b^2-2ab\cos C = 4+9-12\cos40°\approx 13-12(0.766)=3.808$, so $c\approx1.951$.

**Example 4.** Simplify $\dfrac{1-\cos x}{\sin x}$.
Multiply numerator and denominator by $(1+\cos x)$: $\dfrac{(1-\cos x)(1+\cos x)}{\sin x(1+\cos x)}=\dfrac{1-\cos^2x}{\sin x(1+\cos x)}=\dfrac{\sin^2x}{\sin x(1+\cos x)}=\dfrac{\sin x}{1+\cos x}$.

**Common mistakes:** using degree mode when the problem is stated in radians (or vice versa); writing $\cos^2 x$ to mean $\cos(x^2)$ instead of $(\cos x)^2$; forgetting the sign ambiguity when solving $\sin^2\theta=\ldots$ (must check the given quadrant); misapplying the ambiguous SSA triangle case (two sides + non-included angle can yield 0, 1, or 2 triangles).

## Chapter P Review Problems

1. Solve $3x-2\le 5x+4$ and express the solution as an interval.
2. Solve $|2x+3|=7$.
3. Solve the inequality $\dfrac{1}{x-2}<3$.
4. Find the distance between $(-1,4)$ and $(3,-2)$, and the midpoint of the segment joining them.
5. Find the equation of the line through $(2,-1)$ perpendicular to $y=\tfrac13x+5$.
6. Find the centre and radius of the circle $x^2+y^2+6x-2y=6$.
7. Find the vertex, axis, and direction of opening of the parabola $y=2x^2-8x+3$.
8. Determine whether $f(x)=\dfrac{x^3}{x^2+1}$ is even, odd, or neither, and state its domain.
9. Let $f(x)=\sqrt{x+2}$ and $g(x)=x^2-1$. Find $f\circ g(x)$, $g\circ f(x)$, and their domains.
10. Factor $x^4-16$ completely over the reals (into real linear and/or quadratic factors), and list all roots (real and complex).
11. Find all roots of $3x^2-2x+5$ and state their multiplicities.
12. Prove that $\dfrac{1-\sin x}{\cos x}=\dfrac{\cos x}{1+\sin x}$.
13. A triangle has $A=45°$, $a=4$, $b=3\sqrt2$. Explain why this SSA case might have 0, 1, or 2 solutions, then find angle $B$ (or explain if no triangle exists).
14. **Explain why:** the equation $y^2=x$ does *not* define $y$ as a function of $x$, but $y=\sqrt{x}$ does. What is the domain and range of $y=\sqrt x$?
15. **Explain why:** if $f$ is both even and odd on all of $\mathbb R$, then $f(x)=0$ for every $x$.

### Solutions

**1.** $3x-2\le5x+4 \Rightarrow -6\le 2x \Rightarrow x\ge -3$. Solution: $[-3,\infty)$.

**2.** $2x+3=\pm7$. Case $+7$: $2x=4$, $x=2$. Case $-7$: $2x=-10$, $x=-5$. Solutions: $x=2,-5$.

**3.** $\dfrac1{x-2}-3<0 \iff \dfrac{1-3(x-2)}{x-2}<0 \iff \dfrac{7-3x}{x-2}<0$. Critical points $x=2$ (undefined), $x=7/3$ (zero). Sign chart: for $x<2$: numerator $7-3x>0$, denominator $<0$ ⟹ negative ⟹ satisfies. For $2<x<7/3$: numerator $>0$, denominator $>0$ ⟹ positive ⟹ fails. For $x>7/3$: numerator $<0$, denominator $>0$ ⟹ negative ⟹ satisfies. Solution: $(-\infty,2)\cup(7/3,\infty)$.

**4.** $D=\sqrt{(3-(-1))^2+(-2-4)^2}=\sqrt{16+36}=\sqrt{52}=2\sqrt{13}$. Midpoint: $\left(\dfrac{-1+3}{2},\dfrac{4+(-2)}{2}\right)=(1,1)$.

**5.** Slope of given line is $1/3$; perpendicular slope is $-3$. Line: $y=-3(x-2)-1=-3x+5$.

**6.** Complete the square: $(x+3)^2+(y-1)^2 = 6+9+1=16$. Centre $(-3,1)$, radius $4$.

**7.** $y=2(x^2-4x)+3=2(x-2)^2-8+3=2(x-2)^2-5$. Vertex $(2,-5)$; axis $x=2$; opens upward since $a=2>0$.

**8.** $f(-x)=\dfrac{(-x)^3}{(-x)^2+1}=\dfrac{-x^3}{x^2+1}=-f(x)$. Odd function. Denominator $x^2+1$ never zero, so domain is all of $\mathbb R$.

**9.** $f\circ g(x)=f(x^2-1)=\sqrt{x^2-1}$; need $x^2-1\ge0 \Rightarrow |x|\ge1$, domain $(-\infty,-1]\cup[1,\infty)$.
$g\circ f(x)=g(\sqrt{x+2})=(\sqrt{x+2})^2-1=x+2-1=x+1$; but $x$ must be in $D(f)$: $x\ge-2$. Domain $[-2,\infty)$.

**10.** $x^4-16=(x^2-4)(x^2+4)=(x-2)(x+2)(x^2+4)$. Real roots: $2,-2$. Complex roots (from $x^2+4=0$): $\pm2i$. Fully factored over the reals: $(x-2)(x+2)(x^2+4)$.

**11.** $A=3,B=-2,C=5$. Discriminant $=4-60=-56<0$. Roots: $x=\dfrac{2\pm\sqrt{-56}}{6}=\dfrac{1}{3}\pm\dfrac{\sqrt{14}}{3}i$. Both roots have multiplicity 1 (simple, complex-conjugate pair).

**12.** Cross-multiply (equivalently multiply LHS by $\frac{1+\sin x}{1+\sin x}$):
$$\frac{1-\sin x}{\cos x}=\frac{(1-\sin x)(1+\sin x)}{\cos x(1+\sin x)}=\frac{1-\sin^2x}{\cos x(1+\sin x)}=\frac{\cos^2x}{\cos x(1+\sin x)}=\frac{\cos x}{1+\sin x}.\qquad\blacksquare$$

**13.** In the SSA case we know angle $A$ and the sides $a$ (opposite $A$) and $b$; using the Sine Law $\dfrac{\sin B}{b}=\dfrac{\sin A}{a}$ we solve for $\sin B$. Since $\sin$ is not one-to-one on $(0,\pi)$, both an acute and obtuse angle can satisfy the equation, giving two possible triangles — unless the computed $\sin B$ exceeds 1 (no triangle) or equals exactly 1 (right angle, one triangle), or the obtuse solution is inconsistent with the angle sum (only one triangle survives). Here: $\sin B = \dfrac{b\sin A}{a}=\dfrac{3\sqrt2\cdot(\sqrt2/2)}{4}=\dfrac{3}{4}$. So $B=\arcsin(3/4)\approx48.6°$ or $B\approx180°-48.6°=131.4°$. Check: $A+B<180°$ in both cases ($45+48.6=93.6°$, and $45+131.4=176.4°$), so **both are valid — two triangles exist.**

**14.** For $y^2=x$, both $y=\sqrt x$ and $y=-\sqrt x$ satisfy the equation for any $x>0$, so a single input $x$ gives two outputs $y$ — violating the definition of a function (unique output per input); the vertical line test fails, e.g. $x=4$ meets the curve at both $y=2,-2$. But $y=\sqrt x$ specifically denotes the *nonnegative* square root, so each $x\ge0$ gives exactly one $y$. Domain of $y=\sqrt x$: $[0,\infty)$; range: $[0,\infty)$.

**15.** Even means $f(-x)=f(x)$ for all $x$; odd means $f(-x)=-f(x)$ for all $x$. If both hold, then $f(x)=f(-x)=-f(x)$ for every $x$, so $2f(x)=0$, hence $f(x)=0$ for all $x$. $\blacksquare$
