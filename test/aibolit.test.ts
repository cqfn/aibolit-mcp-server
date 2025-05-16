// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { aibolit } from '../src/aibolit';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('aibolit', () => {
  test('accepts perfect code', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'aibolit-test-'));
    const path = join(tmp, 'Test.java');
    writeFileSync(
      path,
      `
      public final class Test {
        public void method() {
          int a = 1;
          int b = 2;
          int c = a + b;
        }
      }
      `
    );
    try {
      const issue = await aibolit(path);
      expect(issue).toContain('Your code is perfect');
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('detects simple issue', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'aibolit-test-'));
    const path = join(tmp, 'Test.java');
    writeFileSync(
      path,
      `
      public class Test {
        public void method() {
          int a = 1;
          int b = 2;
          int c = a + b;
        }
      }
      `
    );
    try {
      const issue = await aibolit(path);
      expect(issue).not.toContain('Your code is perfect');
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('handles non-existent file', async () => {
    const path = '/path/to/nonexistent/file.java';
    const result = await aibolit(path);
    expect(result).toBe(`File does not exist: ${path}`);
  });
});
