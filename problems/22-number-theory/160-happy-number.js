/**
 * 160 — Happy Number
 * Difficulty: Easy   ·   Topic: Number Theory
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A happy number is defined by repeatedly replacing the number with the sum of the
 *   squares of its digits; it is happy if this reaches 1.
 *   Given `n`, return true if it is happy.
 *
 * CONSTRAINTS
 *   1 <= n <= 2^31 - 1
 *
 * EXAMPLES
 *   isHappy(19)  ->  true   // 82, 68, 100, 1
 *   isHappy(2)   ->  false  // enters a cycle
 *   isHappy(1)   ->  true
 *   isHappy(7)   ->  true   // 49, 97, 130, 10, 1
 *   isHappy(4)   ->  false  // the 4, 16, 37, 58, 89, 145, 42, 20 cycle
 *   isHappy(10)  ->  true   // straight to 1
 *
 * EDGE CASES
 *   - Unhappy numbers always fall into a CYCLE — you must detect it or loop forever.
 *   - 1 is happy by definition.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The digit-square sum shrinks quickly, so the values stay small.
 *
 * COMPLEXITY
 *   Naive:  Looping without cycle detection never terminates for an unhappy number.
 *   Target: O(log n) time, O(1) space — Floyd's cycle detection with a slow and a fast digit-
 *           square-sum pointer. A visited Set is simpler but O(log n) space.
 * ----------------------------------------------------------------------
 */

function isHappy(n) {
  // TODO: your solution here
}

module.exports = { isHappy };
