---
inclusion: always
---

# Product — Life Dashboard

## Purpose
Life Dashboard is a browser-based personal productivity tool built as a CodingCamp assignment. It gives the user a single-page view of the current time and date, a Pomodoro focus timer, a persistent to-do list, and a quick-access link board — all without requiring an account or a backend server.

## Target Users
Students and individuals who want a lightweight, distraction-free dashboard they can open directly in a browser tab.

## Core Value
Everything is local and instant. No sign-up, no server round-trips, no external dependencies. Data lives in the browser's `localStorage` and is available immediately on every visit.

## Feature Scope (MVP)

### Required Features
| Feature | Description |
|---|---|
| Greeting | Live clock (HH:MM:SS), full date, time-of-day greeting |
| Focus Timer | Pomodoro (25 min), Short Break (5 min), Long Break (15 min) with Start / Stop / Reset |
| To-Do List | Add, inline-edit, complete, delete, filter (All / Active / Done), clear completed; persisted to `localStorage` |
| Quick Links | Save labelled URLs as clickable chips with emoji icons; persisted to `localStorage` |

### Chosen Challenges (bonus features)
1. **Light / Dark mode** — toggles via a button in the header; preference saved to `localStorage`
2. **Custom name in greeting** — user sets their name via a modal; name saved to `localStorage`
3. **Prevent duplicate tasks** — case-insensitive check on both add and inline-edit; shows an inline error message

## Out of Scope
- Backend server or database
- User authentication
- External API calls
- Framework libraries (React, Vue, Angular, etc.)
- CSS preprocessors or build tools
