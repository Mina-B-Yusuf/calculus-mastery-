const appRoot = document.getElementById('app');
const tabbarLinks = document.querySelectorAll('nav.tabbar a');

const routes = {
  home: () => window.HomeMode.render(appRoot),
  drill: () => window.RecognitionMode.render(appRoot),
  formula: () => window.FormulaMode.render(appRoot),
  scratchpad: () => window.ScratchpadMode.render(appRoot),
  exam: (sub) => window.ExamMode.render(appRoot, sub),
  radar: () => window.RadarMode.render(appRoot),
  errors: () => window.ErrorNotebookMode.render(appRoot),
  settings: () => window.SettingsMode.render(appRoot),
  more: () => window.MoreMode.render(appRoot),
};

// which secondary routes light up the "More" tab
const MORE_ROUTES = ['scratchpad', 'radar', 'errors', 'settings', 'more'];

function setActiveTab(name) {
  const tab = MORE_ROUTES.includes(name) ? 'more' : name;
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
  appRoot.innerHTML = '<div class="center-msg">Loading…</div>';
  try {
    await handler(sub);
  } catch (err) {
    console.error(err);
    appRoot.innerHTML = `<div class="card"><h2>Something went wrong</h2><p class="small">${String(err.message || err)}</p></div>`;
  }
}

window.addEventListener('hashchange', router);

// --- theme toggle ---
function applyStoredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
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

// --- initial data seed, then boot the router ---
async function boot() {
  await DB.openDB();
  const seeded = await DB.isSeeded();
  if (!seeded) {
    appRoot.innerHTML = '<div class="center-msg">Downloading calculus content for offline use…</div>';
    try {
      await DataLoader.loadTaxonomy();
    } catch (err) {
      appRoot.innerHTML = `<div class="card"><h2>Couldn't load content</h2><p class="small">Connect to the internet once to download the question bank. (${String(err.message || err)})</p></div>`;
      return;
    }
  } else {
    // Refresh in background if a newer data version is published; ignore failures offline.
    DataLoader.loadTaxonomy().catch(() => {});
  }
  router();
}

boot();
