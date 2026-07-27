// Pretty-math rendering. Converts the plain-text notation used in the question
// bank ("∫ x e^x dx", "sin^-1(x/a)", "x^(1/3)") into LaTeX and typesets it with
// KaTeX. Strings are segmented so prose (word problems) stays as text and only the
// mathematical runs get typeset.

(function () {
  // Names KaTeX renders upright via a built-in \command.
  const FUNCS = ['arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'ln', 'log', 'exp',
    'lim', 'max', 'min', 'det', 'gcd', 'deg'];
  // Names with no built-in command — render via \operatorname{}.
  const OPNAMES = ['sgn', 'erf', 'erfc', 'Var', 'Cov', 'Pr', 'arg', 'Re', 'Im'];

  // The question bank spells greek letters as words ("Delta y/Delta t", "epsilon-delta").
  // Map them to glyphs first so they read as symbols and bind to their operand.
  const GREEK = { Delta: 'Δ', Sigma: 'Σ', Omega: 'Ω', Theta: 'Θ', Lambda: 'Λ', Gamma: 'Γ', Phi: 'Φ', Psi: 'Ψ', Pi: 'Π', Xi: 'Ξ',
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ',
    lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω' };
  const GREEK_TEX = { 'Δ': '\\Delta', 'Σ': '\\Sigma', 'Ω': '\\Omega', 'Θ': '\\Theta', 'Λ': '\\Lambda', 'Γ': '\\Gamma', 'Φ': '\\Phi', 'Ψ': '\\Psi', 'Π': '\\Pi', 'Ξ': '\\Xi',
    'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta', 'ε': '\\epsilon', 'ζ': '\\zeta', 'η': '\\eta', 'θ': '\\theta', 'ι': '\\iota', 'κ': '\\kappa',
    'λ': '\\lambda', 'μ': '\\mu', 'ν': '\\nu', 'ξ': '\\xi', 'π': '\\pi', 'ρ': '\\rho', 'ς': '\\varsigma', 'σ': '\\sigma', 'τ': '\\tau', 'υ': '\\upsilon', 'φ': '\\phi', 'χ': '\\chi', 'ψ': '\\psi', 'ω': '\\omega' };
  // Mathematical symbols are the LANGUAGE — never pass one to KaTeX raw and hope.
  // Every symbol that can reach a math chunk maps to an explicit command here.
  // (√ and ∛ are handled separately in toLatex: they need an argument.)
  const SYM_TEX = {
    '∑': '\\sum', '∏': '\\prod', '∫': '\\int', '∮': '\\oint', '∞': '\\infty',
    '≤': '\\le', '≥': '\\ge', '≠': '\\ne', '≈': '\\approx', '≡': '\\equiv', '∼': '\\sim',
    '±': '\\pm', '∓': '\\mp', '×': '\\times', '÷': '\\div', '·': '\\cdot', '−': '-',
    '→': '\\to', '⇒': '\\Rightarrow', '⇔': '\\Leftrightarrow', '↔': '\\leftrightarrow',
    '⟺': '\\iff', '↛': '\\nrightarrow', '∂': '\\partial', '∇': '\\nabla',
    '∈': '\\in', '∉': '\\notin', '⊂': '\\subset', '⊆': '\\subseteq', '∪': '\\cup', '∩': '\\cap',
    '∅': '\\emptyset', '∥': '\\parallel', '⟂': '\\perp', '∀': '\\forall', '∃': '\\exists',
    'ℝ': '\\mathbb{R}', 'ℕ': '\\mathbb{N}', 'ℤ': '\\mathbb{Z}', 'ℚ': '\\mathbb{Q}', 'ℂ': '\\mathbb{C}',
    '°': '^\\circ', 'ȳ': '\\bar{y}', 'x̄': '\\bar{x}', '…': '\\dots', '⋯': '\\cdots',
  };
  const SYMS = '∑∏∫∮∞≤≥≠≈≡∼±∓×÷·−→⇒⇔↔⟺↛∂∇∈∉⊂⊆∪∩∅∥⟂∀∃ℝℕℤℚℂ°…⋯';
  const BIGOPS = '∑∏∫∮';   // prefix operators: never absorbed into a neighbouring operand
  // Operand grabbers and the final symbol pass both walk this set, so symbols
  // bind to their operands exactly like greek letters do.
  const GLYPHS = 'ΔΣΩΘΛΓΦΨΠΞαβγδεζηθικλμνξπρσςτυφχψω' + SYMS + '√∛';
  // Any token carrying a mathematical symbol IS mathematics — the set that
  // triggers this must be the same set the renderer knows how to map, or a
  // symbol can silently escape into prose (⇒, ≈, x̄ all did). Ellipses are
  // excluded: they are prose punctuation far more often than notation.
  const MATH_TRIGGER = new RegExp('[\\^_\\u0304\\u2070\\u00b9\\u00b2\\u00b3\\u2074-\\u207f' + GLYPHS.replace(/[…⋯]/g, '') + ']');
  const GREEK_WORD = 'Delta|Sigma|Omega|Theta|Lambda|Gamma|Phi|Psi|Pi|Xi|alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega';

  function greekify(s) {
    // "Delta y" -> "Δy": drop one space so the letter binds to a *lone* variable
    // (so a following "/" builds a stacked fraction). The lookahead requires the
    // next token to be a single variable/digit — never a word, so "theta between"
    // stays "θ between", not "θbetween".
    s = s.replace(new RegExp('\\b(' + GREEK_WORD + ')\\b[ ]?(?=[A-Za-z0-9](?![A-Za-z]))', 'g'), (m, w) => GREEK[w]);
    // any remaining standalone greek word -> glyph
    return s.replace(new RegExp('\\b(' + GREEK_WORD + ')\\b', 'g'), (m, w) => GREEK[w]);
  }

  // "sum" is Σ as an operator/notation but also an English noun ("sum of sines",
  // "sum identities"). Convert the notation form (sum_a^b) and the operator form
  // (sum followed by a summand: a paren, |…|, a function, or a lone variable) and
  // leave prose untouched.
  const FUNC_ALT = 'arcsin|arccos|arctan|sinh|cosh|tanh|sin|cos|tan|cot|sec|csc|ln|log|exp';
  function opsify(s) {
    s = s.replace(/\bsum(?=[_^])/g, '∑');
    // a summand may also open with a digit ("sum 1/n!" silently rendered the
    // word "sum" as prose and dropped the sigma entirely)
    s = s.replace(new RegExp('\\bsum\\b[ ]?(?=[(|\\d]|(?:' + FUNC_ALT + ')\\b|[A-Za-z](?![A-Za-z]))', 'g'), '∑');
    // "infinity" is always the symbol, in prose or notation
    s = s.replace(/\binfinity\b/gi, '∞');
    return s;
  }

  function escapeText(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Replace name(<balanced parens>) with wrap(inner). Handles nesting.
  function replaceBalanced(str, name, wrap) {
    let out = '';
    let i = 0;
    while (i < str.length) {
      const idx = str.indexOf(name + '(', i);
      if (idx === -1) { out += str.slice(i); break; }
      out += str.slice(i, idx);
      let depth = 0;
      let j = idx + name.length;
      const start = j + 1;
      for (; j < str.length; j++) {
        if (str[j] === '(') depth++;
        else if (str[j] === ')') { depth--; if (depth === 0) break; }
      }
      const inner = str.slice(start, j);
      out += wrap(inner);
      i = j + 1;
    }
    return out;
  }

  // Convert a chunk believed to be math into LaTeX.
  const VULGAR = {
    '½': '\\tfrac12', '⅓': '\\tfrac13', '⅔': '\\tfrac23', '¼': '\\tfrac14',
    '¾': '\\tfrac34', '⅕': '\\tfrac15', '⅖': '\\tfrac25', '⅗': '\\tfrac35',
    '⅘': '\\tfrac45', '⅙': '\\tfrac16', '⅚': '\\tfrac56', '⅛': '\\tfrac18',
    '⅜': '\\tfrac38', '⅝': '\\tfrac58', '⅞': '\\tfrac78',
  };

  const OPEN = { ')': '(', ']': '[', '}': '{' };
  const CLOSE = { '(': ')', '[': ']', '{': '}' };

  // Grab a balanced operand ending at index `end-1` (scanning left). Returns start index.
  function grabLeft(s, end) {
    let j = end - 1;
    while (j >= 0 && s[j] === ' ') j--;   // skip trailing spaces
    while (j >= 0) {
      const c = s[j];
      if (c === ')' || c === ']' || c === '}') {
        const open = OPEN[c];
        let depth = 1; j--;
        while (j >= 0 && depth > 0) {
          if (s[j] === c) depth++;
          else if (s[j] === open) depth--;
          j--;
        }
        continue;
      }
      if (c === '|') { // |...| absolute value
        j--;
        while (j >= 0 && s[j] !== '|') j--;
        j--;
        continue;
      }
      // A big operator is a PREFIX, never part of the operand beside it:
      // "sum 1/n!" must be Σ(1/n!), not (Σ1)/n!.
      if (BIGOPS.indexOf(c) !== -1) break;
      if (/[A-Za-z0-9._'^!\\]/.test(c) || GLYPHS.indexOf(c) !== -1) { j--; continue; }
      break; // stop at + - = , < > space \cdot or an opening bracket
    }
    return j + 1;
  }

  // Grab a balanced operand starting at index `start` (scanning right). Returns end index (exclusive).
  function grabRight(s, start) {
    let k = start;
    while (k < s.length && s[k] === ' ') k++;   // skip leading spaces
    if (k >= s.length) return start;
    while (k < s.length) {
      const c = s[k];
      if (c === '\\') { // \command possibly followed by {..} / [..]
        k++;
        while (k < s.length && /[A-Za-z]/.test(s[k])) k++;
        while (k < s.length && (s[k] === '{' || s[k] === '[')) k = skipGroup(s, k);
        continue;
      }
      if (c === '(' || c === '[' || c === '{') { k = skipGroup(s, k); continue; }
      if (c === '|') { k++; while (k < s.length && s[k] !== '|') k++; k++; continue; }
      if (BIGOPS.indexOf(c) !== -1) break;
      if (/[A-Za-z0-9._'!]/.test(c) || GLYPHS.indexOf(c) !== -1) { k++; continue; }
      if (c === '^' || c === '_') {
        k++;
        if (s[k] === '{' || s[k] === '(') k = skipGroup(s, k);
        else if (k < s.length) k++;
        continue;
      }
      break;
    }
    return k;
  }

  function skipGroup(s, i) {
    const open = s[i], close = CLOSE[open];
    let depth = 1, j = i + 1;
    while (j < s.length && depth > 0) {
      if (s[j] === open) depth++;
      else if (s[j] === close) depth--;
      j++;
    }
    return j;
  }

  // Turn A/B into \frac{A}{B}, grabbing balanced operands on each side. Operand
  // grabbers respect brackets, so this is safe to run at any nesting depth.
  function fracPass(s) {
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== '/') continue;
      const numStart = grabLeft(s, i);
      const denEnd = grabRight(s, i + 1);
      let num = stripOuterParens(s.slice(numStart, i).trim());
      let den = stripOuterParens(s.slice(i + 1, denEnd).trim());
      if (num && den && !/^[-+=,]/.test(num)) {
        const rep = '\\frac{' + fracPass(num) + '}{' + fracPass(den) + '}';
        return fracPass(s.slice(0, numStart) + rep + s.slice(denEnd));
      }
    }
    return s;
  }

  function stripOuterParens(x) {
    if (x.length >= 2 && x[0] === '(' && x[x.length - 1] === ')') {
      let depth = 0;
      for (let i = 0; i < x.length; i++) {
        if (x[i] === '(') depth++;
        else if (x[i] === ')') { depth--; if (depth === 0 && i < x.length - 1) return x; }
      }
      return x.slice(1, -1);
    }
    return x;
  }

  const SUPER = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+', 'ⁿ': 'n' };

  function toLatex(s) {
    // Compose accents first (y + combining macron -> ȳ), then turn any
    // surviving combining macron into a real \bar — a raw U+0304 is a hard
    // KaTeX parse error, not a cosmetic issue.
    s = String(s).normalize ? String(s).normalize('NFC') : String(s);
    s = s.replace(/([^\s])̄/g, (m, c) => '\\bar{' + c + '}');
    s = s.replace(/̄/g, '');                       // a stray combining mark is a hard KaTeX error
    s = s.replace(/_{2,}/g, (m) => '\\underline{\\hspace{' + (m.length * 0.45).toFixed(1) + 'em}}');
    // unicode superscripts ("x²", "e⁻¹") are notation, not text
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ⁿ]+/g, (m) => '^{' + [...m].map((c) => SUPER[c] || c).join('') + '}');
    let t = ' ' + greekify(opsify(s)) + ' ';

    // strip $-delimiters and normalize vulgar fractions (KaTeX has no glyph for ½, ¾, …)
    t = t.replace(/\$/g, ' ');
    t = t.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (m) => VULGAR[m] + ' ');

    // word forms -> symbols. "integral" is both the operator and an English noun;
    // convert the notation form (integral_a^b, integral(...)) and the operator form
    // (integral <integrand>), but leave a noun that is immediately followed by an
    // integral symbol — e.g. "the integral integral_1^∞ …" -> "the integral ∫_1^∞ …".
    t = t.replace(/\bintegral(?=[_^(])/g, '∫');
    t = t.replace(/\binfinity\b/gi, '∞');
    t = t.replace(/\bintegral\b(?!\s*∫)/g, '∫');

    // sqrt(...) -> \sqrt{...} (recurse into the argument)
    t = replaceBalanced(t, 'sqrt', (arg) => '\\sqrt{' + toLatex(arg) + '}');
    // the radical glyphs need an argument too — "√(x+1)" and "√x" both, or the
    // bare √ swallows the following bracket and renders a root of nothing
    t = replaceBalanced(t, '∛', (arg) => '\\sqrt[3]{' + toLatex(arg) + '}');
    t = replaceBalanced(t, '√', (arg) => '\\sqrt{' + toLatex(arg) + '}');
    t = t.replace(/∛\s*([A-Za-z0-9]+)/g, (m, g) => '\\sqrt[3]{' + g + '}');
    t = t.replace(/√\s*([A-Za-z0-9]+)/g, (m, g) => '\\sqrt{' + g + '}');
    t = t.replace(/[√∛]/g, '\\surd ');   // a truly bare radical, never raw

    // upright function names — boundary must count "_", digits and "(" as
    // delimiters (so "lim_(h->0)" and "max{...}" convert), and must not fire
    // after a backslash (so an existing command isn't doubled).
    OPNAMES.forEach((fn) => {
      t = t.replace(new RegExp('(^|[^A-Za-z\\\\])' + fn + '(?![A-Za-z])', 'g'), '$1\\operatorname{' + fn + '}');
    });
    FUNCS.forEach((fn) => {
      t = t.replace(new RegExp('(^|[^A-Za-z\\\\])' + fn + '(?![A-Za-z])', 'g'), '$1\\' + fn + ' ');
    });

    // a function command used as a sub/superscript label ("S_min") needs a group
    t = t.replace(/([_^])\s*\\(min|max|det|gcd|deg|lim|arg)\b\s*/g, '$1{\\$2}');
    // superscripts: ^(...) grabs the whole parenthesized exponent; a bare ^ grabs
    // only a signed number or a single letter (compound exponents use parens in the data)
    t = t.replace(/\^\(([^()]+)\)/g, (m, g) => '^{' + g + '}');
    // one-sided limits ("x->0^+", "x->a^-") are core notation; a bare sign
    // exponent left "^" dangling and KaTeX refused the whole expression
    t = t.replace(/\^(-?\d+|-?[A-Za-z]|[-+±∓])/g, '^{$1}');
    // a possessive after an exponent ("e^x's derivative") is prose, not a prime
    t = t.replace(/(\^\{[^}]*\})'s\b/g, '$1\\text{’s}');
    // subscripts
    t = t.replace(/_\(([^()]+)\)/g, (m, g) => '_{' + g + '}');
    t = t.replace(/_(-?\d+|-?[A-Za-z])/g, '_{$1}');

    // integral limits written as ∫[a,b]
    t = t.replace(/∫\s*\[([^\]]*?),([^\]]*?)\]/g, (m, a, b) => '∫_{' + a.trim() + '}^{' + b.trim() + '}');

    // fractions: build proper stacked \frac{}{} by grabbing balanced operands
    t = fracPass(t);

    // differentials get thin space
    t = t.replace(/(^|[^A-Za-z\\])d([xtuθrs])\b/g, '$1\\,d$2');

    // operators / symbols that KaTeX wants as commands
    t = t.replace(/->/g, '\\to ');
    t = t.replace(/<=/g, '\\le ').replace(/>=/g, '\\ge ').replace(/!=/g, '\\ne ');
    t = t.replace(/\+-/g, '\\pm ');
    t = t.replace(/\*/g, '\\cdot ');
    t = t.replace(/%/g, '\\%');

    // greek glyphs -> commands (last, so the added space can't split earlier operand grabs)
    t = t.replace(new RegExp('[' + GLYPHS + ']', 'g'), (m) => (GREEK_TEX[m] || SYM_TEX[m] || m) + ' ');

    return t.trim();
  }

  function renderChunk(s, displayMode) {
    try {
      return window.katex.renderToString(toLatex(s), {
        throwOnError: true,
        displayMode: !!displayMode,
        strict: false,
      });
    } catch (e) {
      return '<span class="math-fallback">' + escapeText(s) + '</span>';
    }
  }

  // Heuristic: does a whitespace-delimited word look like math?
  function wordIsMath(w) {
    const core = w.replace(/^[([]+/, '').replace(/[.,;:?)\]]+$/, '');
    if (!core) return false;
    if (MATH_TRIGGER.test(core)) return true;                       // math symbols
    if (/^(->|=>|<->|<=>)$/.test(core)) return true;                // ASCII arrows are always notation
    if (/[A-Za-z0-9]\([^()]*\)/.test(core)) return true;              // f(x), sin(3x)
    if (/[A-Za-z0-9]\([^()]*\)/.test(w)) return true;                 // …even when a trailing ) was peeled ("sqrt(x)")
    if (/[A-Za-z0-9)]\^/.test(core)) return true;                    // x^2
    if (/=/.test(core)) return true;                                 // equations
    if (/^[-+]?\d+(\.\d+)?([+\-*/^]\S+)+$/.test(core)) return true;   // 2n^2-n
    if (/^(integral|sqrt|lim|dx|dy|dt|du|dr)$/i.test(core)) return true;
    if (FUNCS.some((f) => new RegExp('^' + f + '\\b', 'i').test(core))) return true;
    if (/^[a-zA-Z]\/[a-zA-Z0-9(]/.test(core)) return true;           // d/dx, dy/dt
    return false;
  }

  // Net bracket opening of a token — used to keep a math run alive while any
  // bracket it opened is still unclosed.
  function bracketDelta(tok) {
    let d = 0;
    for (const ch of tok) {
      if (ch === '(' || ch === '[' || ch === '{') d++;
      else if (ch === ')' || ch === ']' || ch === '}') d--;
    }
    return d;
  }

  // Render mixed prose+math: typeset only the math runs.
  function inline(str) {
    if (str === undefined || str === null) return '';
    const tokens = greekify(opsify(String(str))).split(/(\s+)/); // normalize operators/greek, keep whitespace
    let out = '';
    let run = [];
    let runDepth = 0;   // unclosed brackets opened inside the current run
    const flush = () => {
      if (!run.length) return;
      let s = run.join('');
      run = [];
      // Safety net: if the bracket-glue swallowed a prose parenthetical
      // ("(even numbers stay even)"), emit it as TEXT — math mode deletes the
      // spaces between letters and would render it unreadable. Three or more
      // real words (function names don't count) means it was prose all along.
      const proseProbe = s.replace(new RegExp('\\b(' + FUNCS.concat(OPNAMES).join('|') + ')\\b', 'gi'), ' ');
      if ((proseProbe.match(/\b[A-Za-z]{3,}\b/g) || []).length >= 3) {
        out += escapeText(s);
        return;
      }
      // peel trailing whitespace so the gap before following prose survives
      let tail = '';
      const tw = s.match(/\s+$/);
      if (tw) { tail = tw[0]; s = s.slice(0, -tail.length); }
      // peel trailing operator glue — an operator followed by prose belonged
      // to the prose ("f(x) - a polynomial"), not to the mathematics
      const gm = s.match(/(?:\s*[-+·×\/]\s*)+$/);
      if (gm) { tail = gm[0] + tail; s = s.slice(0, s.length - gm[0].length); }
      // peel trailing sentence punctuation / wrapping quotes (keep closing parens — they're math)
      let punct = '';
      const pm = s.match(/[.,;:?'"]+$/);
      if (pm) { punct = pm[0]; s = s.slice(0, -punct.length); }
      // peel leading quotes so a stray ' doesn't become a prime with no base
      let lead = '';
      const lm = s.match(/^['"]+/);
      if (lm) { lead = lm[0]; s = s.slice(lead.length); }
      out += escapeText(lead);
      if (s) out += renderChunk(s, false);
      out += escapeText(punct) + tail;
    };
    // Pass 1 — classify every token. "glue" is a fragment that is mathematics
    // only in the company of mathematics: a bare operator, a digit, or a lone
    // variable. ("a", "A" and "I" are English words first, never variables.)
    const n = tokens.length;
    const sp = new Array(n), cls = new Array(n);
    for (let i = 0; i < n; i++) {
      const tok = tokens[i];
      sp[i] = tok === '' || /^\s+$/.test(tok);
      if (sp[i]) { cls[i] = 'sp'; continue; }
      // A token that OPENS a bracket around maths ("(1", "(e^(x^2/2)") is
      // mathematics even though its bare inner isn't a math word — but never a
      // prose parenthetical ("(a well-known fact)").
      const innerCore = tok.replace(/^[(\[{]+/, '').replace(/[)\]}.,;:]+$/, '');
      const opener = bracketDelta(tok) > 0
        && (innerCore === '' || /^\d+(\.\d+)?$/.test(innerCore) || wordIsMath(innerCore));
      if (wordIsMath(tok) || opener) cls[i] = 'math';
      else if (/^[-+·×÷\/]$/.test(tok) || /^\d+(\.\d+)?$/.test(tok) || /^(?![aAI]$)[A-Za-z]$/.test(tok)) cls[i] = 'glue';
      else cls[i] = 'prose';
    }
    // Pass 2 — glue joins the mathematics when it TOUCHES mathematics on
    // either side, so notation can no longer escape as prose: "x -> 0" was
    // rendered as three plain words because a lone "x" only counted as glue
    // when a run was already open to its left.
    const near = (i, dir) => { for (let j = i + dir; j >= 0 && j < n; j += dir) if (!sp[j]) return j; return -1; };
    for (let pass = 0; pass < 4; pass++) {
      let changed = false;
      for (let i = 0; i < n; i++) {
        if (cls[i] !== 'glue') continue;
        const p = near(i, -1), q = near(i, 1);
        if ((p >= 0 && cls[p] === 'math') || (q >= 0 && cls[q] === 'math')) { cls[i] = 'math'; changed = true; }
      }
      if (!changed) break;
    }
    // Pass 3 — emit. A run NEVER severs while a bracket it opened is unclosed
    // (the F91 trust bug: "(1 - cos(x^2))/(x(...))" split at the spaced minus
    // and each fragment became its own garbled fraction).
    for (let i = 0; i < n; i++) {
      const tok = tokens[i];
      if (sp[i]) { if (run.length) run.push(tok); else out += tok; continue; }
      if (cls[i] === 'math' || runDepth > 0) {
        run.push(tok);
        runDepth = Math.max(0, runDepth + bracketDelta(tok));
      } else {
        flush();
        runDepth = 0;
        out += escapeText(tok);
      }
    }
    flush();
    return out;
  }

  // Render a string that is expected to be a single math expression, as display math.
  function block(str) {
    if (str === undefined || str === null) return '';
    return '<div class="math-block">' + renderChunk(String(str), true) + '</div>';
  }

  window.MathRender = { inline, block, toLatex, escapeText };
})();
