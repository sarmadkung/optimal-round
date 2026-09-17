/**
 * 148 — Network Delay Time
 * Difficulty: Medium   ·   Topic: Advanced Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given `times` as directed edges [u, v, w] meaning a signal takes w time to go
 *   from u to v, a node count `n` and a start node `k`.
 *   Return the time for all nodes to receive the signal, or -1 if some never do.
 *
 * CONSTRAINTS
 *   1 <= k <= n <= 100
 *   1 <= times.length <= 6000
 *   0 <= w <= 100, all (u, v) pairs unique
 *
 * EXAMPLES
 *   networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)  ->  2
 *   networkDelayTime([[1, 2, 1]], 2, 1)                ->  1
 *   networkDelayTime([[1, 2, 1]], 2, 2)                ->  -1  // node 1 unreachable
 *   networkDelayTime([[1,2,1],[2,3,2],[1,3,4]], 3, 1)  ->  3   // via node 2 (3) beats the direct edge (4)
 *   networkDelayTime([[1, 2, 0]], 2, 1)                ->  0   // zero-weight edges are allowed
 *   networkDelayTime([[1,2,1],[3,4,1]], 4, 1)          ->  -1  // disconnected graph
 *
 * EDGE CASES
 *   - An unreachable node makes the answer -1.
 *   - The answer is the MAXIMUM of all shortest paths, not their sum.
 *   - Edges are directed — [u,v,w] does not imply [v,u,w].
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  A plain BFS ignores edge weights and gives the wrong answer on weighted graphs.
 *   Target: O(E log V) time — Dijkstra from k with a min-heap, then return the largest finalised
 *           distance (or -1 if any node was never reached).
 * ----------------------------------------------------------------------
 */

function networkDelayTime(times, n, k) {
  // TODO: your solution here
}

module.exports = { networkDelayTime };
