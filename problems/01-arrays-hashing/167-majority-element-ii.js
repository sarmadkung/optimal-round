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
  // TODO: your solution here
}

module.exports = { majorityElement };
