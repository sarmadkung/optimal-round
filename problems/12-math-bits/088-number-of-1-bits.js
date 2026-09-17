/**
 * 088 — Number of 1 Bits
 * Difficulty: Easy   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Write a function that takes an unsigned integer and returns its Hamming weight:
 *   the number of 1 bits in its binary representation.
 *
 * CONSTRAINTS
 *   The input is a 32-bit unsigned integer.
 *
 * EXAMPLES
 *   hammingWeight(11)          ->  3    // 1011
 *   hammingWeight(128)         ->  1    // 10000000
 *   hammingWeight(4294967293)  ->  31
 *   hammingWeight(0)           ->  0    // no bits set
 *   hammingWeight(2147483648)  ->  1    // only the sign bit, 2^31
 *   hammingWeight(4294967295)  ->  32   // all 32 bits set
 *
 * EDGE CASES
 *   - Zero has weight 0.
 *   - In JS, bitwise operators coerce to a SIGNED 32-bit integer.
 *   - All-ones input gives 32.
 *
 * FOLLOW-UP
 *   - If this function is called many times, how would you optimize it?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Use the unsigned shift >>> so the sign bit does not propagate.
 *
 * COMPLEXITY
 *   Naive:  O(32) time — shift through all 32 positions regardless of how few bits are set.
 *   Target: O(number of set bits) time — n &= (n - 1) clears the lowest set bit each iteration,
 *           so the loop runs only as many times as there are 1s.
 * ----------------------------------------------------------------------
 */

function hammingWeight(n) {
  // TODO: your solution here
}

module.exports = { hammingWeight };
