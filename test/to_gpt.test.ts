// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

import { describe, expect, test } from '@jest/globals';
import { to_gpt } from '../src/to_gpt';

describe('to_gpt', () => {
  test('compresses plain text', async () => {
    expect(to_gpt('  How\n \t are \n\n you   ?  ')).toEqual('How are you?');
  });
});
