/**
 * 144 — Graph Valid Tree
 * Difficulty: Medium   ·   Topic: Union-Find
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `n` nodes labelled 0..n-1 and a list of undirected edges, determine whether they
 *   form a valid tree: fully connected and containing no cycles.
 *
 * CONSTRAINTS
 *   1 <= n <= 2000
 *   0 <= edges.length <= 5000
 *   There are no self-loops or repeated edges.
 *
 * EXAMPLES
 *   validTree(5, [[0,1],[0,2],[0,3],[1,4]])        ->  true
 *   validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])  ->  false  // has a cycle
 *   validTree(2, [])                               ->  false  // disconnected
 *   validTree(1, [])                               ->  true   // single node, no edges
 *   validTree(3, [[0,1],[1,2]])                    ->  true   // a path is a tree
 *   validTree(4, [[0,1],[1,2],[0,2]])              ->  false  // n-1 edges, still not connected
 *
 * EDGE CASES
 *   - A tree on n nodes has EXACTLY n - 1 edges.
 *   - Correct edge count is not sufficient; it must also be connected.
 *   - A single node with no edges is a valid tree.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Reject on the edge count first, then verify connectivity with union-find or one traversal.
 *
 * COMPLEXITY
 *   Naive:  Checking connectivity and cycles with two independent passes duplicates work.
 *   Target: O(E * a(N)) with union-find — reject if any union joins two nodes already in the same
 *           set, then confirm exactly one set remains.
 * ----------------------------------------------------------------------
 */

function validTree(n, edges) {
  // TODO: your solution here
}

module.exports = { validTree };
