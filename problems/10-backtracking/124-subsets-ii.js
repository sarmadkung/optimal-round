/**
 * 124 — Subsets II
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` that MAY CONTAIN DUPLICATES, return all possible subsets
 *   without any duplicate subsets. Any order is acceptable.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10
 *   -10 <= nums[i] <= 10
 *
 * EXAMPLES
 *   subsetsWithDup([1, 2, 2])  ->  [[], [1], [1,2], [1,2,2], [2], [2,2]]
 *   subsetsWithDup([0])        ->  [[], [0]]
 *   subsetsWithDup([1, 1])     ->  [[], [1], [1,1]]   // 3 subsets, not 4
 *   subsetsWithDup([2, 1, 2])  ->  [[], [1], [1,2], [1,2,2], [2], [2,2]]   // unsorted input
 *   subsetsWithDup([1, 2])     ->  [[], [1], [1,2], [2]]   // no duplicates, so the full 2^n
 *   subsetsWithDup([0, 0, 0])  ->  [[], [0], [0,0], [0,0,0]]   // all equal, only n+1 subsets
 *
 * EDGE CASES
 *   - Duplicates in the input must not produce duplicate subsets.
 *   - The result count is below 2^n whenever duplicates exist.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Sort first so equal values sit adjacent and can be skipped.
 *
 * COMPLEXITY
 *   Naive:  Generating all 2^n subsets and de-duplicating via string keys works but wastes time
 *           and memory.
 *   Target: O(n * 2^n) time — sort, then backtrack skipping any value equal to its predecessor at
 *           the same recursion depth.
 * ----------------------------------------------------------------------
 */

function subsetsWithDup(nums) {
  // TODO: your solution here
}

module.exports = { subsetsWithDup };
