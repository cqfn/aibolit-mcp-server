// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { execSync } from 'child_process';
import fs from 'fs';
import semver from 'semver';
import { to_gpt } from './to_gpt';

function check_version(): void {
  const stdout = execSync(`/bin/bash -c "python3 -m aibolit --version"`).toString();
  const match = stdout.match(/^[^ ]+ (\d+\.\d+\.\d+)\n$/);
  if (!match) {
    throw `Probably Aibolit is not installed: "${stdout}"`
  }
  const ver = match[1]
  const must = '1.3.0';
  if (semver.lt(ver, must)) {
    throw `The version of "Aibolit" Pip package installed on your computer (${ver})
      is not recent enough (older than ${must}), try to install the latest one
      using "pip install aibolit==${must}".`;
  }
}

/**
 * Analyzes a Java file using Aibolit to find the most critical design issue.
 * Runs Aibolit static analyzer and returns the highest priority code quality issue.
 * @param path - The file path to the Java file to analyze
 * @returns A promise that resolves to a formatted message describing the most critical issue
 */
export const aibolit = async function(path: string): Promise<string> {
  check_version();
  if (!fs.existsSync(path)) {
    return `File does not exist: ${path}`;
  }
  const warns = execSync(
    `
    /bin/bash -c "set -o pipefail; (python3 -m aibolit check --full --filenames ${path} || true)"
    `
  ).toString();
  const lines = warns.trim().split('\n').filter(line => line.trim());
  const parsed = lines.map(line => {
    const match = line.match(/^.+?\[(\d+)\]:\s(.+?)\s\(P\d+:\s(\d+(?:\.\d+)?)\)$/);
    if (match) {
      return {
        line: parseFloat(match[1]),
        name: match[2].trim(),
        value: parseFloat(match[3])
      };
    }
    return null;
  }).filter(item => item !== null) as { line: number, name: string; value: number }[];
  const sorted = parsed.sort((a, b) => b.value - a.value);
  const top = sorted[0];
  if (!top) {
    return 'Your code is perfect';
  }
  return to_gpt(
    `
    The most important design issue in this Java file (${path})
    is on the line no.${top.line}: "${top.name}".
    It needs immediate refactoring if you want to increase code maintainability.
    `
  );
}
