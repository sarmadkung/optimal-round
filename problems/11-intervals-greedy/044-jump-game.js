/**
 * 044 — Jump Game
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given an array `nums` where nums[i] is the maximum jump length from index i.
 *   Starting at index 0, return true if you can reach the last index.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^4
 *   0 <= nums[i] <= 10^5
 *
 * EXAMPLES
 *   canJump([2, 3, 1, 1, 4])  ->  true
 *   canJump([3, 2, 1, 0, 4])  ->  false   // stuck at the 0
 *   canJump([0])              ->  true    // already at the end
 *   canJump([0, 1])           ->  false   // leading 0 with length > 1
 *   canJump([2, 0, 0])        ->  true    // one jump clears both zeros
 *   canJump([1, 0, 1, 0])     ->  false   // the first 0 is a dead end
 *
 * EDGE CASES
 *   - A single element — you are already there.
 *   - A leading 0 with length > 1 is immediately stuck.
 *   - Jumps may be shorter than the maximum.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — recurse over every possible jump length from each index.
 *   Target: O(n) time, O(1) space — greedily track the furthest reachable index; fail the moment
 *           i exceeds it.
 * ----------------------------------------------------------------------
 */

function canJump(nums) {
  // TODO: your solution here
}

module.exports = { canJump };
