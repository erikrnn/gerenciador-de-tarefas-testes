const STORAGE_KEY = 'academic_tasks';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#task-title');
const priorityInput = document.querySelector('#task-priority');
const filterInput = document.querySelector('#task-filter');
const list = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const summary = document.querySelector('#task-summary');
const formMessage = document.querySelector('#form-message');

let tasks = loadTasks();
let currentFilter = 'todas';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const visibleTasks = TaskUtils.filterTasks(tasks, currentFilter);
  list.innerHTML = '';

  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;
    item.dataset.taskId = task.id;

    item.innerHTML = `
      <div class="task-content">
        <input type="checkbox" aria-label="Concluir ${task.title}" ${task.completed ? 'checked' : ''}>
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <small>Prioridade ${task.priority}</small>
        </div>
      </div>
      <div class="task-actions">
        <button type="button" class="secondary toggle-button">${task.completed ? 'Reabrir' : 'Concluir'}</button>
        <button type="button" class="danger delete-button">Excluir</button>
      </div>
    `;

    list.appendChild(item);
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  summary.textContent = `${tasks.length} tarefa${tasks.length === 1 ? '' : 's'} cadastrada${tasks.length === 1 ? '' : 's'} · ${completedCount} concluída${completedCount === 1 ? '' : 's'}`;
  emptyState.hidden = visibleTasks.length > 0;
}

function escapeHtml(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';

  const validation = TaskUtils.validateTaskTitle(titleInput.value);
  if (!validation.valid) {
    formMessage.textContent = validation.message;
    return;
  }

  tasks.push(TaskUtils.createTask(titleInput.value, priorityInput.value));
  saveTasks();
  renderTasks();

  form.reset();
  priorityInput.value = 'media';
  titleInput.focus();
});

filterInput.addEventListener('change', () => {
  currentFilter = filterInput.value;
  renderTasks();
});

list.addEventListener('click', (event) => {
  const item = event.target.closest('.task-item');
  if (!item) return;

  const taskId = Number(item.dataset.taskId);

  if (event.target.matches('.toggle-button') || event.target.matches('input[type="checkbox"]')) {
    tasks = TaskUtils.toggleTask(tasks, taskId);
  }

  if (event.target.matches('.delete-button')) {
    tasks = TaskUtils.removeTask(tasks, taskId);
  }

  saveTasks();
  renderTasks();
});

renderTasks();
