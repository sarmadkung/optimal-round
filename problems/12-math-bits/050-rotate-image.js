/**
 * 050 — Rotate Image
 * Difficulty: Medium   ·   Topic: Math & Bits
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an n x n 2D matrix representing an image, rotate it 90 degrees clockwise.
 *   You must rotate it IN PLACE — do not allocate another matrix.
 *
 * CONSTRAINTS
 *   n == matrix.length == matrix[i].length
 *   1 <= n <= 20
 *   -1000 <= matrix[i][j] <= 1000
 *   You must rotate the matrix in place, without allocating another one.
 *
 * EXAMPLES
 *   rotate([[1,2,3],[4,5,6],[7,8,9]])                  ->  [[7,4,1],[8,5,2],[9,6,3]]
 *   rotate([[1,2],[3,4]])                              ->  [[3,1],[4,2]]
 *   rotate([[1]])                                      ->  [[1]]
 *   rotate([[-1,2],[3,-4]])                            ->  [[3,-1],[-4,2]]        // negative values are fine
 *   rotate([[0,-1000],[1000,0]])                       ->  [[1000,0],[0,-1000]]   // the value bounds
 *   rotate([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])  ->  [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]]
 *
 * EDGE CASES
 *   - A 1x1 matrix is unchanged.
 *   - Even and odd n both work with the transpose approach.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time, O(n^2) space — write into a fresh matrix, which the constraint forbids.
 *   Target: O(n^2) time, O(1) space — transpose the matrix, then reverse each row.
 *           (Anticlockwise: transpose, then reverse each column.)
 * ----------------------------------------------------------------------
 */

function rotate(matrix) {
  // TODO: your solution here
}

module.exports = { rotate };
