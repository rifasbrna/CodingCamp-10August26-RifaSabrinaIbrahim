---
inclusion: always
---

# Project Structure

## Directory Layout
```
CodingCamp-10August26-RifaSabrinaIbrahim/
├── index.html          # Single-page entry point
├── css/
│   └── style.css       # All styles — one file only
├── js/
│   └── script.js       # All logic — one file only
└── .kiro/
    ├── steering/
    │   ├── product.md  # Product purpose and feature scope
    │   ├── tech.md     # Tech stack, constraints, and key decisions
    │   └── structure.md # This file — project layout and conventions
    └── specs/
        └── life-dashboard/
            ├── requirements.md
            ├── design.md
            └── tasks.md
```

## File Conventions

### index.html
- `lang="en"` and `data-theme="light"` on `<html>` (JS switches the attribute)
- CSS `<link>` in `<head>`, JS `<script>` at end of `<body>` (no `defer` needed)
- BEM-style class names: `block`, `block__element`, `block--modifier`
- All interactive elements carry `id` attributes that `script.js` selects with `getElementById`

### css/style.css
Organised into 14 numbered sections separated by `/* ── N. Section Name ── */` comments:
1. CSS Custom Properties (design tokens)
2. Reset & Base
3. Typography
4. Header layout
5. Dashboard grid
6. Card component
7. Button variants
8. Input styles
9. Focus Timer
10. To-Do List
11. Quick Links
12. Modal
13. Utilities
14. Responsive (media queries)

Design tokens live in `:root` (light theme) and are overridden in `[data-theme="dark"]`. Never hard-code colour or spacing values outside of these token blocks.

### js/script.js
Organised into 8 numbered sections separated by `/* ── N. Section Name ── */` comments:
1. Storage helpers (`storage.get` / `storage.set` wrappers around `localStorage`)
2. Greeting & Clock
3. Theme toggle
4. Custom Name modal
5. Focus Timer
6. To-Do List
7. Quick Links
8. `init()` — called once on load

## Naming Conventions
- **HTML ids**: `kebab-case` (e.g. `todo-input`, `btn-start`)
- **CSS classes**: BEM `kebab-case` (e.g. `todo-item__checkbox`, `btn--primary`)
- **JS variables/functions**: `camelCase`
- **JS constants**: `camelCase` (no SCREAMING_SNAKE_CASE except for clarity in module-level consts)

## Do Not
- Add a second CSS or JS file
- Install npm packages or add a `package.json`
- Introduce a build step
- Modify `localStorage` keys defined in `tech.md` without updating the schema there too
