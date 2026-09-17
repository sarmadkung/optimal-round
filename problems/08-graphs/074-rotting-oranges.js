/**
 * 074 — Rotting Oranges
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   In an m x n grid, 0 is empty, 1 is a fresh orange and 2 is rotten. Each minute, every
 *   fresh orange adjacent (4-directionally) to a rotten one becomes rotten.
 *   Return the minutes until no fresh orange remains, or -1 if that is impossible.
 *
 * CONSTRAINTS
 *   1 <= m, n <= 10
 *   grid[i][j] is 0, 1 or 2.
 *
 * EXAMPLES
 *   orangesRotting([[2,1,1],[1,1,0],[0,1,1]])  ->  4
 *   orangesRotting([[2,1,1],[0,1,1],[1,0,1]])  ->  -1   // one is unreachable
 *   orangesRotting([[0,2]])                    ->  0   // nothing fresh
 *   orangesRotting([[0]])                      ->  0   // no oranges at all
 *   orangesRotting([[1]])                      ->  -1   // fresh, and nothing can ever rot it
 *   orangesRotting([[2,2],[1,1]])              ->  1   // both rot in the same minute
 *
 * EDGE CASES
 *   - No fresh oranges at the start returns 0, not -1.
 *   - A fresh orange with no rotten neighbor ever returns -1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Rotting spreads simultaneously — this is multi-source BFS, not one source at a time.
 *
 * COMPLEXITY
 *   Naive:  Running a separate BFS per rotten orange overcounts the elapsed time.
 *   Target: O(m * n) time — multi-source BFS seeding the queue with EVERY rotten orange, counting
 *           levels as minutes.
 * ----------------------------------------------------------------------
 */

function orangesRotting(grid) {
  // TODO: your solution here
}

module.exports = { orangesRotting };
