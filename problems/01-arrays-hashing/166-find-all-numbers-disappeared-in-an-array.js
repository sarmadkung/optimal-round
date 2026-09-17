/**
 * 166 — Find All Numbers Disappeared in an Array
 * Difficulty: Easy   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` of n integers where each nums[i] is in the range [1, n], return an
 *   array of all the integers in [1, n] that do not appear in `nums`. Any order is accepted.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 10^5
 *   1 <= nums[i] <= n
 *
 * EXAMPLES
 *   findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])  ->  [5, 6]   // any order
 *   findDisappearedNumbers([1, 1])                    ->  [2]
 *   findDisappearedNumbers([1])                       ->  []   // n = 1, nothing missing
 *   findDisappearedNumbers([2, 2])                    ->  [1]
 *   findDisappearedNumbers([1, 2, 3])                 ->  []   // a permutation of 1..n
 *   findDisappearedNumbers([3, 3, 3, 3])              ->  [1, 2, 4]   // all the same value; any order
 *
 * EDGE CASES
 *   - Nothing missing (a permutation of 1..n) returns [].
 *   - Every slot holds the same value, so n - 1 numbers are missing.
 *
 * FOLLOW-UP
 *   - Could you do it without extra space (the returned list does not count) in O(n) time?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The values are valid indices. Can the array itself record which values it has seen?
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — put every value in a Set, then check 1..n.
 *   Target: O(n) time, O(1) extra space — for each value v, negate nums[|v| - 1]; indices that
 *           stay positive are the missing numbers.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Hash set of the numbers that are present
// 1. Put every number into a set.
// 2. Walk 1 to n and collect the ones the set doesn't hold.
// Time O(n), space O(n).
// The O(1)-space version marks numbers as seen inside nums itself, by negating nums[value - 1].
function findDisappearedNumbers(nums) {
  // we store every item into a set
  // then we check 1..n against that set, using the array length as n
  let allNums = new Set();
  let missingNums = []
  for (let i=0;i<nums.length;i++) {
    allNums.add(nums[i])
  }
  for (let j=0; j<nums.length;j++){
    if(!allNums.has(j+1)){
      missingNums.push(j+1)
    }
  }
  return missingNums
}

module.exports = { findDisappearedNumbers };
