/**
 * 131 — Zigzag Conversion
 * Difficulty: Medium   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Write the string `s` in a zigzag pattern across `numRows` rows, then read it off row by
 *   row and return the resulting string.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 1000
 *   1 <= numRows <= 1000
 *   s consists of English letters, ',' and '.'.
 *
 * EXAMPLES
 *   convert("PAYPALISHIRING", 3)  ->  "PAHNAPLSIIGYIR"
 *   convert("PAYPALISHIRING", 4)  ->  "PINALSIGYAHRPI"
 *   convert("AB", 1)              ->  "AB"        // one row is unchanged
 *   convert("ABC", 5)             ->  "ABC"       // numRows >= s.length is unchanged
 *   convert("ABCD", 2)            ->  "ACBD"
 *   convert("ABCDEFG", 4)         ->  "AGBFCED"
 *
 * EDGE CASES
 *   - numRows = 1 returns the input unchanged.
 *   - numRows >= s.length also returns the input unchanged.
 *   - The direction flips at the top AND bottom rows.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. A formula-based solution divides by (2 * numRows - 2), which is 0 when numRows is 1 —
 *      special-case it.
 *
 * COMPLEXITY
 *   Naive:  Physically building a numRows x n character matrix wastes O(n * numRows) space.
 *   Target: O(n) time, O(n) space — append each character to a per-row buffer, flipping the row
 *           direction at the first and last row, then concatenate the rows.
 * ----------------------------------------------------------------------
 */

function convert(s, numRows) {
  // TODO: your solution here
}

module.exports = { convert };
