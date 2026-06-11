// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // El proyecto usa selectores kebab-case por feature (banner-detail,
      // movie-list...) sin prefijo obligatorio, por lo que no se exige 'app'.
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: [],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: [],
          style: "kebab-case",
        },
      ],
    },
  },
  {
    // En los tests y sus mocks se permite 'any' para dobles de prueba.
    files: ["**/*.spec.ts", "**/mocks/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  }
]);
