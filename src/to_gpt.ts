// SPDX-FileCopyrightText: Copyright (c) 2025 Yegor Bugayenko
// SPDX-License-Identifier: MIT

/**
 * Formats text for GPT consumption by normalizing whitespace and punctuation.
 * Converts multiple spaces to single spaces and removes spaces before punctuation marks.
 * @param txt - The input text to format
 * @returns The formatted text suitable for GPT processing
 */
export const to_gpt = function(txt: string): string {
  return txt
    .replace(/\s+/g, ' ')
    .replace(/ (\?|!|\|,|:)/g, '$1')
    .trim();
}
