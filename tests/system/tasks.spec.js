const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('usuário cadastra uma nova tarefa', async ({ page }) => {
  await page.getByLabel('Título').fill('Estudar testes de software');
  await page.getByLabel('Prioridade').selectOption('alta');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();

  await expect(page.getByText('Estudar testes de software')).toBeVisible();
  await expect(page.getByText('Prioridade alta')).toBeVisible();
});

test('usuário conclui e filtra uma tarefa', async ({ page }) => {
  await page.getByLabel('Título').fill('Preparar apresentação');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  await page.getByRole('button', { name: 'Concluir' }).click();
  await page.getByLabel('Filtrar').selectOption('concluidas');

  await expect(page.getByText('Preparar apresentação')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reabrir' })).toBeVisible();
});

test('usuário exclui uma tarefa', async ({ page }) => {
  await page.getByLabel('Título').fill('Tarefa temporária');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();

  await expect(page.getByText('Tarefa temporária')).not.toBeVisible();
  await expect(page.getByText('Nenhuma tarefa cadastrada.')).toBeVisible();
});

test('sistema exibe erro para título muito curto', async ({ page }) => {
  await page.getByLabel('Título').fill('Oi');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();

  await expect(page.getByRole('alert')).toHaveText('O título deve ter pelo menos 3 caracteres.');
});
