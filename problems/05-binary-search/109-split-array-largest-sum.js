/**
 * 109 — Split Array Largest Sum
 * Difficulty: Hard   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` and an integer `k`, split the array into k non-empty contiguous
 *   subarrays so that the LARGEST subarray sum is as small as possible.
 *   Return that minimized largest sum.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 1000
 *   0 <= nums[i] <= 10^6
 *   1 <= k <= min(50, nums.length)
 *
 * EXAMPLES
 *   splitArray([7, 2, 5, 10, 8], 2)  ->  18  // [7,2,5] and [10,8]
 *   splitArray([1, 2, 3, 4, 5], 2)   ->  9   // [1,2,3,4] and [5]
 *   splitArray([1, 4, 4], 3)         ->  4   // k == length, so the answer is max(nums)
 *   splitArray([10], 1)              ->  10  // smallest possible input
 *   splitArray([1, 2, 3, 4, 5], 1)   ->  15  // k = 1, so the answer is the total sum
 *   splitArray([1, 4, 4], 2)         ->  5   // [1,4] and [4]
 *
 * EDGE CASES
 *   - k equal to the array length makes the answer the maximum element.
 *   - k = 1 makes the answer the total sum.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The answer always lies between max(nums) and sum(nums).
 *
 * COMPLEXITY
 *   Naive:  O(n^k) time — try every possible set of split points.
 *   Target: O(n log(sum)) time — binary search the ANSWER: for a candidate cap, greedily count
 *           how many subarrays it needs, and shrink or grow the cap accordingly.
 * ----------------------------------------------------------------------
 */

function splitArray(nums, k) {
  // TODO: your solution here
}

module.exports = { splitArray };
