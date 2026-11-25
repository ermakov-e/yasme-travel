---
id: platform-003
title: Приведение слоёв FSD в порядок
status: draft
layer: shared
areas: [platform, architecture]
files:
  - src/features/ui/ModalProvider.tsx
  - src/shared/ui/AutocompleteAddress/
  - src/shared/ui/LocationPicker/
  - src/shared/ui/modal/
  - src/shared/mocks/handlers/groups.ts
  - src/features/groups/types.ts
  - src/widgets/create-group-modal/types.ts
  - src/app/store.ts
  - src/features/autocomplete-address/types.ts
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# platform-003 — Приведение слоёв FSD в порядок

## Контекст

Автопроверка фиксирует устойчивые нарушения зависимостей и дубли. Это технический долг MVP, который мешает добавлять фичи без новых исключений.

Текущие находки ([architecture-check.md](../../generated/architecture-check.md)):

- `shared/ui/AutocompleteAddress` и `shared/ui/LocationPicker` импортируют `features/autocomplete-address` (значение) и `entities/group` (тип).
- `shared/ui/modal` импортирует тему из `app` (значение).
- `features/ui/ModalProvider` импортирует `widgets/create-group-modal` (значение) и тему из `app`.
- `shared/mocks` импортирует типы из `features` и `entities`.
- Дубли интерфейсов `AddressSuggestion` (3 копии) и `CreateGroupFormData` (2 копии).
- `setupListeners` не вызван, refetch-опции неактивны.
- `shared/ui/LocationPicker` не реэкспортирован из `shared/ui/index.ts`, `useDebounce` — из `shared/hooks/index.ts`.
- Есть `px`, `rgba` и hex вне темы в нескольких компонентах.

## Требования

- В `architecture-check.md` нет нарушений с критичностью `error`.
- Нет дублей `AddressSuggestion` и `CreateGroupFormData`.
- `setupListeners` подключён либо refetch-опции удалены из `apiSlice`.
- `LocationPicker` и `useDebounce` доступны через публичные индексы.
- В изменённых компонентах нет `px`, hex и `rgba` вне темы.
- Поведение приложения не меняется; сценарии [groups-002](../groups/002-create-group.md) проходят.
- Каждое изменение сопровождается обновлением спеки и generated.

## Сценарии приёмки

1. `pnpm docs:check -- --strict` проходит без предупреждений слоёв.
2. `docs/generated/architecture-check.md` не содержит строк с `**error**`.
3. `docs/generated/ui-kit.md` не содержит каталогов без реэкспорта.
4. Создание группы, автодополнение адреса и выбор точки работают как раньше.
5. `npx tsc --noEmit` и `pnpm lint` зелёные.

## FSD

Изменения затрагивают `shared`, `features`, `widgets`, `app`. Направление исправлений — только вниз:

- `shared/ui` не должен знать о `features` и `entities`: типы адреса и локации переносятся в `shared` или `entities`, а компонент получает данные через props.
- `features/ui/ModalProvider` переносится в `app` (композиция модалок) или рендер модалки уходит в widget/page.
- `shared/mocks` использует типы из `entities`; тип payload создания группы переносится в `entities` или дублируется локально как dev-контракт.

## Файлы

| Файл или каталог | Проблема |
|---|---|
| `src/shared/ui/AutocompleteAddress/` | импорт из `features` |
| `src/shared/ui/LocationPicker/` | импорт из `features` и `entities` |
| `src/shared/ui/modal/` | импорт темы из `app` |
| `src/features/ui/ModalProvider.tsx` | импорт из `widgets` и `app` |
| `src/shared/mocks/handlers/groups.ts` | type-only импорт вверх |
| `src/features/groups/types.ts` | дубль `CreateGroupFormData` |
| `src/widgets/create-group-modal/types.ts` | дубль `CreateGroupFormData` |
| `src/features/autocomplete-address/types.ts` | дубль `AddressSuggestion` |
| `src/app/store.ts` | `setupListeners` |

## Данные и контракты

Контракты API не меняются. Меняется только расположение типов и компонентов. `AddressSuggestion` должен иметь один канонический тип; `CreateGroupFormData` — один, в слое, которому он принадлежит.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- `pnpm docs`
- `pnpm docs:check -- --strict`
- Ручные сценарии `groups-002`.

## Открытые вопросы

- Куда переносить `AddressSuggestion`: `shared/types`, `entities/location` или оставить в фиче и передавать через props?
- Нужен ли отдельный ADR на перенос `ModalProvider`?
- Убирать refetch-опции или подключать `setupListeners`?
- Насколько глубоко чистить px-долг: только затронутые файлы или все?

## Ссылки

- [FSD](../../fsd.md)
- [ADR-0002](../../decisions/0002-fsd-boundary-check.md)
- [Проверка архитектуры](../../generated/architecture-check.md)
