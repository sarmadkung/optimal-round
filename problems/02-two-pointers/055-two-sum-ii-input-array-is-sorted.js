/**
 * 055 — Two Sum II - Input Array Is Sorted
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a 1-indexed array `numbers` sorted in non-decreasing order, find two numbers
 *   that add up to `target` and return their 1-based indices [index1, index2] with
 *   index1 < index2. You must use O(1) extra space.
 *
 * CONSTRAINTS
 *   2 <= numbers.length <= 3 * 10^4
 *   -1000 <= numbers[i] <= 1000
 *   Exactly one solution exists; numbers is sorted ascending.
 *   You must use only constant extra space.
 *
 * EXAMPLES
 *   twoSum([2, 7, 11, 15], 9)              ->  [1, 2]   // 1-INDEXED
 *   twoSum([2, 3, 4], 6)                   ->  [1, 3]
 *   twoSum([-1, 0], -1)                    ->  [1, 2]
 *   twoSum([1, 2, 3, 4, 4, 9, 56, 90], 8)  ->  [4, 5]   // the pair is two equal values
 *   twoSum([0, 0, 3, 4], 0)                ->  [1, 2]   // zeros
 *   twoSum([-1000, -1, 0, 3], -1000)       ->  [1, 3]   // negative target
 *
 * EDGE CASES
 *   - The answer is 1-indexed — a classic off-by-one trap.
 *   - Negative values.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — the hash map from Two Sum, which violates the O(1) space
 *           rule.
 *   Target: O(n) time, O(1) space — two pointers at the ends; move left in when the sum is too
 *           small, right in when too large.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Two pointers closing in from both ends
// 1. The array is sorted, so start one pointer at the smallest number and one at the largest.
// 2. Sum too small? Move the left pointer right. Too big? Move the right pointer left.
// 3. Stop when the sum matches, and return 1-based indices.
// Time O(n), space O(1).
function twoSum(numbers, target) {
// the two pointers start at opposite ends and move toward each other
// (they are named slow and fast here, but they are really left and right)

  let slow = 0
  let fast = numbers.length-1;


  while(slow<fast){
    const currentSum = numbers[fast]+numbers[slow];

    if(currentSum=== target){
      return [slow+1,fast+1]
    }
    if(currentSum < target){
      slow++
    } else {
      fast--
    }
  }


}

module.exports = { twoSum };
