#!/usr/bin/env -S npx tsx

// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from './src/server';
import { program } from 'commander';
import './src/tools';

program
  .option('--version');
program.parse();
if (program.opts().version) {
  console.log('0.0.0');
  process.exit(0);
}

(async (): Promise<void> => {
  await server.connect(new StdioServerTransport());
})();
