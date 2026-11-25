<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Состояние приложения

> Сгенерировано из `src/app/store.ts` и `*Slice.ts`.

## Store

| Reducer key | Значение | Источник |
| --- | --- | --- |
| `auth` | `authReducer` | `@features/auth` |
| `modal` | `modalReducer` | `@features/ui` |
| `[api.reducerPath]` | `api.reducer` | `@shared/api/apiSlice` |
| `[autocompleteApi.reducerPath]` | `autocompleteApi.reducer` | `@features/autocomplete-address` |

Middleware: `api.middleware`, `autocompleteApi.middleware`

setupListeners: **не подключён**

## Слайсы

| Слайс | Файл | Reducers |
| --- | --- | --- |
| `auth` | `src/features/auth/authSlice.ts` | `setUser`, `setLoading`, `setError`, `logout`, `login` |
| `modal` | `src/features/ui/modalSlice.ts` | `openModal`, `closeModal` |

## Соглашения

- Состояние фичи живёт в её slice; глобальный store расширяется только при необходимости.
- RTK Query кеш не дублируется в ручных слайсах.
- Модалки управляются через `features/ui` (`modalSlice` + `ModalProvider`).
- Типизированные хуки: `useAppDispatch`, `useAppSelector` из `@app/hooks`.

