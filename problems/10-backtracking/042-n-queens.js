/**
 * 042 — N-Queens
 * Difficulty: Hard   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Place `n` queens on an n x n chessboard so that no two attack each other.
 *   Return all distinct solutions, each as a list of strings where 'Q' is a queen
 *   and '.' is empty.
 *
 * CONSTRAINTS
 *   1 <= n <= 9
 *
 * EXAMPLES
 *   solveNQueens(4)  ->  [[".Q..","...Q","Q...","..Q."], ["..Q.","Q...","...Q",".Q.."]]
 *   solveNQueens(1)  ->  [["Q"]]
 *   solveNQueens(3)  ->  []   // no solution exists
 *   solveNQueens(2)  ->  []   // no solution here either
 *   solveNQueens(5)  ->  10 distinct solutions
 *   solveNQueens(8)  ->  92 distinct solutions   // the classic board
 *
 * EDGE CASES
 *   - n = 2 and n = 3 have no solutions.
 *   - n = 1 has exactly one.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Both diagonals must be checked: row-col and row+col identify them.
 *
 * COMPLEXITY
 *   Naive:  O(n^n) time — try every square for every queen and validate at the end.
 *   Target: Backtracking with column and two diagonal sets, pruning invalid placements
 *           immediately — roughly O(n!) with heavy pruning.
 * ----------------------------------------------------------------------
 */

function solveNQueens(n) {
  // TODO: your solution here
}

module.exports = { solveNQueens };
