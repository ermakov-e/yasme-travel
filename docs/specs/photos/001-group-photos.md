---
id: photos-001
title: Фотографии группы
status: draft
layer: features
areas: [photos]
files:
  - src/entities/photo/types.ts
  - src/widgets/LocationModal/
  - src/features/photos/index.ts
planned:
  - src/features/photos/apiSlice.ts
  - src/features/photos/ui/
  - src/shared/mocks/handlers/photos.ts
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# photos-001 — Фотографии группы

## Контекст

По концепции проекта группа содержит коллекцию фотографий. Сейчас есть только тип `Photo` и заглушка `LocationModal` с текстом «Photos will be here»; фича `features/photos` пуста.

## Требования

- В группе можно открыть галерею фотографий.
- Пустая галерея показывает понятное пустое состояние.
- Пользователь может добавить фотографию: выбрать файл, увидеть превью, подтвердить.
- Фотография появляется в галерее после успешной загрузки.
- Ошибка загрузки не теряет выбранный файл и показывает сообщение.
- Загрузка имеет индикатор прогресса или состояния.
- Галерея адаптирована под мобильный экран.

## Сценарии приёмки

1. Открыть группу → открыть фото → видно пустое состояние.
2. Добавить фото → появляется превью → подтвердить → фото в галерее.
3. Отменить выбор файла → фото не добавляется.
4. Смоделировать ошибку загрузки → сообщение и возможность повторить.
5. Открыть галерею на мобильной ширине → сетка не ломается.

## FSD

- `entities/photo` — тип и отображение фото.
- `features/photos` — загрузка и список.
- `widgets/LocationModal` или новый виджет галереи — UI.
- `shared/mocks` — контракт загрузки.

## Файлы

Существующие: `src/entities/photo/types.ts`, `src/widgets/LocationModal/`, `src/features/photos/index.ts`.

Плановые: `src/features/photos/apiSlice.ts`, `src/features/photos/ui/`, `src/shared/mocks/handlers/photos.ts`.

## Данные и контракты

```ts
interface Photo { id: string; groupId: string; url: string; createdAt: string; }
```

Планируемые эндпоинты: `GET /groups/:id/photos`, `POST /groups/:id/photos` (multipart). Контракт требует согласования.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- Сценарии 1–5 вручную.
- `pnpm docs:check`.

## Открытые вопросы

- Хранить файл на бэкенде или только URL?
- Ограничения по размеру и типу файла?
- Нужны ли удаление и редактирование фото?
- `LocationModal` — временная заглушка или основа галереи?

## Ссылки

- [Детали группы](../groups/003-group-details.md)
- [API](../../api.md)
