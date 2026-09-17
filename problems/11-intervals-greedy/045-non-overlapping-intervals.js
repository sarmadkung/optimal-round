/**
 * 045 — Non-overlapping Intervals
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of intervals, return the minimum number you must remove so that the
 *   rest are non-overlapping.
 *
 * CONSTRAINTS
 *   1 <= intervals.length <= 10^5
 *   intervals[i].length == 2, -5 * 10^4 <= start < end <= 5 * 10^4
 *
 * EXAMPLES
 *   eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])   ->  1
 *   eraseOverlapIntervals([[1,2],[1,2],[1,2]])         ->  2
 *   eraseOverlapIntervals([[1,2],[2,3]])               ->  0   // touching is fine
 *   eraseOverlapIntervals([[1,2]])                     ->  0   // a single interval never overlaps
 *   eraseOverlapIntervals([[-5,-1],[-3,2],[0,4]])      ->  1   // negative bounds are allowed
 *   eraseOverlapIntervals([[1,10],[2,3],[3,4],[4,5]])  ->  1   // drop the one long interval
 *
 * EDGE CASES
 *   - Intervals that only touch at an endpoint do not overlap.
 *   - Identical duplicate intervals.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Sorting by START rather than END gives the wrong greedy answer.
 *
 * COMPLEXITY
 *   Naive:  O(2^n) time — try every subset and keep the largest compatible one.
 *   Target: O(n log n) time — sort by END, then greedily keep every interval starting at or after
 *           the last kept end.
 * ----------------------------------------------------------------------
 */

function eraseOverlapIntervals(intervals) {
  // TODO: your solution here
}

module.exports = { eraseOverlapIntervals };
