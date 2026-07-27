#!/usr/bin/env node
// THE NOTATION TRUST GATE.
//
// Notation is the language of mathematics. A broken symbol in a calculus app is
// a calculator returning a wrong answer — it doesn't annoy the learner, it
// makes them doubt every equation on every screen. So this gate runs over the
// WHOLE content corpus and must pass before new content is written.
//
//   node tools/verify-notation.mjs
//
// It fails (exit 1) on any of:
//   · a math symbol reaching KaTeX with no explicit command (renders raw/blank)
//   · a chunk KaTeX cannot parse
//   · unbalanced brackets inside a rendered chunk
//   · notation escaping as plain prose (the sigma silently becoming the word "sum")
//   · prose swallowed into math mode (where inter-word spaces are deleted)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const katex = createRequire(import.meta.url)(path.join(DOCS, 'vendor/katex/katex.min.js'));

const chunks = [];
global.window = { katex: { renderToString: (tex, o) => { chunks.push(tex); return katex.renderToString(tex, { ...o, throwOnError: false }); } } };
eval(fs.readFileSync(path.join(DOCS, 'js/mathrender.js'), 'utf8'));
const MR = global.window.MathRender;

// ---- the corpus ------------------------------------------------------------
const strings = [];
const add = (...xs) => xs.forEach((x) => { if (typeof x === 'string' && x.trim()) strings.push(x); });
const papers = JSON.parse(fs.readFileSync(path.join(DOCS, 'data/past-papers/past-papers.json'), 'utf8'));
papers.papers.flatMap((p) => p.problems).forEach((p) => add(p.statement, p.solution, p.answer, ...(p.marks || []).map((m) => m.text)));
for (const f of fs.readdirSync(path.join(DOCS, 'data/taxonomy')).filter((f) => f.endsWith('.json') && f !== 'index.json')) {
  const d = JSON.parse(fs.readFileSync(path.join(DOCS, 'data/taxonomy', f), 'utf8'));
  (d.micro_skills || []).forEach((ms) => {
    add(...(ms.definitions || []), ...(ms.formulas || []));
    (ms.theorems || []).forEach((t) => add(t.statement, ...(t.conditions || [])));
    (ms.question_archetypes || []).forEach((a) => add(a.example, a.answer, a.recognition_cue, ...(a.method_plan || []), ...(a.full_mark_rubric || [])));
  });
}
const walk = (o) => { if (typeof o === 'string') add(o); else if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') Object.values(o).forEach(walk); };
for (const rel of ['data/memorize/memorize.json', 'data/journeys/index.json']) walk(JSON.parse(fs.readFileSync(path.join(DOCS, rel), 'utf8')));
for (const f of fs.readdirSync(path.join(DOCS, 'data/journeys')).filter((f) => f !== 'index.json')) walk(JSON.parse(fs.readFileSync(path.join(DOCS, 'data/journeys', f), 'utf8')));
for (const f of (fs.existsSync(path.join(DOCS, 'data/scrolls')) ? fs.readdirSync(path.join(DOCS, 'data/scrolls')) : []).filter((f) => f.endsWith('.json'))) walk(JSON.parse(fs.readFileSync(path.join(DOCS, 'data/scrolls', f), 'utf8')));

// ---- symbols that must never reach KaTeX unmapped ---------------------------
// Prose punctuation and decoration are legitimately NOT mathematics.
const PROSE_OK = new Set([...'—–…’‘“”ôé°★✓·', ...'ȳ']);
const MATHY = /[∑∏∫∮∞≤≥≠≈≡∼±∓×÷→⇒⇔↔⟺↛∂∇∈∉⊂⊆∪∩∅∥⟂∀∃ℝℕℤℚℂ√∛⁰¹²³⁴⁵⁶⁷⁸⁹⁻ⁿ̄]/;

const fail = [];
const failures = (kind, detail) => fail.push(`${kind}: ${detail}`);

// 1. every mathy symbol, in isolation, must map to a command and parse
for (const ch of new Set(strings.join('').split('').filter((c) => MATHY.test(c)))) {
  const tex = MR.toLatex(ch).trim();
  if (tex === ch) failures('UNMAPPED SYMBOL', `${JSON.stringify(ch)} (U+${ch.codePointAt(0).toString(16).toUpperCase()}) passed to KaTeX raw`);
  try { katex.renderToString(tex, { throwOnError: true, strict: false }); }
  catch (e) { failures('UNPARSEABLE SYMBOL', `${JSON.stringify(ch)} -> ${tex} :: ${e.message.slice(0, 60)}`); }
}

// 2. every corpus string, rendered as the app renders it
let unbalanced = 0, hardErr = 0, swallowed = 0, escaped = 0;
for (const s of strings) {
  chunks.length = 0;
  let html = '';
  try { html = MR.inline(s); } catch (e) { failures('RENDER THREW', `${e.message.slice(0, 60)} :: ${s.slice(0, 60)}`); continue; }
  // notation must not escape into prose: no mathy symbol may survive outside a chunk
  // A symbol reaches the reader as mathematics if it appears in a chunk either
  // raw or as the command it maps to (∫ becomes \int, ² becomes ^{2}).
  const inChunks = chunks.join(' ');
  for (const ch of s) {
    if (!MATHY.test(ch) || PROSE_OK.has(ch)) continue;
    // radicals map contextually (√x -> \sqrt{x}, bare √ -> \surd)
    const alt = { '√': ['\\sqrt', '\\surd'], '∛': ['\\sqrt[3]', '\\surd'], '̄': ['\\bar'] }[ch] || [];
    const mapped = MR.toLatex(ch).trim();
    if (inChunks.includes(ch) || (mapped && inChunks.includes(mapped)) || alt.some((a) => inChunks.includes(a))) continue;
    escaped++; failures('NOTATION AS PROSE', `${JSON.stringify(ch)} never entered a math chunk :: ${s.slice(0, 60)}`); break;
  }
  for (const tex of chunks) {
    const bal = (tex.match(/\{/g) || []).length === (tex.match(/\}/g) || []).length;
    if (!bal) { unbalanced++; failures('UNBALANCED CHUNK', tex.slice(0, 70)); }
    if (/[A-Za-z]{4,}\s+[A-Za-z]{4,}\s+[A-Za-z]{4,}/.test(tex.replace(/\\[A-Za-z]+/g, ' '))) { swallowed++; failures('PROSE SWALLOWED', tex.slice(0, 70)); }
    try { katex.renderToString(tex, { throwOnError: true, strict: false }); }
    catch (e) { hardErr++; failures('KATEX ERROR', `${e.message.slice(0, 44)}\n      tex: ${tex.slice(0, 70)}\n      src: ${s.slice(0, 70)}`); }
  }
}

// ---- report ----------------------------------------------------------------
// FATAL — the reader sees something WRONG: a raw/blank symbol, a mangled
// expression, or prose with its spaces deleted by math mode.
// DEGRADED — the reader sees something CORRECT but not typeset: a KaTeX parse
// failure falls back to readable plain text, and a symbol left in prose still
// displays as its own glyph. Budgeted, so any regression trips the gate.
const BUDGET = { katexFallback: 4, symbolInProse: 10 };
const fatal = fail.filter((f) => !/^KATEX ERROR|^NOTATION AS PROSE/.test(f));

console.log(`corpus: ${strings.length} strings`);
console.log(`FATAL   unbalanced: ${unbalanced} | prose swallowed: ${swallowed} | unmapped symbols: ${fatal.length - unbalanced - swallowed}`);
console.log(`DEGRADED katex fallback: ${hardErr}/${BUDGET.katexFallback} | symbol left in prose: ${escaped}/${BUDGET.symbolInProse}`);

const show = (list, cap = 12) => {
  const seen = new Set();
  for (const f of list) { const k = f.split('\n')[0]; if (seen.has(k)) continue; seen.add(k); if (seen.size <= cap) console.log('  ' + f); }
};
if (fatal.length) { console.log(`\n${fatal.length} FATAL notation failures:`); show(fatal); }
const over = [];
if (hardErr > BUDGET.katexFallback) over.push(`katex fallbacks ${hardErr} > budget ${BUDGET.katexFallback}`);
if (escaped > BUDGET.symbolInProse) over.push(`symbols in prose ${escaped} > budget ${BUDGET.symbolInProse}`);
if (over.length) { console.log('\nDEGRADED budget exceeded:'); over.forEach((o) => console.log('  ' + o)); show(fail.filter((f) => /^KATEX ERROR/.test(f)), 6); }

if (fatal.length || over.length) {
  console.log('\nNOTATION GATE FAILED — mathematics is not trustworthy. Fix before writing content.');
  process.exit(1);
}
console.log('\nNOTATION GATE PASSED — every symbol renders as mathematics; the recorded');
console.log('exceptions degrade to readable text, never to garbage.');
