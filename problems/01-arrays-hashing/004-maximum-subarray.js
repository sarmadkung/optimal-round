/**
 * 004 — Maximum Subarray
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, find the contiguous subarray with the largest sum
 *   and return that sum. The subarray must contain at least one element.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   -10^4 <= nums[i] <= 10^4
 *
 * EXAMPLES
 *   maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])  ->  6   // [4,-1,2,1]
 *   maxSubArray([1])                              ->  1   // single element
 *   maxSubArray([-3, -1, -2])                     ->  -1   // all negative
 *   maxSubArray([5, 4, -1, 7, 8])                 ->  23   // the whole array
 *   maxSubArray([0, -3, 0])                       ->  0   // best sum is 0, from a single 0
 *   maxSubArray([2, -1, 2, -1, 2])                ->  4   // a dip is worth crossing
 *
 * EDGE CASES
 *   - All numbers negative — the answer is the single largest element, not 0.
 *   - Single element.
 *
 * FOLLOW-UP
 *   - If you have figured out the O(n) solution, try coding another solution using the divide and
 *     conquer approach.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Do not initialize the running max to 0.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — sum every subarray.
 *   Target: O(n) time, O(1) space — Kadane's algorithm: at each index keep the best sum ending
 *           here.
 * ----------------------------------------------------------------------
 */


// SOLUTION: Kadane's algorithm
// 1. Move through the array keeping the best sum that ends at the current number.
// 2. If the running sum still helps, extend it; if not, start again from the current number.
// 3. Remember the largest running sum seen.
// Time O(n), space O(1).
// currentSubArray only records which numbers are in the run — the answer comes from maxSum.
function maxSubArray(nums) {
  let currentSubArray = [nums[0]];
  let currentSum = nums[0];
  let maxSum =nums[0]

  for (let i=1;i<nums.length;i++){
      const currentNum = nums[i];
      let isExistingSubArrayWithNewItemGreater =  currentSum + currentNum > currentNum
      
      if(isExistingSubArrayWithNewItemGreater){
        currentSum+=currentNum;
        currentSubArray.push(currentNum);
      } else {
        currentSubArray = [currentNum]
        currentSum = currentNum
      }

      if (currentSum > maxSum) { maxSum = currentSum; }
  }
  return maxSum

}

module.exports = { maxSubArray };
