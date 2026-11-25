# Документация Yasme Travel

Единая точка входа в проектную документацию. Контур устроен так, чтобы код и документация не расходились:

- **спеки** фиксируют требования к каждой задаче;
- **generated-страницы** строятся из кода автоматически;
- **ручные документы** объясняют решения и правила, которые нельзя вывести из кода;
- **проверка** (`yarn docs:check`) не даёт закоммитить устаревшую или битую документацию.

## С чего начать

| Роль | Порядок чтения |
|---|---|
| Новый разработчик | [Архитектура](architecture.md) → [Состояние](state-management.md) → [UI-гайдлайны](ui-guidelines.md) → [API](api.md) |
| Агент перед задачей | [AGENTS.md](../AGENTS.md) → [Workflow агента](agent/workflow.md) → [Карта контекста](agent/context-map.md) → [Спеки](specs/README.md) |
| Автор спеки | [Правила спек](specs/README.md) → [Шаблон](specs/_template.md) → [Definition of Done](agent/definition-of-done.md) |
| Ревьюер | [Definition of Done](agent/definition-of-done.md) → [Проверка архитектуры](generated/architecture-check.md) → [Трассировка](generated/traceability.md) |

## Карта документов

| Документ | Что внутри | Как обновляется |
|---|---|---|
| [architecture.md](architecture.md) | Слои FSD, зависимости, runtime, поток данных | вручную |
| [state-management.md](state-management.md) | Store, слайсы, RTK Query, модалки, авторизация | вручную |
| [api.md](api.md) | Клиенты, контракты, моки, env-переменные | вручную |
| [testing.md](testing.md) | Текущее состояние тестов и правила их добавления | вручную |
| [glossary.md](glossary.md) | Доменные и архитектурные термины | вручную |
| [fsd.md](fsd.md) | Нормативные правила Feature-Sliced Design | вручную |
| [ui-guidelines.md](ui-guidelines.md) | Тема, цвета, отступы, доступность | вручную |
| [component-guidelines.md](component-guidelines.md) | Структура компонентов по слоям | вручную |
| [decisions/](decisions/README.md) | Architecture Decision Records | вручную |
| [specs/](specs/README.md) | Спеки задач | вручную, по шаблону |
| [agent/](agent/README.md) | Workflow, роли, DoD, карта контекста | вручную |
| [generated/](generated/README.md) | Маршруты, store, API, UI-кит, сущности, проверки | `yarn docs` |

## Правила

1. **Каждая задача начинается со спеки.** Нет спеки — нет реализации. Исключение: правка документации и опечатки.
2. **`docs/generated/` не редактируется руками.** Любая правка будет перезаписана.
3. **Спека — источник истины по требованиям.** Если реализация отклонилась от спеки, сначала обновляется спека.
4. **Архитектурное решение фиксируется в ADR** (`docs/decisions/`), а не только в переписке.
5. **Первичный файл реализации помечается комментарием** `// @spec <id>` — так работает трассировка.
6. **`yarn docs:check` — обязательный гейт** перед коммитом и в CI.

## Команды

| Команда | Назначение |
|---|---|
| `yarn docs` | Перегенерировать `docs/generated/` |
| `yarn docs:check` | Проверить актуальность generated, валидность спек, ссылки, слои |
| `yarn docs:check --strict` | То же, но падать и на предупреждениях архитектуры |
| `yarn spec:new <area> "Название"` | Создать новую спеку из шаблона |
| `yarn lint` | ESLint |
| `npx tsc --noEmit` | Проверка типов |

## Термины

Если встречается незнакомое слово — загляните в [глоссарий](glossary.md).
