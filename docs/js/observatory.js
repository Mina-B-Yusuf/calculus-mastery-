// THE OBSERVATORY SIMULATION — the world's physics engine.
//
// This module owns the *state* of the world. It contains no Three.js, no DOM, no
// animation. Every visual the app ever shows must be derivable from the numbers
// this file computes from learning data. Renderers (Three.js scenes, the status
// report, typography, future VR/AR) are CLIENTS of this simulation — never the
// other way around.
//
// `compute(data, now)` is pure and deterministic: same data in, same state out.
// `state()` is the thin async wrapper that loads data from IndexedDB.

(function () {
  const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
  const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
  const dayKey = (ts) => { const d = new Date(ts); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; };
  const DAY = 86400000;

  // Every hall answers ONE sentence; everything inside it must reinforce that sentence.
  const THESES = {
    P: 'The plane is the stage on which every idea appears.',
    1: 'We can understand what is approached without ever arriving.',
    2: 'Instantaneous change can be measured.',
    3: 'Growth and its inverse are two views of one idea.',
    4: 'Every landscape has structure.',
    5: 'Many local pieces become one whole.',
    6: 'Any integral can be reshaped into one you already know.',
    7: 'Sum the slices and the world takes shape.',
    8: 'A single parameter can trace any curve.',
    9: 'Infinite processes can have finite destinations.',
  };

  // Observatory DNA — every hall exposes the same facets; each hall renders them
  // differently (Integration→cross-sections, Series→infinite staircase, …). The
  // simulation produces the facets; the renderer chooses the geometry.
  const DNA = ['geometry', 'structure', 'light', 'atmosphere', 'integrity', 'memory', 'connections', 'restoration'];

  // Constellation edges: understanding is connection, not isolated facts. A bridge
  // is "formed" when a mastered skill matches each endpoint's keywords.
  const CONNECTIONS = [
    [['product rule'], ['chain rule']],
    [['chain rule'], ['implicit']],
    [['substitution', 'u-sub'], ['by parts', 'integration by parts']],
    [['by parts', 'integration by parts'], ['partial fraction']],
    [['limit'], ['continuity', 'continuous']],
    [['continuity', 'continuous'], ['differentiab']],
    [['differentiab'], ['optim', 'extrem', 'maximum', 'minimum']],
    [['taylor', 'maclaurin'], ['power series']],
    [['comparison'], ['convergence']],
  ];

  const structuralWord = (m, introduced) => {
    if (!introduced) return 'Unbuilt';
    if (m < 0.5) return 'Unstable';
    if (m < 0.75) return 'Settling';
    return 'Sound';
  };

  // ---- the pure engine -------------------------------------------------------
  function compute(data, now) {
    now = now || Date.now();
    const microSkills = data.microSkills || [];
    const archetypes = data.archetypes || [];
    const attempts = (data.attempts || []).slice().sort((a, b) => a.timestamp - b.timestamp);
    const srs = data.srs || [];

    const skillOfArch = {};
    archetypes.forEach((a) => { skillOfArch[a.id] = a.microSkillId; });

    // retention per skill from SRS interval (delayed recall)
    const retBySkill = {};
    srs.forEach((r) => {
      const sid = skillOfArch[r.itemId]; if (!sid) return;
      const ret = clamp((r.intervalDays || 0) / 21) * (r.repetitions >= 2 ? 1 : 0.6);
      (retBySkill[sid] = retBySkill[sid] || []).push(ret);
    });

    // per-skill command from attempts
    const bySkill = {};
    attempts.forEach((a) => {
      const r = bySkill[a.microSkillId] || (bySkill[a.microSkillId] = { t: 0, c: 0, wrong: 0, first: null, last: 0, err: new Set() });
      r.t++; if (a.correct) r.c++; else { r.wrong++; if (a.errorType) r.err.add(a.errorType); }
      if (r.first === null) r.first = !!a.correct;
      if (a.timestamp > r.last) r.last = a.timestamp;
    });

    const nameOf = {}, chapterOf = {};
    microSkills.forEach((s) => { nameOf[s.id] = s.microSkill; chapterOf[s.id] = String(s.chapter); });
    const rawMastery = (id) => { const r = bySkill[id]; return r ? r.c / r.t : 0; };
    // command = mastery × confidence, where confidence = t/(t+3) grows with
    // evidence. One correct answer gives ~0.25, not 1.0: a single lucky/unlucky
    // answer barely moves the world, and integrity only climbs with sustained,
    // spaced practice — you cannot make a hall Sound in one session.
    const command = (id) => { const r = bySkill[id]; return r ? (r.c / r.t) * (r.t / (r.t + 3)) : 0; };
    const isMastered = (id) => { const r = bySkill[id]; return !!(r && r.t >= 3 && r.c / r.t >= 0.8); };
    const retentionOf = (id) => mean(retBySkill[id] || []);

    // bridges: which connection edges are formed, and where
    const masteredNames = microSkills.filter((s) => isMastered(s.id)).map((s) => ({ n: s.microSkill.toLowerCase(), ch: String(s.chapter) }));
    const matchNode = (keys) => masteredNames.find((s) => keys.some((k) => s.n.includes(k)));
    const bridges = [];
    CONNECTIONS.forEach(([A, B]) => { const a = matchNode(A), b = matchNode(B); if (a && b) bridges.push({ a: a.ch, b: b.ch }); });

    // group skills by chapter
    const chapters = {};
    microSkills.forEach((s) => { const c = String(s.chapter); (chapters[c] = chapters[c] || []).push(s); });

    const halls = {};
    Object.entries(chapters).forEach(([c, list]) => {
      const ids = list.map((s) => s.id);
      const met = ids.filter((id) => bySkill[id]);
      const structuralIntegrity = mean(ids.map(command));      // evidence-tempered
      const introduced = met.length / ids.length;
      const restored = ids.filter(isMastered);
      const accumulationCompleteness = restored.length / ids.length;

      // foundational skills = earliest section in the hall → boundary stability
      const sections = [...new Set(list.map((s) => String(s.section || '')))].sort((x, y) => x.localeCompare(y, undefined, { numeric: true }));
      const foundational = list.filter((s) => String(s.section || '') === sections[0]).map((s) => s.id);
      const boundaryStability = foundational.length ? mean(foundational.map(command)) : structuralIntegrity;

      const lastVisit = Math.max(0, ...met.map((id) => bySkill[id].last));
      const daysSince = lastVisit ? (now - lastVisit) / DAY : Infinity;
      // retention decays with real time away: mastery left unvisited grows
      // uncertain (forgetting), so a hall cools and quietens after a long absence.
      const recency = clamp(1 - Math.max(0, (isFinite(daysSince) ? daysSince : 0) - 10) / 40, 0.4, 1);
      const retentionReliability = mean(met.map((id) => retentionOf(id))) * recency;
      // a crack needs evidence: repeated trouble, not one unlucky answer
      const cracks = met.filter((id) => { const r = bySkill[id]; return r.t >= 2 && r.wrong > 0 && r.c / r.t < 0.6; });
      const bridgesFormed = bridges.filter((e) => e.a === c && e.b === c).length;
      const firstTryRate = met.length ? met.filter((id) => bySkill[id].first).length / met.length : 0;
      // section coherence — understanding the hall as a connected whole, not one
      // isolated section drilled to death. This is what Wisdom rewards.
      const sectionCoherence = sections.length
        ? [...new Set(list.filter((s) => isMastered(s.id)).map((s) => String(s.section || '')))].length / sections.length : 0;

      // hidden Wisdom: understanding over repetition, and EXPLAINABLE — it is
      // dominated by connection (coherence across the hall's sections) and by
      // first-pass recognition (not drill-to-memorise, where the first try is
      // wrong). Retention is a minor contributor. Its only sanctioned visual
      // effect is more coherent relationships between structural sections.
      const wisdom = clamp(0.50 * sectionCoherence + 0.30 * firstTryRate + 0.20 * retentionReliability);

      // dust is quiet, never punitive — gentle and strictly bounded
      const dust = introduced ? clamp((daysSince - 3) / 30, 0, 0.5) : 0;
      // unresolved cracks cool the room: warmth cannot be full while cracks remain
      const crackFactor = clamp(1 - 0.18 * cracks.length, 0.35, 1);
      const warmth = clamp((0.3 * structuralIntegrity + 0.7 * retentionReliability) * crackFactor);
      const lighting = clamp(0.2 + 0.5 * structuralIntegrity + 0.3 * introduced);
      const silence = clamp(1 - (dayKey(lastVisit) === dayKey(now) ? 0.25 : 0), 0.6, 1);

      // a hall is only Sound when there is retention evidence, not fresh accuracy
      let word = structuralWord(structuralIntegrity, introduced > 0);
      if (word === 'Sound' && retentionReliability < 0.35) word = 'Settling';

      halls[c] = {
        chapter: c,
        thesis: THESES[c] || '',
        word,
        // integrity facet
        structuralIntegrity, boundaryStability, accumulationCompleteness, retentionReliability,
        // structure / restoration
        introduced, unresolvedCracks: cracks.length, bridgesFormed,
        // atmosphere / light (derived, still semantic — the renderer maps these to fog/brightness/particles)
        warmth, lighting, dust, silence,
        // memory
        daysSinceVisit: isFinite(daysSince) ? Math.round(daysSince) : null,
        wisdom, // hidden — never shown as a number
        skills: { total: ids.length, met: met.length, restored: restored.length },
      };
    });

    // observatory-wide
    const allMast = microSkills.map((s) => command(s.id));      // evidence-tempered
    const held = microSkills.filter((s) => isMastered(s.id));
    const heldSorted = held.map((s) => ({ n: s.microSkill, last: (bySkill[s.id] || {}).last || 0 })).sort((a, b) => b.last - a.last);
    const weak = microSkills.filter((s) => { const r = bySkill[s.id]; return r && r.t >= 2 && rawMastery(s.id) < 0.6; })
      .map((s) => ({ n: s.microSkill, m: rawMastery(s.id) })).sort((a, b) => a.m - b.m);
    const lastOverall = Math.max(0, ...attempts.map((a) => a.timestamp));

    return {
      integrity: {
        pct: Math.round(100 * mean(allMast)),
        held: held.length, total: microSkills.length,
        stabilized: heldSorted.slice(0, 3).map((x) => x.n),
        inspect: weak.slice(0, 3).map((x) => x.n),
      },
      wisdom: mean(Object.values(halls).map((h) => h.wisdom)),   // hidden
      bridges: bridges.length,
      presence: presenceString(lastOverall, now),
      halls,
    };
  }

  function presenceString(lastTs, now) {
    if (!lastTs) return 'Newly built';
    const d = Math.floor((now - lastTs) / DAY);
    const sameDay = dayKey(lastTs) === dayKey(now);
    if (sameDay) return 'Active today';
    if (d <= 1) return 'Last visited yesterday';
    return `Quiet for ${d} days`;
  }

  async function state(now) {
    const [microSkills, archetypes, attempts, srs] = await Promise.all([
      DB.getAll('microSkills'), DB.getAll('archetypes'), DB.getAllAttempts(), DB.getAllSrs(),
    ]);
    return compute({ microSkills, archetypes, attempts, srs }, now);
  }
  async function hallState(chapter, now) { return (await state(now)).halls[String(chapter)] || null; }

  window.Observatory = { compute, state, hallState, structuralWord, presenceString, THESES, DNA, CONNECTIONS, clamp };
})();
