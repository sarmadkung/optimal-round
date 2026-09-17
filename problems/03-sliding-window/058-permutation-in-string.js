/**
 * 058 — Permutation in String
 * Difficulty: Medium   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two strings `s1` and `s2`, return true if `s2` contains a permutation of `s1`
 *   as a contiguous substring.
 *
 * CONSTRAINTS
 *   1 <= s1.length, s2.length <= 10^4
 *   Both consist of lowercase English letters.
 *
 * EXAMPLES
 *   checkInclusion("ab", "eidbaooo")       ->  true   // "ba"
 *   checkInclusion("ab", "eidboaoo")       ->  false
 *   checkInclusion("adc", "dcda")          ->  true
 *   checkInclusion("a", "a")               ->  true   // smallest input
 *   checkInclusion("ab", "a")              ->  false   // s1 longer than s2
 *   checkInclusion("abc", "ccccbbbbaaaa")  ->  false   // all letters present, never contiguous
 *
 * EDGE CASES
 *   - s1 longer than s2 — immediately false.
 *   - The match must be contiguous in s2.
 *   - Character counts must match exactly, including duplicates.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n * m log m) time — sort every window of s2 and compare against sorted s1.
 *   Target: O(n) time, O(26) space — a fixed-size sliding window of length s1.length, updated
 *           incrementally and compared against s1's counts.
 * ----------------------------------------------------------------------
 */

function checkInclusion(s1, s2) {
  // TODO: your solution here
}

module.exports = { checkInclusion };
