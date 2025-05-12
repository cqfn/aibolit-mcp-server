// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { execSync } from 'child_process';
import fs from 'fs';

export const aibolit = async function(path: string): Promise<string> {
  if (!fs.existsSync(path)) {
    return `File does not exist: ${path}`;
  }
  const stdout = execSync(`/bin/bash -c "aibolit --filename ${path} | head -1"`).toString();
  return stdout;
}
