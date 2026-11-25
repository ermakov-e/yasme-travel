# API и контракты

Как устроены запросы к данным, моки и переменные окружения. Актуальный список эндпоинтов — [generated/api.md](generated/api.md).

## Клиенты

### Бизнес-API

`src/shared/api/apiSlice.ts` — единый RTK Query-клиент.

- `baseUrl`: `import.meta.env.VITE_API_BASE_URL || "/api"`.
- Авторизация: заголовок `Authorization: Bearer <token>` из `localStorage` (сейчас не используется, см. [auth-002](specs/auth/002-session-persistence.md)).
- Теги кеша: `Auth`, `User`, `Group`, `Location`, `Photo`.

Эндпоинты фич добавляются через `api.injectEndpoints`:

| Фича | Эндпоинты |
|---|---|
| `features/groups` | `getGroups`, `getFriends`, `createGroup` |

### Геокодер

`features/autocomplete-address/apiSlice.ts` — отдельный клиент:

- `baseUrl`: `https://geocode-maps.yandex.ru/1.x/`.
- `searchAddress(query)` — подсказки адреса.
- `reverseGeocode({ lat, lng })` — адрес по координатам.
- Ключ: `VITE_YANDEX_MAPS_API_KEY` (передаётся в query-параметрах).

## Контракты

Доменные типы — в `src/entities`:

| Тип | Поля |
|---|---|
| `Group` | `id`, `name`, `coverImage`, `location`, `members` |
| `GroupLocation` | `lat`, `lng`, `address?` |
| `GroupMember` | `id`, `avatar` |
| `User` | `id`, `email`, `name`, `createdAt` |
| `Photo` | `id`, `groupId`, `url`, `createdAt` |

Полная расшифровка — [generated/entities.md](generated/entities.md).

### Создание группы

```ts
interface CreateGroupPayload {
  name: string;
  location: GroupLocation;
  memberIds: string[];
}
```

Ответ — созданная `Group`, статус `201`.

## Моки (MSW)

Моки работают **только в dev** (`import.meta.env.DEV`) и перехватывают запросы к `VITE_API_BASE_URL`.

Файлы:

- `src/shared/mocks/browser.ts` — инициализация worker.
- `src/shared/mocks/handlers/groups.ts` — обработчики групп и друзей.

Поведение:

- Данные хранятся в памяти модуля и сбрасываются при перезагрузке страницы.
- Задержки имитируют сеть: 300–800 мс.
- `POST /groups` добавляет группу в массив и возвращает `201`.
- Неизвестные запросы пропускаются (`onUnhandledRequest: "bypass"`), поэтому геокодер ходит в реальный Яндекс.

### Добавление эндпоинта

1. Определить тип в `entities` (если он доменный) или в фиче.
2. Добавить endpoint в `*apiSlice.ts` фичи с тегами.
3. Экспортировать хук из `index.ts` фичи.
4. Добавить MSW-обработчик в `shared/mocks/handlers`.
5. Обновить спеку и выполнить `yarn docs`.
6. Проверить `yarn docs:check`.

## Переменные окружения

| Переменная | Назначение | Обязательна |
|---|---|---|
| `VITE_API_BASE_URL` | база бизнес-API | нет, по умолчанию `/api` |
| `VITE_YANDEX_MAPS_API_KEY` | ключ Яндекс-геокодера | да для автодополнения адреса |

`.env` в репозиторий не коммитится. Шаблон — [`.env.example`](../.env.example).

> Ключ Яндекс-геокодера попадает в браузер. Для продакшена его нужно ограничить по HTTP Referer в кабинете Яндекс.Карт или проксировать запросы через бэкенд.

## Ошибки и загрузка

- Компоненты используют состояния хуков RTK Query: `isLoading`, `isFetching`, `isError`, `error`.
- Для отображения загрузки есть `shared/ui/Loading`, для ошибок — `shared/ui/Error`.
- Глобального перехватчика ошибок нет: каждая страница обрабатывает `isError` сама.
- При добавлении нового экрана предусмотрите состояния: loading, error, empty.

## Безопасность

- Не храните токены в коде и не коммитьте `.env`.
- Не логируйте payload-ы с персональными данными.
- Внешние URL (обложки групп в моках) — только для dev-данных.
