// Exam-priority weighting. Reads the professor's favored section prefixes from
// past-papers.json so the daily drills front-load what actually shows up on the exam.

let PREFIXES = null;

async function load() {
  if (PREFIXES) return PREFIXES;
  try {
    const data = await DataLoader.fetchJSON('data/past-papers/past-papers.json');
    PREFIXES = data.priority_micro_skill_prefixes || [];
  } catch (e) {
    PREFIXES = [];
  }
  return PREFIXES;
}

function isPrioritySection(section) {
  if (!PREFIXES || !section) return false;
  return PREFIXES.some((p) => section === p || String(section).startsWith(p));
}

// Reorder a list of {id, section} so exam-priority items come first (stable).
function prioritize(items) {
  const pri = [];
  const rest = [];
  items.forEach((it) => (isPrioritySection(it.section) ? pri : rest).push(it));
  return pri.concat(rest);
}

window.Priority = { load, isPrioritySection, prioritize };
