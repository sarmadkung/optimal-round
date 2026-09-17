/**
 * 075 — Pacific Atlantic Water Flow
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n matrix of cell heights, the Pacific touches the top and left edges and
 *   the Atlantic the bottom and right edges. Water flows from a cell to a neighbor of
 *   equal or lower height. Return all cells from which water can reach BOTH oceans.
 *
 * CONSTRAINTS
 *   m == heights.length, n == heights[i].length
 *   1 <= m, n <= 200
 *   0 <= heights[i][j] <= 10^5
 *
 * EXAMPLES
 *   pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])
 *     ->  [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 *   pacificAtlantic([[1]])                      ->  [[0,0]]   // a single cell touches both
 *   pacificAtlantic([[1,1],[1,1]])              ->  [[0,0],[0,1],[1,0],[1,1]]
 *   pacificAtlantic([[1,2],[4,3]])              ->  [[0,1],[1,0],[1,1]]
 *   pacificAtlantic([[1,2,3]])                  ->  [[0,0],[0,1],[0,2]]   // a single row
 *   pacificAtlantic([[1,2,3],[8,9,4],[7,6,5]])  ->  [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
 *
 * EDGE CASES
 *   - A 1x1 grid reaches both oceans.
 *   - Equal heights still allow flow.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Searching from every cell is wasteful — invert the problem.
 *
 * COMPLEXITY
 *   Naive:  O((m*n)^2) time — run a search from each cell to see which oceans it reaches.
 *   Target: O(m * n) time — search INWARD from each ocean's edge cells (uphill or level), then
 *           intersect the two reachable sets.
 * ----------------------------------------------------------------------
 */

function pacificAtlantic(heights) {
  // TODO: your solution here
}

module.exports = { pacificAtlantic };
