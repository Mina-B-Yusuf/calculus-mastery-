# Chapter 8: Conics, Parametric Curves, and Polar Curves

This chapter moves beyond curves expressed as $y=f(x)$: it covers the geometry and focal properties of conic sections, how to differentiate and integrate along curves given parametrically or in polar coordinates, and how to find slopes, arc lengths, surface areas, and enclosed areas in these new coordinate systems — all of which reappear in later applications (physics, engineering) and are standard exam topics.

## 8.1 Conics

Conics arise as plane sections of a right-circular cone: a **circle** if the cutting plane is perpendicular to the axis, an **ellipse** if it's tilted but still meets only one nappe in a closed curve, a **parabola** if it's parallel to a generator line of the cone, and a **hyperbola** if it cuts both nappes. Every conic satisfies a general second-degree equation
$$Ax^2+Bxy+Cy^2+Dx+Ey+F=0.$$

**Definition 1 (Parabola).** The set of points equidistant from a fixed point (the **focus**) and a fixed line (the **directrix**). The **axis** passes through the focus perpendicular to the directrix; the **vertex** is where the parabola crosses its axis (halfway between focus and directrix).

**Table 1 (Standard parabola equations, vertex at origin):**

| Focus | Directrix | Equation |
|---|---|---|
| $(a,0)$ | $x=-a$ | $y^2=4ax$ |
| $(-a,0)$ | $x=a$ | $y^2=-4ax$ |
| $(0,a)$ | $y=-a$ | $x^2=4ay$ |
| $(0,-a)$ | $y=a$ | $x^2=-4ay$ |

**Reflection by a parabola.** Any ray from the focus reflects parallel to the axis (and vice versa) — this follows from a "shortest path" argument using the reflecting property of a straight line (equal angles of incidence/reflection minimize path length).

**Definition 2 (Ellipse).** The set of points where the **sum** of distances to two fixed points (**foci**) is constant ($=2a$).

Standard equation (foci at $(\pm c,0)$, $a>b>0$, $c=\sqrt{a^2-b^2}$):
$$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1.$$
- $a$ = semi-major axis, $b$ = semi-minor axis, $c=\sqrt{a^2-b^2}$ = semi-focal separation.
- **Eccentricity** $\varepsilon = c/a < 1$ (circle when $\varepsilon=0$).
- **Directrices:** $x=\pm a/\varepsilon$; for any point $P$ on the ellipse, $\dfrac{\text{dist}(P,\text{focus})}{\text{dist}(P,\text{corresponding directrix})}=\varepsilon.$

**Reflection by an ellipse.** A ray from one focus reflects through the other focus.

**Definition 3 (Hyperbola).** The set of points where the (absolute value of the) **difference** of distances to two fixed foci is constant ($=2a$).

Standard equation (foci at $(\pm c,0)$, $c=\sqrt{a^2+b^2}$):
$$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1.$$
- $a$ = semi-transverse axis, $b$ = semi-conjugate axis, $c=\sqrt{a^2+b^2}$.
- **Vertices** $(\pm a,0)$; **asymptotes** $y=\pm(b/a)x$ (from $\frac{x^2}{a^2}-\frac{y^2}{b^2}=0$).
- **Eccentricity** $\varepsilon=c/a>1$; **rectangular hyperbola** if $a=b$ (asymptotes perpendicular, $\varepsilon=\sqrt2$).
- **Directrices:** $x=\pm a/\varepsilon$, with the same focus/directrix distance-ratio property $=\varepsilon$.
- The **conjugate hyperbola** $\dfrac{y^2}{b^2}-\dfrac{x^2}{a^2}=1$ shares the same asymptotes.

**Reflection by a hyperbola.** A ray toward one focus reflects as if it came from the other focus.

**Classifying a general second-degree equation.** If $B=0$, complete the square in $x$ and $y$. If $B\ne0$, rotate axes by angle $\theta$ with $\tan2\theta = \dfrac{B}{A-C}$ (or $\theta=\pi/4$ if $A=C,B\ne0$) to eliminate the cross term, using
$$x=u\cos\theta-v\sin\theta, \qquad y=u\sin\theta+v\cos\theta.$$

**Worked Examples**

1. **Find focus/directrix from a parabola equation.** Focus $F=(a,0)$, directrix $x=-a$: distance formula $\sqrt{(x-a)^2+y^2}=x+a$ leads to $y^2=4ax$ (Example 1 in the text — worth re-deriving from scratch).

2. **Identify $x^2+2y^2+6x-4y+7=0$.** Complete the square: $(x+3)^2+2(y-1)^2=4-9+2\cdot1\cdot... $; carefully: $x^2+6x+9+2(y^2-2y+1)=9+2-7=4$, so $\dfrac{(x+3)^2}{4}+\dfrac{(y-1)^2}{2}=1$ — an ellipse centered at $(-3,1)$ with $a=2$, $b=\sqrt2$, $c=\sqrt2$, foci at $(-3\pm\sqrt2,1)$.

3. **Identify $xy=1$.** With $A=C=D=E=0,B=1$, rotate by $\theta=\pi/4$: $x=\tfrac1{\sqrt2}(u-v)$, $y=\tfrac1{\sqrt2}(u+v)$, giving $u^2-v^2=2$ — a rectangular hyperbola with vertices at $(1,1)$ and $(-1,-1)$ in the original coordinates.

4. **Identify $2x^2+xy+y^2=2$.** $A=2,B=C=1$; $\tan2\theta=B/(A-C)=1$, so $2\theta=\pi/4$. After rotation, $A'=\frac{3+\sqrt2}2$, $C'=\frac{3-\sqrt2}2$; equation becomes $(3+\sqrt2)u^2+(3-\sqrt2)v^2=4$ — an ellipse with semi-axes $2/\sqrt{3-\sqrt2}$ and $2/\sqrt{3+\sqrt2}$.

**Common mistakes:** Mixing up which axis is "major" (larger denominator under $x^2$ or $y^2$ tells you which is major, not which variable is listed first); forgetting $c^2=a^2-b^2$ for ellipses but $c^2=a^2+b^2$ for hyperbolas (opposite signs!); sign errors completing the square (always add back what you added inside the parentheses, scaled by the outer coefficient); assuming every second-degree equation is a "real" conic — check for degenerate cases (empty set, a point, or lines) before describing it as an ellipse/parabola/hyperbola.

## 8.2 Parametric Curves

**Definition 4 (Parametric curve).** An ordered pair of continuous functions $x=f(t),\ y=g(t)$ on a common interval $I$; $t$ is the **parameter**. The curve has an inherent **direction** (the direction of increasing $t$).

**Definition 5 (Plane curve / parametrization).** A plane curve is just the set of points $(x,y)=(f(t),g(t))$ traced out; a **parametrization** is any particular choice of $(f,g,I)$ generating those points. The same plane curve can have infinitely many different parametrizations (different speeds, directions, or even repeated tracing).

**Eliminating the parameter** converts to a Cartesian equation but loses information about direction/speed/time.

**Key named curves:**
- **Line through $P_0,P_1$:** $x=x_0+t(x_1-x_0),\ y=y_0+t(y_1-y_0)$, $t\in(-\infty,\infty)$; $t=0$ gives $P_0$, $t=1$ gives $P_1$.
- **Ellipse:** $x=a\cos t,\ y=b\sin t$, $0\le t\le2\pi$ (counterclockwise, closed curve).
- **Cycloid** (path of a point on a circle of radius $a$ rolling along a line): $x=a(t-\sin t),\ y=a(1-\cos t)$. Has cusps at $t=2n\pi$.
- **Involute of a circle** (unwinding a string from a circle of radius $a$): $x=a\cos t+at\sin t,\ y=a\sin t-at\cos t$.

**Worked Examples**

1. **Eliminate the parameter:** $x=t^2-1,\ y=t+1$. From $t=y-1$: $x=(y-1)^2-1=y^2-2y$ — the full parabola (since $y\to\pm\infty$ as $t\to\pm\infty$).

2. **Circle arc:** $x=3\cos t,\ y=3\sin t$, $0\le t\le3\pi/2$: three-quarters of the circle $x^2+y^2=9$, starting at $(3,0)$ and ending at $(0,-3)$ moving counterclockwise.

3. **Self-intersecting curve:** $x=t^3-3t,\ y=t^2$, $-2\le t\le2$. Symmetric about the $y$-axis ($x$ odd in $t$, $y$ even). Self-intersection where $x=0$: $t(t-\sqrt3)(t+\sqrt3)=0$, so $t=0$ gives $(0,0)$ and $t=\pm\sqrt3$ both give $(0,3)$ — the curve crosses itself at $(0,3)$.

4. **Multiple parametrizations of the same curve.** The unit circle $x^2+y^2=1$ can be parametrized as (i) $x=\cos t,y=\sin t$ ($0\le t\le2\pi$), or (ii) $x=1-t^2, y=t\sqrt{2-t^2}$ ($-\sqrt2\le t\le\sqrt2$) — same set of points, very different parameter behavior/speed.

**Common mistakes:** Assuming eliminating the parameter always gives *the entire* plane curve (sometimes the parameter's range restricts you to only part of the Cartesian curve, e.g. one branch or a bounded arc); forgetting that the direction of travel is only recoverable from the parametric form, not the eliminated Cartesian equation; missing self-intersections (a curve crosses itself whenever two different $t$-values map to the same $(x,y)$ — always check this explicitly when sketching).

## 8.3 Smooth Parametric Curves and Their Slopes

A curve is **smooth** if it has a continuously turning tangent at every point.

**Theorem 1.** Let $C: x=f(t),y=g(t)$ with $f',g'$ continuous on $I$.
- If $f'(t)\ne0$ on $I$: $C$ is smooth and $\dfrac{dy}{dx}=\dfrac{g'(t)}{f'(t)}$ (tangent slope).
- If $g'(t)\ne0$ on $I$: $C$ is smooth and the normal has slope $-\dfrac{f'(t)}{g'(t)}$.
- $C$ can fail to be smooth **only** at points where $f'(t)=g'(t)=0$ simultaneously (but need not fail — check case by case, e.g. $x=t^3,y=t^6$ is smooth at $t=0$ even though both derivatives vanish, since it's just $y=x^2$).

**Tangent and normal line parametrizations at $t=t_0$:**
$$\text{Tangent: } \begin{cases}x=f(t_0)+f'(t_0)(t-t_0)\\ y=g(t_0)+g'(t_0)(t-t_0)\end{cases} \qquad \text{Normal: } \begin{cases}x=f(t_0)+g'(t_0)(t-t_0)\\ y=g(t_0)-f'(t_0)(t-t_0)\end{cases}$$

**Concavity.** On an interval where $f'(t)\ne0$:
$$\frac{d^2y}{dx^2} = \frac{f'(t)g''(t)-g'(t)f''(t)}{[f'(t)]^3}.$$

**Curve sketching:** horizontal tangent where $dy/dt=0,\ dx/dt\ne0$; vertical tangent where $dx/dt=0,\ dy/dt\ne0$; at points where both vanish, examine one-sided limits of $dy/dx$.

**Worked Examples**

1. **Tangent/normal at $t=2$ for $x=t^2-t,\ y=t^2+t$.** At $t=2$: $(x,y)=(2,6)$; $dx/dt=2t-1=3$, $dy/dt=2t+1=5$. Tangent: $x=2+3(t-2)=3t-4,\ y=6+5(t-2)=5t-4$ (slope $5/3$). Normal: $x=2+5(t-2)=5t-8,\ y=6-3(t-2)=-3t+12$ (slope $-3/5$).

2. **Concavity of $x=t^3-3t,\ y=t^2$.** $f'=3(t^2-1)$, $g'=2t$, $f''=6t$, $g''=2$. $\dfrac{d^2y}{dx^2}=\dfrac{3(t^2-1)(2)-2t(6t)}{[3(t^2-1)]^3}=-\dfrac29\cdot\dfrac{t^2+1}{(t^2-1)^3}$, which never vanishes; concave up for $-1<t<1$, concave down otherwise (undefined at $t=\pm1$, the vertical-tangent points).

3. **Curve failing to be smooth.** $x=t^2, y=t^3$: $f'=2t,g'=3t^2$ both vanish at $t=0$, and indeed the curve $y^2=x^3$ (i.e. $x=y^{2/3}$) has a **cusp** at the origin — genuinely not smooth there.

**Common mistakes:** Concluding a curve is *not* smooth just because $f'(t_0)=g'(t_0)=0$ — this only means Theorem 1's *sufficient* condition fails, not that smoothness actually fails (check directly, as in Example 2 above); forgetting the concavity formula has $[f'(t)]^3$ (cubed) in the denominator, not squared; sign errors when both $dx/dt$ and $dy/dt$ change sign near a candidate horizontal/vertical tangent point.

## 8.4 Arc Lengths and Areas for Parametric Curves

**Arc length element.**
$$ds = \sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt, \qquad s=\int_a^b \sqrt{[f'(t)]^2+[g'(t)]^2}\,dt.$$

**Surface area of revolution** (rotating $C: x=f(t),y=g(t)$, $a\le t\le b$):
$$\text{About the }x\text{-axis: } S=2\pi\int_a^b |g(t)|\sqrt{[f'(t)]^2+[g'(t)]^2}\,dt,$$
$$\text{About the }y\text{-axis: } S=2\pi\int_a^b |f(t)|\sqrt{[f'(t)]^2+[g'(t)]^2}\,dt.$$

**Area bounded by a parametric curve.** For $x=f(t),y=g(t)$:
$$A = \int_a^b g(t)f'(t)\,dt \quad (\text{signed; sign depends on direction/position relative to the axis}).$$
For a non-self-intersecting **closed** curve:
$$A = \int_a^b g(t)f'(t)\,dt \ \text{ if traversed clockwise}, \qquad A=-\int_a^b g(t)f'(t)\,dt \ \text{ if traversed counterclockwise}.$$
(Equivalently, $A=\oint x\,dy$ with sign conventions handled the same way, using $f(t)g'(t)$.)

**Worked Examples**

1. **Arc length of $x=e^t\cos t,\ y=e^t\sin t$, $0\le t\le2\pi$.** $\left(\frac{ds}{dt}\right)^2 = e^{2t}(\cos t-\sin t)^2+e^{2t}(\sin t+\cos t)^2=2e^{2t}$, so $s=\int_0^{2\pi}\sqrt2\,e^t\,dt=\sqrt2(e^{2\pi}-1).$

2. **Surface area rotating the astroid** $x=a\cos^3t,y=a\sin^3t$ about the $x$-axis: using $ds=3a\cos t\sin t\,dt$ on $[0,\pi/2]$ and doubling for the lower half, $S=2\cdot2\pi\int_0^{\pi/2}a\sin^3t\cdot3a\cos t\sin t\,dt = 12\pi a^2\int_0^{\pi/2}\sin^4t\cos t\,dt = \dfrac{12\pi a^2}{5}.$

3. **Area of an ellipse** $x=a\cos s,y=b\sin s$, $0\le s\le2\pi$ (counterclockwise): $A=-\int_0^{2\pi} b\sin s\cdot(-a\sin s)\,ds = ab\int_0^{2\pi}\sin^2s\,ds = \pi ab.$

4. **Area under one arch of the cycloid** $x=a(t-\sin t),y=a(1-\cos t)$, $0\le t\le2\pi$: since $y\ge0$ and $dx/dt\ge0$: $A=\int_0^{2\pi} a^2(1-\cos t)^2\,dt = 3\pi a^2.$

**Common mistakes:** Forgetting the absolute value $|g(t)|$ or $|f(t)|$ in the surface-area formula (the radius of revolution can't be negative); using the wrong sign convention for enclosed area of a closed curve (clockwise vs. counterclockwise flips the sign — always sanity-check against the expected positive area); not simplifying $\sqrt{(dx/dt)^2+(dy/dt)^2}$ using a Pythagorean trig identity before integrating (this step is what makes most of these arc-length integrals tractable).

## 8.5 Polar Coordinates and Polar Curves

A point's **polar coordinates** $[r,\theta]$: $r$ = distance from origin (pole), $\theta$ = angle from the polar axis (positive $x$-axis), counterclockwise positive.

**Non-uniqueness:** $[r,\theta]$ and $[r,\theta+2n\pi]$ are the same point; $[r,\theta] = [-r,\theta+\pi]$ (negative $r$ means go the opposite direction); the origin is $[0,\theta]$ for *any* $\theta$.

**Polar–rectangular conversion:**
$$x=r\cos\theta, \quad y=r\sin\theta, \quad x^2+y^2=r^2, \quad \tan\theta = y/x.$$

**Rotating a polar graph.** $r=f(\theta-\theta_0)$ is $r=f(\theta)$ rotated by angle $\theta_0$ about the origin.

**Direction of approach to the origin.** A polar graph $r=f(\theta)$ passes through the origin in direction $\theta$ whenever $f(\theta)=0$; always mark these directions when sketching.

**Common named polar curves:**
- Circle centered at origin: $r=a$.
- Line through origin: $\theta=\beta$.
- Circle through origin, center on polar axis: $r=2a\cos\theta$; center on $y$-axis: $r=2a\sin\theta$.
- **Cardioid:** $r=a(1\pm\cos\theta)$ or $r=a(1\pm\sin\theta)$ — heart-shaped, cusp at the origin.
- **Rose curves:** $r=\cos(n\theta)$ or $r=\sin(n\theta)$.
- **Lemniscate:** $r^2=\cos(2\theta)$ (figure-eight, two loops, no points where $\cos2\theta<0$).
- **Spirals:** $r=\theta$ (equiangular... actually Archimedean) or $r=e^{\theta/3}$ (equiangular/logarithmic spiral).

**Polar equation of a conic** with focus at the origin, directrix $x=-p$, eccentricity $\varepsilon$:
$$r = \frac{\varepsilon p}{1-\varepsilon\cos\theta}.$$
Ellipse if $\varepsilon<1$; parabola if $\varepsilon=1$; hyperbola if $\varepsilon>1$ (asymptote directions are where $1-\varepsilon\cos\theta=0$).

**Intersections of polar curves.** Solving $f(\theta)=g(\theta)$ finds *some* intersections, but **check the origin separately** — both curves may pass through the origin at *different* $\theta$ values, so the origin is often a "hidden" intersection not caught by solving the equation directly. Also check $[r,\theta]=[-r,\theta+\pi]$ type coincidences.

**Worked Examples**

1. **Identify $r=2a\cos\theta$.** Multiply by $r$: $r^2=2ar\cos\theta \Rightarrow x^2+y^2=2ax \Rightarrow (x-a)^2+y^2=a^2$ — circle of radius $a$ centered at $(a,0)$.

2. **Sketch $r=a(1-\cos\theta)$ (cardioid).** Enters origin at $\theta=0$ (since $f(0)=0$); maximum $r=2a$ at $\theta=\pi$; symmetric about the polar axis.

3. **Find intersections of $r=\sin\theta$ and $r=1-\sin\theta$.** Solve $\sin\theta = 1-\sin\theta \Rightarrow \sin\theta=\tfrac12 \Rightarrow \theta=\pi/6,5\pi/6$, giving points $[\tfrac12,\pi/6]$ and $[\tfrac12,5\pi/6]$. **Also**, both curves pass through the origin ($r=\sin\theta=0$ at $\theta=0$; $r=1-\sin\theta=0$ at $\theta=\pi/2$), so the origin is a third intersection point not found by the algebra alone.

4. **Rose curve leaf count.** $r=\cos(3\theta)$ traces $3$ leaves as $\theta$ ranges over $[0,\pi)$ — odd $n$ gives $n$ leaves traced once over a $\pi$-range; even $n$ gives $2n$ leaves (curve must be traced over a full $2\pi$ to close up).

**Common mistakes:** Forgetting to check the origin as a possible "hidden" intersection point when two polar curves both pass through it at different $\theta$; sketching $r=f(\theta)$ pointwise without first locating the zeros of $f$ (which tell you the direction(s) of approach to the origin — essential for an accurate sketch); confusing the eccentricity-based polar conic formula's sign convention (a $-\varepsilon\cos\theta$ denominator puts the directrix on the *negative* $x$ side).

## 8.6 Slopes, Areas, and Arc Lengths for Polar Curves

**Tangent direction.** At a point $P=[r,\theta]$ (not the origin) on $r=f(\theta)$, if $\psi$ is the angle between the radius $OP$ and the tangent line:
$$\tan\psi = \frac{f(\theta)}{f'(\theta)} = \frac{r}{dr/d\theta}.$$
In particular $\psi=\pi/2$ (tangent perpendicular to the radius) when $f'(\theta)=0$. If $f(\theta_0)=0$, the tangent line at the origin is simply $\theta=\theta_0$.

For horizontal/vertical tangent points it's usually easier to work directly with $x=f(\theta)\cos\theta$, $y=f(\theta)\sin\theta$ and set $dy/d\theta=0$ (horizontal) or $dx/d\theta=0$ (vertical).

**Area in polar coordinates.** For the region bounded by $r=f(\theta)$ and rays $\theta=\alpha,\theta=\beta$ ($\alpha<\beta$):
$$A = \frac12\int_\alpha^\beta [f(\theta)]^2\,d\theta.$$
For the area **between** two polar curves $r=f(\theta)$ (outer) and $r=g(\theta)$ (inner) on the same angular range:
$$A = \frac12\int_\alpha^\beta \left([f(\theta)]^2-[g(\theta)]^2\right)d\theta.$$

**Arc length element for a polar curve.**
$$ds = \sqrt{\left(\frac{dr}{d\theta}\right)^2+r^2}\,d\theta, \qquad s=\int_\alpha^\beta \sqrt{[f'(\theta)]^2+[f(\theta)]^2}\,d\theta.$$

**Worked Examples**

1. **Horizontal/vertical tangents of the cardioid $r=1+\cos\theta$.** $y=(1+\cos\theta)\sin\theta$: $dy/d\theta = -\sin^2\theta+\cos\theta+\cos^2\theta = 2\cos^2\theta+\cos\theta-1=(2\cos\theta-1)(\cos\theta+1)=0 \Rightarrow \cos\theta=\tfrac12$ or $\cos\theta=-1$. Horizontal tangents at $\theta=\pm\pi/3$ (value $[\tfrac32,\pm\pi/3]$); at $\theta=\pi$, $r=0$ (cusp, no ordinary tangent). $x=(1+\cos\theta)\cos\theta$: $dx/d\theta=-\sin\theta(1+2\cos\theta)=0 \Rightarrow \sin\theta=0$ or $\cos\theta=-\tfrac12$. Vertical tangents at $\theta=0$ (giving $[2,0]$) and $\theta=\pm2\pi/3$ (giving $[\tfrac12,\pm2\pi/3]$).

2. **Area enclosed by the cardioid $r=a(1+\cos\theta)$.** By symmetry, twice the upper half: $A=2\cdot\frac12\int_0^\pi a^2(1+\cos\theta)^2\,d\theta = a^2\int_0^\pi\left(1+2\cos\theta+\frac{1+\cos2\theta}2\right)d\theta = \frac32\pi a^2.$

3. **Area common to $r=\sqrt2\sin\theta$ and $r^2=\sin2\theta$.** They intersect (besides the origin) where $2\sin^2\theta=\sin2\theta=2\sin\theta\cos\theta \Rightarrow \sin\theta=\cos\theta \Rightarrow \theta=\pi/4$. $A = \frac12\int_0^{\pi/4}2\sin^2\theta\,d\theta + \frac12\int_{\pi/4}^{\pi/2}\sin2\theta\,d\theta = \frac\pi8.$

4. **Total arc length of the cardioid $r=a(1+\cos\theta)$.** Using $1+\cos\theta = 2\cos^2(\theta/2)$: $s=2\int_0^\pi\sqrt{a^2\sin^2\theta+a^2(1+\cos\theta)^2}\,d\theta = 4a\int_0^\pi \cos(\theta/2)\,d\theta = 8a.$

**Common mistakes:** Using $dy/dx$-style horizontal/vertical tangent logic directly on $r(\theta)$ instead of converting to $x(\theta),y(\theta)$ first (the condition "$dr/d\theta=0$" does **not** by itself mean horizontal tangent — that's a common trap); forgetting the factor of $\tfrac12$ in the polar area formula; when finding area **between** two polar curves, forgetting to determine which curve is "outer" over which sub-range of $\theta$ (they can swap, requiring the integral to be split, exactly as with Cartesian area-between-curves problems).

## Chapter 8 Review Problems

1. Find the equation of the parabola with focus $(0,-3)$ and directrix $y=3$.
2. Identify the conic $4x^2+9y^2-16x+18y-11=0$ and find its foci.
3. Identify the conic $x^2-y^2+4x-2y=0$ and find its asymptotes.
4. Eliminate the parameter and identify the curve: $x=2+3\cos t,\ y=-1+3\sin t$.
5. Find the points where $x=t^3-3t,\ y=t^2-4$ has a horizontal or vertical tangent.
6. Find the arc length of $x=\cos^3t,\ y=\sin^3t$, $0\le t\le\pi/2$.
7. Find the area enclosed by the ellipse $x=4\cos t,\ y=2\sin t$, $0\le t\le2\pi$, directly from the parametric-area formula (rather than $\pi ab$), and confirm it matches.
8. Convert the polar equation $r=4\sin\theta$ to Cartesian form and identify the curve.
9. Sketch $r=2(1-\sin\theta)$ and state the direction(s) in which the curve enters the origin.
10. Find all intersections of $r=1+\cos\theta$ and $r=3\cos\theta$ (including any at the origin).
11. Find the area inside the circle $r=3\sin\theta$ and outside the cardioid $r=1+\sin\theta$.
12. Find the slope of the tangent line to $r=\theta$ at $\theta=\pi/2$.
13. Find the total arc length of the circle $r=2a\cos\theta$ using the polar arc-length formula, and check it matches $2\pi a$.
14. **Explain why:** the same plane curve can be represented by infinitely many different parametrizations, yet a Cartesian equation $y=f(x)$ (when it exists) is essentially unique. What does this imply about which representation to use when a problem asks for "the" tangent line versus "the" set of points satisfying an equation?
15. **Explain why:** finding intersections of two polar curves by simply solving $f(\theta)=g(\theta)$ can miss valid intersection points, using the cardioid/circle example $r=1+\cos\theta$ and $r=1-\cos\theta$ as an illustration (find their actual intersections, including any at the origin, to support your explanation).

### Solutions

1. Vertex at origin (halfway between focus and directrix), opening downward: from Table 1 with $a=3$: $x^2=-4(3)y=-12y.$

2. Complete the square: $4(x^2-4x)+9(y^2+2y)=11 \Rightarrow 4(x-2)^2+9(y+1)^2 = 11+16+9=36 \Rightarrow \dfrac{(x-2)^2}{9}+\dfrac{(y+1)^2}{4}=1.$ Ellipse, center $(2,-1)$, $a=3,b=2$, $c=\sqrt{9-4}=\sqrt5$, foci at $(2\pm\sqrt5,-1).$

3. Complete the square: $(x^2+4x)-(y^2+2y)=0 \Rightarrow (x+2)^2-4-[(y+1)^2-1]=0 \Rightarrow (x+2)^2-(y+1)^2=3.$ This is $\dfrac{(x+2)^2}{3}-\dfrac{(y+1)^2}{3}=1$ — a rectangular hyperbola centered at $(-2,-1)$ with $a=b=\sqrt3$. Asymptotes: $(x+2)=\pm(y+1)$, i.e. $y=x+1$ and $y=-x-3.$

4. $\left(\dfrac{x-2}{3}\right)^2+\left(\dfrac{y+1}{3}\right)^2=\cos^2t+\sin^2t=1$, so $(x-2)^2+(y+1)^2=9$ — a circle of radius $3$ centered at $(2,-1)$, traversed counterclockwise starting at $(5,-1)$.

5. $f'(t)=3t^2-3=3(t-1)(t+1)$, $g'(t)=2t$. Horizontal tangent where $g'=0,f'\ne0$: $t=0 \Rightarrow (x,y)=(0,-4)$. Vertical tangent where $f'=0,g'\ne0$: $t=\pm1 \Rightarrow (x,y)=(-2,-3)$ and $(2,-3).$

6. $dx/dt=-3\cos^2t\sin t$, $dy/dt=3\sin^2t\cos t$. $ds = 3\cos t\sin t\sqrt{\cos^2t+\sin^2t}\,dt = 3\cos t\sin t\,dt = \frac32\sin2t\,dt$. $s=\int_0^{\pi/2}\frac32\sin2t\,dt = \left[-\frac34\cos2t\right]_0^{\pi/2} = \frac34-(-\frac34)=\frac32.$

7. $x=4\cos t,y=2\sin t$ traversed counterclockwise as $t:0\to2\pi$: $A=-\int_0^{2\pi}y\,\frac{dx}{dt}\,dt = -\int_0^{2\pi}2\sin t(-4\sin t)\,dt = 8\int_0^{2\pi}\sin^2t\,dt = 8\pi.$ Matches $\pi ab = \pi(4)(2)=8\pi.$ ✓

8. Multiply by $r$: $r^2=4r\sin\theta \Rightarrow x^2+y^2=4y \Rightarrow x^2+(y-2)^2=4$ — a circle of radius $2$ centered at $(0,2)$.

9. Table of key values: $r=0$ when $\sin\theta=1$, i.e. $\theta=\pi/2$ — cardioid-shaped curve with cusp pointing in the $\theta=\pi/2$ (i.e., positive $y$-axis) direction but opening downward (since $r=2(1-\sin\theta)$ is maximal, $=4$, at $\theta=-\pi/2$). It enters the origin only in the direction $\theta=\pi/2.$

10. Solve $1+\cos\theta = 3\cos\theta \Rightarrow \cos\theta=\tfrac12 \Rightarrow \theta=\pm\pi/3$, giving $r=3/2$: points $[\tfrac32,\pm\pi/3]$. Check the origin: $r=1+\cos\theta=0$ at $\theta=\pi$; $r=3\cos\theta=0$ at $\theta=\pi/2$. Both curves pass through the origin (at different $\theta$), so the origin is also an intersection point. Total: $\left[\tfrac32,\pm\frac\pi3\right]$ and the origin.

11. First find intersections: $3\sin\theta=1+\sin\theta \Rightarrow \sin\theta=\tfrac12 \Rightarrow \theta=\pi/6,5\pi/6$. On $[\pi/6,5\pi/6]$ the circle $r=3\sin\theta$ is the outer curve (check at $\theta=\pi/2$: circle gives $r=3$, cardioid gives $r=2$ — circle is outer). $A=\frac12\int_{\pi/6}^{5\pi/6}\left[(3\sin\theta)^2-(1+\sin\theta)^2\right]d\theta.$ Expand: $9\sin^2\theta-(1+2\sin\theta+\sin^2\theta) = 8\sin^2\theta-2\sin\theta-1 = 4(1-\cos2\theta)-2\sin\theta-1=3-4\cos2\theta-2\sin\theta$. Integrate: $\left[3\theta-2\sin2\theta+2\cos\theta\right]_{\pi/6}^{5\pi/6}$. At $5\pi/6$: $3(5\pi/6)-2\sin(5\pi/3)+2\cos(5\pi/6) = \frac{5\pi}2 -2(-\frac{\sqrt3}2)+2(-\frac{\sqrt3}2) = \frac{5\pi}2+\sqrt3-\sqrt3=\frac{5\pi}2.$ At $\pi/6$: $3(\pi/6)-2\sin(\pi/3)+2\cos(\pi/6) = \frac\pi2-2\cdot\frac{\sqrt3}2+2\cdot\frac{\sqrt3}2 = \frac\pi2.$ Difference: $\frac{5\pi}2-\frac\pi2=2\pi$. Area $=\frac12(2\pi)=\pi.$

12. $\tan\psi = \dfrac{f(\theta)}{f'(\theta)} = \dfrac{\theta}{1}=\theta$. At $\theta=\pi/2$: $\tan\psi = \pi/2$, so $\psi = \tan^{-1}(\pi/2)$ is the angle between the tangent and the radius line $\theta=\pi/2$ (which is the $y$-axis). The tangent line's actual slope (angle from the $x$-axis) is $\theta+\psi = \pi/2+\tan^{-1}(\pi/2)$; equivalently compute directly via $dy/dx$ using $x=\theta\cos\theta,y=\theta\sin\theta$: at $\theta=\pi/2$, $dx/d\theta=\cos\theta-\theta\sin\theta=-\pi/2$, $dy/d\theta=\sin\theta+\theta\cos\theta=1$, so slope $=\dfrac{dy}{dx}=\dfrac{1}{-\pi/2}=-\dfrac2\pi.$

13. $f(\theta)=2a\cos\theta$, $f'(\theta)=-2a\sin\theta$. $ds=\sqrt{4a^2\sin^2\theta+4a^2\cos^2\theta}\,d\theta = 2a\,d\theta$. Full circle traced as $\theta:0\to\pi$ (period $\pi$ for this circle since it passes through origin at $\theta=\pm\pi/2$): $s=\int_0^\pi 2a\,d\theta = 2\pi a.$ ✓ matches circumference of a circle of radius $a$.

14. A parametrization carries extra information (direction, speed, possibly retracing) beyond the set of points, so many different $(f,g,I)$ triples can trace the identical point-set — e.g., traversing an ellipse clockwise vs. counterclockwise, or at non-constant vs. constant angular speed, gives different parametrizations of the same geometric ellipse. A Cartesian equation $y=f(x)$, by contrast, directly encodes the point set with no extra "how it's traced" data, so (for a given domain) it's essentially the unique description of that set. Practically: when a problem gives you a specific parametrization and asks for "the tangent line at $t=t_0$," you must use that parametrization's $f'(t_0),g'(t_0)$ (Theorem 1) — a different parametrization of the same curve could reach the same point with a different parameter value but must give the *same* geometric tangent line, since slope is a property of the curve, not the parametrization. But quantities like "speed" ($\sqrt{(dx/dt)^2+(dy/dt)^2}$) or "the value of $t$ at a self-intersection" are parametrization-dependent and only make sense once a specific parametrization is fixed.

15. Solving $f(\theta)=g(\theta)$: $1+\cos\theta = 1-\cos\theta \Rightarrow \cos\theta=0 \Rightarrow \theta=\pm\pi/2$, giving intersection points $[1,\pi/2]$ and $[1,-\pi/2]$. But **both cardioids also pass through the origin**: $r=1+\cos\theta=0$ at $\theta=\pi$, and $r=1-\cos\theta=0$ at $\theta=0$ — different $\theta$ values for each curve, so the direct-equation method $f(\theta)=g(\theta)$ never flags the origin as a common point, even though geometrically both curves clearly pass through it (you can see this by sketching: one cardioid has its cusp at $\theta=\pi$, the other at $\theta=0$, both cusps sitting at the pole). So the true intersection set is $\{[1,\pi/2],\ [1,-\pi/2],\ \text{origin}\}$ — three points, not two. This happens because polar coordinates for a single point are not unique (the origin, in particular, is $[0,\theta]$ for *every* $\theta$), so "$f(\theta)=g(\theta)$" only catches intersections that occur at the *same* $\theta$ for both curves, missing any that occur at genuinely different $\theta$ values (most commonly, but not only, at the pole).
