/**
 * 169 — First Missing Positive
 * Difficulty: Hard   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an unsorted integer array `nums`, return the smallest positive integer that is NOT
 *   present in `nums`. You must run in O(n) time and use O(1) auxiliary space.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   -2^31 <= nums[i] <= 2^31 - 1
 *
 * EXAMPLES
 *   firstMissingPositive([1, 2, 0])          ->  3
 *   firstMissingPositive([3, 4, -1, 1])      ->  2
 *   firstMissingPositive([7, 8, 9, 11, 12])  ->  1   // no small positives at all
 *   firstMissingPositive([1])                ->  2   // single element
 *   firstMissingPositive([1, 2, 3])          ->  4   // 1..n all present, so the answer is n + 1
 *   firstMissingPositive([2, 2, 1, 1])       ->  3   // duplicates do not fill the gap
 *
 * EDGE CASES
 *   - Duplicates and negatives are allowed (unlike 089 Missing Number, so sum/XOR tricks fail).
 *   - If 1..n are all present, the answer is n + 1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. For an array of length n, the answer is always in [1, n + 1].
 *   2. So only values in [1, n] matter — and each has a natural home index.
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — sort, then walk looking for the first gap. Or O(n) time with a Set,
 *           which breaks the O(1) space rule.
 *   Target: O(n) time, O(1) space — cyclic placement: swap each value v in [1, n] to index v - 1
 *           until it is home, then the first index i with nums[i] != i + 1 gives i + 1.
 * ----------------------------------------------------------------------
 */

function firstMissingPositive(nums) {
  // TODO: your solution here
}

module.exports = { firstMissingPositive };
