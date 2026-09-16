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

function sortedSquares(nums) {
  // We use an extra array because we need to preserve the original
  // sorted array while calculating squares.
  // The largest square must come from either the left or right end.
  // We place the larger square at the current position from the end.
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
