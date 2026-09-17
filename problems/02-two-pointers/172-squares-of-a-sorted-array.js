/**
 * 172 — Squares of a Sorted Array
 * Difficulty: Easy   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` sorted in non-decreasing order, return an array of the
 *   squares of each number, also sorted in non-decreasing order.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   -10^4 <= nums[i] <= 10^4
 *   nums is sorted in non-decreasing order.
 *
 * EXAMPLES
 *   sortedSquares([-4, -1, 0, 3, 10])  ->  [0, 1, 9, 16, 100]
 *   sortedSquares([-7, -3, 2, 3, 11])  ->  [4, 9, 9, 49, 121]
 *   sortedSquares([-5])                ->  [25]   // single element
 *   sortedSquares([-3, -2, -1])        ->  [1, 4, 9]   // all negative: squares reverse the order
 *   sortedSquares([1, 2, 3])           ->  [1, 4, 9]   // all non-negative: order is kept
 *   sortedSquares([-2, -1, 1, 2])      ->  [1, 1, 4, 4]   // mirrored values square to duplicates
 *
 * EDGE CASES
 *   - All negative: the squares come out in reverse order.
 *   - All non-negative: already in order.
 *
 * FOLLOW-UP
 *   - Squaring then sorting is O(n log n). Can you find an O(n) solution?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The largest square is always at one of the two ends.
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — square everything, then sort.
 *   Target: O(n) time, O(n) space for the output — pointers at both ends; place the larger
 *           square at the back of the result and move that pointer inward.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Two pointers from both ends, filling the result backwards
// 1. The input is sorted, so the biggest square comes from one end or the other:
//    a large negative squares to the same size as a large positive.
// 2. Compare the two ends, put the larger square at the back of the result, and move that pointer inward.
// 3. Filling backwards is what keeps the result sorted without a sort call.
// Time O(n), space O(n) for the result array.
function sortedSquares(nums) {
  let result = new Array(nums.length)
  let right=nums.length-1;
  let position = nums.length-1;
  let left = 0;
    while(left<=right){
      let rightSquare = nums[right] ** 2;
      let leftSquare = nums[left] ** 2;


      if( rightSquare > leftSquare ){
         result[position] =  rightSquare;
         right--;
      } else{
        result[position] = leftSquare;
        left++;
      }
      position--;

    }
  return result;


}

module.exports = { sortedSquares };
