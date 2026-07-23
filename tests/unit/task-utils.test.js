const {
  normalizeTitle,
  validateTitle,
  createTask,
  toggleTaskStatus,
  filterTasks,
} = require('../../public/js/task-utils');

describe('Funções das tarefas', () => {
  it('remove espaços extras do título', () => {
    expect(normalizeTitle('  Estudar   JavaScript  '))
      .toBe('Estudar JavaScript');
  });

  it('retorna falso para título vazio', () => {
    expect(validateTitle('')).toBe(false);
    expect(validateTitle('     ')).toBe(false);
  });

  it('retorna verdadeiro para título válido', () => {
    expect(validateTitle('Estudar Testes')).toBe(true);
  });

  it('cria uma tarefa corretamente', () => {
    const task = createTask('Estudar', 'Alta');

    expect(task.title).toBe('Estudar');
    expect(task.priority).toBe('Alta');
    expect(task.completed).toBe(false);
  });

  it('altera o status da tarefa', () => {
    const task = createTask('Projeto', 'Média');

    toggleTaskStatus(task);

    expect(task.completed).toBe(true);

    toggleTaskStatus(task);

    expect(task.completed).toBe(false);
  });

  it('filtra tarefas pendentes', () => {
    const tasks = [
      { completed: false },
      { completed: true },
      { completed: false }
    ];

    expect(filterTasks(tasks, 'pending')).toHaveLength(2);
  });

  it('filtra tarefas concluídas', () => {
    const tasks = [
      { completed: false },
      { completed: true },
      { completed: true }
    ];

    expect(filterTasks(tasks, 'completed')).toHaveLength(2);
  });

  it('retorna todas as tarefas', () => {
    const tasks = [
      { completed: false },
      { completed: true }
    ];

    expect(filterTasks(tasks, 'all')).toHaveLength(2);
  });
});