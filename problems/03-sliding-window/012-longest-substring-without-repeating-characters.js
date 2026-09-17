/**
 * 012 — Longest Substring Without Repeating Characters
 * Difficulty: Medium   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, find the length of the longest substring that contains
 *   no repeating characters.
 *
 * CONSTRAINTS
 *   0 <= s.length <= 5 * 10^4
 *   s consists of English letters, digits, symbols and spaces.
 *
 * EXAMPLES
 *   lengthOfLongestSubstring("abcabcbb")  ->  3   // "abc"
 *   lengthOfLongestSubstring("bbbbb")     ->  1   // "b"
 *   lengthOfLongestSubstring("pwwkew")    ->  3   // "wke", not "pwke"
 *   lengthOfLongestSubstring("")          ->  0   // empty string
 *   lengthOfLongestSubstring(" ")         ->  1   // a space is a character
 *   lengthOfLongestSubstring("tmmzuxt")   ->  5   // "mzuxt"; never move the left edge backwards
 *
 * EDGE CASES
 *   - Empty string returns 0.
 *   - All characters identical.
 *   - A substring is contiguous — a subsequence is not.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — check every substring for uniqueness.
 *   Target: O(n) time, O(min(n, charset)) space — sliding window with a map of last-seen indices,
 *           jumping the left edge forward on a repeat.
 * ----------------------------------------------------------------------
 */

function lengthOfLongestSubstring(s) {
  // TODO: your solution here
}

module.exports = { lengthOfLongestSubstring };
