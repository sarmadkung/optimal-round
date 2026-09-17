/**
 * 159 — Continuous Subarray Sum
 * Difficulty: Medium   ·   Topic: Prefix Sum
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` and an integer `k`, return true if there is a contiguous
 *   subarray of length AT LEAST TWO whose sum is a multiple of k.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   0 <= nums[i] <= 10^9
 *   1 <= k <= 2^31 - 1
 *
 * EXAMPLES
 *   checkSubarraySum([23, 2, 4, 6, 7], 6)   ->  true   // [2, 4]
 *   checkSubarraySum([23, 2, 6, 4, 7], 13)  ->  false
 *   checkSubarraySum([1, 0], 2)             ->  false
 *   checkSubarraySum([0, 0], 1)             ->  true   // 0 is a multiple of every k
 *   checkSubarraySum([1, 2, 3], 5)          ->  true   // [2, 3]
 *   checkSubarraySum([5], 5)                ->  false  // one element, length must be >= 2
 *
 * EDGE CASES
 *   - The subarray must have length >= 2 — a single multiple of k does not count.
 *   - 0 is a multiple of every k, so [0, 0] returns true.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Store the first index of each remainder so the length check works.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — sum every subarray and test divisibility.
 *   Target: O(n) time, O(k) space — a map of prefix-sum REMAINDER to its earliest index; a
 *           repeated remainder at least two indices apart proves a valid subarray.
 * ----------------------------------------------------------------------
 */

function checkSubarraySum(nums, k) {
  // TODO: your solution here
}

module.exports = { checkSubarraySum };
