export const LAYERS = ["app", "pages", "widgets", "features", "entities", "shared"];

/** Чем выше ранг, тем выше слой. Импорты разрешены только вниз или на том же уровне. */
export const LAYER_RANK = Object.fromEntries(
  LAYERS.map((layer, index) => [layer, LAYERS.length - 1 - index]),
);

export const ALIASES = {
  "@app": "src/app",
  "@pages": "src/pages",
  "@widgets": "src/widgets",
  "@features": "src/features",
  "@entities": "src/entities",
  "@shared": "src/shared",
};

export const SPEC_STATUSES = ["draft", "approved", "in-progress", "done", "deprecated"];

export const SPEC_STATUS_LABELS = {
  draft: "черновик",
  approved: "согласована",
  "in-progress": "в работе",
  done: "готова",
  deprecated: "устарела",
};

export const REQUIRED_SPEC_FIELDS = [
  "id",
  "title",
  "status",
  "layer",
  "files",
  "created",
  "updated",
];

export const REQUIRED_SPEC_SECTIONS = [
  "Контекст",
  "Требования",
  "Сценарии приёмки",
  "FSD",
  "Файлы",
  "Проверка",
];

/**
 * Осознанные исключения из правила слоёв.
 * Каждое исключение должно быть объяснено в docs/architecture.md.
 */
export const IMPORT_PRAGMAS = [
  {
    specifier: "@app/hooks",
    reason: "типизированные useAppDispatch/useAppSelector — инфраструктурный доступ к store",
  },
];

export const BUSINESS_DIRS = ["features", "pages", "widgets", "entities"];

export const GENERATED_DIR = "docs/generated";

/**
 * Задокументированный архитектурный долг.
 * Такие нарушения не валят `docs:check`, но видны в отчёте.
 * При исправлении запись удаляется из списка.
 */
export const KNOWN_VIOLATIONS = [
  { file: "src/features/ui/ModalProvider.tsx", to: "app", spec: "platform-003" },
  { file: "src/features/ui/ModalProvider.tsx", to: "widgets", spec: "platform-003" },
  { file: "src/shared/mocks/handlers/groups.ts", to: "entities", spec: "platform-003" },
  { file: "src/shared/mocks/handlers/groups.ts", to: "features", spec: "platform-003" },
  { file: "src/shared/ui/AutocompleteAddress/AutocompleteAddress.tsx", to: "features", spec: "platform-003" },
  { file: "src/shared/ui/LocationPicker/LocationPicker.tsx", to: "entities", spec: "platform-003" },
  { file: "src/shared/ui/LocationPicker/LocationPicker.tsx", to: "features", spec: "platform-003" },
  { file: "src/shared/ui/modal/Modal.tsx", to: "app", spec: "platform-003" },
];
