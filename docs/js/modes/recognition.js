function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// filter: null → the mixed daily drill (SRS-new/due across everything);
//   { chapter } → a chapter review (mixed, but only this chapter);
//   { chapter, section } → practise exactly one section — its whole set, so the
//   unit is genuinely covered rather than sampled by SRS.
async function buildRecognitionSession(limit = 15, filter = null) {
  const archetypes = await DB.getAll('archetypes');
  const microSkills = Object.fromEntries((await DB.getAll('microSkills')).map((m) => [m.id, m]));
  let pool = archetypes;
  if (filter) {
    pool = archetypes.filter((a) => {
      const ms = microSkills[a.microSkillId];
      if (!ms) return false;
      if (filter.chapter != null && String(ms.chapter) !== String(filter.chapter)) return false;
      if (filter.section != null && String(ms.section) !== String(filter.section)) return false;
      return true;
    });
  }
  await Priority.load();
  // Order candidate ids so exam-priority archetypes are preferred (shuffled within tier).
  const withSection = shuffle(pool).map((a) => ({
    id: a.id,
    section: (microSkills[a.microSkillId] || {}).section,
  }));
  const orderedIds = Priority.prioritize(withSection).map((x) => x.id);
  let ids;
  if (filter) {
    // Cover the whole unit: due/new first, then the rest of the set.
    const dueSet = new Set(await SRS.getNewOrDueIds('archetype', orderedIds, orderedIds.length));
    ids = [...orderedIds.filter((id) => dueSet.has(id)), ...orderedIds.filter((id) => !dueSet.has(id))].slice(0, limit);
  } else {
    ids = await SRS.getNewOrDueIds('archetype', orderedIds, limit);
  }
  const byId = Object.fromEntries(archetypes.map((a) => [a.id, a]));
  return ids.map((id) => byId[id]).filter(Boolean).map((a) => ({
    archetype: a,
    microSkill: microSkills[a.microSkillId],
  }));
}

// Where a section sits in its chapter, and what comes next — so a finished
// drill can point at the next most sensible thing instead of a dead end.
function sectionNav(microSkills, chapter, section) {
  const inCh = microSkills.filter((m) => String(m.chapter) === String(chapter));
  const secs = [...new Set(inCh.map((m) => m.section))]
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
  const nameOf = (s) => { const m = inCh.find((x) => String(x.section) === String(s)); return m ? (m.subtopic || m.topic || ('Section ' + s)) : ('Section ' + s); };
  const head = inCh[0] || {};
  const i = secs.indexOf(String(section));
  return {
    chapter: String(chapter),
    chapterKey: head.course ? `${head.course}|${head.chapter}|${head.chapterTitle}` : '',
    place: Geography.placeName(chapter),
    index: i, total: secs.length,
    section: String(section), sectionName: nameOf(section),
    prev: i > 0 ? { section: secs[i - 1], name: nameOf(secs[i - 1]) } : null,
    next: (i >= 0 && i < secs.length - 1) ? { section: secs[i + 1], name: nameOf(secs[i + 1]) } : null,
  };
}

// Distractors must be plausible near-misses, not absurd cross-topic options: a
// student who half-knows the material should feel the pull of each wrong choice.
// Two sources, in order of pedagogical value:
//   1. the techniques THIS archetype is commonly confused with (merged_topics),
//      mapped onto real skill labels so every option reads consistently;
//   2. the nearest taxonomic neighbours — same subtopic, then topic, then
//      chapter — because confusion lives between adjacent ideas.
function pickDistractors(microSkills, correctMs, archetype, n) {
  const correctLabel = correctMs.microSkill;
  const chosen = [];
  const used = new Set([correctLabel.trim().toLowerCase()]);
  const add = (label) => {
    const key = String(label || '').trim().toLowerCase();
    if (!key || used.has(key)) return;
    used.add(key);
    chosen.push(label);
  };

  // 1) Commonly-confused techniques for this specific archetype.
  shuffle(archetype.mergedTopics || []).forEach((mt) => {
    if (chosen.length >= n) return;
    const q = String(mt).trim().toLowerCase();
    if (!q) return;
    const match = microSkills.find((m) => {
      const label = m.microSkill.toLowerCase();
      return m.id !== correctMs.id && (label.includes(q) || q.includes(label));
    });
    if (match) add(match.microSkill);
  });

  // 2) Nearest taxonomic neighbours within the same course, ranked by closeness.
  const scored = microSkills
    .filter((m) => m.course === correctMs.course && m.id !== correctMs.id)
    .map((m) => {
      let score = 0;
      if (String(m.chapter) === String(correctMs.chapter)) score += 2;
      if (m.topic && m.topic === correctMs.topic) score += 3;
      if (m.subtopic && m.subtopic === correctMs.subtopic) score += 4;
      return { m, score };
    });
  const tiers = {};
  scored.forEach((r) => (tiers[r.score] = tiers[r.score] || []).push(r.m));
  Object.keys(tiers).sort((a, b) => b - a).forEach((score) => {
    shuffle(tiers[score]).forEach((m) => { if (chosen.length < n) add(m.microSkill); });
  });

  return shuffle([correctLabel, ...chosen.slice(0, n)]);
}

window.RecognitionMode = {
  async render(root, opts) {
    // HallMode schedules this render on a timer; if the learner has already
    // navigated away, the panel is gone — do nothing rather than throw.
    if (!root || !root.isConnected) return;
    opts = opts || {};
    const filter = opts.filter || null;
    const microSkills = await DB.getAll('microSkills');
    const nav = (filter && filter.section != null) ? sectionNav(microSkills, filter.chapter, filter.section) : null;
    const chapKey = filter ? (nav ? nav.chapterKey : sectionNav(microSkills, filter.chapter, '').chapterKey) : '';
    const scopeLabel = nav ? `${nav.section} · ${nav.sectionName}`
      : (filter ? `${Geography.placeName(filter.chapter)} · review` : 'Recognize');
    // A section drill covers the whole unit (so one pass can steady it); the
    // mixed daily drill and chapter review stay a focused 15.
    const limit = (filter && filter.section != null) ? 25 : 15;

    // A drill session survives interruption (F32/F5): state is checkpointed
    // after every answer, so peeking at a concept page — or a phone call —
    // resumes exactly where the learner stopped instead of resetting.
    const saveKey = 'drillSession:' + (filter
      ? (filter.section != null ? `s:${filter.chapter}:${filter.section}` : `ch:${filter.chapter}`) : 'mixed');
    const archAll = await DB.getAll('archetypes');
    const archById = Object.fromEntries(archAll.map((a) => [a.id, a]));
    const msById = Object.fromEntries(microSkills.map((m) => [m.id, m]));
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(saveKey) || 'null'); } catch (e) {}
    if (saved && (Date.now() - saved.t > 6 * 3600e3
      || !(saved.ids || []).length || !(saved.ids || []).every((id) => archById[id] && msById[archById[id].microSkillId])
      || saved.idx >= saved.ids.length)) saved = null;

    const session = saved
      ? saved.ids.map((id) => ({ archetype: archById[id], microSkill: msById[archById[id].microSkillId] }))
      : await buildRecognitionSession(limit, filter);
    if (!session.length) {
      const back = nav ? `<a class="rc-go" href="#/journey/${nav.chapter}" style="margin-top:20px;">Back to ${escapeHtml(nav.place)}</a>`
        : filter ? `<a class="rc-go" href="#/journey/${filter.chapter}" style="margin-top:20px;">Back to the chapter</a>`
        : `<a class="rc-go" href="#/journey" style="margin-top:20px;">Study a section</a>`;
      root.innerHTML = `<div class="rc-done"><div class="rc-kick kicker">${escapeHtml(scopeLabel)}</div>
        <div class="rc-ask" style="margin-top:12px;">Nothing waiting here right now — you've been through this set.</div>${back}</div>`;
      return;
    }
    let idx = saved ? saved.idx : 0;
    let sessionCorrect = saved ? saved.correct : 0;
    // Discoveries — what changed in you this session (not XP).
    const strengthened = new Set(saved ? saved.str : []), corrected = new Set(saved ? saved.cor : []), slipped = new Set(saved ? saved.slp : []);
    const requeued = new Set(saved ? saved.rq : []);
    const confidentMisses = new Set(saved ? (saved.cm || []) : []);   // wrong while certain — the misses that matter most

    // First moves, for the Plan phase: the correct archetype's opening step
    // against the opening steps of the confusable techniques — because most
    // marks are lost to the wrong attack, not the wrong algebra.
    const archByMs = {};
    archAll.forEach((a) => (archByMs[a.microSkillId] = archByMs[a.microSkillId] || []).push(a));
    const skillByLabel = {};
    microSkills.forEach((m) => { if (!skillByLabel[m.microSkill]) skillByLabel[m.microSkill] = m; });
    const firstMoveOf = (label) => {
      const m = skillByLabel[label];
      const a = m && (archByMs[m.id] || [])[0];
      return (a && (a.methodPlan || [])[0]) || null;
    };
    const priorWrong = new Set((await DB.getAllAttempts()).filter((a) => !a.correct).map((a) => a.microSkillId));
    const persist = () => {
      try {
        localStorage.setItem(saveKey, JSON.stringify({
          ids: session.map((x) => x.archetype.id), idx, correct: sessionCorrect,
          str: [...strengthened], cor: [...corrected], slp: [...slipped], rq: [...requeued], cm: [...confidentMisses], t: Date.now(),
        }));
      } catch (e) {}
    };
    if (!saved) persist();

    const renderQuestion = () => {
      if (!root.isConnected) return;   // route changed while data was loading
      const { archetype, microSkill } = session[idx];
      const choices = pickDistractors(microSkills, microSkill, archetype, 3);

      // Observe — the phase before recognition. Experts don't know the method;
      // they notice features novices miss. The correct observation is this
      // archetype's own recognition cue; the false ones are the confusable
      // techniques' cues — features this problem does NOT have.
      const cueOf = (label) => {
        const m = skillByLabel[label];
        const a = m && (archByMs[m.id] || [])[0];
        return (a && a.recognitionCue) || null;
      };
      const rightCue = archetype.recognitionCue || null;
      const wrongCues = [...new Set(choices.filter((c) => c !== microSkill.microSkill).map(cueOf)
        .filter((c) => c && c !== rightCue))].slice(0, 2);
      const obsOptions = (rightCue && wrongCues.length >= 2)
        ? shuffle([{ text: rightCue, ok: true }, ...wrongCues.map((text) => ({ text, ok: false }))])
        : null;

      root.innerHTML = `
        <div class="rc">
          <div class="rc-prog"><span style="width:${(idx / session.length) * 100}%"></span></div>
          <div class="rc-kick kicker">${nav ? 'Practice' : (filter ? 'Chapter review' : 'Recognize')} · ${escapeHtml(nav ? nav.sectionName : Geography.placeName(archetype.chapter))} · ${idx + 1} of ${session.length}
            <button class="rc-end" id="end-session">End session</button></div>

          <div class="rc-stage">
            <div class="rc-ask" id="rc-ask"></div>
            <div class="rc-hero">${MathRender.inline(archetype.example)}</div>
          </div>

          <div class="rc-choices" id="choices"></div>
        </div>
        <div id="feedback"></div>
      `;

      document.getElementById('end-session').addEventListener('click', () => {
        localStorage.removeItem(saveKey);
        renderSummary();
      });

      let observeCorrect = null;
      const showRecognize = () => {
        if (!root.isConnected) return;
        document.getElementById('rc-ask').innerHTML = `<span class="rc-phase-n">Recognize</span> Which technique does this need?`;
        const box = document.getElementById('choices');
        box.innerHTML = choices.map((c) => `
          <button class="rc-choice" data-choice="${escapeHtml(c)}">
            <span class="rc-mark"></span><span class="rc-ctext">${MathRender.inline(c)}</span>
          </button>`).join('');
        // Hesitation carries information confidence can't: certain-in-one-second
        // and certain-after-twenty-seconds are different states of knowledge.
        const t0 = performance.now();
        box.querySelectorAll('button').forEach((btn) => {
          btn.addEventListener('click', () => onAnswer(btn.dataset.choice, microSkill.microSkill, archetype, microSkill, choices,
            { observeCorrect, msTaken: Math.round(performance.now() - t0) }));
        });
      };

      if (obsOptions) {
        document.getElementById('rc-ask').innerHTML = `<span class="rc-phase-n">Observe</span> Before anything — what do you notice?`;
        const box = document.getElementById('choices');
        box.innerHTML = obsOptions.map((o, k) => `
          <button class="rc-choice" data-k="${k}">
            <span class="rc-mark"></span><span class="rc-ctext">${MathRender.inline(o.text)}</span>
          </button>`).join('');
        box.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => {
          if (observeCorrect != null) return;
          observeCorrect = !!obsOptions[Number(btn.dataset.k)].ok;
          box.querySelectorAll('button').forEach((b, k) => {
            b.disabled = true;
            if (obsOptions[k].ok) b.classList.add('correct');
            else if (b === btn) b.classList.add('incorrect');
          });
          setTimeout(showRecognize, observeCorrect ? 600 : 1400);   // a miss earns a beat to read the true feature
        }));
      } else {
        showRecognize();
      }
    };

    // Every problem has three phases — Recognize → Plan → Execute — because
    // exams reward all three and most marks die at the first: the wrong attack.
    // Confidence is asked BEFORE the verdict (it can't be contaminated by it)
    // and replaces Hard/Good/Easy: same tap, far richer signal.
    const onAnswer = (chosen, correctLabel, archetype, microSkill, allChoices, meta) => {
      meta = meta || {};
      const correct = chosen === correctLabel;
      const sid = microSkill.id;
      root.querySelectorAll('#choices button').forEach((btn) => { btn.disabled = true; });
      const fb = document.getElementById('feedback');

      let confidence = null, planCorrect = null, execOk = null, selectedErrorType = null;

      const finish = async () => {
        // Confidence-weighted scheduling: a lucky guess is not mastery; an
        // execution slip caps the interval; certainty earns the long one.
        let quality = 0;
        if (correct) {
          quality = { certain: 3, sure: 2, unsure: 1, guess: 1 }[confidence] || 1;
          if (planCorrect === false) quality = Math.min(quality, 2);
          // right technique but missed the observation = pattern-matched
          // without perceiving; not yet the long interval
          if (meta.observeCorrect === false) quality = Math.min(quality, 2);
          if (execOk === false || confidence === 'guess') quality = Math.min(quality, 1);
          // certain-but-slow isn't automatic yet — hesitation caps the interval
          if (quality === 3 && (meta.msTaken || 0) > 20000) quality = 2;
        }
        await SRS.recordReview('archetype', archetype.id, quality);
        await DB.recordAttempt({
          archetypeId: archetype.id,
          microSkillId: sid,
          mode: 'recognition',
          correct, confidence, planCorrect, execOk,
          observeCorrect: meta.observeCorrect ?? null,
          msTaken: meta.msTaken ?? null,
          errorType: correct ? (execOk === false ? selectedErrorType : null) : 'conceptual',
        });
        await Progress.award(correct);   // keeps internal counters; no XP shown
        // A slip returns tonight (F36): requeued once, at the end.
        if (!correct && !requeued.has(archetype.id)) {
          requeued.add(archetype.id);
          session.push({ archetype, microSkill });
        }
        idx += 1;
        if (idx >= session.length) {
          localStorage.removeItem(saveKey);
          renderSummary();
        } else {
          persist();
          renderQuestion();
        }
      };

      const footer = `
        <div class="rc-sub">
          <button id="note-q">${Icon('plus')} Save to notes</button>
          <a href="#/concepts/skill/${encodeURIComponent(sid)}">${Icon('concepts')} Concept page</a>
        </div>`;
      const wireFooter = () => {
        const nq = document.getElementById('note-q');
        if (nq) nq.addEventListener('click', () => window.saveToNotes(`Q: ${archetype.example}`, correctLabel));
      };

      // ---- Confidence gate (verdict stays hidden until they commit) ----
      fb.innerHTML = `
        <div class="rc-fb">
          <div class="kicker" style="margin-bottom:10px;">Before you see — how sure were you?</div>
          <div class="rc-rate rc-conf">
            <button data-conf="guess">Guessed</button>
            <button data-conf="unsure">Unsure</button>
            <button data-conf="sure">Pretty sure</button>
            <button data-conf="certain">Certain</button>
          </div>
        </div>`;
      fb.querySelectorAll('[data-conf]').forEach((b) => b.addEventListener('click', () => showVerdict(b.dataset.conf)));

      const showVerdict = (conf) => {
        confidence = conf;
        if (correct) sessionCorrect += 1;
        if (correct) { if (priorWrong.has(sid)) corrected.add(sid); else strengthened.add(sid); }
        else { slipped.add(sid); priorWrong.add(sid); if (conf === 'certain') confidentMisses.add(sid); }
        root.querySelectorAll('#choices button').forEach((btn) => {
          if (btn.dataset.choice === correctLabel) btn.classList.add('correct');
          else if (btn.dataset.choice === chosen) btn.classList.add('incorrect');
        });
        Companion.react(correct ? 'correct' : 'wrong');
        if (!correct) return renderMiss(conf);
        renderPlan();
      };

      // ---- Wrong recognition: the error IS the wrong attack (auto-tagged
      // conceptual — no quiz about what kind of slip it was, F34) ----
      const renderMiss = (conf) => {
        fb.innerHTML = `
          <div class="rc-fb">
            <div class="rc-verdict no">${Icon('x')}<span>Not quite — <em>${MathRender.inline(correctLabel)}</em></span></div>
            ${conf === 'certain' ? `<div class="rc-miscon">${Icon('trap')}<span>You were <strong>certain</strong>. This is the miss that costs marks — read the cue slowly. It returns before the session ends.</span></div>` : ''}
            <div class="rc-why">${MathRender.inline(archetype.recognitionCue || '')}</div>
            <div class="rc-actions"><button class="rc-go" id="continue-btn">Continue</button></div>
            ${footer}
          </div>`;
        wireFooter();
        document.getElementById('continue-btn').addEventListener('click', finish);
      };

      // ---- Phase 2: Plan — the first move, against the confusable attacks ----
      const renderPlan = () => {
        const right = (archetype.methodPlan || [])[0];
        const wrongs = allChoices.filter((c) => c !== correctLabel)
          .map(firstMoveOf).filter((m) => m && m !== right);
        const options = right && wrongs.length
          ? shuffle([{ text: right, ok: true }, ...shuffle([...new Set(wrongs)]).slice(0, 2).map((text) => ({ text, ok: false }))])
          : null;
        fb.innerHTML = `
          <div class="rc-fb">
            <div class="rc-verdict ok">${Icon('check')}<span>Recognized — <em>${MathRender.inline(correctLabel)}</em></span></div>
            ${options ? `
              <div class="rc-phase"><span class="rc-phase-n">Plan</span> Before touching the algebra — what's the first move?</div>
              <div class="rc-choices rc-plan" id="plan-choices">
                ${options.map((p, k) => `<button class="rc-choice" data-k="${k}"><span class="rc-mark"></span><span class="rc-ctext">${MathRender.inline(p.text)}</span></button>`).join('')}
              </div>` : ''}
            <div id="exec-slot"></div>
            ${footer}
          </div>`;
        wireFooter();
        if (!options) return renderExec();
        fb.querySelectorAll('#plan-choices button').forEach((btn) => btn.addEventListener('click', () => {
          const pick = options[Number(btn.dataset.k)];
          planCorrect = !!pick.ok;
          fb.querySelectorAll('#plan-choices button').forEach((b, k) => {
            b.disabled = true;
            if (options[k].ok) b.classList.add('correct');
            else if (b === btn) b.classList.add('incorrect');
          });
          renderExec();
        }));
      };

      // ---- Phase 3: Execute — on paper, where mathematics actually happens ----
      const renderExec = () => {
        const slot = document.getElementById('exec-slot');
        slot.innerHTML = `
          <div class="rc-phase"><span class="rc-phase-n">Execute</span> Work it on paper — then check.</div>
          <div class="rc-reveals">
            <button class="rc-reveal" id="check-work" aria-expanded="false">${Icon('example')}<span>Check your work</span><span class="rc-chev">${Icon('chevron')}</span></button>
            <div class="reveal-wrap" id="rv-work"><div class="reveal-inner"><div class="rc-rbody">
              ${(archetype.methodPlan || []).length ? `<ol class="method-plan" style="margin:0 0 10px;padding-left:18px;">${archetype.methodPlan.map((s) => `<li>${MathRender.inline(s)}</li>`).join('')}</ol>` : ''}
              ${archetype.answer ? `<div class="rc-final">${MathRender.inline(archetype.answer)}</div>` : ''}
            </div></div></div>
          </div>
          <div id="verify-slot"></div>`;
        document.getElementById('check-work').addEventListener('click', () => {
          const el = document.getElementById('rv-work');
          const open = el.classList.toggle('open');
          document.getElementById('check-work').setAttribute('aria-expanded', open ? 'true' : 'false');
          const vs = document.getElementById('verify-slot');
          if (open && !vs.innerHTML) {
            vs.innerHTML = `
              <div class="rc-phase" style="margin-top:14px;">Did your paper agree?</div>
              <div class="rc-rate">
                <button id="exec-ok">It did</button>
                <button id="exec-slip">I slipped</button>
              </div>
              <div id="slip-slot"></div>`;
            document.getElementById('exec-ok').addEventListener('click', () => { execOk = true; finish(); });
            document.getElementById('exec-slip').addEventListener('click', () => {
              execOk = false;
              const ss = document.getElementById('slip-slot');
              if (!ss.innerHTML) {
                ss.innerHTML = `${errorTagPickerHtml()}<div class="rc-actions"><button class="rc-go" id="continue-btn">Continue</button></div>`;
                ss.querySelectorAll('.error-tag').forEach((tag) => tag.addEventListener('click', () => {
                  ss.querySelectorAll('.error-tag').forEach((t) => t.classList.remove('selected'));
                  tag.classList.add('selected');
                  selectedErrorType = tag.dataset.type;
                }));
                document.getElementById('continue-btn').addEventListener('click', finish);
              }
            });
          }
        });
      };
    };

    const renderSummary = async () => {
      if (opts.onComplete) { try { opts.onComplete(); } catch (e) {} }   // hall enters Reflection
      const integ = (await Observatory.state()).integrity;
      // Name the discoveries (F41) — the names ARE the useful part.
      const names = (set) => {
        const ns = [...set].map((id) => (msById[id] || {}).microSkill).filter(Boolean);
        if (!ns.length) return '';
        const shown = ns.slice(0, 4).map(escapeHtml).join(' · ');
        return `<div class="rc-disc-names">${shown}${ns.length > 4 ? ` · +${ns.length - 4} more` : ''}</div>`;
      };
      const rows = [
        strengthened.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${strengthened.size}</span><span>concept${strengthened.size === 1 ? '' : 's'} strengthened</span></div>${names(strengthened)}` : '',
        corrected.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${corrected.size}</span><span>misconception${corrected.size === 1 ? '' : 's'} corrected</span></div>${names(corrected)}` : '',
        confidentMisses.size ? `<div class="rc-disc-row rc-disc-warn"><span class="rc-disc-n">${confidentMisses.size}</span><span>certain — but wrong. Reread these first</span></div>${names(confidentMisses)}` : '',
        slipped.size ? `<div class="rc-disc-row"><span class="rc-disc-n">${slipped.size}</span><span>noted to revisit</span></div>${names(slipped)}` : '',
      ].join('');
      // Momentum: the finished drill points at the next most sensible thing,
      // so the learner never has to ask "where do I go now?"
      let momentum;
      if (nav && nav.next) {
        momentum = `<a class="rc-go" href="#/journey/${nav.chapter}/s/${encodeURIComponent(nav.next.section)}" style="margin-top:26px;">Continue to ${escapeHtml(nav.next.section)} · ${escapeHtml(nav.next.name)}</a>
          <div class="rc-sub" style="justify-content:center;"><a href="#/journey/${nav.chapter}" style="color:var(--ink-faint);text-decoration:none;">Back to ${escapeHtml(nav.place)}</a></div>`;
      } else if (nav) {
        momentum = `<a class="rc-go" href="#/drill/ch/${nav.chapter}" style="margin-top:26px;">${Icon('dice')}&nbsp; Chapter Review — everything mixed</a>
          <div class="rc-sub" style="justify-content:center;"><a href="#/journey/${nav.chapter}" style="color:var(--ink-faint);text-decoration:none;">Back to ${escapeHtml(nav.place)}</a></div>`;
      } else if (filter) {
        momentum = `<a class="rc-go" href="#/journey/${filter.chapter}" style="margin-top:26px;">Back to ${escapeHtml(Geography.placeName(filter.chapter))}</a>`;
      } else {
        momentum = `<a class="rc-go" href="#/journey" style="margin-top:26px;">Keep studying</a>
          <div class="rc-sub" style="justify-content:center;"><a href="#/home" style="color:var(--ink-faint);text-decoration:none;">Back to the observatory</a></div>`;
      }
      root.innerHTML = `
        <div class="rc-done">
          <div class="rc-kick kicker">${nav ? escapeHtml(nav.section + ' · ' + nav.sectionName) : "Today's discoveries"}</div>
          <div class="rc-disc">${rows || `<div class="rc-disc-row"><span class="rc-disc-n">${sessionCorrect}</span><span>recognized</span></div>`}</div>
          <div class="rc-ask" style="margin-top:18px;">Structural integrity ${integ.pct}% · ${integ.held} skills held solid</div>
          ${momentum}
        </div>
      `;
    };

    renderQuestion();
  },
};

function errorTagPickerHtml() {
  const types = [
    ['conceptual', 'Wrong technique'],
    ['procedural', 'Right idea, messed up steps'],
    ['algebra', 'Algebra slip'],
    ['presentation', 'Missing +C / justification'],
    ['strategy', 'Overthought it / ran out of time'],
  ];
  return `
    <div class="rc-slip">
      <div class="kicker" style="margin-bottom:10px;">What kind of slip?</div>
      <div class="error-tag-row">
        ${types.map(([v, l]) => `<button type="button" class="error-tag" data-type="${v}">${l}</button>`).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
window.escapeHtml = window.escapeHtml || escapeHtml;
