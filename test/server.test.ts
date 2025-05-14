// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { once } from './helpers/once';
import '../src/tools';

describe('server', () => {
  test('lists all tools', async (): Promise<void> => {
    const answer = await once({
      jsonrpc: "2.0" as const,
      id: 1,
      method: 'tools/list',
    });
    expect(answer).toHaveProperty('result');
    expect(answer.result).toHaveProperty('tools');
    expect(Array.isArray(answer.result?.tools)).toBe(true);
    expect(answer.result?.tools?.length).toBeGreaterThan(0);
  });

  test('detects simple issue', async (): Promise<void> => {
    const answer = await once({
      jsonrpc: '2.0' as const,
      id: 1,
      method: 'tools/call',
      params: {
        name: 'find_the_most_critical_design_issue',
        arguments: {
          path: 'foo.java'
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
