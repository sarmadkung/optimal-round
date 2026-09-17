/**
 * 064 — Find Minimum in Rotated Sorted Array
 * Difficulty: Medium   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   An ascending sorted array of unique elements was rotated an unknown number of times.
 *   Return its minimum element in O(log n) time.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 5000
 *   -5000 <= nums[i] <= 5000
 *   All values are unique; nums is a rotation of a sorted array.
 *
 * EXAMPLES
 *   findMin([3, 4, 5, 1, 2])        ->  1
 *   findMin([4, 5, 6, 7, 0, 1, 2])  ->  0
 *   findMin([11, 13, 15, 17])       ->  11  // zero rotation
 *   findMin([1])                    ->  1   // single element
 *   findMin([2, 1])                 ->  1   // smallest rotated case
 *   findMin([-3, -2, -1])           ->  -3  // negatives, zero rotation
 *
 * EDGE CASES
 *   - A rotation of zero — the minimum is the first element.
 *   - A single element.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Compare mid against the RIGHT end, not the left, to decide which half to keep.
 *
 * COMPLEXITY
 *   Naive:  O(n) time — a linear scan, ignoring the sorted structure.
 *   Target: O(log n) time, O(1) space — binary search: if nums[mid] > nums[high] the minimum is
 *           to the right, otherwise mid may be it.
 * ----------------------------------------------------------------------
 */

function findMin(nums) {
  // TODO: your solution here
}

module.exports = { findMin };
