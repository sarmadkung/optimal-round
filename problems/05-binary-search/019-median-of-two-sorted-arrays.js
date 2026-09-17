/**
 * 019 — Median of Two Sorted Arrays
 * Difficulty: Hard   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two sorted arrays `nums1` and `nums2` of sizes m and n, return the median of
 *   the combined sorted array. The overall run time must be O(log(m + n)).
 *
 * CONSTRAINTS
 *   0 <= m, n <= 1000
 *   1 <= m + n <= 2000
 *   -10^6 <= nums1[i], nums2[i] <= 10^6
 *
 * EXAMPLES
 *   findMedianSortedArrays([1, 3], [2])     ->  2.0
 *   findMedianSortedArrays([1, 2], [3, 4])  ->  2.5  // (2 + 3) / 2
 *   findMedianSortedArrays([], [1])         ->  1.0  // nums1 empty
 *   findMedianSortedArrays([1, 2, 3], [])   ->  2.0  // nums2 empty
 *   findMedianSortedArrays([1, 3], [2, 7])  ->  2.5  // interleaved, even total length
 *   findMedianSortedArrays([0, 0], [0, 0])  ->  0.0  // duplicates
 *
 * EDGE CASES
 *   - Either array may be empty.
 *   - Even total length averages the two middle values.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Always binary-search the SHORTER array to keep the index math in range.
 *
 * COMPLEXITY
 *   Naive:  O(m + n) time — merge both arrays and index the middle. Fails the required
 *           complexity.
 *   Target: O(log(min(m, n))) time, O(1) space — binary search for the partition where every left
 *           element <= every right element.
 * ----------------------------------------------------------------------
 */

function findMedianSortedArrays(nums1, nums2) {
  // TODO: your solution here
}

module.exports = { findMedianSortedArrays };
