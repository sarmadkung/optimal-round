/**
 * 043 — Merge Intervals
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of intervals where intervals[i] = [start, end], merge all overlapping
 *   intervals and return the non-overlapping intervals covering all the input.
 *
 * CONSTRAINTS
 *   1 <= intervals.length <= 10^4
 *   intervals[i].length == 2, 0 <= start <= end <= 10^4
 *
 * EXAMPLES
 *   merge([[1,3],[2,6],[8,10],[15,18]])  ->  [[1,6],[8,10],[15,18]]
 *   merge([[1,4],[4,5]])                 ->  [[1,5]]         // touching counts as overlapping
 *   merge([[1,4],[2,3]])                 ->  [[1,4]]         // fully contained
 *   merge([[1,4]])                       ->  [[1,4]]         // single interval, nothing to merge
 *   merge([[5,6],[1,2]])                 ->  [[1,2],[5,6]]   // unsorted input, fully disjoint
 *   merge([[1,4],[0,4]])                 ->  [[0,4]]         // shared end, later start comes first
 *
 * EDGE CASES
 *   - Intervals touching at an endpoint merge.
 *   - One interval fully inside another.
 *   - The input is not sorted.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Sort by start, then sweep once, extending the current interval while it overlaps.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — repeatedly scan for any overlapping pair until none remain.
 *   Target: O(n log n) time — sort by start, then sweep, extending the current interval whenever
 *           the next start is <= the current end.
 * ----------------------------------------------------------------------
 */

function merge(intervals) {
  // TODO: your solution here
}

module.exports = { merge };
