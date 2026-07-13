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

    // fractions: convert A/B to \frac when at least one side is parenthesized
    t = t.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
    t = t.replace(/([A-Za-z0-9]+|\\,?d[a-zθ])\s*\/\s*\(([^()]+)\)/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');
    t = t.replace(/\(([^()]+)\)\s*\/\s*([A-Za-z0-9]+)/g, (m, a, b) => '\\frac{' + a + '}{' + b + '}');

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
