import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import chaiFriendlyPlugin from 'eslint-plugin-chai-friendly';

export default [
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parser: eslintParserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: prettierPlugin,
      'chai-friendly': chaiFriendlyPlugin,
    },
    rules: {
      ...eslintPluginTs.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-unused-expressions': 'off', 
      '@typescript-eslint/no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'warn',
    },
  },
];
