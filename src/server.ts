// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const server = new McpServer(
  {
    capabilities: {
      tools: {}
    },
    name: 'aibolit-mcp-server',
    version: '0.0.0'
  },
);
