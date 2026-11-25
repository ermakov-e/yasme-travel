---
id: groups-002
title: Создание группы
status: done
layer: widgets
areas: [groups]
files:
  - src/widgets/create-group-modal/
  - src/features/groups/
  - src/features/autocomplete-address/
  - src/shared/ui/AutocompleteAddress/
  - src/shared/ui/LocationPicker/
  - src/shared/ui/ImageUploader/
  - src/shared/mocks/handlers/groups.ts
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# groups-002 — Создание группы

## Контекст

Пользователь создаёт группу из трёх шагов: основная информация, место встречи, участники. Форма живёт в модалке, открывается из списка групп. Отправка — `POST /groups` в мок-API.

## Требования

- Кнопка «+» на `/groups` открывает модалку создания группы.
- Модалка состоит из трёх шагов с заголовками «Новая группа», «Место встречи», «Участники».
- Шаг 1: название (минимум 2 символа) и обложка обязательны.
- Шаг 2: адрес обязателен; адрес выбирается через автодополнение Яндекса или точку на карте.
- Шаг 3: участники опциональны; список друзей загружается из `GET /friends`.
- Переход на следующий шаг возможен только после валидации текущего.
- Назад можно вернуться без потери введённых данных.
- По завершении выполняется `POST /groups`, модалка закрывается, список групп обновляется.
- Закрытие модалки сбрасывает форму и выбранных участников.

## Сценарии приёмки

1. Нажать «+» → открывается шаг «Новая группа».
2. Ввести название из одного символа → переход заблокирован, показана ошибка.
3. Ввести название, загрузить обложку, нажать «Далее» → открывается «Место встречи».
4. Ввести адрес, выбрать подсказку → нажать «Далее» → открывается «Участники».
5. Выбрать двух друзей, нажать «Создать» → модалка закрывается, новая группа появляется в списке.
6. Закрыть модалку на втором шаге → повторное открытие начинается с шага 1 с пустой формой.

## FSD

- `widgets/create-group-modal` — шаги, форма, действия.
- `features/groups` — `getFriends`, `createGroup`.
- `features/autocomplete-address` — поиск адреса.
- `shared/ui` — `AutocompleteAddress`, `LocationPicker`, `ImageUploader`, `Modal`.
- `shared/mocks` — контракт `friends` и `groups`.

## Файлы

| Файл или каталог | Роль |
|---|---|
| `src/widgets/create-group-modal/` | модалка и шаги |
| `src/features/groups/apiSlice.ts` | `getFriends`, `createGroup` |
| `src/features/autocomplete-address/` | геокодер |
| `src/shared/ui/AutocompleteAddress/` | поле адреса |
| `src/shared/ui/LocationPicker/` | выбор точки на карте |
| `src/shared/ui/ImageUploader/` | загрузка обложки |
| `src/shared/mocks/handlers/groups.ts` | моки групп и друзей |

## Данные и контракты

```ts
interface CreateGroupPayload {
  name: string;
  location: GroupLocation;
  memberIds: string[];
}
```

`POST /groups` → `Group`, статус `201`, задержка 800 мс. Обложка в payload **не передаётся**: мок подставляет фиксированный URL.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- Сценарии 1–6 вручную.
- `pnpm docs:check`.

## Открытые вопросы

- Обложка не загружается на сервер, хотя обязательна в форме.
- `CreateGroupFormData` и `AddressSuggestion` продублированы в нескольких слоях.
- На `/groups/:id` кнопка «Add Location» открывает эту же модалку, а `LocationModal` реагирует на тот же `activeModal` — возможны два слоя одновременно.
- Не решено, должен ли адрес быть обязательным при выборе точки на карте.

## Ссылки

- [Список групп](001-groups-list.md)
- [API](../../api.md)
