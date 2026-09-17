/**
 * 149 — Min Cost to Connect All Points
 * Difficulty: Medium   ·   Topic: Advanced Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given points on a 2D plane, the cost of connecting two points is their Manhattan
 *   distance. Return the minimum total cost to connect all points so that there is exactly
 *   one path between any two.
 *
 * CONSTRAINTS
 *   1 <= points.length <= 1000
 *   -10^6 <= xi, yi <= 10^6
 *   All points are distinct.
 *
 * EXAMPLES
 *   minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])  ->  20
 *   minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]])       ->  18
 *   minCostConnectPoints([[0, 0]])                          ->  0   // nothing to connect
 *   minCostConnectPoints([[0, 0], [1, 1]])                  ->  2   // two points, one edge
 *   minCostConnectPoints([[0,0],[0,5],[0,9]])               ->  9   // collinear points
 *   minCostConnectPoints([[-1,-1],[0,0],[1,1]])             ->  4   // negative coordinates
 *
 * EDGE CASES
 *   - A single point costs 0.
 *   - Manhattan distance is |x1 - x2| + |y1 - y2|, not Euclidean.
 *   - The graph is complete — every pair is a candidate edge.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Enumerating spanning trees is astronomically expensive.
 *   Target: Minimum spanning tree — Prim's with a heap is O(n^2 log n) here (the graph is dense),
 *           or Kruskal's with union-find over all O(n^2) edges.
 * ----------------------------------------------------------------------
 */

function minCostConnectPoints(points) {
  // TODO: your solution here
}

module.exports = { minCostConnectPoints };
