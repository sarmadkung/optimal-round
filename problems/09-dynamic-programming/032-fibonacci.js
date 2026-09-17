/**
 * 032 — Fibonacci Number
 * Difficulty: Easy   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   The Fibonacci sequence is F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.
 *   Given `n`, return F(n).
 *
 * CONSTRAINTS
 *   0 <= n <= 90  (beyond 78 the result exceeds Number.MAX_SAFE_INTEGER)
 *
 * EXAMPLES
 *   fib(2)   ->  1
 *   fib(10)  ->  55
 *   fib(0)   ->  0
 *   fib(1)   ->  1
 *   fib(3)   ->  2
 *   fib(50)  ->  12586269025   // still exact in a double
 *
 * EDGE CASES
 *   - n = 0 and n = 1 are the base cases.
 *   - Large n loses precision in 64-bit floats.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Use BigInt if you need exact values for large n.
 *   2. Deep naive recursion can blow the stack.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — plain recursion, recomputing the same subproblems exponentially. Try
 *           fib(45) and watch it hang.
 *   Target: O(n) time, O(1) space — iterate keeping only the last two values. (O(log n) is
 *           possible via matrix exponentiation.)
 * ----------------------------------------------------------------------
 */

function fib(n) {
  // TODO: your solution here
}

module.exports = { fib };
