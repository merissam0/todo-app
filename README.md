# todo-app

A simple todo list in plain HTML, CSS and JavaScript. No libraries or build step.

## Usage

Open `index.html` in a browser.

- Type a task and press **Add** (or Enter)
- Tick the checkbox to mark a task done (shown with a strikethrough)
- Click **Delete** to remove a task
- Click **Dark mode** / **Light mode** to switch themes

## Notes

- Tasks are stored in `localStorage`, so they survive a page refresh.
- The app starts in light mode. Your theme choice is also saved in `localStorage`.

## Files

- `index.html`: page markup
- `style.css`: styles and the light/dark color themes
- `app.js`: task logic, `localStorage` persistence and the theme toggle
