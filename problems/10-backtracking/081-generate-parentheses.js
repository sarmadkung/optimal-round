/**
 * 081 — Generate Parentheses
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `n` pairs of parentheses, generate all combinations of well-formed parentheses.
 *
 * CONSTRAINTS
 *   1 <= n <= 8
 *
 * EXAMPLES
 *   generateParenthesis(1)  ->  ["()"]
 *   generateParenthesis(3)  ->  ["((()))","(()())","(())()","()(())","()()()"]
 *   generateParenthesis(2)  ->  ["(())","()()"]   // any order
 *   generateParenthesis(4)  ->  14 strings   // the 4th Catalan number
 *   generateParenthesis(8)  ->  1430 strings   // the largest allowed n
 *
 * EDGE CASES
 *   - Every result has exactly 2n characters.
 *   - The count of results is the nth Catalan number.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Add ')' only while the closing count is below the opening count.
 *
 * COMPLEXITY
 *   Naive:  O(2^(2n) * n) time — generate every string of brackets and filter the valid ones.
 *   Target: O(4^n / sqrt(n)) time — backtrack, only ever adding '(' while open < n and ')' while
 *           close < open, so invalid branches are never built.
 * ----------------------------------------------------------------------
 */

function generateParenthesis(n) {
  // TODO: your solution here
}

module.exports = { generateParenthesis };
