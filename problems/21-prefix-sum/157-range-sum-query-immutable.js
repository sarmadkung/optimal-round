/**
 * 157 — Range Sum Query - Immutable
 * Difficulty: Easy   ·   Topic: Prefix Sum
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, handle many queries asking for the sum of the elements
 *   between indices left and right inclusive. Implement the NumArray class with
 *   sumRange(left, right).
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   -10^5 <= nums[i] <= 10^5
 *   0 <= left <= right < nums.length
 *   At most 10^4 calls to sumRange.
 *
 * API
 *   new NumArray(nums)                initialize the object with the integer array nums
 *   sumRange(left, right)  -> number  return the sum of nums[left..right] inclusive
 *
 * EXAMPLES
 *   const na = new NumArray([-2, 0, 3, -5, 2, -1]);
 *   na.sumRange(0, 2)  ->  1
 *   na.sumRange(2, 5)  ->  -1
 *   na.sumRange(0, 5)  ->  -3   // the full range
 *   na.sumRange(3, 3)  ->  -5   // a single index
 *   na.sumRange(1, 1)  ->  0
 *   na.sumRange(4, 5)  ->  1
 *
 * EDGE CASES
 *   - left may equal right, giving a single element.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The array never changes, so preprocessing pays off across many queries.
 *   2. Prefix sums need an extra leading zero to avoid a special case at left = 0.
 *
 * COMPLEXITY
 *   Naive:  O(n) per query — sum the range each time. With 10^4 queries on 10^4 elements this is
 *           10^8 operations.
 *   Target: O(n) preprocessing, O(1) per query — a prefix-sum array where sumRange(l, r) =
 *           prefix[r + 1] - prefix[l].
 * ----------------------------------------------------------------------
 */

class NumArray {
  // TODO: your solution here
}

module.exports = { NumArray };
