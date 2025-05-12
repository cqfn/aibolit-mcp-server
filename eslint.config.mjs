// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import ts from 'typescript-eslint';
const [recommended] = await ts.configs.recommended;

export default [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/']
  },
  {
    ...recommended,
    files: ['**/*.ts'],
    languageOptions: {
      parser: ts.parser,
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    rules: {
      ...recommended.rules,
      'indent': ['error', 2],
      'max-len': ['error', { code: 100 }],
      'no-magic-numbers': 'off',
      'padded-blocks': ['error', 'never'],
      'line-comment-position': ['error', { 'position': 'above' }],
      'no-inline-comments': 'error',
      'id-length': ['warn', { 'min': 1, 'max': 20 }],
      'no-param-reassign': 'error',
      'no-this-before-super': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-console': ['warn', { allow: ['error', 'warn', 'log'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];
