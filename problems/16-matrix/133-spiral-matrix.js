/**
 * 133 — Spiral Matrix
 * Difficulty: Medium   ·   Topic: Matrix
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n matrix, return all its elements in spiral order: right across the top,
 *   down the right side, left across the bottom, up the left side, then inward.
 *
 * CONSTRAINTS
 *   m == matrix.length, n == matrix[i].length
 *   1 <= m, n <= 10
 *   -100 <= matrix[i][j] <= 100
 *
 * EXAMPLES
 *   spiralOrder([[1,2,3],[4,5,6],[7,8,9]])  ->  [1,2,3,6,9,8,7,4,5]
 *   spiralOrder([[1, 2, 3, 4]])             ->  [1, 2, 3, 4]         // single row
 *   spiralOrder([[1], [2], [3]])            ->  [1, 2, 3]            // single column
 *   spiralOrder([[1]])                      ->  [1]                  // 1x1
 *   spiralOrder([[1,2],[3,4]])              ->  [1,2,4,3]
 *   spiralOrder([[1,2,3],[4,5,6]])          ->  [1,2,3,6,5,4]        // wider than tall
 *
 * EDGE CASES
 *   - A single row or single column must not be traversed twice.
 *   - Non-square matrices.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Re-check the boundaries before the bottom and left passes.
 *
 * COMPLEXITY
 *   Naive:  Marking visited cells in a parallel grid works but costs O(m * n) extra space.
 *   Target: O(m * n) time, O(1) extra space — four boundary pointers (top, bottom, left, right)
 *           contracted after each pass.
 * ----------------------------------------------------------------------
 */

function spiralOrder(matrix) {
  // TODO: your solution here
}

module.exports = { spiralOrder };
