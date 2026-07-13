// Lightweight SM-2-style spaced repetition scheduler.
// Quality: 0 = fail, 1 = hard (correct but slow/unsure), 2 = good, 3 = easy.

const DAY_MS = 24 * 60 * 60 * 1000;

function nextState(prev, quality) {
  const state = prev || { repetitions: 0, easeFactor: 2.5, intervalDays: 0 };
  let { repetitions, easeFactor, intervalDays } = state;

  if (quality === 0) {
    repetitions = 0;
    intervalDays = 1 / 24; // retry within the hour
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * easeFactor);

    const delta = 0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02);
    easeFactor = Math.max(1.3, easeFactor + delta);
  }

  const due = Date.now() + intervalDays * DAY_MS;
  return { repetitions, easeFactor, intervalDays, due, lastReviewed: Date.now() };
}

async function recordReview(kind, itemId, quality) {
  const key = `${kind}:${itemId}`;
  const prev = await DB.getSrs(key);
  const next = nextState(prev, quality);
  next.key = key;
  next.kind = kind;
  next.itemId = itemId;
  await DB.putSrs(next);
  return next;
}

async function getDueItems(kind, limit = 20) {
  const all = await DB.getAllSrs();
  const now = Date.now();
  return all
    .filter((r) => r.kind === kind && r.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, limit);
}

async function getNewOrDueIds(kind, allIds, limit = 20) {
  const all = await DB.getAllSrs();
  const seen = new Map(all.filter((r) => r.kind === kind).map((r) => [r.itemId, r]));
  const now = Date.now();
  const due = [];
  const fresh = [];
  for (const id of allIds) {
    const row = seen.get(id);
    if (!row) fresh.push(id);
    else if (row.due <= now) due.push({ id, due: row.due });
  }
  due.sort((a, b) => a.due - b.due);
  const result = due.map((d) => d.id);
  for (const id of fresh) {
    if (result.length >= limit) break;
    result.push(id);
  }
  return result.slice(0, limit);
}

window.SRS = { recordReview, getDueItems, getNewOrDueIds, nextState };
