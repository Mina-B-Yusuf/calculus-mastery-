# Calculus 1 & 2 Formula Sheet

Quick reference only — see the chapter files for definitions, theorem statements, and worked examples.

## Limits

- $\displaystyle\lim_{x\to a}f(x)=L$ means $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close to (but not equal to) $a$.
- Squeeze Theorem: if $g(x)\le f(x)\le h(x)$ near $a$ and $\lim g=\lim h=L$, then $\lim f = L$.
- $\displaystyle\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1$, $\displaystyle\lim_{\theta\to0}\frac{1-\cos\theta}{\theta}=0$
- $f$ is continuous at $a$ iff $\displaystyle\lim_{x\to a}f(x)=f(a)$.
- **IVT**: $f$ continuous on $[a,b]$, $y_0$ between $f(a),f(b)$ $\Rightarrow$ some $c\in(a,b)$ has $f(c)=y_0$.

## Differentiation rules

$$(f\pm g)'=f'\pm g',\quad (cf)'=cf',\quad (fg)'=f'g+fg',\quad \left(\frac fg\right)'=\frac{f'g-fg'}{g^2}$$

$$(f\circ g)'(x)=f'(g(x))\,g'(x)\quad\text{(Chain Rule)}$$

| $f(x)$ | $f'(x)$ |
|---|---|
| $x^r$ | $rx^{r-1}$ |
| $e^x$ | $e^x$ |
| $a^x$ | $a^x\ln a$ |
| $\ln x$ | $1/x$ |
| $\log_a x$ | $1/(x\ln a)$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\csc x$ | $-\csc x\cot x$ |
| $\cot x$ | $-\csc^2x$ |
| $\sin^{-1}x$ | $1/\sqrt{1-x^2}$ |
| $\cos^{-1}x$ | $-1/\sqrt{1-x^2}$ |
| $\tan^{-1}x$ | $1/(1+x^2)$ |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\mathrm{sech}^2x$ |

**Mean Value Theorem**: $f$ continuous on $[a,b]$, differentiable on $(a,b)$ $\Rightarrow$ $f'(c)=\dfrac{f(b)-f(a)}{b-a}$ for some $c\in(a,b)$.

**l'Hôpital's Rule** ($0/0$ or $\infty/\infty$ only): $\displaystyle\lim\frac{f}{g}=\lim\frac{f'}{g'}$.

**Extrema**: critical points where $f'=0$ or undefined. First Derivative Test (sign change) or Second Derivative Test ($f''(c)>0\Rightarrow$ min, $f''(c)<0\Rightarrow$ max, $f''(c)=0$ inconclusive).

**Taylor's Formula**: $\displaystyle f(x)=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k+E_n(x)$, with Lagrange remainder $E_n(x)=\dfrac{f^{(n+1)}(s)}{(n+1)!}(x-a)^{n+1}$ for some $s$ between $a,x$.

## Integration

**FTC Part 1**: $\dfrac{d}{dx}\displaystyle\int_a^x f(t)\,dt = f(x)$.
**FTC Part 2**: $\displaystyle\int_a^b f(x)\,dx = F(b)-F(a)$ where $F'=f$.

| $\int f(x)\,dx$ | Result |
|---|---|
| $\int x^r\,dx\ (r\ne-1)$ | $\dfrac{x^{r+1}}{r+1}+C$ |
| $\int \frac1x\,dx$ | $\ln\lvert x\rvert+C$ |
| $\int e^x\,dx$ | $e^x+C$ |
| $\int \sin x\,dx$ | $-\cos x+C$ |
| $\int \cos x\,dx$ | $\sin x+C$ |
| $\int \sec^2x\,dx$ | $\tan x+C$ |
| $\int \sec x\tan x\,dx$ | $\sec x+C$ |
| $\int \frac1{1+x^2}\,dx$ | $\tan^{-1}x+C$ |
| $\int \frac1{\sqrt{1-x^2}}\,dx$ | $\sin^{-1}x+C$ |

**Substitution**: $\int f(g(x))g'(x)\,dx=\int f(u)\,du$, $u=g(x)$.
**Integration by parts**: $\displaystyle\int u\,dv = uv-\int v\,du$.
**Partial fractions**: distinct linear $\to \frac{A}{x-r}$; repeated linear $(x-r)^k\to \frac{A_1}{x-r}+\cdots+\frac{A_k}{(x-r)^k}$; irreducible quadratic $\to \frac{Ax+B}{x^2+px+q}$.

**Inverse-substitution triggers**: $\sqrt{a^2-x^2}\to x=a\sin\theta$; $\sqrt{a^2+x^2}\to x=a\tan\theta$; $\sqrt{x^2-a^2}\to x=a\sec\theta$.

**Improper integrals**: converge iff the limit of the proper integral (as the bound $\to\infty$ or approaches the singularity) exists finitely. $p$-test: $\int_1^\infty \frac{dx}{x^p}$ converges iff $p>1$; $\int_0^1\frac{dx}{x^p}$ converges iff $p<1$.

## Applications of integration

- Area between curves: $\displaystyle\int_a^b\big(\text{top}-\text{bottom}\big)\,dx$
- Disk/washer volume: $\displaystyle V=\int_a^b \pi\big(R(x)^2-r(x)^2\big)\,dx$
- Shell volume: $\displaystyle V=\int_a^b 2\pi\,(\text{radius})(\text{height})\,dx$
- Arc length: $\displaystyle L=\int_a^b\sqrt{1+\big(f'(x)\big)^2}\,dx$
- Surface area of revolution: $\displaystyle S=\int_a^b 2\pi\,(\text{radius})\sqrt{1+(f'(x))^2}\,dx$
- Work: $\displaystyle W=\int_a^b F(x)\,dx$; hydrostatic force: $\displaystyle F=\int \rho g\,(\text{depth})(\text{width})\,dy$

## Sequences, series, power series (Ch. 9 — heavily tested)

**Convergence test decision guide:**
1. Does the general term $\to0$? If not, **diverges** (Divergence Test). If yes, keep going — this alone never proves convergence.
2. Geometric $\sum ar^n$: converges iff $|r|<1$, sum $=\dfrac{a}{1-r}$.
3. $p$-series $\sum 1/n^p$: converges iff $p>1$.
4. Positive terms that look like a nice function to integrate $\to$ **Integral Test**.
5. Positive terms dominated/dominating a known series $\to$ **Comparison** or **Limit Comparison Test**.
6. Factorials, $n$th powers, or $r^n$ present $\to$ **Ratio Test** (inconclusive if limit $=1$).
7. $n$th powers dominate $\to$ **Root Test** (inconclusive if limit $=1$).
8. Alternating signs $\to$ **Alternating Series Test** (terms $\to0$ and eventually decreasing $\Rightarrow$ converges); then separately test $\sum|a_n|$ for absolute vs. conditional convergence.

**Power series**: $\sum c_n(x-a)^n$ converges on $(a-R,a+R)$ for some radius $R$ (found via Ratio/Root Test on the terms), diverges outside; **always check both endpoints separately**.

**Standard Maclaurin series** (all centered at $0$):

$$e^x=\sum_{n=0}^\infty \frac{x^n}{n!}\ (\text{all }x),\quad \sin x=\sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!}\ (\text{all }x),\quad \cos x=\sum_{n=0}^\infty \frac{(-1)^n x^{2n}}{(2n)!}\ (\text{all }x)$$

$$\frac1{1-x}=\sum_{n=0}^\infty x^n\ (|x|<1),\quad \ln(1+x)=\sum_{n=1}^\infty \frac{(-1)^{n+1}x^n}{n}\ (-1<x\le1),\quad (1+x)^k=\sum_{n=0}^\infty \binom kn x^n\ (|x|<1)$$

## Conics, parametric, polar (Ch. 8)

- Parabola $y^2=4px$; ellipse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ ($a>b$), $c^2=a^2-b^2$, foci $(\pm c,0)$, eccentricity $e=c/a<1$; hyperbola $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$, $c^2=a^2+b^2$, $e=c/a>1$.
- Parametric slope: $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$.
- Parametric arc length: $\displaystyle L=\int_\alpha^\beta \sqrt{(x'(t))^2+(y'(t))^2}\,dt$.
- Polar $\leftrightarrow$ Cartesian: $x=r\cos\theta,\ y=r\sin\theta,\ r^2=x^2+y^2$.
- Polar area: $\displaystyle A=\int_\alpha^\beta \tfrac12 r(\theta)^2\,d\theta$.
- Polar arc length: $\displaystyle L=\int_\alpha^\beta \sqrt{r^2+(r')^2}\,d\theta$.

## Trig identities (always useful)

$$\sin^2x+\cos^2x=1,\quad 1+\tan^2x=\sec^2x,\quad 1+\cot^2x=\csc^2x$$
$$\sin2x=2\sin x\cos x,\quad \cos2x=\cos^2x-\sin^2x=2\cos^2x-1=1-2\sin^2x$$
$$\sin(x\pm y)=\sin x\cos y\pm\cos x\sin y,\quad \cos(x\pm y)=\cos x\cos y\mp\sin x\sin y$$
