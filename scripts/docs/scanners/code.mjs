import fs from "node:fs";
import path from "node:path";

import {
  ROOT,
  contentOf,
  entryValue,
  matchString,
  objectEntries,
  read,
  splitProperties,
  splitTopLevel,
  unique,
  walk,
} from "../lib.mjs";

const parseElement = (value) => {
  let expression = value.trim();
  if (expression.startsWith("(")) {
    expression = contentOf(expression, 0).content.trim();
  }

  const tags = [...expression.matchAll(/<([A-Z][\w.]*)/g)].map((match) => match[1]);
  const redirect = /<Navigate\b[^>]*\bto\s*=\s*["']([^"']+)["']/.exec(expression)?.[1];

  return { tags, redirect };
};

const toRouteRow = (node) => {
  const ownGuards = node.element.tags.filter((tag) => tag.endsWith("Guard"));
  const ancestorTags = node.ancestors.map((ancestor) => ancestor.element.tags[0]).filter(Boolean);
  const guards = unique([
    ...ancestorTags.filter((tag) => tag.endsWith("Guard")),
    ...ownGuards,
  ]);
  const wrappers = unique(
    ancestorTags.filter((tag) => !tag.endsWith("Guard") && tag !== "Outlet"),
  );
  const components = node.element.tags.filter(
    (tag) => !tag.endsWith("Guard") && !["Navigate", "Outlet", "Layout"].includes(tag),
  );

  return {
    path: node.path ?? "(index)",
    type: node.element.redirect ? "redirect" : node.index ? "index" : "page",
    component: components[0] ?? (node.element.redirect ? "Navigate" : "—"),
    guards: guards.length > 0 ? guards.join(", ") : "—",
    wrappers: wrappers.length > 0 ? wrappers.join(", ") : "—",
    redirect: node.element.redirect ?? "—",
  };
};

export const scanRoutes = () => {
  const source = read("src/app/router.tsx");
  const callStart = source.indexOf("createBrowserRouter(");
  if (callStart === -1) {
    throw new Error("В src/app/router.tsx не найден createBrowserRouter");
  }

  const callContent = contentOf(source, source.indexOf("(", callStart)).content;
  const arrayStart = callContent.indexOf("[");
  if (arrayStart === -1) {
    throw new Error("createBrowserRouter: не найден массив маршрутов");
  }

  const topLevel = splitTopLevel(contentOf(callContent, arrayStart).content).filter((entry) =>
    entry.startsWith("{"),
  );
  if (topLevel.length === 0) {
    throw new Error("createBrowserRouter: массив маршрутов пуст");
  }

  const rows = [];

  const visit = (objects, ancestors) => {
    for (const object of objects) {
      const entries = objectEntries(object);
      const pathEntry = entries.find((entry) => /^path\s*:/.test(entry));
      const indexEntry = entries.find((entry) => /^index\s*:/.test(entry));
      const elementEntry = entries.find((entry) => /^element\s*:/.test(entry));

      const node = {
        path: pathEntry ? matchString(entryValue(pathEntry)) : null,
        index: Boolean(indexEntry),
        element: elementEntry
          ? parseElement(entryValue(elementEntry))
          : { tags: [], redirect: undefined },
        ancestors,
      };

      if (node.path || node.index) rows.push(toRouteRow(node));

      const childrenEntry = entries.find((entry) => /^children\s*:/.test(entry));
      if (!childrenEntry) continue;

      const childrenValue = entryValue(childrenEntry);
      const bracket = childrenValue.indexOf("[");
      if (bracket === -1) continue;

      const children = splitTopLevel(contentOf(childrenValue, bracket).content).filter((entry) =>
        entry.startsWith("{"),
      );
      visit(children, [...ancestors, node]);
    }
  };

  visit(topLevel, []);
  return rows;
};

export const scanSlices = () =>
  walk(
    "src",
    (file) => /Slice\.ts$/.test(file) && !/apiSlice\.ts$/.test(file),
  ).map((file) => {
    const source = read(file);
    const name =
      /createSlice\(\s*\{\s*name\s*:\s*["']([^"']+)["']/.exec(source)?.[1] ?? "—";

    const reducers = [];
    const reducersIndex = source.indexOf("reducers:");
    if (reducersIndex !== -1) {
      const brace = source.indexOf("{", reducersIndex);
      if (brace !== -1) {
        for (const entry of splitTopLevel(contentOf(source, brace).content)) {
          const match = /^(\w+)\s*:/.exec(entry);
          if (match) reducers.push(match[1]);
        }
      }
    }

    return { file, name, reducers };
  });

export const scanStore = () => {
  const file = "src/app/store.ts";
  const source = read(file);
  const storeStart = source.indexOf("configureStore(");
  if (storeStart === -1) throw new Error("В src/app/store.ts не найден configureStore");

  const entries = objectEntries(contentOf(source, source.indexOf("(", storeStart)).content);
  const reducerEntry = entries.find((entry) => /^reducer\s*:/.test(entry));
  if (!reducerEntry) throw new Error("configureStore: не найден reducer");

  const imports = new Map();
  for (const match of source.matchAll(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/g)) {
    for (const specifier of match[1].split(",")) {
      const name = specifier.trim().split(/\s+as\s+/)[0];
      if (name) imports.set(name, match[2]);
    }
  }

  const reducers = objectEntries(entryValue(reducerEntry)).map((entry) => {
    const match = /^([^:]+):\s*([\s\S]+)$/.exec(entry);
    const key = match[1].trim();
    const value = match[2].trim();
    const base = value.split(".")[0].trim();
    return { key, value, source: imports.get(base) ?? "локальный редьюсер" };
  });

  const concat = source.match(/\.concat\(([^)]+)\)/);
  const middleware = concat
    ? concat[1].split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  return {
    file,
    reducers,
    middleware,
    setupListeners: /setupListeners\s*\(/.test(source),
  };
};

const extractTags = (config, name) => {
  const match = new RegExp(`${name}\\s*:\\s*(\\[[^\\]]*\\]|["'][^"']+["'])`).exec(config);
  if (!match) return [];
  const values = match[1]
    .replace(/[[\]"']/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return values.length > 0 ? [`${name}: ${values.join(", ")}`] : [];
};

const scanApi = (file) => {
  const source = read(file);
  const api = {
    file,
    reducerPath: /reducerPath\s*:\s*["']([^"']+)["']/.exec(source)?.[1] ?? "—",
    baseUrl: /baseUrl\s*:\s*["']([^"']+)["']/.exec(source)?.[1] ?? null,
    endpoints: [],
  };
  api.label = api.reducerPath === "—" ? "injected" : api.reducerPath;

  if (!api.baseUrl) {
    const baseConst = /const BASE_URL\s*=\s*([^;\n]+)/.exec(source)?.[1]?.trim();
    if (baseConst) api.baseUrl = baseConst;
  }

  const endpointsIndex = source.indexOf("endpoints:");
  if (endpointsIndex === -1) return api;

  const tail = source.slice(endpointsIndex);
  const arrow = tail.indexOf("=>");
  if (arrow === -1) return api;

  let cursor = endpointsIndex + arrow + 2;
  while (cursor < source.length && /\s/.test(source[cursor])) cursor += 1;

  let blockIndex = -1;
  if (source[cursor] === "(") {
    const inside = contentOf(source, cursor).content;
    const brace = inside.indexOf("{");
    if (brace !== -1) blockIndex = cursor + 1 + brace;
  } else if (source[cursor] === "{") {
    blockIndex = cursor;
  }
  if (blockIndex === -1) return api;

  for (const entry of splitProperties(contentOf(source, blockIndex).content)) {
    const endpointMatch = /^(\w+)\s*:\s*builder\.(query|mutation)/.exec(entry);
    if (!endpointMatch) continue;

    const callParen = entry.indexOf("(", endpointMatch[0].length);
    if (callParen === -1) continue;
    const configBrace = entry.indexOf("{", callParen);
    if (configBrace === -1) continue;

    const config = contentOf(entry, configBrace).content;
    const directUrl = /(?:^|[^\w])url\s*:\s*["']([^"']*)["']/.exec(config)?.[1];
    const arrowUrl = /query\s*:\s*(?:\([^)]*\)|\w+)\s*=>\s*["']([^"']*)["']/.exec(config)?.[1];
    const hasQuery = /\bquery\s*:/.test(config);
    const method =
      /method\s*:\s*["']([A-Z]+)["']/.exec(config)?.[1] ??
      (hasQuery ? "GET" : "—");

    api.endpoints.push({
      api: api.label,
      name: endpointMatch[1],
      type: endpointMatch[2],
      method,
      url: directUrl ?? arrowUrl ?? "—",
      tags: [...extractTags(config, "providesTags"), ...extractTags(config, "invalidatesTags")].join("; "),
    });
  }

  return api;
};

export const scanApis = () =>
  walk("src", (file) => /apiSlice\.ts$/.test(file)).map(scanApi);

export const scanUiKit = () => {
  const indexFile = "src/shared/ui/index.ts";
  const source = read(indexFile);
  const rows = [];

  for (const match of source.matchAll(
    /export\s+(type\s+)?\{\s*([^}]+)\}\s+from\s+["']([^"']+)["']/g,
  )) {
    for (const rawName of match[2].split(",")) {
      const name = rawName.trim();
      if (!name) continue;
      rows.push({
        name,
        kind: match[1] ? "тип" : "компонент",
        path: path.posix.normalize(path.posix.join("src/shared/ui", match[3])),
      });
    }
  }

  const dirs = fs
    .readdirSync(path.join(ROOT, "src/shared/ui"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const missing = dirs.filter(
    (dir) => !new RegExp(`from\\s+["']\\./${dir}(?:/|["'])`).test(source),
  );

  const hookFiles = walk("src/shared/hooks", (file) => file.endsWith(".ts") && !file.endsWith("index.ts"));
  const hooksIndex = "src/shared/hooks/index.ts";
  const hooksSource = fs.existsSync(path.join(ROOT, hooksIndex)) ? read(hooksIndex) : "";
  const missingHooks = hookFiles.filter((file) => {
    const base = path.basename(file, ".ts");
    return !new RegExp(`\\b${base}\\b`).test(hooksSource);
  });

  return { rows, missing, missingHooks };
};

export const scanEntities = () => {
  const interfaces = [];

  for (const file of walk("src/entities", (item) => item.endsWith("types.ts"))) {
    const source = read(file);
    for (const match of source.matchAll(/export\s+interface\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
      const fields = [];
      for (const line of match[2].split("\n")) {
        const field = /^\s*(\w+)(\?)?\s*:\s*(.+?);?\s*$/.exec(line);
        if (!field) continue;
        fields.push({
          name: field[1],
          optional: Boolean(field[2]),
          type: field[3].replace(/;$/, "").trim(),
        });
      }
      interfaces.push({ name: match[1], file, fields });
    }
  }

  const components = [];
  for (const file of walk("src/entities", (item) => item.endsWith(".tsx"))) {
    const source = read(file);
    for (const match of source.matchAll(/export\s+const\s+([A-Z]\w+)/g)) {
      components.push({ name: match[1], file });
    }
    for (const match of source.matchAll(/export\s+function\s+([A-Z]\w+)/g)) {
      components.push({ name: match[1], file });
    }
  }

  return { interfaces, components };
};

export const scanMocks = () =>
  walk("src/shared/mocks/handlers", (file) => file.endsWith(".ts") && !file.endsWith("index.ts")).flatMap(
    (file) => {
      const source = read(file);
      const matches = [
        ...source.matchAll(/http\.(get|post|put|patch|delete)\(\s*[`'"]([^`'"]+)[`'"]/g),
      ];

      return matches.map((match, index) => {
        const end = index + 1 < matches.length ? matches[index + 1].index : source.length;
        const section = source.slice(match.index, end);
        return {
          file,
          method: match[1].toUpperCase(),
          url: match[2],
          delay: /delay\((\d+)\)/.exec(section)?.[1] ?? "—",
          status: /status\s*:\s*(\d+)/.exec(section)?.[1] ?? "200",
        };
      });
    },
  );

export const scanEnvVars = () => {
  const usage = new Map();
  for (const file of walk("src", (item) => /\.(ts|tsx)$/.test(item))) {
    const source = read(file);
    for (const match of source.matchAll(/import\.meta\.env\.([A-Z0-9_]+)/g)) {
      const name = match[1];
      if (!usage.has(name)) usage.set(name, []);
      usage.get(name).push(file);
    }
  }
  return [...usage.entries()]
    .map(([name, files]) => ({ name, files: unique(files) }))
    .sort((left, right) => left.name.localeCompare(right.name));
};
