import fs from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();

export const toPosix = (value) => value.split(path.sep).join("/");

export const read = (relPath) => fs.readFileSync(path.join(ROOT, relPath), "utf8");

export const exists = (relPath) => fs.existsSync(path.join(ROOT, relPath));

export const isDir = (relPath) => {
  try {
    return fs.statSync(path.join(ROOT, relPath)).isDirectory();
  } catch {
    return false;
  }
};

export const walk = (relDir, predicate = () => true) => {
  const absolute = path.join(ROOT, relDir);
  const result = [];
  if (!fs.existsSync(absolute)) return result;

  const visit = (current) => {
    const entries = fs
      .readdirSync(current, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const entryAbsolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        visit(entryAbsolute);
        continue;
      }
      const relPath = toPosix(path.relative(ROOT, entryAbsolute));
      if (predicate(relPath)) result.push(relPath);
    }
  };

  visit(absolute);
  return result;
};

const isQuote = (char) => char === '"' || char === "'" || char === "`";

export const skipString = (text, index) => {
  const quote = text[index];
  if (!isQuote(quote)) return index;

  let cursor = index + 1;
  while (cursor < text.length) {
    const char = text[cursor];
    if (char === "\\") {
      cursor += 2;
      continue;
    }
    if (char === quote) return cursor + 1;
    cursor += 1;
  }
  return cursor;
};

/**
 * Возвращает индекс закрывающей скобки для открывающей в openIndex.
 * Учитывает строки, шаблонные литералы и комментарии.
 */
export const findMatching = (text, openIndex) => {
  const pairs = { "{": "}", "[": "]", "(": ")" };
  const open = text[openIndex];
  const close = pairs[open];
  if (!close) throw new Error(`Ожидалась скобка, получено: ${JSON.stringify(open)}`);

  let depth = 0;
  let cursor = openIndex;

  while (cursor < text.length) {
    const char = text[cursor];

    if (isQuote(char)) {
      cursor = skipString(text, cursor);
      continue;
    }
    if (char === "/" && text[cursor + 1] === "/") {
      const lineEnd = text.indexOf("\n", cursor);
      cursor = lineEnd === -1 ? text.length : lineEnd;
      continue;
    }
    if (char === "/" && text[cursor + 1] === "*") {
      const commentEnd = text.indexOf("*/", cursor + 2);
      cursor = commentEnd === -1 ? text.length : commentEnd + 2;
      continue;
    }
    if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) return cursor;
    }
    cursor += 1;
  }

  throw new Error(`Не найдена закрывающая скобка для ${open} в позиции ${openIndex}`);
};

export const contentOf = (text, openIndex) => {
  const end = findMatching(text, openIndex);
  return { content: text.slice(openIndex + 1, end), end };
};

/** Делит текст по запятым верхнего уровня, игнорируя вложенные структуры. */
export const splitTopLevel = (text) => {
  const parts = [];
  let start = 0;
  let depth = 0;
  let cursor = 0;

  while (cursor < text.length) {
    const char = text[cursor];

    if (isQuote(char)) {
      cursor = skipString(text, cursor);
      continue;
    }
    if (char === "/" && text[cursor + 1] === "/") {
      const lineEnd = text.indexOf("\n", cursor);
      cursor = lineEnd === -1 ? text.length : lineEnd;
      continue;
    }
    if (char === "/" && text[cursor + 1] === "*") {
      const commentEnd = text.indexOf("*/", cursor + 2);
      cursor = commentEnd === -1 ? text.length : commentEnd + 2;
      continue;
    }

    if (char === "{" || char === "[" || char === "(") depth += 1;
    else if (char === "}" || char === "]" || char === ")") depth -= 1;
    else if (char === "," && depth === 0) {
      parts.push(text.slice(start, cursor).trim());
      start = cursor + 1;
    }
    cursor += 1;
  }

  parts.push(text.slice(start).trim());
  return parts.filter(Boolean);
};

/**
 * Делит объект на свойства верхнего уровня.
 * В отличие от splitTopLevel склеивает запятые внутри generic-параметров:
 * `query<Group[], void>({...})` остаётся одним свойством.
 */
export const splitProperties = (objectContent) => {
  const parts = splitTopLevel(objectContent);
  const result = [];

  for (const part of parts) {
    const startsProperty =
      /^[A-Za-z_$][\w$]*\s*:/.test(part) || /^\[[^\]]+\]\s*:/.test(part);

    if (startsProperty || result.length === 0) result.push(part);
    else result[result.length - 1] += `, ${part}`;
  }

  return result;
};

/** Возвращает свойства верхнего уровня объектного литерала. */
export const objectEntries = (objectText) => {
  const trimmed = objectText.trimStart();
  if (!trimmed.startsWith("{")) throw new Error("Ожидался объектный литерал");
  return splitProperties(contentOf(trimmed, 0).content);
};

export const entryValue = (entry) => {
  const colon = entry.indexOf(":");
  return colon === -1 ? "" : entry.slice(colon + 1).trim();
};

export const matchString = (value) => /^["']([^"']*)["']/.exec(value.trim())?.[1] ?? null;

export const parseFrontmatter = (raw) => {
  if (!raw.startsWith("---\n")) return { data: {}, body: raw };

  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { data: {}, body: raw };

  const head = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const data = {};
  let currentKey = null;

  for (const line of head.split("\n")) {
    if (!line.trim()) continue;

    if (/^\s*-\s+/.test(line) && currentKey) {
      data[currentKey].push(cleanScalar(line.replace(/^\s*-\s+/, "")));
      continue;
    }

    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!match) continue;

    currentKey = match[1];
    const value = match[2].trim();

    if (value === "") data[currentKey] = [];
    else if (value.startsWith("[") && value.endsWith("]")) {
      data[currentKey] = value
        .slice(1, -1)
        .split(",")
        .map((item) => cleanScalar(item.trim()))
        .filter(Boolean);
    } else {
      data[currentKey] = cleanScalar(value);
    }
  }

  return { data, body };
};

const cleanScalar = (value) => value.replace(/^["']|["']$/g, "").trim();

export const markdownLinks = (raw) => {
  const links = [];
  for (const match of raw.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    links.push(target.split("#")[0]);
  }
  return links;
};

export const escapeCell = (value) =>
  String(value).replace(/\|/g, "\\|").replace(/\n/g, " ").trim();

export const mdTable = (headers, rows) => {
  if (rows.length === 0) return "_Нет данных._\n";

  const head = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
    .join("\n");

  return `${head}\n${divider}\n${body}\n`;
};

export const unique = (values) => [...new Set(values.filter(Boolean))];
