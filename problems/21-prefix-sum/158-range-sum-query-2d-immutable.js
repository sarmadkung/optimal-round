/**
 * 158 — Range Sum Query 2D - Immutable
 * Difficulty: Medium   ·   Topic: Prefix Sum
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a 2D matrix, handle queries for the sum of the rectangle defined by its upper
 *   left and lower right corners. Implement NumMatrix with
 *   sumRegion(row1, col1, row2, col2).
 *
 * CONSTRAINTS
 *   m == matrix.length, n == matrix[i].length
 *   1 <= m, n <= 200
 *   -10^5 <= matrix[i][j] <= 10^5
 *   At most 10^4 calls to sumRegion.
 *
 * API
 *   new NumMatrix(matrix)                         initialize the object with the integer matrix
 *   sumRegion(row1, col1, row2, col2)  -> number  return the sum of the rectangle with those
 *                                                 corners, inclusive
 *
 * EXAMPLES
 *   const nm = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5]]);
 *   nm.sumRegion(1, 1, 2, 2)  ->  11
 *   nm.sumRegion(1, 2, 2, 4)  ->  12
 *   nm.sumRegion(0, 0, 0, 0)  ->  3    // a single cell
 *   nm.sumRegion(2, 0, 2, 4)  ->  9    // one whole row
 *   nm.sumRegion(0, 2, 2, 2)  ->  4    // one whole column
 *   nm.sumRegion(0, 0, 2, 4)  ->  36   // the entire matrix
 *
 * EDGE CASES
 *   - A single-cell rectangle where row1 = row2 and col1 = col2.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Inclusion-exclusion double-subtracts the overlapping corner — add it back.
 *   2. Pad the prefix grid with a zero row and column to avoid boundary checks.
 *
 * COMPLEXITY
 *   Naive:  O(m * n) per query — sum the rectangle cell by cell.
 *   Target: O(m * n) preprocessing, O(1) per query — a 2D prefix sum, then sum = BR - TR - BL +
 *           TL by inclusion-exclusion.
 * ----------------------------------------------------------------------
 */

class NumMatrix {
  // TODO: your solution here
}

module.exports = { NumMatrix };
