---
id: platform-001
title: Контур документации и спек
status: done
layer: shared
areas: [platform, docs]
files:
  - scripts/docs/
  - docs/agent/
  - docs/specs/
  - docs/generated/
  - docs/decisions/
  - docs/README.md
  - docs/architecture.md
  - docs/state-management.md
  - docs/api.md
  - docs/testing.md
  - docs/glossary.md
  - .env.example
  - AGENTS.md
  - README.md
  - package.json
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# platform-001 — Контур документации и спек

## Контекст

Документация проекта устаревала и расходилась с кодом: `AGENTS.md` ссылался на несуществующие `docs/architecture.md` и `docs/state-management.md`, не было спек, не было проверки актуальности. Задачи реализовывались без фиксированных требований, а архитектурные отклонения обнаруживались только при чтении кода.

## Требования

- Каждая задача описывается спекой в `docs/specs/` с frontmatter и обязательными секциями.
- Документация о фактическом состоянии кода генерируется скриптом из `src`.
- Генератор не требует установленных зависимостей (чистый Node).
- Проверка `docs:check` валидирует:
  - актуальность generated-страниц;
  - обязательные поля и секции спек;
  - уникальность ID;
  - существование путей из `files`;
  - корректность `planned`;
  - маркеры `@spec`;
  - битые относительные ссылки;
  - нарушения слоёв FSD.
- Есть команда создания новой спеки из шаблона.
- Описаны роли агента, workflow, Definition of Done и карта контекста.
- Добавлены недостающие документы: архитектура, состояние, API, тестирование, глоссарий, ADR.
- `AGENTS.md` содержит ссылки на новый контур и команды.

## Сценарии приёмки

1. `node scripts/docs/generate.mjs` создаёт 10 страниц в `docs/generated/`.
2. `node scripts/docs/validate.mjs` на актуальном состоянии завершается с кодом 0.
3. После изменения `src/app/router.tsx` валидатор сообщает об устаревшем `routes.md`; после генерации — проходит.
4. `node scripts/docs/new-spec.mjs groups "Тестовая задача"` создаёт спеку с корректным ID и датой.
5. Битая ссылка в любом `.md` внутри `docs/` обнаруживается валидатором.
6. Маркер `// @spec unknown-id` обнаруживается как ошибка.
7. Нарушение слоя (`shared → features`) попадает в `architecture-check.md`.
8. `docs/generated/README.md` перечисляет все сгенерированные страницы.

## FSD

Контур не относится к слоям приложения: скрипты живут в `scripts/docs`, документация — в `docs`. Код `src` не изменялся, кроме случаев, когда спека документирует существующее поведение.

## Файлы

| Путь | Роль |
|---|---|
| `scripts/docs/` | генерация, валидация, создание спек |
| `docs/agent/` | workflow, роли, DoD, карта контекста |
| `docs/specs/` | правила, шаблон, спеки |
| `docs/generated/` | автогенерируемые страницы |
| `docs/decisions/` | ADR |
| `docs/*.md` | ручные документы |
| `.env.example` | шаблон переменных окружения |
| `AGENTS.md` | точка входа для агента |
| `package.json` | команды `docs`, `docs:check`, `spec:new` |

## Данные и контракты

Frontmatter спеки:

```yaml
id, title, status, layer, areas, files, planned, tests, created, updated
```

Статусы: `draft`, `approved`, `in-progress`, `done`, `deprecated`.

## Проверка

- `node scripts/docs/generate.mjs`
- `node scripts/docs/validate.mjs`
- `node scripts/docs/new-spec.mjs scratch "Проверка"` (с удалением результата)
- `yarn lint`
- `npx tsc --noEmit` (код `src` не менялся)

## Открытые вопросы

- Подключить `docs:check` в CI (workflow пока отсутствует).
- Решить, коммитить ли generated или генерировать в CI.
- Добавить ESLint-правило границ слоёв как дополнение к скрипту.
- Настроить тестовый раннер и заполнить `tests` в спеках.

## Ссылки

- [ADR-0001](../../decisions/0001-docs-as-code.md)
- [Workflow](../../agent/workflow.md)
- [Generated](../../generated/README.md)
