// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { to_gpt } from './to_gpt';

/**
 * Safely executes an async function and returns result or formatted error message.
 * Wraps function execution in try-catch to handle errors gracefully.
 * @template T - The return type of the async function
 * @param f - The async function to execute safely
 * @returns A promise that resolves to either the function result or a formatted error string
 */
export const safe = async function<T>(f: () => Promise<T>): Promise<T | string> {
  try {
    return await f();
  } catch (e) {
    if (e instanceof Error) {
      return to_gpt(e.message);
    }
    return to_gpt(String(e));
  }
}
