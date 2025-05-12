#!/usr/bin/env -S npx tsx

// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from './src/server';
import './src/tools';
import './src/resources';
import './src/prompts';

(async (): Promise<void> => {
  await server.connect(new StdioServerTransport());
})();
