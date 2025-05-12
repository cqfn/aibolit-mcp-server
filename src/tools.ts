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
    Analyze one Java file.
    Find the most serious design flaw.
    It must need immediate refactoring.
    Ignore cosmetic or minor issues.
    Fix the one problem that will best improve code quality.
    Code quality means maintainability, readability, loose coupling, and high cohesion.
    Point out the problem and where it is in the file.
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
