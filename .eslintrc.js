const $isProduction = require("./src/helpers/is-production");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": $isProduction ? "warn" : "off",
    "no-debugger": $isProduction ? "warn" : "off",
    "no-unused-vars": $isProduction ? "warn" : "off",
    "no-empty-function": $isProduction ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": $isProduction ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": $isProduction ? "warn" : "off",
    "@typescript-eslint/no-empty-function": $isProduction ? "warn" : "off",
  },
  globals: {
    __PROJECT_CONFIG__: "readonly",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
