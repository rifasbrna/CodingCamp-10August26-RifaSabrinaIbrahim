/* =====================================================
   LIFE DASHBOARD — script.js
   Sections:
   1.  Storage helpers
   2.  Greeting & Clock
   3.  Theme (Light / Dark)
   4.  Custom Name
   5.  Focus Timer
   6.  To-Do List
   7.  Quick Links
   8.  Init
===================================================== */

'use strict';

/* ── 1. Storage Helpers ── */
const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage unavailable:', e);
    }
  },
};

/* ── 2. Greeting & Clock ── */
const clockEl    = document.getElementById('current-time');
const dateEl     = document.getElementById('current-date');
const greetingEl = document.getElementById('greeting-text');

/**
 * Returns a greeting string based on the current hour.
 * @param {number} hour  0–23
 * @returns {string}
 */
function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

/** Format a Date as a human-readable date string. */
function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
}

/** Format a Date as HH:MM:SS (24-h). */
function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** Update clock, date, and greeting every second. */
function updateClock() {
  const now  = new Date();
  const name = storage.get('userName', '');

  clockEl.textContent    = formatTime(now);
  dateEl.textContent     = formatDate(now);
  greetingEl.textContent = name
    ? `${getGreeting(now.getHours())}, ${name}! 👋`
    : `${getGreeting(now.getHours())}! 👋`;
}

/* ── 3. Theme (Light / Dark) ── */
const themeBtn  = document.getElementById('btn-theme');
const htmlEl    = document.documentElement;

/** Apply a theme to <html> and persist it. */
function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  storage.set('theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function initTheme() {
  const saved = storage.get('theme', 'light');
  applyTheme(saved);
}

themeBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── 4. Custom Name ── */
const nameModal      = document.getElementById('name-modal');
const nameInput      = document.getElementById('name-input');
const btnSetName     = document.getElementById('btn-set-name');
const btnSaveName    = document.getElementById('btn-save-name');
const btnCancelName  = document.getElementById('btn-cancel-name');

function openNameModal() {
  nameInput.value = storage.get('userName', '');
  nameModal.hidden = false;
  nameInput.focus();
}

function closeNameModal() {
  nameModal.hidden = true;
}

function saveName() {
  const trimmed = nameInput.value.trim();
  storage.set('userName', trimmed);
  closeNameModal();
  updateClock(); // refresh greeting immediately
}

btnSetName.addEventListener('click', openNameModal);
btnSaveName.addEventListener('click', saveName);
btnCancelName.addEventListener('click', closeNameModal);

// Close modal on backdrop click
nameModal.addEventListener('click', (e) => {
  if (e.target === nameModal) closeNameModal();
});

// Save on Enter key inside the name input
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveName();
  if (e.key === 'Escape') closeNameModal();
});

/* ── 5. Focus Timer ── */
const timerDisplay  = document.getElementById('timer-display');
const btnStart      = document.getElementById('btn-start');
const btnStop       = document.getElementById('btn-stop');
const btnReset      = document.getElementById('btn-reset');
const modeButtons   = document.querySelectorAll('.btn--mode');

let timerInterval   = null;       // holds setInterval id
let totalSeconds    = 25 * 60;    // current total duration
let remainingSeconds = totalSeconds;
let isRunning       = false;

/** Convert seconds → "MM:SS" string. */
function secondsToDisplay(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

/** Render the current remaining seconds on the display. */
function renderTimer() {
  timerDisplay.textContent = secondsToDisplay(remainingSeconds);
}

/** Start the countdown. */
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerDisplay.classList.add('running');

  timerInterval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      timerDisplay.classList.remove('running');
      timerDisplay.textContent = '00:00';
      notifyTimerDone();
      return;
    }
    remainingSeconds--;
    renderTimer();
  }, 1000);
}

/** Pause the countdown. */
function stopTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  timerDisplay.classList.remove('running');
}

/** Reset to the current mode's full duration. */
function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  renderTimer();
}

/** Show a browser notification (if permission granted) or alert. */
function notifyTimerDone() {
  const msg = '⏰ Time is up! Take a break.';
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Life Dashboard', { body: msg, icon: '' });
  } else {
    alert(msg);
  }
}

/** Switch timer mode (Pomodoro / Short Break / Long Break). */
function switchMode(minutes, activeBtn) {
  stopTimer();
  totalSeconds     = minutes * 60;
  remainingSeconds = totalSeconds;
  renderTimer();

  modeButtons.forEach((b) => b.classList.remove('active'));
  activeBtn.classList.add('active');
}

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);

modeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchMode(Number(btn.dataset.minutes), btn);
  });
});

// Request notification permission early
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}

/* ── 6. To-Do List ── */
const todoForm     = document.getElementById('todo-form');
const todoInput    = document.getElementById('todo-input');
const todoListEl   = document.getElementById('todo-list');
const todoError    = document.getElementById('todo-error');
const todoCountEl  = document.getElementById('todo-count');
const btnClearDone = document.getElementById('btn-clear-done');
const filterBtns   = document.querySelectorAll('.btn--filter');

let todos         = storage.get('todos', []);  // array of { id, text, completed }
let currentFilter = 'all';

/** Generate a simple unique ID. */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Persist todos to localStorage. */
function saveTodos() {
  storage.set('todos', todos);
}

/** Show or clear the error message. */
function setTodoError(msg) {
  todoError.textContent = msg;
}

/**
 * Add a new todo.
 * CHALLENGE: Prevent duplicate tasks (case-insensitive trim comparison).
 */
function addTodo(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    setTodoError('Task cannot be empty.');
    return false;
  }

  const duplicate = todos.some(
    (t) => t.text.toLowerCase() === trimmed.toLowerCase()
  );
  if (duplicate) {
    setTodoError(`"${trimmed}" already exists in your list.`);
    return false;
  }

  setTodoError('');
  todos.unshift({ id: uid(), text: trimmed, completed: false });
  saveTodos();
  renderTodos();
  return true;
}

/** Toggle completed state of a todo by id. */
function toggleTodo(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTodos();
  renderTodos();
}

/** Delete a todo by id. */
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

/** Save an edited todo text by id. */
function updateTodoText(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) return; // ignore empty saves

  // Duplicate check (excluding itself)
  const duplicate = todos.some(
    (t) => t.id !== id && t.text.toLowerCase() === trimmed.toLowerCase()
  );
  if (duplicate) {
    setTodoError(`"${trimmed}" already exists in your list.`);
    return;
  }

  setTodoError('');
  todos = todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
  saveTodos();
  renderTodos();
}

/** Remove all completed todos. */
function clearDone() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  renderTodos();
}

/** Build and return a single <li> element for a todo. */
function createTodoItem(todo) {
  const li = document.createElement('li');
  li.className = `todo-item${todo.completed ? ' todo-item--completed' : ''}`;
  li.dataset.id = todo.id;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type      = 'checkbox';
  checkbox.className = 'todo-item__checkbox';
  checkbox.checked   = todo.completed;
  checkbox.setAttribute('aria-label', `Mark "${todo.text}" as complete`);
  checkbox.addEventListener('change', () => toggleTodo(todo.id));

  // Text span
  const textSpan = document.createElement('span');
  textSpan.className   = 'todo-item__text';
  textSpan.textContent = todo.text;

  // Edit input (hidden until edit mode)
  const editInput = document.createElement('input');
  editInput.type      = 'text';
  editInput.className = 'todo-item__edit-input';
  editInput.value     = todo.text;
  editInput.maxLength = 120;
  editInput.hidden    = true;
  editInput.setAttribute('aria-label', 'Edit task');

  // Actions container
  const actions = document.createElement('div');
  actions.className = 'todo-item__actions';

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn--ghost btn--sm';
  editBtn.textContent = '✏️';
  editBtn.setAttribute('aria-label', 'Edit task');

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn--danger btn--sm';
  deleteBtn.textContent = '🗑️';
  deleteBtn.setAttribute('aria-label', 'Delete task');

  // ── Edit logic ──
  let editing = false;

  function enterEditMode() {
    editing = true;
    textSpan.hidden    = true;
    editInput.hidden   = false;
    editBtn.textContent = '✅';
    editBtn.setAttribute('aria-label', 'Save task');
    editInput.focus();
    editInput.select();
  }

  function exitEditMode(save) {
    editing = false;
    if (save) updateTodoText(todo.id, editInput.value);
    textSpan.hidden  = false;
    editInput.hidden = true;
    editBtn.textContent = '✏️';
    editBtn.setAttribute('aria-label', 'Edit task');
  }

  editBtn.addEventListener('click', () => {
    if (editing) exitEditMode(true);
    else enterEditMode();
  });

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')  exitEditMode(true);
    if (e.key === 'Escape') exitEditMode(false);
  });

  editInput.addEventListener('blur', () => {
    // Small delay so click on editBtn saves instead of blurring first
    setTimeout(() => { if (editing) exitEditMode(true); }, 150);
  });

  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  actions.append(editBtn, deleteBtn);
  li.append(checkbox, textSpan, editInput, actions);
  return li;
}

/** Filter todos based on currentFilter. */
function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':    return todos.filter((t) => !t.completed);
    case 'completed': return todos.filter((t) => t.completed);
    default:          return todos;
  }
}

/** Re-render the entire todo list. */
function renderTodos() {
  const filtered = getFilteredTodos();
  todoListEl.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.style.cssText = 'text-align:center;color:var(--color-text-muted);padding:20px;font-size:.875rem;';
    empty.textContent = currentFilter === 'completed'
      ? 'No completed tasks yet.'
      : currentFilter === 'active'
        ? 'Nothing to do — you\'re all caught up! 🎉'
        : 'No tasks yet. Add one above!';
    todoListEl.appendChild(empty);
  } else {
    filtered.forEach((todo) => {
      todoListEl.appendChild(createTodoItem(todo));
    });
  }

  // Update count
  const activeCount = todos.filter((t) => !t.completed).length;
  todoCountEl.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
}

// Form submit
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addTodo(todoInput.value)) {
    todoInput.value = '';
  }
  todoInput.focus();
});

// Clear error on input
todoInput.addEventListener('input', () => setTodoError(''));

// Filter buttons
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderTodos();
  });
});

// Clear done
btnClearDone.addEventListener('click', clearDone);

/* ── 7. Quick Links ── */
const linkForm   = document.getElementById('link-form');
const linkLabel  = document.getElementById('link-label');
const linkUrl    = document.getElementById('link-url');
const linkError  = document.getElementById('link-error');
const linksGrid  = document.getElementById('links-grid');

let links = storage.get('quickLinks', []); // array of { id, label, url }

/** Persist links to localStorage. */
function saveLinks() {
  storage.set('quickLinks', links);
}

/** Show or clear the link error. */
function setLinkError(msg) {
  linkError.textContent = msg;
}

/** Pick a favicon emoji based on the hostname. */
function siteEmoji(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const map = {
      'youtube.com':   '▶️',
      'github.com':    '🐙',
      'google.com':    '🔍',
      'twitter.com':   '🐦',
      'x.com':         '🐦',
      'instagram.com': '📸',
      'facebook.com':  '👤',
      'reddit.com':    '🤖',
      'linkedin.com':  '💼',
      'notion.so':     '📄',
      'figma.com':     '🎨',
      'stackoverflow.com': '📚',
      'wikipedia.org': '📖',
      'netflix.com':   '🎬',
      'spotify.com':   '🎵',
    };
    return map[host] || '🌐';
  } catch {
    return '🌐';
  }
}

/** Normalise URL — prepend https:// if no protocol given. */
function normaliseUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return 'https://' + trimmed;
}

/** Add a new quick link. */
function addLink(label, url) {
  const trimLabel = label.trim();
  const normUrl   = normaliseUrl(url);

  if (!trimLabel) {
    setLinkError('Please enter a label.');
    return false;
  }
  if (!normUrl) {
    setLinkError('Please enter a URL.');
    return false;
  }

  // Basic URL validation
  try {
    new URL(normUrl);
  } catch {
    setLinkError('Please enter a valid URL (e.g. https://example.com).');
    return false;
  }

  setLinkError('');
  links.push({ id: uid(), label: trimLabel, url: normUrl });
  saveLinks();
  renderLinks();
  return true;
}

/** Delete a link by id. */
function deleteLink(id) {
  links = links.filter((l) => l.id !== id);
  saveLinks();
  renderLinks();
}

/** Build and return a single link chip element. */
function createLinkChip(link) {
  const chip = document.createElement('div');
  chip.className = 'link-chip';
  chip.setAttribute('role', 'link');
  chip.setAttribute('tabindex', '0');
  chip.setAttribute('aria-label', `Open ${link.label}`);

  const icon = document.createElement('span');
  icon.className   = 'link-chip__icon';
  icon.textContent = siteEmoji(link.url);
  icon.setAttribute('aria-hidden', 'true');

  const labelEl = document.createElement('span');
  labelEl.className   = 'link-chip__label';
  labelEl.textContent = link.label;

  const delBtn = document.createElement('button');
  delBtn.className   = 'link-chip__delete';
  delBtn.textContent = '×';
  delBtn.setAttribute('aria-label', `Remove ${link.label}`);
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteLink(link.id);
  });

  chip.append(icon, labelEl, delBtn);

  // Navigate on click (but not when clicking delete)
  chip.addEventListener('click', () => window.open(link.url, '_blank', 'noopener'));
  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(link.url, '_blank', 'noopener');
    }
  });

  return chip;
}

/** Re-render the links grid. */
function renderLinks() {
  linksGrid.innerHTML = '';

  if (links.length === 0) {
    const empty = document.createElement('p');
    empty.style.cssText = 'color:var(--color-text-muted);font-size:.875rem;grid-column:1/-1;';
    empty.textContent = 'No links saved yet. Add your favorites above!';
    linksGrid.appendChild(empty);
    return;
  }

  links.forEach((link) => linksGrid.appendChild(createLinkChip(link)));
}

// Link form submit
linkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addLink(linkLabel.value, linkUrl.value)) {
    linkLabel.value = '';
    linkUrl.value   = '';
    linkLabel.focus();
  }
});

// Clear link error on input
linkLabel.addEventListener('input', () => setLinkError(''));
linkUrl.addEventListener('input',   () => setLinkError(''));

/* ── 8. Init ── */
function init() {
  initTheme();
  updateClock();
  setInterval(updateClock, 1000);
  renderTimer();
  renderTodos();
  renderLinks();
}

init();
