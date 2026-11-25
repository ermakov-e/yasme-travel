# Карта контекста

Что прочитать и что обновить для типовых задач. Цель — не читать весь проект каждый раз, но и не пропустить обязательный документ.

## Как пользоваться

1. Найдите тип задачи в таблице.
2. Прочитайте документы из колонки «Читать».
3. Откройте модули из колонки «Смотреть».
4. В конце обновите документы из колонки «Обновить».

## Типовые задачи

| Тип задачи | Читать | Смотреть | Обновить |
|---|---|---|---|
| Новая страница / маршрут | [FSD](../fsd.md), [архитектура](../architecture.md) | `src/app/router.tsx`, `src/pages`, `src/app/providers` | маршруты, спеку, generated |
| Новый виджет | [component-guidelines](../component-guidelines.md), [UI-гайдлайны](../ui-guidelines.md) | `src/widgets`, `src/shared/ui` | спеку, generated |
| Новая фича | [workflow](workflow.md), [FSD](../fsd.md), [состояние](../state-management.md) | `src/features/*` | спеку, store при новом slice |
| Новый эндпоинт / данные | [API](../api.md), [состояние](../state-management.md) | `src/features/*/apiSlice.ts`, `src/shared/mocks/handlers` | `docs/api.md`, моки, спеку |
| Изменение доменной модели | [глоссарий](../glossary.md), [API](../api.md) | `src/entities` | типы, generated/entities, спеку |
| UI-компонент в `shared/ui` | [UI-гайдлайны](../ui-guidelines.md), [component-guidelines](../component-guidelines.md) | `src/shared/ui`, `src/app/styles/theme.ts` | index.ts, generated/ui-kit, спеку |
| Авторизация | [состояние](../state-management.md), спеки `auth/*` | `src/features/auth`, `src/app/providers`, `src/pages/AuthPage` | спеку, generated |
| Карта / геолокация | спеки `map/*`, [API](../api.md) | `src/widgets/Map`, `src/pages/MapPage`, `shared/ui/LocationPicker`, `features/autocomplete-address` | спеку, generated |
| Фотографии | спеки `photos/*` | `src/entities/photo`, `src/widgets/LocationModal`, `src/features/photos` | спеку, generated |
| Навигация и layout | [архитектура](../architecture.md), спека `platform/002` | `src/app/layouts` | спеку, generated |
| Рефакторинг слоёв | [FSD](../fsd.md), [ADR-0002](../decisions/0002-fsd-boundary-check.md), спека `platform/003` | `generated/architecture-check.md` | ADR при новом решении, generated |
| Документация | [правила спек](../specs/README.md), [workflow](workflow.md) | `scripts/docs` | generated, спеку `platform/001` |
| Новая зависимость | [ADR](../decisions/README.md) | `package.json` | ADR, спеку, DoD |

## Слои и типичные файлы

| Слой | Где искать | Что обычно меняется |
|---|---|---|
| `app` | `src/app` | router, providers, layouts, styles, store |
| `pages` | `src/pages/<Name>Page` | композиция виджетов и фич |
| `widgets` | `src/widgets/<name>` | крупный UI-блок |
| `features` | `src/features/<name>` | slice, RTK Query, UI-сценарий |
| `entities` | `src/entities/<name>` | типы, карточки, отображение сущности |
| `shared` | `src/shared` | UI-кит, API-клиент, хуки, моки |

## Обязательные документы перед изменением

| Изменение | Обязательный документ |
|---|---|
| Любое | `AGENTS.md`, спека задачи |
| Стили | [UI-гайдлайны](../ui-guidelines.md), `theme.ts` |
| Архитектура слоёв | [FSD](../fsd.md) |
| Состояние | [state-management](../state-management.md) |
| Контракты API | [api.md](../api.md) |
| Тесты | [testing.md](../testing.md) |

## Красные флаги

- Задача требует импорта из слоя выше — остановиться и обсудить.
- Требуется цвет или отступ вне темы — остановиться.
- Не понятно, к какому слою относится код — сначала определить слой.
- Спека не покрывает требуемое поведение — обновить спеку.
- Нужна библиотека — сначала ADR и согласование.
