/**
 * 034 — Coin Change
 * Difficulty: Medium   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of coin denominations and an integer `amount`, return the fewest
 *   coins needed to make up that amount, or -1 if it is impossible.
 *   You have an infinite supply of each coin.
 *
 * CONSTRAINTS
 *   1 <= coins.length <= 12
 *   1 <= coins[i] <= 2^31 - 1
 *   0 <= amount <= 10^4
 *
 * EXAMPLES
 *   coinChange([1, 2, 5], 11)      ->  3    // 5 + 5 + 1
 *   coinChange([2], 3)             ->  -1
 *   coinChange([1], 0)             ->  0
 *   coinChange([1, 3, 4], 6)       ->  2    // 3 + 3; greedy 4+1+1 would give 3
 *   coinChange([3, 7], 11)         ->  -1   // no combination reaches 11
 *   coinChange([2, 5, 10, 1], 27)  ->  4    // 10 + 10 + 5 + 2
 *
 * EDGE CASES
 *   - Amount 0 needs 0 coins.
 *   - An unreachable amount returns -1, not Infinity.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Greedy — always taking the largest coin — is WRONG: coins=[1,3,4], amount=6 gives 3 coins,
 *      not the optimal 2.
 *
 * COMPLEXITY
 *   Naive:  O(amount^coins) time — recurse over every combination.
 *   Target: O(amount * coins) time, O(amount) space — bottom-up DP where dp[a] = 1 + min(dp[a -
 *           c]) over all coins c.
 * ----------------------------------------------------------------------
 */

function coinChange(coins, amount) {
  // TODO: your solution here
}

module.exports = { coinChange };
