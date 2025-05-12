// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { aibolit } from '../src/aibolit';

describe('aibolit', () => {
  test('detects simple issue', async () => {
    const issue = await aibolit('Foo.java');
    expect(issue).toContain('issues');
  });
});
