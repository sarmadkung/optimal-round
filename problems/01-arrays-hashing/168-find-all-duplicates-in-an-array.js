/**
 * 168 — Find All Duplicates in an Array
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` of length n where every value is in [1, n] and each value
 *   appears ONCE or TWICE, return an array of all the values that appear twice. Any order is
 *   accepted.
 *
 * CONSTRAINTS
 *   n == nums.length, 1 <= n <= 10^5
 *   1 <= nums[i] <= n
 *   Each element appears once or twice.
 *   You must write an algorithm that runs in O(n) time and uses only constant extra space.
 *
 * EXAMPLES
 *   findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])  ->  [2, 3]   // any order
 *   findDuplicates([1, 1, 2])                 ->  [1]
 *   findDuplicates([1])                       ->  []   // n = 1, no duplicate possible
 *   findDuplicates([1, 1])                    ->  [1]   // smallest duplicate case
 *   findDuplicates([1, 2, 3, 4])              ->  []   // a permutation of 1..n
 *   findDuplicates([2, 1, 2, 1])              ->  [2, 1]   // every value duplicated; any order
 *
 * EDGE CASES
 *   - No duplicates at all returns [].
 *   - Every value duplicated (n is even, n/2 answers).
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Same trick as 166: use the sign of nums[v - 1] as a 'seen' flag for value v.
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — a Set of seen values.
 *   Target: O(n) time, O(1) extra space — for each |v|, if nums[|v| - 1] is already negative,
 *           v is a duplicate; otherwise negate it.
 * ----------------------------------------------------------------------
 */

function findDuplicates(nums) {
  // TODO: your solution here
}

module.exports = { findDuplicates };
