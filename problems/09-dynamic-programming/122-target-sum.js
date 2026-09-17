/**
 * 122 — Target Sum
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` and an integer `target`, put a '+' or '-' before each number and
 *   concatenate them into an expression. Return how many assignments evaluate to target.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 20
 *   0 <= nums[i] <= 1000
 *   -1000 <= target <= 1000
 *
 * EXAMPLES
 *   findTargetSumWays([1, 1, 1, 1, 1], 3)  ->  5
 *   findTargetSumWays([1], 1)              ->  1
 *   findTargetSumWays([1], 2)              ->  0
 *   findTargetSumWays([0], 0)              ->  2   // +0 and -0 are distinct
 *   findTargetSumWays([1, 2, 1], 0)        ->  2   // +1-2+1 and -1+2-1
 *   findTargetSumWays([1, 2, 3, 4], 11)    ->  0   // target beyond the total sum
 *
 * EDGE CASES
 *   - Zeros double the count — +0 and -0 are distinct assignments.
 *   - A target beyond the total sum is unreachable.
 *   - Every element must get a sign; none may be skipped.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — try both signs at every index without memoisation.
 *   Target: O(n * sum) time — memoise on (index, runningSum), or transform it into a subset-sum:
 *           find subsets totalling (sum + target) / 2.
 * ----------------------------------------------------------------------
 */

function findTargetSumWays(nums, target) {
  // TODO: your solution here
}

module.exports = { findTargetSumWays };
