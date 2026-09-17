/**
 * 089 — Missing Number
 * Difficulty: Easy   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` containing n distinct numbers drawn from the range [0, n],
 *   return the one number in that range that is missing.
 *   Aim for O(n) time and O(1) extra space.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 10^4
 *   0 <= nums[i] <= n
 *   All values are unique.
 *
 * EXAMPLES
 *   missingNumber([3, 0, 1])            ->  2
 *   missingNumber([0, 1])               ->  2   // the missing one can be n itself
 *   missingNumber([9,6,4,2,3,5,7,0,1])  ->  8
 *   missingNumber([0])                  ->  1   // n = 1, the top of the range is gone
 *   missingNumber([1])                  ->  0   // n = 1, 0 is the one missing
 *   missingNumber([2, 0])               ->  1   // missing from the middle
 *
 * EDGE CASES
 *   - The missing value may be 0 or n, at either end of the range.
 *
 * FOLLOW-UP
 *   - A Set solution is O(n) space and misses the target.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Sorting is O(n log n).
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — sort and find the first index-value mismatch.
 *   Target: O(n) time, O(1) space — either XOR all indices with all values, or subtract the array
 *           sum from n(n+1)/2.
 * ----------------------------------------------------------------------
 */

function missingNumber(nums) {
  // TODO: your solution here
}

module.exports = { missingNumber };
