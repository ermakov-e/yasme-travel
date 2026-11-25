<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Сущности

> Сгенерировано из `src/entities/**/types.ts` и `src/entities/**/ui`.

### GroupLocation

Файл: `src/entities/group/types.ts`

| Поле | Тип | Обязательное |
| --- | --- | --- |
| `lat` | `number` | да |
| `lng` | `number` | да |
| `address` | `string` | нет |


### GroupMember

Файл: `src/entities/group/types.ts`

| Поле | Тип | Обязательное |
| --- | --- | --- |
| `id` | `string` | да |
| `avatar` | `string` | да |


### Group

Файл: `src/entities/group/types.ts`

| Поле | Тип | Обязательное |
| --- | --- | --- |
| `id` | `string` | да |
| `name` | `string` | да |
| `coverImage` | `string` | да |
| `location` | `GroupLocation` | да |
| `members` | `GroupMember[]` | да |


### Photo

Файл: `src/entities/photo/types.ts`

| Поле | Тип | Обязательное |
| --- | --- | --- |
| `id` | `string` | да |
| `groupId` | `string` | да |
| `url` | `string` | да |
| `createdAt` | `string` | да |


### User

Файл: `src/entities/user/types.ts`

| Поле | Тип | Обязательное |
| --- | --- | --- |
| `id` | `string` | да |
| `email` | `string` | да |
| `name` | `string` | да |
| `createdAt` | `string` | да |

## UI сущностей

| Компонент | Файл |
| --- | --- |
| `GroupCard` | `src/entities/group/ui/GroupCard.tsx` |

