/**
 * 082 — Combination Sum
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of DISTINCT integers `candidates` and a `target`, return all unique
 *   combinations summing to target. Each candidate may be used unlimited times.
 *   Two combinations are the same if they contain the same numbers with the same counts.
 *
 * CONSTRAINTS
 *   1 <= candidates.length <= 30
 *   2 <= candidates[i] <= 40
 *   1 <= target <= 40
 *   All candidates are distinct.
 *
 * EXAMPLES
 *   combinationSum([2, 3, 6, 7], 7)  ->  [[2, 2, 3], [7]]
 *   combinationSum([2, 3, 5], 8)     ->  [[2,2,2,2], [2,3,3], [3,5]]
 *   combinationSum([2], 1)           ->  []
 *   combinationSum([2, 3, 5], 3)     ->  [[3]]   // one candidate, used once
 *   combinationSum([2], 6)           ->  [[2, 2, 2]]   // the only candidate, reused
 *   combinationSum([2, 4], 7)        ->  []   // even candidates never sum to an odd target
 *
 * EDGE CASES
 *   - Candidates may repeat within one combination.
 *   - [2,2,3] and [2,3,2] are the SAME combination.
 *   - No valid combination returns an empty array.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Pass a start index down the recursion so candidates are never revisited out of order.
 *
 * COMPLEXITY
 *   Naive:  Recursing over all candidates at every level generates permutations, then needs de-
 *           duplication.
 *   Target: Backtracking with a start index and a remaining target, pruning as soon as remaining
 *           goes negative.
 * ----------------------------------------------------------------------
 */

function combinationSum(candidates, target) {
  // TODO: your solution here
}

module.exports = { combinationSum };
