/**
 * 147 — Course Schedule II
 * Difficulty: Medium   ·   Topic: Advanced Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `numCourses` and a list of prerequisite pairs [a, b] meaning b must be taken
 *   before a, return any valid ordering in which all courses can be finished.
 *   If it is impossible, return an empty array.
 *
 * CONSTRAINTS
 *   1 <= numCourses <= 2000
 *   0 <= prerequisites.length <= numCourses * (numCourses - 1)
 *   All prerequisite pairs are distinct.
 *
 * EXAMPLES
 *   findOrder(2, [[1, 0]])                   ->  [0, 1]
 *   findOrder(4, [[1,0],[2,0],[3,1],[3,2]])  ->  [0,1,2,3] or [0,2,1,3]
 *   findOrder(2, [[1,0],[0,1]])              ->  []   // cyclic
 *   findOrder(1, [])                         ->  [0]   // single course
 *   findOrder(3, [])                         ->  [0, 1, 2]   // no prerequisites — any order accepted
 *   findOrder(3, [[0,1],[1,2]])              ->  [2, 1, 0]   // a chain forces one order
 *
 * EDGE CASES
 *   - A cycle means no ordering exists — return an empty array.
 *   - Courses with no prerequisites can appear anywhere valid.
 *   - Several orderings may be correct; any one is accepted.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Trying permutations and validating each is factorial in numCourses.
 *   Target: O(V + E) time — topological sort: Kahn's algorithm on in-degrees, or DFS post-order
 *           reversed. A result shorter than numCourses proves a cycle.
 * ----------------------------------------------------------------------
 */

function findOrder(numCourses, prerequisites) {
  // TODO: your solution here
}

module.exports = { findOrder };
