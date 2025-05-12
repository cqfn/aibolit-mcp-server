// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { Readable, Writable } from "node:stream";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";
import { ReadBuffer, serializeMessage } from "@modelcontextprotocol/sdk/shared/stdio.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from '../../src/server';
import '../../src/tools';

const waitForResponse = async (buffer: ReadBuffer, msec = 5000): Promise<JSONRPCMessage | null> => {
  const start = Date.now();
  let message: JSONRPCMessage | null = null;
  while (Date.now() - start < msec) {
    message = buffer.readMessage();
    if (message !== null) {
      return message;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error('Timeout waiting for response');
};

type ResponseType = JSONRPCMessage & {
  result?: {
    content?: Array<Record<string, unknown>>,
    tools?: Array<Record<string, unknown>>
  }
};

export const once = async (message: JSONRPCMessage): Promise<ResponseType> => {
  const stdin = new Readable({
    read(): void {
      this.push(serializeMessage(message));
      this.push(null);
    }
  });
  const buffer = new ReadBuffer();
  const stdout = new Writable({
    write(chunk, encoding, callback): void {
      buffer.append(chunk);
      callback();
    }
  });
  await server.connect(new StdioServerTransport(stdin, stdout));
  const answer = await waitForResponse(buffer, 10000);
  await server.close();
  if (answer == null) {
    throw new Error('No message returned');
  }
  return answer as ResponseType;
};
