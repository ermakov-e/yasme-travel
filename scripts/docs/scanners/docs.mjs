import path from "node:path";

import { exists, markdownLinks, parseFrontmatter, read, walk } from "../lib.mjs";

export const scanSpecs = () =>
  walk(
    "docs/specs",
    (file) =>
      file.endsWith(".md") &&
      !file.endsWith("/README.md") &&
      !/\/_[^/]+\.md$/.test(file),
  ).map((file) => {
    const raw = read(file);
    const { data, body } = parseFrontmatter(raw);
    const fallbackId = /(\d{3})-[^/]+\.md$/.exec(file)?.[1] ?? file;
    return { file, id: data.id ?? fallbackId, data, body, raw };
  });

export const scanMarkers = () =>
  walk("src", (file) => /\.(ts|tsx)$/.test(file)).flatMap((file) => {
    const source = read(file);
    return [...source.matchAll(/@spec\s+([A-Za-z0-9-]+)/g)].map((match) => ({
      file,
      id: match[1].toLowerCase(),
    }));
  });

export const scanSpecSections = (body) =>
  [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());

export const scanDocLinks = () => {
  const files = [
    ...walk("docs", (file) => file.endsWith(".md")),
    "README.md",
    "AGENTS.md",
  ];
  const broken = [];

  for (const file of files) {
    if (!exists(file)) continue;
    const source = read(file);

    for (const target of markdownLinks(source)) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), target));
      const candidates = [resolved, `${resolved}.md`, `${resolved}/README.md`];
      if (!candidates.some((candidate) => exists(candidate))) {
        broken.push({ file, target });
      }
    }
  }

  return broken;
};
