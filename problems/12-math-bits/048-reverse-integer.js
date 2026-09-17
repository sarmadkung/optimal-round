/**
 * 048 — Reverse Integer
 * Difficulty: Medium   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a signed 32-bit integer `x`, return x with its digits reversed.
 *   If reversing causes the value to fall outside [-2^31, 2^31 - 1], return 0.
 *
 * CONSTRAINTS
 *   -2^31 <= x <= 2^31 - 1
 *   You may not use 64-bit integers.
 *
 * EXAMPLES
 *   reverse(123)          ->  321
 *   reverse(-123)         ->  -321
 *   reverse(120)          ->  21   // trailing zeros vanish
 *   reverse(1534236469)   ->  0    // overflows
 *   reverse(0)            ->  0
 *   reverse(-2147483648)  ->  0    // -2^31 reversed overflows
 *
 * EDGE CASES
 *   - Trailing zeros disappear.
 *   - Negative numbers keep their sign.
 *   - Overflow must be detected BEFORE it happens, not after.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Reversing the string form and parsing it ignores the overflow requirement.
 *   Target: O(log x) time, O(1) space — pop digits with %10 and push with *10, checking against
 *           the 32-bit bound before each push.
 * ----------------------------------------------------------------------
 */

function reverse(x) {
  // TODO: your solution here
}

module.exports = { reverse };
