/**
 * 054 — Remove Duplicates from Sorted Array
 * Difficulty: Easy   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a sorted array `nums`, remove the duplicates IN PLACE so each unique element
 *   appears once, keeping the relative order. Return `k`, the number of unique elements;
 *   the first k slots of nums must hold them. What is left beyond k does not matter.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 3 * 10^4
 *   -100 <= nums[i] <= 100
 *   nums is sorted in non-decreasing order.
 *   You must do it in place with O(1) extra memory.
 *
 * EXAMPLES
 *   removeDuplicates([1, 1, 2])                ->  2, nums starts [1, 2, _]
 *   removeDuplicates([0,0,1,1,1,2,2,3,3,4])    ->  5, nums starts [0,1,2,3,4]
 *   removeDuplicates([1])                      ->  1
 *   removeDuplicates([1, 1, 1])                ->  1, nums starts [1, _, _]   // all identical
 *   removeDuplicates([1, 2, 3])                ->  3, nums starts [1, 2, 3]   // no duplicates to remove
 *   removeDuplicates([-100, -100, 0, 0, 100])  ->  3, nums starts [-100, 0, 100]   // negatives
 *
 * EDGE CASES
 *   - A single element.
 *   - All elements identical — the answer is 1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — build a fresh array of uniques, which the constraint forbids.
 *   Target: O(n) time, O(1) space — a slow write pointer and a fast read pointer; write only when
 *           the value differs from the last written one.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Two pointers (slow and fast), rewriting the array in place
// slow = the last index of the kept, duplicate-free part.
// fast = scans ahead for the next new value.
// 1. The array is sorted, so duplicates always sit next to each other.
// 2. When fast finds a value different from nums[slow], move slow on and put that value there.
// 3. The answer is slow + 1, the length of the kept part.
// Time O(n), space O(1).
function removeDuplicates(nums) {
  // Two Pointer
  let slow = 0;
  for (let fast=0;fast<nums.length;fast++){
    if(nums[slow]!==nums[fast]){
      slow++
      let temp= nums[fast]
      nums[fast] = nums[slow]
      nums[slow] = temp
    }
  }
  return slow+1
}

module.exports = { removeDuplicates };
