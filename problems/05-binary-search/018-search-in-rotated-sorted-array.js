/**
 * 018 — Search in Rotated Sorted Array
 * Difficulty: Medium   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   An ascending sorted array of distinct integers was rotated at some unknown pivot.
 *   Given the rotated array `nums` and an integer `target`, return its index or -1.
 *   Must run in O(log n) time.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 5000
 *   -10^4 <= nums[i] <= 10^4
 *   All values are distinct; nums is a rotation of a sorted array.
 *
 * EXAMPLES
 *   search([4, 5, 6, 7, 0, 1, 2], 0)  ->  4
 *   search([4, 5, 6, 7, 0, 1, 2], 3)  ->  -1
 *   search([1], 0)                    ->  -1  // single element, absent
 *   search([4, 5, 6, 7, 0, 1, 2], 4)  ->  0   // first index
 *   search([4, 5, 6, 7, 0, 1, 2], 2)  ->  6   // last index
 *   search([1, 2, 3, 4, 5], 5)        ->  4   // zero rotation
 *
 * EDGE CASES
 *   - Rotation of zero — the array is plainly sorted.
 *   - Target at the pivot itself.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. One half is always sorted; identify which before deciding where to recurse.
 *
 * COMPLEXITY
 *   Naive:  O(n) time — a linear scan, which ignores the sorted structure.
 *   Target: O(log n) time — modified binary search: determine the sorted half, then test whether
 *           the target lies inside it.
 * ----------------------------------------------------------------------
 */

function search(nums, target) {
  // TODO: your solution here
}

module.exports = { search };
