// A touch-friendly calculus keyboard that edits a LaTeX string with a live
// KaTeX preview. Buttons insert LaTeX at a caret; template buttons (fraction,
// power, integral, …) drop a placeholder box and park the caret inside it.
//
//   const kb = MathKeyboard.create({ onChange(latex){...} });
//   container.appendChild(kb.el);
//   kb.getValue();  kb.setValue('x^2');  kb.clear();

(function () {
  const CARET = '‸'; // internal marker for desired caret position in templates

  // Tab definitions. Each key: [label, snippet]. If snippet contains CARET it's a
  // template (caret parks there); otherwise it's inserted literally at the caret.
  const TABS = {
    '123': [
      ['7', '7'], ['8', '8'], ['9', '9'], ['(', '('], [')', ')'],
      ['4', '4'], ['5', '5'], ['6', '6'], ['+', '+'], ['-', '-'],
      ['1', '1'], ['2', '2'], ['3', '3'], ['\\times', '\\cdot '], ['\\div', '/'],
      ['0', '0'], ['.', '.'], ['=', '='], ['x', 'x'], ['y', 'y'],
    ],
    'f(x)': [
      ['x^2', '^{2}'], ['x^n', '^{' + CARET + '}'], ['\\sqrt{\\ }', '\\sqrt{' + CARET + '}'],
      ['\\sqrt[n]{\\ }', '\\sqrt[' + CARET + ']{}'], ['\\frac{a}{b}', '\\frac{' + CARET + '}{}'],
      ['\\int', '\\int ' + CARET + ' \\,dx'], ['\\int_a^b', '\\int_{' + CARET + '}^{} \\,dx'],
      ['\\frac{d}{dx}', '\\frac{d}{dx}'], ['\\lim', '\\lim_{' + CARET + '\\to }'],
      ['\\sum', '\\sum_{' + CARET + '}^{}'], ['\\infty', '\\infty '], ['\\to', '\\to '],
      ['|x|', '\\left|' + CARET + '\\right|'], ['x_n', '_{' + CARET + '}'], ["'", "'"],
    ],
    'sin': [
      ['\\sin', '\\sin '], ['\\cos', '\\cos '], ['\\tan', '\\tan '],
      ['\\cot', '\\cot '], ['\\sec', '\\sec '], ['\\csc', '\\csc '],
      ['\\ln', '\\ln '], ['\\log', '\\log '], ['e^x', 'e^{' + CARET + '}'],
      ['\\sin^{-1}', '\\sin^{-1}'], ['\\cos^{-1}', '\\cos^{-1}'], ['\\tan^{-1}', '\\tan^{-1}'],
    ],
    '\\alpha\\beta': [
      ['\\pi', '\\pi '], ['\\theta', '\\theta '], ['\\alpha', '\\alpha '], ['\\beta', '\\beta '],
      ['\\lambda', '\\lambda '], ['\\mu', '\\mu '], ['\\varepsilon', '\\varepsilon '], ['\\Delta', '\\Delta '],
      ['\\pm', '\\pm '], ['\\le', '\\le '], ['\\ge', '\\ge '], ['\\ne', '\\ne '],
      ['\\cdot', '\\cdot '], ['\\approx', '\\approx '], ['\\,', '\\,'], [',', ','],
    ],
  };

  function katexLabel(latex) {
    try { return window.katex.renderToString(latex, { throwOnError: false }); }
    catch (e) { return latex; }
  }

  function create(opts) {
    opts = opts || {};
    let value = opts.initial || '';
    let caret = value.length;

    const wrap = document.createElement('div');
    wrap.className = 'mk-wrap';

    const preview = document.createElement('div');
    preview.className = 'mk-preview';

    const strip = document.createElement('div');
    strip.className = 'mk-caret-strip';

    const tabsEl = document.createElement('div');
    tabsEl.className = 'mk-tabs';

    const keysEl = document.createElement('div');
    keysEl.className = 'mk-keys';

    const ctrlEl = document.createElement('div');
    ctrlEl.className = 'mk-ctrl';

    wrap.appendChild(preview);
    wrap.appendChild(strip);
    wrap.appendChild(tabsEl);
    wrap.appendChild(keysEl);
    wrap.appendChild(ctrlEl);

    function renderPreview() {
      const shown = value.replace(/\{\}/g, '{\\square}').replace(/\[\]/g, '[\\square]');
      try {
        preview.innerHTML = value.trim()
          ? window.katex.renderToString(shown, { throwOnError: false, displayMode: true })
          : '<span class="mk-placeholder">Tap keys to build an expression…</span>';
      } catch (e) {
        preview.innerHTML = '<span class="mk-placeholder">…</span>';
      }
      strip.textContent = value.slice(0, caret) + '▏' + value.slice(caret);
      if (opts.onChange) opts.onChange(value);
    }

    function insert(snippet) {
      let snip = snippet;
      let caretInSnippet = snip.length;
      const ci = snip.indexOf(CARET);
      if (ci !== -1) { caretInSnippet = ci; snip = snip.replace(CARET, ''); }
      value = value.slice(0, caret) + snip + value.slice(caret);
      caret = caret + caretInSnippet;
      renderPreview();
    }

    function backspace() {
      if (caret === 0) return;
      // delete an empty {} or [] pair as a unit
      if ((value[caret - 1] === '}' && value[caret - 2] === '{') ||
          (value[caret - 1] === ']' && value[caret - 2] === '[')) {
        value = value.slice(0, caret - 2) + value.slice(caret);
        caret -= 2;
        renderPreview();
        return;
      }
      // delete a whole \command
      const before = value.slice(0, caret);
      const cmd = before.match(/\\[a-zA-Z]+ ?$/);
      if (cmd) {
        value = value.slice(0, caret - cmd[0].length) + value.slice(caret);
        caret -= cmd[0].length;
        renderPreview();
        return;
      }
      value = value.slice(0, caret - 1) + value.slice(caret);
      caret -= 1;
      renderPreview();
    }

    function move(dir) {
      caret = Math.max(0, Math.min(value.length, caret + dir));
      renderPreview();
    }

    // build tabs + keys
    let activeTab = '123';
    function renderKeys() {
      keysEl.innerHTML = '';
      TABS[activeTab].forEach(([label, snippet]) => {
        const b = document.createElement('button');
        b.className = 'mk-key';
        b.innerHTML = label.indexOf('\\') !== -1 || /[\^_{]/.test(label) ? katexLabel(label) : escapeHtml(label);
        b.addEventListener('click', () => insert(snippet));
        keysEl.appendChild(b);
      });
    }
    Object.keys(TABS).forEach((name) => {
      const t = document.createElement('button');
      t.className = 'mk-tab';
      t.innerHTML = name.indexOf('\\') !== -1 ? katexLabel(name) : escapeHtml(name);
      t.addEventListener('click', () => {
        activeTab = name;
        [...tabsEl.children].forEach((c) => c.classList.remove('active'));
        t.classList.add('active');
        renderKeys();
      });
      if (name === activeTab) t.classList.add('active');
      tabsEl.appendChild(t);
    });

    // control row
    const controls = [
      ['←', () => move(-1)],
      ['→', () => move(1)],
      ['⌫', backspace],
      ['clear', () => { value = ''; caret = 0; renderPreview(); }],
    ];
    controls.forEach(([label, fn]) => {
      const b = document.createElement('button');
      b.className = 'mk-ctrl-btn' + (label === 'clear' ? ' wide' : '');
      b.textContent = label;
      b.addEventListener('click', fn);
      ctrlEl.appendChild(b);
    });

    renderKeys();
    renderPreview();

    return {
      el: wrap,
      getValue: () => value,
      setValue: (v) => { value = v || ''; caret = value.length; renderPreview(); },
      clear: () => { value = ''; caret = 0; renderPreview(); },
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.MathKeyboard = { create };
})();
