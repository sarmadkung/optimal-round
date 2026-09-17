/**
 * 103 — Rotate Array
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums`, rotate it to the right by `k` steps, where k is non-negative.
 *   Solve it in place with O(1) extra space.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   -2^31 <= nums[i] <= 2^31 - 1
 *   0 <= k <= 10^5
 *
 * EXAMPLES
 *   rotate([1,2,3,4,5,6,7], k = 3)    ->  [5,6,7,1,2,3,4]
 *   rotate([-1, -100, 3, 99], k = 2)  ->  [3, 99, -1, -100]
 *   rotate([1, 2], k = 3)             ->  [2, 1]   // k exceeds the length
 *   rotate([1], k = 0)                ->  [1]   // single element, no rotation
 *   rotate([1, 2, 3, 4], k = 4)       ->  [1, 2, 3, 4]   // k === n is a full turn
 *   rotate([1, 2, 3, 4, 5], k = 7)    ->  [4, 5, 1, 2, 3]   // 7 % 5 === 2
 *
 * EDGE CASES
 *   - k may be larger than the array length.
 *   - k = 0 leaves the array untouched.
 *
 * FOLLOW-UP
 *   - An extra array is O(n) space and misses the target.
 *   - Could you do it in-place with O(1) extra space?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Reduce k with k %= n before doing any work.
 *
 * COMPLEXITY
 *   Naive:  O(n * k) time — rotate by one position, k times.
 *   Target: O(n) time, O(1) space — the triple reversal trick: reverse the whole array, then
 *           reverse the first k, then reverse the rest.
 * ----------------------------------------------------------------------
 */

function rotate(nums, k) {
  // array manipulation + reversal technique.
  // Rotate Array → Reversal Algorithm
   k = k % nums.length;

  function reverse(left, right) {
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  // Reverse entire array
  reverse(0, nums.length - 1);

  // Reverse first k elements
  reverse(0, k - 1);

  // Reverse remaining elements
  reverse(k, nums.length - 1);

}

module.exports = { rotate };
