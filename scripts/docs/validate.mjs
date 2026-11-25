import { LAYERS, REQUIRED_SPEC_FIELDS, REQUIRED_SPEC_SECTIONS, SPEC_STATUSES } from "./config.mjs";
import { exists, read } from "./lib.mjs";
import { buildPages } from "./pages.mjs";
import { scanRoutes } from "./scanners/code.mjs";
import {
  scanCoverage,
  scanDuplicateInterfaces,
  scanDuplicateSpecIds,
  scanLayerViolations,
  scanNavigationGaps,
  scanSpecFileProblems,
} from "./scanners/architecture.mjs";
import { scanDocLinks, scanMarkers, scanSpecSections, scanSpecs } from "./scanners/docs.mjs";

const strict = process.argv.includes("--strict");
const errors = [];
const warnings = [];

const pages = buildPages();
for (const [file, page] of Object.entries(pages)) {
  if (!exists(file)) {
    errors.push(`Нет generated-файла: ${file}. Запустите: pnpm docs`);
    continue;
  }
  if (read(file) !== page.content) {
    errors.push(`Устарел generated-файл: ${file}. Запустите: pnpm docs`);
  }
}

const specs = scanSpecs();
if (specs.length === 0) {
  errors.push("В docs/specs не найдено ни одной спеки");
}

const specIds = new Set();
for (const spec of specs) {
  const { data, body, file, id } = spec;

  for (const field of REQUIRED_SPEC_FIELDS) {
    if (!(field in data)) errors.push(`${file}: отсутствует поле frontmatter «${field}»`);
  }

  if (data.status && !SPEC_STATUSES.includes(data.status)) {
    errors.push(
      `${file}: недопустимый status «${data.status}» (ожидается: ${SPEC_STATUSES.join(", ")})`,
    );
  }

  if (data.layer && !LAYERS.includes(data.layer)) {
    errors.push(`${file}: недопустимый layer «${data.layer}» (ожидается: ${LAYERS.join(", ")})`);
  }

  if (data.files && !Array.isArray(data.files)) {
    errors.push(`${file}: поле files должно быть списком`);
  }

  const sections = scanSpecSections(body);
  for (const required of REQUIRED_SPEC_SECTIONS) {
    if (!sections.includes(required)) {
      errors.push(`${file}: отсутствует секция «## ${required}»`);
    }
  }

  specIds.add(id);
}

for (const duplicate of scanDuplicateSpecIds(specs)) {
  errors.push(`Дубли ID спек: ${duplicate.id} — ${duplicate.files.join(", ")}`);
}

for (const problem of scanSpecFileProblems(specs)) {
  errors.push(`${problem.file}: ${problem.reason} — ${problem.entry}`);
}

const markers = scanMarkers();
for (const marker of markers) {
  if (!specIds.has(marker.id)) {
    errors.push(`${marker.file}: маркер @spec ${marker.id} не соответствует ни одной спеке`);
  }
}

for (const link of scanDocLinks()) {
  errors.push(`${link.file}: битая ссылка ${link.target}`);
}

const routes = scanRoutes();
for (const violation of scanLayerViolations()) {
  const message = `${violation.file}: ${violation.from} → ${violation.to} (${violation.specifiers.join(", ")})`;
  if (violation.known) {
    warnings.push(`Известный долг слоёв (${violation.spec}): ${message}`);
  } else if (violation.severity === "error") {
    errors.push(`Слои FSD: ${message}`);
  } else {
    warnings.push(`Слои FSD (type-only): ${message}`);
  }
}

for (const gap of scanNavigationGaps(routes)) {
  warnings.push(`${gap.file}: навигационная ссылка без маршрута ${gap.path}`);
}

for (const duplicate of scanDuplicateInterfaces()) {
  warnings.push(`Дубли интерфейса ${duplicate.name}: ${duplicate.files.join(", ")}`);
}

const coverage = scanCoverage(specs);

if (strict) {
  errors.push(...warnings);
  warnings.length = 0;
}

console.log("Проверка документации");
console.log(`  generated-страниц: ${Object.keys(pages).length}`);
console.log(`  спек: ${specs.length}`);
console.log(`  маркеров @spec: ${markers.length}`);
console.log(`  покрытие бизнес-файлов: ${coverage.covered}/${coverage.total}`);

if (warnings.length > 0) {
  console.log("\nПредупреждения:");
  for (const warning of warnings) console.log(`  ! ${warning}`);
}

if (errors.length > 0) {
  console.log("\nОшибки:");
  for (const error of errors) console.log(`  ✗ ${error}`);
  console.log(`\nИтого ошибок: ${errors.length}`);
  process.exit(1);
}

console.log("\n✓ Документация в порядке");
