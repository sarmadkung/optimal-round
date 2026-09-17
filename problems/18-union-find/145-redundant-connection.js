/**
 * 145 — Redundant Connection
 * Difficulty: Medium   ·   Topic: Union-Find
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A tree had one extra edge added, producing a graph with exactly one cycle.
 *   Given the edge list, return the edge that can be removed to restore a tree.
 *   If several qualify, return the one appearing LAST in the input.
 *
 * CONSTRAINTS
 *   n == edges.length, 3 <= n <= 1000
 *   edges[i] = [a, b] with 1 <= a < b <= n
 *   The graph is connected and contains exactly one cycle.
 *
 * EXAMPLES
 *   findRedundantConnection([[1,2],[1,3],[2,3]])              ->  [2, 3]   // minimum size, n = 3
 *   findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])  ->  [1, 4]
 *   findRedundantConnection([[1,3],[2,3],[1,2]])              ->  [1, 2]
 *   findRedundantConnection([[1,2],[1,3],[2,3],[1,4]])        ->  [2, 3]   // not the input's last edge
 *   findRedundantConnection([[1,4],[3,4],[1,3],[1,2],[4,5]])  ->  [1, 3]
 *   findRedundantConnection([[1,2],[1,3],[1,4],[3,4]])        ->  [3, 4]   // star plus a closing edge
 *
 * EDGE CASES
 *   - Several edges may lie on the cycle — return the LAST one in input order.
 *   - Nodes are 1-indexed, not 0-indexed.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Processing the edges in order makes 'last' fall out naturally.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — remove each edge in turn and test whether the rest forms a tree.
 *   Target: O(n * a(n)) time — union-find in input order: the first edge whose endpoints already
 *           share a root is the answer.
 * ----------------------------------------------------------------------
 */

function findRedundantConnection(edges) {
  // TODO: your solution here
}

module.exports = { findRedundantConnection };
