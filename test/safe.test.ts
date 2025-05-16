// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { safe } from '../src/safe';

describe('safe', () => {
  test('returns successful result', async () => {
    const result = await safe(async () => 'success');
    expect(result).toEqual('success');
  });
  test('returns successful promise result', async () => {
    const result = await safe(async () => Promise.resolve(42));
    expect(result).toEqual(42);
  });
  test('catches and formats Error message', async () => {
    const result = await safe(async () => {
      throw new Error('Test  error   message');
    });
    expect(result).toEqual('Test error message');
  });
  test('catches and formats non-Error exception', async () => {
    const result = await safe(async () => {
      throw 'String   error  ';
    });
    expect(result).toEqual('String error');
  });
  test('handles null exception', async () => {
    const result = await safe(async () => {
      throw null;
    });
    expect(result).toEqual('null');
  });
  test('handles undefined exception', async () => {
    const result = await safe(async () => {
      throw undefined;
    });
    expect(result).toEqual('undefined');
  });
  test('preserves complex return types', async () => {
    const obj = { foo: 'bar', num: 123 };
    const result = await safe(async () => obj);
    expect(result).toEqual(obj);
  });
});