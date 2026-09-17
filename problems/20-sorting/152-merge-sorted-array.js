/**
 * 152 — Merge Sorted Array
 * Difficulty: Easy   ·   Topic: Sorting
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given two sorted arrays `nums1` (with m real values followed by n zeroes as
 *   spare room) and `nums2` (with n values).
 *   Merge nums2 into nums1 IN PLACE so nums1 ends up sorted.
 *
 * CONSTRAINTS
 *   nums1.length == m + n, nums2.length == n
 *   0 <= m, n <= 200
 *   -10^9 <= nums1[i], nums2[j] <= 10^9
 *
 * EXAMPLES
 *   merge([1,2,3,0,0,0], 3, [2,5,6], 3)  ->  [1,2,2,3,5,6]
 *   merge([1], 1, [], 0)                 ->  [1]
 *   merge([0], 0, [1], 1)                ->  [1]   // nums1 has no real values
 *   merge([4,5,6,0,0,0], 3, [1,2,3], 3)  ->  [1,2,3,4,5,6]   // all of nums2 sorts first
 *   merge([1,2,2,0], 3, [2], 1)          ->  [1,2,2,2]   // duplicates across both arrays
 *   merge([-1,3,0,0], 2, [-2,0], 2)      ->  [-2,-1,0,3]   // negatives, and a real 0 in nums2
 *
 * EDGE CASES
 *   - m = 0 means nums1 holds only spare room.
 *   - n = 0 leaves nums1 unchanged.
 *
 * FOLLOW-UP
 *   - Can you come up with an algorithm that runs in O(m + n) time?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Merging forwards overwrites values you have not read yet.
 *
 * COMPLEXITY
 *   Naive:  O((m + n) log(m + n)) time — concatenate then sort, throwing away the sorted
 *           structure.
 *   Target: O(m + n) time, O(1) space — fill from the BACK, comparing the tails of both arrays,
 *           so no unread value is ever overwritten.
 * ----------------------------------------------------------------------
 */

function merge(nums1, m, nums2, n) {
  // TODO: your solution here
}

module.exports = { merge };
