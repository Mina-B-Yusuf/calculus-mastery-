# Chapter 2: Differentiation

Differentiation is the computational heart of Calculus 1 — nearly every exam question either asks you to compute a derivative using the rules in this chapter or to apply a derivative (tangent lines, rates, optimization, motion), so fluency with the Product/Quotient/Chain Rules and the Mean-Value Theorem is essential.

## 2.1 Tangent Lines and Their Slopes

**Newton quotient (difference quotient)** for $f$ at $x_0$: $\dfrac{f(x_0+h)-f(x_0)}{h}$.

**Definition 1 (Nonvertical tangent lines).** If $f$ is continuous at $x_0$ and $\displaystyle\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}=m$ exists, the tangent line to $y=f(x)$ at $P=(x_0,f(x_0))$ has slope $m$ and equation
$$y = m(x-x_0)+y_0$$

**Definition 2 (Vertical tangents).** If $f$ is continuous at $x_0$ and the Newton quotient $\to+\infty$ or $\to-\infty$ as $h\to0$, then $x=x_0$ is a vertical tangent. If the limit fails to exist in any other way (e.g. different one-sided limits, or one side $\pm\infty$ and the other finite/different), there is **no tangent line** — the curve has a corner (like $|x|$) or a cusp (like $x^{2/3}$).

**Definition 3 (Slope of a curve).** The slope of $y=f(x)$ at $x_0$ is $\displaystyle\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}$, provided it exists (finite or infinite in the vertical-tangent sense).

**Normal line:** the line through $P$ perpendicular to the tangent. If tangent slope is $m\ne0$, normal slope is $-1/m$.

### Worked Examples

**Example 1.** Find the tangent to $y=x^2$ at $(1,1)$.
$m=\lim_{h\to0}\dfrac{(1+h)^2-1}{h}=\lim_{h\to0}(2+h)=2$. Tangent: $y=2(x-1)+1=2x-1$.

**Example 2.** Does $y=x^{1/3}$ have a tangent at $x=0$?
$\dfrac{h^{1/3}-0}{h}=\dfrac{1}{h^{2/3}}\to\infty$ as $h\to0$ (both sides). Vertical tangent: $x=0$.

**Example 3.** Does $y=x^{2/3}$ have a tangent at $x=0$?
$\dfrac{h^{2/3}}{h}=h^{-1/3}$: right limit $+\infty$, left limit $-\infty$. Neither $+\infty$ nor $-\infty$ uniformly — no tangent line (this is a cusp).

**Example 4.** Find the tangent and normal to $y=\sqrt x$ at $(4,2)$.
$m=\lim_{h\to0}\dfrac{\sqrt{4+h}-2}{h}=\lim_{h\to0}\dfrac{1}{\sqrt{4+h}+2}=\dfrac14$ (rationalize). Tangent: $y=\tfrac14(x-4)+2$. Normal slope $=-4$: $y=-4(x-4)+2=-4x+18$.

**Common mistakes:** assuming every continuous function has a tangent everywhere (corners and cusps are counterexamples); forgetting a vertical tangent is still a tangent line, just with undefined/infinite slope; sign errors when forming the normal's negative-reciprocal slope.

## 2.2 The Derivative

**Definition 4 (The derivative).**
$$f'(x) = \lim_{h\to0}\frac{f(x+h)-f(x)}{h}$$
wherever this limit exists (as a finite number); $f$ is then **differentiable** at $x$. Equivalently, $f'(x_0)=\displaystyle\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$.

A point where $f$ is defined and continuous but not differentiable (and not an endpoint) is a **singular point**.

**One-sided derivatives:** $f_+'(a)=\lim_{h\to0^+}\dfrac{f(a+h)-f(a)}{h}$, $f_-'(b)=\lim_{h\to0^-}\dfrac{f(b+h)-f(b)}{h}$. A function is differentiable on $[a,b]$ if differentiable on $(a,b)$ and has $f_+'(a)$, $f_-'(b)$.

**Table 1 — elementary derivatives to memorize:**

| $f(x)$ | $f'(x)$ |
|---|---|
| $c$ (constant) | $0$ |
| $x$ | $1$ |
| $x^2$ | $2x$ |
| $1/x$ | $-1/x^2$ ($x\ne0$) |
| $\sqrt x$ | $1/(2\sqrt x)$ ($x>0$) |
| $x^r$ | $rx^{r-1}$ (General Power Rule, wherever $x^{r-1}$ is real) |
| $\vert x\vert$ | $x/\vert x\vert = \operatorname{sgn} x$ |

**Leibniz notation:** $\dfrac{dy}{dx}=y'=\dfrac{d}{dx}f(x)=f'(x)$. Evaluation at a point: $\dfrac{dy}{dx}\Big|_{x=x_0}=f'(x_0)$.

**Differentials.** Treating $dx$ as an independent variable, define $dy = f'(x)\,dx$. This makes $dy/dx$ literally a quotient in a formal sense, useful in approximation (Section 2.7) and later in integration.

**Fact:** derivatives have the Intermediate-Value Property (even if $f'$ is discontinuous, it cannot "jump" over values the way a step function does).

### Worked Examples

**Example 1.** Show $f(x)=ax+b \Rightarrow f'(x)=a$.
$\dfrac{a(x+h)+b-(ax+b)}{h}=\dfrac{ah}{h}=a$.

**Example 2.** Compute $f'(x)$ for $f(x)=x^2$, $g(x)=1/x$, $k(x)=\sqrt x$ from the definition.
$f'(x)=\lim_{h\to0}\dfrac{2hx+h^2}{h}=2x$.
$g'(x)=\lim_{h\to0}\dfrac{-1}{(x+h)x}=-\dfrac1{x^2}$.
$k'(x)=\lim_{h\to0}\dfrac{1}{\sqrt{x+h}+\sqrt x}=\dfrac{1}{2\sqrt x}$ (rationalize numerator).

**Example 3.** Differentiate $f(x)=|x|$ using the definition.
For $x>0$: $f'(x)=1$. For $x<0$: $f'(x)=-1$. At $x=0$: Newton quotient is $\operatorname{sgn}(h)$, which has no limit. So $f'(x)=\operatorname{sgn} x$, undefined at $0$.

**Example 4.** Find $\dfrac{d}{dx}\left(\dfrac{x}{x^2+1}\right)\Big|_{x=2}$ directly from the definition (plug in $x=2$ before taking the limit).
$\lim_{h\to0}\dfrac{\frac{2+h}{(2+h)^2+1}-\frac25}{h} = -\dfrac{3}{25}$ (algebra as in the book's Example 5).

**Common mistakes:** confusing $\dfrac{d}{dx}f(x)$ (a function) with $\dfrac{d}{dx}f(x)\Big|_{x=x_0}$ (a number); forgetting singular points (e.g. $\sqrt x$ is not differentiable at the domain endpoint $x=0$); assuming differentiability just because a function is continuous — continuity is necessary but not sufficient.

## 2.3 Differentiation Rules

**Theorem 1 (Differentiability implies continuity).** If $f$ is differentiable at $x$, then $f$ is continuous at $x$. (Converse false: $|x|$ is continuous but not differentiable at $0$.)

**Theorem 2 (Sum, Difference, Constant Multiple Rules).** If $f,g$ differentiable at $x$, $C$ constant:
$$(f+g)'=f'+g' \qquad (f-g)'=f'-g' \qquad (Cf)'=Cf'$$

**Theorem 3 (The Product Rule).**
$$(fg)'(x) = f'(x)g(x)+f(x)g'(x)$$

**Theorem 4 (The Reciprocal Rule).** If $f(x)\ne0$:
$$\left(\frac1f\right)'(x) = -\frac{f'(x)}{(f(x))^2}$$

**Theorem 5 (The Quotient Rule).** If $g(x)\ne0$:
$$\left(\frac{f}{g}\right)'(x) = \frac{g(x)f'(x)-f(x)g'(x)}{(g(x))^2}$$
Mnemonic: $\dfrac{(\text{denom})(\text{num})' - (\text{num})(\text{denom})'}{(\text{denom})^2}$ — order matters (getting it backward flips the sign).

**General Power Rule for negative integers** follows from Reciprocal Rule: $\dfrac{d}{dx}x^{-n}=-nx^{-n-1}$.

### Worked Examples

**Example 1.** Differentiate $y=2x^3-5x^2+4x+7$.
$y' = 6x^2-10x+4$.

**Example 2.** Differentiate $(x^2+1)(x^3+4)$ using the Product Rule.
$\dfrac{d}{dx} = 2x(x^3+4)+(x^2+1)(3x^2) = 2x^4+8x+3x^4+3x^2 = 5x^4+3x^2+8x$.

**Example 3.** Differentiate $y=\dfrac{1-x^2}{1+x^2}$.
$y' = \dfrac{(1+x^2)(-2x)-(1-x^2)(2x)}{(1+x^2)^2} = \dfrac{-2x-2x^3-2x+2x^3}{(1+x^2)^2}=\dfrac{-4x}{(1+x^2)^2}$.

**Example 4.** Find any lines through $(-1,0)$ tangent to $y=\dfrac{x-1}{x+1}$.
Slope at $x=a$: $y'(a) = \dfrac{2}{(a+1)^2}$. Slope from $(-1,0)$ to $(a, \frac{a-1}{a+1})$: $\dfrac{a-1}{(a+1)^2}$. Setting equal: $a-1=2 \Rightarrow a=3$, slope $=2/16=1/8$. Tangent line: $y=\tfrac18(x+1)$.

**Common mistakes:** applying "derivative of product = product of derivatives" (false — must use Product Rule); reversing the numerator order in the Quotient Rule (flips sign); forgetting to simplify — messy Quotient Rule answers should usually be simplified for later use.

## 2.4 The Chain Rule

**Theorem 6 (The Chain Rule).** If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then $f\circ g$ is differentiable at $x$ and
$$(f\circ g)'(x) = f'(g(x))\cdot g'(x)$$
Leibniz form: if $y=f(u)$, $u=g(x)$, then
$$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$$

**Mental model:** "the derivative of $f$ of something is $f'$ of that thing, times the derivative of that thing." The outside function's derivative is evaluated *at the inside function*, then multiplied by the inside function's derivative.

**Chain Rule built into common formulas** (with $u=u(x)$ a differentiable function of $x$):
$$\frac{d}{dx}u^n = nu^{n-1}\frac{du}{dx} \qquad \frac{d}{dx}\frac1u = -\frac{1}{u^2}\frac{du}{dx} \qquad \frac{d}{dx}\sqrt u = \frac{1}{2\sqrt u}\frac{du}{dx} \qquad \frac{d}{dx}|u| = \operatorname{sgn}(u)\frac{du}{dx}$$

### Worked Examples

**Example 1.** Differentiate $y=(7x-3)^{10}$.
$y' = 10(7x-3)^9\cdot 7 = 70(7x-3)^9$.

**Example 2.** Differentiate $y=\sqrt{x^2+1}$.
$y' = \dfrac{1}{2\sqrt{x^2+1}}\cdot 2x = \dfrac{x}{\sqrt{x^2+1}}$.

**Example 3.** Differentiate $f(t)=|t^2-1|$.
$f'(t) = \operatorname{sgn}(t^2-1)\cdot 2t = \dfrac{2t(t^2-1)}{|t^2-1|}$, undefined at $t=\pm1$.

**Example 4.** If $f$ is a differentiable function, express $\dfrac{d}{dx}f(x^2)$ and $\dfrac{d}{dx}f(f(x))$ in terms of $f'$.
$\dfrac{d}{dx}f(x^2) = 2x f'(x^2)$. $\dfrac{d}{dx}f(f(x)) = f'(f(x))\cdot f'(x)$.

**Common mistakes:** forgetting to multiply by the derivative of the "inside" function entirely (the single most common calculus error); applying the Chain Rule when a Product or Quotient Rule step is actually needed first (many problems require combining rules); mis-differentiating nested compositions by stopping one layer too early (e.g. with $\left(\frac{3x+1}{(2x+1)^3}\right)^{1/4}$, forgetting the Chain Rule is needed again inside the quotient).

## 2.5 Derivatives of Trigonometric Functions

**Theorem 7.** $\sin\theta$ and $\cos\theta$ are continuous everywhere; in particular $\lim_{\theta\to0}\sin\theta=0$, $\lim_{\theta\to0}\cos\theta=1$.

**Theorem 8 (An important trigonometric limit).**
$$\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1 \qquad(\theta \text{ in radians})$$
Proved via the Squeeze Theorem, sandwiching the area of a circular sector between two triangle areas.

**Corollary (used to derive the sine/cosine derivatives):** $\displaystyle\lim_{h\to0}\frac{\cos h - 1}{h}=0$.

**Theorem 9.** $\dfrac{d}{dx}\sin x = \cos x$.

**Theorem 10.** $\dfrac{d}{dx}\cos x = -\sin x$.

**Derivatives of the other four trig functions** (derived via Quotient/Reciprocal Rule from sine and cosine):
$$\frac{d}{dx}\tan x = \sec^2x \qquad \frac{d}{dx}\cot x = -\csc^2x \qquad \frac{d}{dx}\sec x = \sec x\tan x \qquad \frac{d}{dx}\csc x = -\csc x\cot x$$
(The three "co-" functions have the minus sign.)

**Warning:** these formulas hold only when $x$ is measured in **radians**. In degrees, $\dfrac{d}{dx}\sin(x°) = \dfrac{\pi}{180}\cos(x°)$.

### Worked Examples

**Example 1.** Differentiate $y=\sin(\pi x)+\cos(3x)$.
$y' = \pi\cos(\pi x) - 3\sin(3x)$.

**Example 2.** Differentiate $y=x^2\sin\sqrt x$.
Product + Chain Rule: $y' = 2x\sin\sqrt x + x^2\cos\sqrt x \cdot \dfrac{1}{2\sqrt x} = 2x\sin\sqrt x + \dfrac12 x^{3/2}\cos\sqrt x$.

**Example 3.** Verify $\dfrac{d}{dx}\tan x=\sec^2x$ via the Quotient Rule.
$\dfrac{d}{dx}\dfrac{\sin x}{\cos x} = \dfrac{\cos x\cos x - \sin x(-\sin x)}{\cos^2 x} = \dfrac{\cos^2x+\sin^2x}{\cos^2x}=\dfrac{1}{\cos^2x}=\sec^2x$.

**Example 4.** Find the tangent to $y=\tan(x/4)$ at $x=1$... (illustrative pattern) — instead: find $\dfrac{d}{dx}[3x+\cot(x/2)]$.
$= 3 - \csc^2(x/2)\cdot\dfrac12 = 3 - \dfrac12\csc^2(x/2)$.

**Common mistakes:** forgetting the negative sign on the derivative of cosine, cotangent, and cosecant; differentiating as if $x$ were in degrees (the neat formulas require radians); forgetting the Chain Rule factor when the trig function's argument is not simply $x$.

## 2.6 Higher-Order Derivatives

**Notation.** Second derivative: $y'' = f''(x) = \dfrac{d^2y}{dx^2}$. In general, the $n$th derivative:
$$y^{(n)} = f^{(n)}(x) = \frac{d^ny}{dx^n}$$
(parenthesized superscript to distinguish from a power). By convention $f^{(0)}(x)=f(x)$.

**Physical meaning:** if $x=f(t)$ is position, velocity is $v=x'(t)$ and acceleration is $a = v'(t) = x''(t)$.

**Polynomials:** if $P$ has degree $n$, then $P^{(k)}=0$ for $k>n$, and $P^{(n)}(x)=n!\,a_n$ (constant), where $a_n$ is the leading coefficient.

### Worked Examples

**Example 1.** For $y=x^3$: $y'=3x^2$, $y''=6x$, $y'''=6$, $y^{(4)}=0$ (and all higher derivatives are 0).

**Example 2.** Show $y=A\cos(kt)+B\sin(kt)$ solves $y''+k^2y=0$.
$y' = -Ak\sin(kt)+Bk\cos(kt)$, $y''=-Ak^2\cos(kt)-Bk^2\sin(kt) = -k^2y$. So $y''+k^2y=0$. $\checkmark$

**Example 3.** Find a formula for $y^{(n)}$ if $y=\dfrac{1}{1+x}$.
$y'=-(1+x)^{-2}$, $y''=2(1+x)^{-3}$, $y'''=-6(1+x)^{-4}$... Pattern (proved by induction): $y^{(n)} = (-1)^n n!\,(1+x)^{-n-1}$.

**Example 4.** Find $f''(x)$ for $f(x)=\sqrt{x^2+1}$.
$f'(x)=x(x^2+1)^{-1/2}$. $f''(x) = (x^2+1)^{-1/2} + x\left(-\tfrac12\right)(x^2+1)^{-3/2}(2x) = (x^2+1)^{-3/2}\left[(x^2+1)-x^2\right] = (x^2+1)^{-3/2}$.

**Common mistakes:** treating $f^{(2)}(x)$ as "$f$ squared" instead of the second derivative; losing track of accumulating Chain Rule / Product Rule factors when differentiating repeatedly (write out each step); assuming a clean pattern exists for $f^{(n)}$ without verifying by induction — not every function's higher derivatives follow an obvious pattern (see $\sqrt{x^2+1}$).

## 2.7 Using Differentials and Derivatives

**Linear approximation.** For small $\Delta x = dx$:
$$\Delta y \approx dy = f'(x)\,dx$$

**Relative and percentage change.** Relative change in $x$: $dx/x$. Percentage change: $100\,dx/x$. If $y=f(x)$, then $\dfrac{\Delta y}{y}\approx\dfrac{dy}{y}=\dfrac{f'(x)\,dx}{f(x)}$.

**Definition 5 (Average and instantaneous rate of change).** Average rate of $f$ over $[a,a+h]$: $\dfrac{f(a+h)-f(a)}{h}$. Instantaneous rate at $a$: $f'(a)$.

**Critical point:** if $f'(x_0)=0$, $x_0$ is called a **critical point** (stationary point) of $f$; the graph has a horizontal tangent there.

**Marginal quantities (economics).** Marginal cost $=dC/dx$; approximately the extra cost of one more unit. **Elasticity of demand:** $-\dfrac{p}{y}\dfrac{dy}{dp}$ (dimensionless, sign-adjusted to be positive since demand typically decreases with price).

### Worked Examples

**Example 1.** Estimate $\sin(\pi/3+0.006)$ using differentials.
$dy = \cos(\pi/3)\,dx = \tfrac12(0.006)=0.003$. So $\sin(\pi/3+0.006)\approx \tfrac{\sqrt3}{2}+0.003\approx 0.869$.

**Example 2.** By approximately what percentage does the area of a circle increase if the radius increases by 2%?
$A=\pi r^2$, $\dfrac{dA}{A}=\dfrac{2\pi r\,dr}{\pi r^2}=\dfrac{2\,dr}{r}$. If $dr/r=0.02$, then $dA/A\approx0.04$, i.e. a $4\%$ increase.

**Example 3.** A ball's temperature model $T=\tfrac13t^3-3t^2+8t+10$ for $0\le t\le5$ (hours after noon). How fast is $T$ changing at $t=1$? When is $T$ stationary?
$T' = t^2-6t+8=(t-2)(t-4)$. At $t=1$: $T'(1)=3$ (rising $3°$C/h). Stationary when $T'=0$: $t=2,4$.

**Example 4.** The cost of producing $x$ refrigerators is $C(x) = 8000+400x-0.5x^2$. Find the marginal cost at $x=100$.
$C'(x)=400-x$. $C'(100)=300$ dollars/unit.

**Common mistakes:** confusing "percentage change in $x$" ($100\,dx/x$) with "change in $x$" ($dx$); using $\Delta y$ and $dy$ interchangeably when the problem specifically asks for the linear *approximation* $dy$ versus the exact change $\Delta y$ (they generally differ); forgetting units when reporting a rate of change (always "units of output per unit of input").

## 2.8 The Mean-Value Theorem

**Theorem 11 (The Mean-Value Theorem, MVT).** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists $c\in(a,b)$ such that
$$f'(c) = \frac{f(b)-f(a)}{b-a}$$
(the tangent at $c$ is parallel to the chord from $(a,f(a))$ to $(b,f(b))$). This is an **existence theorem** — it doesn't say how to find $c$, and both hypotheses (continuity on the closed interval, differentiability on the open interval) are necessary.

**Theorem 14.** If $f$ has a local max or min at interior point $c$ and $f'(c)$ exists, then $f'(c)=0$ (a **critical point**).

**Theorem 15 (Rolle's Theorem).** If $f$ continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there exists $c\in(a,b)$ with $f'(c)=0$. (Special case of MVT with a horizontal chord.)

**Theorem 16 (Generalized Mean-Value Theorem).** If $f,g$ continuous on $[a,b]$, differentiable on $(a,b)$, and $g'(x)\ne0$ on $(a,b)$, then there exists $c\in(a,b)$ with
$$\frac{f(b)-f(a)}{g(b)-g(a)} = \frac{f'(c)}{g'(c)}$$

**Theorem 13.** If $f$ is continuous on interval $I$ and $f'(x)=0$ at every interior point of $I$, then $f$ is constant on $I$. (Consequence of MVT — the theoretical basis for "antiderivatives differ by a constant," Section 2.10.)

**Definition 6 / Theorem 12 (Increasing/decreasing test).** $f$ increasing (resp. decreasing) on $I$ if $f'(x)>0$ (resp. $<0$) on the interior; nondecreasing/nonincreasing if $f'(x)\ge0$ (resp. $\le0$).

### Worked Examples

**Example 1.** Verify MVT for $f(x)=\sqrt x$ on $[a,b]$, $0\le a<b$.
$f'(c)=\dfrac{1}{2\sqrt c}$ must equal $\dfrac{\sqrt b-\sqrt a}{b-a}=\dfrac{1}{\sqrt a+\sqrt b}$. Solving: $c=\left(\dfrac{\sqrt a+\sqrt b}{2}\right)^2$, which lies strictly between $a$ and $b$. $\checkmark$

**Example 2.** Show $\sin x < x$ for all $x>0$.
For $x>2$: $\sin x\le1<2<x$. For $0<x\le2$: by MVT on $[0,x]$, $\dfrac{\sin x - \sin0}{x-0}=\cos c<1$ for some $c\in(0,x)$ (since $\cos c<1$ unless $c=0$). So $\sin x<x$.

**Example 3.** Find intervals of increase/decrease for $f(x)=x^3-12x+1$.
$f'(x)=3x^2-12=3(x-2)(x+2)$. Positive outside $[-2,2]$, negative inside. So $f$ increasing on $(-\infty,-2)$ and $(2,\infty)$, decreasing on $(-2,2)$.

**Example 4.** Show $\sqrt{1+x}<1+\tfrac{x}{2}$ for $x>0$.
Apply MVT to $f(x)=\sqrt{1+x}$ on $[0,x]$: $\dfrac{\sqrt{1+x}-1}{x}=\dfrac{1}{2\sqrt{1+c}}<\dfrac12$ for some $c\in(0,x)$ since $c>0$. Multiply by $x>0$ and add 1: $\sqrt{1+x}<1+x/2$.

**Common mistakes:** invoking MVT/Rolle's Theorem when continuity fails at an endpoint or differentiability fails somewhere in the open interval (conclusion can then fail — check hypotheses first); thinking MVT gives a unique $c$ (there can be several); confusing "nondecreasing" ($f'\ge0$, can have flat spots) with "increasing" ($f'>0$ typically, strictly greater values).

## 2.9 Implicit Differentiation

When an equation $F(x,y)=0$ cannot easily be solved for $y$ explicitly, differentiate both sides with respect to $x$, treating $y$ as a differentiable function of $x$ and applying the Chain Rule to every term involving $y$ (e.g. $\dfrac{d}{dx}y^2 = 2y\dfrac{dy}{dx}$), then solve algebraically for $dy/dx$.

**Strategy:**
1. Differentiate both sides of the equation with respect to $x$.
2. Collect all terms containing $dy/dx$ on one side.
3. Factor out $dy/dx$ and divide.
4. To evaluate at a specific point, substitute the point's coordinates as early as convenient (ideally right after differentiating, before solving algebraically).

**Caution:** implicit differentiation presumes the equation actually defines $y$ as a differentiable function of $x$ near the point in question; it can produce a "derivative" formula even when no real curve/point exists, so the result should be interpreted carefully.

**Application:** implicit differentiation extends the General Power Rule to all rational exponents $r=m/n$: if $y=x^{m/n}$, then $y^n=x^m$, differentiate implicitly to get $\dfrac{dy}{dx}=\dfrac{m}{n}x^{(m/n)-1}$.

### Worked Examples

**Example 1.** Find $dy/dx$ if $x^2+y^2=25$.
$2x+2y\dfrac{dy}{dx}=0 \Rightarrow \dfrac{dy}{dx}=-\dfrac{x}{y}$.

**Example 2.** Find the slope of $x^2+y^2=25$ at $(3,-4)$.
$\dfrac{dy}{dx}=-\dfrac{x}{y}=-\dfrac{3}{-4}=\dfrac34$.

**Example 3.** Find $dy/dx$ if $y\sin x = x^3+\cos y$.
Product Rule on left, Chain Rule on right: $(\cos x)y+(\sin x)y' = 3x^2 - (\sin y)y'$. Collect: $y'(\sin x+\sin y) = 3x^2-y\cos x$, so $y' = \dfrac{3x^2-y\cos x}{\sin x+\sin y}$.

**Example 4.** Find the tangent to $x^2+xy+2y^3=4$ at $(-2,1)$.
Differentiate: $2x+y+xy'+6y^2y'=0$. Substitute $x=-2,y=1$: $-4+1-2y'+6y'=0 \Rightarrow 4y'=3 \Rightarrow y'=3/4$. Tangent: $y=\tfrac34(x+2)+1$, i.e. $3x-4y=-10$.

**Common mistakes:** forgetting the Chain Rule factor $dy/dx$ every time $y$ (not $x$) is differentiated (e.g. writing $\frac{d}{dx}y^2=2y$ instead of $2y\,y'$); trying to solve for $y$ explicitly first when it's unnecessary or impossible; substituting the point's coordinates too early, before finishing the differentiation (differentiate the general equation first, then substitute).

## 2.10 Antiderivatives and Initial-Value Problems

**Definition 7 (Antiderivative).** $F$ is an antiderivative of $f$ on interval $I$ if $F'(x)=f(x)$ for all $x\in I$.

**Uniqueness up to a constant:** if $F,G$ are both antiderivatives of $f$ on interval $I$, then $G(x)=F(x)+C$ for some constant $C$ (Theorem 13, Section 2.8). This requires $I$ to be an interval — false on unions of disjoint intervals (e.g. $\operatorname{sgn} x$ has derivative $0$ off the origin but is not globally constant).

**Definition 8 (Indefinite integral).**
$$\int f(x)\,dx = F(x)+C \quad \text{on } I, \text{ where } F'(x)=f(x)$$

**Basic antiderivative formulas** (each the reverse of a known derivative):
$$\int x^r\,dx = \frac{x^{r+1}}{r+1}+C\ (r\ne-1) \qquad \int \sin x\,dx = -\cos x+C \qquad \int \cos x\,dx = \sin x+C$$
$$\int \sec^2x\,dx=\tan x+C \qquad \int \csc^2x\,dx=-\cot x+C \qquad \int \sec x\tan x\,dx=\sec x+C \qquad \int \csc x\cot x\,dx=-\csc x+C$$

**Differential equation (DE):** an equation involving derivatives of an unknown function. Its **order** is the order of the highest derivative present. A **general solution** contains arbitrary constants (as many as the order); an **initial-value problem (IVP)** specifies enough initial data (value of $y$ and enough derivatives at one point) to pin down the constants uniquely, giving a **particular solution**.

### Worked Examples

**Example 1.** Solve the IVP $f'(x)=6x^2-1$, $f(2)=10$.
$f(x) = 2x^3-x+C$. $10=f(2)=16-2+C \Rightarrow C=-4$. $f(x)=2x^3-x-4$.

**Example 2.** Solve $y'=\dfrac{t+5}{t^{3/2}}$, $y(4)=1$.
$y = \int (t^{-1/2}+5t^{-3/2})\,dt = 2t^{1/2}-10t^{-1/2}+C$. $1=2(2)-10(1/2)+C = 4-5+C \Rightarrow C=2$. $y=2\sqrt t - \dfrac{10}{\sqrt t}+2$.

**Example 3.** Solve the second-order IVP $y''=\sin x$, $y(\pi)=2$, $y'(\pi)=-1$.
$y'=-\cos x+C_1$; $-1=-\cos\pi+C_1=1+C_1 \Rightarrow C_1=-2$, so $y'=-\cos x-2$.
$y = -\sin x-2x+C_2$; $2=-\sin\pi-2\pi+C_2=-2\pi+C_2 \Rightarrow C_2=2+2\pi$.
$y = 2+2\pi-\sin x-2x$.

**Example 4.** Solve $y'=\dfrac{3+2x^2}{x^2}$, $y(-2)=1$. On what interval is the solution valid?
$y=\int(3x^{-2}+2)\,dx = -\dfrac3x+2x+C$. $1=\dfrac32-4+C \Rightarrow C=\dfrac72$. $y=-\dfrac3x+2x+\dfrac72$, valid on $(-\infty,0)$ (the largest interval containing $x=-2$ but excluding the singularity at $x=0$).

**Common mistakes:** forgetting the "$+C$" (or, for a second-order IVP, forgetting a *second* constant); applying an initial condition to the wrong constant (apply $y(a)$ data only after both integrations, or track $C_1$ from the first integration before finding $C_2$); giving a solution's domain as "all reals except where undefined" instead of the specific interval containing the initial point.

## 2.11 Velocity and Acceleration

**Velocity:** $v(t) = \dfrac{dx}{dt} = x'(t)$ (position's rate of change; signed — indicates direction).

**Speed:** $s(t) = |v(t)|$ (unsigned magnitude only).

**Acceleration:** $a(t) = v'(t) = x''(t)$ (second derivative of position).

**Speeding up vs. slowing down:** object speeds up when velocity and acceleration have the **same sign**; slows down when they have **opposite signs**.

| velocity | acceleration | motion | speed |
|---|---|---|---|
| + | + | right | increasing |
| + | − | right | decreasing |
| − | + | left | decreasing |
| − | − | left | increasing |

**Free fall near Earth's surface:** $y''(t) = -g$ where $g\approx9.8$ m/s² ($32$ ft/s²). Given initial height $y_0$ and initial velocity $v_0$:
$$y(t) = -\frac12 gt^2 + v_0t + y_0$$

### Worked Examples

**Example 1.** A point moves so $x(t)=2t^3-15t^2+24t$ ft. Find velocity and acceleration; determine motion at $t=2$.
$v=6t^2-30t+24=6(t-1)(t-4)$; $a=12t-30$. At $t=2$: $v=6(1)(-2)=-12$ (moving left), $a=12(2)-30=-6$. Same sign (both negative) $\Rightarrow$ speeding up, moving left at 12 ft/s.

**Example 2.** An object is thrown upward from a 10 m building with $y=-4.9t^2+8t+10$. Find max height and impact speed.
$v(t)=-9.8t+8=0 \Rightarrow t=8/9.8\approx0.816$ s. $y_{\max}=-4.9(0.816)^2+8(0.816)+10\approx13.27$ m. Ground: $y=0 \Rightarrow t=\dfrac{-8-\sqrt{64+196}}{-9.8}\approx2.462$ s; $v(2.462)\approx-16.12$ m/s, so impact speed $\approx16.12$ m/s.

**Example 3.** A car at 72 km/h (=20 m/s) decelerates at constant $0.8$ m/s². Find stopping distance.
$s''=-0.8$, $s'(t)=20-0.8t$, $s(t)=20t-0.4t^2$. Stops when $s'=0$: $t=25$ s. $s(25)=20(25)-0.4(625)=500-250=250$ m.

**Example 4.** A ball is thrown down at 20 ft/s from a cliff and hits the ground after 5 s. How high is the cliff?
$y(t)=-16t^2-20t+y_0$ (using $g=32$ ft/s², so $\tfrac12g=16$). $y(5)=0$: $0=-16(25)-20(5)+y_0=-400-100+y_0 \Rightarrow y_0=500$ ft.

**Common mistakes:** confusing velocity (signed) with speed (unsigned) — "how fast" questions about direction need velocity, "how fast" about magnitude alone need speed; using the wrong sign convention for $g$ (it's $-g$ if "up" is positive $y$); forgetting that "speeding up" depends on the *relationship* between the signs of $v$ and $a$, not on the sign of $a$ alone.

## Chapter 2 Review Problems

1. Use the definition of the derivative to find $f'(x)$ for $f(x)=x^2-3x$.
2. Differentiate $y = 4x^3 - \dfrac{2}{x^2}+ 5\sqrt x$.
3. Differentiate $y=(x^2+1)(3x-5)$ two ways: using the Product Rule, and by expanding first. Confirm the answers agree.
4. Differentiate $y=\dfrac{2x-1}{x^2+3}$.
5. Differentiate $y=\sqrt{4-3x^2}$.
6. Differentiate $y=\sin(x^2)\cos(3x)$.
7. Differentiate $y=\left(\dfrac{2x+1}{x-1}\right)^4$.
8. Find $y''$ if $y=x^4-3x^2+1$.
9. Find $dy/dx$ implicitly if $x^3+y^3=6xy$.
10. **Explain why:** the Mean-Value Theorem cannot be applied to $f(x)=|x|$ on $[-1,2]$ to conclude anything about a point $c$ where $f'(c)=\dfrac{f(2)-f(-1)}{2-(-1)}$. Does such a $c$ happen to exist anyway?
11. Find the general antiderivative $\displaystyle\int (3x^2-\sec^2x+ \tfrac{1}{\sqrt x})\,dx$.
12. Solve the IVP: $y'=6x^2-4$, $y(1)=5$.
13. A particle moves so that $x(t)=t^3-6t^2+9t$ (m, $t$ in seconds, $t\ge0$). Find when it is moving right/left and when it is speeding up/slowing down.
14. Find all points on $y=x^3-3x$ where the tangent line is horizontal, and classify (using the sign of $y'$ on either side) whether each is a peak, valley, or neither.
15. **Explain why:** if $f'(x)>0$ for all $x$ in an interval $I$, then $f$ has at most one root in $I$. (Use the Mean-Value Theorem or Theorem 12.)

### Solutions

**1.** $f'(x)=\lim_{h\to0}\dfrac{(x+h)^2-3(x+h)-(x^2-3x)}{h} = \lim_{h\to0}\dfrac{2xh+h^2-3h}{h}=\lim_{h\to0}(2x+h-3)=2x-3$.

**2.** $y' = 12x^2 + \dfrac{4}{x^3} + \dfrac{5}{2\sqrt x}$. (Since $\frac{d}{dx}(-2x^{-2})=4x^{-3}$ and $\frac{d}{dx}(5x^{1/2})=\frac52 x^{-1/2}$.)

**3.** Product Rule: $y' = 2x(3x-5)+(x^2+1)(3) = 6x^2-10x+3x^2+3=9x^2-10x+3$.
Expanding first: $y=3x^3-5x^2+3x-5$, so $y'=9x^2-10x+3$. Matches. $\checkmark$

**4.** $y' = \dfrac{(x^2+3)(2)-(2x-1)(2x)}{(x^2+3)^2} = \dfrac{2x^2+6-4x^2+2x}{(x^2+3)^2}=\dfrac{-2x^2+2x+6}{(x^2+3)^2}$.

**5.** $y=(4-3x^2)^{1/2}$; $y' = \dfrac12(4-3x^2)^{-1/2}(-6x) = \dfrac{-3x}{\sqrt{4-3x^2}}$.

**6.** Product + Chain Rule: $y' = 2x\cos(x^2)\cos(3x) + \sin(x^2)\cdot(-3\sin(3x)) = 2x\cos(x^2)\cos(3x)-3\sin(x^2)\sin(3x)$.

**7.** $y' = 4\left(\dfrac{2x+1}{x-1}\right)^3\cdot \dfrac{d}{dx}\left(\dfrac{2x+1}{x-1}\right)$. Inner derivative: $\dfrac{2(x-1)-(2x+1)(1)}{(x-1)^2}=\dfrac{2x-2-2x-1}{(x-1)^2}=\dfrac{-3}{(x-1)^2}$. So $y' = 4\left(\dfrac{2x+1}{x-1}\right)^3\cdot\dfrac{-3}{(x-1)^2} = \dfrac{-12(2x+1)^3}{(x-1)^5}$.

**8.** $y'=4x^3-6x$; $y''=12x^2-6$.

**9.** Differentiate implicitly: $3x^2+3y^2y' = 6y+6xy'$. Collect: $y'(3y^2-6x)=6y-3x^2$. So $y' = \dfrac{6y-3x^2}{3y^2-6x}=\dfrac{2y-x^2}{y^2-2x}$.

**10.** $f(x)=|x|$ is not differentiable at $x=0$, which lies in the open interval $(-1,2)$ — the MVT's hypothesis (differentiable on the open interval) fails, so the theorem's conclusion is not guaranteed. However, checking directly: $\dfrac{f(2)-f(-1)}{2-(-1)}=\dfrac{2-1}{3}=\dfrac13$. On $(0,2)$, $f'(x)=1\ne\frac13$; on $(-1,0)$, $f'(x)=-1\ne\frac13$; and $f'(0)$ doesn't exist. So in fact **no** such $c$ exists — the theorem's conclusion genuinely fails here, illustrating why the hypothesis matters.

**11.** $\displaystyle\int (3x^2-\sec^2x+x^{-1/2})\,dx = x^3 - \tan x + 2\sqrt x + C$.

**12.** $y = 2x^3-4x+C$. $5=2-4+C \Rightarrow C=7$. $y=2x^3-4x+7$.

**13.** $v(t)=x'(t)=3t^2-12t+9=3(t-1)(t-3)$; $a(t)=x''(t)=6t-12=6(t-2)$.
$v>0$ (moving right) on $[0,1)\cup(3,\infty)$; $v<0$ (moving left) on $(1,3)$.
$a<0$ for $t<2$, $a>0$ for $t>2$.
Speeding up (same sign): on $(0,1)$ [$v>0,a<0$: actually opposite signs — slowing down]. Let's tabulate: $(0,1)$: $v>0,a<0$ → slowing down. $(1,2)$: $v<0,a<0$ → speeding up. $(2,3)$: $v<0,a>0$ → slowing down. $(3,\infty)$: $v>0,a>0$ → speeding up.

**14.** $y'=3x^2-3=3(x-1)(x+1)=0$ at $x=\pm1$. At $x=1$: $y=1-3=-2$, point $(1,-2)$; $y'$ goes from negative (on $(-1,1)$) to positive (on $(1,\infty)$) — a **valley** (local min). At $x=-1$: $y=-1+3=2$, point $(-1,2)$; $y'$ goes from positive (on $(-\infty,-1)$) to negative (on $(-1,1)$) — a **peak** (local max).

**15.** By Theorem 12, since $f'(x)>0$ throughout $I$, $f$ is (strictly) increasing on $I$: for any $x_1<x_2$ in $I$, $f(x_1)<f(x_2)$. If $f$ had two distinct roots $r_1<r_2$ in $I$, we'd need $f(r_1)=f(r_2)=0$, contradicting strict increase (which forces $f(r_1)<f(r_2)$, i.e. $0<0$, impossible). Hence $f$ has at most one root in $I$. $\blacksquare$
