/**
 * 106 — Car Fleet
 * Difficulty: Medium   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Cars are at various positions heading to the same `target`, each with its own speed.
 *   A faster car catches a slower one and they travel on together as a fleet at the slower
 *   speed. Return how many fleets arrive at the destination.
 *
 * CONSTRAINTS
 *   n == position.length == speed.length
 *   1 <= n <= 10^5
 *   0 < target <= 10^6, 0 <= position[i] < target
 *   All positions are unique.
 *
 * EXAMPLES
 *   carFleet(12, [10,8,0,5,3], [2,4,1,1,3])  ->  3
 *   carFleet(10, [3], [3])                   ->  1
 *   carFleet(100, [0, 2, 4], [4, 2, 1])      ->  1
 *   carFleet(10, [0, 5], [1, 1])             ->  2   // equal speeds never catch up
 *   carFleet(12, [0, 2, 4], [1, 2, 3])       ->  3   // nobody catches anybody
 *   carFleet(10, [0, 4, 2], [2, 1, 3])       ->  1   // everyone merges behind the slowest
 *
 * EDGE CASES
 *   - A single car is one fleet.
 *   - Cars that merge exactly AT the target still count as one fleet.
 *   - Cars behind can never overtake — only catch up.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — simulate the positions over time and detect merges step by step.
 *   Target: O(n log n) time — sort by position descending, compute each car's arrival time, and
 *           count how many times a new maximum arrival time appears.
 * ----------------------------------------------------------------------
 */

function carFleet(target, position, speed) {
  // TODO: your solution here
}

module.exports = { carFleet };
