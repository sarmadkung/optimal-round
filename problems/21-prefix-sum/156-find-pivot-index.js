/**
 * 156 — Find Pivot Index
 * Difficulty: Easy   ·   Topic: Prefix Sum
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums`, return the leftmost index where the sum of everything strictly
 *   to its left equals the sum of everything strictly to its right.
 *   Return -1 if no such index exists.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   -1000 <= nums[i] <= 1000
 *
 * EXAMPLES
 *   pivotIndex([1, 7, 3, 6, 5, 6])  ->  3
 *   pivotIndex([1, 2, 3])           ->  -1
 *   pivotIndex([2, 1, -1])          ->  0   // empty left side sums to 0
 *   pivotIndex([1])                 ->  0   // single element, both sides empty
 *   pivotIndex([-1, 1, 0])          ->  2   // the last index qualifies the same way
 *   pivotIndex([0, 0, 0])           ->  0   // every index qualifies — return the leftmost
 *
 * EDGE CASES
 *   - Index 0 is valid — the empty left side sums to 0.
 *   - The last index is valid the same way.
 *   - Return the LEFTMOST qualifying index.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — recompute both side sums at every index.
 *   Target: O(n) time, O(1) space — one pass with a running left sum, comparing it against (total
 *           - left - nums[i]).
 * ----------------------------------------------------------------------
 */

function pivotIndex(nums) {
  // TODO: your solution here
}

module.exports = { pivotIndex };
