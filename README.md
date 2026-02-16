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

## Структура проекта

```
src/
├── app/           # Конфигурация приложения (store, router, theme)
├── entities/      # Бизнес-сущности (user, group, location, photo)
├── features/      # Фичи (auth, groups, locations, map, photos, ui)
├── pages/         # Страницы (AuthPage, GroupsPage, MapPage)
├── shared/        # Общие утилиты, хуки, UI-компоненты
└── widgets/       # Виджеты (Map, LocationModal)
```
