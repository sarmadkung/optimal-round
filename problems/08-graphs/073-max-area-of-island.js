/**
 * 073 — Max Area of Island
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n binary grid where 1 is land and 0 is water, return the area of the
 *   largest island (land connected 4-directionally). Return 0 if there is no island.
 *
 * CONSTRAINTS
 *   1 <= m, n <= 50
 *   grid[i][j] is 0 or 1.
 *
 * EXAMPLES
 *   maxAreaOfIsland([[0,1],[1,0]])  ->  1   // diagonals do not connect
 *   maxAreaOfIsland([[1,1],[1,0]])  ->  3
 *   maxAreaOfIsland([[0,0],[0,0]])  ->  0
 *   maxAreaOfIsland([[1]])          ->  1   // smallest grid, one land cell
 *   maxAreaOfIsland([[0]])          ->  0   // smallest grid, no land
 *   maxAreaOfIsland([[1,1],[1,1]])  ->  4   // the whole grid is one island
 *
 * EDGE CASES
 *   - A grid of all water returns 0.
 *   - Diagonal neighbors are NOT connected.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Mark cells visited or the flood fill recurses forever.
 *
 * COMPLEXITY
 *   Naive:  Re-exploring islands without marking visited cells double-counts and may not
 *           terminate.
 *   Target: O(m * n) time — flood-fill from each unvisited land cell, returning the cell count,
 *           and keep the maximum.
 * ----------------------------------------------------------------------
 */

function maxAreaOfIsland(grid) {
  // TODO: your solution here
}

module.exports = { maxAreaOfIsland };
