import fs from "node:fs";
import path from "node:path";

import {
  ALIASES,
  BUSINESS_DIRS,
  IMPORT_PRAGMAS,
  KNOWN_VIOLATIONS,
  LAYER_RANK,
  LAYERS,
} from "../config.mjs";
import { ROOT, exists, isDir, read, walk } from "../lib.mjs";

export const layerOf = (file) => {
  if (file === "src/main.tsx") return "app";
  const match = /^src\/([^/]+)(?:\/|$)/.exec(file);
  return match && LAYERS.includes(match[1]) ? match[1] : null;
};

export const resolveImport = (specifier, importer) => {
  if (specifier.startsWith(".")) {
    return path.posix.normalize(path.posix.join(path.posix.dirname(importer), specifier));
  }
  if (specifier.startsWith("@/")) return `src/${specifier.slice(2)}`;

  for (const [alias, target] of Object.entries(ALIASES)) {
    if (specifier === alias) return target;
    if (specifier.startsWith(`${alias}/`)) {
      return `${target}/${specifier.slice(alias.length + 1)}`;
    }
  }
  return null;
};

const IMPORT_RE = /import\s+(type\s+)?[\s\S]*?from\s+["']([^"']+)["']/g;

export const scanLayerViolations = () => {
  const files = walk("src", (file) => /\.(ts|tsx)$/.test(file));
  const grouped = new Map();

  for (const file of files) {
    const ownLayer = layerOf(file);
    if (!ownLayer) continue;

    const source = read(file);
    for (const match of source.matchAll(IMPORT_RE)) {
      const typeOnly = Boolean(match[1]);
      const specifier = match[2];
      const resolved = resolveImport(specifier, file);
      if (!resolved) continue;

      const targetLayer = layerOf(resolved);
      if (!targetLayer || targetLayer === ownLayer) continue;
      if (IMPORT_PRAGMAS.some((pragma) => pragma.specifier === specifier)) continue;
      if (typeOnly && targetLayer === "app") continue;
      if (LAYER_RANK[targetLayer] <= LAYER_RANK[ownLayer]) continue;

      const key = `${file}|${ownLayer}|${targetLayer}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          file,
          from: ownLayer,
          to: targetLayer,
          severity: "warning",
          specifiers: new Set(),
        });
      }
      const violation = grouped.get(key);
      violation.specifiers.add(specifier);
      if (!typeOnly) violation.severity = "error";
    }
  }

  return [...grouped.values()]
    .map((item) => {
      const known = KNOWN_VIOLATIONS.find(
        (violation) => violation.file === item.file && violation.to === item.to,
      );
      return {
        ...item,
        specifiers: [...item.specifiers].sort(),
        known: Boolean(known),
        spec: known?.spec ?? null,
      };
    })
    .sort(
      (left, right) =>
        left.file.localeCompare(right.file) || left.to.localeCompare(right.to),
    );
};

export const scanNavigationGaps = (routes) => {
  const file = "src/app/layouts/BottomNavigation/BottomNavigation.tsx";
  if (!exists(file)) return [];

  const source = read(file);
  const navPaths = [...source.matchAll(/path\s*:\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
  const routePaths = routes.map((route) => route.path);

  return [...new Set(navPaths)]
    .filter((navPath) => !routePaths.some((routePath) => routePath === navPath))
    .map((navPath) => ({ file, path: navPath }));
};

export const scanDuplicateInterfaces = () => {
  const byName = new Map();

  for (const file of walk("src", (item) => /\.(ts|tsx)$/.test(item))) {
    const source = read(file);
    for (const match of source.matchAll(/export\s+interface\s+(\w+)/g)) {
      const name = match[1];
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push(file);
    }
  }

  return [...byName.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([name, files]) => ({ name, files: [...new Set(files)].sort() }))
    .sort((left, right) => left.name.localeCompare(right.name));
};

export const scanCoverage = (specs) => {
  const patterns = specs.flatMap((spec) => spec.data.files ?? []);
  const matches = (file, pattern) =>
    pattern.endsWith("/") ? file.startsWith(pattern) : file === pattern;

  const targets = walk(
    "src",
    (file) =>
      /\.(ts|tsx)$/.test(file) &&
      new RegExp(`^src/(${BUSINESS_DIRS.join("|")})/`).test(file) &&
      !/\/index\.(ts|tsx)$/.test(file) &&
      !file.endsWith(".d.ts"),
  );

  const covered = targets.filter((file) => patterns.some((pattern) => matches(file, pattern)));

  return {
    total: targets.length,
    covered: covered.length,
    uncovered: targets.filter((file) => !covered.includes(file)),
  };
};

export const scanSpecFileProblems = (specs) => {
  const problems = [];

  for (const spec of specs) {
    for (const entry of spec.data.files ?? []) {
      if (entry.endsWith("/")) {
        if (!isDir(entry)) {
          problems.push({ spec: spec.id, file: spec.file, entry, reason: "каталог не существует" });
        }
      } else if (!exists(entry)) {
        problems.push({ spec: spec.id, file: spec.file, entry, reason: "файл не существует" });
      }
    }

    for (const entry of spec.data.planned ?? []) {
      if (!/^(src|docs|scripts)\//.test(entry)) {
        problems.push({
          spec: spec.id,
          file: spec.file,
          entry,
          reason: "planned-путь должен начинаться с src/, docs/ или scripts/",
        });
      }
    }
  }

  return problems;
};

export const scanDuplicateSpecIds = (specs) => {
  const byId = new Map();
  for (const spec of specs) {
    if (!byId.has(spec.id)) byId.set(spec.id, []);
    byId.get(spec.id).push(spec.file);
  }
  return [...byId.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([id, files]) => ({ id, files }));
};

export const scanTree = () => {
  const files = walk("src");
  const root = { name: "src", children: new Map() };

  for (const file of files) {
    const parts = file.split("/");
    let node = root;
    for (let index = 1; index < parts.length; index += 1) {
      const part = parts[index];
      if (!node.children.has(part)) {
        node.children.set(part, { name: part, children: new Map() });
      }
      node = node.children.get(part);
    }
  }

  return root;
};

export const layerFileCounts = () => {
  const counts = Object.fromEntries(LAYERS.map((layer) => [layer, 0]));
  for (const file of walk("src", (item) => /\.(ts|tsx)$/.test(item))) {
    const layer = layerOf(file);
    if (layer) counts[layer] += 1;
  }
  return counts;
};

export const sharedDirExists = (name) => fs.existsSync(path.join(ROOT, "src/shared", name));
