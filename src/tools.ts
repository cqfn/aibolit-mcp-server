// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { z } from 'zod';
import { aibolit } from './aibolit';
import { to_gpt } from './to_gpt';
import { server } from './server';

server.tool(
  'find_most_critical_design_issue',
  to_gpt(
    `
    Analyze a single Java file and find the most important
    design issue that requires immediate attention and refactoring.
    Ignore cosmetic problems that are easy to fix.
    Find single most important problem the fix of which will
    most effectively improve the quality of code, its maintainability
    and stability.
    `
  ),
  { path: z.string() },
  async ({ path }) => {
    return ({
      content: [{
        text: await aibolit(path),
        type: 'text'
      }]
    });
  }
);
