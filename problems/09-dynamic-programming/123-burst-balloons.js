/**
 * 123 — Burst Balloons
 * Difficulty: Hard   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Balloons hold coins in `nums`. Bursting balloon i earns nums[i-1] * nums[i] * nums[i+1]
 *   coins, where out-of-range neighbors count as 1, and its neighbors then become adjacent.
 *   Return the maximum coins obtainable by bursting all balloons.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 300
 *   0 <= nums[i] <= 100
 *
 * EXAMPLES
 *   maxCoins([3, 1, 5, 8])     ->  167
 *   maxCoins([1, 5])           ->  10
 *   maxCoins([5])              ->  5
 *   maxCoins([1, 2, 3])        ->  12   // burst 2, then 1, then 3
 *   maxCoins([0, 4, 0])        ->  4    // zero-value balloons earn nothing
 *   maxCoins([9, 76, 64, 21])  ->  116718
 *
 * EDGE CASES
 *   - A single balloon earns 1 * nums[0] * 1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Pad the array with 1s at both ends to remove the boundary special case.
 *   2. Think about which balloon is burst LAST in a range, not first — that is what makes the
 *      subproblems independent.
 *
 * COMPLEXITY
 *   Naive:  O(n!) time — try every bursting order.
 *   Target: O(n^3) time, O(n^2) space — interval DP over (left, right) ranges, choosing the last
 *           balloon burst inside each range.
 * ----------------------------------------------------------------------
 */

function maxCoins(nums) {
  // TODO: your solution here
}

module.exports = { maxCoins };
