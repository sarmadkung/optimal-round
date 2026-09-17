/**
 * 134 — Set Matrix Zeroes
 * Difficulty: Medium   ·   Topic: Matrix
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n matrix, if an element is 0 set its entire row and column to 0.
 *   You must do it IN PLACE.
 *
 * CONSTRAINTS
 *   m == matrix.length, n == matrix[0].length
 *   1 <= m, n <= 200
 *   -2^31 <= matrix[i][j] <= 2^31 - 1
 *
 * EXAMPLES
 *   The matrix is mutated in place; the result shown is the matrix afterwards.
 *   setZeroes([[1,1,1],[1,0,1],[1,1,1]])        ->  [[1,0,1],[0,0,0],[1,0,1]]
 *   setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])  ->  [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 *   setZeroes([[1]])                            ->  [[1]]            // 1x1, no zero
 *   setZeroes([[0]])                            ->  [[0]]            // 1x1, zero
 *   setZeroes([[1,2],[3,0]])                    ->  [[1,0],[0,0]]
 *   setZeroes([[0,0],[0,0]])                    ->  [[0,0],[0,0]]    // already all zeroes
 *
 * EDGE CASES
 *   - A matrix that is already all zeroes.
 *
 * FOLLOW-UP
 *   - Could you devise a constant O(1) space solution?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Zeroing as you scan cascades incorrectly — you must record first, write second.
 *   2. A zero in the first row or column needs separate handling in the O(1) solution.
 *
 * COMPLEXITY
 *   Naive:  O(m * n) extra space — a full copy of the matrix, or O(m + n) with row and column
 *           sets.
 *   Target: O(m * n) time, O(1) space — use the first row and column themselves as the marker
 *           storage, with two flags for whether they originally held a zero.
 * ----------------------------------------------------------------------
 */

function setZeroes(matrix) {
  // TODO: your solution here
}

module.exports = { setZeroes };
