/**
 * 161 — Sqrt(x)
 * Difficulty: Easy   ·   Topic: Number Theory
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a non-negative integer `x`, return the square root of x rounded DOWN to the
 *   nearest integer. You may not use any built-in exponent or square root function.
 *
 * CONSTRAINTS
 *   0 <= x <= 2^31 - 1
 *
 * EXAMPLES
 *   mySqrt(4)           ->  2
 *   mySqrt(8)           ->  2   // 2.828... truncated
 *   mySqrt(0)           ->  0
 *   mySqrt(1)           ->  1
 *   mySqrt(2)           ->  1   // 1.414... truncated
 *   mySqrt(2147395600)  ->  46340   // a perfect square near the upper bound
 *
 * EDGE CASES
 *   - x = 0 and x = 1 return themselves.
 *   - The result is TRUNCATED, never rounded up.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. mid * mid can overflow in fixed-width languages — compare with mid <= x / mid instead.
 *
 * COMPLEXITY
 *   Naive:  O(sqrt(x)) time — increment a counter until its square exceeds x.
 *   Target: O(log x) time — binary search over [0, x] for the largest integer whose square does
 *           not exceed x. (Newton's method converges even faster.)
 * ----------------------------------------------------------------------
 */

function mySqrt(x) {
  // TODO: your solution here
}

module.exports = { mySqrt };
