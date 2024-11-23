import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import prettier from "eslint-config-prettier"; // Desactiva reglas de ESLint que puedan entrar en conflicto con Prettier
// import prettierPlugin from "eslint-plugin-prettier"; // Integra Prettier como una regla de ESLint


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node, // Cambia "browser" a "node" para entorno Node.js
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      // "prettier/prettier": "error", // Activa Prettier como regla de ESLint
    },
  },
  pluginJs.configs.recommended, // Configuración recomendada de JavaScript
  // prettier, // Desactiva reglas en conflicto con Prettier
  // prettierPlugin.configs.recommended, // Usa el plugin de Prettier como configuración recomendada
  ...tseslint.configs.recommended, // Configuración recomendada de TypeScript
 
];

