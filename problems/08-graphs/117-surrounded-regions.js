/**
 * 117 — Surrounded Regions
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an m x n board of 'X' and 'O', capture every region of 'O' that is completely
 *   surrounded by 'X' by flipping those cells to 'X'.
 *   A region touching the border is never captured.
 *
 * CONSTRAINTS
 *   m == board.length, n == board[i].length
 *   1 <= m, n <= 200
 *   board[i][j] is 'X' or 'O'.
 *
 * EXAMPLES
 *   solve([["X","X","X"],["X","O","X"],["X","X","X"]])  ->  the O becomes X
 *   solve([["O"]])  ->  [["O"]]   // touches the border, so it survives
 *   solve([["X"]])  ->  [["X"]]   // no O to capture
 *   solve([["X","X"],["X","O"]])  ->  unchanged   // the O is on the border
 *   solve([["O","O"],["O","O"]])  ->  unchanged   // every cell is border
 *   solve([["X","O","X"],["X","O","X"],["X","X","X"]])  ->  unchanged   // reaches the top border
 *
 * EDGE CASES
 *   - Any region connected to the border survives, however large.
 *   - A 1x1 board is entirely border.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Flipping first and fixing later is far harder than marking survivors first.
 *
 * COMPLEXITY
 *   Naive:  Checking each region for border contact separately re-walks the same cells
 *           repeatedly.
 *   Target: O(m * n) time — invert the problem: flood-fill from every 'O' ON the border to mark
 *           survivors, then flip all unmarked 'O' cells.
 * ----------------------------------------------------------------------
 */

function solve(board) {
  // TODO: your solution here
}

module.exports = { solve };
