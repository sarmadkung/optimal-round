/**
 * 041 — Permutations
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` of distinct integers, return all possible permutations
 *   in any order.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 6
 *   -10 <= nums[i] <= 10
 *   All integers are distinct.
 *
 * EXAMPLES
 *   permute([1, 2, 3])     ->  [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *   permute([1])           ->  [[1]]
 *   permute([1, 2])        ->  [[1,2], [2,1]]   // any order
 *   permute([0, -1])       ->  [[0,-1], [-1,0]]   // negatives are fine
 *   permute([1, 2, 3, 4])  ->  24 permutations   // exactly n! of them
 *
 * EDGE CASES
 *   - A single element yields one permutation.
 *   - There are exactly n! results.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Undo your choice (backtrack) after each recursive call.
 *
 * COMPLEXITY
 *   Naive:  Generating candidates randomly until all n! are found is unbounded.
 *   Target: O(n * n!) time — backtracking with a used-set, or swapping elements in place.
 * ----------------------------------------------------------------------
 */

function permute(nums) {
  // TODO: your solution here
}

module.exports = { permute };
