/**
 * 102 — Move Zeroes
 * Difficulty: Easy   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums`, move all zeroes to the end while keeping the relative order of
 *   the non-zero elements. You must do this IN PLACE without copying the array.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   -2^31 <= nums[i] <= 2^31 - 1
 *   You must do it in place, without making a copy of the array.
 *
 * EXAMPLES
 *   moveZeroes([0, 1, 0, 3, 12])    ->  [1, 3, 12, 0, 0]
 *   moveZeroes([0])                 ->  [0]   // single element
 *   moveZeroes([1, 2])              ->  [1, 2]   // already done
 *   moveZeroes([0, 0, 0])           ->  [0, 0, 0]   // all zeroes
 *   moveZeroes([0, -1, 0, 5])       ->  [-1, 5, 0, 0]   // negatives are not zeroes
 *   moveZeroes([1, 0, 2, 0, 0, 3])  ->  [1, 2, 3, 0, 0, 0]   // relative order of 1,2,3 preserved
 *
 * EDGE CASES
 *   - An array of all zeroes, or with no zeroes.
 *   - The order of the non-zero elements must be preserved.
 *
 * FOLLOW-UP
 *   - Could you minimize the total number of operations done?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — repeatedly find a zero and shift everything after it left by one.
 *   Target: O(n) time, O(1) space — a write pointer for the next non-zero slot; after one pass,
 *           fill the tail with zeroes.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Two pointers (slow and fast), swapping in place
// slow = the slot where the next non-zero number belongs.
// fast = scans the whole array.
// 1. When fast lands on a non-zero, swap it into the slow slot and move slow along.
// 2. The zeroes get pushed behind and end up at the back, in order.
// Time O(n), space O(1).
function moveZeroes(nums) {
  // Two pointers technique
  // slow holds the position waiting for the next non-zero value
  // fast walks ahead looking for non-zero values

  let slow = 0;
  for (let fast=0;fast<nums.length;fast++){
    // we check not equal to zero because fast will hold the nonzero
    if(nums[fast] !==0) {
        let temp = nums[slow];
        nums[slow]= nums[fast];
        nums[fast] = temp;
        slow++
    }
  }
  return nums
}

module.exports = { moveZeroes };
