<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Трассировка «спека ↔ код»

> Сгенерировано из frontmatter спек и маркеров `@spec` в коде.

## Спеки → код

| Спека | Файлы и каталоги | Плановые пути | Маркеры `@spec` |
| --- | --- | --- | --- |
| `auth-001` | `src/features/auth/`<br>`src/pages/AuthPage/`<br>`src/app/providers/`<br>`src/app/router.tsx` | — | `src/pages/AuthPage/AuthPage.tsx` |
| `auth-002` | `src/features/auth/authSlice.ts`<br>`src/app/store.ts`<br>`src/main.tsx`<br>`src/shared/api/apiSlice.ts` | `src/shared/lib/storage.ts` | — |
| `groups-001` | `src/features/groups/`<br>`src/pages/GroupsPage/`<br>`src/widgets/groups-list/`<br>`src/entities/group/`<br>`src/shared/mocks/handlers/groups.ts` | — | `src/pages/GroupsPage/GroupsPage.tsx` |
| `groups-002` | `src/widgets/create-group-modal/`<br>`src/features/groups/`<br>`src/features/autocomplete-address/`<br>`src/shared/ui/AutocompleteAddress/`<br>`src/shared/ui/LocationPicker/`<br>`src/shared/ui/ImageUploader/`<br>`src/shared/mocks/handlers/groups.ts` | — | `src/widgets/create-group-modal/CreateGroupModal.tsx` |
| `groups-003` | `src/pages/MapPage/`<br>`src/features/groups/`<br>`src/entities/group/`<br>`src/shared/mocks/handlers/groups.ts` | — | — |
| `map-001` | `src/widgets/Map/`<br>`src/pages/MapPage/`<br>`src/shared/ui/LocationPicker/`<br>`src/features/autocomplete-address/`<br>`src/shared/mocks/handlers/groups.ts` | — | — |
| `photos-001` | `src/entities/photo/types.ts`<br>`src/widgets/LocationModal/`<br>`src/features/photos/index.ts` | `src/features/photos/apiSlice.ts`<br>`src/features/photos/ui/`<br>`src/shared/mocks/handlers/photos.ts` | — |
| `platform-001` | `scripts/docs/`<br>`docs/agent/`<br>`docs/specs/`<br>`docs/generated/`<br>`docs/decisions/`<br>`docs/README.md`<br>`docs/architecture.md`<br>`docs/state-management.md`<br>`docs/api.md`<br>`docs/testing.md`<br>`docs/glossary.md`<br>`.env.example`<br>`AGENTS.md`<br>`README.md`<br>`package.json` | — | — |
| `platform-002` | `src/app/layouts/BottomNavigation/`<br>`src/app/router.tsx` | `src/pages/FriendsPage/`<br>`src/pages/SettingsPage/` | — |
| `platform-003` | `src/features/ui/ModalProvider.tsx`<br>`src/shared/ui/AutocompleteAddress/`<br>`src/shared/ui/LocationPicker/`<br>`src/shared/ui/modal/`<br>`src/shared/mocks/handlers/groups.ts`<br>`src/features/groups/types.ts`<br>`src/widgets/create-group-modal/types.ts`<br>`src/app/store.ts`<br>`src/features/autocomplete-address/types.ts` | — | — |

## Код → спеки

| Файл или каталог | Спеки |
| --- | --- |
| `.env.example` | `platform-001` |
| `AGENTS.md` | `platform-001` |
| `docs/agent/` | `platform-001` |
| `docs/api.md` | `platform-001` |
| `docs/architecture.md` | `platform-001` |
| `docs/decisions/` | `platform-001` |
| `docs/generated/` | `platform-001` |
| `docs/glossary.md` | `platform-001` |
| `docs/README.md` | `platform-001` |
| `docs/specs/` | `platform-001` |
| `docs/state-management.md` | `platform-001` |
| `docs/testing.md` | `platform-001` |
| `package.json` | `platform-001` |
| `README.md` | `platform-001` |
| `scripts/docs/` | `platform-001` |
| `src/app/layouts/BottomNavigation/` | `platform-002` |
| `src/app/providers/` | `auth-001` |
| `src/app/router.tsx` | `auth-001`, `platform-002` |
| `src/app/store.ts` | `auth-002`, `platform-003` |
| `src/entities/group/` | `groups-001`, `groups-003` |
| `src/entities/photo/types.ts` | `photos-001` |
| `src/features/auth/` | `auth-001` |
| `src/features/auth/authSlice.ts` | `auth-002` |
| `src/features/autocomplete-address/` | `groups-002`, `map-001` |
| `src/features/autocomplete-address/types.ts` | `platform-003` |
| `src/features/groups/` | `groups-001`, `groups-002`, `groups-003` |
| `src/features/groups/types.ts` | `platform-003` |
| `src/features/photos/index.ts` | `photos-001` |
| `src/features/ui/ModalProvider.tsx` | `platform-003` |
| `src/main.tsx` | `auth-002` |
| `src/pages/AuthPage/` | `auth-001` |
| `src/pages/AuthPage/AuthPage.tsx` | `auth-001` |
| `src/pages/GroupsPage/` | `groups-001` |
| `src/pages/GroupsPage/GroupsPage.tsx` | `groups-001` |
| `src/pages/MapPage/` | `groups-003`, `map-001` |
| `src/shared/api/apiSlice.ts` | `auth-002` |
| `src/shared/mocks/handlers/groups.ts` | `groups-001`, `groups-002`, `groups-003`, `map-001`, `platform-003` |
| `src/shared/ui/AutocompleteAddress/` | `groups-002`, `platform-003` |
| `src/shared/ui/ImageUploader/` | `groups-002` |
| `src/shared/ui/LocationPicker/` | `groups-002`, `map-001`, `platform-003` |
| `src/shared/ui/modal/` | `platform-003` |
| `src/widgets/create-group-modal/` | `groups-002` |
| `src/widgets/create-group-modal/CreateGroupModal.tsx` | `groups-002` |
| `src/widgets/create-group-modal/types.ts` | `platform-003` |
| `src/widgets/groups-list/` | `groups-001` |
| `src/widgets/LocationModal/` | `photos-001` |
| `src/widgets/Map/` | `map-001` |

