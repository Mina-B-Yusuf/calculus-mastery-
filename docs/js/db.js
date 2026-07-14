// IndexedDB wrapper — the single source of truth for question data, mastery, and progress.
// localStorage is used only for tiny UI preferences (theme, last screen), never as primary storage.

const DB_NAME = 'calc-mastery';
const DB_VERSION = 2;

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('microSkills')) {
        db.createObjectStore('microSkills', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('archetypes')) {
        const store = db.createObjectStore('archetypes', { keyPath: 'id' });
        store.createIndex('microSkillId', 'microSkillId', { unique: false });
        store.createIndex('chapter', 'chapter', { unique: false });
      }
      if (!db.objectStoreNames.contains('attempts')) {
        const store = db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
        store.createIndex('archetypeId', 'archetypeId', { unique: false });
        store.createIndex('microSkillId', 'microSkillId', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('correct', 'correct', { unique: false });
      }
      if (!db.objectStoreNames.contains('srs')) {
        // one row per (kind, itemId) — kind is "archetype" or "formula"
        const store = db.createObjectStore('srs', { keyPath: 'key' });
        store.createIndex('due', 'due', { unique: false });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('notes')) {
        const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        store.createIndex('created', 'created', { unique: false });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
  return dbPromise;
}

function tx(storeNames, mode) {
  return openDB().then((db) => db.transaction(storeNames, mode));
}

function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAll(storeName) {
  return tx([storeName], 'readonly').then((t) => reqToPromise(t.objectStore(storeName).getAll()));
}

function put(storeName, value) {
  return tx([storeName], 'readwrite').then((t) => reqToPromise(t.objectStore(storeName).put(value)));
}

function putAll(storeName, values) {
  return tx([storeName], 'readwrite').then((t) => {
    const store = t.objectStore(storeName);
    values.forEach((v) => store.put(v));
    return new Promise((resolve, reject) => {
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  });
}

function get(storeName, key) {
  return tx([storeName], 'readonly').then((t) => reqToPromise(t.objectStore(storeName).get(key)));
}

function clearStore(storeName) {
  return tx([storeName], 'readwrite').then((t) => reqToPromise(t.objectStore(storeName).clear()));
}

const DB = {
  openDB,
  getAll,
  put,
  putAll,
  get,
  clearStore,

  async isSeeded() {
    const m = await get('meta', 'seeded');
    return !!(m && m.value);
  },

  async markSeeded(version) {
    await put('meta', { key: 'seeded', value: true, version, seededAt: Date.now() });
  },

  async recordAttempt(attempt) {
    // attempt: { archetypeId, microSkillId, mode, correct, errorType, msTaken, timestamp }
    attempt.timestamp = attempt.timestamp || Date.now();
    return put('attempts', attempt);
  },

  async getAttemptsForSkill(microSkillId) {
    const db = await openDB();
    const t = db.transaction(['attempts'], 'readonly');
    const idx = t.objectStore('attempts').index('microSkillId');
    return reqToPromise(idx.getAll(microSkillId));
  },

  async getAllAttempts() {
    return getAll('attempts');
  },

  async getSrs(key) {
    return get('srs', key);
  },

  async putSrs(row) {
    return put('srs', row);
  },

  async getAllSrs() {
    return getAll('srs');
  },

  async exportAll() {
    const [microSkills, archetypes, attempts, srs, meta] = await Promise.all([
      getAll('microSkills'), getAll('archetypes'), getAll('attempts'), getAll('srs'), getAll('meta'),
    ]);
    return {
      exportedAt: new Date().toISOString(),
      dbVersion: DB_VERSION,
      microSkills, archetypes, attempts, srs, meta,
    };
  },

  async importAll(data) {
    await Promise.all([
      clearStore('attempts'), clearStore('srs'),
    ]);
    if (data.attempts) await putAll('attempts', data.attempts);
    if (data.srs) await putAll('srs', data.srs);
    if (data.microSkills) await putAll('microSkills', data.microSkills);
    if (data.archetypes) await putAll('archetypes', data.archetypes);
  },

  async resetProgress() {
    await Promise.all([clearStore('attempts'), clearStore('srs')]);
  },

  async resetEverything() {
    await Promise.all([
      clearStore('attempts'), clearStore('srs'), clearStore('microSkills'),
      clearStore('archetypes'), clearStore('meta'), clearStore('notes'),
    ]);
  },

  async addNote(note) {
    note.created = note.created || Date.now();
    return put('notes', note);
  },
  async getNotes() {
    const all = await getAll('notes');
    return all.sort((a, b) => b.created - a.created);
  },
  async deleteNote(id) {
    const db = await openDB();
    const t = db.transaction(['notes'], 'readwrite');
    return reqToPromise(t.objectStore('notes').delete(id));
  },
};

window.DB = DB;
