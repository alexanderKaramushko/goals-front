import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '*.json', '*.md']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.errors,
      importPlugin.flatConfigs.warnings,
      importPlugin.flatConfigs.typescript,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-use-before-define': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          vars: 'all',
          ignoreRestSiblings: false,
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-shadow': 'error',
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          natural: false,
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          '': 'never',
          js: 'never',
          json: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'implicit-arrow-linebreak': 'off',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'linebreak-style': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
    },
    settings: {
      'import/extensions': ['.ts', '.tsx', '.json'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.json'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'],
            ['^(app)(/.*|$)'],
            ['^(shared)(/.*|$)'],
            ['^(entities)(/.*|$)'],
            ['^(features)(/.*|$)'],
            ['^(pages)(/.*|$)'],
            ['^(widgets)(/.*|$)'],
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
]);
