import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        console: 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      '@angular-eslint': angular,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettier,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'unicorn/better-regex': 'error',
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      // '@angular-eslint/no-empty-lifecycle-method': 'error',
      // '@angular-eslint/use-lifecycle-interface': 'error',
      // '@angular-eslint/no-conflicting-lifecycle': 'error',
      // '@angular-eslint/no-output-native': 'error',
      // '@angular-eslint/no-input-rename': 'error',
      // '@angular-eslint/no-output-rename': 'error',
      // '@angular-eslint/no-inputs-metadata-property': 'error',
      // '@angular-eslint/no-outputs-metadata-property': 'error',
      // '@angular-eslint/no-host-metadata-property': 'error',
      // '@angular-eslint/no-queries-metadata-property': 'error',
      // '@angular-eslint/contextual-lifecycle': 'error',
      // '@angular-eslint/no-lifecycle-call': 'error',
      // '@angular-eslint/use-pipe-transform-interface': 'error',
      // '@angular-eslint/pipe-prefix': 'error',
      // '@angular-eslint/component-selector': [
      //   'error',
      //   {
      //     type: 'element',
      //     prefix: 'app',
      //     style: 'kebab-case',
      //   },
      // ],
      // '@angular-eslint/directive-selector': [
      //   'error',
      //   {
      //     type: 'attribute',
      //     prefix: 'app',
      //     style: 'camelCase',
      //   },
      // ],
      // '@angular-eslint/pipe-selector': [
      //   'error',
      //   {
      //     type: 'pipe',
      //     prefix: 'app',
      //     style: 'camelCase',
      //   },
      // ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.jasmine,
        console: 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.spec.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      // '@angular-eslint/template/accessibility-alt-text': 'error',
      // '@angular-eslint/template/accessibility-elements-content': 'error',
      // '@angular-eslint/template/accessibility-label-has-associated-control': 'error',
      // '@angular-eslint/template/accessibility-label-for': 'error',
      // '@angular-eslint/template/accessibility-valid-aria': 'error',
      // '@angular-eslint/template/click-events-have-key-events': 'error',
      // '@angular-eslint/template/mouse-events-have-key-events': 'error',
      // '@angular-eslint/template/no-autofocus': 'error',
      // '@angular-eslint/template/no-positive-tabindex': 'error',
      // '@angular-eslint/template/role-has-required-aria': 'error',
      // '@angular-eslint/template/use-track-by-function': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '.angular/**',
    ],
  },
];
