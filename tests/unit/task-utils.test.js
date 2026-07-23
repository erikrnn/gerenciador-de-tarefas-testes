const {
  normalizeTitle,
  validateTaskTitle,
  createTask,
  toggleTask,
  removeTask,
  filterTasks
} = require('../../public/js/task-utils');

describe('Funções das tarefas', () => {
  it('remove espaços extras do título', () => {
    expect(normalizeTitle('  Estudar   JavaScript  ')).toBe('Estudar JavaScript');
  });

  it('rejeita título vazio', () => {
    expect(validateTaskTitle('   ')).toEqual({
      valid: false,
      message: 'Informe o título da tarefa.'
    });
  });

  it('cria uma tarefa pendente com os dados informados', () => {
    expect(createTask('Fazer trabalho', 'alta', 1)).toEqual({
      id: 1,
      title: 'Fazer trabalho',
      priority: 'alta',
      completed: false
    });
  });

  it('alterna o estado de conclusão de uma tarefa', () => {
    const tasks = [{ id: 1, title: 'Teste', priority: 'media', completed: false }];
    expect(toggleTask(tasks, 1)[0].completed).toBe(true);
  });

  it('remove uma tarefa pelo identificador', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false },
      { id: 2, title: 'B', completed: false }
    ];
    expect(removeTask(tasks, 1)).toHaveLength(1);
    expect(removeTask(tasks, 1)[0].id).toBe(2);
  });

  it('filtra apenas tarefas concluídas', () => {
    const tasks = [
      { id: 1, completed: false },
      { id: 2, completed: true }
    ];
    expect(filterTasks(tasks, 'concluidas')).toEqual([{ id: 2, completed: true }]);
  });
});
