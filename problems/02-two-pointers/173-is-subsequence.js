/**
 * 173 — Is Subsequence
 * Difficulty: Easy   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two strings `s` and `t`, return true if `s` is a subsequence of `t`: it can be formed
 *   by deleting some (possibly zero) characters of `t` without changing the order of the rest.
 *
 * CONSTRAINTS
 *   0 <= s.length <= 100
 *   0 <= t.length <= 10^4
 *   s and t consist only of lowercase English letters.
 *
 * EXAMPLES
 *   isSubsequence("abc", "ahbgdc")  ->  true
 *   isSubsequence("axc", "ahbgdc")  ->  false
 *   isSubsequence("", "abc")        ->  true   // the empty string is a subsequence of anything
 *
 * EDGE CASES
 *   - s longer than t can never match.
 *   - Order matters: "ba" is not a subsequence of "abc".
 *
 * FOLLOW-UP
 *   - If there are many incoming s strings (say 10^9) against the same t, how would you change
 *     your approach?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Greedily match each character of s to its earliest possible position in t.
 *
 * COMPLEXITY
 *   Naive:  Exponential — generate subsequences of t and compare.
 *   Target: O(|t|) time, O(1) space — one pointer in each string; advance the s pointer only on
 *           a match. (Follow-up: per-letter index lists of t plus binary search.)
 * ----------------------------------------------------------------------
 */

function isSubsequence(s, t) {
  if(s===""){
    return true;
  }
  if(t===""){
    return false;
  }

  let sIndex = 0;
  let tIndex = 0;

  while(sIndex<s.length && tIndex<t.length){
    if(t[tIndex]===s[sIndex]){
      sIndex++;
    }
    tIndex++;
  }
  return sIndex === s.length;
}

module.exports = { isSubsequence };
