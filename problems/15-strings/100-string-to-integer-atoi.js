/**
 * 100 — String to Integer (atoi)
 * Difficulty: Medium   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Implement atoi: skip leading whitespace, read an optional '+' or '-' sign, then read
 *   as many digits as possible and stop at the first non-digit.
 *   Clamp the result to the 32-bit signed range [-2^31, 2^31 - 1]. Return 0 if no digits.
 *
 * CONSTRAINTS
 *   0 <= s.length <= 200
 *   s consists of letters, digits, ' ', '+', '-' and '.'.
 *
 * EXAMPLES
 *   myAtoi("42")               ->  42
 *   myAtoi("   -42")           ->  -42
 *   myAtoi("4193 with words")  ->  4193
 *   myAtoi("words and 987")    ->  0      // stops at the first non-digit
 *   myAtoi("")                 ->  0      // no digits at all
 *   myAtoi("-91283472332")     ->  -2147483648   // clamped to -2^31
 *
 * EDGE CASES
 *   - Only LEADING whitespace is skipped; whitespace after digits ends the number.
 *   - At most one sign character, and it must come before the digits.
 *   - Out-of-range values clamp to the 32-bit bound rather than wrapping.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  parseInt gets most cases right but does not clamp to the 32-bit range.
 *   Target: O(n) time, O(1) space — a small state machine: whitespace, then sign, then digits,
 *           clamping as you accumulate.
 * ----------------------------------------------------------------------
 */

function myAtoi(s) {
  // TODO: your solution here
}

module.exports = { myAtoi };
