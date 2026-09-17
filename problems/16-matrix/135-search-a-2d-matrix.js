/**
 * 135 — Search a 2D Matrix
 * Difficulty: Medium   ·   Topic: Matrix
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n matrix where each row is sorted ascending and the first value of each
 *   row is greater than the last value of the previous row, return true if `target` is
 *   present. Must run in O(log(m * n)) time.
 *
 * CONSTRAINTS
 *   m == matrix.length, n == matrix[i].length
 *   1 <= m, n <= 100
 *   -10^4 <= matrix[i][j], target <= 10^4
 *
 * EXAMPLES
 *   searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)   ->  true
 *   searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)  ->  false
 *   searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 60)  ->  true    // last cell
 *   searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 0)   ->  false   // below all
 *   searchMatrix([[1]], 1)                                     ->  true    // 1x1
 *   searchMatrix([[1],[3],[5]], 4)                             ->  false   // single column
 *
 * EDGE CASES
 *   - A target smaller or larger than everything.
 *   - A 1x1 matrix.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The whole matrix is one sorted sequence — that is what enables a single binary search.
 *
 * COMPLEXITY
 *   Naive:  O(m * n) time — scan every cell, ignoring the sorted structure.
 *   Target: O(log(m * n)) time — binary search the matrix as a flat array, mapping index i to
 *           (row = i / n, col = i % n).
 * ----------------------------------------------------------------------
 */

function searchMatrix(matrix, target) {
  // TODO: your solution here
}

module.exports = { searchMatrix };
