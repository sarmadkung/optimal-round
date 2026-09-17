/**
 * 038 — Longest Common Subsequence
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two strings `text1` and `text2`, return the length of their longest common
 *   subsequence, or 0 if there is none.
 *
 * CONSTRAINTS
 *   1 <= text1.length, text2.length <= 1000
 *   Both consist of lowercase English characters.
 *
 * EXAMPLES
 *   longestCommonSubsequence("abcde", "ace")        ->  3   // "ace"
 *   longestCommonSubsequence("abc", "abc")          ->  3
 *   longestCommonSubsequence("abc", "def")          ->  0
 *   longestCommonSubsequence("a", "a")              ->  1   // shortest possible inputs
 *   longestCommonSubsequence("abcdefg", "gfedcba")  ->  1   // reversed — only one char lines up
 *   longestCommonSubsequence("aaa", "aa")           ->  2   // duplicates
 *
 * EDGE CASES
 *   - No characters in common.
 *   - Identical strings.
 *   - Subsequence, not substring — characters need not be adjacent.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse on both strings without memoisation.
 *   Target: O(m * n) time, O(min(m, n)) space — a DP grid where a character match extends the
 *           diagonal, otherwise take the better of the two neighbors.
 * ----------------------------------------------------------------------
 */

function longestCommonSubsequence(text1, text2) {
  // TODO: your solution here
}

module.exports = { longestCommonSubsequence };
