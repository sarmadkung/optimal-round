/**
 * 136 — Valid Sudoku
 * Difficulty: Medium   ·   Topic: Matrix
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Determine whether a 9 x 9 Sudoku board is valid. Only the filled cells need checking:
 *   each row, each column and each of the nine 3 x 3 sub-boxes must contain the digits
 *   1-9 without repetition. The board need not be solvable.
 *
 * CONSTRAINTS
 *   board.length == board[i].length == 9
 *   Each cell is a digit '1'-'9' or the character '.'.
 *
 * EXAMPLES
 *   A standard partially filled valid board                ->  true
 *   The same board with an extra 8 in the top-left box     ->  false
 *   An entirely empty board ('.' everywhere)               ->  true
 *   A board with exactly one filled cell                   ->  true
 *   Two 1s in the same row (or the same column)            ->  false
 *   Two 1s in one 3x3 box, in different rows and columns   ->  false
 *
 * EDGE CASES
 *   - An empty board is valid.
 *   - Only filled cells are checked; the board need not be solvable.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Box index is (row / 3) * 3 + (col / 3) — the classic slip.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) per constraint with three separate full passes over the board.
 *   Target: O(1) time (the board is fixed at 81 cells) — a single pass maintaining 9 row sets, 9
 *           column sets and 9 box sets.
 * ----------------------------------------------------------------------
 */

function isValidSudoku(board) {
  // TODO: your solution here
}

module.exports = { isValidSudoku };
