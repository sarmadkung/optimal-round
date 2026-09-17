/**
 * 036 — House Robber
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Houses in a row each hold some money. You cannot rob two adjacent houses.
 *   Given `nums`, return the maximum amount you can rob tonight.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 100
 *   0 <= nums[i] <= 400
 *
 * EXAMPLES
 *   rob([1, 2, 3, 1])     ->  4    // houses 0 and 2
 *   rob([2, 7, 9, 3, 1])  ->  12   // houses 0, 2 and 4
 *   rob([5])              ->  5
 *   rob([2, 1])           ->  2    // two houses — take the larger
 *   rob([2, 1, 1, 2])     ->  4    // houses 0 and 3, not alternating
 *   rob([0, 0, 0])        ->  0    // all houses empty
 *
 * EDGE CASES
 *   - A single house.
 *   - Two houses — take the larger.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Alternating houses is not always optimal: [2,1,1,2] gives 4.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — try every subset and reject adjacent picks.
 *   Target: O(n) time, O(1) space — dp[i] = max(dp[i-1], dp[i-2] + nums[i]), kept in two rolling
 *           variables.
 * ----------------------------------------------------------------------
 */

function rob(nums) {
  // TODO: your solution here
}

module.exports = { rob };
