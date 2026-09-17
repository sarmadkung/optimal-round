/**
 * 008 — 3Sum
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]`
 *   with distinct indices such that they sum to zero.
 *   The solution set must not contain duplicate triplets.
 *
 * CONSTRAINTS
 *   3 <= nums.length <= 3000
 *   -10^5 <= nums[i] <= 10^5
 *
 * EXAMPLES
 *   threeSum([-1, 0, 1, 2, -1, -4])  ->  [[-1, -1, 2], [-1, 0, 1]]
 *   threeSum([0, 1, 1])              ->  []
 *   threeSum([0, 0, 0])              ->  [[0, 0, 0]]
 *   threeSum([1, 2, 3])              ->  []   // smallest input, no triplet sums to 0
 *   threeSum([-1, -1, 2, 2, 0, 0])   ->  [[-1, -1, 2]]   // duplicates collapse to one triplet
 *   threeSum([3, 0, -2, -1, 1, 2])   ->  [[-2, -1, 3], [-2, 0, 2], [-1, 0, 1]]   // order-agnostic
 *
 * EDGE CASES
 *   - Duplicate triplets must be filtered out — this is the hard part.
 *   - Fewer than three elements.
 *   - All zeros.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^3) time — three nested loops plus a de-duplication pass.
 *   Target: O(n^2) time, O(1) extra space — sort, then for each index run a two-pointer scan,
 *           skipping repeated values at every level.
 * ----------------------------------------------------------------------
 */

function threeSum(nums) {
  // TODO: your solution here
}

module.exports = { threeSum };
