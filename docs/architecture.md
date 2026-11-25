# Архитектура

Документ описывает фактическое устройство приложения. Нормативные правила слоёв — в [fsd.md](fsd.md), структура компонентов — в [component-guidelines.md](component-guidelines.md), автопроверка — в [generated/architecture-check.md](generated/architecture-check.md).

## Стек

- React 19 + TypeScript (strict)
- Vite 7
- Redux Toolkit + RTK Query
- React Router 7 (`createBrowserRouter`)
- MUI 7 + styled-components 6 (двойная тема)
- react-hook-form + yup
- MSW 2 — моки API в dev
- Leaflet / react-leaflet — карта (виджет пока заглушка)
- vaul — bottom-sheet в `shared/ui/modal`

## Точка входа и провайдеры

`src/main.tsx`:

```text
StrictMode
└── Redux Provider (store)
    └── MUI ThemeProvider (muiTheme)
        └── styled-components ThemeProvider (styledTheme)
            └── CssBaseline + GlobalStyles
                └── RouterProvider (router)
```

В dev до рендера стартует MSW (`src/shared/mocks`). В production моки не включаются: запросы уходят в реальный `/api` (или `VITE_API_BASE_URL`).

## Слои FSD

Сверху вниз. Импорт разрешён только вниз или на том же уровне.

| Слой | Назначение | Что сейчас лежит |
|---|---|---|
| `app` | инициализация, провайдеры, роутинг, тема, layout | `store`, `router`, `hooks`, `providers` (AuthGuard, GuestGuard), `layouts` (Layout, BottomNavigation), `styles` |
| `pages` | композиция страниц | `AuthPage`, `GroupsPage`, `MapPage` |
| `widgets` | крупные самостоятельные блоки | `create-group-modal`, `groups-list`, `Map`, `LocationModal` |
| `features` | пользовательские сценарии и их состояние | `auth`, `groups`, `autocomplete-address`, `ui` (модалки) |
| `entities` | доменные модели и их UI | `group` (+ `GroupCard`), `user`, `photo` |
| `shared` | переиспользуемая инфраструктура | `api`, `ui`, `hooks`, `mocks` |

Полное дерево и количество файлов по слоям — в [generated/fsd-tree.md](generated/fsd-tree.md).

## Правила зависимостей

Разрешено:

```text
app → pages → widgets → features → entities → shared
```

- Импорт на том же уровне допустим, если модули независимы.
- `shared` не зависит ни от кого.
- Бизнес-логика не смешивается с UI: состояние — в slice/RTK Query, компоненты — в `ui`.

### Осознанные исключения

| Исключение | Причина |
|---|---|
| `@app/hooks` из любого слоя | типизированные `useAppDispatch` / `useAppSelector` — инфраструктурный доступ к store |
| type-only импорт `RootState` из `@app/store` | нужен только тип, не создаёт runtime-зависимости |

Исключения зашиты в `scripts/docs/config.mjs` и не считаются нарушениями. Любое новое исключение требует ADR.

### Текущие нарушения

Автопроверка фиксирует реальные отклонения: `shared → features` в `AutocompleteAddress` и `LocationPicker`, `shared → app` в `Modal`, `features → widgets` в `ModalProvider`. Разбор и план исправления — в [specs/platform/003-fsd-cleanup.md](specs/platform/003-fsd-cleanup.md).

## Поток данных

```text
UI (pages / widgets)
   │ dispatch / useSelector
   ├──> features/*/*Slice (auth, modal)
   │
   └──> RTK Query hooks
           │
           ├──> shared/api/apiSlice ──> MSW (dev) ──> /api (prod)
           │        ▲
           │        └── injectEndpoints из features/groups
           │
           └──> features/autocomplete-address ──> Yandex Geocoder
```

- Компоненты не ходят в `fetch` напрямую.
- Эндпоинты бизнес-домена инжектятся в общий `api` из фич.
- Кеш RTK Query тегируется (`Group`, `User`, ...), мутации инвалидируют теги.
- Модалки управляются через `features/ui`: `modalSlice` хранит `activeModal`, `ModalProvider` рендерит нужную модалку.

## Ключевые модули

| Модуль | Ответственность |
|---|---|
| `src/app/router.tsx` | маршруты и гварды |
| `src/app/providers/AuthGuard.tsx` | редирект неавторизованных на `/auth` |
| `src/app/providers/GuestGuard.tsx` | редирект авторизованных на `/groups` |
| `src/features/auth/authSlice.ts` | мок-пользователь, `login` / `logout` |
| `src/features/groups/apiSlice.ts` | `getGroups`, `getFriends`, `createGroup` |
| `src/features/autocomplete-address/apiSlice.ts` | поиск и обратное геокодирование через Яндекс |
| `src/features/ui/modalSlice.ts` + `ModalProvider.tsx` | глобальные модалки |
| `src/shared/api/apiSlice.ts` | базовый RTK Query-клиент |
| `src/shared/mocks/handlers/groups.ts` | MSW-контракт групп и друзей |
| `src/app/styles/theme.ts` | единственный источник цветов, отступов, теней |

## Известные особенности MVP

- Авторизация моковая, без сохранения сессии: перезагрузка страницы разлогинивает ([auth-002](specs/auth/002-session-persistence.md)).
- `setupListeners` не подключён, поэтому `refetchOnFocus` / `refetchOnReconnect` из `apiSlice` фактически не работают.
- `BottomNavigation` содержит ссылки `/friends` и `/settings`, которых нет в роутере ([platform-002](specs/platform/002-navigation-shell.md)).
- `MapPage` рендерит `LocationModal`, которая открывается на любой `activeModal`, и одновременно открывает модалку создания группы.
- `Map` — заглушка; Leaflet используется только в `LocationPicker` ([map-001](specs/map/001-group-map.md)).

## Как добавить фичу

1. Прочитать [workflow агента](agent/workflow.md) и [карту контекста](agent/context-map.md).
2. Создать спеку: `yarn spec:new <area> "Название"`.
3. Определить слой и список файлов (существующие — в `files`, плановые — в `planned`).
4. Реализовать строго в рамках спеки.
5. Обновить статус спеки на `done` и дату.
6. Выполнить `yarn docs` и `yarn docs:check`.
7. Закоммитить код, спеку и generated вместе.
