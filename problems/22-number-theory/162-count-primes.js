/**
 * 162 — Count Primes
 * Difficulty: Medium   ·   Topic: Number Theory
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer `n`, return the number of prime numbers strictly less than n.
 *
 * CONSTRAINTS
 *   0 <= n <= 5 * 10^6
 *
 * EXAMPLES
 *   countPrimes(10)   ->  4   // 2, 3, 5, 7
 *   countPrimes(0)    ->  0
 *   countPrimes(2)    ->  0   // strictly less than n
 *   countPrimes(1)    ->  0
 *   countPrimes(3)    ->  1   // only 2
 *   countPrimes(100)  ->  25
 *
 * EDGE CASES
 *   - n = 0, 1 and 2 all return 0.
 *   - The bound is STRICT — n itself is never counted.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Start the sieve's inner loop at i * i, since smaller multiples are already marked.
 *
 * COMPLEXITY
 *   Naive:  O(n * sqrt(n)) time — test each number for primality by trial division. Too slow at n
 *           = 5 * 10^6.
 *   Target: O(n log log n) time, O(n) space — the Sieve of Eratosthenes, marking multiples of
 *           each prime starting from its square.
 * ----------------------------------------------------------------------
 */

function countPrimes(n) {
  // TODO: your solution here
}

module.exports = { countPrimes };
