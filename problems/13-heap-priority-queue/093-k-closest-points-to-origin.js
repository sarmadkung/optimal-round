/**
 * 093 — K Closest Points to Origin
 * Difficulty: Medium   ·   Topic: Heap / Priority Queue
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of points on the plane and an integer `k`, return the k points closest
 *   to the origin (0, 0) by Euclidean distance. Any order is acceptable.
 *
 * CONSTRAINTS
 *   1 <= k <= points.length <= 10^4
 *   -10^4 <= xi, yi <= 10^4
 *
 * EXAMPLES
 *   kClosest([[1, 3], [-2, 2]], 1)           ->  [[-2, 2]]
 *   kClosest([[3, 3], [5, -1], [-2, 4]], 2)  ->  [[3, 3], [-2, 4]]   // any order
 *   kClosest([[0, 0]], 1)                    ->  [[0, 0]]
 *   kClosest([[1, 3], [-2, 2]], 2)           ->  [[-2, 2], [1, 3]]   // k = n returns everything, any order
 *   kClosest([[-3, -4], [1, 1], [2, 2]], 2)  ->  [[1, 1], [2, 2]]    // distances 25, 2, 8
 *   kClosest([[1, 0], [0, 1]], 1)            ->  [[1, 0]]            // a tie — either point is acceptable
 *
 * EDGE CASES
 *   - k equal to the point count returns everything.
 *   - Negative coordinates are fine — squaring handles the sign.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Comparing SQUARED distances avoids the square root entirely.
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — sort every point by distance when only k are needed.
 *   Target: O(n log k) with a size-k max-heap, or O(n) average with Quickselect on squared
 *           distance.
 * ----------------------------------------------------------------------
 */

function kClosest(points, k) {
  // TODO: your solution here
}

module.exports = { kClosest };
