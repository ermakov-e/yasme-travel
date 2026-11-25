import { SPEC_STATUSES, SPEC_STATUS_LABELS } from "./config.mjs";
import { mdTable, unique } from "./lib.mjs";

const code = (value) => `\`${value}\``;

const header = (title, note) =>
  `<!-- AUTO-GENERATED. Источник: scripts/docs/generate.mjs. Не редактировать вручную. -->\n\n# ${title}\n\n> ${note}\n\n`;

const section = (title, body) => `## ${title}\n\n${body.trimEnd()}\n\n`;

const renderTree = (node, depth = 0) => {
  const children = [...node.children.values()].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
  const lines = [];

  for (const child of children) {
    const hasChildren = child.children.size > 0;
    lines.push(`${"  ".repeat(depth)}- ${child.name}${hasChildren ? "/" : ""}`);
    if (hasChildren) lines.push(...renderTree(child, depth + 1));
  }

  return lines;
};

export const renderRoutes = (routes) =>
  header("Маршруты", "Сгенерировано из `src/app/router.tsx`.") +
  section(
    "Маршруты",
    mdTable(
      ["Path", "Тип", "Компонент", "Гварды", "Обёртки", "Redirect"],
      routes.map((route) => [
        code(route.path),
        route.type,
        code(route.component),
        route.guards,
        route.wrappers,
        route.redirect === "—" ? "—" : code(route.redirect),
      ]),
    ),
  ) +
  section(
    "Правила",
    [
      "- Новый маршрут добавляется только в `src/app/router.tsx`.",
      "- Приватные страницы размещаются внутри `AuthGuard`, гостевые — внутри `GuestGuard`.",
      "- После изменения маршрутов выполните `pnpm docs`, чтобы обновить эту страницу.",
      "- Навигационные ссылки без маршрута фиксируются в `architecture-check.md`.",
    ].join("\n"),
  );

export const renderTreePage = (tree, counts) => {
  const rows = Object.entries(counts).map(([layer, count]) => [code(layer), String(count)]);
  return (
    header("Структура `src` (FSD)", "Сгенерировано обходом каталога `src`.") +
    section(
      "Дерево",
      "```text\nsrc/\n" + renderTree(tree).join("\n") + "\n```\n",
    ) +
    section("Файлы по слоям", mdTable(["Слой", "Файлов TS/TSX"], rows)) +
    section(
      "Правило зависимостей",
      "Импорты разрешены только вниз или на том же уровне:\n\n" +
        "`app → pages → widgets → features → entities → shared`\n\n" +
        "Нарушения фиксируются в `architecture-check.md`.",
    )
  );
};

export const renderState = (store, slices) =>
  header("Состояние приложения", "Сгенерировано из `src/app/store.ts` и `*Slice.ts`.") +
  section(
    "Store",
    mdTable(
      ["Reducer key", "Значение", "Источник"],
      store.reducers.map((reducer) => [
        code(reducer.key),
        code(reducer.value),
        code(reducer.source),
      ]),
    ) +
      `\nMiddleware: ${
        store.middleware.length > 0 ? store.middleware.map(code).join(", ") : "—"
      }\n\n` +
      `setupListeners: ${store.setupListeners ? "подключён" : "**не подключён**"}\n`,
  ) +
  section(
    "Слайсы",
    mdTable(
      ["Слайс", "Файл", "Reducers"],
      slices.map((slice) => [
        code(slice.name),
        code(slice.file),
        slice.reducers.length > 0 ? slice.reducers.map(code).join(", ") : "—",
      ]),
    ),
  ) +
  section(
    "Соглашения",
    [
      "- Состояние фичи живёт в её slice; глобальный store расширяется только при необходимости.",
      "- RTK Query кеш не дублируется в ручных слайсах.",
      "- Модалки управляются через `features/ui` (`modalSlice` + `ModalProvider`).",
      "- Типизированные хуки: `useAppDispatch`, `useAppSelector` из `@app/hooks`.",
    ].join("\n"),
  );

export const renderApi = (apis, mocks, envVars) => {
  const endpoints = apis.flatMap((api) => api.endpoints);
  const baseUrlByApi = new Map(apis.map((api) => [api.label, api.baseUrl]));

  return (
    header("API и моки", "Сгенерировано из `*apiSlice.ts` и `src/shared/mocks/handlers`.") +
    section(
      "Клиенты RTK Query",
      mdTable(
        ["API", "reducerPath", "baseUrl", "Файл"],
        apis.map((api) => [
          code(api.label),
          code(api.reducerPath),
          code(api.baseUrl ?? "—"),
          code(api.file),
        ]),
      ),
    ) +
    section(
      "Эндпоинты",
      mdTable(
        ["API", "Endpoint", "Тип", "HTTP", "URL", "Теги"],
        endpoints.map((endpoint) => [
          code(endpoint.api),
          code(endpoint.name),
          endpoint.type,
          endpoint.method,
          code(
            endpoint.url === ""
              ? baseUrlByApi.get(endpoint.api) ?? "(baseUrl)"
              : endpoint.url,
          ),
          endpoint.tags || "—",
        ]),
      ),
    ) +
    section(
      "MSW-обработчики",
      mdTable(
        ["Метод", "URL", "Задержка, мс", "Статус", "Файл"],
        mocks.map((mock) => [
          mock.method,
          code(mock.url),
          mock.delay,
          mock.status,
          code(mock.file),
        ]),
      ),
    ) +
    section(
      "Переменные окружения",
      mdTable(
        ["Переменная", "Где используется"],
        envVars.map((item) => [code(item.name), item.files.map(code).join("<br>")]),
      ) +
        "\n> `.env` не хранится в репозитории. Для локального запуска создайте файл по образцу `.env.example` (если он появится) и не коммитьте секреты.\n",
    )
  );
};

export const renderUiKit = (uiKit) =>
  header("UI-кит (`shared/ui`)", "Сгенерировано из `src/shared/ui/index.ts` и структуры каталога.") +
  section(
    "Экспорты",
    mdTable(
      ["Имя", "Вид", "Файл"],
      uiKit.rows.map((row) => [code(row.name), row.kind, code(row.path)]),
    ),
  ) +
  section(
    "Каталоги без реэкспорта",
    uiKit.missing.length > 0
      ? uiKit.missing.map((dir) => `- ${code(`src/shared/ui/${dir}/`)}`).join("\n")
      : "_Все каталоги реэкспортированы._",
  ) +
  section(
    "`shared/hooks` вне индекса",
    uiKit.missingHooks.length > 0
      ? uiKit.missingHooks.map((file) => `- ${code(file)}`).join("\n")
      : "_Все хуки реэкспортированы._",
  );

export const renderEntities = (entities) =>
  header("Сущности", "Сгенерировано из `src/entities/**/types.ts` и `src/entities/**/ui`.") +
  entities.interfaces
    .map(
      (model) =>
        `### ${model.name}\n\nФайл: ${code(model.file)}\n\n` +
        mdTable(
          ["Поле", "Тип", "Обязательное"],
          model.fields.map((field) => [code(field.name), code(field.type), field.optional ? "нет" : "да"]),
        ),
    )
    .join("\n\n") +
  "\n" +
  section(
    "UI сущностей",
    mdTable(
      ["Компонент", "Файл"],
      entities.components.map((component) => [code(component.name), code(component.file)]),
    ),
  );

export const renderSpecsIndex = (specs) => {
  const counts = SPEC_STATUSES.map((status) => {
    const count = specs.filter((spec) => spec.data.status === status).length;
    return [SPEC_STATUS_LABELS[status], String(count)];
  });

  return (
    header("Индекс спек", "Сгенерировано из frontmatter файлов `docs/specs/**`.") +
    section("Статусы", mdTable(["Статус", "Количество"], counts)) +
    section(
      "Спеки",
      mdTable(
        ["ID", "Название", "Статус", "Слой", "Области", "Обновлена", "Файл"],
        specs
          .slice()
          .sort((left, right) => left.id.localeCompare(right.id))
          .map((spec) => [
            code(spec.id),
            spec.data.title ?? "—",
            SPEC_STATUS_LABELS[spec.data.status] ?? spec.data.status ?? "—",
            code(spec.data.layer ?? "—"),
            (spec.data.areas ?? []).join(", ") || "—",
            spec.data.updated ?? "—",
            code(spec.file),
          ]),
      ),
    ) +
    section(
      "Легенда",
      SPEC_STATUSES.map((status) => `- ${code(status)} — ${SPEC_STATUS_LABELS[status]}`).join("\n"),
    )
  );
};

export const renderTraceability = (specs, markers) => {
  const markerRows = specs
    .slice()
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((spec) => {
      const files = spec.data.files ?? [];
      const planned = spec.data.planned ?? [];
      const specMarkers = unique(
        markers.filter((marker) => marker.id === spec.id).map((marker) => marker.file),
      );
      return [
        code(spec.id),
        files.length > 0 ? files.map(code).join("<br>") : "—",
        planned.length > 0 ? planned.map(code).join("<br>") : "—",
        specMarkers.length > 0 ? specMarkers.map(code).join("<br>") : "—",
      ];
    });

  const reverse = new Map();
  for (const spec of specs) {
    for (const entry of spec.data.files ?? []) {
      if (!reverse.has(entry)) reverse.set(entry, new Set());
      reverse.get(entry).add(spec.id);
    }
  }
  for (const marker of markers) {
    if (!reverse.has(marker.file)) reverse.set(marker.file, new Set());
    reverse.get(marker.file).add(marker.id);
  }

  const reverseRows = [...reverse.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([entry, ids]) => [code(entry), [...ids].sort().map(code).join(", ")]);

  return (
    header("Трассировка «спека ↔ код»", "Сгенерировано из frontmatter спек и маркеров `@spec` в коде.") +
    section(
      "Спеки → код",
      mdTable(["Спека", "Файлы и каталоги", "Плановые пути", "Маркеры `@spec`"], markerRows),
    ) +
    section("Код → спеки", mdTable(["Файл или каталог", "Спеки"], reverseRows))
  );
};

export const renderArchitectureCheck = ({
  violations,
  navigationGaps,
  duplicates,
  coverage,
  specProblems,
  duplicateSpecIds,
  uiKit,
  routes,
  markers,
}) => {
  const violationRows = violations.map((violation) => [
    code(violation.file),
    violation.specifiers.map(code).join("<br>"),
    `${violation.from} → ${violation.to}`,
    violation.severity === "error" ? "**error**" : "warning",
    violation.known ? `известный долг (${code(violation.spec)})` : "**новое**",
  ]);

  const markerProblems = markers.filter(
    (marker) => !marker.specExists,
  );

  return (
    header("Проверка архитектуры", "Сгенерировано сканерами `scripts/docs`.") +
    section(
      "Нарушения слоёв FSD",
      mdTable(
        ["Файл", "Импорт", "Направление", "Критичность", "Статус"],
        violationRows,
      ) +
        "\n> `error` — импорт значения снизу вверх; `warning` — type-only импорт вверх. " +
        "Исключение: `@app/hooks` (типизированные хуки) и type-only импорт `RootState` из `app`.\n",
    ) +
    section(
      "Навигационные ссылки без маршрута",
      navigationGaps.length > 0
        ? mdTable(
            ["Файл", "Ссылка"],
            navigationGaps.map((gap) => [code(gap.file), code(gap.path)]),
          )
        : "_Нет._",
    ) +
    section(
      "Дубли имён интерфейсов",
      duplicates.length > 0
        ? mdTable(
            ["Интерфейс", "Файлы"],
            duplicates.map((item) => [code(item.name), item.files.map(code).join("<br>")]),
          )
        : "_Нет._",
    ) +
    section(
      "Проблемы спек",
      specProblems.length > 0
        ? mdTable(
            ["Спека", "Запись", "Причина"],
            specProblems.map((problem) => [
              code(problem.spec),
              code(problem.entry),
              problem.reason,
            ]),
          )
        : "_Нет._",
    ) +
    section(
      "Дубли ID спек",
      duplicateSpecIds.length > 0
        ? mdTable(
            ["ID", "Файлы"],
            duplicateSpecIds.map((item) => [code(item.id), item.files.map(code).join("<br>")]),
          )
        : "_Нет._",
    ) +
    section(
      "Маркеры `@spec` без спеки",
      markerProblems.length > 0
        ? mdTable(
            ["Маркер", "Файл"],
            markerProblems.map((marker) => [code(marker.id), code(marker.file)]),
          )
        : "_Нет._",
    ) +
    section(
      "Каталоги `shared/ui` без реэкспорта",
      uiKit.missing.length > 0
        ? uiKit.missing.map((dir) => `- ${code(`src/shared/ui/${dir}/`)}`).join("\n")
        : "_Нет._",
    ) +
    section(
      "Покрытие спеками",
      `Покрыто **${coverage.covered} из ${coverage.total}** файлов бизнес-слоёв (features, pages, widgets, entities).\n\n` +
        (coverage.uncovered.length > 0
          ? mdTable(["Файл без спеки"], coverage.uncovered.map((file) => [code(file)]))
          : "_Все файлы покрыты._"),
    ) +
    section(
      "Маршруты и навигация",
      mdTable(
        ["Маршрут", "Компонент"],
        routes.map((route) => [code(route.path), code(route.component)]),
      ),
    )
  );
};

export const renderGeneratedReadme = (pages) =>
  header(
    "Сгенерированная документация",
    "Каталог полностью создаётся скриптом. Правки вручную будут перезаписаны.",
  ) +
  section(
    "Страницы",
    mdTable(
      ["Файл", "Содержимое"],
      Object.entries(pages).map(([file, description]) => [code(file), description]),
    ),
  ) +
  section(
    "Команды",
    [
      "- `pnpm docs` — перегенерировать все страницы.",
      "- `pnpm docs:check` — проверить, что generated-файлы актуальны, спеки валидны, ссылки не битые.",
      "- `pnpm docs:check -- --strict` — дополнительно падать на предупреждениях архитектуры.",
    ].join("\n"),
  ) +
  section(
    "Почему так",
    "Документация отражает фактическое состояние кода (`router.tsx`, `*Slice.ts`, `*apiSlice.ts`, `shared/ui`, `mocks`). " +
      "Ручные пояснения живут в соседних документах `docs/*.md`, спеки — в `docs/specs/`, решения — в `docs/decisions/`.",
  );
