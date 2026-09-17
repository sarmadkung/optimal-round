/**
 * 060 — Next Greater Element I
 * Difficulty: Easy   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given two distinct-valued arrays where `nums1` is a subset of `nums2`.
 *   For each value in nums1, find the first element to its right in nums2 that is greater
 *   than it; if none exists, use -1. Return these answers in order.
 *
 * CONSTRAINTS
 *   1 <= nums1.length <= nums2.length <= 1000
 *   0 <= nums1[i], nums2[i] <= 10^4
 *   All integers are unique and every nums1[i] appears in nums2.
 *
 * EXAMPLES
 *   nextGreaterElement([4, 1, 2], [1, 3, 4, 2])  ->  [-1, 3, -1]
 *   nextGreaterElement([2, 4], [1, 2, 3, 4])     ->  [3, -1]
 *   nextGreaterElement([1], [1])                 ->  [-1]              // smallest possible input
 *   nextGreaterElement([1, 3], [1, 2, 3])        ->  [2, -1]           // first and last of nums2
 *   nextGreaterElement([3, 2, 1], [3, 2, 1])     ->  [-1, -1, -1]      // decreasing nums2
 *   nextGreaterElement([3, 1], [1, 2, 3, 4])     ->  [4, 2]            // output follows nums1 order
 *
 * EDGE CASES
 *   - The last element of nums2 never has a next greater element.
 *   - A strictly decreasing nums2 yields all -1.
 *   - 'Greater' is strict — an equal value does not count.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n * m) time — for each value, locate it in nums2 and scan rightwards.
 *   Target: O(n + m) time — one monotonically decreasing stack pass over nums2, recording each
 *           value's next greater in a map.
 * ----------------------------------------------------------------------
 */

function nextGreaterElement(nums1, nums2) {
  // TODO: your solution here
}

module.exports = { nextGreaterElement };
