// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { aibolit } from '../src/aibolit';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

import { execSync } from 'child_process';
const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('aibolit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.3.0\n'));
    mockExecSync.mockReturnValueOnce(Buffer.from(''));
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
    mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.3.0\n'));
    mockExecSync.mockReturnValueOnce(Buffer.from('Missing final keyword (P13: 5.0)\n'));
    try {
      const issue = await aibolit(path);
      expect(issue).not.toContain('Your code is perfect');
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  test('handles non-existent file', async () => {
    const path = '/path/to/nonexistent/file.java';
    mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.3.0\n'));
    const result = await aibolit(path);
    expect(result).toBe(`File does not exist: ${path}`);
  });

  describe('check_version', () => {
    test('throws when aibolit outputs invalid format', async () => {
      mockExecSync.mockReturnValue(Buffer.from('invalid output'));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toBe('Probably Aibolit is not installed: "invalid output"');
      }
    });

    test('throws when version pattern not found', async () => {
      mockExecSync.mockReturnValue(Buffer.from('aibolit no-version-here\n'));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toContain('Probably Aibolit is not installed');
      }
    });

    test('throws when version is too old', async () => {
      mockExecSync.mockReturnValue(Buffer.from('aibolit 1.2.0\n'));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toContain('is not recent enough');
        expect(error).toContain('older than 1.3.0');
      }
    });

    test('executes normally when version is exactly required', async () => {
      mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.3.0\n'));
      mockExecSync.mockReturnValueOnce(Buffer.from(''));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      const result = await aibolit(path);
      expect(result).toBe('Your code is perfect');
    });

    test('executes normally when version is newer than required', async () => {
      mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.4.0\n'));
      mockExecSync.mockReturnValueOnce(Buffer.from(''));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      const result = await aibolit(path);
      expect(result).toBe('Your code is perfect');
    });

    test('throws when execSync fails completely', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Command failed');
      });
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Command failed');
      }
    });

    test('handles empty version output', async () => {
      mockExecSync.mockReturnValue(Buffer.from(''));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toContain('Probably Aibolit is not installed');
      }
    });

    test('handles version with extra spaces', async () => {
      mockExecSync.mockReturnValue(Buffer.from('aibolit  1.3.0  \n'));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      try {
        await aibolit(path);
        fail('Should have thrown');
      } catch (error) {
        expect(error).toContain('Probably Aibolit is not installed');
      }
    });

    test('handles aibolit output with invalid warning format', async () => {
      mockExecSync.mockReturnValueOnce(Buffer.from('aibolit 1.3.0\n'));
      mockExecSync.mockReturnValueOnce(
        Buffer.from('Invalid warning format\nAnother invalid line\n'));
      const path = '/tmp/test.java';
      writeFileSync(path, 'public class Test {}');
      const result = await aibolit(path);
      expect(result).toBe('Your code is perfect');
    });
  });
});