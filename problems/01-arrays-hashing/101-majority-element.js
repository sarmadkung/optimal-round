/**
 * 101 — Majority Element
 * Difficulty: Easy   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` of size n, return the element that appears more than n/2 times.
 *   You may assume a majority element always exists.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 5 * 10^4
 *   -10^9 <= nums[i] <= 10^9
 *   A majority element is guaranteed to exist.
 *
 * EXAMPLES
 *   majorityElement([3, 2, 3])              ->  3
 *   majorityElement([2, 2, 1, 1, 1, 2, 2])  ->  2
 *   majorityElement([1])                    ->  1   // single element
 *   majorityElement([6, 5, 5])              ->  5   // smallest non-trivial majority
 *   majorityElement([-1, -1, 2])            ->  -1   // negatives are valid
 *   majorityElement([2, 2, 1, 1, 2])        ->  2   // 3 of 5 is a majority
 *
 * EDGE CASES
 *   - A single element is trivially the majority.
 *   - 'More than n/2' is strict — exactly half does not qualify.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The guarantee that one exists is what makes the O(1)-space trick safe.
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — count every value in a hash map and take the largest count.
 *   Target: O(n) time, O(1) space — Boyer-Moore voting: keep a candidate and a counter, resetting
 *           the candidate whenever the counter hits zero.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Count in a hash map
// 1. Count how many times each number appears.
// 2. Return the number whose count is more than n / 2.
// Time O(n), space O(n).
// Boyer-Moore voting does the same in O(1) space: keep one candidate and a counter.
function majorityElement(nums) {
  let majority = new Map();
  for (let i=0;i<nums.length;i++){
    if(majority.has(nums[i])){
      majority.set(nums[i],majority.get(nums[i])+1)
    } else {
      majority.set(nums[i],1)
    }
  }
  for (let [num,count] of majority){
     if(count >(nums.length/2)){
      return num
     }
  }
}

module.exports = { majorityElement };
