// The Examiner's Desk — the exam lens laid over a chapter.
//
// It does not replace the chapter structure; a learner still needs a coherent
// conceptual foundation. It answers the question the chapter list cannot:
// *where should I spend my effort?* — and it answers it from the eight real
// papers rather than from anybody's opinion.

function starRow(n) {
  return `<span class="xd-stars" aria-label="${n} of 5">${'★'.repeat(n)}<span class="xd-stars-off">${'★'.repeat(5 - n)}</span></span>`;
}

window.ExaminerMode = {
  async render(root, sub) {
    const chapter = sub && sub[0];
    if (!chapter) { location.hash = '#/journey'; return; }
    await Examiner.load();
    const [microSkills, archetypes] = await Promise.all([DB.getAll('microSkills'), DB.getAll('archetypes')]);
    const head = microSkills.find((m) => String(m.chapter) === String(chapter));
    if (!head) { root.innerHTML = `<div class="card">Not found. <a href="#/journey">Back</a></div>`; return; }
    const data = Examiner.forChapter(chapter, microSkills, archetypes);

    const header = `
      <a class="crumb" href="#/journey/${chapter}">${Icon('back')} ${escapeHtml(Geography.placeName(chapter))}</a>
      <div class="editorial">
        <div class="ghost-word">exam</div>
        <div class="fg">
          <div class="kicker">${escapeHtml(head.chapterTitle)}</div>
          <div class="display">The examiner's desk</div>
          <div class="lede">What this chapter is actually asked to do, counted across ${data.total} real papers. Frequency here is evidence, not opinion.</div>
        </div>
      </div>`;

    if (!data.hasEvidence) {
      // Honesty outranks completeness: no papers for this course, no ranking.
      root.innerHTML = `${header}
        <div class="xd-empty">
          <div class="xd-empty-t">No past papers for this course yet</div>
          <p class="mono-p">The eight papers on file are all Calculus 2, and none of them draws on
          ${escapeHtml(Geography.placeName(chapter))}. Rather than invent a ranking, this desk stays empty
          until real papers for ${escapeHtml(head.course === 'calculus-1' ? 'Calculus 1' : 'this course')} are added.</p>
          <a class="rc-go" href="#/journey/${chapter}">Study the chapter instead</a>
        </div>`;
      return;
    }

    const card = (t, i) => `
      <section class="xd-type">
        <div class="xd-head">
          <span class="xd-rank">${i + 1}</span>
          <div class="xd-headmain">
            <div class="xd-label">${escapeHtml(t.label)}</div>
            <div class="xd-freq">${starRow(t.stars)}<span>appears in <strong>${t.inPapers} of ${t.totalPapers}</strong> papers${t.marksTypical ? ` · ~${t.marksTypical} marks` : ''}</span></div>
          </div>
        </div>
        ${t.why ? `<p class="xd-why">${MathRender.inline(t.why)}</p>` : ''}
        ${t.hardenedBy ? `<div class="xd-hard"><span class="xd-hard-lbl">Usually made difficult by</span>${MathRender.inline(t.hardenedBy)}</div>` : ''}
        ${t.example ? `<div class="xd-eg"><div class="xd-eg-lbl">A real one</div><div class="xd-eg-body">${MathRender.inline(t.example.statement)}</div></div>` : ''}
        ${t.traps.length ? `<div class="xd-traps"><div class="xd-traps-lbl">Where the marks go</div>
          <ul class="mono-list mono-traps">${t.traps.map((x) => `<li>${MathRender.inline(x)}</li>`).join('')}</ul></div>` : ''}
        ${t.sections.length ? `<div class="xd-secs">${t.sections.map((s) => `<a class="xd-sec" href="#/journey/${s.split('.')[0]}/s/${encodeURIComponent(s)}">${escapeHtml(s)}${Icon('forward')}</a>`).join('')}</div>` : ''}
      </section>`;

    const top = data.types.slice(0, 2);
    const share = top.length ? top[top.length - 1].cumulativeShare : 0;

    root.innerHTML = `${header}
      <div class="xd-verdict">Master the top ${top.length} and you cover <strong>${share}%</strong> of this chapter's exam marks.</div>
      <div class="xd-list">${data.types.map(card).join('')}</div>
      <a class="jn-secondary" href="#/exam/mock" style="margin-top:22px;">${Icon('exam')}&nbsp; Sit a paper in this style</a>`;
  },
};
