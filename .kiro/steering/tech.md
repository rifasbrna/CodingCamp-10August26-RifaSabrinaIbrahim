---
inclusion: always
---

# Tech Stack

## Languages & Standards
- **HTML5** — semantic elements (`<header>`, `<main>`, `<section>`, `<form>`, `<dialog>`-pattern modal)
- **CSS3** — custom properties (design tokens), CSS Grid, Flexbox, `clamp()`, `@keyframes`
- **JavaScript (ES2020+)** — vanilla only, `'use strict'`, no transpiler

## Constraints (hard rules)
- **No frameworks** — React, Vue, Svelte, Angular, and similar are forbidden
- **No build tools** — no Webpack, Vite, Rollup, Babel, or npm scripts
- **No external libraries** — no jQuery, Lodash, Tailwind, Bootstrap, etc.
- **No backend** — pure static files, works from the filesystem (`file://`) or any static host
- **One CSS file** — `css/style.css` only
- **One JavaScript file** — `js/script.js` only

## Browser Support
Must work in the latest stable release of:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

## Persistence
`localStorage` only. Key schema:

| Key | Type | Description |
|---|---|---|
| `theme` | `"light" \| "dark"` | Active colour theme |
| `userName` | `string` | User's display name for greeting |
| `todos` | `Array<{id, text, completed}>` | All to-do items |
| `quickLinks` | `Array<{id, label, url}>` | Saved quick-link entries |

## Accessibility
- All interactive elements have `aria-label` attributes
- `role="alert"` + `aria-live="polite"` on inline error messages
- `role="dialog"` + `aria-modal="true"` on the name modal
- Custom checkboxes use `appearance: none` and a CSS `::after` tick
- Keyboard navigation: Enter/Escape in inputs and modals

## Notification API
The Focus Timer uses the browser's `Notification` API when permission is granted; falls back to `alert()`.
