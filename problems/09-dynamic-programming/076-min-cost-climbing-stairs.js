/**
 * 076 — Min Cost Climbing Stairs
 * Difficulty: Easy   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given an array `cost` where cost[i] is the price of stepping off step i.
 *   After paying you may climb 1 or 2 steps. You may start at index 0 or index 1.
 *   Return the minimum cost to reach the top (past the last step).
 *
 * CONSTRAINTS
 *   2 <= cost.length <= 1000
 *   0 <= cost[i] <= 999
 *
 * EXAMPLES
 *   minCostClimbingStairs([10, 15, 20])                 ->  15   // start at 1, pay 15, jump 2
 *   minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])  ->  6
 *   minCostClimbingStairs([0, 0])                       ->  0
 *   minCostClimbingStairs([5, 9])                       ->  5    // shortest input — start at 0, jump 2
 *   minCostClimbingStairs([2, 2, 2, 2])                 ->  4
 *   minCostClimbingStairs([1, 2, 3, 4, 5, 6])           ->  9    // 1 + 3 + 5, the last step unpaid
 *
 * EDGE CASES
 *   - You may start at index 0 OR index 1 — both are free to enter.
 *   - The goal is PAST the last step, not the last step itself.
 *   - The final step's cost is not always paid.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse over every sequence of 1- and 2-step moves.
 *   Target: O(n) time, O(1) space — dp[i] = cost[i] + min(dp[i-1], dp[i-2]), carried in two
 *           rolling variables.
 * ----------------------------------------------------------------------
 */

function minCostClimbingStairs(cost) {
  // TODO: your solution here
}

module.exports = { minCostClimbingStairs };
