<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Сгенерированная документация

> Каталог полностью создаётся скриптом. Правки вручную будут перезаписаны.

## Страницы

| Файл | Содержимое |
| --- | --- |
| `docs/generated/api.md` | RTK Query endpoints, MSW-моки и env-переменные |
| `docs/generated/architecture-check.md` | Нарушения слоёв, дубли, покрытие спеками |
| `docs/generated/entities.md` | Типы и UI сущностей |
| `docs/generated/fsd-tree.md` | Дерево `src`, слои и количество файлов |
| `docs/generated/routes.md` | Маршруты и гварды из `src/app/router.tsx` |
| `docs/generated/specs-index.md` | Все спеки со статусами |
| `docs/generated/state.md` | Store, слайсы и reducers |
| `docs/generated/traceability.md` | Связь спек, файлов и маркеров `@spec` |
| `docs/generated/ui-kit.md` | Экспорты `shared/ui` и модули вне индекса |

## Команды

- `pnpm docs` — перегенерировать все страницы.
- `pnpm docs:check` — проверить, что generated-файлы актуальны, спеки валидны, ссылки не битые.
- `pnpm docs:check -- --strict` — дополнительно падать на предупреждениях архитектуры.

## Почему так

Документация отражает фактическое состояние кода (`router.tsx`, `*Slice.ts`, `*apiSlice.ts`, `shared/ui`, `mocks`). Ручные пояснения живут в соседних документах `docs/*.md`, спеки — в `docs/specs/`, решения — в `docs/decisions/`.

