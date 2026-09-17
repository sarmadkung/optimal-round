/**
 * 010 — Trapping Rain Water
 * Difficulty: Hard   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `n` non-negative integers representing an elevation map where the width of
 *   each bar is 1, compute how much rain water can be trapped after raining.
 *
 * CONSTRAINTS
 *   1 <= height.length <= 2 * 10^4
 *   0 <= height[i] <= 10^5
 *
 * EXAMPLES
 *   trap([0,1,0,2,1,0,1,3,2,1,2,1])  ->  6
 *   trap([4, 2, 0, 3, 2, 5])         ->  9
 *   trap([3, 2, 1])                  ->  0   // strictly decreasing traps nothing
 *   trap([5])                        ->  0   // a single bar has no walls
 *   trap([2, 2, 2])                  ->  0   // all-equal bars trap nothing
 *   trap([0, 3, 0, 2, 0, 4])         ->  7   // leading zero wasted; 3 + 1 + 3 trapped inside
 *
 * EDGE CASES
 *   - Monotonic arrays trap zero water.
 *   - Leading and trailing zeros.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Water above bar i is min(maxLeft, maxRight) - height[i], floored at 0.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each bar scan left and right for its tallest neighbor.
 *   Target: O(n) time, O(1) space — two pointers tracking `leftMax` and `rightMax`, always
 *           advancing the smaller side.
 * ----------------------------------------------------------------------
 */

function trap(height) {
  // TODO: your solution here
}

module.exports = { trap };
