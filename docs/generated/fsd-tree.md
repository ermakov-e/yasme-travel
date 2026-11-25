<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->

# Структура `src` (FSD)

> Сгенерировано обходом каталога `src`.

## Дерево

```text
src/
- app/
  - hooks.ts
  - layouts/
    - BottomNavigation/
      - BottomNavigation.tsx
      - index.ts
    - Layout/
      - index.ts
      - Layout.tsx
  - providers/
    - AuthGuard.tsx
    - GuestGuard.tsx
    - index.ts
  - router.tsx
  - store.ts
  - styles/
    - index.ts
    - styled.d.ts
    - theme.ts
- entities/
  - group/
    - index.ts
    - types.ts
    - ui/
      - GroupCard.tsx
      - index.ts
  - index.ts
  - photo/
    - types.ts
  - user/
    - types.ts
- features/
  - auth/
    - authSlice.ts
    - index.ts
  - autocomplete-address/
    - apiSlice.ts
    - index.ts
    - types.ts
  - groups/
    - apiSlice.ts
    - index.ts
    - types.ts
  - map/
    - index.ts
  - photos/
    - index.ts
  - ui/
    - index.ts
    - ModalProvider.tsx
    - modalSlice.ts
- index.css
- main.tsx
- pages/
  - AuthPage/
    - AuthPage.tsx
    - index.ts
  - GroupsPage/
    - GroupsPage.tsx
    - index.ts
  - MapPage/
    - index.ts
    - MapPage.tsx
- shared/
  - api/
    - apiSlice.ts
  - hooks/
    - index.ts
    - useDebounce.ts
  - mocks/
    - browser.ts
    - handlers/
      - groups.ts
      - index.ts
    - index.ts
  - types/
    - index.ts
  - ui/
    - AutocompleteAddress/
      - AutocompleteAddress.tsx
      - index.ts
      - types.ts
    - Button/
      - Button.tsx
      - index.ts
    - Card/
      - Card.tsx
      - index.ts
    - Error/
      - Error.tsx
    - ImageUploader/
      - ImageUploader.tsx
      - index.ts
      - types.ts
    - index.ts
    - Input/
      - index.ts
      - Input.tsx
    - Loading/
      - Loading.tsx
    - LocationPicker/
      - index.ts
      - LocationPicker.tsx
    - modal/
      - index.ts
      - Modal.tsx
- widgets/
  - create-group-modal/
    - CreateGroupModal.tsx
    - index.ts
    - steps/
      - StepBasicInfo.tsx
      - StepLocation.tsx
      - StepMembers.tsx
    - types.ts
    - ui/
      - ModalActions.tsx
      - ModalHeader.tsx
    - validation.ts
  - groups-list/
    - GroupsList.tsx
    - index.ts
  - LocationModal/
    - index.ts
    - LocationModal.tsx
  - Map/
    - index.ts
    - Map.tsx
```

## Файлы по слоям

| Слой | Файлов TS/TSX |
| --- | --- |
| `app` | 14 |
| `pages` | 6 |
| `widgets` | 15 |
| `features` | 13 |
| `entities` | 7 |
| `shared` | 27 |

## Правило зависимостей

Импорты разрешены только вниз или на том же уровне:

`app → pages → widgets → features → entities → shared`

Нарушения фиксируются в `architecture-check.md`.

