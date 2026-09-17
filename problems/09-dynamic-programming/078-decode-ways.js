/**
 * 078 — Decode Ways
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A message of digits was encoded with 'A' -> "1" ... 'Z' -> "26".
 *   Given a string `s` of digits, return the number of ways to decode it.
 *   The answer fits in a 32-bit integer.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 100
 *   s contains only digits and may contain leading zeros.
 *
 * EXAMPLES
 *   numDecodings("12")     ->  2   // "AB" or "L"
 *   numDecodings("226")    ->  3   // "BZ", "VF", "BBF"
 *   numDecodings("06")     ->  0   // a leading zero is invalid
 *   numDecodings("0")      ->  0   // shortest undecodable input
 *   numDecodings("27")     ->  1   // only "BG" — 27 is out of range
 *   numDecodings("11106")  ->  2   // "AAJF" or "KJF"
 *
 * EDGE CASES
 *   - '0' alone is never decodable; only "10" and "20" are valid pairs containing it.
 *   - Two-digit codes must be between 10 and 26 inclusive.
 *   - A string starting with '0' decodes zero ways.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse on taking one or two digits without memoisation.
 *   Target: O(n) time, O(1) space — dp[i] = dp[i-1] (if the single digit is valid) + dp[i-2] (if
 *           the pair is 10..26).
 * ----------------------------------------------------------------------
 */

function numDecodings(s) {
  // TODO: your solution here
}

module.exports = { numDecodings };
