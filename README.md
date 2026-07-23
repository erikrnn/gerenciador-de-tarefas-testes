# Projeto de Testes de Software

Aplicação simples de gerenciamento de tarefas acadêmicas desenvolvida com HTML, CSS, JavaScript e Express.

## Tecnologias

- HTML, CSS e JavaScript
- Node.js e Express
- Vitest para testes unitários
- Playwright para testes de sistema

## Instalação

```bash
npm install
npx playwright install chromium
```

## Rodar a aplicação

```bash
npm start
```

Abra: http://localhost:3000

## Rodar testes unitários

```bash
npm test
```

## Rodar testes de sistema

```bash
npm run test:system
```

## Rodar todos os testes

```bash
npm run test:all
```

## Funcionalidades testadas

- Validação do título
- Criação de tarefa
- Alteração do estado de conclusão
- Exclusão de tarefa
- Filtros de tarefas pendentes e concluídas
- Fluxo completo pelo navegador
