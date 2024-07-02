module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
      es2022: true,
      node: true
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    // plugins: ["@typescript-eslint", "prettier"],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "@typescript-eslint/quotes": [
        "error",
        "double",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "@typescript-eslint/semi": ["error", "always"]
    }
  };
  