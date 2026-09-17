/**
 * 127 — Reverse Bits
 * Difficulty: Easy   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Reverse the bits of a given 32-bit unsigned integer and return the result.
 *
 * CONSTRAINTS
 *   The input is a 32-bit unsigned integer.
 *
 * EXAMPLES
 *   reverseBits(43261596)    ->  964176192
 *   reverseBits(0)           ->  0
 *   reverseBits(4294967293)  ->  3221225471
 *   reverseBits(1)           ->  2147483648   // the lowest bit moves to the top
 *   reverseBits(2147483648)  ->  1            // and back again
 *   reverseBits(4294967295)  ->  4294967295   // all ones is its own reverse
 *
 * EDGE CASES
 *   - Leading zeros matter — always process exactly 32 bits.
 *   - In JS, bitwise operations are signed.
 *
 * FOLLOW-UP
 *   - Follow-up: how would you optimize for many repeated calls? (byte-level lookup table)
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Finish with >>> 0 to reinterpret the result as unsigned.
 *
 * COMPLEXITY
 *   Naive:  Converting to a binary string, reversing it, and parsing back works but allocates on
 *           every call.
 *   Target: O(32) time, O(1) space — shift the result left and push in the input's lowest bit, 32
 *           times.
 * ----------------------------------------------------------------------
 */

function reverseBits(n) {
  // TODO: your solution here
}

module.exports = { reverseBits };
