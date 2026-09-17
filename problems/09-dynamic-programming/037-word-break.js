/**
 * 037 — Word Break
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s` and a dictionary `wordDict`, return true if `s` can be segmented
 *   into a space-separated sequence of one or more dictionary words.
 *   Words may be reused.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 300
 *   1 <= wordDict.length <= 1000
 *   All dictionary words are unique and lowercase.
 *
 * EXAMPLES
 *   wordBreak("leetcode", ["leet", "code"])                    ->  true
 *   wordBreak("applepenapple", ["apple", "pen"])               ->  true    // reuse allowed
 *   wordBreak("catsandog", ["cats","dog","sand","and","cat"])  ->  false
 *   wordBreak("a", ["a"])                                      ->  true    // shortest possible input
 *   wordBreak("a", ["b"])                                      ->  false   // no word matches
 *   wordBreak("aaaaaaa", ["aaaa", "aaa"])                      ->  true    // 4 + 3
 *
 * EDGE CASES
 *   - Words may be reused any number of times.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Greedy longest-match fails: "catsandog" needs backtracking.
 *   2. Dictionary words longer than s can be skipped.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse on every split point without memoisation.
 *   Target: O(n^2 * m) time, O(n) space — dp[i] is true if some j < i has dp[j] true and s[j..i)
 *           is in the dictionary.
 * ----------------------------------------------------------------------
 */

function wordBreak(s, wordDict) {
  // TODO: your solution here
}

module.exports = { wordBreak };
