import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// import prettier from "eslint-config-prettier"; // Desactiva reglas de ESLint que puedan entrar en conflicto con Prettier
// import prettierPlugin from "eslint-plugin-prettier"; // Integra Prettier como una regla de ESLint

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node, // Cambia "browser" a "node" para entorno Node.js
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn', // Desalienta el uso de console.log
      'no-undef': 'error',
      'no-param-reassign': 'error',
      'no-else-return': 'error',
      'no-extra-semi': 'error', // Evita puntos y coma innecesarios usando la regla de ESLint estándar

      // Reglas de typescript-eslint
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Evita variables sin uso, permite argumentos que empiecen con "_"
      '@typescript-eslint/no-explicit-any': 'warn', // Desalienta el uso de `any` para mejorar el tipado
      '@typescript-eslint/no-this-alias': 'off', // Permite asignar "this" a variables para acceso indirecto
      '@typescript-eslint/no-array-constructor': 'off', // Permite el uso de "new Array()" para inicialización
      '@typescript-eslint/array-type': [
        'error', // Asegura consistencia en el tipo de array (genérico)
        {
          default: 'generic'
        }
      ]
      // '@typescript-eslint/await-thenable': 'error', // Evita el uso de await en objetos no "thenables"
      // '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }], // Sugerencia de tipado explícito en funciones
      // '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Fomenta el uso de `interface` sobre `type`
      // '@typescript-eslint/no-non-null-assertion': 'error', // Desalienta el uso de afirmaciones de no-nulos
      // '@typescript-eslint/no-floating-promises': 'error', // Asegura el manejo adecuado de promesas sin await
      // '@typescript-eslint/prefer-optional-chain': 'error', // Reemplaza encadenamientos largos con `?.`
      // '@typescript-eslint/prefer-nullish-coalescing': 'error', // Reemplaza el uso de `||` con `??`
      // '@typescript-eslint/ban-types': [
      //   'off', // Permite el uso de tipos primitivos para conveniencia
      //   {
      //     types: {
      //       String: { message: 'Use string instead', fixWith: 'string' }, // Sugiere usar "string" en lugar de "String"
      //       Boolean: { message: 'Use boolean instead', fixWith: 'boolean' }, // Sugiere usar "boolean"
      //       Number: { message: 'Use number instead', fixWith: 'number' } // Sugiere usar "number"
      //     }
      //   }
      // ],
      // '@typescript-eslint/consistent-type-definitions': 'error', // Enforce una definición consistente de tipos
      // '@typescript-eslint/no-for-in-array': 'error', // Evita bucles "for-in" sobre arrays
      // '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Evita aserciones de tipo innecesarias
      // '@typescript-eslint/no-var-requires': 'error', // Evita "require()" en código TypeScript
      // '@typescript-eslint/require-array-sort-compare': [
      //   'error', // Requiere función de comparación para "array.sort()" por seguridad
      //   {
      //     ignoreStringArrays: true
      //   }
      // ],
      // '@typescript-eslint/naming-convention': [
      //   'error', // Define convenciones de nombres para distintos tipos de identificadores
      //   { selector: 'default', format: ['camelCase'] },
      //   {
      //     selector: 'variable',
      //     format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
      //     leadingUnderscore: 'allow'
      //   },
      //   { selector: 'import', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
      //   {
      //     selector: 'classProperty',
      //     format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
      //     leadingUnderscore: 'allow'
      //   },
      //   { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      //   { selector: 'memberLike', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'allow' },
      //   { selector: 'typeLike', format: ['PascalCase', 'camelCase'] },
      //   { selector: 'enumMember', format: ['UPPER_CASE', 'camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
      //   {
      //     selector: ['objectLiteralMethod'],
      //     format: ['PascalCase', 'camelCase', 'snake_case', 'UPPER_CASE'],
      //     leadingUnderscore: 'allow'
      //   },
      //   { selector: ['objectLiteralProperty'], format: null, leadingUnderscore: 'allow' },
      //   { selector: 'function', format: ['PascalCase', 'camelCase'], leadingUnderscore: 'allow' }
      // ],
      // '@typescript-eslint/member-ordering': [
      //   'error', // Enforce un orden en las propiedades y métodos de clase
      //   { default: ['signature', 'field', 'constructor', 'method'] }
      // ]

      // "prettier/prettier": "error", // Activa Prettier como regla de ESLint
    }
  },
  // IMPORTS
  pluginJs.configs.recommended, // Configuración recomendada de JavaScript
  // prettier, // Desactiva reglas en conflicto con Prettier
  // prettierPlugin.configs.recommended, // Usa el plugin de Prettier como configuración recomendada
  ...tseslint.configs.recommended // Configuración recomendada de TypeScript
];

// Reglas de TypeScript
