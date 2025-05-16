// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * MCP server instance for the Aibolit MCP Server.
 * Provides capabilities for tool integration with Aibolit Java code quality analyzer.
 */
export const server = new McpServer(
  {
    capabilities: {
      tools: {}
    },
    name: 'aibolit-mcp-server',
    version: '0.0.5'
  },
);
