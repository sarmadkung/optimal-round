/**
 * 057 — Longest Repeating Character Replacement
 * Difficulty: Medium   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s` of uppercase English letters and an integer `k`, you may change
 *   at most `k` characters to any other uppercase letter.
 *   Return the length of the longest substring containing a single repeated letter.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 10^5
 *   s consists of uppercase English letters only.
 *   0 <= k <= s.length
 *
 * EXAMPLES
 *   characterReplacement("ABAB", 2)     ->  4   // change both A or both B
 *   characterReplacement("AABABBA", 1)  ->  4   // "AABA" -> "AAAA"
 *   characterReplacement("A", 0)        ->  1
 *   characterReplacement("AAAA", 0)     ->  4   // k = 0, all identical
 *   characterReplacement("ABCDE", 1)    ->  2   // k = 1 buys only one neighbour
 *   characterReplacement("AB", 5)       ->  2   // k larger than the string
 *
 * EDGE CASES
 *   - k = 0 means the longest run of one repeated character.
 *   - k may exceed the string length.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. A window is valid when (length - count of its most frequent char) <= k.
 *
 * COMPLEXITY
 *   Naive:  O(n^2 * 26) time — test every substring against every target letter.
 *   Target: O(n) time, O(26) space — a sliding window tracking character counts and the max count
 *           seen, shrinking whenever the window turns invalid.
 * ----------------------------------------------------------------------
 */

function characterReplacement(s, k) {
  // TODO: your solution here
}

module.exports = { characterReplacement };
