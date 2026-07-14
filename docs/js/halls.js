// The Hall of Accumulation — one masterpiece: the accumulation vessel.
//
// A CLIENT of the simulation. It interprets a hallState; it never computes one.
// The vessel performs the definition of the integral: local cross-sections
// accumulate from the base and, as command grows, refine from discrete slices
// (a coarse Riemann sum) toward one *almost* continuous solid (the limit) —
// never perfectly smooth, so the whole never forgets it came from the parts.
//
// Craft, not tech demo: an ancient hall full of air. The room carries most of the
// feeling; the vessel is small within it. On entry the room is discovered
// gradually — darkness, then the columns, the shaft, the pool, the vessel.
//
// Visual mapping (each visible property ← exactly one semantic variable):
//   accumulationCompleteness → assembly height + slice resolution + rising light
//   boundaryStability        → how crisply the outer profile is defined
//   retentionReliability     → slice stability (low = the faintest drift)
//   unresolvedCracks         → dark gaps in the solid (each = a real category)
//   warmth                   → light colour temperature (spectral, not brightness)
//   lighting                 → shaft / key exposure
//   dust                     → motes, strictly bounded; absence is quiet
//   silence                  → stillness (turntable speed)
//   wisdom (hidden)          → a faint sheen only (coherence, never a score)

(function () {
  const lerp = (a, b, t) => a + (b - a) * t;
  const mixHex = (a, b, t) => {
    const A = [(a >> 16) & 255, (a >> 8) & 255, a & 255], B = [(b >> 16) & 255, (b >> 8) & 255, b & 255];
    return (Math.round(lerp(A[0], B[0], t)) << 16) | (Math.round(lerp(A[1], B[1], t)) << 8) | Math.round(lerp(A[2], B[2], t));
  };
  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const easeOut = (x) => 1 - Math.pow(1 - clamp01(x), 3);
  const H = 2.7;
  const profile = (yn) => 0.34 + 0.52 * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, yn))), 0.85);
  const noise = (i) => { const x = Math.sin(i * 91.37) * 43758.5453; return x - Math.floor(x) - 0.5; };
  // low-frequency, coherent "hand-thrown" variation — evidence of making, not noise
  const craft = (i) => 0.011 * Math.sin(i * 0.7 + 1.3) + 0.006 * Math.sin(i * 1.9 + 0.2);

  function radialTexture(stops) {
    const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s;
    const ctx = cv.getContext('2d');
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(cv);
  }
  const contactShadowTexture = () => radialTexture([[0, 'rgba(0,0,0,0.6)'], [0.6, 'rgba(0,0,0,0.22)'], [1, 'rgba(0,0,0,0)']]);
  const poolTexture = () => radialTexture([[0, 'rgba(255,255,255,0.9)'], [0.4, 'rgba(255,255,255,0.35)'], [1, 'rgba(255,255,255,0)']]);
  const softTexture = () => radialTexture([[0, 'rgba(255,255,255,0.5)'], [0.5, 'rgba(255,255,255,0.14)'], [1, 'rgba(255,255,255,0)']]);

  function buildVessel(state) {
    const g = new THREE.Group();
    const a = state.accumulationCompleteness;
    const bound = state.boundaryStability, warmth = state.warmth, wisdom = state.wisdom || 0;
    const retention = state.retentionReliability, cracks = state.unresolvedCracks || 0;
    const stone = mixHex(0xe8e2d6, 0xf3e9d2, warmth);
    const mat = new THREE.MeshPhongMaterial({ color: stone, shininess: 4 + 24 * wisdom, specular: 0x2a2620, transparent: true, opacity: 1 });
    const shellMat = new THREE.MeshPhongMaterial({ color: stone, transparent: true, opacity: 0.06 + 0.14 * bound, side: THREE.DoubleSide, shininess: 6, depthWrite: false });
    g.userData.fade = [mat, shellMat];   // materials the reveal ramps in

    // the defined-but-empty vessel: a translucent shell = the boundary/scaffolding
    const shellPts = [];
    for (let i = 0; i <= 40; i++) { const yn = i / 40; shellPts.push(new THREE.Vector2(Math.max(0.002, profile(yn) * (1 + (1 - bound) * 0.09 * noise(i) + craft(i))), yn * H)); }
    g.add(new THREE.Mesh(new THREE.LatheGeometry(shellPts, 64), shellMat));
    g.userData.shellBase = shellMat.opacity;

    // the accumulated solid: cross-section slices from the base up to `a`
    const count = Math.max(3, Math.round(5 + a * 39));
    const th = count ? (a * H) / count : 0;
    const crackBands = [];
    for (let k = 0; k < cracks; k++) crackBands.push(Math.floor(((k + 1) / (cracks + 1)) * count));
    for (let i = 0; i < count; i++) {
      if (crackBands.includes(i)) continue;
      const yn = (i + 0.5) / count * a;
      const r = Math.max(0.01, profile(yn) * (1 + (1 - bound) * 0.05 * noise(i * 3 + 1) + craft(i)));
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(r, r, th * 0.86, 56), mat);
      disk.position.set(craft(i * 2) * 0.4 + (1 - retention) * 0.03 * noise(i * 7 + 2), yn * H, (1 - retention) * 0.03 * noise(i * 7 + 5));
      disk.rotation.y = craft(i * 3) * 4;   // faint hand-thrown turn
      g.add(disk);
    }
    g.position.y = -H / 2 + 0.05;
    return g;
  }

  function mount(container, state, opts) {
    opts = opts || {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    container.appendChild(canvas);
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
    catch (e) { return { destroy() { canvas.remove(); }, failed: true }; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070510);
    scene.fog = new THREE.FogExp2(0x070510, 0.05);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
    // the hall breathes between three attention modes (arrival / study / reflection)
    const FRAMINGS = {
      arrival: { pos: [4.6, 2.3, 8.4], look: [0, 0.15, 0] },   // ~90% object: wonder
      study: [3.0, 2.7, 12.6, 0, 1.8, 0],                       // object retreats, upper third
      reflection: { pos: [3.7, 1.95, 7.5], look: [0, 0.25, 0] }, // object returns, changed
    };
    FRAMINGS.study = { pos: [3.0, 2.7, 12.6], look: [0, 1.8, 0] };
    const camPos = new THREE.Vector3().fromArray(FRAMINGS.arrival.pos);
    const camLook = new THREE.Vector3().fromArray(FRAMINGS.arrival.look);
    const tgtPos = camPos.clone(), tgtLook = camLook.clone();
    camera.position.copy(camPos); camera.lookAt(camLook);
    const floorY = -H / 2 + 0.05;
    const warmLight = mixHex(0xd7cdec, 0xffd9a2, state.warmth);

    // reveal system: staged discovery on entry (space → shaft → object). Each item
    // fades between two fractions of the reveal, so the room is found, not shown.
    const anim = [];
    const reg = (s, e, apply) => anim.push({ s, e, apply });

    // --- the room : vast, ancient, full of air --------------------------------
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), new THREE.MeshStandardMaterial({ color: 0x0b0912, roughness: 1, metalness: 0 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = floorY; scene.add(floor);

    const colMat = new THREE.MeshStandardMaterial({ color: 0x161320, roughness: 1, metalness: 0, transparent: true, opacity: 0 });
    const colGeo = new THREE.CylinderGeometry(0.34, 0.4, 18, 20);
    [[-3.6, 0.5], [-3.6, -4.5], [-3.6, -10], [3.6, 0.5], [3.6, -4.5], [3.6, -10]]
      .forEach(([x, z]) => { const m = new THREE.Mesh(colGeo, colMat); m.position.set(x, floorY + 9, z); scene.add(m); });
    reg(0, 0.4, (p) => { colMat.opacity = p; });

    // faint hints of an unseen building — stories never told. A far staircase
    // climbing into darkness, and a high balcony rail. Never explained.
    const hintMat = new THREE.MeshStandardMaterial({ color: 0x120f1c, roughness: 1, metalness: 0, transparent: true, opacity: 0 });
    for (let i = 0; i < 7; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.28, 0.9), hintMat); st.position.set(-8.5, floorY + 0.14 + i * 0.42, -11 - i * 0.55); scene.add(st); }
    const balcony = new THREE.Mesh(new THREE.BoxGeometry(9, 0.12, 0.12), hintMat); balcony.position.set(4, floorY + 5.2, -13); scene.add(balcony);
    reg(0.15, 0.7, (p) => { hintMat.opacity = 0.9 * p; });

    // one impossible shaft of light + a softer outer scatter = air, not fog
    const shaftMat = new THREE.MeshBasicMaterial({ color: warmLight, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 2.1, 12, 32, 1, true), shaftMat);
    shaft.position.set(0, floorY + 5.9, 0); scene.add(shaft);
    const scatterMat = new THREE.MeshBasicMaterial({ color: warmLight, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const scatter = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 3.4, 12, 24, 1, true), scatterMat);
    scatter.position.set(0, floorY + 5.9, 0); scene.add(scatter);
    reg(0.25, 0.65, (p) => { shaftMat.opacity = 0.05 * p; scatterMat.opacity = 0.02 * p; });

    const poolMat = new THREE.MeshBasicMaterial({ map: poolTexture(), color: warmLight, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), poolMat);
    pool.rotation.x = -Math.PI / 2; pool.position.y = floorY + 0.02; scene.add(pool);
    reg(0.3, 0.7, (p) => { poolMat.opacity = (0.26 + 0.28 * state.lighting) * p; });

    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), new THREE.MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, opacity: 0, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = floorY + 0.03; scene.add(shadow);
    reg(0.4, 0.9, (p) => { shadow.material.opacity = p; });

    const arch = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.09, 8, 48, Math.PI), new THREE.MeshStandardMaterial({ color: 0x1c1730, roughness: 1, metalness: 0, transparent: true, opacity: 0 }));
    arch.position.set(0, floorY, -24); scene.add(arch);
    reg(0.2, 0.8, (p) => { arch.material.opacity = 0.9 * p; });

    // --- light : oculus + accumulation rising from within ----------------------
    const key = new THREE.DirectionalLight(warmLight, 0); key.position.set(0.6, 9, 2.6); scene.add(key);
    const hemi = new THREE.HemisphereLight(0x211d38, 0x080610, 0); scene.add(hemi);
    const amb = new THREE.AmbientLight(0x161222, 0); scene.add(amb);
    const acc = new THREE.PointLight(mixHex(0xffc79c, 0xffb072, state.warmth), 0, 6.5, 2);
    acc.position.set(0, floorY + 0.15 + state.accumulationCompleteness * H * 0.55, 0); scene.add(acc);
    const baseKey = 0.42 + 0.6 * state.lighting, baseAcc = 0.3 + 1.2 * state.accumulationCompleteness;
    reg(0.05, 0.5, (p) => { key.intensity = baseKey * p; hemi.intensity = 0.28 * p; amb.intensity = 0.3 * p; });
    reg(0.45, 1, (p) => { acc.intensity = baseAcc * p; });

    // the one object
    let vessel = buildVessel(state); scene.add(vessel);
    reg(0.4, 1, (p) => { vessel.userData.fade.forEach((m) => { m.opacity = (m === vessel.userData.fade[1]) ? vessel.userData.shellBase * p : p; }); });

    // --- air : motes drifting through the whole space, denser in the shaft ------
    const dustN = 60 + Math.round(state.dust * 60);
    const dpos = new Float32Array(dustN * 3);
    for (let i = 0; i < dustN; i++) {
      const inShaft = i < dustN * 0.55; const rr = inShaft ? Math.random() * 1.7 : 1.7 + Math.random() * 3.5; const ang = Math.random() * 6.283;
      dpos[i * 3] = Math.cos(ang) * rr; dpos[i * 3 + 1] = floorY + Math.random() * 6.5; dpos[i * 3 + 2] = Math.sin(ang) * rr;
    }
    const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.Float32BufferAttribute(dpos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xe0d6f0, size: 0.017, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const motes = new THREE.Points(dgeo, dustMat); scene.add(motes);
    reg(0.5, 1, (p) => { dustMat.opacity = 0.28 * p; });

    function resize() { const w = container.clientWidth, h = container.clientHeight || 400; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    resize(); window.addEventListener('resize', resize);

    const spin = reduced ? 0 : (1 - (state.silence != null ? state.silence : 0.9)) * 0.1 + 0.01;
    const revealDur = reduced ? 0.0001 : 5.2;
    let raf = null, running = true, t0 = performance.now();
    function applyReveal(k) { anim.forEach((it) => it.apply(easeOut((k - it.s) / (it.e - it.s)))); }
    function frame() {
      const t = (performance.now() - t0) / 1000;
      applyReveal(clamp01(t / revealDur));
      // ease the camera toward the current mode's framing (the object breathes)
      const k = reduced ? 1 : 0.05;
      camPos.lerp(tgtPos, k); camLook.lerp(tgtLook, k);
      camera.position.copy(camPos); camera.lookAt(camLook);
      vessel.rotation.y = t * spin;
      const p = motes.geometry.attributes.position.array;
      for (let i = 1; i < p.length; i += 3) { p[i] -= 0.001; if (p[i] < floorY) p[i] = floorY + 6.5; }
      motes.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      if (running && !reduced) raf = requestAnimationFrame(frame);
    }
    if (reduced) { applyReveal(1); renderer.render(scene, camera); } else frame();
    const onVis = () => { running = !document.hidden; if (running && !reduced && !raf) raf = requestAnimationFrame(frame); else if (!running && raf) { cancelAnimationFrame(raf); raf = null; } };
    document.addEventListener('visibilitychange', onVis);

    return {
      focus(mode) { const f = FRAMINGS[mode] || FRAMINGS.arrival; tgtPos.fromArray(f.pos); tgtLook.fromArray(f.look); if (reduced) { camPos.copy(tgtPos); camLook.copy(tgtLook); camera.position.copy(camPos); camera.lookAt(camLook); renderer.render(scene, camera); } },
      update(next) {
        scene.remove(vessel); vessel = buildVessel(next); scene.add(vessel);
        acc.position.y = floorY + 0.15 + next.accumulationCompleteness * H * 0.55;
        acc.intensity = 0.3 + 1.2 * next.accumulationCompleteness;
        if (reduced) renderer.render(scene, camera);
      },
      renderOnce() { renderer.render(scene, camera); },
      destroy() { running = false; if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); renderer.dispose(); canvas.remove(); },
    };
  }

  window.HallRenderer = { mount, buildVessel };
})();
