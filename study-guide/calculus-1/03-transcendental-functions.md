# Chapter 3: Transcendental Functions

Transcendental functions — exponentials, logarithms, inverse trig, and hyperbolic functions — are the functions that make calculus useful for modeling growth, decay, oscillation, and periodic motion; expect this chapter to be tested both on mechanical differentiation/integration skills and on "set up and solve" word problems (growth/decay, harmonic motion).

## 3.1 Inverse Functions

**Definition 1 (one-to-one).** $f$ is **one-to-one** if $x_1 \ne x_2$ in the domain implies $f(x_1) \ne f(x_2)$, equivalently $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$. Geometrically: every horizontal line meets the graph at most once. Any function that is increasing (or decreasing) on an interval is automatically one-to-one there.

**Definition 2 (inverse function).** If $f$ is one-to-one, its inverse $f^{-1}$ is defined by
$$y = f^{-1}(x) \iff x = f(y).$$

**Definition 3 (self-inverse).** $f$ is self-inverse if $f^{-1} = f$, e.g. $f(x) = 1/x$.

**Properties of inverse functions** (boxed — memorize):
- $y = f^{-1}(x) \iff x = f(y)$
- domain of $f^{-1}$ = range of $f$; range of $f^{-1}$ = domain of $f$
- $f^{-1}(f(x)) = x$ for all $x$ in domain of $f$
- $f(f^{-1}(x)) = x$ for all $x$ in domain of $f^{-1}$
- $(f^{-1})^{-1} = f$
- the graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y=x$

**Do not confuse $f^{-1}(x)$ with $1/f(x)$.** The reciprocal is written $[f(x)]^{-1}$ or $1/f(x)$.

**Inverting non-one-to-one functions.** If $f$ is not one-to-one on its natural domain (e.g. $f(x)=x^2$), restrict the domain (e.g. to $x\ge 0$) to get a one-to-one function, then invert that restriction. This is exactly the strategy used to build the inverse trig functions in Section 3.5.

**Derivative of an inverse function.** If $f$ is differentiable and monotonic on $(a,b)$ with $f'(x) \ne 0$, then
$$\boxed{\dfrac{d}{dx}f^{-1}(x) = \dfrac{1}{f'\big(f^{-1}(x)\big)}}$$
obtained by differentiating $f(f^{-1}(x)) = x$ with the Chain Rule.

**Example 1.** Show $f(x) = 2x-1$ is one-to-one and find $f^{-1}$.
*Solution.* $f'(x) = 2 > 0$ everywhere, so $f$ is increasing, hence one-to-one. Let $y=f^{-1}(x)$; then $x = 2y-1 \Rightarrow y = \dfrac{x+1}{2}$. So $f^{-1}(x) = \dfrac{x+1}{2}$.

**Example 2.** Show $g(x) = \sqrt{2x+1}$ is invertible and find $g^{-1}$.
*Solution.* $g$ is increasing on its domain $x \ge -1/2$ (or check: $g(x_1)=g(x_2)\Rightarrow x_1=x_2$ after squaring), so it's one-to-one. Let $x = \sqrt{2y+1}$, so $x \ge 0$ and $x^2 = 2y+1$, giving $g^{-1}(x) = \dfrac{x^2-1}{2}$ for $x \ge 0$.

**Example 3.** Let $f(x) = x^3+x$. Since $f(2)=10$, find $(f^{-1})'(10)$.
*Solution.* $f'(x) = 3x^2+1 > 0$ everywhere, so $f$ is one-to-one and invertible. $f^{-1}(10) = 2$ since $f(2)=10$. Then
$$(f^{-1})'(10) = \frac{1}{f'(f^{-1}(10))} = \frac{1}{f'(2)} = \frac{1}{3(4)+1} = \frac{1}{13}.$$

**Example 4.** If $f(x) = x^2$ for $x \ge 0$, find $f^{-1}$ and verify $(f^{-1})'(4)$ two ways.
*Solution.* $f^{-1}(x) = \sqrt{x}$, so $(f^{-1})'(x) = \dfrac{1}{2\sqrt{x}}$, giving $(f^{-1})'(4) = 1/4$. Check via the formula: $f^{-1}(4)=2$, $f'(2)=4$, so $1/f'(2) = 1/4$. ✓

**Common mistakes:** (1) Writing $f^{-1}(x)$ and meaning $1/f(x)$. (2) Forgetting that inverting requires restricting the domain first if $f$ isn't already one-to-one; failing to state the restricted domain/range. (3) Plugging $x$ instead of $f^{-1}(x)$ into $f'$ in the inverse-derivative formula.

## 3.2 Exponential and Logarithmic Functions

**Definition 4 (exponentials for rational exponents).** For $a>0$: $a^0=1$; $a^n = a\cdot a\cdots a$ ($n$ factors); $a^{-n} = 1/a^n$; $a^{m/n} = \sqrt[n]{a^m}$.

**Laws of exponents** (for $a,b>0$, $x,y \in \mathbb{R}$):
$$a^0=1,\quad a^{x+y}=a^xa^y,\quad a^{-x}=\frac1{a^x},\quad a^{x-y}=\frac{a^x}{a^y},\quad (a^x)^y=a^{xy},\quad (ab)^x=a^xb^x.$$

For $a>1$, $a^x$ is increasing; for $0<a<1$, $a^x$ is decreasing; all graphs pass through $(0,1)$.

**Definition 5 (logarithm to base $a$).** For $a>0,a\ne 1$: $y = \log_a x \iff x = a^y$. Domain of $\log_a$ is $(0,\infty)$; range is $\mathbb{R}$. Cancellation identities: $\log_a(a^x)=x$, $a^{\log_a x}=x$.

**Laws of logarithms:**
$$\log_a 1 = 0,\quad \log_a(xy)=\log_a x+\log_a y,\quad \log_a\left(\frac1x\right)=-\log_a x,$$
$$\log_a\left(\frac xy\right)=\log_a x-\log_a y,\quad \log_a(x^y)=y\log_a x,\quad \log_a x = \frac{\log_b x}{\log_b a}\ \text{(change of base)}.$$

**Example 1.** Simplify $\log_2 10+\log_2 12-\log_2 15$.
*Solution.* $=\log_2\left(\dfrac{10\cdot12}{15}\right) = \log_2 8 = 3$.

**Example 2.** Simplify $3^{\log_9 4}$.
*Solution.* $3^{\log_9 4} = 3^{(\log_3 4)/(\log_3 9)} = 3^{(\log_3 4)/2} = 4^{1/2}=2$.

**Example 3.** Solve $3^{x-1}=2^x$.
*Solution.* Take $\ln$ of both sides: $(x-1)\ln3 = x\ln2 \Rightarrow x(\ln3-\ln2)=\ln3 \Rightarrow x = \dfrac{\ln 3}{\ln(3/2)} \approx 2.7095$.

**Common mistakes:** $\log(x+y) \ne \log x+\log y$ (only *products* split this way). Forgetting the domain restriction $x>0$ when solving log equations — always check candidate solutions lie in the domain.

## 3.3 The Natural Logarithm and Exponential Functions

**Definition 6.** For $x>0$, $\ln x$ is defined as the signed area under $y=1/t$ between $t=1$ and $t=x$ (positive if $x\ge1$, negative if $0<x<1$).

**Theorem 1.** $\dfrac{d}{dx}\ln x = \dfrac1x$ for $x>0$ (proved via the Squeeze Theorem comparing the defining area to rectangles).

**Theorem 2 (properties of $\ln$).**
$$\ln(xy)=\ln x+\ln y,\quad \ln\!\left(\frac1x\right)=-\ln x,\quad \ln\!\left(\frac xy\right)=\ln x-\ln y,\quad \ln(x^r)=r\ln x.$$
Graph: $\ln x\to-\infty$ as $x\to0^+$; $\ln x\to\infty$ as $x\to\infty$; $\ln 1 = 0$.

**Useful corollary.** $\dfrac{d}{dx}\ln|x| = \dfrac1x$ for $x\ne0$, so $\displaystyle\int \frac1x\,dx = \ln|x|+C$.

**The exponential function.** $\exp x$ is defined as the inverse of $\ln x$. Setting $e=\exp(1)\approx 2.718281828\ldots$ (irrational, transcendental), one shows $\exp x = e^x$ for all real $x$ (not just rational), and
$$\boxed{\frac{d}{dx}e^x = e^x,\qquad \int e^x\,dx = e^x+C.}$$
Also $\ln x = \log_e x$, and $\lim_{x\to-\infty}e^x=0$, $\lim_{x\to\infty}e^x=\infty$.

**Theorem 3 (properties of $\exp$/$e^x$):** $(e^x)^y=e^{xy}$, $e^{x+y}=e^xe^y$, $e^{-x}=1/e^x$, $e^{x-y}=e^x/e^y$.

**Definition 7 (general exponential).** $a^x = e^{x\ln a}$ for $a>0$. Then $\dfrac{d}{dx}a^x = a^x\ln a$, and the General Power Rule $\dfrac{d}{dx}x^a=ax^{a-1}$ (for $x>0$, any real $a$) follows from $x^a=e^{a\ln x}$. Also $\dfrac{d}{dx}\log_a x = \dfrac{1}{x\ln a}$.

**Logarithmic differentiation.** For $y=[f(x)]^{g(x)}$ or for products/quotients of many factors, take $\ln$ of both sides first, then differentiate implicitly. This converts products/quotients to sums/differences and handles variable exponents.

**Example 1.** Differentiate $y = e^{x^2-3x}$.
*Solution.* $y' = (2x-3)e^{x^2-3x}$.

**Example 2.** Find the critical point of $y=x^x$ ($x>0$).
*Solution.* Write $y=e^{x\ln x}$. Then $y' = e^{x\ln x}\left(\ln x + x\cdot\frac1x\right) = x^x(1+\ln x)$. Critical point: $1+\ln x=0\Rightarrow x=1/e$.

**Example 3.** Differentiate $y = [(x+1)(x+2)(x+3)]/(x+4)$ using logarithmic differentiation.
*Solution.* $\ln|y| = \ln|x+1|+\ln|x+2|+\ln|x+3|-\ln|x+4|$. Differentiate:
$$\frac{y'}{y} = \frac1{x+1}+\frac1{x+2}+\frac1{x+3}-\frac1{x+4} \implies y' = y\left(\frac1{x+1}+\frac1{x+2}+\frac1{x+3}-\frac1{x+4}\right).$$

**Example 4.** Find $\dfrac{d}{dx}\ln\!\big(x+\sqrt{x^2+1}\big)$.
*Solution.* $\dfrac{1}{x+\sqrt{x^2+1}}\cdot\left(1+\dfrac{x}{\sqrt{x^2+1}}\right) = \dfrac{1}{x+\sqrt{x^2+1}}\cdot\dfrac{\sqrt{x^2+1}+x}{\sqrt{x^2+1}} = \dfrac{1}{\sqrt{x^2+1}}$.

**Common mistakes:** Forgetting the chain rule factor when differentiating $\ln(g(x))$. Forgetting that $\ln|x|$ (not just $\ln x$) has derivative $1/x$ for *all* $x\ne 0$. Confusing $x^a$ (power function, use power rule) with $a^x$ (exponential function, use $a^x\ln a$) — and with $x^x$ or $f(x)^{g(x)}$, which require logarithmic differentiation.

## 3.4 Growth and Decay

**Theorem 4.** For $x>0$: $\ln x \le x-1$ (the curve $y=\ln x$ lies below its tangent line $y=x-1$ at $(1,0)$).

**Theorem 5 (growth rates — "exponentials beat powers, powers beat logs").** For any $a>0$:
$$\lim_{x\to\infty}\frac{x^a}{e^x}=0,\qquad \lim_{x\to\infty}\frac{\ln x}{x^a}=0,\qquad \lim_{x\to-\infty}|x|^ae^x=0,\qquad \lim_{x\to0^+}x^a\ln x=0.$$

**Exponential growth/decay model.** If $\dfrac{dy}{dt}=ky$, the general solution is $y=Ce^{kt}$, and the initial-value problem $y'=ky,\ y(0)=y_0$ has the unique solution
$$\boxed{y(t) = y_0e^{kt}.}$$
$k>0$: exponential growth; $k<0$: exponential decay. **Doubling time** $T$ (growth) or **half-life** $T$ (decay) satisfies $e^{kT}=2$ or $e^{kT}=\tfrac12$ respectively, and $y(t+T) = 2y(t)$ or $\tfrac12y(t)$ for *any* $t$ — the doubling/halving time is constant.

**Newton's Law of Cooling.** For a quantity relaxing toward an ambient value $a$: $\dfrac{dy}{dt}=k(y-a)$. Substitute $u=y-a$ to reduce to $u'=ku$, so $u=u_0e^{kt}$, i.e. $y(t) = a+(y_0-a)e^{kt}$.

**Continuous compounding.** $\$A$ invested at nominal rate $r\%$ compounded continuously grows to $\$Ae^{r/100}$ in one year, since (**Theorem 6**) $\displaystyle e^x=\lim_{n\to\infty}\left(1+\frac xn\right)^n$.

**Logistic growth.** $\dfrac{dy}{dt}=ky\left(1-\dfrac yL\right)$ models growth limited by a carrying capacity $L$; solution with $y(0)=y_0$:
$$y(t) = \frac{Ly_0}{y_0+(L-y_0)e^{-kt}},\qquad \lim_{t\to\infty}y(t)=L\ (0<y_0<L).$$

**Example 1 (bacterial growth).** A culture has 500 cells initially and 800 after 24 h. How many after a further 12 h (i.e. at $t=36$)?
*Solution.* $y=500e^{kt}$, $800=500e^{24k}\Rightarrow k=\tfrac1{24}\ln1.6$. Then $y(36)=500e^{36k}=500(1.6)^{3/2}\approx 1012$ cells.

**Example 2 (radioactive decay / half-life).** A substance has half-life 1200 years. What percent remains after 10 years, and how long to lose 10%?
*Solution.* $p(t)=100e^{kt}$ with $100e^{1200k}=50\Rightarrow k=-\ln2/1200$. Then $p(10)=100e^{-10\ln2/1200}\approx 99.42\%$. For 10% loss, $90=100e^{kt}\Rightarrow t=\dfrac{1200\ln(0.9)}{-\ln 2}\approx 182.4$ years.

**Example 3 (Newton's cooling).** Coffee cools from 80°C to 50°C in 5 min in a 20°C room. How much longer to reach 40°C?
*Solution.* $u=y-20$; $u_0=60$, $u(5)=30\Rightarrow 5k=\ln\tfrac12=-\ln2$. Want $u(t)=20$: $20=60e^{-(t/5)\ln2}\Rightarrow t = \dfrac{5\ln3}{\ln2}\approx7.92$ min total, i.e. about $7.92-5=2.92$ more minutes.

**Example 4 (continuous compounding).** How long for $\$1000$ to grow to $\$2000$ at nominal 6% compounded continuously?
*Solution.* $2000=1000e^{0.06t}\Rightarrow t = \dfrac{\ln2}{0.06}\approx 11.55$ years.

**Common mistakes:** Sign errors — mixing up growth ($k>0$) vs decay ($k<0$). In Newton's-law problems, forgetting to shift by the ambient temperature $a$ before solving (the raw $y$ does **not** satisfy $y'=ky$, only $y-a$ does). Confusing half-life formulas with doubling-time formulas.

## 3.5 The Inverse Trigonometric Functions

Since the trig functions are periodic (not one-to-one), each inverse is defined on a **restricted domain** — memorizing these domains/ranges is essential.

**Definitions 8–14.**

| Function | Restriction of original | Domain of inverse | Range of inverse |
|---|---|---|---|
| $\sin^{-1}x$ (arcsin) | $[-\pi/2,\pi/2]$ | $[-1,1]$ | $[-\pi/2,\pi/2]$ |
| $\cos^{-1}x$ (arccos) | $[0,\pi]$ | $[-1,1]$ | $[0,\pi]$ |
| $\tan^{-1}x$ (arctan) | $(-\pi/2,\pi/2)$ | $\mathbb{R}$ | $(-\pi/2,\pi/2)$ |
| $\sec^{-1}x$ | $[0,\pi/2)\cup(\pi/2,\pi]$ | $|x|\ge1$ | $[0,\pi/2)\cup(\pi/2,\pi]$ |
| $\csc^{-1}x=\sin^{-1}(1/x)$, $\cot^{-1}x=\tan^{-1}(1/x)$ | | | |

$\cos^{-1}x = \dfrac{\pi}{2}-\sin^{-1}x$.

**Derivatives (memorize):**
$$\frac{d}{dx}\sin^{-1}x=\frac{1}{\sqrt{1-x^2}},\qquad \frac{d}{dx}\cos^{-1}x=\frac{-1}{\sqrt{1-x^2}},\qquad \frac{d}{dx}\tan^{-1}x=\frac{1}{1+x^2},$$
$$\frac{d}{dx}\sec^{-1}x = \frac{1}{|x|\sqrt{x^2-1}}.$$

**Corresponding integrals (with $a>0$):**
$$\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac xa+C,\qquad \int\frac{dx}{a^2+x^2}=\frac1a\tan^{-1}\frac xa+C.$$

**Example 1.** Evaluate $\sin^{-1}(-1/\sqrt2)$ and $\cos(\tan^{-1}2)$.
*Solution.* $\sin^{-1}(-1/\sqrt2)=-\pi/4$ since $\sin(-\pi/4)=-1/\sqrt2$ and $-\pi/4\in[-\pi/2,\pi/2]$. For the second: let $\theta=\tan^{-1}2$; draw a right triangle with opposite $2$, adjacent $1$, hypotenuse $\sqrt5$; $\cos\theta = 1/\sqrt5$.

**Example 2.** Simplify $\tan(\sin^{-1}x)$ for $|x|<1$.
*Solution.* Let $\theta=\sin^{-1}x$; triangle: opposite $x$, hypotenuse $1$, adjacent $\sqrt{1-x^2}$. So $\tan\theta = \dfrac{x}{\sqrt{1-x^2}}$.

**Example 3.** Differentiate $y=\sin^{-1}(x/a)$ ($a>0$) and deduce $\int \dfrac{dx}{\sqrt{a^2-x^2}}$.
*Solution.* $y' = \dfrac{1}{\sqrt{1-(x/a)^2}}\cdot\dfrac1a = \dfrac{1}{\sqrt{a^2-x^2}}$. Hence $\int\dfrac{dx}{\sqrt{a^2-x^2}} = \sin^{-1}(x/a)+C$.

**Example 4.** Prove $\tan^{-1}\!\left(\dfrac{x-1}{x+1}\right)=\tan^{-1}x-\dfrac{\pi}{4}$ for $x>-1$.
*Solution.* Let $f(x)$ be LHS $-$ RHS. Differentiating both terms and simplifying gives $f'(x)=0$ on $(-1,\infty)$, so $f$ is constant; evaluating at $x=0$ gives $f(0)=\tan^{-1}(-1)-0=-\pi/4$... (matches after moving the $-\pi/4$ term), confirming the identity.

**Common mistakes:** Forgetting that $\sin^{-1}$ and $\tan^{-1}$ have *different ranges* than $\cos^{-1}$ — mixing up which quadrant a "reference triangle" answer lands in. Forgetting the absolute value $|x|$ in the derivative of $\sec^{-1}x$. Writing $\sin^{-1}x = 1/\sin x$ (wrong — that's $\csc x$).

## 3.6 Hyperbolic Functions

**Definition 15.**
$$\cosh x = \frac{e^x+e^{-x}}{2},\qquad \sinh x = \frac{e^x-e^{-x}}{2}.$$
Fundamental identity: $\cosh^2 t-\sinh^2 t = 1$. $\cosh$ is even, $\sinh$ is odd; $\cosh0=1,\sinh0=0$.

**Derivatives:** $\dfrac{d}{dx}\cosh x=\sinh x$, $\dfrac{d}{dx}\sinh x=\cosh x$ (no minus sign, unlike circular functions).

**Addition/double-angle formulas:**
$$\cosh(x+y)=\cosh x\cosh y+\sinh x\sinh y,\quad \sinh(x+y)=\sinh x\cosh y+\cosh x\sinh y,$$
$$\cosh(2x)=\cosh^2x+\sinh^2x=2\cosh^2x-1,\qquad \sinh(2x)=2\sinh x\cosh x.$$

**Definition 16.**
$$\tanh x=\frac{\sinh x}{\cosh x},\quad \coth x=\frac1{\tanh x},\quad \operatorname{sech}x=\frac1{\cosh x},\quad \operatorname{csch}x=\frac1{\sinh x}.$$
$$\frac{d}{dx}\tanh x=\operatorname{sech}^2x,\quad \frac{d}{dx}\coth x=-\operatorname{csch}^2x,\quad \frac{d}{dx}\operatorname{sech}x=-\operatorname{sech}x\tanh x,\quad \frac{d}{dx}\operatorname{csch}x=-\operatorname{csch}x\coth x.$$
$\tanh x\to \pm1$ as $x\to\pm\infty$ (two horizontal asymptotes).

**Inverse hyperbolic functions in terms of $\ln$** (derived by solving quadratics in $e^y$):
$$\sinh^{-1}x = \ln\!\big(x+\sqrt{x^2+1}\big)\ (\text{all }x),\qquad \cosh^{-1}x=\ln\!\big(x+\sqrt{x^2-1}\big)\ (x\ge1),$$
$$\tanh^{-1}x = \frac12\ln\!\left(\frac{1+x}{1-x}\right)\ (-1<x<1).$$
Since $\cosh$ is not one-to-one, its inverse requires restricting to $x\ge0$ (principal value $\operatorname{Cosh}x$).

**Example 1.** Verify $\dfrac{d}{dx}\cosh x=\sinh x$.
*Solution.* $\dfrac{d}{dx}\dfrac{e^x+e^{-x}}2 = \dfrac{e^x-e^{-x}}2=\sinh x$. ✓

**Example 2.** Express $\sinh^{-1}x$ in terms of $\ln$.
*Solution.* Let $y=\sinh^{-1}x$, so $x=\dfrac{e^y-e^{-y}}2$. Multiply by $2e^y$: $(e^y)^2-2xe^y-1=0$. Quadratic formula (taking the $+$ root since $e^y>0$): $e^y=x+\sqrt{x^2+1}$, so $y=\ln(x+\sqrt{x^2+1})$.

**Example 3.** Show that $f_{A,B}(t)=Ae^{kt}+Be^{-kt}$ solves $y''-k^2y=0$, and express it using $\cosh,\sinh$.
*Solution.* $f''=Ak^2e^{kt}+Bk^2e^{-kt}=k^2f$, so $f''-k^2f=0$. ✓ Also $f_{A,B}(t) = (A+B)\cosh(kt)+(A-B)\sinh(kt)$, matching the general solution $C\cosh kt+D\sinh kt$.

**Example 4.** Simplify $\tanh(\ln x)$.
*Solution.* $\sinh(\ln x) = \dfrac{x-1/x}2=\dfrac{x^2-1}{2x}$; $\cosh(\ln x)=\dfrac{x^2+1}{2x}$; so $\tanh(\ln x)=\dfrac{x^2-1}{x^2+1}$.

**Common mistakes:** Using the trig sign convention ($\cosh' = -\sinh$) — wrong, there is no minus sign for hyperbolic derivatives. Forgetting the domain restriction $x\ge 1$ for $\cosh^{-1}$ and $-1<x<1$ for $\tanh^{-1}$.

## 3.7 Second-Order Linear DEs with Constant Coefficients

**Setup.** $ay''+by'+cy=0$ ($a\ne0$). Try $y=e^{rt}$: substitution gives the **auxiliary (characteristic) equation**
$$ar^2+br+c=0,\qquad r = \frac{-b\pm\sqrt{D}}{2a},\quad D=b^2-4ac.$$

**Recipe (three cases):**

- **Case I ($D>0$, real distinct roots $r_1,r_2$):** general solution $y = Ae^{r_1t}+Be^{r_2t}$.
- **Case II ($D=0$, repeated root $r=-b/2a$):** general solution $y = Ae^{rt}+Bte^{rt}$.
- **Case III ($D<0$, complex roots $r=k\pm i\omega$, $k=-b/2a$, $\omega=\sqrt{4ac-b^2}/2a$):** general solution
$$y = Ae^{kt}\cos(\omega t)+Be^{kt}\sin(\omega t).$$

Initial conditions $y(t_0)=y_0,\ y'(t_0)=v_0$ pin down $A,B$ uniquely.

**Example 1.** Solve $y''+y'-2y=0$.
*Solution.* $r^2+r-2=(r+2)(r-1)=0\Rightarrow r=-2,1$. $y=Ae^{-2t}+Be^{t}$.

**Example 2.** Solve $y''+6y'+9y=0$.
*Solution.* $(r+3)^2=0\Rightarrow r=-3$ (repeated). $y=Ae^{-3t}+Bte^{-3t}$.

**Example 3.** Solve $y''+4y'+13y=0$.
*Solution.* $r=\dfrac{-4\pm\sqrt{16-52}}2=-2\pm3i$. $y=Ae^{-2t}\cos3t+Be^{-2t}\sin3t$.

**Example 4 (IVP).** Solve $y''+2y'+2y=0$, $y(0)=2$, $y'(0)=-3$.
*Solution.* $r=-1\pm i$. $y=Ae^{-t}\cos t+Be^{-t}\sin t$. $y(0)=A=2$. $y' = e^{-t}[(B-A)\cos t-(A+B)\sin t]$, so $y'(0)=B-A=-3\Rightarrow B=-1$. $y=2e^{-t}\cos t-e^{-t}\sin t$.

### Simple and Damped Harmonic Motion

**Simple harmonic motion (undamped, $b=0$):** $\dfrac{d^2y}{dt^2}+\omega^2y=0$ ($\omega^2=k/m$ for a mass-spring system, Hooke's Law $F=-ky$). General solution
$$y = A\cos\omega t+B\sin\omega t = R\cos\big(\omega(t-t_0)\big),$$
where $R=\sqrt{A^2+B^2}$ is the **amplitude**, $T=2\pi/\omega$ is the **period**, $1/T$ the **frequency** (Hz), $\omega$ the **circular frequency** (rad/s), $t_0$ the **time-shift**. Position/velocity at $t=0$: $y_0=A$, $v_0=B\omega$.

**Damped harmonic motion ($a,b,c>0$):** roots have negative real part $k=-b/2a$.
- $b^2<4ac$: **underdamped** — oscillates with exponentially decaying amplitude $e^{kt}$.
- $b^2=4ac$: **critically damped** — no oscillation, fastest non-oscillatory return to equilibrium.
- $b^2>4ac$: **overdamped** — no oscillation, slower return to equilibrium.

**Example 5.** Solve $y''+16y=0$, $y(0)=-6$, $y'(0)=32$. Find amplitude, frequency, period.
*Solution.* $\omega=4$. $y=A\cos4t+B\sin4t$; $A=-6$; $y'=-4A\sin4t+4B\cos4t\Rightarrow y'(0)=4B=32\Rightarrow B=8$. $y=-6\cos4t+8\sin4t$. Amplitude $R=\sqrt{36+64}=10$; frequency $=\omega/2\pi=2/\pi\approx0.637$ Hz; period $=2\pi/4\approx1.57$ s.

**Example 6 (spring-mass, converting units).** A 100 g mass on a spring; a force of $3\times10^4$ dynes produces displacement $1/3$ cm. Pulled down 2 cm and given initial upward velocity 60 cm/s. Find $y(t)$, amplitude, period.
*Solution.* Hooke's Law: $3\times10^4 = k\cdot\tfrac13\Rightarrow k=9\times10^4$ g/s². $\omega=\sqrt{k/m}=\sqrt{900}=30$ rad/s. $y(0)=-2\Rightarrow A=-2$; $y'(0)=60=B\omega\Rightarrow B=2$. $y=-2\cos30t+2\sin30t$ (cm). Amplitude $=\sqrt{4+4}=2\sqrt2\approx2.83$ cm; period $=2\pi/30\approx0.209$ s.

**Common mistakes:** Sign error in the discriminant $D=b^2-4ac$ leading to the wrong case. Forgetting to convert angular units (rev/min to rad/s: multiply by $2\pi$) when computing $\omega$ from a physical rotation rate. Confusing amplitude $R=\sqrt{A^2+B^2}$ with $A$ or $B$ alone. Reporting frequency (Hz, $=\omega/2\pi$) when period or circular frequency was asked for.

---

## Chapter 3 Review Problems

1. Show $f(x)=3x+x^3$ has an inverse, and find the slope of $y=f^{-1}(x)$ at $x=0$.
2. Simplify $\log_2 20 - \log_2 5$.
3. Solve $2^{x+1}=5^{x}$ for $x$ (exact expression, then decimal).
4. A bacteria culture grows from 200 to 600 in 2 hours. How many bacteria after 5 hours?
5. A hot object cools from 90°C to 60°C in 10 minutes in a 20°C room. How long to reach 30°C?
6. Differentiate $y = \ln\big(\sec x+\tan x\big)$.
7. Differentiate $y = x^{\sin x}$ using logarithmic differentiation.
8. Evaluate $\cos\big(\sin^{-1}(3/5)\big)$ and $\tan\big(\cos^{-1}(-1/2)\big)$.
9. Find $\dfrac{d}{dx}\tan^{-1}(3x)$ and use it to evaluate $\displaystyle\int \frac{dx}{1+9x^2}$.
10. Show $\cosh^2x - \sinh^2 x=1$ using the exponential definitions.
11. Solve $y''-5y'+6y=0$.
12. Solve $y''-4y'+4y=0$, $y(0)=1$, $y'(0)=0$.
13. A mass on a spring satisfies $y''+9y=0$ with $y(0)=0$, $y'(0)=6$. Find the amplitude, period, and time-shift of the motion.
14. **(Conceptual)** Explain why $\sin^{-1}(\sin(3\pi/4)) \ne 3\pi/4$, and find its actual value.
15. **(Conceptual)** A student claims that since $\dfrac{d}{dx}e^x=e^x$, it must be true that $\displaystyle\int e^x\,dx = e^x$ (no constant needed) because "the derivative of the integral just gives back $e^x$." Explain the flaw in this reasoning.

### Solutions

**1.** $f'(x)=3+3x^2>0$ for all $x$, so $f$ is increasing, hence one-to-one and invertible. $f(0)=0$, so $f^{-1}(0)=0$. $(f^{-1})'(0)=1/f'(0) = 1/3$.

**2.** $\log_2 20-\log_2 5=\log_2(20/5)=\log_2 4=2$.

**3.** $(x+1)\ln2 = x\ln5 \Rightarrow x(\ln2-\ln5)=-\ln2\Rightarrow x=\dfrac{\ln2}{\ln5-\ln2}=\dfrac{\ln2}{\ln(5/2)}\approx\dfrac{0.6931}{0.9163}\approx0.7565$.

**4.** $y=200e^{kt}$; $600=200e^{2k}\Rightarrow e^{2k}=3\Rightarrow k=\tfrac12\ln3$. $y(5)=200e^{5k}=200\cdot3^{5/2}=200(15.588)\approx3118$ bacteria.

**5.** $u=y-20$; $u_0=70$, $u(10)=40\Rightarrow e^{10k}=4/7\Rightarrow k=\tfrac1{10}\ln(4/7)$. Want $u(t)=10$: $10=70e^{kt}\Rightarrow t=\dfrac{\ln(1/7)}{k}=\dfrac{10\ln(1/7)}{\ln(4/7)}=\dfrac{-10\ln7}{\ln4-\ln7}\approx\dfrac{-19.46}{-0.560}\approx34.7$ min.

**6.** $y' = \dfrac{\sec x\tan x+\sec^2x}{\sec x+\tan x} = \dfrac{\sec x(\tan x+\sec x)}{\sec x+\tan x}=\sec x.$

**7.** $\ln y = \sin x\ln x$. $\dfrac{y'}{y}=\cos x\ln x+\dfrac{\sin x}{x}$, so $y'=x^{\sin x}\left(\cos x\ln x+\dfrac{\sin x}{x}\right)$.

**8.** For $\cos(\sin^{-1}(3/5))$: right triangle with opposite 3, hypotenuse 5, adjacent 4 $\Rightarrow$ value $=4/5$. For $\tan(\cos^{-1}(-1/2))$: $\cos^{-1}(-1/2)=2\pi/3$, and $\tan(2\pi/3)=-\sqrt3$.

**9.** $\dfrac{d}{dx}\tan^{-1}(3x) = \dfrac{3}{1+9x^2}$. Hence $\displaystyle\int\frac{dx}{1+9x^2}=\frac13\tan^{-1}(3x)+C$.

**10.** $\cosh^2x-\sinh^2x = \left(\dfrac{e^x+e^{-x}}2\right)^2-\left(\dfrac{e^x-e^{-x}}2\right)^2 = \dfrac{(e^{2x}+2+e^{-2x})-(e^{2x}-2+e^{-2x})}{4}=\dfrac{4}{4}=1.$

**11.** $r^2-5r+6=(r-2)(r-3)=0\Rightarrow r=2,3$. $y=Ae^{2t}+Be^{3t}$.

**12.** $(r-2)^2=0\Rightarrow r=2$ (repeated). $y=Ae^{2t}+Bte^{2t}$. $y(0)=A=1$. $y'=2Ae^{2t}+B(e^{2t}+2te^{2t})$; $y'(0)=2A+B=0\Rightarrow B=-2$. $y=e^{2t}-2te^{2t}$.

**13.** $\omega=3$. $y=A\cos3t+B\sin3t$; $y(0)=A=0$; $y'(0)=3B=6\Rightarrow B=2$. So $y=2\sin3t = 2\cos(3t-\pi/2) = 2\cos\big(3(t-\pi/6)\big)$. Amplitude $R=2$; period $=2\pi/3$; time-shift $t_0=\pi/6$.

**14.** $\sin^{-1}$ always returns a value in $[-\pi/2,\pi/2]$, but $3\pi/4$ lies outside that range, so the cancellation identity $\sin^{-1}(\sin\theta)=\theta$ only applies for $\theta$ already in $[-\pi/2,\pi/2]$. Using the supplementary-angle identity, $\sin(3\pi/4)=\sin(\pi-3\pi/4)=\sin(\pi/4)$, so $\sin^{-1}(\sin(3\pi/4)) = \sin^{-1}(\sin(\pi/4)) = \pi/4$.

**15.** The derivative of $e^x$ is indeed $e^x$, but *any* function of the form $e^x+C$ (for a constant $C$) also has derivative $e^x$, since the derivative of a constant is 0. Differentiation cannot recover the arbitrary additive constant that was lost, so the antiderivative (indefinite integral) must include "$+C$" to represent the entire family of functions with that derivative, not just one member of it.
