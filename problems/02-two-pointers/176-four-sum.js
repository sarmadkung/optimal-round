/**
 * 176 — 4Sum
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` of n integers, return all UNIQUE quadruplets
 *   [nums[a], nums[b], nums[c], nums[d]] with distinct indices a, b, c, d whose sum equals
 *   `target`. The quadruplets and the numbers inside them may be in any order.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 200
 *   -10^9 <= nums[i] <= 10^9
 *   -10^9 <= target <= 10^9
 *
 * EXAMPLES
 *   fourSum([1, 0, -1, 0, -2, 2], 0)   ->  [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
 *   fourSum([2, 2, 2, 2, 2], 8)        ->  [[2, 2, 2, 2]]
 *   fourSum([1, 2, 3], 6)              ->  []   // fewer than four elements
 *   fourSum([0, 0, 0, 0], 0)           ->  [[0, 0, 0, 0]]   // exactly four, all zero
 *   fourSum([-3, -1, 0, 2, 4, 5], 2)   ->  [[-3, -1, 2, 4]]   // negatives, one quadruplet
 *   fourSum([1, 1, 1, 1, 2, 2, 2], 6)  ->  [[1, 1, 2, 2]]   // heavy duplicates, still one result
 *
 * EDGE CASES
 *   - Fewer than four elements returns [].
 *   - Heavy duplicates must not produce repeated quadruplets.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. 008 3Sum with one more outer loop. Skip duplicates at every level.
 *
 * COMPLEXITY
 *   Naive:  O(n^4) time — every quadruple, deduplicated with a Set of sorted keys.
 *   Target: O(n^3) time, O(1) extra space — sort; two nested loops fix a and b, then two
 *           pointers find c and d, skipping equal neighbours.
 * ----------------------------------------------------------------------
 */

function fourSum(nums, target) {
  // TODO: your solution here
}

module.exports = { fourSum };
