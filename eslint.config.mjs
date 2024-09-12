import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("prettier"),
  {
    plugins: {
      jest,
    },

    languageOptions: {
      globals: {},
      ecmaVersion: "latest",
      sourceType: "script",
    },
  },
];
