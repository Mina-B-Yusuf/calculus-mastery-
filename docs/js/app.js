const appRoot = document.getElementById('app');
const tabbarLinks = document.querySelectorAll('nav.tabbar a');

const routes = {
  home: () => window.HomeMode.render(appRoot),
  journey: (sub) => window.JourneyMode.render(appRoot, sub),
  scroll: (sub) => window.ScrollMode.render(appRoot, sub),
  drill: (sub) => {
    let opts = {};
    if (sub[0] === 's' && sub[1] != null && sub[2] != null) opts.filter = { chapter: sub[1], section: sub[2] };
    else if (sub[0] === 'ch' && sub[1] != null) opts.filter = { chapter: sub[1] };
    return window.RecognitionMode.render(appRoot, opts);
  },
  hall: () => window.HallMode.render(appRoot),
  speed: () => window.SpeedMode.render(appRoot),
  flashcards: (sub) => window.FlashcardsMode.render(appRoot, sub),
  memorize: (sub) => window.MemorizeMode.render(appRoot, sub),
  formula: () => window.FormulaMode.render(appRoot),
  concepts: (sub) => window.ConceptsMode.render(appRoot, sub),
  scratchpad: () => window.ScratchpadMode.render(appRoot),
  notes: () => window.NotesMode.render(appRoot),
  exam: (sub) => window.ExamMode.render(appRoot, sub),
  radar: () => window.RadarMode.render(appRoot),
  errors: () => window.ErrorNotebookMode.render(appRoot),
  settings: () => window.SettingsMode.render(appRoot),
  more: () => window.MoreMode.render(appRoot),
};

// which routes light up which tab
const HOME_ROUTES = ['home', 'speed', 'flashcards', 'memorize'];
const MORE_ROUTES = ['formula', 'scratchpad', 'notes', 'radar', 'errors', 'settings', 'more'];
// The Journey is where understanding is born; Concepts is now its reference,
// so both live under the Journey tab.
const JOURNEY_ROUTES = ['journey', 'concepts', 'scroll'];

function setActiveTab(name) {
  let tab = name;
  if (MORE_ROUTES.includes(name)) tab = 'more';
  else if (JOURNEY_ROUTES.includes(name)) tab = 'journey';
  else if (HOME_ROUTES.includes(name)) tab = 'home';
  else if (name === 'hall') tab = 'drill';
  tabbarLinks.forEach((a) => {
    a.classList.toggle('active', a.dataset.route === tab);
  });
}

async function router() {
  const hash = location.hash.replace(/^#\//, '') || 'home';
  const parts = hash.split('/');
  const name = parts[0];
  const sub = parts.slice(1).map(decodeURIComponent);
  const handler = routes[name] || routes.home;
  setActiveTab(name);
  if (window.__mathHero) { window.__mathHero.destroy(); window.__mathHero = null; }
  if (window.__sculpture) { window.__sculpture.destroy(); window.__sculpture = null; }
  if (window.__ferret) { window.__ferret.destroy(); window.__ferret = null; }
  if (window.__journeyFigs) { window.__journeyFigs.forEach((f) => { try { f && f.destroy(); } catch (e) {} }); window.__journeyFigs = null; }
  if (window.__world && name !== 'home' && name !== 'hall') { window.__world.destroy(); window.__world = null; }
  appRoot.innerHTML = '';   // handlers paint immediately; no spinner
  try {
    await handler(sub);
    // remember where the learner was, so Home can offer to resume it honestly.
    // A drill session can't be re-entered by URL (it would rebuild), so a
    // section drill records its section unit as the resume point (F2).
    if (name === 'drill') {
      if (sub[0] === 's' && sub[1] && sub[2]) localStorage.setItem('lastPlace', `#/journey/${sub[1]}/s/${sub[2]}`);
    } else if (!['home', 'journey'].includes(name) || parts.length > 1) {
      localStorage.setItem('lastPlace', location.hash);
    }
    // retrigger route entrance animation
    appRoot.classList.remove('route-anim');
    void appRoot.offsetWidth;
    appRoot.classList.add('route-anim');
    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  } catch (err) {
    console.error(err);
    appRoot.innerHTML = `<div class="card"><h2>Something went wrong</h2><p class="small">${String(err.message || err)}</p></div>`;
  }
}

window.addEventListener('hashchange', router);

// --- static icons (nav, brand, theme) ---
document.querySelectorAll('[data-ico]').forEach((el) => { el.innerHTML = Icon(el.dataset.ico); });
document.getElementById('brand-mark').innerHTML = Icon('integral');

// --- theme toggle ---
function themeIcon() {
  const dark = (document.documentElement.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  document.getElementById('theme-toggle').innerHTML = Icon(dark ? 'sun' : 'moon');
}
function applyStoredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  themeIcon();
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon();
});
applyStoredTheme();

// --- offline indicator ---
function updateOfflineBanner() {
  document.getElementById('offline-banner').classList.toggle('show', !navigator.onLine);
}
window.addEventListener('online', updateOfflineBanner);
window.addEventListener('offline', updateOfflineBanner);
updateOfflineBanner();

// --- service worker registration + update flow ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then((reg) => {
    reg.addEventListener('updatefound', () => {
      const installing = reg.installing;
      if (!installing) return;
      installing.addEventListener('statechange', () => {
        if (installing.state === 'installed' && navigator.serviceWorker.controller) {
          document.getElementById('update-banner').classList.add('show');
        }
      });
    });
  }).catch((err) => console.warn('SW registration failed', err));

  document.getElementById('update-btn').addEventListener('click', async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg && reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
    navigator.serviceWorker.addEventListener('controllerchange', () => location.reload());
  });
}

// The loading screen belongs to the world — not a spinner.
function bootSplash(quick) {
  const el = document.createElement('div');
  el.id = 'boot-splash';
  const lines = ['Preparing observatory', 'Reconstructing the halls', 'Reviewing yesterday’s discoveries'];
  el.innerHTML = `<div class="boot-title">The Observatory</div>`
    + lines.map((l) => `<div class="boot-line">${l}</div>`).join('')
    + `<div class="boot-line boot-ready">Observatory stable.</div>`;
  document.body.appendChild(el);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = (quick || reduced) ? 140 : 460, start = (quick || reduced) ? 100 : 340;
  const items = [...el.querySelectorAll('.boot-line:not(.boot-ready)')];
  items.forEach((it, i) => setTimeout(() => it.classList.add('show'), start + i * step));
  const minMs = start + items.length * step;
  return {
    minMs,
    fail(msg) { el.innerHTML = `<div class="boot-title">Observatory offline</div><div class="boot-line show">${msg}</div>`; el.querySelector('.boot-title').classList.add('show'); },
    finish() {
      el.querySelector('.boot-ready').classList.add('show');
      setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 650); }, 640);
    },
  };
}

// --- initial data seed, then boot the router ---
async function boot() {
  const quick = sessionStorage.getItem('entered') === '1';
  const splash = bootSplash(quick);
  const t0 = performance.now();
  await DB.openDB();
  const seeded = await DB.isSeeded();
  if (!seeded) {
    try {
      await DataLoader.loadTaxonomy();
    } catch (err) {
      splash.fail('Connect to the internet once to prepare the observatory for offline use.');
      return;
    }
  } else {
    // Refresh in background if a newer data version is published; ignore failures offline.
    DataLoader.loadTaxonomy().catch(() => {});
  }
  Companion.mount();
  router();
  sessionStorage.setItem('entered', '1');
  const wait = Math.max(0, splash.minMs - (performance.now() - t0));
  setTimeout(() => splash.finish(), wait);
}

boot();
