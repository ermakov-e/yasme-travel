# Управление состоянием

Store и правила работы с ним. Фактическая структура генерируется в [generated/state.md](generated/state.md).

## Store

`src/app/store.ts` собирает четыре reducer-а и два middleware:

| Ключ | Что хранит | Источник |
|---|---|---|
| `auth` | текущий пользователь, флаг авторизации, загрузка, ошибка | `features/auth` |
| `modal` | активная модалка и payload | `features/ui` |
| `api` | кеш RTK Query бизнес-API | `shared/api/apiSlice` |
| `autocompleteApi` | кеш запросов к Яндекс-геокодеру | `features/autocomplete-address` |

Типизированные хуки — `useAppDispatch`, `useAppSelector` из `@app/hooks`.

## Слайсы

### `authSlice`

`src/features/auth/authSlice.ts`

- Состояние: `user`, `isAuthenticated`, `isLoading`, `error`.
- `login(login)` создаёт мок-пользователя (`crypto.randomUUID()`, `<login>@mock.local`) и ставит `isAuthenticated = true`.
- `logout` очищает пользователя.
- `setUser`, `setLoading`, `setError` — для будущей реальной авторизации.

### `modalSlice`

`src/features/ui/modalSlice.ts`

- Состояние: `activeModal: "create-group" | null`, `modalPayload`.
- `openModal({ name, payload? })`, `closeModal()`.
- `ModalProvider` читает `activeModal` и рендерит соответствующую модалку.

## RTK Query

### Базовый клиент

`src/shared/api/apiSlice.ts`:

- `baseUrl`: `VITE_API_BASE_URL` или `/api`.
- Заголовок `Authorization: Bearer <token>`, если в `localStorage` есть `token` (сейчас токен никто не записывает).
- Теги: `Auth`, `User`, `Group`, `Location`, `Photo`.
- `refetchOnFocus` / `refetchOnReconnect` объявлены, но **не работают**, пока не вызван `setupListeners` в store.

### Эндпоинты фич

Эндпоинты добавляются через `api.injectEndpoints` в своей фиче — см. `features/groups/apiSlice.ts`. Правила:

1. Типы запроса/ответа — из `entities` или локальные в фиче.
2. Query помечает теги (`providesTags`), mutation инвалидирует (`invalidatesTags`).
3. Хуки экспортируются из `index.ts` фичи.
4. Мок-обработчик в `shared/mocks/handlers` повторяет контракт.

### Второй клиент

`features/autocomplete-address` создаёт отдельный `createApi` для Яндекс-геокодера, потому что у него другой `baseUrl` и нет смысла смешивать с бизнес-API.

## Модалки

Паттерн:

```text
dispatch(openModal({ name: "create-group" }))
        │
        ▼
modalSlice.activeModal = "create-group"
        │
        ▼
ModalProvider (в Layout) рендерит <CreateGroupModal />
        │
        ▼
dispatch(closeModal()) — состояние сбрасывается
```

Правила:

- Локальный UI-state (шаг формы, выбранные друзья) живёт в компоненте модалки.
- Состояние «какая модалка открыта» — глобальное, в `modalSlice`.
- Новая модалка добавляется в `ModalName` и в `ModalProvider`.

## Правила

- Состояние принадлежит фиче; не добавляйте глобальные поля «на будущее».
- Серверные данные — только через RTK Query, без ручного дублирования в слайсах.
- Локальный state компонента — для UI-деталей, а не для бизнес-данных.
- Новый slice подключается в `store.ts` и описывается в спеке.

## Известные пробелы

| Пробел | Где зафиксировано |
|---|---|
| Сессия не сохраняется в `localStorage` | [auth-002](specs/auth/002-session-persistence.md) |
| `setupListeners` не вызван, refetch-опции неактивны | [platform/003](specs/platform/003-fsd-cleanup.md) |
| `ModalProvider` зависит от widget напрямую | [platform/003](specs/platform/003-fsd-cleanup.md) |
| `LocationModal` реагирует на любой `activeModal` | [map-001](specs/map/001-group-map.md) |
