# Yasme Travel

Проект для управления путешествиями с интерактивной картой.

## Технологии

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Material UI
- Styled Components

## Требования

- Node.js 18+
- pnpm 10+

## Установка

```bash
pnpm install
```

## Команды

| Команда | Описание |
|---------|----------|
| `pnpm dev` | Запуск dev-сервера |
| `pnpm build` | Сборка проекта |
| `pnpm lint` | Проверка линтером |
| `pnpm preview` | Превью сборки |
| `pnpm docs` | Генерация документации |
| `pnpm docs:check` | Проверка документации и архитектуры |
| `pnpm spec:new <area> "Название"` | Создать спеку задачи |

## Документация

Единая точка входа — [docs/README.md](docs/README.md).

- [Архитектура](docs/architecture.md) — слои FSD, зависимости, поток данных
- [Состояние](docs/state-management.md) — store, RTK Query, модалки
- [API](docs/api.md) — контракты, моки, env-переменные
- [Workflow агента](docs/agent/workflow.md) — как ведётся задача
- [Спеки](docs/specs/README.md) — требования к задачам
- [Generated](docs/generated/README.md) — документация из кода

Перед задачей создайте или найдите спеку, после изменений выполните `pnpm docs` и `pnpm docs:check`.

## Структура проекта

```
src/
├── app/           # Конфигурация приложения (store, router, theme)
├── entities/      # Бизнес-сущности (user, group, photo)
├── features/      # Фичи (auth, groups, autocomplete-address, ui)
├── pages/         # Страницы (AuthPage, GroupsPage, MapPage)
├── shared/        # API, хуки, UI-компоненты, моки
└── widgets/       # Виджеты (create-group-modal, groups-list, Map, LocationModal)
```
