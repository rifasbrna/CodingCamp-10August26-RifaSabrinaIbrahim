# Requirements — Life Dashboard

## Overview
A single-page, client-only Life Dashboard built with vanilla HTML, CSS, and JavaScript for a CodingCamp assignment. All data persists through the Browser `localStorage` API. No backend, no frameworks, no build tools.

---

## 1. Greeting Widget

### 1.1 Live Clock
WHEN the page loads
THE SYSTEM SHALL display the current local time in HH:MM:SS format, updating every second.

### 1.2 Date Display
WHEN the page loads
THE SYSTEM SHALL display the current local date in a human-readable format (weekday, month, day, year).

### 1.3 Time-of-Day Greeting
WHEN the current hour is between 05:00 and 11:59
THE SYSTEM SHALL display "Good Morning".

WHEN the current hour is between 12:00 and 16:59
THE SYSTEM SHALL display "Good Afternoon".

WHEN the current hour is between 17:00 and 20:59
THE SYSTEM SHALL display "Good Evening".

WHEN the current hour is between 21:00 and 04:59
THE SYSTEM SHALL display "Good Night".

### 1.4 Personalised Greeting (Challenge)
WHEN a user name has been saved
THE SYSTEM SHALL append the name to the greeting (e.g. "Good Morning, Rifa! 👋").

WHEN no user name has been saved
THE SYSTEM SHALL display the greeting without a name (e.g. "Good Morning! 👋").

---

## 2. Custom Name (Challenge)

### 2.1 Set Name
WHEN the user clicks the "Set Name" button
THE SYSTEM SHALL open a modal dialog with a pre-filled text input showing the current saved name (or empty if none).

### 2.2 Save Name
WHEN the user submits the modal (Save button or Enter key)
THE SYSTEM SHALL save the entered name to `localStorage` under the key `userName` and immediately update the greeting.

### 2.3 Cancel
WHEN the user clicks Cancel, presses Escape, or clicks outside the modal
THE SYSTEM SHALL close the modal without saving any changes.

---

## 3. Light / Dark Mode (Challenge)

### 3.1 Toggle
WHEN the user clicks the theme toggle button
THE SYSTEM SHALL switch the active theme between light and dark by toggling the `data-theme` attribute on `<html>`.

### 3.2 Persistence
WHEN a theme is applied
THE SYSTEM SHALL save the chosen theme to `localStorage` under the key `theme`.

### 3.3 Restore on Load
WHEN the page loads
THE SYSTEM SHALL read `localStorage` and apply the previously saved theme before rendering.

### 3.4 Button Label
WHEN the active theme is dark
THE SYSTEM SHALL label the toggle button "☀️ Light Mode".

WHEN the active theme is light
THE SYSTEM SHALL label the toggle button "🌙 Dark Mode".

---

## 4. Focus Timer

### 4.1 Default Mode
WHEN the page loads
THE SYSTEM SHALL initialise the timer to 25 minutes (Pomodoro mode) and display "25:00".

### 4.2 Mode Switching
WHEN the user clicks a mode button (Pomodoro / Short Break / Long Break)
THE SYSTEM SHALL stop any running timer, reset the display to the selected duration, and mark that button as active.

| Mode | Duration |
|---|---|
| Pomodoro | 25 minutes |
| Short Break | 5 minutes |
| Long Break | 15 minutes |

### 4.3 Start
WHEN the user clicks Start and the timer is not already running
THE SYSTEM SHALL begin counting down one second at a time.

### 4.4 Stop (Pause)
WHEN the user clicks Stop and the timer is running
THE SYSTEM SHALL pause the countdown without resetting the remaining time.

### 4.5 Reset
WHEN the user clicks Reset
THE SYSTEM SHALL stop the timer and restore the display to the current mode's full duration.

### 4.6 Completion
WHEN the countdown reaches 00:00
THE SYSTEM SHALL stop the timer and notify the user.
If Notification permission is granted, a browser notification SHALL be shown.
Otherwise, a browser `alert()` SHALL be shown.

---

## 5. To-Do List

### 5.1 Add Task
WHEN the user submits a non-empty task text
THE SYSTEM SHALL prepend a new task to the list and persist all tasks to `localStorage`.

WHEN the user submits an empty or whitespace-only string
THE SYSTEM SHALL display an inline error "Task cannot be empty." and not add a task.

### 5.2 Prevent Duplicate Tasks (Challenge)
WHEN the user submits a task whose text matches an existing task (case-insensitive, trimmed)
THE SYSTEM SHALL display an inline error identifying the duplicate and not add the task.

WHEN the user saves an inline edit whose new text matches another existing task (case-insensitive, trimmed, excluding itself)
THE SYSTEM SHALL display an inline error identifying the duplicate and not save the edit.

### 5.3 Complete / Uncomplete
WHEN the user toggles the checkbox on a task
THE SYSTEM SHALL toggle its `completed` state, apply a strikethrough style, and persist the change.

### 5.4 Inline Edit
WHEN the user clicks the edit (✏️) button on a task
THE SYSTEM SHALL replace the task text with an editable input pre-filled with the current text.

WHEN the user confirms the edit (✅ button, Enter key, or focus loss)
THE SYSTEM SHALL save the new text (if non-empty and non-duplicate) and return to display mode.

WHEN the user cancels the edit (Escape key)
THE SYSTEM SHALL discard changes and return to display mode.

### 5.5 Delete Task
WHEN the user clicks the delete (🗑️) button on a task
THE SYSTEM SHALL remove that task from the list and persist the change.

### 5.6 Filter
WHEN the user clicks the "All" filter
THE SYSTEM SHALL display all tasks.

WHEN the user clicks the "Active" filter
THE SYSTEM SHALL display only incomplete tasks.

WHEN the user clicks the "Done" filter
THE SYSTEM SHALL display only completed tasks.

### 5.7 Clear Done
WHEN the user clicks "Clear Done"
THE SYSTEM SHALL remove all completed tasks and persist the change.

### 5.8 Task Count
AT ALL TIMES
THE SYSTEM SHALL display the number of incomplete tasks remaining (e.g. "3 tasks remaining").

### 5.9 Persistence
WHEN any task is added, edited, completed, or deleted
THE SYSTEM SHALL immediately save the full task array to `localStorage` under the key `todos`.

WHEN the page loads
THE SYSTEM SHALL restore all tasks from `localStorage`.

---

## 6. Quick Links

### 6.1 Add Link
WHEN the user submits a label and a valid URL
THE SYSTEM SHALL add a new link chip to the grid and persist to `localStorage`.

WHEN the user submits without a label
THE SYSTEM SHALL display "Please enter a label." and not add the link.

WHEN the user submits without a URL or with an invalid URL
THE SYSTEM SHALL display an appropriate error message and not add the link.

WHEN the user enters a URL without a protocol (e.g. "google.com")
THE SYSTEM SHALL prepend "https://" automatically before saving.

### 6.2 Open Link
WHEN the user clicks a link chip
THE SYSTEM SHALL open the saved URL in a new browser tab.

### 6.3 Delete Link
WHEN the user hovers a chip and clicks the delete (×) button
THE SYSTEM SHALL remove that link and persist the change.

### 6.4 Emoji Icon
WHEN a link is rendered
THE SYSTEM SHALL display a contextual emoji based on the URL's hostname (e.g. 🐙 for github.com, ▶️ for youtube.com) or 🌐 as a fallback.

### 6.5 Persistence
WHEN any link is added or deleted
THE SYSTEM SHALL immediately save the full links array to `localStorage` under the key `quickLinks`.

WHEN the page loads
THE SYSTEM SHALL restore all links from `localStorage`.

---

## 7. General / Cross-Cutting

### 7.1 Responsive Layout
WHEN the viewport is 768 px or narrower
THE SYSTEM SHALL stack the dashboard cards into a single column.

### 7.2 No External Dependencies
AT ALL TIMES
THE SYSTEM SHALL function using only the browser's built-in APIs — no CDN scripts, no npm packages, no frameworks.

### 7.3 Browser Compatibility
THE SYSTEM SHALL function correctly in the latest stable versions of Chrome, Firefox, Edge, and Safari.
