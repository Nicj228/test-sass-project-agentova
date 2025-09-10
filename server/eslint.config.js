import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import google from 'eslint-config-google';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': importPlugin,
    },
    rules: {
      ...google.rules,
      'quotes': ['error', 'double'],
      'import/no-unresolved': 'off',
      'indent': ['error', 2],
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.dev.json'],
        sourceType: 'module',
      },
    },
    ignores: [
      '/lib/**/*',
      '/generated/**/*',
    ],
  }
); 