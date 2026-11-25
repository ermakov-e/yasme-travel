<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# API и моки

> Сгенерировано из `*apiSlice.ts` и `src/shared/mocks/handlers`.

## Клиенты RTK Query

| API | reducerPath | baseUrl | Файл |
| --- | --- | --- | --- |
| `autocompleteApi` | `autocompleteApi` | `https://geocode-maps.yandex.ru/1.x/` | `src/features/autocomplete-address/apiSlice.ts` |
| `injected` | `—` | `—` | `src/features/groups/apiSlice.ts` |
| `api` | `api` | `import.meta.env.VITE_API_BASE_URL \|\| '/api'` | `src/shared/api/apiSlice.ts` |

## Эндпоинты

| API | Endpoint | Тип | HTTP | URL | Теги |
| --- | --- | --- | --- | --- | --- |
| `autocompleteApi` | `searchAddress` | query | GET | `https://geocode-maps.yandex.ru/1.x/` | providesTags: AddressSuggestions |
| `autocompleteApi` | `reverseGeocode` | query | GET | `https://geocode-maps.yandex.ru/1.x/` | — |
| `injected` | `getGroups` | query | GET | `/groups` | providesTags: Group |
| `injected` | `getFriends` | query | GET | `/friends` | providesTags: User |
| `injected` | `createGroup` | mutation | POST | `/groups` | invalidatesTags: Group |

## MSW-обработчики

| Метод | URL | Задержка, мс | Статус | Файл |
| --- | --- | --- | --- | --- |
| GET | `${BASE_URL}/groups` | 500 | 200 | `src/shared/mocks/handlers/groups.ts` |
| GET | `${BASE_URL}/friends` | 300 | 200 | `src/shared/mocks/handlers/groups.ts` |
| POST | `${BASE_URL}/groups` | 800 | 201 | `src/shared/mocks/handlers/groups.ts` |

## Переменные окружения

| Переменная | Где используется |
| --- | --- |
| `DEV` | `src/main.tsx` |
| `VITE_API_BASE_URL` | `src/shared/api/apiSlice.ts`<br>`src/shared/mocks/handlers/groups.ts` |
| `VITE_YANDEX_MAPS_API_KEY` | `src/features/autocomplete-address/apiSlice.ts` |

> `.env` не хранится в репозитории. Для локального запуска создайте файл по образцу `.env.example` (если он появится) и не коммитьте секреты.

