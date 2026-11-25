<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Проверка архитектуры

> Сгенерировано сканерами `scripts/docs`.

## Нарушения слоёв FSD

| Файл | Импорт | Направление | Критичность | Статус |
| --- | --- | --- | --- | --- |
| `src/features/ui/ModalProvider.tsx` | `@/app/styles/theme` | features → app | **error** | известный долг (`platform-003`) |
| `src/features/ui/ModalProvider.tsx` | `@/widgets/create-group-modal` | features → widgets | **error** | известный долг (`platform-003`) |
| `src/shared/mocks/handlers/groups.ts` | `@entities` | shared → entities | warning | известный долг (`platform-003`) |
| `src/shared/mocks/handlers/groups.ts` | `@features/groups` | shared → features | warning | известный долг (`platform-003`) |
| `src/shared/ui/AutocompleteAddress/AutocompleteAddress.tsx` | `@features/autocomplete-address` | shared → features | **error** | известный долг (`platform-003`) |
| `src/shared/ui/LocationPicker/LocationPicker.tsx` | `@entities/group` | shared → entities | warning | известный долг (`platform-003`) |
| `src/shared/ui/LocationPicker/LocationPicker.tsx` | `@features/autocomplete-address` | shared → features | **error** | известный долг (`platform-003`) |
| `src/shared/ui/modal/Modal.tsx` | `../../../app/styles/theme` | shared → app | **error** | известный долг (`platform-003`) |

> `error` — импорт значения снизу вверх; `warning` — type-only импорт вверх. Исключение: `@app/hooks` (типизированные хуки) и type-only импорт `RootState` из `app`.

## Навигационные ссылки без маршрута

| Файл | Ссылка |
| --- | --- |
| `src/app/layouts/BottomNavigation/BottomNavigation.tsx` | `/friends` |
| `src/app/layouts/BottomNavigation/BottomNavigation.tsx` | `/settings` |

## Дубли имён интерфейсов

| Интерфейс | Файлы |
| --- | --- |
| `AddressSuggestion` | `src/features/autocomplete-address/types.ts`<br>`src/features/groups/types.ts`<br>`src/shared/ui/AutocompleteAddress/types.ts` |
| `CreateGroupFormData` | `src/features/groups/types.ts`<br>`src/widgets/create-group-modal/types.ts` |

## Проблемы спек

_Нет._

## Дубли ID спек

_Нет._

## Маркеры `@spec` без спеки

_Нет._

## Каталоги `shared/ui` без реэкспорта

- `src/shared/ui/LocationPicker/`

## Покрытие спеками

Покрыто **23 из 25** файлов бизнес-слоёв (features, pages, widgets, entities).

| Файл без спеки |
| --- |
| `src/entities/user/types.ts` |
| `src/features/ui/modalSlice.ts` |

## Маршруты и навигация

| Маршрут | Компонент |
| --- | --- |
| `/` | `Navigate` |
| `/auth` | `AuthPage` |
| `/groups` | `GroupsPage` |
| `/groups/:id` | `MapPage` |

