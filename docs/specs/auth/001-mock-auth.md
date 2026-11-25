---
id: auth-001
title: Мок-авторизация
status: done
layer: features
areas: [auth]
files:
  - src/features/auth/
  - src/pages/AuthPage/
  - src/app/providers/
  - src/app/router.tsx
tests: []
created: 2026-11-22
updated: 2026-11-22
---

# auth-001 — Мок-авторизация

## Контекст

На этапе MVP нет бэкенда аутентификации. Нужен вход в приложение без реальной проверки учётных данных, чтобы разрабатывать защищённые экраны. Состояние хранится в Redux; сохранение между перезагрузками вынесено в [auth-002](002-session-persistence.md).

## Требования

- Форма входа содержит поля `login` и `password`.
- Кнопка входа неактивна, пока оба поля пустые.
- При отправке формы создаётся мок-пользователь и выполняется переход на `/groups`.
- Неавторизованный пользователь не может открыть `/groups` и `/groups/:id`.
- Авторизованный пользователь не может открыть `/auth`.
- Корневой маршрут `/` перенаправляет на `/auth`.
- Ошибка валидации формы отображается под полями.

## Сценарии приёмки

1. Открыть `/` → происходит редирект на `/auth`.
2. Ввести логин и пароль, нажать «Sign In» → открывается `/groups`, в store `auth.isAuthenticated = true`.
3. Открыть `/groups` без входа → редирект на `/auth`.
4. Войти и открыть `/auth` → редирект на `/groups`.
5. Отправить форму с пустым полем → кнопка недоступна, ошибка не теряется.

## FSD

- `features/auth` — slice и действия.
- `pages/AuthPage` — форма.
- `app/providers` — `AuthGuard`, `GuestGuard`.
- `app/router.tsx` — конфигурация маршрутов.

## Файлы

| Файл | Роль |
|---|---|
| `src/features/auth/authSlice.ts` | состояние и `login` / `logout` |
| `src/pages/AuthPage/AuthPage.tsx` | форма входа |
| `src/app/providers/AuthGuard.tsx` | защита приватных маршрутов |
| `src/app/providers/GuestGuard.tsx` | защита гостевого маршрута |
| `src/app/router.tsx` | маршруты и гварды |

## Данные и контракты

`login(login: string)` создаёт `User`:

```ts
{ id: crypto.randomUUID(), email: `${login}@mock.local`, name: login, createdAt: ISOString }
```

Пароль не проверяется и не сохраняется — это осознанное поведение мока.

## Проверка

- `npx tsc --noEmit`
- `pnpm lint`
- Ручные сценарии 1–5 в `pnpm dev`.
- `pnpm docs:check` — маршруты и store отражены в generated.

## Открытые вопросы

- Сохранение сессии — [auth-002](002-session-persistence.md).
- Кнопка выхода отсутствует в UI, хотя действие `logout` есть в slice.
- Форма показывает сообщения на английском; язык интерфейса не стандартизирован.

## Ссылки

- [Управление состоянием](../../state-management.md)
- [Маршруты](../../generated/routes.md)
