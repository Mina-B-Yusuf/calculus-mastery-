# Chapter 5: Integration

This is the capstone chapter of Calculus 1: it builds the definite integral from scratch (sums → Riemann sums → the integral), proves the Fundamental Theorem of Calculus, and gives you the first integration techniques (substitution, basic trig integrals). Everything in Calculus 2 (Chapter 6's techniques and Chapter 7's applications) assumes total fluency with the material here — expect it to be tested heavily and to reappear inside every later chapter.

## 5.1 Sums and Sigma Notation

**Definition 1 (Sigma notation).** If $m \le n$ are integers and $f$ is defined at the integers $m, m+1, \dots, n$, then
$$\sum_{i=m}^n f(i) = f(m) + f(m+1) + \cdots + f(n).$$
Here $i$ is the **index of summation** (a dummy variable), and $m, n$ are the **lower** and **upper limits of summation**.

**Linearity of sums.** For constants $A, B$:
$$\sum_{i=m}^n \big(Af(i) + Bg(i)\big) = A\sum_{i=m}^n f(i) + B\sum_{i=m}^n g(i).$$

**Index shifting.** $\displaystyle\sum_{j=m}^{m+n} f(j) = \sum_{i=0}^n f(i+m)$ (substitute $j = i+m$).

**Theorem 1 (Summation formulas).**
$$\text{(a) } \sum_{i=1}^n 1 = n \qquad \text{(b) } \sum_{i=1}^n i = \frac{n(n+1)}{2} \qquad \text{(c) } \sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6} \qquad \text{(d) } \sum_{i=1}^n r^{i-1} = \frac{r^n-1}{r-1}\ (r\ne 1)$$

Formula (c) is proved by writing $n$ copies of $(k+1)^3-k^3 = 3k^2+3k+1$ and adding — the left side **telescopes**: $\sum_{k=1}^n\big[(k+1)^3-k^3\big] = (n+1)^3-1$. In general a **telescoping sum** $\sum_{i=m}^n\big[f(i+1)-f(i)\big] = f(n+1)-f(m)$ because consecutive terms cancel.

Formula (d) is proved by computing $(r-1)s$ where $s = \sum_{i=1}^n r^{i-1}$: the terms cancel except the first and last.

**Worked Examples**

1. **Evaluate $\displaystyle\sum_{k=1}^{n} (6k^2-4k+3)$.** Using Theorem 1: $6\cdot\frac{n(n+1)(2n+1)}{6} - 4\cdot\frac{n(n+1)}{2} + 3n = (n)(n+1)(2n+1) - 2n(n+1) + 3n = 2n^3+n^2+2n.$

2. **Evaluate $\displaystyle\sum_{n=1}^{10}\big(n^4-(n-1)^4\big)$.** This telescopes: $= 10^4 - 0^4 = 10{,}000.$

3. **Show $\displaystyle\sum_{j=1}^n \frac{1}{j(j+1)} = 1-\frac{1}{n+1}$.** Since $\frac{1}{j(j+1)} = \frac1j - \frac1{j+1}$, the sum telescopes to $1 - \frac{1}{n+1} = \frac{n}{n+1}$.

4. **Express $\displaystyle\sum_{j=3}^{17}\sqrt{1+j^2}$ in the form $\sum_{i=1}^n f(i)$.** Let $j = i+2$; then $j=3\Rightarrow i=1$, $j=17\Rightarrow i=15$, so the sum is $\displaystyle\sum_{i=1}^{15}\sqrt{1+(i+2)^2}.$

**Common mistakes:** Forgetting that the index is a dummy variable (the answer never contains $i$); misaligning limits when shifting the index; trying to "split" a product or quotient across a sum (sums are only linear in addition/scalar multiplication).

## 5.2 Areas as Limits of Sums

To find the area under $y=f(x)\ge 0$ on $[a,b]$, partition $[a,b]$ with $a=x_0<x_1<\cdots<x_n=b$, let $\Delta x_i = x_i-x_{i-1}$, build rectangles of height $f(x_i)$ over each subinterval, and sum:
$$S_n = \sum_{i=1}^n f(x_i)\,\Delta x_i.$$
$$\text{Area of } R = \lim_{\substack{n\to\infty \\ \max \Delta x_i \to 0}} S_n.$$

For **equal subintervals**: $\Delta x_i = \Delta x = \frac{b-a}{n}$, $x_i = a + i\,\Delta x$.

**Worked Examples**

1. **Area under $y=x+1$ on $[0,2]$.** With $x_i = 2i/n$, $S_n = \sum_{i=1}^n\left(\frac{2i}{n}+1\right)\frac{2}{n} = 2\left(\frac{n+1}{n}\right)+2 \to 4$ as $n\to\infty$ (matches the trapezoid area $= 2\cdot2 + \tfrac12\cdot2\cdot2=4$).

2. **Area under $y=x^2$ on $[0,b]$.** $S_n = \sum_{i=1}^n \left(\frac{ib}{n}\right)^2\frac{b}{n} = \frac{b^3}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} \to \frac{b^3}{3}.$

3. **General power rule** (Example 3, using a *geometric* partition $x_i = at^i$ with $t=(b/a)^{1/n}$): for $k\ne -1$, the area under $y=x^k$ on $[a,b]$ (with $0<a<b$) is
$$A = \frac{b^{k+1}-a^{k+1}}{k+1}.$$
This is proved via l'Hôpital's Rule on an indeterminate $0/0$ limit, and previews the Power Rule for antiderivatives.

4. **Recognizing a sum as an area.** $\displaystyle\lim_{n\to\infty}\sum_{i=1}^n \frac{n-i}{n^2} = \lim_{n\to\infty}\sum_{i=1}^n\left(1-\frac{i}{n}\right)\frac1n$ is a Riemann sum for $y=1-x$ on $[0,1]$, a triangle of area $\tfrac12$.

**Common mistakes:** Using $f(x_{i-1})$ vs. $f(x_i)$ inconsistently (fine in the limit, but be consistent within one sum); forgetting the requirement that the *widest* subinterval width must shrink to $0$ (not just $n\to\infty$).

## 5.3 The Definite Integral

**Partitions.** $P = \{x_0,x_1,\dots,x_n\}$ with $a=x_0<\cdots<x_n=b$; norm $\|P\| = \max_i \Delta x_i$.

**Definition 2 (Upper/lower Riemann sums).** On each $[x_{i-1},x_i]$, let $l_i, u_i$ be points where $f$ attains its min/max. Then
$$L(f,P) = \sum_{i=1}^n f(l_i)\Delta x_i, \qquad U(f,P) = \sum_{i=1}^n f(u_i)\Delta x_i,$$
and $L(f,P)\le U(f,P)$ always. Refining a partition ($P_1\subseteq P_2$) gives $L(f,P_1)\le L(f,P_2)\le U(f,P_2)\le U(f,P_1)$.

**Definition 3 (The definite integral).** If there is exactly one number $I$ with $L(f,P)\le I \le U(f,P)$ for **every** partition $P$, then $f$ is **integrable** on $[a,b]$, and
$$I = \int_a^b f(x)\,dx.$$
Terminology: $\int$ is the integral sign; $a,b$ are limits of integration; $f$ is the integrand; $x$ is the variable of integration (a dummy variable — $\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$); $dx$ is the differential.

**Theorem 2.** If $f$ is continuous on $[a,b]$, then $f$ is integrable on $[a,b]$.

**General Riemann sums.** Pick any **tag** $c_i \in [x_{i-1},x_i]$; then $R(f,P,c) = \sum_{i=1}^n f(c_i)\Delta x_i$ satisfies $L(f,P)\le R(f,P,c)\le U(f,P)$, and for integrable $f$,
$$\lim_{\substack{n(P)\to\infty\\ \|P\|\to 0}} R(f,P,c) = \int_a^b f(x)\,dx.$$

**Worked Examples**

1. **Lower/upper sums for $f(x)=1/x$ on $[1,2]$, $n=4$.** Since $f$ is decreasing, min/max on $[x_{i-1},x_i]$ are $1/x_i$ and $1/x_{i-1}$. Compute $L(f,P) = \frac14\left(\frac45+\frac23+\frac47+\frac12\right)\approx 0.6345$, $U(f,P)\approx 0.7595$.

2. **Express $\displaystyle\lim_{n\to\infty}\sum_{i=1}^n \frac{2}{n}\left(1+\frac{2i-1}{n}\right)^{1/3}$ as a definite integral.** The tags $c_i=(2i-1)/n$ lie in $[x_{i-1},x_i]=[(2i-2)/n, 2i/n]$, an equal partition of $[0,2]$ with $\Delta x = 2/n$. This is a Riemann sum for $f(x)=(1+x)^{1/3}$, so the limit is $\int_0^2 (1+x)^{1/3}\,dx$.

**Common mistakes:** Confusing upper/lower sums with left/right sums (they use the actual max/min on each subinterval, not endpoint values, unless $f$ is monotonic); assuming every bounded function is integrable (continuity, or piecewise continuity, is what guarantees it here).

## 5.4 Properties of the Definite Integral

**Theorem 3.** Let $f,g$ be integrable on an interval containing $a,b,c$.
$$\text{(a) } \int_a^a f\,dx = 0 \qquad \text{(b) } \int_b^a f\,dx = -\int_a^b f\,dx \qquad \text{(c) } \int_a^b (Af+Bg)\,dx = A\int_a^b f\,dx + B\int_a^b g\,dx$$
$$\text{(d) } \int_a^b f\,dx + \int_b^c f\,dx = \int_a^c f\,dx \qquad \text{(e) } f\le g \text{ on } [a,b] \Rightarrow \int_a^b f\,dx \le \int_a^b g\,dx$$
$$\text{(f) } \left|\int_a^b f\,dx\right| \le \int_a^b |f|\,dx \quad (a\le b) \qquad \text{(g) } f \text{ odd} \Rightarrow \int_{-a}^a f\,dx = 0 \qquad \text{(h) } f \text{ even} \Rightarrow \int_{-a}^a f\,dx = 2\int_0^a f\,dx$$

**Theorem 4 (Mean-Value Theorem for Integrals).** If $f$ is continuous on $[a,b]$, there exists $c\in[a,b]$ such that
$$\int_a^b f(x)\,dx = (b-a)f(c).$$

**Definition 4 (Average value).** $\displaystyle \bar f = \frac{1}{b-a}\int_a^b f(x)\,dx.$

**Definition 5 (Piecewise continuous functions).** $f$ is piecewise continuous on $[c_0,c_n]$ if there are points $c_0<c_1<\cdots<c_n$ and continuous functions $F_i$ on each $[c_{i-1},c_i]$ agreeing with $f$ on the open subinterval; then $\int_{c_0}^{c_n} f\,dx = \sum_i \int_{c_{i-1}}^{c_i} F_i\,dx$.

**Worked Examples**

1. **Evaluate $\int_{-2}^2 (2+5x)\,dx$ using symmetry.** $\int_{-2}^2 2\,dx = 8$ (rectangle); $\int_{-2}^2 5x\,dx = 0$ (odd function, symmetric interval). Total: $8$.

2. **Average value of $f(x)=2x$ on $[1,5]$.** $\bar f = \frac14\int_1^5 2x\,dx = \frac14\left[x^2\right]_1^5 = \frac14(25-1)=6.$

3. **$\int_0^3 f(x)\,dx$ for $f(x)=\begin{cases}\sqrt{1-x^2}, & 0\le x\le1\\ 2, & 1<x\le2 \\ x-2, & 2<x\le3\end{cases}$.** Split into three pieces: $\frac{\pi}{4}$ (quarter circle) $+\ 2$ (rectangle) $+\ \frac12$ (triangle) $= \frac{\pi}{4}+\frac52.$

**Common mistakes:** Using symmetry (g)/(h) on an interval that is *not* symmetric about $0$; forgetting piecewise integrals require splitting at every discontinuity, not just evaluating one antiderivative across the break.

## 5.5 The Fundamental Theorem of Calculus

**Theorem 5 (Fundamental Theorem of Calculus).** Suppose $f$ is continuous on an interval $I$ containing $a$.

**Part I.** If $F(x) = \displaystyle\int_a^x f(t)\,dt$, then $F$ is differentiable on $I$ and
$$F'(x) = f(x), \qquad \text{i.e., } \frac{d}{dx}\int_a^x f(t)\,dt = f(x).$$

**Part II.** If $G$ is **any** antiderivative of $f$ on $I$ (i.e. $G'=f$), then for any $b\in I$,
$$\int_a^b f(x)\,dx = G(b)-G(a).$$

**Definition 6 (Evaluation symbol).** $\displaystyle F(x)\Big|_a^b = F(b)-F(a)$, so $\int_a^b f(x)\,dx = \left.\int f(x)\,dx\right|_a^b$ (the constant of integration cancels, so it's omitted).

**Generalized Leibniz-type formulas** (Chain Rule built into Part I):
$$\frac{d}{dx}\int_a^{g(x)} f(t)\,dt = f(g(x))\,g'(x), \qquad \frac{d}{dx}\int_{h(x)}^{g(x)} f(t)\,dt = f(g(x))g'(x) - f(h(x))h'(x).$$

**Worked Examples**

1. **Area under $y=3x-x^2$ above the $x$-axis.** Roots at $x=0,3$. $A = \int_0^3(3x-x^2)\,dx = \left[\frac32x^2-\frac13x^3\right]_0^3 = \frac{27}{2}-9=\frac92.$

2. **Find $F'(x)$ for $F(x)=x^2\int_{-4}^{5x} e^{t^2}\,dt$.** By Product Rule + Chain Rule: $F'(x) = 2x\int_{-4}^{5x}e^{t^2}\,dt + x^2 \cdot e^{25x^2}\cdot 5 = 2x\int_{-4}^{5x}e^{t^2}\,dt + 5x^2e^{25x^2}.$

3. **Solve the integral equation $f(x) = 2+3\int_4^x f(t)\,dt$.** Differentiate: $f'(x)=3f(x)$, so $f(x)=Ce^{3x}$. Put $x=4$ in the original equation: $f(4)=2$, so $C=2e^{-12}$, giving $f(x)=2e^{3x-12}$.

4. **Evaluate $\displaystyle\lim_{n\to\infty}\frac{1}{n}\sum_{j=1}^n \cos\left(\frac{j\pi}{2n}\right)$.** Recognize as $\frac{2}{\pi}\cdot\frac{\pi}{2n}\sum \cos(j\pi/2n)$, a Riemann sum for $\int_0^{\pi/2}\cos x\,dx = 1$, scaled by $2/\pi$: limit $=\dfrac{2}{\pi}$.

**Common mistakes:** Applying FTC to a discontinuous integrand (e.g. $\int_{-1}^1 dx/x$ is *not* $\ln|x|\big|_{-1}^1=0$ — it's not even integrable, since $1/x$ is unbounded near $0$); dropping the chain-rule factor $g'(x)$ when the upper limit is a function of $x$, not just $x$ itself; sign errors when the variable is in the *lower* limit (use property (b) to flip first).

## 5.6 The Method of Substitution

**Elementary integrals to memorize** (a full list, formulas 1–20 in the text) includes the power rule $\int x^r\,dx = \frac{x^{r+1}}{r+1}+C\ (r\ne-1)$, $\int \frac1x\,dx=\ln|x|+C$, $\int \sin(ax)\,dx = -\frac1a\cos(ax)+C$, $\int\frac{dx}{a^2+x^2}=\frac1a\tan^{-1}\frac{x}{a}+C$, $\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac{x}{a}+C$, $\int e^{ax}\,dx=\frac1ae^{ax}+C$, and the hyperbolic analogues.

**Substitution (u-substitution).** If $u=g(x)$, $du = g'(x)\,dx$, then
$$\int f'(g(x))\,g'(x)\,dx = \int f'(u)\,du = f(g(x))+C.$$

**Theorem 6 (Substitution in a definite integral).** If $g(a)=A$, $g(b)=B$, and $f$ is continuous on the range of $g$, then
$$\int_a^b f(g(x))\,g'(x)\,dx = \int_A^B f(u)\,du.$$
(Change the limits to $u$-values — **Method I** — or keep them as "$x=a$" to "$x=b$" and convert the antiderivative back to $x$ before substituting — **Method II**.)

**Integrals of tan, cot, sec, csc:**
$$\int \tan x\,dx = \ln|\sec x|+C, \qquad \int \cot x\,dx = \ln|\sin x|+C,$$
$$\int \sec x\,dx = \ln|\sec x+\tan x|+C, \qquad \int \csc x\,dx = -\ln|\csc x+\cot x|+C.$$

**Odd powers of sine/cosine:** if $n$ (the power of $\cos$) is odd, peel off one factor of $\cos x$ and use $\cos^2 x = 1-\sin^2 x$, substitute $u=\sin x$ (symmetric idea for odd powers of $\sin x$).

**Even powers of sine/cosine:** use $\cos^2 x = \tfrac12(1+\cos 2x)$, $\sin^2 x = \tfrac12(1-\cos2x)$. Worth memorizing:
$$\int \cos^2 x\,dx = \tfrac12(x+\sin x\cos x)+C, \qquad \int \sin^2 x\,dx = \tfrac12(x-\sin x\cos x)+C.$$

**Powers of sec/tan or csc/cot:** use $\sec^2x = 1+\tan^2x$ (or $\csc^2x=1+\cot^2x$) with $u=\tan x$ (or $u=\cot x$), unless the secant power is odd and the tangent power is even (that case needs integration by parts, Section 6.1).

**Worked Examples**

1. $\displaystyle\int \frac{x}{x^2+1}\,dx$: let $u=x^2+1$, $du=2x\,dx$; $=\tfrac12\ln(x^2+1)+C$.

2. $\displaystyle\int \frac{dx}{x^2+4x+5}$: complete the square, $x^2+4x+5=(x+2)^2+1$; let $t=x+2$; $=\tan^{-1}(x+2)+C$.

3. $\displaystyle\int \sin^3 x\cos^8 x\,dx$: rewrite as $\int(1-\cos^2x)\cos^8x\sin x\,dx$; $u=\cos x$: $= \frac{1}{11}\cos^{11}x-\frac19\cos^9x+C$.

4. $\displaystyle\int \sin^4 x\,dx$: use the double-angle formula twice: $= \frac38 x - \frac14\sin2x + \frac{1}{32}\sin4x + C$.

5. **Definite integral:** $\displaystyle I=\int_0^8 \frac{\cos\sqrt{x+1}}{\sqrt{x+1}}\,dx$: let $u=\sqrt{x+1}$, $du=\frac{dx}{2\sqrt{x+1}}$; limits $x=0\Rightarrow u=1$, $x=8\Rightarrow u=3$: $I = 2\int_1^3 \cos u\,du = 2\sin3-2\sin1.$

**Common mistakes:** Forgetting to change the limits of integration when substituting in a definite integral (or forgetting to convert back to $x$ if you don't change them — Theorem 6's two methods must not be mixed); dropping $+C$ on indefinite integrals; applying substitution when $g'(x)$ is not actually present as a factor (the substitution $u=g(x)$ only simplifies cleanly when $g'(x)\,dx$ is available); losing continuity requirements — substitution in a definite integral requires $f$ continuous on the *entire range* of $g$, not just at the endpoints (see the cautionary example with $x\csc(x^2)$ in the text).

## 5.7 Areas of Plane Regions

To get **total (unsigned) area** between $y=f(x)$ and the $x$-axis, integrate $|f(x)|$, splitting the interval at the zeros of $f$:
$$\int_a^b |f(x)|\,dx = A_1+A_2 \quad (\text{vs. } \int_a^b f(x)\,dx = A_1-A_2).$$

**Area between two curves** $y=f(x)$ (lower) and $y=g(x)$ (upper), $a\le x\le b$:
$$A = \int_a^b \big(g(x)-f(x)\big)\,dx.$$
More generally, if the curves cross, $\displaystyle A = \int_a^b |f(x)-g(x)|\,dx$, split at the crossing points.

**Horizontal area elements** (integrating in $y$): if $R$ lies between $x=f(y)$ (left) and $x=g(y)$ (right) for $c\le y\le d$,
$$A = \int_c^d \big(g(y)-f(y)\big)\,dy.$$

**Worked Examples**

1. **Area between $y=x^2-2x$ and $y=4-x^2$.** Solve $x^2-2x=4-x^2 \Rightarrow 2x^2-2x-4=0 \Rightarrow x=-1,2$. $A=\int_{-1}^2\big[(4-x^2)-(x^2-2x)\big]dx = \int_{-1}^2(4-2x^2+2x)\,dx = 9.$

2. **Total area between $y=\sin x$ and $y=\cos x$ on $[0,2\pi]$.** They cross at $x=\pi/4, 5\pi/4$. Split into three integrals and sum absolute contributions: $A = 4\sqrt2.$

3. **Region right of $x=y^2-12$ and left of $y=x$.** Solve $y^2-12=y\Rightarrow y=4,-3$. $A=\int_{-3}^4\big[y-(y^2-12)\big]\,dy = \frac{343}{6}.$

**Common mistakes:** Subtracting curves in the wrong order (getting a negative "area"); forgetting to split the integral at every intersection point when curves cross more than once; choosing to integrate in $x$ when integrating in $y$ is far simpler (or vice versa) — always sketch first.

## Chapter 5 Review Problems

1. Evaluate $\displaystyle\sum_{i=1}^n (3i-2)$.
2. Evaluate $\displaystyle\sum_{k=1}^{50}\left(\frac1k-\frac{1}{k+1}\right)$.
3. Express $\displaystyle\lim_{n\to\infty}\sum_{i=1}^n \frac1n\sqrt{1+\frac{i}{n}}$ as a definite integral, and identify the region whose area it represents.
4. Find the area under $y=x^2+1$ on $[0,a]$ using the limit-of-sums definition (equal subintervals).
5. Compute the lower and upper Riemann sums $L(f,P_4)$ and $U(f,P_4)$ for $f(x)=x^2$ on $[0,2]$ with $4$ equal subintervals.
6. Evaluate $\displaystyle\int_{-3}^3 \left(x^5 - 4x^3 + 2\right)dx$ using symmetry properties, without finding an antiderivative of every term.
7. Find the average value of $f(x) = \sqrt{9-x^2}$ on $[-3,3]$, interpreting the integral as an area.
8. Evaluate $\displaystyle\frac{d}{dx}\int_{x^2}^{5} \sin(t^3)\,dt$.
9. Evaluate $\displaystyle\int (\sec^2 3x - 4\csc 2x\cot 2x)\,dx$.
10. Evaluate $\displaystyle\int_0^{\pi/2} \sin^3 x\cos^2 x\,dx$.
11. Evaluate $\displaystyle\int \cos^4 x\,dx$.
12. Evaluate $\displaystyle\int_1^e \frac{(\ln x)^2}{x}\,dx$.
13. Find the area of the finite region bounded by $y=x^3-x$ and $y=0$ (both positive and negative pieces count as area).
14. A particle moves so that its velocity is $v(t) = 6t-t^2$ (m/s) for $0\le t\le 8$. Explain why $\displaystyle\int_0^8 |v(t)|\,dt$, rather than $\displaystyle\int_0^8 v(t)\,dt$, gives the total distance traveled, and compute it.
15. **Conceptual:** Explain why, if $f$ is continuous and *increasing* on $[a,b]$, the left-endpoint Riemann sum always underestimates $\int_a^b f(x)\,dx$ and the right-endpoint sum always overestimates it. What changes if $f$ is decreasing?

### Solutions

1. $\displaystyle\sum_{i=1}^n(3i-2) = 3\cdot\frac{n(n+1)}{2}-2n = \frac{3n^2+3n-4n}{2} = \frac{3n^2-n}{2} = \frac{n(3n-1)}{2}.$

2. Telescoping: $\displaystyle\sum_{k=1}^{50}\left(\frac1k-\frac1{k+1}\right) = 1-\frac{1}{51} = \frac{50}{51}.$

3. The factor $\frac1n$ and the argument $1+\frac{i}{n}$ signal an equal partition of $[0,1]$ shifted by $1$, i.e. of $[1,2]$ via $x=1+i/n$ (equivalently think of it directly as a partition of $[0,1]$ with $f(x)=\sqrt{1+x}$): $\displaystyle\lim_{n\to\infty}\sum_{i=1}^n\frac1n\sqrt{1+\frac in} = \int_0^1 \sqrt{1+x}\,dx.$ This is the area under $y=\sqrt{1+x}$ from $x=0$ to $x=1$.

4. With $x_i = ia/n$, $\Delta x=a/n$: $S_n = \sum_{i=1}^n\left[\left(\frac{ia}n\right)^2+1\right]\frac an = \frac{a^3}{n^3}\cdot\frac{n(n+1)(2n+1)}6 + a.$ As $n\to\infty$: $S_n\to \frac{a^3}{3}+a$. So the area is $\boxed{\dfrac{a^3}{3}+a}$ square units — matches $\int_0^a(x^2+1)\,dx = \frac{a^3}3+a$.

5. $\Delta x = 1/2$, subintervals $[0,\frac12],[\frac12,1],[1,\frac32],[\frac32,2]$. Since $x^2$ is increasing, $L$ uses left endpoints, $U$ uses right endpoints: $L = \frac12\left(0+\frac14+1+\frac94\right) = \frac12\cdot\frac72 = \frac74.$ $U = \frac12\left(\frac14+1+\frac94+4\right) = \frac12\cdot\frac{29}{4}=\frac{29}{8}.$ (True value $\int_0^2x^2dx = 8/3\approx2.667$, and indeed $\frac74=1.75\le 2.667\le 3.625=\frac{29}{8}$.)

6. $x^5-4x^3$ is odd, so $\int_{-3}^3(x^5-4x^3)dx=0$ by property (g). $\int_{-3}^3 2\,dx = 2\cdot6=12$ (rectangle). Total: $\boxed{12}$.

7. $\int_{-3}^3\sqrt{9-x^2}\,dx$ is the area of a semicircle of radius $3$: $=\frac12\pi(3)^2=\frac{9\pi}2$. Average value: $\bar f = \frac{1}{6}\cdot\frac{9\pi}2 = \frac{3\pi}{4}.$

8. By FTC Part I with the variable in the *lower* limit, first flip: $\int_{x^2}^5 \sin(t^3)dt = -\int_5^{x^2}\sin(t^3)dt$. Then $\frac{d}{dx}\left[-\int_5^{x^2}\sin(t^3)dt\right] = -\sin(x^6)\cdot 2x = -2x\sin(x^6).$

9. $\int\sec^2 3x\,dx = \frac13\tan3x+C_1$; $\int\csc2x\cot2x\,dx = -\frac12\csc2x+C_2$. So the integral is $\frac13\tan3x - 4\left(-\frac12\csc2x\right)+C = \frac13\tan3x+2\csc2x+C.$

10. Odd power of $\cos$: let $u=\sin x$, $\cos^2x=1-u^2$, $\cos x\,dx=du$: $\int_0^{\pi/2}\sin^3x(1-\sin^2x)\cos x\,dx = \int_0^1 u^3(1-u^2)\,du = \left[\frac{u^4}4-\frac{u^6}6\right]_0^1 = \frac14-\frac16=\frac{1}{12}.$

11. $\cos^4x = \left(\frac{1+\cos2x}2\right)^2 = \frac14(1+2\cos2x+\cos^22x) = \frac14 + \frac12\cos2x+\frac18(1+\cos4x)$. Integrating: $\int\cos^4x\,dx = \frac38x+\frac14\sin2x+\frac1{32}\sin4x+C.$

12. Let $u=\ln x$, $du=dx/x$; limits $x=1\Rightarrow u=0$, $x=e\Rightarrow u=1$: $\int_0^1 u^2\,du = \frac13.$

13. Roots of $x^3-x=x(x-1)(x+1)$ are $-1,0,1$. On $[-1,0]$, $x^3-x\ge0$; on $[0,1]$, $x^3-x\le0$. Total area $=\int_{-1}^0(x^3-x)\,dx + \int_0^1 -(x^3-x)\,dx$. By symmetry (the integrand is odd, and the two pieces are mirror images) each piece has the same magnitude: $\int_0^1(x-x^3)dx = \left[\frac{x^2}2-\frac{x^4}4\right]_0^1=\frac14$. Total area $= 2\cdot\frac14 = \boxed{\dfrac12}.$

14. $v(t)=6t-t^2 = t(6-t)$ is positive on $(0,6)$ and negative on $(6,8)$; the plain integral $\int_0^8v\,dt$ would let the backward motion on $[6,8]$ *cancel* forward distance, understating the odometer reading, so we need $|v(t)|$. $\int_0^6(6t-t^2)dt = \left[3t^2-\frac{t^3}3\right]_0^6 = 108-72=36.$ $\int_6^8 (t^2-6t)\,dt = \left[\frac{t^3}3-3t^2\right]_6^8 = \left(\frac{512}3-192\right)-(72-108) = \frac{512}3-192+36 = \frac{512}{3}-156 = \frac{512-468}{3}=\frac{44}{3}.$ Total distance $= 36+\frac{44}{3} = \frac{108+44}{3}=\frac{152}{3}$ m.

15. For increasing $f$, on each subinterval $[x_{i-1},x_i]$ the minimum value is $f(x_{i-1})$ (left endpoint) and the maximum is $f(x_i)$ (right endpoint). The left sum is therefore exactly the lower sum $L(f,P)$, and $L(f,P)\le \int_a^b f\,dx$ always (Section 5.3), so the left sum underestimates. Symmetrically the right sum equals $U(f,P)\ge \int_a^b f\,dx$, so it overestimates. If $f$ is decreasing, the roles reverse: the left endpoint gives the maximum on each subinterval (so the left sum is the *upper* sum and overestimates), and the right sum becomes the lower sum and underestimates.
