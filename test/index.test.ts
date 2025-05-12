// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { execSync } from 'child_process';

describe('index', () => {
  test('prints version', async (): Promise<void> => {
    const stdout = execSync('./index.ts --version').toString();
    expect(stdout).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+\n$/);
  });
});
