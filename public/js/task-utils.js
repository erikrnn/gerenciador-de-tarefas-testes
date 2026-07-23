(function (global) {
  function normalizeTitle(title) {
    return String(title || '')
      .trim()
      .replace(/\s+/g, ' ');
  }


  function validateTitle(title) {
    return normalizeTitle(title).length > 0;
  }

  function validateTaskTitle(title) {
    const normalizedTitle = normalizeTitle(title);

    if (!normalizedTitle) {
      return {
        valid: false,
        message: 'Informe o título da tarefa.',
      };
    }

    if (normalizedTitle.length < 3) {
      return {
        valid: false,
        message: 'O título deve ter pelo menos 3 caracteres.',
      };
    }

    return {
      valid: true,
      message: '',
    };
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
      completed: false,
    };
  }

  function toggleTaskStatus(task) {
    if (!task || typeof task !== 'object') {
      throw new Error('Tarefa inválida.');
    }

    task.completed = !task.completed;

    return task;
  }

  function toggleTask(tasks, taskId) {
    if (!Array.isArray(tasks)) {
      return [];
    }

    return tasks.map((task) => {
      if (String(task.id) === String(taskId)) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });
  }

  function removeTask(tasks, taskId) {
    if (!Array.isArray(tasks)) {
      return [];
    }

    return tasks.filter(
      (task) => String(task.id) !== String(taskId)
    );
  }

 
  function findTaskById(tasks, taskId) {
    if (!Array.isArray(tasks)) {
      return undefined;
    }

    return tasks.find(
      (task) => String(task.id) === String(taskId)
    );
  }

  function filterTasks(tasks, filter = 'all') {
    if (!Array.isArray(tasks)) {
      return [];
    }

    if (filter === 'pending' || filter === 'pendentes') {
      return tasks.filter(
        (task) => task.completed === false
      );
    }

    if (
      filter === 'completed' ||
      filter === 'concluidas'
    ) {
      return tasks.filter(
        (task) => task.completed === true
      );
    }

    return [...tasks];
  }

  const api = {
    normalizeTitle,
    validateTitle,
    validateTaskTitle,
    createTask,
    toggleTaskStatus,
    toggleTask,
    removeTask,
    findTaskById,
    filterTasks,
  };

  
  global.TaskUtils = api;


  if (
    typeof module !== 'undefined' &&
    module.exports
  ) {
    module.exports = api;
  }
})(
  typeof window !== 'undefined'
    ? window
    : globalThis
);