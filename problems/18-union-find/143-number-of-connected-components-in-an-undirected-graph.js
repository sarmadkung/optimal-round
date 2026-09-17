/**
 * 143 — Number of Connected Components in an Undirected Graph
 * Difficulty: Medium   ·   Topic: Union-Find
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `n` nodes labelled 0..n-1 and a list of undirected edges, return the number of
 *   connected components in the graph.
 *
 * CONSTRAINTS
 *   1 <= n <= 2000
 *   0 <= edges.length <= 5000
 *   There are no repeated edges and no self-loops.
 *
 * EXAMPLES
 *   countComponents(5, [[0,1],[1,2],[3,4]])        ->  2
 *   countComponents(5, [[0,1],[1,2],[2,3],[3,4]])  ->  1
 *   countComponents(3, [])                         ->  3   // every node isolated
 *   countComponents(1, [])                         ->  1   // single node, minimum n
 *   countComponents(2, [[0,1]])                    ->  1
 *   countComponents(4, [[0,1],[2,3]])              ->  2   // two disjoint pairs
 *
 * EDGE CASES
 *   - No edges means every node is its own component.
 *   - Isolated nodes still count.
 *   - The graph may be disconnected in several places at once.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Running a fresh search from every node without tracking visits re-walks components
 *           repeatedly.
 *   Target: O(E * a(N)) with union-find — start the count at n and decrement on each successful
 *           union. DFS/BFS over unvisited nodes is O(V + E) and equally valid.
 * ----------------------------------------------------------------------
 */

function countComponents(n, edges) {
  // TODO: your solution here
}

module.exports = { countComponents };
