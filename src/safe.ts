// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { to_gpt } from './to_gpt';

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
