/**
 * 059 — Sliding Window Maximum
 * Difficulty: Hard   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` and a window size `k`, the window slides one position at a
 *   time from left to right. Return an array of the maximum in each window position.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   -10^4 <= nums[i] <= 10^4
 *   1 <= k <= nums.length
 *
 * EXAMPLES
 *   maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)         ->  [3, 3, 5, 5, 6, 7]
 *   maxSlidingWindow([1], 1)                         ->  [1]
 *   maxSlidingWindow([1, -1], 1)                     ->  [1, -1]
 *   maxSlidingWindow([1,3,-1,-3,5,3,6,7], 8)         ->  [7]   // k = n gives one value
 *   maxSlidingWindow([2, 2, 2, 2], 2)                ->  [2, 2, 2]   // all same; n - k + 1 = 3 entries
 *   maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)  ->  [7, 7, 7, 7, 7]   // negatives, and a tie between equal maxima
 *
 * EDGE CASES
 *   - k = 1 returns the array unchanged.
 *   - k equal to the array length gives a single value.
 *   - The result has exactly n - k + 1 entries.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n * k) time — rescan each window for its maximum. With n = 10^5 this times out.
 *   Target: O(n) time, O(k) space — a monotonically decreasing deque of indices; the front is
 *           always the current window's maximum.
 * ----------------------------------------------------------------------
 */

function maxSlidingWindow(nums, k) {
  // TODO: your solution here
}

module.exports = { maxSlidingWindow };
