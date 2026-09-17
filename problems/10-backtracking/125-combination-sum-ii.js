/**
 * 125 — Combination Sum II
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a collection `candidates` that may contain duplicates and a `target`, find all
 *   unique combinations summing to target. Each candidate may be used AT MOST ONCE.
 *
 * CONSTRAINTS
 *   1 <= candidates.length <= 100
 *   1 <= candidates[i] <= 50
 *   1 <= target <= 30
 *
 * EXAMPLES
 *   combinationSum2([10,1,2,7,6,1,5], 8)    ->  [[1,1,6], [1,2,5], [1,7], [2,6]]
 *   combinationSum2([2, 5, 2, 1, 2], 5)     ->  [[1,2,2], [5]]
 *   combinationSum2([1], 1)                 ->  [[1]]   // smallest input
 *   combinationSum2([2], 1)                 ->  []   // no combination reaches the target
 *   combinationSum2([1, 1, 1], 2)           ->  [[1,1]]   // one combination, not three
 *   combinationSum2([3, 1, 3, 5, 1, 1], 8)  ->  [[1,1,1,5], [1,1,3,3], [3,5]]
 *
 * EDGE CASES
 *   - Each element is usable once, but equal VALUES may legitimately appear twice (as [1,1,6]
 *     shows).
 *   - No solution returns an empty array.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Skipping duplicates at the same depth prevents duplicate combinations.
 *
 * COMPLEXITY
 *   Naive:  Enumerating all subsets and filtering by sum is O(2^n) with a costly de-duplication
 *           pass.
 *   Target: Backtracking on a sorted array: advance the index by one each level (single use) and
 *           skip a value equal to its predecessor within the same loop.
 * ----------------------------------------------------------------------
 */

function combinationSum2(candidates, target) {
  // TODO: your solution here
}

module.exports = { combinationSum2 };
