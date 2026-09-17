/**
 * 013 — Minimum Window Substring
 * Difficulty: Hard   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given strings `s` and `t`, return the shortest substring of `s` that contains every
 *   character of `t` including duplicates. If no such window exists, return "".
 *   The answer is guaranteed to be unique.
 *
 * CONSTRAINTS
 *   1 <= s.length, t.length <= 10^5
 *   s and t consist of uppercase and lowercase English letters.
 *
 * EXAMPLES
 *   minWindow("ADOBECODEBANC", "ABC")   ->  "BANC"
 *   minWindow("a", "a")                 ->  "a"
 *   minWindow("a", "aa")                ->  ""   // not enough copies
 *   minWindow("a", "b")                 ->  ""   // no window at all
 *   minWindow("aa", "aa")               ->  "aa"   // the whole string is the answer
 *   minWindow("ADOBECODEBANC", "ABBC")  ->  "BECODEBA"   // the second B forces a longer window
 *
 * EDGE CASES
 *   - t longer than s — return the empty string.
 *   - Repeated characters in t must each be covered.
 *   - Window characters need not be contiguous in t.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — check every substring against t's character counts.
 *   Target: O(n + m) time — expand a window to satisfy the counts, then contract from the left
 *           while it stays valid.
 * ----------------------------------------------------------------------
 */

function minWindow(s, t) {
  // TODO: your solution here
}

module.exports = { minWindow };
