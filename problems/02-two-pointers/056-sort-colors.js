/**
 * 056 — Sort Colors
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` with n objects colored 0 (red), 1 (white) or 2 (blue), sort
 *   them IN PLACE so equal colors are adjacent in the order 0, 1, 2.
 *   You may not use a library sort, and should do it in one pass.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 300
 *   nums[i] is 0, 1 or 2.
 *
 * EXAMPLES
 *   sortColors([2, 0, 2, 1, 1, 0])  ->  [0, 0, 1, 1, 2, 2]
 *   sortColors([2, 0, 1])           ->  [0, 1, 2]
 *   sortColors([0])                 ->  [0]
 *   sortColors([1, 1, 1])           ->  [1, 1, 1]   // a single colour
 *   sortColors([0, 1, 2])           ->  [0, 1, 2]   // already sorted
 *   sortColors([2, 2, 1, 1, 0, 0])  ->  [0, 0, 1, 1, 2, 2]   // exactly reversed
 *
 * EDGE CASES
 *   - An array of a single color.
 *   - Already-sorted input.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. After swapping a 2 into place, do NOT advance the cursor — recheck the new value.
 *
 * COMPLEXITY
 *   Naive:  O(n) two-pass counting sort — count each color, then overwrite. Correct, but two
 *           passes.
 *   Target: O(n) time, O(1) space, one pass — the Dutch National Flag algorithm with low/mid/high
 *           pointers.
 * ----------------------------------------------------------------------
 */

function sortColors(nums) {
  // TODO: your solution here
}

module.exports = { sortColors };
