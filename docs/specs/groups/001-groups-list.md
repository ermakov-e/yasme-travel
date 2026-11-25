---
id: groups-001
title: Список групп
status: done
layer: pages
areas: [groups]
files:
  - src/features/groups/
  - src/pages/GroupsPage/
  - src/widgets/groups-list/
  - src/entities/group/
  - src/shared/mocks/handlers/groups.ts
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# groups-001 — Список групп

## Контекст

Основной экран после входа — список групп пользователя. Данные приходят из `GET /groups`; в dev запрос перехватывает MSW. Переход в группу открывает экран карты.

## Требования

- Страница `/groups` доступна только авторизованному пользователю.
- Список загружается через RTK Query (`useGetGroupsQuery`).
- Во время загрузки отображается индикатор (`Loading`).
- При ошибке отображается сообщение и список не рендерится.
- Каждая группа отображается карточкой: обложка, название, аватары участников.
- Клик по карточке открывает `/groups/:id`.
- Карточка доступна с клавиатуры (Enter/Space).
- Кнопка создания группы видна на странице.

## Сценарии приёмки

1. Войти → открыть `/groups` → через ~500 мс появляются 3 группы из мока.
2. Нажать на карточку «Поход в горы» → URL меняется на `/groups/1`.
3. Смоделировать ошибку сети → показано «Не удалось загрузить группы».
4. Сфокусировать карточку Tab и нажать Enter → происходит переход.
5. Открыть `/groups` без авторизации → редирект на `/auth`.

## FSD

- `features/groups` — RTK Query-эндпоинт.
- `widgets/groups-list` — список.
- `entities/group` — тип и карточка `GroupCard`.
- `pages/GroupsPage` — композиция, состояния загрузки и ошибки.
- `shared/mocks` — dev-данные.

## Файлы

| Файл или каталог | Роль |
|---|---|
| `src/features/groups/apiSlice.ts` | `getGroups` |
| `src/pages/GroupsPage/` | страница |
| `src/widgets/groups-list/` | список карточек |
| `src/entities/group/` | `Group`, `GroupCard` |
| `src/shared/mocks/handlers/groups.ts` | мок `GET /groups` |

## Данные и контракты

`GET /groups → Group[]`, задержка мока 500 мс, статус 200. Пустой массив допустим, но отдельного empty-state нет.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- Сценарии 1–5 вручную.
- `pnpm docs:check`.

## Открытые вопросы

- Нет empty-state для пустого списка.
- Нет пагинации и поиска — вне MVP.
- Ошибка отображается текстом, компонент `shared/ui/Error` не используется.

## Ссылки

- [Создание группы](002-create-group.md)
- [API](../../api.md)
