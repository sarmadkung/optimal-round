/**
 * 017 — Binary Search
 * Difficulty: Easy   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a sorted array of distinct integers `nums` and an integer `target`, return
 *   the index of `target`, or -1 if it is absent. Must run in O(log n) time.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   nums is sorted in ascending order and all values are distinct.
 *   -10^4 < nums[i], target < 10^4
 *
 * EXAMPLES
 *   search([-1, 0, 3, 5, 9, 12], 9)  ->  4
 *   search([-1, 0, 3, 5, 9, 12], 2)  ->  -1
 *   search([5], 5)                   ->  0   // single element
 *   search([5], -5)                  ->  -1  // single element, absent
 *   search([-1, 0, 3, 5, 9, 12], -1) ->  0   // first index
 *   search([-1, 0, 3, 5, 9, 12], 12) ->  5   // last index
 *
 * EDGE CASES
 *   - Target smaller than every element, or larger than every element.
 *   - Single-element array.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Compute the midpoint as low + ((high - low) >> 1) to avoid overflow in fixed-width
 *      languages.
 *
 * COMPLEXITY
 *   Naive:  O(n) time — a linear scan. Correct, but violates the required complexity.
 *   Target: O(log n) time, O(1) space — halve the search interval each step.
 * ----------------------------------------------------------------------
 */

function search(nums, target) {
  // TODO: your solution here
}

module.exports = { search };
