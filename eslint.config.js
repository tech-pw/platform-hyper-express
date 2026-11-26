const tseslint = require("typescript-eslint");
const stylistic = require("@stylistic/eslint-plugin");
const globals = require("globals");

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // Keep typescript-eslint v5 "recommended" severities to avoid churn from the v8 upgrade.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: "always",
        },
      ],
      "@stylistic/semi": ["error", "always"],
    },
  },
);
