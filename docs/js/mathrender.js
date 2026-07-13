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
      if (/[A-Za-z0-9._'^!\\]/.test(c)) { j--; continue; }
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
      if (/[A-Za-z0-9._'!]/.test(c)) { k++; continue; }
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

  function toLatex(s) {
    let t = ' ' + s + ' ';

    // strip $-delimiters and normalize vulgar fractions (KaTeX has no glyph for ½, ¾, …)
    t = t.replace(/\$/g, ' ');
    t = t.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (m) => VULGAR[m] + ' ');

    // word forms -> symbols
    t = t.replace(/\bintegral\b/g, '∫');
    t = t.replace(/\binfinity\b/gi, '∞');

    // sqrt(...) -> \sqrt{...} (recurse into the argument)
    t = replaceBalanced(t, 'sqrt', (arg) => '\\sqrt{' + toLatex(arg) + '}');

    // upright function names
    OPNAMES.forEach((fn) => {
      t = t.replace(new RegExp('\\b' + fn + '\\b', 'g'), '\\operatorname{' + fn + '}');
    });
    FUNCS.forEach((fn) => {
      t = t.replace(new RegExp('\\b' + fn + '\\b', 'g'), '\\' + fn + ' ');
    });

    // superscripts: ^(...) grabs the whole parenthesized exponent; a bare ^ grabs
    // only a signed number or a single letter (compound exponents use parens in the data)
    t = t.replace(/\^\(([^()]+)\)/g, (m, g) => '^{' + g + '}');
    t = t.replace(/\^(-?\d+|-?[A-Za-z])/g, '^{$1}');
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
    if (/[\^_∫√∑∏∞πθλαβεφμΔ≤≥≠→±∈×÷·°]/.test(core)) return true;   // math symbols
    if (/[A-Za-z0-9]\([^()]*\)/.test(core)) return true;              // f(x), sin(3x)
    if (/[A-Za-z0-9)]\^/.test(core)) return true;                    // x^2
    if (/=/.test(core)) return true;                                 // equations
    if (/^[-+]?\d+(\.\d+)?([+\-*/^]\S+)+$/.test(core)) return true;   // 2n^2-n
    if (/^(integral|sqrt|lim|dx|dy|dt|du|dr)$/i.test(core)) return true;
    if (FUNCS.some((f) => new RegExp('^' + f + '\\b', 'i').test(core))) return true;
    if (/^[a-zA-Z]\/[a-zA-Z0-9(]/.test(core)) return true;           // d/dx, dy/dt
    return false;
  }

  // Render mixed prose+math: typeset only the math runs.
  function inline(str) {
    if (str === undefined || str === null) return '';
    const tokens = String(str).split(/(\s+)/); // keep whitespace
    let out = '';
    let run = [];
    const flush = () => {
      if (!run.length) return;
      let s = run.join('');
      run = [];
      // peel trailing whitespace so the gap before following prose survives
      let tail = '';
      const tw = s.match(/\s+$/);
      if (tw) { tail = tw[0]; s = s.slice(0, -tail.length); }
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
    for (const tok of tokens) {
      if (/^\s+$/.test(tok)) {
        if (run.length) run.push(tok); else out += tok;
        continue;
      }
      if (wordIsMath(tok)) {
        run.push(tok);
      } else {
        flush();
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
