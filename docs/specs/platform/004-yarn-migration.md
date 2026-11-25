---
id: platform-004
title: Переход с pnpm на Yarn
status: done
layer: shared
areas: [platform, tooling]
files:
  - package.json
  - yarn.lock
  - README.md
  - AGENTS.md
  - docs/
  - scripts/docs/
planned: []
tests: []
created: 2026-11-25
updated: 2026-11-25
---

# platform-004 — Переход с pnpm на Yarn

## Контекст

Все команды проекта (установка, запуск, гейты документации) сейчас вызываются через pnpm: `packageManager: pnpm@10.8.1`, `pnpm-lock.yaml`, упоминания `pnpm …` в README, AGENTS.md, `docs/` и в текстах, которые выводят скрипты `scripts/docs/`. Нужно перевести проект на Yarn 1 (Classic). Решение зафиксировано в [ADR 0005](../../decisions/0005-yarn-classic.md).

## Требования

- Пакетный менеджер проекта — Yarn 1 (Classic): `packageManager: yarn@1.22.22`.
- `pnpm-lock.yaml` удалён, вместо него в репозитории лежит `yarn.lock`.
- Скрипты в `package.json` не меняются по смыслу и запускаются через `yarn <script>`.
- Во всей документации и во всех текстах, которые выводят скрипты `scripts/docs/`, команды `pnpm …` заменены на `yarn …`.
- Передача флагов скриптам: `yarn docs:check --strict` (без `--`).
- Сгенерированные файлы `docs/generated/` пересобраны через `yarn docs`.

## Сценарии приёмки

1. `yarn install` на чистом клоне ставит зависимости и не меняет `yarn.lock`.
2. `yarn dev`, `yarn build`, `yarn lint` работают так же, как раньше через pnpm.
3. `yarn docs` и `yarn docs:check` зелёные; `yarn docs:check --strict` включает строгий режим.
4. `yarn spec:new <area> "Название"` создаёт спеку, в разделе «Проверка» которой указаны команды `yarn`.
5. `grep -rn pnpm` по репозиторию (без `node_modules`) находит только ADR 0005, эту спеку и строку `pnpm-debug.log*` в `.gitignore` (шаблон Vite).

## FSD

Слой: `shared` (инфраструктура проекта). Код приложения в `src/` не меняется.

## Файлы

Существующие файлы и каталоги — в `files` frontmatter, плановые — в `planned`.

## Данные и контракты

Не меняются.

## Проверка

- `npx tsc --noEmit`
- `yarn lint`
- `yarn docs`
- `yarn docs:check`

## Открытые вопросы

- CI в репозитории не настроен — менять нечего. При появлении CI использовать `yarn install --frozen-lockfile`.

## Ссылки

- [ADR 0005 — Yarn Classic](../../decisions/0005-yarn-classic.md)
- [Архитектура](../../architecture.md)
- [Правила спек](../README.md)
