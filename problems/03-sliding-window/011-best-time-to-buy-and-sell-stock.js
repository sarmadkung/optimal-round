/**
 * 011 — Best Time to Buy and Sell Stock
 * Difficulty: Easy   ·   Topic: Sliding Window
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given an array `prices` where `prices[i]` is the price of a stock on day `i`.
 *   Choose one day to buy and a later day to sell to maximise profit.
 *   Return the maximum profit, or 0 if no profit is possible.
 *
 * CONSTRAINTS
 *   1 <= prices.length <= 10^5
 *   0 <= prices[i] <= 10^4
 *
 * EXAMPLES
 *   maxProfit([7, 1, 5, 3, 6, 4])  ->  5   // buy at 1, sell at 6
 *   maxProfit([7, 6, 4, 3, 1])     ->  0   // never profitable
 *   maxProfit([2])                 ->  0   // a single day leaves no time to sell
 *   maxProfit([3, 3, 3])           ->  0   // a flat market
 *   maxProfit([2, 4, 1])           ->  2   // the later low does not help
 *   maxProfit([3, 2, 6, 5, 0, 3])  ->  4   // buy at 2, sell at 6
 *
 * EDGE CASES
 *   - Strictly decreasing prices — return 0, never a negative.
 *   - Single day.
 *   - You must buy before you sell.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — try every buy/sell pair.
 *   Target: O(n) time, O(1) space — one pass tracking the minimum price seen so far and the best
 *           profit against it.
 * ----------------------------------------------------------------------
 */

function maxProfit(prices) {
  // TODO: your solution here
}

module.exports = { maxProfit };
