import {
  scanApis,
  scanEntities,
  scanEnvVars,
  scanMocks,
  scanRoutes,
  scanSlices,
  scanStore,
  scanUiKit,
} from "./scanners/code.mjs";
import { scanMarkers, scanSpecs } from "./scanners/docs.mjs";
import {
  layerFileCounts,
  scanCoverage,
  scanDuplicateInterfaces,
  scanDuplicateSpecIds,
  scanLayerViolations,
  scanNavigationGaps,
  scanSpecFileProblems,
  scanTree,
} from "./scanners/architecture.mjs";
import {
  renderApi,
  renderArchitectureCheck,
  renderEntities,
  renderGeneratedReadme,
  renderRoutes,
  renderSpecsIndex,
  renderState,
  renderTraceability,
  renderTreePage,
  renderUiKit,
} from "./render.mjs";

export const buildPages = () => {
  const routes = scanRoutes();
  const slices = scanSlices();
  const store = scanStore();
  const apis = scanApis();
  const mocks = scanMocks();
  const envVars = scanEnvVars();
  const uiKit = scanUiKit();
  const entities = scanEntities();
  const specs = scanSpecs();
  const rawMarkers = scanMarkers();

  const specIds = new Set(specs.map((spec) => spec.id));
  const markers = rawMarkers.map((marker) => ({
    ...marker,
    specExists: specIds.has(marker.id),
  }));

  const coverage = scanCoverage(specs);
  const specProblems = scanSpecFileProblems(specs);
  const duplicateSpecIds = scanDuplicateSpecIds(specs);
  const violations = scanLayerViolations();
  const navigationGaps = scanNavigationGaps(routes);
  const duplicates = scanDuplicateInterfaces();
  const tree = scanTree();
  const counts = layerFileCounts();

  const pages = {
    "docs/generated/routes.md": {
      description: "Маршруты и гварды из `src/app/router.tsx`",
      content: renderRoutes(routes),
    },
    "docs/generated/fsd-tree.md": {
      description: "Дерево `src`, слои и количество файлов",
      content: renderTreePage(tree, counts),
    },
    "docs/generated/state.md": {
      description: "Store, слайсы и reducers",
      content: renderState(store, slices),
    },
    "docs/generated/api.md": {
      description: "RTK Query endpoints, MSW-моки и env-переменные",
      content: renderApi(apis, mocks, envVars),
    },
    "docs/generated/ui-kit.md": {
      description: "Экспорты `shared/ui` и модули вне индекса",
      content: renderUiKit(uiKit),
    },
    "docs/generated/entities.md": {
      description: "Типы и UI сущностей",
      content: renderEntities(entities),
    },
    "docs/generated/specs-index.md": {
      description: "Все спеки со статусами",
      content: renderSpecsIndex(specs),
    },
    "docs/generated/traceability.md": {
      description: "Связь спек, файлов и маркеров `@spec`",
      content: renderTraceability(specs, markers),
    },
    "docs/generated/architecture-check.md": {
      description: "Нарушения слоёв, дубли, покрытие спеками",
      content: renderArchitectureCheck({
        violations,
        navigationGaps,
        duplicates,
        coverage,
        specProblems,
        duplicateSpecIds,
        uiKit,
        routes,
        markers,
      }),
    },
  };

  const descriptions = Object.fromEntries(
    Object.entries(pages)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([file, page]) => [file, page.description]),
  );

  pages["docs/generated/README.md"] = {
    description: "Индекс сгенерированных страниц",
    content: renderGeneratedReadme(descriptions),
  };

  return pages;
};
