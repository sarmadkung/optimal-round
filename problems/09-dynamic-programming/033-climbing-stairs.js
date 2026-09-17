/**
 * 033 — Climbing Stairs
 * Difficulty: Easy   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are climbing a staircase of `n` steps. Each move you may climb 1 or 2 steps.
 *   Return how many distinct ways you can reach the top.
 *
 * CONSTRAINTS
 *   1 <= n <= 45
 *
 * EXAMPLES
 *   climbStairs(2)   ->  2   // 1+1, 2
 *   climbStairs(3)   ->  3   // 1+1+1, 1+2, 2+1
 *   climbStairs(1)   ->  1
 *   climbStairs(4)   ->  5
 *   climbStairs(5)   ->  8
 *   climbStairs(10)  ->  89
 *
 * EDGE CASES
 *   - n = 1 and n = 2 are the base cases.
 *   - Order matters: 1+2 and 2+1 are different ways.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. This is the Fibonacci sequence in disguise.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse over every possible move sequence.
 *   Target: O(n) time, O(1) space — ways(n) = ways(n-1) + ways(n-2), carried in two rolling
 *           variables.
 * ----------------------------------------------------------------------
 */

function climbStairs(n) {
  // TODO: your solution here
}

module.exports = { climbStairs };
