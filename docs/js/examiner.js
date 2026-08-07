// The Examiner's Desk — a map of where the marks actually are.
//
// A student preparing for an exam does not want a chapter list; they want to
// know where to spend their effort. This module answers that from EVIDENCE:
// it counts how often each problem template appears across the real past
// papers and what it costs, then links each type to the sections it draws on
// and the mistakes that historically lose the marks.
//
// Frequency is never authored — it is computed. Only the "why the examiner
// tests this" is written by hand, because a star rating without a reason
// teaches nothing. Where there is no exam evidence for a course, this module
// says so rather than inventing a ranking.

(function () {
  let PAPERS = null, META = null, NOTES = null;

  async function load() {
    if (PAPERS) return;
    const d = await DataLoader.fetchJSON('data/past-papers/past-papers.json');
    PAPERS = d.papers; META = d;
    try { NOTES = await DataLoader.fetchJSON('data/past-papers/examiner-notes.json'); }
    catch (e) { NOTES = { why: {} }; }
  }

  // Which course a chapter belongs to, and whether we hold papers for it.
  function papersCover(chapter, microSkills) {
    const any = microSkills.find((m) => String(m.chapter) === String(chapter));
    const course = any && any.course;
    // Every stored paper is from the Calculus 2 course; a chapter only has
    // exam evidence if a real problem actually cites one of its sections.
    return { course, hasEvidence: PAPERS.some((p) => p.problems.some((pr) => (pr.sections || []).some((s) => s.split('.')[0] === String(chapter)))) };
  }

  function forChapter(chapter, microSkills, archetypes) {
    const cover = papersCover(chapter, microSkills);
    const total = PAPERS.length;
    if (!cover.hasEvidence) return { hasEvidence: false, total, course: cover.course };

    // count appearances per template, restricted to problems touching this chapter
    const seenPerPaper = {}, cost = {}, secs = {}, examples = {};
    PAPERS.forEach((p) => {
      const here = new Set();
      p.problems.forEach((pr) => {
        const t = pr.template;
        if (!t) return;
        const touches = (pr.sections || []).filter((s) => s.split('.')[0] === String(chapter));
        if (!touches.length) return;
        here.add(t);
        (cost[t] = cost[t] || []).push(pr.part === 'A' ? 5 : 3);
        secs[t] = secs[t] || new Set();
        touches.forEach((s) => secs[t].add(s));
        if (!examples[t]) examples[t] = pr;
      });
      here.forEach((t) => { seenPerPaper[t] = (seenPerPaper[t] || 0) + 1; });
    });

    // the traps that historically cost marks: the error types recorded against
    // the archetypes in the sections this template draws on
    const msById = {};
    microSkills.forEach((m) => (msById[m.id] = m));
    const trapsFor = (sectionSet) => {
      const counts = {};
      archetypes.forEach((a) => {
        const ms = msById[a.microSkillId];
        if (!ms || !sectionSet.has(String(ms.section))) return;
        (a.commonErrors || []).forEach((e) => {
          const k = (e.description || '').trim();
          if (k) counts[k] = (counts[k] || 0) + 1;
        });
      });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([d]) => d);
    };

    const types = Object.keys(seenPerPaper).map((t) => {
      const n = seenPerPaper[t];
      const marks = cost[t] || [];
      return {
        template: t,
        label: (META.templates || {})[t] || t,
        inPapers: n,
        totalPapers: total,
        stars: Math.max(1, Math.round((n / total) * 5)),
        marksTypical: marks.length ? Math.round(marks.reduce((a, b) => a + b, 0) / marks.length) : null,
        marksTotal: marks.reduce((a, b) => a + b, 0),
        sections: [...(secs[t] || [])].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true })),
        traps: trapsFor(secs[t] || new Set()),
        why: (NOTES.why || {})[t] || '',
        hardenedBy: (NOTES.hardenedBy || {})[t] || '',
        example: examples[t] || null,
      };
    }).sort((a, b) => b.inPapers - a.inPapers || b.marksTotal - a.marksTotal);

    // what share of the paper's marks these types account for, cumulatively
    const grand = types.reduce((s, t) => s + t.marksTotal, 0);
    let run = 0;
    types.forEach((t) => { run += t.marksTotal; t.cumulativeShare = grand ? Math.round((run / grand) * 100) : 0; });

    return { hasEvidence: true, total, course: cover.course, types };
  }

  window.Examiner = { load, forChapter, papers: () => PAPERS };
})();
