/**
 * 085 — Insert Interval
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a list of non-overlapping intervals sorted by start, insert a new interval and
 *   merge where necessary. Return the resulting sorted, non-overlapping list.
 *
 * CONSTRAINTS
 *   0 <= intervals.length <= 10^4
 *   intervals is sorted by start and non-overlapping.
 *   0 <= start <= end <= 10^5
 *
 * EXAMPLES
 *   insert([[1,3],[6,9]], [2,5])                       ->  [[1,5],[6,9]]
 *   insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])  ->  [[1,2],[3,10],[12,16]]
 *   insert([], [5,7])                                  ->  [[5,7]]
 *   insert([[3,5]], [1,2])                             ->  [[1,2],[3,5]]   // goes before all, no overlap
 *   insert([[1,5]], [6,8])                             ->  [[1,5],[6,8]]   // goes after all, no overlap
 *   insert([[1,2],[5,6]], [2,5])                       ->  [[1,6]]         // touches both ends, all merge
 *
 * EDGE CASES
 *   - An empty input list.
 *   - The new interval may go before all, after all, or swallow several.
 *   - Touching endpoints ([1,2] and [2,3]) merge.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — append the interval, re-sort, and run a full merge pass.
 *   Target: O(n) time — the input is already sorted, so emit everything ending before the new
 *           start, merge the overlapping run, then emit the rest.
 * ----------------------------------------------------------------------
 */

function insert(intervals, newInterval) {
  // TODO: your solution here
}

module.exports = { insert };
