/**
 * 035 — Longest Increasing Subsequence
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, return the length of the longest strictly increasing
 *   subsequence. A subsequence need not be contiguous.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 2500
 *   -10^4 <= nums[i] <= 10^4
 *
 * EXAMPLES
 *   lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])  ->  4   // [2,3,7,101]
 *   lengthOfLIS([0, 1, 0, 3, 2, 3])            ->  4
 *   lengthOfLIS([7, 7, 7, 7])                  ->  1   // strictly increasing
 *   lengthOfLIS([5])                           ->  1   // single element
 *   lengthOfLIS([5, 4, 3, 2, 1])               ->  1   // strictly decreasing
 *   lengthOfLIS([-2, -1, 0])                   ->  3   // negatives are allowed
 *
 * EDGE CASES
 *   - All elements equal — the answer is 1.
 *   - Strictly decreasing input — also 1.
 *   - Subsequence, not substring: elements may be skipped.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — enumerate every subsequence.
 *   Target: O(n^2) DP where dp[i] is the best LIS ending at i; O(n log n) with patience sorting
 *           plus binary search.
 * ----------------------------------------------------------------------
 */

function lengthOfLIS(nums) {
  // TODO: your solution here
}

module.exports = { lengthOfLIS };
