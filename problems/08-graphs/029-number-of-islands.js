/**
 * 029 — Number of Islands
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n binary grid where '1' is land and '0' is water, return the number of
 *   islands. An island is land connected 4-directionally and surrounded by water.
 *
 * CONSTRAINTS
 *   1 <= m, n <= 300
 *   grid[i][j] is '0' or '1'.
 *
 * EXAMPLES
 *   numIslands([["1","1","0"],["1","1","0"],["0","0","1"]])  ->  2
 *   numIslands([["0"]])                                      ->  0
 *   numIslands([["1"]])                                      ->  1
 *   numIslands([["1","1"],["1","1"]])                        ->  1   // all land, one island
 *   numIslands([["1","0"],["0","1"]])                        ->  2   // diagonals do not connect
 *   numIslands([["1","0","1","0","1"]])                      ->  3   // a single row
 *
 * EDGE CASES
 *   - A grid of all water, or all land.
 *   - Diagonal neighbors do NOT connect.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Mark visited cells or the traversal loops forever.
 *
 * COMPLEXITY
 *   Naive:  Repeated scans without marking visited cells revisit the same land endlessly.
 *   Target: O(m * n) time — scan every cell; on unvisited land, flood-fill (DFS or BFS) the whole
 *           island and count 1.
 * ----------------------------------------------------------------------
 */

function numIslands(grid) {
  // TODO: your solution here
}

module.exports = { numIslands };
