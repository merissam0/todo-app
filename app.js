const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const input = document.getElementById('new-todo');

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

// Theme: light by default, dark only if the user chose it.
function applyTheme(theme) {
  root.dataset.theme = theme;
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  toggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

applyTheme(load('theme', 'light') === 'dark' ? 'dark' : 'light');

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  save('theme', next);
});

// Tasks: [{ id, text, done }] persisted in localStorage.
let todos = load('todos', []);

function render() {
  list.textContent = '';
  for (const todo of todos) {
    const li = document.createElement('li');
    li.classList.toggle('done', todo.done);

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = todo.done;
    check.addEventListener('change', () => {
      todo.done = check.checked;
      save('todos', todos);
      render();
    });

    const text = document.createElement('span');
    text.textContent = todo.text;

    const del = document.createElement('button');
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      todos = todos.filter((t) => t.id !== todo.id);
      save('todos', todos);
      render();
    });

    li.append(check, text, del);
    list.append(li);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now() + Math.random(), text, done: false });
  save('todos', todos);
  input.value = '';
  render();
});

render();
