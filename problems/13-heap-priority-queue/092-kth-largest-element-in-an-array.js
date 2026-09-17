/**
 * 092 — Kth Largest Element in an Array
 * Difficulty: Medium   ·   Topic: Heap / Priority Queue
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` and an integer `k`, return the kth largest element.
 *   This is the kth largest in sorted ORDER, not the kth distinct element.
 *
 * CONSTRAINTS
 *   1 <= k <= nums.length <= 10^5
 *   -10^4 <= nums[i] <= 10^4
 *
 * EXAMPLES
 *   findKthLargest([3, 2, 1, 5, 6, 4], 2)           ->  5
 *   findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)  ->  4
 *   findKthLargest([1], 1)                          ->  1
 *   findKthLargest([3, 2, 1, 5, 6, 4], 6)           ->  1    // k = n is the minimum
 *   findKthLargest([2, 2, 2], 2)                    ->  2    // duplicates count separately
 *   findKthLargest([-1, -5, -3], 1)                 ->  -1   // negatives are allowed
 *
 * EDGE CASES
 *   - Duplicates count separately — this is positional, not distinct.
 *   - k = 1 is the maximum; k = n is the minimum.
 *
 * FOLLOW-UP
 *   - Sorting works but is not the intended complexity.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — sort descending and index k - 1.
 *   Target: O(n log k) with a size-k min-heap, or O(n) average with Quickselect (partition and
 *           recurse into one side only).
 * ----------------------------------------------------------------------
 */

function findKthLargest(nums, k) {
  // TODO: your solution here
}

module.exports = { findKthLargest };
