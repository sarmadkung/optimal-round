/**
 * 163 — Ugly Number II
 * Difficulty: Medium   ·   Topic: Number Theory
 * ----------------------------------------------------------------------
 * PROBLEM
 *   An ugly number has no prime factors other than 2, 3 and 5.
 *   Given an integer `n`, return the nth ugly number (1-indexed). By convention 1 is ugly.
 *
 * CONSTRAINTS
 *   1 <= n <= 1690
 *
 * EXAMPLES
 *   nthUglyNumber(10)    ->  12  // 1,2,3,4,5,6,8,9,10,12
 *   nthUglyNumber(1)     ->  1   // 1 is the first ugly number
 *   nthUglyNumber(7)     ->  8
 *   nthUglyNumber(2)     ->  2
 *   nthUglyNumber(11)    ->  15  // 14 is skipped — it has the factor 7
 *   nthUglyNumber(1690)  ->  2123366400   // the largest n allowed
 *
 * EDGE CASES
 *   - 1 counts as the first ugly number.
 *   - Duplicates must be skipped: 6 arises as both 2*3 and 3*2.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Testing every integer for ugliness is far too slow as n grows.
 *
 * COMPLEXITY
 *   Naive:  O(n * k) time — check each integer in turn by dividing out 2s, 3s and 5s.
 *   Target: O(n) time, O(n) space — three pointers into the growing sequence, taking the minimum
 *           of (2*a, 3*b, 5*c) each step and advancing EVERY pointer that produced it.
 * ----------------------------------------------------------------------
 */

function nthUglyNumber(n) {
  // TODO: your solution here
}

module.exports = { nthUglyNumber };
