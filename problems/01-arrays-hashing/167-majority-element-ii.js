/**
 * 167 — Majority Element II
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` of size n, return all elements that appear MORE than n/3
 *   times. Any order is accepted.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 5 * 10^4
 *   -10^9 <= nums[i] <= 10^9
 *
 * EXAMPLES
 *   majorityElement([3, 2, 3])           ->  [3]
 *   majorityElement([1])                 ->  [1]   // single element
 *   majorityElement([1, 2])              ->  [1, 2]   // any order
 *   majorityElement([1, 2, 3])           ->  []   // each hits exactly n/3, which is not MORE than n/3
 *   majorityElement([1, 1, 1, 2, 3, 4])  ->  [1]   // 3 of 6 is more than 6/3
 *   majorityElement([2, 2, 1, 1, 3])     ->  [2, 1]   // the maximum of two answers; any order
 *
 * EDGE CASES
 *   - There can be at most TWO such elements — and there may be none.
 *   - 'More than n/3' is strict: exactly n/3 does not qualify.
 *
 * FOLLOW-UP
 *   - Solve it in linear time and O(1) space. (See 101 Majority Element first.)
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Unlike 101, no answer is guaranteed — a candidate must be verified with a second pass.
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — count everything in a hash map.
 *   Target: O(n) time, O(1) space — Boyer-Moore with two candidates and two counters, then a
 *           counting pass to confirm each candidate really exceeds n/3.
 * ----------------------------------------------------------------------
 */

function majorityElement(nums) {
  // Using Improved Boore - Moore Voting algorighthm by using 2 candidates and 2 counts
  let candidate1 = null;
  let count1 = 0;
  let candidate2 = null;
  let count2 = 0;

  for(let i = 0; i < nums.length; i++) {

    let currentNum = nums[i];

    // switch to another candidate when we have candidate intialized and count 0
    if(candidate1 && count1===0){
      candidate1 =  currentNum
    } else if(candidate2 && count2 === 0){
      candidate2 = currentNum
    }

    // initalize candidate
    if(!candidate1){
      candidate1= currentNum
    } else if(candidate1 !== currentNum && !candidate2) {
      candidate2 = currentNum;
    }
    // increment count
    if(candidate1 === currentNum) {
      count1++;
    } else if(candidate2 === currentNum) {
      count2++;
      // decrease count
    } else {
      count1--
      count2--
    }
  }

  let actualCount1 = 0
  let actualCount2 = 0

  for (let num of nums){
    if(num===candidate1) actualCount1++
    if(num===candidate2) actualCount2++
  }

  let majority = [];
  if(actualCount1 > nums.length/3){
    majority.push(candidate1)
  } 
  if(actualCount2 > nums.length/3){
    majority.push(candidate2)
  }
  return majority
}

module.exports = { majorityElement };
