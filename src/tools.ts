// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { z } from 'zod';
import { aibolit, aibolit_top } from './aibolit';
import { safe } from './safe';
import { to_gpt } from './to_gpt';
import { server } from './server';

server.tool(
  'find_the_most_critical_design_issue',
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
        text: await safe(() => aibolit(path)),
        type: 'text'
      }]
    });
  }
);

server.tool(
  'find_top_five_critical_design_issues',
  to_gpt(
    `
    Analyze one Java file.
    List the top five most serious design flaws, ranked from most to least critical.
    Ignore cosmetic or minor issues.
    Use the ranking to choose the one whose refactoring will best improve code quality.
    Code quality means maintainability, readability, loose coupling, and high cohesion.
    Point out each problem and where it sits in the file.
    `
  ),
  { path: z.string() },
  async ({ path }) => {
    return ({
      content: [{
        text: await safe(() => aibolit_top(path)),
        type: 'text'
      }]
    });
  }
);
