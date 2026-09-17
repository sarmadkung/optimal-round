/**
 * 077 — Unique Paths
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A robot starts at the top-left of an m x n grid and may only move right or down.
 *   Return the number of distinct paths to the bottom-right corner.
 *
 * CONSTRAINTS
 *   1 <= m, n <= 100
 *   The answer is guaranteed to be at most 2 * 10^9.
 *
 * EXAMPLES
 *   uniquePaths(3, 7)    ->  28
 *   uniquePaths(3, 2)    ->  3
 *   uniquePaths(1, 1)    ->  1
 *   uniquePaths(1, 10)   ->  1   // a single row
 *   uniquePaths(2, 2)    ->  2   // right-down or down-right
 *   uniquePaths(10, 10)  ->  48620
 *
 * EDGE CASES
 *   - A single row or column has exactly one path.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The first row and first column are all 1s in the DP grid.
 *   2. There is a closed form: C(m + n - 2, m - 1).
 *
 * COMPLEXITY
 *   Naive:  O(2^(m+n)) time — recurse on both moves without memoisation.
 *   Target: O(m * n) time, O(n) space — dp[i][j] = dp[i-1][j] + dp[i][j-1], reducible to a single
 *           rolling row.
 * ----------------------------------------------------------------------
 */

function uniquePaths(m, n) {
  // TODO: your solution here
}

module.exports = { uniquePaths };
