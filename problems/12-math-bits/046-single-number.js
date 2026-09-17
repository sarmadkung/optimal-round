/**
 * 046 — Single Number
 * Difficulty: Easy   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a non-empty array where every element appears twice except for one, find that
 *   single element. Must run in O(n) time using O(1) extra space.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 3 * 10^4
 *   -3 * 10^4 <= nums[i] <= 3 * 10^4
 *   Every element appears twice except one.
 *   You must use only constant extra space.
 *
 * EXAMPLES
 *   singleNumber([2, 2, 1])        ->  1
 *   singleNumber([4, 1, 2, 1, 2])  ->  4
 *   singleNumber([1])              ->  1
 *   singleNumber([0, 1, 1])        ->  0    // the loner may be 0
 *   singleNumber([-1, -1, 3])      ->  3    // negatives pair off too
 *   singleNumber([5, -3, 5])       ->  -3   // the loner may be negative
 *
 * EDGE CASES
 *   - A single-element array.
 *   - Negative numbers.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time but O(n) space — count occurrences in a map.
 *   Target: O(n) time, O(1) space — XOR every element: pairs cancel to 0 and the loner survives.
 * ----------------------------------------------------------------------
 */

function singleNumber(nums) {
  // TODO: your solution here
}

module.exports = { singleNumber };
