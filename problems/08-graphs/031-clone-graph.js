/**
 * 031 — Clone Graph
 * Difficulty: Medium   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a reference to a node in a connected undirected graph, return a deep copy of
 *   the entire graph. A node is { val, neighbors }.
 *
 * CONSTRAINTS
 *   The graph holds 0 to 100 nodes.
 *   1 <= Node.val <= 100, unique per node.
 *   The graph is connected and has no repeated edges or self-loops.
 *
 * INPUT FORMAT
 *   `node` is a Node object, not an adjacency list. The adjacency list in EXAMPLES is how the
 *   platforms print the graph: entry i holds the values of node (i + 1)'s neighbors. You are
 *   given a reference to the node with val = 1, and the graph is walked through the objects.
 *
 * EXAMPLES
 *   cloneGraph(node1 of [[2,4],[1,3],[2,4],[1,3]])  ->  an identical, disjoint graph
 *   cloneGraph(node1 of [[2],[1]])                  ->  a copy of the 2-node cycle
 *   cloneGraph(node1 of [[2,3],[1,3],[1,2]])        ->  a copy of the triangle
 *   cloneGraph(a single node with no neighbors)     ->  a copy of it
 *   cloneGraph(null)                                ->  null
 *   cloneGraph(node).val === node.val               ->  true   // but cloneGraph(node) !== node
 *
 * EDGE CASES
 *   - Empty graph.
 *   - The clone must share no node objects with the original.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Cycles — without a visited map you recurse forever.
 *
 * COMPLEXITY
 *   Naive:  Copying without a map either loops infinitely or duplicates shared nodes.
 *   Target: O(V + E) time, O(V) space — DFS or BFS with an `original -> clone` map, created
 *           before recursing into neighbors.
 * ----------------------------------------------------------------------
 */

/**
 * Definition for a graph node — available here exactly as a platform provides it:
 *
 *   class Node {
 *     constructor(val = 0, neighbors = []) {
 *       this.val = val;
 *       this.neighbors = neighbors;
 *     }
 *   }
 */
class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  // TODO: your solution here
}

module.exports = { cloneGraph, Node };
