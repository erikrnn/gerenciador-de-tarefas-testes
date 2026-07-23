(function (global) {
  function normalizeTitle(title) {
    return String(title || '').trim().replace(/\s+/g, ' ');
  }

  function validateTaskTitle(title) {
    const normalized = normalizeTitle(title);

    if (!normalized) {
      return { valid: false, message: 'Informe o título da tarefa.' };
    }

    if (normalized.length < 3) {
      return { valid: false, message: 'O título deve ter pelo menos 3 caracteres.' };
    }

    return { valid: true, message: '' };
  }

  function createTask(title, priority = 'media', id = Date.now()) {
    const validation = validateTaskTitle(title);

    if (!validation.valid) {
      throw new Error(validation.message);
    }

    return {
      id,
      title: normalizeTitle(title),
      priority,
      completed: false
    };
  }

  function toggleTask(tasks, taskId) {
    return tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  function removeTask(tasks, taskId) {
    return tasks.filter((task) => task.id !== taskId);
  }

  function filterTasks(tasks, filter) {
    if (filter === 'pendentes') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'concluidas') {
      return tasks.filter((task) => task.completed);
    }

    return [...tasks];
  }

  const api = {
    normalizeTitle,
    validateTaskTitle,
    createTask,
    toggleTask,
    removeTask,
    filterTasks
  };

  global.TaskUtils = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
