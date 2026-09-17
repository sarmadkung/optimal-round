/**
 * 016 — Largest Rectangle in Histogram
 * Difficulty: Hard   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array `heights` representing a histogram's bar heights where each bar has
 *   width 1, return the area of the largest rectangle that fits inside the histogram.
 *
 * CONSTRAINTS
 *   1 <= heights.length <= 10^5
 *   0 <= heights[i] <= 10^4
 *
 * EXAMPLES
 *   largestRectangleArea([2, 1, 5, 6, 2, 3])  ->  10  // bars 5 and 6
 *   largestRectangleArea([2, 4])              ->  4
 *   largestRectangleArea([1])                 ->  1   // single bar
 *   largestRectangleArea([2, 0, 2])           ->  2   // the zero bar splits the histogram
 *   largestRectangleArea([3, 3, 3, 3])        ->  12  // flat: full width
 *   largestRectangleArea([5, 4, 3, 2, 1])     ->  9   // height 3 across the first 3 bars
 *
 * EDGE CASES
 *   - Zero-height bars split the histogram.
 *   - A single bar.
 *   - The rectangle's height is the minimum bar it spans.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each bar expand left and right while bars stay at least as tall.
 *   Target: O(n) time, O(n) space — a monotonically increasing stack of indices; on each pop the
 *           popped bar's full width is known.
 * ----------------------------------------------------------------------
 */

function largestRectangleArea(heights) {
  // TODO: your solution here
}

module.exports = { largestRectangleArea };
