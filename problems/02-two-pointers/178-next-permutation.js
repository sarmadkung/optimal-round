/**
 * 178 — Next Permutation
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Rearrange `nums` IN PLACE into the next lexicographically greater permutation. If no greater
 *   permutation exists (the array is in descending order), rearrange it into the lowest
 *   possible order (ascending). Use only O(1) extra memory and return nothing.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 100
 *   0 <= nums[i] <= 100
 *
 * EXAMPLES
 *   nextPermutation([1, 2, 3])  ->  nums becomes [1, 3, 2]
 *   nextPermutation([3, 2, 1])  ->  nums becomes [1, 2, 3]   // wraps around
 *   nextPermutation([1, 1, 5])  ->  nums becomes [1, 5, 1]
 *   nextPermutation([1])        ->  nums becomes [1]   // a single element is unchanged
 *   nextPermutation([5, 5, 5])  ->  nums becomes [5, 5, 5]   // all same: already the lowest order
 *   nextPermutation([1, 3, 2])  ->  nums becomes [2, 1, 3]   // pivot at index 0, suffix reversed
 *
 * EDGE CASES
 *   - Duplicate values: swap with the rightmost element STRICTLY greater than the pivot.
 *   - A single element is unchanged.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Scan from the right for the first index i with nums[i] < nums[i + 1]. Everything after i
 *      is descending.
 *
 * COMPLEXITY
 *   Naive:  O(n! * n) time — generate all permutations in sorted order and find the next one.
 *   Target: O(n) time, O(1) space — find pivot i, swap it with the rightmost larger element,
 *           then reverse the suffix after i with two pointers.
 * ----------------------------------------------------------------------
 */

function nextPermutation(nums) {
  // TODO: your solution here
}

module.exports = { nextPermutation };
