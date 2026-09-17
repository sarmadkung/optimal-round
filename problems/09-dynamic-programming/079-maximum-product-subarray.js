/**
 * 079 — Maximum Product Subarray
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, find the contiguous subarray with the largest product
 *   and return that product.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 2 * 10^4
 *   -10 <= nums[i] <= 10
 *   Every prefix or suffix product fits in a 32-bit integer.
 *
 * EXAMPLES
 *   maxProduct([2, 3, -2, 4])     ->  6     // [2,3]
 *   maxProduct([-2, 0, -1])       ->  0
 *   maxProduct([-2, 3, -4])       ->  24    // two negatives make a positive
 *   maxProduct([-3])              ->  -3    // single negative element
 *   maxProduct([-1, -2, -9, -6])  ->  108   // all four multiplied
 *   maxProduct([0, -3, 0, 2, 2])  ->  4     // [2,2]; zeros reset the run
 *
 * EDGE CASES
 *   - Zeros reset the running product.
 *   - A single negative element is its own answer.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Two negatives multiply to a positive — you must track the MINIMUM too.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — multiply out every subarray.
 *   Target: O(n) time, O(1) space — Kadane's variant carrying both the running max and min,
 *           swapping them on a negative value.
 * ----------------------------------------------------------------------
 */

function maxProduct(nums) {
  // TODO: your solution here
}

module.exports = { maxProduct };
