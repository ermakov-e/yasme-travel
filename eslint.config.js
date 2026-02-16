import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import"; // ← добавить
import unusedImports from "eslint-plugin-unused-imports"; // ← добавить

export default defineConfig([
  globalIgnores(["dist", "node_modules"]), // ← добавить node_modules

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    plugins: {
      import: importPlugin, // ← добавить
      "unused-imports": unusedImports, // ← добавить
    },

    rules: {
      // === TypeScript ===
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Игнорировать аргументы начинающиеся с _
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off", // Не требовать явный return тип
      "@typescript-eslint/no-explicit-any": "warn", // Предупреждение вместо ошибки

      // === React ===
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true, // Разрешить экспорт констант вместе с компонентами
        },
      ],

      // === Imports ===
      "import/order": [
        "error",
        {
          // Сортировка импортов
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "unused-imports/no-unused-imports": "error", // Удалять неиспользуемые импорты
      "import/no-duplicates": "error", // Запретить дубликаты импортов

      // === Code Quality ===
      "no-console": ["warn", { allow: ["warn", "error"] }], // Предупреждение о console.log
      "prefer-const": "error", // Использовать const где возможно
      "no-var": "error", // Запретить var
      "prefer-arrow-callback": "error", // Использовать стрелочные функции
      "func-style": ["error", "expression", { "allowArrowFunctions": true }], // Только стрелочные функции
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    settings: {
      "import/resolver": {
        typescript: {}, // Резолвинг путей через tsconfig
      },
    },
  },
]);
