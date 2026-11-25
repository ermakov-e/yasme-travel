<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Маршруты

> Сгенерировано из `src/app/router.tsx`.

## Маршруты

| Path | Тип | Компонент | Гварды | Обёртки | Redirect |
| --- | --- | --- | --- | --- | --- |
| `/` | redirect | `Navigate` | — | — | `/auth` |
| `/auth` | page | `AuthPage` | GuestGuard | — | — |
| `/groups` | page | `GroupsPage` | AuthGuard | Layout | — |
| `/groups/:id` | page | `MapPage` | AuthGuard | Layout | — |

## Правила

- Новый маршрут добавляется только в `src/app/router.tsx`.
- Приватные страницы размещаются внутри `AuthGuard`, гостевые — внутри `GuestGuard`.
- После изменения маршрутов выполните `pnpm docs`, чтобы обновить эту страницу.
- Навигационные ссылки без маршрута фиксируются в `architecture-check.md`.

