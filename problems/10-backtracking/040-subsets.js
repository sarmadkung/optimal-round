/**
 * 040 — Subsets
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` of unique elements, return all possible subsets
 *   (the power set). The solution must not contain duplicate subsets; any order is fine.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10
 *   -10 <= nums[i] <= 10
 *   All elements are unique.
 *
 * EXAMPLES
 *   subsets([1, 2, 3])     ->  [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
 *   subsets([0])           ->  [[], [0]]
 *   subsets([1, 2])        ->  [[], [1], [2], [1,2]]   // any order
 *   subsets([-1])          ->  [[], [-1]]   // one element still yields the empty subset
 *   subsets([-10, 10])     ->  [[], [-10], [10], [-10,10]]   // the value bounds
 *   subsets([1, 2, 3, 4])  ->  16 subsets   // exactly 2^n of them
 *
 * EDGE CASES
 *   - The empty subset is always included.
 *   - There are exactly 2^n subsets.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Push a COPY of the running path, not the mutable array itself.
 *
 * COMPLEXITY
 *   Naive:  There is no polynomial solution — the output alone is 2^n.
 *   Target: O(n * 2^n) time — backtracking (include/exclude at each index), or iterate the
 *           bitmask 0..2^n - 1.
 * ----------------------------------------------------------------------
 */

function subsets(nums) {
  // TODO: your solution here
}

module.exports = { subsets };
