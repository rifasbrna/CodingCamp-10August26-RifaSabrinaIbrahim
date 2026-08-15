# Design — Life Dashboard

## Architecture Overview

The dashboard is a single HTML page with no build step and no module bundler. All logic runs in one script file loaded at the bottom of `<body>`. State lives entirely in memory (JS variables) and is mirrored to `localStorage` on every mutation.

```
index.html
│
├── css/style.css      ← all visual styles (design tokens + components)
└── js/script.js       ← all application logic (8 sections, top-to-bottom)
```

There is no component framework, no virtual DOM, and no reactive data layer. The rendering model is **imperative re-render**: each feature owns a `render*()` function that rebuilds its DOM subtree from the current in-memory state whenever that state changes.

---

## Page Layout

```
┌─────────────────────────────────────────────────────┐
│  HEADER (sticky)                                    │
│  [clock]  [date]  [greeting]    [Set Name] [Theme]  │
└─────────────────────────────────────────────────────┘
┌───────────────┐ ┌───────────────┐ ┌────────────────┐
│  Focus Timer  │ │  To-Do List   │ │  Quick Links   │
│               │ │               │ │                │
└───────────────┘ └───────────────┘ └────────────────┘
```

The `.dashboard` container uses `CSS Grid` with `repeat(auto-fit, minmax(320px, 1fr))` — three columns on wide screens, single column on mobile.

---

## Design Tokens

All colours, spacing, radius, shadow, and transition values are declared as CSS custom properties on `:root`. Dark theme overrides only the values that change — the rest inherit automatically.

```
:root  →  light theme tokens
[data-theme="dark"]  →  dark theme overrides
```

Switching themes: `<html data-theme="dark">` — one attribute, zero class toggling.

---

## Component Design

### Header
- Sticky, `z-index: 100`, white/dark surface with a bottom border.
- Left: clock (`#current-time`), date (`#current-date`), greeting (`#greeting-text`)
- Right: "Set Name" button → opens modal; "Theme" button → toggles theme

### Focus Timer
- Display: large monospace digits in a pill-shaped `primary-light` background.
  - `.running` class adds a CSS `pulse` animation (opacity 1 → 0.75 → 1, 2 s infinite).
- Mode switcher: three pill buttons (`data-minutes` attribute drives the duration).
- Controls: Start / Stop / Reset, horizontally centred.
- State variables: `totalSeconds`, `remainingSeconds`, `isRunning`, `timerInterval`.

### To-Do List

**Data model (in memory + localStorage):**
```js
todos = [
  { id: "abc123", text: "Buy groceries", completed: false },
  ...
]
```

**Rendering flow:**
```
addTodo() / toggleTodo() / deleteTodo() / updateTodoText()
  └→ saveTodos()         (writes to localStorage)
  └→ renderTodos()       (rebuilds <ul> from current state)
       └→ getFilteredTodos()   (applies active filter)
       └→ createTodoItem(todo) (builds one <li>)
```

**Duplicate prevention:** `todos.some(t => t.text.toLowerCase() === trimmed.toLowerCase())` — checked in both `addTodo` and `updateTodoText`.

**Inline edit state machine (per todo item):**
```
display mode  ──editBtn click──►  edit mode
edit mode     ──confirm──────────► display mode (save)
edit mode     ──Escape / cancel──► display mode (discard)
```

The edit input is created in the DOM but `hidden` until edit mode is entered. This avoids re-rendering the whole list during editing.

### Quick Links

**Data model:**
```js
links = [
  { id: "xyz789", label: "YouTube", url: "https://youtube.com" },
  ...
]
```

**Emoji mapping:** A plain object keyed by hostname. Falls back to `🌐`.

**URL normalisation:** URLs without a protocol get `https://` prepended before validation with `new URL()`.

**Chip layout:** CSS Grid `repeat(auto-fill, minmax(120px, 1fr))`. The delete button is `position: absolute` inside the chip and revealed on `:hover` via `opacity` transition.

### Name Modal

A `<div role="dialog" aria-modal="true">` with `hidden` attribute toggled by JS. Backdrop click closes without saving. Enter key saves. Escape key cancels. Focus moves to the input when opened.

---

## Data Flow

```
User action
    │
    ▼
Event listener (in script.js)
    │
    ├─► Validate input
    │       └─► Show inline error if invalid (stop here)
    │
    ├─► Mutate in-memory state array (todos / links)
    │
    ├─► storage.set(key, value)   ← persist to localStorage
    │
    └─► render*()                 ← rebuild DOM from state
```

There is no two-way binding. The DOM is always derived from the in-memory state, never the other way around.

---

## localStorage Schema

| Key | Value type | Written by | Read by |
|---|---|---|---|
| `theme` | `"light"` or `"dark"` | `applyTheme()` | `initTheme()` |
| `userName` | `string` | `saveName()` | `updateClock()` |
| `todos` | `Array<Todo>` | `saveTodos()` | `init()` |
| `quickLinks` | `Array<Link>` | `saveLinks()` | `init()` |

All reads and writes go through the `storage` helper object, which wraps `JSON.parse` / `JSON.stringify` inside try/catch to handle edge cases (private browsing quota errors, corrupted data).

---

## Error Handling

| Scenario | Handling |
|---|---|
| Empty task input | Inline error below form, focus returned to input |
| Duplicate task | Inline error naming the duplicate |
| Empty link label | Inline error |
| Invalid URL | Inline error with example |
| localStorage unavailable | `console.warn`, silent — app still works in memory |
| Notification permission denied | Falls back to `alert()` |

---

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<form>`, `<ul>`
- All buttons and inputs have `aria-label`
- Error paragraphs use `role="alert"` + `aria-live="polite"`
- Name modal uses `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Custom checkbox is keyboard-accessible (native `<input type="checkbox">` under the hood)
- Link chips are focusable (`tabindex="0"`) and respond to Enter / Space

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| > 768 px | 3-column grid, full header padding |
| ≤ 768 px | 1-column grid, reduced padding, timer full-width |
| ≤ 480 px | Smaller clock font, tighter button padding |
