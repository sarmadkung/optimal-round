/**
 * 080 — Longest Palindromic Substring
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, return the longest palindromic substring in it.
 *   If several are tied, any one of them is acceptable.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 1000
 *   s consists of digits and English letters.
 *
 * EXAMPLES
 *   longestPalindrome("babad")             ->  "bab"    // "aba" is also valid
 *   longestPalindrome("cbbd")              ->  "bb"
 *   longestPalindrome("a")                 ->  "a"
 *   longestPalindrome("ac")                ->  "a"      // any single char is acceptable
 *   longestPalindrome("aaaa")              ->  "aaaa"   // the whole string
 *   longestPalindrome("forgeeksskeegfor")  ->  "geeksskeeg"
 *
 * EDGE CASES
 *   - Single characters are palindromes.
 *   - No palindrome longer than 1 means returning any single character.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Both odd centers (aba) and even centers (abba) must be handled.
 *
 * COMPLEXITY
 *   Naive:  O(n^3) time — check every substring for palindromicity.
 *   Target: O(n^2) time, O(1) space — expand around each of the 2n - 1 possible centers.
 *           (Manacher's algorithm reaches O(n).)
 * ----------------------------------------------------------------------
 */

function longestPalindrome(s) {
  // TODO: your solution here
}

module.exports = { longestPalindrome };
