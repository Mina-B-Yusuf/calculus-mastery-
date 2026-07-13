# Chapter 7: Applications of Integration

This chapter is the payoff for all the integration techniques you learned in Calculus 2's first unit — every topic here (volumes, arc length, centroids, work, probability, differential equations) shows up as its own exam question type, and the "set up the integral from a picture" skill it builds is exactly what multivariable calculus will demand next.

## 7.1 Volumes by Slicing — Solids of Revolution

**The big idea.** If a solid $S$ lies between the planes $x=a$ and $x=b$, and the cross-sectional area of $S$ at position $x$ is the continuous function $A(x)$, then

$$V = \int_a^b A(x)\,dx.$$

This comes from cutting $S$ into thin slabs of thickness $\Delta x$, approximating each slab as a cylinder of volume $A(x)\Delta x$, forming a Riemann sum, and passing to the limit. Informally: the **volume element** is $dV = A(x)\,dx$, and $V=\int dV$.

**Solids of revolution.** If $R$ is the region $0\le y\le f(x)$, $a\le x\le b$, and $R$ is rotated about the $x$-axis, the cross section at $x$ is a disk of radius $f(x)$, so $A(x)=\pi[f(x)]^2$ and

$$V=\pi\int_a^b [f(x)]^2\,dx \qquad \text{(disk method)}.$$

If the region between two curves $y=f(x)$ (outer) and $y=g(x)$ (inner), $f\ge g\ge 0$, is rotated about the $x$-axis, you get a **washer**:

$$V=\pi\int_a^b \big([f(x)]^2-[g(x)]^2\big)\,dx.$$

**Cylindrical shells.** If the region $0\le y\le f(x)$, $0\le a<x<b$, is rotated about the $y$-axis instead, it is often easier to use a vertical strip of width $dx$ at position $x$, which sweeps out a thin cylindrical shell of radius $x$, height $f(x)$, and thickness $dx$ (unrolled: a slab of dimensions $2\pi x$ by $f(x)$ by $dx$):

$$dV = 2\pi x f(x)\,dx, \qquad V = 2\pi\int_a^b x f(x)\,dx \qquad \text{(shell method)}.$$

**How to choose.** Build the volume element by rotating an area element (a strip) about the axis.
- Strip **parallel** to the axis of rotation $\Rightarrow$ cylindrical shell.
- Strip **perpendicular** to the axis of rotation $\Rightarrow$ disk/washer.

So a vertical strip ($dx$) rotated about a horizontal line gives disks/washers; rotated about a vertical line gives shells. A horizontal strip ($dy$) rotated about a vertical line gives disks/washers; rotated about a horizontal line gives shells.

**Worked Example 1 (ball via disks).** Find the volume of a ball of radius $a$ by rotating the half-disk $y=\sqrt{a^2-x^2}$, $-a\le x\le a$, about the $x$-axis.

$$V=\pi\int_{-a}^{a}(a^2-x^2)\,dx = 2\pi\int_0^a(a^2-x^2)\,dx = 2\pi\Big[a^2x-\tfrac{x^3}{3}\Big]_0^a=\tfrac{4}{3}\pi a^3.$$

**Worked Example 2 (torus, shells).** A disk of radius $a$ centred at $(b,0)$, $b>a>0$, is rotated about the $y$-axis. Its upper boundary is $f(x)=\sqrt{a^2-(x-b)^2}$ on $b-a\le x\le b+a$. Doubling the upper half-torus volume:

$$V = 4\int_{b-a}^{b+a} x\sqrt{a^2-(x-b)^2}\,dx \xrightarrow{u=x-b} 4\int_{-a}^{a}(u+b)\sqrt{a^2-u^2}\,du = 4b\cdot\tfrac{\pi a^2}{2}=2\pi^2a^2b,$$

since the odd part integrates to $0$ and $\int_{-a}^a\sqrt{a^2-u^2}\,du$ is a semicircle's area. Note $V=(\pi a^2)(2\pi b)$ — area of the disk times distance travelled by its centroid; this generalizes to Pappus's Theorem (Section 7.5).

**Worked Example 3 (rotation about a non-coordinate axis).** The triangle bounded by $y=x$, $y=0$, $x=a>0$ is rotated about the line $x=b>a$. A vertical strip at $x$ has height $x$ and is at radius $b-x$ from the axis, so $dV=2\pi(b-x)x\,dx$:

$$V=2\pi\int_0^a (b-x)x\,dx = 2\pi\Big[\tfrac{bx^2}{2}-\tfrac{x^3}{3}\Big]_0^a = \pi\Big(a^2b-\tfrac{2a^3}{3}\Big).$$

**Worked Example 4 (improper integral volume).** The infinite horn from rotating $y=1/x$, $x\ge 1$, about the $x$-axis:

$$V=\pi\int_1^\infty \frac{dx}{x^2} = \pi\lim_{R\to\infty}\Big[-\tfrac1x\Big]_1^R = \pi.$$

Finite volume even though the generating region has infinite area — Gabriel's horn / "painter's paradox."

> **Common mistakes:** (1) Using the disk formula $\pi\int f^2\,dx$ when the region is *not* bounded below by $y=0$ — you need the washer formula with the correct inner/outer radius measured **from the axis of rotation**, not from $y=0$. (2) Forgetting the factor of $2\pi$ (not $\pi$) in the shell method. (3) Mixing up $dx$ and $dy$ strips — always match the strip orientation to which variable is "free."

## 7.2 More Volumes by Slicing

Not every solid is a solid of revolution. As long as you know the cross-sectional area function $A(x)$ (or $A(z)$, etc.) in planes perpendicular to some axis, $V=\int A\,dx$ still applies — the cross sections need not be circles.

**Pyramids and cones.** Any pyramid or cone (straight-line-based or curved-base) with base area $A$ and height $h$ has

$$V = \tfrac13 Ah,$$

because cross sections parallel to the base at distance $x$ from the vertex are similar to the base, scaled by $(x/h)^2$ in area:
$$V=\int_0^h \Big(\frac{x}{h}\Big)^2 A\,dx = \frac{A}{h^2}\cdot\frac{h^3}{3}=\frac13 Ah.$$

**Worked Example 1 (tent with triangular cross-section).** A tent has a circular base of radius $a$, a ridge bar at height $b$ above a diameter, and every cross-section perpendicular to the ridge is an isosceles triangle. At position $x$ along the diameter the base of the triangle is $2\sqrt{a^2-x^2}$, so $A(x)=b\sqrt{a^2-x^2}$:

$$V=\int_{-a}^{a} b\sqrt{a^2-x^2}\,dx = b\cdot\frac{\pi a^2}{2} = \frac{\pi a^2 b}{2}.$$

**Worked Example 2 (two perpendicular cylinders).** Two cylinders of radius $a$ with perpendicular axes intersect (a classic "Steinmetz solid"). Slicing horizontally at height $z$, the cross section (in the positive octant) is a square of side $\sqrt{a^2-z^2}$, so the full solid (8 octants) has

$$V = 8\int_0^a (a^2-z^2)\,dz = 8\Big[a^2z - \tfrac{z^3}{3}\Big]_0^a = \tfrac{16}{3}a^3.$$

> **Common mistakes:** Forgetting that "cross-sectional area" must be expressed entirely as a function of the slicing variable — mixed variables in $A(x)$ is the most common setup error.

## 7.3 Arc Length and Surface Area

**Arc length.** For $y=f(x)$ with $f'$ continuous on $[a,b]$, approximate the curve by a polygonal path, take the limit of the Riemann sum, and get the **arc length element** $ds=\sqrt{1+(f'(x))^2}\,dx$ (memorize via the differential triangle $(ds)^2=(dx)^2+(dy)^2$):

$$s=\int_a^b \sqrt{1+\big(f'(x)\big)^2}\,dx.$$

If the curve is given as $x=g(y)$, $c\le y\le d$: $\displaystyle s=\int_c^d\sqrt{1+(g'(y))^2}\,dy.$

A curve with finite arc length is **rectifiable**.

**Surface area of revolution.** Rotate the arc-length element $ds$ about an axis; if its radius of rotation is $r$, it sweeps a band of area $dS=2\pi r\,ds$.

$$\text{about the } x\text{-axis:}\quad S=2\pi\int_a^b |f(x)|\sqrt{1+(f'(x))^2}\,dx$$
$$\text{about the } y\text{-axis:}\quad S=2\pi\int_a^b |x|\sqrt{1+(f'(x))^2}\,dx$$

(with analogous formulas for a curve $x=g(y)$). **Always use the true arc-length element $ds$**, never just $dx$ — the error in approximating a slanted band's area by $2\pi|y|\,dx$ is not negligible the way it is for volume elements (see the Remark in the textbook: for slope $1$, actual band width is $\sqrt2\,\Delta x$, not $\Delta x$).

**Worked Example 1.** Length of $y=x^{2/3}$ from $x=1$ to $x=8$: $y'=\tfrac23x^{-1/3}$, so
$$s=\int_1^8\sqrt{1+\tfrac49x^{-2/3}}\,dx=\int_1^8\frac{\sqrt{9x^{2/3}+4}}{3x^{1/3}}\,dx.$$
Let $u=9x^{2/3}+4$, $du=6x^{-1/3}dx$: $s=\tfrac1{18}\int_{13}^{40}u^{1/2}\,du=\tfrac1{27}\big(40\sqrt{40}-13\sqrt{13}\big)$.

**Worked Example 2 (surface area of a sphere).** Rotate $y=\sqrt{a^2-x^2}$ about the $x$-axis. Since $dy/dx=-x/y$, $ds=\sqrt{1+x^2/y^2}\,dx = (a/y)\,dx$ (using $x^2+y^2=a^2$), so
$$S=2\pi\int_{-a}^a y\cdot\frac{a}{y}\,dx = 2\pi\int_{-a}^a a\,dx = 4\pi a^2.$$

**Worked Example 3 (elliptic integral — not every arc length is elementary).** The circumference of the ellipse $x^2/a^2+y^2/b^2=1$ reduces to
$$s=4a\int_0^{\pi/2}\sqrt{1-\varepsilon^2\sin^2t}\,dt = 4aE(\varepsilon), \qquad \varepsilon=\frac{\sqrt{a^2-b^2}}{a},$$
the **complete elliptic integral of the second kind**, which cannot be evaluated in elementary closed form — it must be looked up or computed numerically. This is a good illustration that arc-length integrals often are not "nice."

> **Common mistakes:** Forgetting the square root, or using $2\pi\int y\,dx$ (a volume-style shortcut) instead of $2\pi\int y\,ds$ for surface area. Also, sign errors when $f(x)<0$: use $|f(x)|$ or $|x|$ as the radius.

## 7.4 Mass, Moments, and Centre of Mass

**Mass from density.** If density $\rho(x)$ (line density $\delta$, or areal density $\sigma$) is continuous, mass is the integral of $dm=\rho\,dV$ (or $\delta\,dx$, or $\sigma\,dA$).

**Moments and centre of mass (1-D).** The moment about $x=0$ of mass $m$ at position $x$ is $xm$. For a continuum on $[a,b]$ with line density $\delta(x)$:

$$M_{x=0}=\int_a^b x\,\delta(x)\,dx,\qquad m=\int_a^b \delta(x)\,dx, \qquad \bar x = \frac{M_{x=0}}{m}.$$

**Two/three dimensions.** For a plate occupying $a\le x\le b$, $0\le y\le f(x)$ with density $\rho(x)$ (depending only on $x$):

$$m=\int_a^b \rho(x) f(x)\,dx,\quad M_{x=0}=\int_a^b x\rho(x)f(x)\,dx,\quad M_{y=0}=\frac12\int_a^b \rho(x)\big[f(x)\big]^2\,dx,$$

and $\bar x = M_{x=0}/m$, $\bar y = M_{y=0}/m$. The $\tfrac12[f(x)]^2$ factor arises because a vertical strip of constant-density material has its own centre of mass at the strip's *midpoint* height $\tfrac12 f(x)$; its moment about $y=0$ is $\tfrac12 f(x)\cdot dm$. In three dimensions, define $M_{x=0}, M_{y=0}, M_{z=0}$ analogously and $\bar x=M_{x=0}/m$, etc.

**Worked Example 1 (wire).** A wire on $[0,L]$ has line density $\delta(x)=kx$. Then $m=\int_0^L kx\,dx = kL^2/2$, $M_{x=0}=\int_0^L kx^2\,dx=kL^3/3$, so $\bar x = 2L/3$ — the wire balances two-thirds of the way along.

**Worked Example 2 (hemisphere with depth-dependent density).** A solid hemisphere of radius $R$ has density $\rho_0 z$ at height $z$ above its base. A disk slice at height $z$ has radius $\sqrt{R^2-z^2}$, so $dV=\pi(R^2-z^2)\,dz$, $dm=\rho_0 z(R^2-z^2)\pi\,dz$:
$$m=\pi\rho_0\int_0^R(R^2z-z^3)\,dz=\tfrac{\pi}{4}\rho_0R^4,\quad M_{z=0}=\pi\rho_0\int_0^R(R^2z^2-z^4)\,dz=\tfrac{2\pi}{15}\rho_0R^5,$$
$$\bar z = \frac{2\pi\rho_0R^5/15}{\pi\rho_0R^4/4}=\frac{8R}{15}.$$

**Worked Example 3 (planet, spherical shells).** Density $\rho(r)=\rho_0/(1+r^2)$ for a planet of radius $R$. Using spherical shells $dV=4\pi r^2\,dr$:
$$m=4\pi\rho_0\int_0^R \frac{r^2}{1+r^2}\,dr = 4\pi\rho_0\int_0^R\Big(1-\frac{1}{1+r^2}\Big)dr = 4\pi\rho_0\big(R-\tan^{-1}R\big).$$

> **Common mistakes:** (1) Using $f(x)$ instead of $\tfrac12[f(x)]^2$ for $M_{y=0}$ of a plate (forgetting the strip's own centroid height). (2) Sign errors when the region is not entirely above the axis — moments can be negative. (3) Trying to handle density that depends on $y$ while integrating a $dx$ strip; this generally needs the region reparametrized (or double integrals, outside this chapter's scope).

## 7.5 Centroids

When density is constant, it cancels out of $\bar x,\bar y$ formulas — the resulting point depends only on the **shape**, and is called the **centroid**. Compute centroids with the mass-of-region formulas above, setting density $\equiv 1$ (so "mass" becomes length, area, or volume).

**Centroid of a standard plane region** $a\le x\le b$, $0\le y\le f(x)$:
$$\bar x = \frac{M_{x=0}}{A}, \quad \bar y=\frac{M_{y=0}}{A}, \qquad A=\int_a^b f(x)\,dx,\ \ M_{x=0}=\int_a^b xf(x)\,dx,\ \ M_{y=0}=\tfrac12\int_a^b[f(x)]^2\,dx.$$

**Theorem (Centroid of a triangle).** The centroid of a triangle is the intersection point of its three medians, and its coordinates are the averages of the three vertices' coordinates:
$$(\bar x,\bar y)=\Big(\frac{x_1+x_2+x_3}{3},\ \frac{y_1+y_2+y_3}{3}\Big).$$

**Composite regions.** If a region is a union of nonoverlapping pieces, moments (and hence $A\bar x$, $A\bar y$) simply add: $M_{x=0}=\sum_i A_i\bar x_i$, etc.

**Theorem (Pappus's Theorem).**
(a) If a plane region $R$ lies entirely on one side of a line $L$ in its plane and is rotated about $L$, the volume generated is
$$V = 2\pi\bar r A,$$
where $A$ is the area of $R$ and $\bar r$ is the distance from the centroid of $R$ to $L$.
(b) If a plane curve $C$ lies on one side of $L$ and is rotated about $L$, the surface area generated is
$$S = 2\pi\bar r s,$$
where $s$ is the arc length of $C$ and $\bar r$ is the distance from the centroid of $C$ to $L$.

Pappus's Theorem is powerful in **both directions**: use it to find a volume/area when you know a centroid, or to find a centroid when you know a volume/area (e.g., recovering the centroid of a semicircle from the known surface area of a sphere).

**Worked Example 1 (centroid of a half-disk).** For $-a\le x\le a$, $0\le y\le\sqrt{a^2-x^2}$: by symmetry $\bar x=0$; $A=\tfrac12\pi a^2$, and
$$M_{y=0}=\tfrac12\int_{-a}^a (a^2-x^2)\,dx = \tfrac12\cdot\tfrac{4}{3}a^3=\tfrac23a^3 \ \Rightarrow\ \bar y = \frac{2a^3/3}{\pi a^2/2}=\frac{4a}{3\pi}.$$

**Worked Example 2 (centroid of a semicircular arc, via arc length).** The semicircle $y=\sqrt{a^2-x^2}$ has $\bar x=0$ and, using $ds=a\,dx/\sqrt{a^2-x^2}$,
$$M_{y=0}=\int_{-a}^a y\,ds = \int_{-a}^a a\,dx = 2a^2, \qquad \bar y = \frac{2a^2}{\pi a}=\frac{2a}{\pi}.$$
Note this differs from the half-disk's centroid — a curve's centroid is not the same as its enclosed region's centroid, and it need not lie on the curve.

**Worked Example 3 (Pappus for the torus).** Rotating a disk of radius $a$ centred at $(b,0)$ about the $y$-axis, centroid at distance $\bar r=b$: $V=2\pi b(\pi a^2)=2\pi^2a^2b$ and, rotating just the boundary circle (length $2\pi a$), $S=2\pi b(2\pi a)=4\pi^2ab$ — matching the direct-integration results of Section 7.1 with far less work.

> **Common mistakes:** (1) Confusing the centroid of a *region* (area) with the centroid of its *boundary curve* (arc length) — they're different objects with different formulas. (2) Applying Pappus's Theorem when the region crosses the axis of rotation (it must lie entirely on one side). (3) Forgetting to use the *sum of moments* (not the sum of centroids) when combining composite shapes.

## 7.6 Other Physical Applications

**Hydrostatic pressure and force.** Pressure at depth $h$ in a fluid of density $\rho$ is $p=\rho g h$ (Pascal's principle: acts equally in all directions). For a submerged plate, slice into horizontal strips of area $dA$ at depth $h$; the force element is
$$dF = \rho g h\,dA, \qquad F=\int \rho g h\,dA.$$

**Worked Example 1 (semicircular trough end).** A vertical semicircular plate of radius $R$, curved edge down, full to the top. Strip at depth $h$ has width $2\sqrt{R^2-h^2}$:
$$F=\int_0^R \rho g h\cdot 2\sqrt{R^2-h^2}\,dh \xrightarrow{u=R^2-h^2} \rho g\int_0^{R^2}\sqrt u\,du = \tfrac23\rho g R^3.$$

**Worked Example 2 (inclined dam face).** For a dam face inclined at angle $\theta$ to the vertical, a horizontal layer of thickness $dh$ meets the dam along a slanted strip of width $dh\sec\theta$, so $dF=\rho g h\,(L\sec\theta)\,dh$ where $L$ is the dam's length — just an extra $\sec\theta$ factor compared to a vertical wall.

**Work.** For a variable force $F(x)$ along the $x$-axis moving an object from $x=a$ to $x=b$: $W=\int_a^b F(x)\,dx$.

- **Hooke's Law:** $F(x)=kx$ for a spring stretched/compressed a distance $x$; $W=\int_0^d kx\,dx=\tfrac12kd^2$.
- **Pumping liquid out of a tank:** slice the liquid into horizontal disks/washers at height $h$, find $dV$, then $dF=\rho g\,dV$ is the weight of that slice, and the work to lift it a distance $(H-h)$ (to the rim at height $H$) is $dW=\rho g(H-h)\,dV$.
- **Gravitational work against an inverse-square force:** $F(h)=Km/(R+h)^2$; work to raise mass $m$ from the surface to height $H$ is $W=Km\left(\frac1R-\frac1{R+H}\right)$; to infinite height, $W=Km/R$.

**Potential and kinetic energy; conservation of energy.** Work done *against* a (variable, position-dependent) force $F(x)$ moving an object from $a$ to $b$ is stored as potential energy:
$$\text{P.E.} = -\int_a^b F(x)\,dx, \qquad \text{K.E.}=\tfrac12mv^2.$$
Using Newton's Second Law ($F=m\,dv/dt = mv\,dv/dx$), one shows
$$\text{P.E.}(b)+\text{K.E.}(b) = \text{P.E.}(a)+\text{K.E.}(a)$$
— the **Law of Conservation of Energy** — whenever $F$ depends only on position (a **conservative force**).

**Worked Example 3 (escape velocity).** With $F=Km/(R+h)^2$ and $F=mg$ at $h=0$, we get $K=gR^2$. Conservation of energy requires $\tfrac12mv^2\ge Km/R=gRm$, so
$$v\ge\sqrt{2gR}\approx\sqrt{2(9.8)(6.4\times10^6)}\approx 1.12\times10^4\text{ m/s}\approx 11.2\text{ km/s},$$
independent of the projectile's mass.

> **Common mistakes:** (1) In pumping problems, forgetting that the distance lifted depends on the slice's height, not a constant — every slice travels a *different* distance to the rim. (2) Sign errors in P.E. — the minus sign in $\text{P.E.}=-\int F\,dx$ exists precisely so that work done *against* $F$ gives positive stored energy. (3) In hydrostatic problems, using vertical depth instead of the true slant width when the surface is inclined.

## 7.7 Applications in Business, Finance, and Ecology

**Marginal quantities.** If $f'(x)$ (a "marginal" rate, e.g. marginal revenue/cost) is known, then $f(b)-f(a)=\int_a^b f'(x)\,dx$ recovers the total change.

**Worked Example 1 (revenue from marginal revenue).** Marginal revenue is $15-5e^{-x/50}$ dollars per calculator after $x$ have been sold. Total revenue from the first $100$:
$$R=\int_0^{100}\big(15-5e^{-x/50}\big)dx = \Big[15x+250e^{-x/50}\Big]_0^{100} = 1500+250e^{-2}-250\approx \$1{,}284.$$

**Present value of a continuous income stream.** With continuously compounded discount rate $\delta=r/100$, a payment of \$1 received $t$ years from now is worth $e^{-\delta t}$ today. If income arrives at rate $P(t)$ dollars/year over $[0,T]$:
$$V=\int_0^T e^{-\delta t}P(t)\,dt.$$

**Worked Example 2 (perpetual constant stream).** Income at constant rate \$10,000/year forever, discount rate 6%:
$$V=\int_0^\infty e^{-0.06t}(10{,}000)\,dt = \lim_{R\to\infty}\frac{10{,}000}{-0.06}e^{-0.06t}\Big|_0^R = \frac{10{,}000}{0.06}\approx \$166{,}667.$$

**Renewable-resource economics (logistic harvesting).** A population with logistic growth $dx/dt=kx(1-x/L)$, harvested at rate $h(t)$, satisfies $dx/dt = kx(1-x/L)-h(t)$. Harvesting exactly at the growth rate keeps the population constant; annual income $T=pkx(1-x/L)$ is maximized (as a function of $x$) at $x=L/2$. Accounting for a continuous discount rate $\delta$ on future income changes the income-maximizing equilibrium population to
$$x^* = \frac{(k-\delta)L}{2k},$$
which is *smaller* than $L/2$ — a higher discount rate pushes the "optimal" population down, and if $\delta\ge k$ the model perversely recommends harvesting the resource to extinction immediately. (This is a classic illustration of how naive economic optimization can conflict with sustainability.)

> **Common mistakes:** Confusing "marginal" (a derivative/rate) with "total" (an integral of the rate) — always integrate the marginal function to recover totals. Also, forgetting the discount factor $e^{-\delta t}$ turns an ordinary "area under the rate curve" total into a *present value*, generally a smaller number.

## 7.8 Probability

**Sample spaces and events.** An **experiment** has a **sample space** $S$ of possible outcomes; an **event** is a subset of $S$. Basic rules: $0\le \Pr(A)\le1$, $\Pr(\varnothing)=0$, $\Pr(S)=1$, $\Pr(A^c)=1-\Pr(A)$, $\Pr(A\cup B)=\Pr(A)+\Pr(B)-\Pr(A\cap B)$.

**Discrete random variables.** A random variable $X$ has probability function $f(x)=\Pr(X=x)$ with $\sum_x f(x)=1$.

**Definition (Mean/Expectation).** $\displaystyle \mu = E(X)=\sum_{x\in R} x f(x)$; more generally $E(g(X))=\sum_x g(x)f(x)$.

**Definition (Variance and standard deviation).** $\displaystyle \sigma^2=\text{Var}(X)=E\big[(X-\mu)^2\big]=\sum_x (x-\mu)^2f(x)$, and $\sigma=\sqrt{\text{Var}(X)}$. Equivalent computational formula (expand the square):
$$\sigma^2 = E(X^2)-\mu^2.$$

**Worked Example 1 (sum of two dice).** $X=$ sum of two fair dice, $2\le X\le 12$. Direct computation gives $\mu=E(X)=7$ and $E(X^2)=1974/36\approx54.83$, so $\sigma^2\approx5.83$, $\sigma\approx2.42$.

**Continuous random variables.** A **probability density function** $f$ on $[a,b]$ satisfies $f\ge0$ and $\int_a^b f(x)\,dx=1$; then $\Pr(x_1\le X\le x_2)=\int_{x_1}^{x_2}f(x)\,dx$.

$$\mu=E(X)=\int_a^b xf(x)\,dx, \qquad \sigma^2=E(X^2)-\mu^2=\int_a^b x^2f(x)\,dx-\mu^2.$$

**Uniform distribution** on $[a,b]$: $f(x)=1/(b-a)$; $\mu=(a+b)/2$, $\sigma=(b-a)/(2\sqrt3)$.

**Exponential distribution** on $[0,\infty)$: $f(x)=ke^{-kx}$ ($k>0$); $\mu=\sigma=1/k$. (Common model: time between radioactive decays or equipment failures; $\Pr(T\le t)=1-e^{-kt}$.)

**Definition (Standard normal distribution).**
$$f(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2}, \qquad -\infty<z<\infty,$$
with mean $0$ and standard deviation $1$. (The normalizing constant comes from $\int_{-\infty}^\infty e^{-z^2/2}\,dz=\sqrt{2\pi}$, proved via double integrals in multivariable calculus, not elementary methods.)

**Definition (General normal distribution).** $X$ is normal with mean $\mu$, standard deviation $\sigma$ if
$$f_{\mu,\sigma}(x) = \frac1\sigma f\Big(\frac{x-\mu}\sigma\Big) = \frac1{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}.$$
Standardize via $Z=(X-\mu)/\sigma$, then use the tabulated **cumulative distribution function**
$$F(z)=\Pr(Z\le z)=\frac1{\sqrt{2\pi}}\int_{-\infty}^z e^{-t^2/2}\,dt$$
(values found in a standard normal table, or via the error function $F(z)=\tfrac12\big(\operatorname{erf}(z/\sqrt2)+1\big)$).

**Worked Example 2 (normal probability calculation).** $X\sim$ Normal($\mu=2,\sigma=0.4$). Find $\Pr(1.8\le X\le 2.4)$. Standardize: $Z=(X-2)/0.4$, so this is $\Pr(-0.5\le Z\le1) = F(1)-F(-0.5)\approx 0.841-0.309=0.532$.

**Worked Example 3 (density normalization + probability).** For what $C$ is $f(x)=C(1-x^2)$ a density on $[-1,1]$? Need $\int_{-1}^1 C(1-x^2)\,dx=1\Rightarrow C\cdot\tfrac43=1\Rightarrow C=\tfrac34$. Then $\Pr(X\le\tfrac12)=\tfrac34\int_{-1}^{1/2}(1-x^2)\,dx=\tfrac{27}{32}$.

**Remark (heavy tails).** Not every important density has finite mean/variance — the **Cauchy distribution** $C(x)=\dfrac{1}{\pi}\cdot\dfrac{\gamma}{(x-\mu)^2+\gamma^2}$ has neither, because its tails decay only like $|x|^{-2}$ (versus the normal's much faster exponential decay). Such "heavy-tailed" distributions matter in physics (Lorentz/Breit–Wigner line shapes) and in finance/risk (Nassim Taleb's "Black Swan" events).

> **Common mistakes:** (1) Forgetting to normalize a candidate density (solve for $C$ so the total integral is $1$) before computing probabilities. (2) Using $\sigma^2=E(X^2)$ instead of $E(X^2)-\mu^2$. (3) Forgetting to standardize ($Z=(X-\mu)/\sigma$) before looking up normal-table values. (4) Confusing a discrete probability *function* (values, sum $=1$) with a continuous probability *density* (heights, area $=1$) — $\Pr(X=x)=0$ for any continuous $X$ at a single point.

## 7.9 First-Order Differential Equations

**Separable equations.** $\dfrac{dy}{dx}=f(x)g(y)$ is solved by separating: $\dfrac{dy}{g(y)}=f(x)\,dx$, then integrating both sides. Watch for constant solutions $y=C$ where $g(C)=0$ — these can be lost by the separation step and must be checked separately.

**Worked Example 1 (logistic equation).** $\dfrac{dy}{dt}=ky\big(1-\tfrac{y}{L}\big)$. Separate: $\dfrac{L\,dy}{y(L-y)}=k\,dt$; partial fractions give $\big(\tfrac1y+\tfrac1{L-y}\big)dy = k\,dt$, so $\ln\dfrac{y}{L-y}=kt+C$, giving
$$y(t) = \frac{C_1Le^{kt}}{1+C_1e^{kt}}.$$

**Worked Example 2 (initial-value problem).** Solve $dy/dx = x^2y^3$, $y(1)=3$. Separate: $y^{-3}\,dy=x^2\,dx \Rightarrow -\tfrac1{2y^2}=\tfrac{x^3}3+C$. Using $y(1)=3$: $-\tfrac1{18}=\tfrac13+C\Rightarrow C=-\tfrac{7}{18}$. Solve for $y$: $y=3/\sqrt{7-6x^3}$ (positive root, matching $y(1)=3$).

**Worked Example 3 (mixing problem).** A 1000 L tank starts with 50 kg salt; brine at 10 g/L enters at 10 L/min, well-mixed solution leaves at 10 L/min. With $x(t)=$ kg of salt at time $t$:
$$\frac{dx}{dt} = \underbrace{\tfrac{1}{10}}_{\text{in}} - \underbrace{\tfrac{x}{100}}_{\text{out}} = \frac{10-x}{100}.$$
Separating and using $x(0)=50$: $x(t)=10+40e^{-t/100}$; at $t=40$, $x\approx10+40e^{-0.4}\approx36.8$ kg.

**Orthogonal trajectories.** A family of curves satisfying a differential equation $dy/dx=F(x,y)$ has orthogonal trajectories satisfying $dy/dx=-1/F(x,y)$ (negative reciprocal slope), often producing another separable equation. Example: the parabolas $y=Cx^2$ satisfy $dy/dx=2y/x$; orthogonal curves satisfy $dy/dx=-x/(2y)$, giving the family of ellipses $x^2+2y^2=C$.

**First-order linear equations.** The standard form is
$$\frac{dy}{dx}+p(x)y=q(x).$$
Let $\rho(x)=\int p(x)\,dx$ (any antiderivative). The **integrating factor** is $e^{\rho(x)}$, chosen so that
$$\frac{d}{dx}\Big(e^{\rho(x)}y\Big) = e^{\rho(x)}\Big(\frac{dy}{dx}+p(x)y\Big) = e^{\rho(x)}q(x).$$
Then
$$y(x) = e^{-\rho(x)}\int e^{\rho(x)}q(x)\,dx.$$
(An equivalent method, **variation of parameters**, starts from the homogeneous solution $y=Ke^{-\rho(x)}$, replaces $K$ by an unknown function $k(x)$, substitutes back, and solves the resulting simpler equation $k'(x)=e^{\rho(x)}q(x)$ for $k$.)

**Worked Example 4.** Solve $\dfrac{dy}{dx}+\dfrac{y}{x}=1$ for $x>0$. Here $p(x)=1/x$, $\rho(x)=\ln x$, integrating factor $e^{\rho}=x$:
$$\frac{d}{dx}(xy)=x \ \Rightarrow\ xy=\frac{x^2}2+C \ \Rightarrow\ y=\frac{x}2+\frac{C}{x}.$$

**Worked Example 5 (RL circuit).** $L\dfrac{dI}{dt}+RI=V$, $I(0)=0$. Integrating factor $e^{Rt/L}$ gives
$$I(t) = \frac{V}{R}\Big(1-e^{-Rt/L}\Big) \xrightarrow{t\to\infty} \frac{V}{R}.$$
Time to reach 90% of the steady-state current: solve $1-e^{-Rt/L}=0.9\Rightarrow t=\dfrac{L\ln10}{R}$.

> **Common mistakes:** (1) In separable equations, dividing by $g(y)$ without checking for lost constant solutions $g(y)=0$. (2) In linear equations, forgetting that the integrating factor multiplies *both* sides, not just the left. (3) Sign errors in $\rho(x)=\int p(x)\,dx$ — a wrong sign flips the exponential growth/decay direction entirely. (4) Forgetting the constant of integration and then being unable to satisfy the initial condition.

---

## Chapter 7 Review Problems

1. A solid has a circular base of radius $2$, and every cross-section perpendicular to a fixed diameter is a square. Find its volume.
2. Find the volume of the solid generated by rotating the region bounded by $y=\sqrt{x}$, $y=0$, $x=4$ about the $x$-axis.
3. Find the volume of the solid generated by rotating the region bounded by $y=x^2$ and $y=2x$ about the $y$-axis, using shells.
4. Find the length of the curve $y=\frac{2}{3}x^{3/2}$ from $x=0$ to $x=3$.
5. Find the area of the surface generated by rotating $y=\sqrt{x}$, $1\le x\le 4$, about the $x$-axis.
6. Find the centroid of the region bounded by $y=4-x^2$ and $y=0$.
7. Use Pappus's Theorem to find the volume generated when the disk $(x-5)^2+y^2\le 4$ is rotated about the $y$-axis.
8. A vertical dam gate is a rectangle 6 m wide and 4 m tall, with its top edge at the water surface. Find the total hydrostatic force on the gate.
9. A spring has natural length 20 cm; a force of 30 N stretches it to 25 cm. Find the work done to stretch it from 20 cm to 30 cm.
10. Find the present value of a continuous income stream of $\$5000$/year for 20 years at a continuously compounded discount rate of 8%.
11. A random variable $X$ has density $f(x)=Cx^2$ on $[0,2]$. Find $C$, the mean, and the variance.
12. $X$ is normally distributed with mean 100 and standard deviation 15 (e.g., an IQ score). Find $\Pr(X>130)$ using $F(2)\approx0.977$.
13. Solve the initial-value problem $\dfrac{dy}{dx}=\dfrac{2xy}{1+x^2}$, $y(0)=3$.
14. Solve $\dfrac{dy}{dx}+2y=e^{-x}$.
15. **Conceptual:** Explain why the surface-area-of-revolution formula requires the arc-length element $ds=\sqrt{1+(f')^2}\,dx$ rather than simply $dx$, while the volume-of-revolution (disk) formula can safely use the "sloppy" cylindrical approximation with thickness $dx$. What is different about how the error behaves in each case?

### Solutions

**1.** Cross section at position $x$ (with $-2\le x\le2$) is a square whose side equals the chord length $2\sqrt{4-x^2}$, so $A(x)=4(4-x^2)$.
$$V=\int_{-2}^2 4(4-x^2)\,dx = 4\Big[4x-\tfrac{x^3}3\Big]_{-2}^2 = 4\Big(2\big[8-\tfrac83\big]\Big)=4\cdot\tfrac{32}{3}=\tfrac{128}{3}.$$

**2.** Disks: $V=\pi\int_0^4 (\sqrt x)^2\,dx=\pi\int_0^4 x\,dx = \pi\cdot 8 = 8\pi.$

**3.** Curves meet where $x^2=2x\Rightarrow x=0,2$; on $[0,2]$, $2x\ge x^2$. Shell radius $x$, height $2x-x^2$:
$$V=2\pi\int_0^2 x(2x-x^2)\,dx = 2\pi\int_0^2(2x^2-x^3)\,dx = 2\pi\Big[\tfrac{2x^3}3-\tfrac{x^4}4\Big]_0^2 = 2\pi\Big(\tfrac{16}3-4\Big)=2\pi\cdot\tfrac43=\tfrac{8\pi}{3}.$$

**4.** $y'=x^{1/2}$, so $1+(y')^2=1+x$.
$$s=\int_0^3\sqrt{1+x}\,dx = \Big[\tfrac23(1+x)^{3/2}\Big]_0^3 = \tfrac23\big(4^{3/2}-1\big)=\tfrac23(8-1)=\tfrac{14}{3}.$$

**5.** $y=\sqrt x$, $y'=\tfrac1{2\sqrt x}$, so $1+(y')^2=1+\tfrac1{4x}=\tfrac{4x+1}{4x}$.
$$S=2\pi\int_1^4\sqrt x\cdot\sqrt{\tfrac{4x+1}{4x}}\,dx = 2\pi\int_1^4 \tfrac12\sqrt{4x+1}\,dx = \pi\int_1^4\sqrt{4x+1}\,dx.$$
Let $u=4x+1$, $du=4\,dx$: $=\dfrac{\pi}{4}\cdot\dfrac23 u^{3/2}\Big|_5^{17} = \dfrac{\pi}{6}\big(17^{3/2}-5^{3/2}\big)\approx\dfrac{\pi}{6}(70.09-11.18)\approx 30.84.$

**6.** By symmetry $\bar x=0$. $A=\int_{-2}^2(4-x^2)\,dx=\big[4x-\tfrac{x^3}3\big]_{-2}^2 = \tfrac{32}3.$

The integrand of $M_{y=0}=\tfrac12\int_{-2}^2(4-x^2)^2\,dx$ is even, so use the shortcut $\int_{-2}^2=2\int_0^2$:
$$M_{y=0}=\int_0^2(16-8x^2+x^4)\,dx = \Big[16x-\tfrac83x^3+\tfrac15x^5\Big]_0^2=32-\tfrac{64}3+\tfrac{32}5=\tfrac{480-320+96}{15}=\tfrac{256}{15}.$$
So $\bar y = \dfrac{256/15}{32/3}=\dfrac{256}{15}\cdot\dfrac{3}{32}=\dfrac{8}{5}$. Centroid: $(0,\ 8/5)$.

**7.** Disk of radius $2$ centred at $(5,0)$, rotated about $y$-axis: centroid distance $\bar r=5$, area $A=4\pi$.
$$V=2\pi \bar r A = 2\pi(5)(4\pi)=40\pi^2.$$

**8.** Water surface at the top; strip at depth $h$ ($0\le h\le4$) has width 6 m: $dF=\rho g h\cdot 6\,dh$, $\rho g=9800$ N/m³.
$$F=9800\cdot6\int_0^4 h\,dh = 58800\cdot\tfrac{16}2=58800\cdot8=470{,}400\text{ N}\approx 4.70\times10^5\text{ N}.$$

**9.** $F(x)=kx$; $F(5)=30\Rightarrow k=6$ N/cm. Work to stretch from $0$ to $10$ cm past natural length:
$$W=\int_0^{10}6x\,dx = 3x^2\Big|_0^{10}=300\text{ N}\cdot\text{cm}=3\text{ N}\cdot\text{m}=3\text{ J}.$$

**10.** $V=\int_0^{20} e^{-0.08t}(5000)\,dt = 5000\Big[\dfrac{e^{-0.08t}}{-0.08}\Big]_0^{20}=\dfrac{5000}{0.08}\big(1-e^{-1.6}\big)\approx 62500(1-0.2019)\approx \$49{,}881.$

**11.** Need $\int_0^2 Cx^2\,dx=1\Rightarrow C\cdot\tfrac83=1\Rightarrow C=\tfrac38$.
$$\mu=\int_0^2 x\cdot\tfrac38x^2\,dx=\tfrac38\cdot\tfrac{16}4=\tfrac38\cdot4=\tfrac32.$$
$$E(X^2)=\int_0^2 x^2\cdot\tfrac38x^2\,dx=\tfrac38\int_0^2x^4\,dx=\tfrac38\cdot\tfrac{32}5=\tfrac{12}5.$$
$$\sigma^2 = \tfrac{12}5-\Big(\tfrac32\Big)^2=\tfrac{12}5-\tfrac94=\tfrac{48-45}{20}=\tfrac{3}{20}=0.15.$$

**12.** $Z=(130-100)/15=2$. $\Pr(X>130)=1-F(2)\approx1-0.977=0.023$ (about 2.3%).

**13.** Separate: $\dfrac{dy}{y}=\dfrac{2x\,dx}{1+x^2}$. Integrate: $\ln|y|=\ln(1+x^2)+C$, so $y=A(1+x^2)$. Using $y(0)=3$: $A=3$. So $y=3(1+x^2)$.

**14.** Linear, $p(x)=2$, $\rho(x)=2x$, integrating factor $e^{2x}$:
$$\frac{d}{dx}\big(e^{2x}y\big)=e^{2x}\cdot e^{-x}=e^{x} \ \Rightarrow\ e^{2x}y = e^x+C \ \Rightarrow\ y=e^{-x}+Ce^{-2x}.$$

**15.** For the disk/washer volume, the error in approximating a slice's volume by a cylinder $A(x)\,\Delta x$ is small **relative to the size of the volume element itself** (it is $o(\Delta x)$), so the Riemann-sum limit converges to $\int A\,dx$ without needing to track the curve's slope. For surface area, approximating a band of the surface by $2\pi y\,\Delta x$ (a flat cylindrical band of width $\Delta x$) is *not* asymptotically accurate when the curve has nonzero slope: the true slanted band has width $\Delta s=\sqrt{1+(y')^2}\,\Delta x > \Delta x$, and this discrepancy does **not** vanish relative to the band's own area as $\Delta x\to0$ — it's a fixed multiplicative factor $\sqrt{1+(y')^2}$. So surface-area elements must be built from the true arc-length element $ds$, while volume elements tolerate the flat cylindrical approximation.
