/**
 * 150 — Cheapest Flights Within K Stops
 * Difficulty: Medium   ·   Topic: Advanced Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `n` cities, a list of flights [from, to, price], a source, a destination and an
 *   integer `k`, return the cheapest price from src to dst using AT MOST k stops,
 *   or -1 if no such route exists.
 *
 * CONSTRAINTS
 *   1 <= n <= 100
 *   0 <= flights.length <= (n * (n - 1) / 2)
 *   0 <= k < n, and src != dst
 *
 * EXAMPLES
 *   findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)  ->  700
 *   findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)                      ->  200
 *   findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0)                      ->  500
 *   findCheapestPrice(2, [[0, 1, 50]], 0, 1, 0)                                         ->  50   // direct flight
 *   findCheapestPrice(2, [], 0, 1, 0)                                                   ->  -1   // no flights at all
 *   findCheapestPrice(4, [[0,1,1],[1,2,1],[2,3,1]], 0, 3, 1)                            ->  -1   // needs 2 stops
 *
 * EDGE CASES
 *   - k counts STOPS, so k + 1 flights are allowed.
 *   - The cheapest overall route may exceed the stop limit and be invalid.
 *   - An unreachable destination returns -1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Plain Dijkstra can discard a costlier path that uses fewer stops and would have been
 *           the only valid one.
 *   Target: O(k * E) time — Bellman-Ford relaxed exactly k + 1 times over a snapshot of the
 *           previous round's costs (or BFS by levels).
 * ----------------------------------------------------------------------
 */

function findCheapestPrice(n, flights, src, dst, k) {
  // TODO: your solution here
}

module.exports = { findCheapestPrice };
