/**
 * 126 — Palindrome Partitioning
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, partition it so every substring in the partition is a palindrome.
 *   Return all possible palindrome partitionings.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 16
 *   s contains only lowercase English letters.
 *
 * EXAMPLES
 *   partition("aab")  ->  [["a","a","b"], ["aa","b"]]
 *   partition("a")    ->  [["a"]]
 *   partition("ab")   ->  [["a","b"]]   // no multi-character palindrome
 *   partition("aa")   ->  [["a","a"], ["aa"]]
 *   partition("aba")  ->  [["a","b","a"], ["aba"]]
 *   partition("aaa")  ->  [["a","a","a"], ["a","aa"], ["aa","a"], ["aaa"]]
 *
 * EDGE CASES
 *   - Single characters are always palindromes, so a partitioning always exists.
 *   - Cuts must cover the whole string with no gaps.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Re-checking palindromes at every step is the main cost.
 *
 * COMPLEXITY
 *   Naive:  O(n * 2^n) time — generate every partitioning and validate each part afterwards.
 *   Target: Backtracking that only recurses when the current prefix is already a palindrome,
 *           optionally with an O(n^2) precomputed palindrome table.
 * ----------------------------------------------------------------------
 */

function partition(s) {
  // TODO: your solution here
}

module.exports = { partition };
