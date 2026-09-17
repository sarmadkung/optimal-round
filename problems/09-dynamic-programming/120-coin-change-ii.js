/**
 * 120 — Coin Change II
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of distinct coin denominations and a target `amount`, return the number
 *   of distinct COMBINATIONS that make up that amount. Coins are unlimited.
 *   Order does not matter: 1+2 and 2+1 are the same combination.
 *
 * CONSTRAINTS
 *   1 <= coins.length <= 300
 *   1 <= coins[i] <= 5000
 *   0 <= amount <= 5000
 *   All coin values are distinct.
 *
 * EXAMPLES
 *   change(5, [1, 2, 5])    ->  4   // 5, 2+2+1, 2+1+1+1, 1x5
 *   change(3, [2])          ->  0
 *   change(0, [7])          ->  1   // the empty combination
 *   change(1, [2])          ->  0   // smallest unreachable amount
 *   change(4, [1, 2])       ->  3   // 1x4, 2+1+1, 2+2
 *   change(11, [1, 5, 10])  ->  4
 *
 * EDGE CASES
 *   - Amount 0 has exactly one combination — take nothing.
 *   - Order does NOT matter; counting permutations is the classic wrong answer.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Loop over COINS on the outside and amounts inside to avoid permutations.
 *
 * COMPLEXITY
 *   Naive:  O(amount^coins) time — recurse over every sequence of coin choices, which counts
 *           permutations.
 *   Target: O(coins * amount) time, O(amount) space — a 1-D DP where the coin loop is outermost,
 *           so each combination is counted once.
 * ----------------------------------------------------------------------
 */

function change(amount, coins) {
  // TODO: your solution here
}

module.exports = { change };
