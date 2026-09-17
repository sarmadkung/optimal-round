/**
 * 121 — Partition Equal Subset Sum
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `nums` of positive integers, determine whether it can be split into two
 *   subsets whose sums are equal.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 200
 *   1 <= nums[i] <= 100
 *
 * EXAMPLES
 *   canPartition([1, 5, 11, 5])  ->  true    // [1,5,5] and [11]
 *   canPartition([1, 2, 3, 5])   ->  false
 *   canPartition([1, 1])         ->  true
 *   canPartition([2])            ->  false   // a single element cannot be split
 *   canPartition([1, 2, 5])      ->  false   // sum 8 is even, yet no half exists
 *   canPartition([1, 2, 3, 4])   ->  true    // [1,4] and [2,3]
 *
 * EDGE CASES
 *   - An odd total sum is immediately false.
 *   - A single element cannot be split.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. This is subset-sum for total/2 — a 0/1 knapsack in disguise.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — enumerate every subset and compare sums.
 *   Target: O(n * sum) time, O(sum) space — a boolean DP over reachable sums up to total/2,
 *           iterating the inner loop DOWNWARD so each number is used once.
 * ----------------------------------------------------------------------
 */

function canPartition(nums) {
  // TODO: your solution here
}

module.exports = { canPartition };
