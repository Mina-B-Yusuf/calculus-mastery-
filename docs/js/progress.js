// Progress, streaks, XP, daily goal. Stored as a single 'progress' record in meta.

const DAILY_GOAL = 20;               // reps per day
const XP_CORRECT = 12;
const XP_TRY = 4;

function todayKey(d) { d = d || new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function levelFor(xp) { return Math.floor((Math.sqrt(1 + 8 * xp / 100) - 1) / 2) + 1; }
function xpForLevel(lvl) { return Math.round(100 * ((lvl - 1) * lvl) / 2); } // inverse of levelFor

async function getState() {
  const rec = (await DB.get('meta', 'progress')) || {};
  const p = {
    xp: rec.xp || 0,
    streak: rec.streak || 0,
    lastDay: rec.lastDay || null,
    dayDate: rec.dayDate || null,
    dayReps: rec.dayReps || 0,
    dayCorrect: rec.dayCorrect || 0,
    bestSpeed: rec.bestSpeed || 0,
    totalCorrect: rec.totalCorrect || 0,
  };
  // reset daily counter if the day changed
  if (p.dayDate !== todayKey()) { p.dayReps = 0; p.dayCorrect = 0; p.dayDate = todayKey(); }
  const level = levelFor(p.xp);
  const thisLvlXp = xpForLevel(level);
  const nextLvlXp = xpForLevel(level + 1);
  return {
    ...p, level,
    goal: DAILY_GOAL,
    levelProgress: (p.xp - thisLvlXp) / (nextLvlXp - thisLvlXp),
    xpIntoLevel: p.xp - thisLvlXp,
    xpForNext: nextLvlXp - thisLvlXp,
  };
}

async function save(p) {
  await DB.put('meta', {
    key: 'progress', xp: p.xp, streak: p.streak, lastDay: p.lastDay,
    dayDate: p.dayDate, dayReps: p.dayReps, dayCorrect: p.dayCorrect,
    bestSpeed: p.bestSpeed, totalCorrect: p.totalCorrect,
  });
}

// Record one answered item. Returns { leveledUp, newStreak, state }.
async function award(correct, xpOverride) {
  const s = await getState();
  const prevLevel = s.level;

  // streak: count a study day; increment if yesterday, keep if today, reset if gap
  const today = todayKey();
  if (s.lastDay !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    s.streak = (s.lastDay === todayKey(y)) ? s.streak + 1 : 1;
    s.lastDay = today;
  }

  s.xp += (xpOverride != null) ? xpOverride : (correct ? XP_CORRECT : XP_TRY);
  s.dayReps += 1;
  if (correct) { s.dayCorrect += 1; s.totalCorrect += 1; }
  await save(s);

  const state = await getState();
  return { leveledUp: state.level > prevLevel, streak: state.streak, justHitGoal: state.dayReps === DAILY_GOAL, state };
}

async function recordSpeedScore(score) {
  const s = await getState();
  if (score > s.bestSpeed) { s.bestSpeed = score; await save(s); }
  return s.bestSpeed;
}

// Structural Integrity, presence, per-hall state, and everything the world shows
// now live in the Observatory simulation (observatory.js). Progress keeps only
// the internal counters (streak day-tracking, daily reps) that the simulation
// and scheduler rely on — none of which are surfaced as a score.

window.Progress = { getState, award, recordSpeedScore, levelFor, DAILY_GOAL };
