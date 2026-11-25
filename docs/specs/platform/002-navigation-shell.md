---
id: platform-002
title: Навигационный каркас
status: draft
layer: app
areas: [platform, navigation]
files:
  - src/app/layouts/BottomNavigation/
  - src/app/router.tsx
planned:
  - src/pages/FriendsPage/
  - src/pages/SettingsPage/
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# platform-002 — Навигационный каркас

## Контекст

`BottomNavigation` показывает три вкладки: Groups, Friends, Settings. В роутере зарегистрированы только `/groups` и `/groups/:id`. Ссылки `/friends` и `/settings` ведут в никуда; автопроверка фиксирует это в [architecture-check.md](../../generated/architecture-check.md).

## Требования

- В приложении нет навигационных ссылок на незарегистрированные маршруты.
- На мобильном экране нижняя навигация показывается только на разрешённых путях.
- Активная вкладка определяется по текущему URL.
- Выбран один из вариантов: реализовать страницы Friends и Settings или скрыть вкладки до их появления.
- Переход между вкладками не теряет состояние авторизации.

## Сценарии приёмки

1. Открыть `/groups` на мобильной ширине → видны только существующие вкладки.
2. Нажать на вкладку → открывается соответствующий маршрут.
3. Открыть URL несуществующей вкладки напрямую → понятная страница 404 или редирект на `/groups`.
4. На десктопной ширине нижняя навигация скрыта.

## FSD

- `app/layouts/BottomNavigation` — навигация.
- `app/router.tsx` — маршруты.
- `pages` — страницы вкладок, если они реализуются.

## Файлы

Существующие: `src/app/layouts/BottomNavigation/`, `src/app/router.tsx`.

Плановые (при выборе реализации): `src/pages/FriendsPage/`, `src/pages/SettingsPage/`.

## Данные и контракты

Список вкладок и разрешённых путей сейчас дублируется в `Layout` и `BottomNavigation`. Требуется один источник истины.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- Сценарии 1–4 вручную на мобильной и десктопной ширине.
- `pnpm docs:check -- --strict`.

## Открытые вопросы

- Входят ли Friends и Settings в MVP?
- Нужна ли страница 404?
- Должна ли навигация быть видна на `/groups/:id`?

## Ссылки

- [Архитектура](../../architecture.md)
- [Маршруты](../../generated/routes.md)
