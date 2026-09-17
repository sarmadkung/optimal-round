/**
 * 132 — Multiply Strings
 * Difficulty: Medium   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two non-negative integers represented as strings, return their product, also as
 *   a string. You may not convert them to a built-in big-integer type directly.
 *
 * CONSTRAINTS
 *   1 <= num1.length, num2.length <= 200
 *   Both consist of digits only and have no leading zeros except "0" itself.
 *
 * EXAMPLES
 *   multiply("2", "3")      ->  "6"
 *   multiply("123", "456")  ->  "56088"
 *   multiply("0", "999")    ->  "0"
 *   multiply("0", "0")      ->  "0"
 *   multiply("25", "4")     ->  "100"      // trailing zeros stay
 *   multiply("999", "999")  ->  "998001"   // m + n digits exactly
 *
 * EDGE CASES
 *   - Either operand being "0" makes the product "0".
 *   - Leading zeros must be stripped from the result.
 *   - The product of an m- and an n-digit number has at most m + n digits.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Repeated string addition (adding num1 to itself num2 times) is astronomically slow.
 *   Target: O(m * n) time — schoolbook multiplication into an (m + n) digit array, where digit i
 *           of num1 and j of num2 land at position i + j + 1, then carry.
 * ----------------------------------------------------------------------
 */

function multiply(num1, num2) {
  // TODO: your solution here
}

module.exports = { multiply };
