# Tasks — Life Dashboard

All tasks listed below have been completed. The implementation lives in three files:
- `index.html`
- `css/style.css`
- `js/script.js`

---

## Phase 1 — Project Structure

- [x] 1.1 Create project root with `index.html`, `css/`, and `js/` folders
- [x] 1.2 Add HTML boilerplate: `<!DOCTYPE html>`, charset, viewport meta, title
- [x] 1.3 Link `css/style.css` in `<head>` and `js/script.js` before `</body>`

---

## Phase 2 — Styling Foundation

- [x] 2.1 Define CSS custom properties (design tokens) for light theme on `:root`
- [x] 2.2 Define dark theme token overrides on `[data-theme="dark"]`
- [x] 2.3 Add CSS reset and base styles (box-sizing, margin/padding, font)
- [x] 2.4 Build `.header` layout (sticky, flex, space-between)
- [x] 2.5 Build `.dashboard` CSS Grid (auto-fit, minmax 320 px)
- [x] 2.6 Build `.card` component (surface, border, radius, shadow, flex column)
- [x] 2.7 Build button variants: `--primary`, `--secondary`, `--ghost`, `--danger`, `--sm`, `--mode`, `--filter`
- [x] 2.8 Build `.input` styles with focus ring
- [x] 2.9 Add responsive media queries (768 px, 480 px breakpoints)

---

## Phase 3 — Greeting & Clock

- [x] 3.1 Write `updateClock()` using `setInterval` (1 s) to update time, date, and greeting
- [x] 3.2 Implement `getGreeting(hour)` with four time bands
- [x] 3.3 Render name in greeting when `userName` exists in `localStorage`

---

## Phase 4 — Theme Toggle (Challenge)

- [x] 4.1 Write `applyTheme(theme)` to set `data-theme` on `<html>` and persist to `localStorage`
- [x] 4.2 Write `initTheme()` to restore saved theme on load
- [x] 4.3 Wire click handler on `#btn-theme`
- [x] 4.4 Update button label to reflect active theme

---

## Phase 5 — Custom Name (Challenge)

- [x] 5.1 Build name modal HTML: dialog div, input, Save / Cancel buttons
- [x] 5.2 Style modal: backdrop overlay, centred box, slide-up animation
- [x] 5.3 Write `openNameModal()` / `closeNameModal()` / `saveName()`
- [x] 5.4 Wire `#btn-set-name` click, Save click, Cancel click
- [x] 5.5 Handle Enter key (save) and Escape key (cancel) inside the modal input
- [x] 5.6 Close modal on backdrop click

---

## Phase 6 — Focus Timer

- [x] 6.1 Build timer HTML: display div, mode buttons (`data-minutes`), control buttons
- [x] 6.2 Style `.timer__display` with large monospace font and `primary-light` background
- [x] 6.3 Add `.running` CSS class with `pulse` keyframe animation
- [x] 6.4 Write `startTimer()`, `stopTimer()`, `resetTimer()`
- [x] 6.5 Write `switchMode(minutes, btn)` and wire mode button clicks
- [x] 6.6 Implement `notifyTimerDone()` with Notification API fallback to `alert()`
- [x] 6.7 Request notification permission on page load

---

## Phase 7 — To-Do List

- [x] 7.1 Build to-do HTML: form, input, filter buttons, `<ul>`, footer (count + clear done)
- [x] 7.2 Write `storage` helper (`get` / `set`) with try/catch
- [x] 7.3 Write `addTodo(text)` with empty-string validation
- [x] 7.4 Implement duplicate prevention in `addTodo()` (Challenge)
- [x] 7.5 Write `toggleTodo(id)`, `deleteTodo(id)`, `clearDone()`
- [x] 7.6 Write `updateTodoText(id, newText)` with duplicate check
- [x] 7.7 Write `createTodoItem(todo)` — builds `<li>` with checkbox, text, edit input, action buttons
- [x] 7.8 Implement inline edit state machine (enter/exit edit mode, Enter/Escape/blur)
- [x] 7.9 Write `renderTodos()` with empty-state message
- [x] 7.10 Write `getFilteredTodos()` and wire filter buttons
- [x] 7.11 Update task count on every render
- [x] 7.12 Restore todos from `localStorage` on init

---

## Phase 8 — Quick Links

- [x] 8.1 Build quick links HTML: form (label + URL inputs), error paragraph, links grid
- [x] 8.2 Write `addLink(label, url)` with label/URL validation
- [x] 8.3 Implement URL normalisation (prepend `https://` when no protocol)
- [x] 8.4 Write `siteEmoji(url)` hostname-to-emoji mapping
- [x] 8.5 Write `createLinkChip(link)` — icon, label, delete button, keyboard navigation
- [x] 8.6 Write `renderLinks()` with empty-state message
- [x] 8.7 Write `deleteLink(id)` and wire delete button (stop propagation)
- [x] 8.8 Restore links from `localStorage` on init

---

## Phase 9 — Integration & Polish

- [x] 9.1 Write `init()` to call all initialisation functions in order
- [x] 9.2 Verify all `localStorage` keys match the schema in `tech.md`
- [x] 9.3 Confirm keyboard accessibility: Tab order, Enter/Escape in all inputs
- [x] 9.4 Test in Chrome, Firefox, Edge, Safari (latest stable)
- [x] 9.5 Confirm single-file constraint: exactly one CSS file, one JS file
