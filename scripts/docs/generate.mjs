import fs from "node:fs";
import path from "node:path";

import { ROOT } from "./lib.mjs";
import { buildPages } from "./pages.mjs";

const pages = buildPages();
const files = Object.keys(pages).sort();

for (const file of files) {
  const absolute = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, pages[file].content, "utf8");
  console.log(`✓ ${file}`);
}

console.log(`\nСгенерировано страниц: ${files.length}`);
