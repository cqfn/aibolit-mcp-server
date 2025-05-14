// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { once } from './helpers/once';

describe('resources', () => {
  test('takes fake advice from baza', async (): Promise<void> => {
    const answer = await once({
      jsonrpc: '2.0' as const,
      id: 1,
      method: 'tools/call',
      params: {
        name: 'find_the_most_critical_design_issue',
        arguments: {
          path: 'Foo.java'
        }
      },
    });
    expect(answer).toHaveProperty('result');
    expect(answer.result).toHaveProperty('content');
    expect(Array.isArray(answer.result?.content)).toBe(true);
    expect(answer.result?.content?.length).toBeGreaterThan(0);
    const text = answer.result?.content?.[0].text;
    expect(text).not.toContain('HTTP error');
  });
});
