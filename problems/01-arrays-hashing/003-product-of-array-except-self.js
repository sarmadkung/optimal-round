/**
 * 003 — Product of Array Except Self
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums`, return an array `answer` where `answer[i]` is the
 *   product of all elements of `nums` except `nums[i]`.
 *   You must solve it WITHOUT using division, in O(n) time.
 *
 * CONSTRAINTS
 *   2 <= nums.length <= 10^5
 *   -30 <= nums[i] <= 30
 *   The product of any prefix or suffix fits in a 32-bit integer.
 *
 * EXAMPLES
 *   productExceptSelf([1, 2, 3, 4])       ->  [24, 12, 8, 6]
 *   productExceptSelf([-1, 1, 0, -3, 3])  ->  [0, 0, 9, 0, 0]   // one zero
 *   productExceptSelf([2, 3])             ->  [3, 2]   // shortest allowed input
 *   productExceptSelf([0, 0])             ->  [0, 0]   // two zeros wipe everything out
 *   productExceptSelf([-2, 3, -4])        ->  [-12, 8, -6]   // signs matter
 *   productExceptSelf([5, 5, 5])          ->  [25, 25, 25]   // all the same value
 *
 * EDGE CASES
 *   - A single zero — every slot except its own becomes 0.
 *   - Two or more zeros — the whole answer is 0.
 *
 * FOLLOW-UP
 *   - Can you solve the problem in O(1) extra space complexity? (The output array does not count
 *     as extra space.)
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — recompute the product for each index.
 *   Target: O(n) time, O(1) extra space (output excluded) — a prefix pass then a suffix pass,
 *           accumulating into the result array.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Prefix and suffix products, no division
// 1. Left to right: store in result[i] the product of everything before i.
// 2. Right to left: multiply each result[i] by the product of everything after i.
// That leaves every element multiplied by all the others.
// Time O(n), space O(1) on top of the output array.
function productExceptSelf(nums) {

  let result = new Array(nums.length);

  let leftProduct = 1

  for (let i=0;i<nums.length;i++){
    result[i]= leftProduct
    leftProduct*=nums[i]
  }

  let rightProduct = 1
  for (let i=nums.length-1; i>=0;i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i]  
  }

  return result
  
}

module.exports = { productExceptSelf };
