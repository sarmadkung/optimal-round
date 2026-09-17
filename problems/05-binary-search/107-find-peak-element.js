/**
 * 107 — Find Peak Element
 * Difficulty: Medium   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A peak element is strictly greater than its neighbors. Given an array `nums`, return
 *   the index of ANY peak. You may imagine nums[-1] and nums[n] as negative infinity.
 *   Must run in O(log n) time.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 1000
 *   -2^31 <= nums[i] <= 2^31 - 1
 *   nums[i] != nums[i + 1] for all valid i.
 *
 * EXAMPLES
 *   findPeakElement([1, 2, 3, 1])          ->  2
 *   findPeakElement([1, 2, 1, 3, 5, 6, 4]) ->  1 or 5  // either is accepted
 *   findPeakElement([1])                   ->  0       // single element
 *   findPeakElement([2, 1])                ->  0       // the first element can be a peak
 *   findPeakElement([1, 2])                ->  1       // the last element can be a peak
 *   findPeakElement([1, 3, 2, 4])          ->  1 or 3  // any peak index is accepted
 *
 * EDGE CASES
 *   - A single element is a peak.
 *   - The first or last element can be a peak, thanks to the -infinity boundary.
 *   - Adjacent elements are never equal.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. No two adjacent elements being equal is what makes binary search valid here: one side
 *      always rises.
 *
 * COMPLEXITY
 *   Naive:  O(n) time — scan for a value greater than both neighbors. Correct, but misses the
 *           target.
 *   Target: O(log n) time — binary search: if nums[mid] < nums[mid + 1] a peak lies to the right,
 *           otherwise mid itself or something to its left is one.
 * ----------------------------------------------------------------------
 */

function findPeakElement(nums) {
  // TODO: your solution here
}

module.exports = { findPeakElement };
