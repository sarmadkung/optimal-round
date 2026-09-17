/**
 * 098 — Longest Common Prefix
 * Difficulty: Easy   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Write a function to find the longest common prefix string among an array of strings.
 *   If there is no common prefix, return the empty string.
 *
 * CONSTRAINTS
 *   1 <= strs.length <= 200
 *   0 <= strs[i].length <= 200
 *   strs[i] consists of lowercase English letters.
 *
 * EXAMPLES
 *   longestCommonPrefix(["flower","flow","flight"])                    ->  "fl"
 *   longestCommonPrefix(["dog","racecar","car"])                       ->  ""
 *   longestCommonPrefix(["a"])                                         ->  "a"
 *   longestCommonPrefix(["ab","ab"])                                   ->  "ab"   // identical
 *   longestCommonPrefix(["ab",""])                                     ->  ""     // "" forces ""
 *   longestCommonPrefix(["interspecies","interstellar","interstate"])  ->  "inters"
 *
 * EDGE CASES
 *   - An empty string anywhere in the array forces an empty result.
 *   - A single string is its own prefix.
 *   - The prefix can never exceed the shortest string's length.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n * m) but wasteful — compare all strings fully before truncating.
 *   Target: O(total characters) time — scan character positions across all strings, stopping at
 *           the first mismatch or the shortest string's end.
 * ----------------------------------------------------------------------
 */

function longestCommonPrefix(strs) {
  // TODO: your solution here
}

module.exports = { longestCommonPrefix };
