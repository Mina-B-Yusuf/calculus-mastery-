// The World — a real 3D environment you arrive in, not a page you open.
// Built on Three.js (vendored offline). Stage 1: the Arrival — a floating
// observatory above the clouds that the camera approaches as the lights come on.
// The DOM (greeting, journey, Continue) composites on top of this canvas.
//
// Honours prefers-reduced-motion (settles immediately, no drift) and degrades to
// the classic 2D home when WebGL/THREE is unavailable.

(function () {
  const V = 0xb79af0, P = 0xeaa6cb, WARM = 0xf0c6a0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function available() {
    if (!window.THREE) return false;
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch (e) { return false; }
  }

  // radial glow sprite texture (fakes bloom without a post pipeline)
  let glowTex = null;
  function glowTexture() {
    if (glowTex) return glowTex;
    const s = 128, cv = document.createElement('canvas'); cv.width = cv.height = s;
    const g = cv.getContext('2d').createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    const ctx = cv.getContext('2d'); ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    glowTex = new THREE.CanvasTexture(cv);
    return glowTex;
  }

  function starField(count, rIn, rOut, size, color, opacity) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
      const r = rIn + Math.random() * (rOut - rIn);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color, size, transparent: true, opacity, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  function World() {
    const canvas = document.createElement('canvas');
    canvas.id = 'world-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0713, 0.018);
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);

    const fadeIns = [];   // {mat, to} materials that "turn on"
    const clock = new THREE.Clock();
    let raf = null, running = true, t = 0;
    let introDur = reduced ? 0.01 : 3.6;

    // --- build the observatory -------------------------------------------------
    const stars = starField(1600, 34, 70, 0.22, 0xd9c9f2, 0.0); scene.add(stars); fadeIns.push({ mat: stars.material, to: 0.85 });
    const dust = starField(260, 6, 16, 0.06, 0xeaa6cb, 0.0); scene.add(dust); fadeIns.push({ mat: dust.material, to: 0.5 });

    const obs = new THREE.Group(); scene.add(obs);

    // dome (upper hemisphere wireframe)
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(3.3, 34, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: V, wireframe: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    dome.position.y = 0.05; obs.add(dome); fadeIns.push({ mat: dome.material, to: 0.16 });

    // platform edge ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.3, 0.028, 8, 80),
      new THREE.MeshBasicMaterial({ color: P, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = Math.PI / 2; obs.add(ring); fadeIns.push({ mat: ring.material, to: 0.7 });

    // faint outer orbit ring (tilted)
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(4.7, 0.012, 6, 90),
      new THREE.MeshBasicMaterial({ color: V, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    orbit.rotation.x = Math.PI / 2.35; orbit.rotation.z = 0.3; obs.add(orbit); fadeIns.push({ mat: orbit.material, to: 0.4 });

    // soft ground disc (the observatory floats on it)
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(3.15, 48),
      new THREE.MeshBasicMaterial({ color: 0x160f24, transparent: true, opacity: 0, depthWrite: false })
    );
    disc.rotation.x = -Math.PI / 2; disc.position.y = -0.01; obs.add(disc); fadeIns.push({ mat: disc.material, to: 0.85 });

    // the hub artifact — a slowly rotating faceted sculpture floating in the dome
    const core = new THREE.Group(); core.position.y = 1.5; obs.add(core);
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      new THREE.MeshBasicMaterial({ color: V, wireframe: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    core.add(ico); fadeIns.push({ mat: ico.material, to: 0.85 });
    const ico2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.66, 1),
      new THREE.MeshBasicMaterial({ color: P, wireframe: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    core.add(ico2); fadeIns.push({ mat: ico2.material, to: 0.7 });
    // glow behind the core
    const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: P, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreGlow.scale.set(4.4, 4.4, 1); core.add(coreGlow); fadeIns.push({ mat: coreGlow.material, to: 0.5 });

    // observatory lights that "turn on" around the base
    const lights = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: WARM, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      sp.position.set(Math.cos(a) * 3.15, 0.08, Math.sin(a) * 3.15);
      sp.scale.set(0.9, 0.9, 1); obs.add(sp); lights.push(sp);
    }

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    const camFrom = new THREE.Vector3(0, 4.4, 19);
    const camTo = new THREE.Vector3(0, 2.55, 11.6);
    const look = new THREE.Vector3(0, 1.72, 0);
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);

    function frame() {
      const dt = clock.getDelta(); t += dt;
      const intro = Math.min(1, t / introDur);
      const e = easeOut(intro);

      // camera approach
      camera.position.lerpVectors(camFrom, camTo, e);
      if (!reduced && intro >= 1) {                 // idle drift after arrival
        const it = t - introDur;
        camera.position.x = camTo.x + Math.sin(it * 0.11) * 0.24;
        camera.position.y = camTo.y + Math.sin(it * 0.15) * 0.1;
      }
      camera.lookAt(look);

      // "lights turn on" + materials fade in (0.5s..2.6s)
      const on = Math.max(0, Math.min(1, (t - 0.5) / 2.1));
      fadeIns.forEach((f) => { f.mat.opacity = f.to * on; });
      lights.forEach((sp, i) => {
        const flick = 0.75 + 0.25 * Math.sin(t * 2 + i);
        sp.material.opacity = 0.9 * on * flick;
      });

      // motion
      core.rotation.y += dt * 0.25; core.rotation.x += dt * 0.08;
      ico2.rotation.y -= dt * 0.4;
      if (!reduced) {
        stars.rotation.y += dt * 0.006;
        orbit.rotation.z += dt * 0.05;
        core.position.y = 1.5 + Math.sin(t * 0.6) * 0.06;
      }

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    }

    document.body.classList.add('world-active');
    frame();

    return {
      introDur,
      destroy() {
        running = false; if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        document.body.classList.remove('world-active');
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        renderer.dispose();
        canvas.remove();
      },
    };
  }

  // --- Stage 2: Integration Hall -------------------------------------------
  // You fly in down a colonnade; the Integration artifact is a vessel that
  // fills with light (accumulation). A railing runs along the left.
  function Hall() {
    const canvas = document.createElement('canvas');
    canvas.id = 'world-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090612, 0.052);
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);

    const fadeIns = [];
    const clock = new THREE.Clock();
    let raf = null, running = true, t = 0;
    const introDur = reduced ? 0.01 : 2.0;

    // floor grid receding into fog
    const grid = new THREE.GridHelper(80, 80, V, 0x352a52);
    grid.material.transparent = true; grid.material.opacity = 0; grid.material.depthWrite = false;
    scene.add(grid); fadeIns.push({ mat: grid.material, to: 0.5 });

    // colonnade — two rows of light pillars receding down the hall
    const pillarMat = new THREE.MeshBasicMaterial({ color: V, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    fadeIns.push({ mat: pillarMat, to: 0.85 });
    const pillarGeo = new THREE.BoxGeometry(0.08, 4.2, 0.08);
    for (let i = 0; i < 12; i++) {
      const z = 3 - i * 3.2;
      [-3.0, 3.0].forEach((x) => { const m = new THREE.Mesh(pillarGeo, pillarMat); m.position.set(x, 2.1, z); scene.add(m); });
    }
    // top + base beams joining the colonnade (arches of the hall)
    const beamMat = new THREE.MeshBasicMaterial({ color: P, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    fadeIns.push({ mat: beamMat, to: 0.55 });
    [-3.0, 3.0].forEach((x) => {
      [4.2, 0.2].forEach((y) => { const beam = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 40), beamMat); beam.position.set(x, y, -14); scene.add(beam); });
    });

    // railing along the left, where the ferret sits
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 12), new THREE.MeshBasicMaterial({ color: P, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    rail.position.set(-2.5, 0.95, -1.5); scene.add(rail); fadeIns.push({ mat: rail.material, to: 0.7 });

    // the Integration artifact — a vessel filling with light, floating high in the hall
    const artifact = new THREE.Group(); artifact.position.set(0, 2.95, -5.4); scene.add(artifact);
    const vessel = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.15, 2.5, 40, 1, true),
      new THREE.MeshBasicMaterial({ color: V, wireframe: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    artifact.add(vessel); fadeIns.push({ mat: vessel.material, to: 0.4 });
    // the rising light level inside (accumulation)
    const fill = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.05, 1, 40),
      new THREE.MeshBasicMaterial({ color: P, transparent: true, opacity: 0.24, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    fill.geometry.translate(0, 0.5, 0);   // pivot at base so scale.y fills upward
    fill.position.y = -1.25; fill.scale.y = 0.01; artifact.add(fill);
    const artGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: P, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    artGlow.scale.set(6.2, 6.2, 1); artifact.add(artGlow); fadeIns.push({ mat: artGlow.material, to: 0.5 });

    // motes rising inside the vessel
    const mCount = 90, mp = new Float32Array(mCount * 3);
    for (let i = 0; i < mCount; i++) { mp[i*3] = (Math.random()-0.5)*1.9; mp[i*3+1] = Math.random()*2.4 - 1.2; mp[i*3+2] = (Math.random()-0.5)*1.9; }
    const mGeo = new THREE.BufferGeometry(); mGeo.setAttribute('position', new THREE.Float32BufferAttribute(mp, 3));
    const motes = new THREE.Points(mGeo, new THREE.PointsMaterial({ color: 0xf2d9ec, size: 0.05, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    artifact.add(motes); fadeIns.push({ mat: motes.material, to: 0.7 });

    const dust = starField(160, 4, 18, 0.05, 0xc9a9ec, 0.0); scene.add(dust); fadeIns.push({ mat: dust.material, to: 0.4 });

    function resize() { const w = window.innerWidth, h = window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    resize(); window.addEventListener('resize', resize);

    const camFrom = new THREE.Vector3(0, 2.5, 8.5);
    const camTo = new THREE.Vector3(0, 2.15, 4.0);
    const look = new THREE.Vector3(0, 2.55, -5.4);
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);

    function frame() {
      const dt = clock.getDelta(); t += dt;
      const e = easeOut(Math.min(1, t / introDur));
      camera.position.lerpVectors(camFrom, camTo, e);
      if (!reduced && e >= 1) { const it = t - introDur; camera.position.x = camTo.x + Math.sin(it*0.13)*0.14; camera.position.y = camTo.y + Math.sin(it*0.19)*0.06; }
      camera.lookAt(look);

      const on = Math.max(0, Math.min(1, (t - 0.3) / 1.8));
      fadeIns.forEach((f) => { f.mat.opacity = f.to * on; });

      // the vessel fills with light, then resets — accumulation
      const lvl = (t * 0.14) % 1;
      fill.scale.y = Math.max(0.01, lvl * 2.4);
      fill.material.opacity = (0.12 + 0.22 * lvl) * on;
      artGlow.material.opacity = (0.25 + 0.3 * lvl) * on;
      artifact.rotation.y += dt * 0.12;
      // motes drift up and wrap
      const arr = mGeo.attributes.position.array;
      for (let i = 0; i < mCount; i++) { arr[i*3+1] += dt * 0.35; if (arr[i*3+1] > 1.3) arr[i*3+1] = -1.2; }
      mGeo.attributes.position.needsUpdate = true;
      if (!reduced) dust.rotation.y += dt * 0.01;

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    }

    document.body.classList.add('world-active');
    frame();

    return {
      destroy() {
        running = false; if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        document.body.classList.remove('world-active');
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        renderer.dispose(); canvas.remove();
      },
    };
  }

  window.World = { available, create: World, createHall: Hall };
})();
