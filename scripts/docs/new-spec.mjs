import fs from "node:fs";
import path from "node:path";

import { ROOT } from "./lib.mjs";

const TRANSLITERATION = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
  щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .split("")
    .map((char) => TRANSLITERATION[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const args = process.argv.slice(2);
const flags = { slug: null, layer: "features" };
const positional = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--slug") {
    flags.slug = args[index + 1];
    index += 1;
  } else if (arg === "--layer") {
    flags.layer = args[index + 1];
    index += 1;
  } else {
    positional.push(arg);
  }
}

const [area, title] = positional;

if (!area || !title) {
  console.error(
    'Использование: node scripts/docs/new-spec.mjs <area> "Название задачи" [--slug slug] [--layer features]',
  );
  process.exit(1);
}

const slug = flags.slug ?? slugify(title);
if (!slug) {
  console.error("Не удалось построить slug из названия. Укажите его явно через --slug.");
  process.exit(1);
}

const areaDir = path.join(ROOT, "docs/specs", area);
fs.mkdirSync(areaDir, { recursive: true });

const existingNumbers = fs
  .readdirSync(areaDir)
  .map((file) => /^(\d{3})-/.exec(file)?.[1])
  .filter(Boolean)
  .map(Number);

const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
const number = String(nextNumber).padStart(3, "0");
const id = `${area}-${number}`;
const file = path.join(areaDir, `${number}-${slug}.md`);
const today = new Date().toISOString().slice(0, 10);

const content = `---
id: ${id}
title: ${title}
status: draft
layer: ${flags.layer}
areas: [${area}]
files: []
planned: []
tests: []
created: ${today}
updated: ${today}
---

# ${id} — ${title}

## Контекст

TODO: зачем задача, какая проблема решается, что уже есть в коде.

## Требования

- TODO: проверяемое требование.

## Сценарии приёмки

1. TODO: конкретный сценарий с ожидаемым результатом.

## FSD

Слой: \`${flags.layer}\`. Укажите затронутые слои и модули, зависимости — только вниз или на том же уровне.

## Файлы

Существующие файлы и каталоги — в \`files\` frontmatter, плановые — в \`planned\`.

## Данные и контракты

TODO: типы, эндпоинты, форматы запросов и ответов. Если контракт меняется — обновите \`docs/api.md\`.

## Проверка

- \`npx tsc --noEmit\`
- \`yarn lint\`
- \`yarn docs:check\`

## Открытые вопросы

- TODO: неоднозначности, требующие решения человека.

## Ссылки

- [Архитектура](../../architecture.md)
- [Правила спек](../README.md)
`;

if (fs.existsSync(file)) {
  console.error(`Файл уже существует: ${path.relative(ROOT, file)}`);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");
console.log(`Создана спека: ${path.relative(ROOT, file)}`);
console.log("Заполните разделы и переведите status в approved перед реализацией.");
