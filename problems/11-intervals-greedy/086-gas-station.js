/**
 * 086 — Gas Station
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   There are n gas stations in a circle. gas[i] is the fuel available at station i, and
 *   cost[i] the fuel needed to reach station i+1. Starting with an empty tank, return the
 *   index you must begin at to travel the circuit once, or -1 if it is impossible.
 *   If a solution exists it is unique.
 *
 * CONSTRAINTS
 *   n == gas.length == cost.length
 *   1 <= n <= 10^5
 *   0 <= gas[i], cost[i] <= 10^4
 *
 * EXAMPLES
 *   canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])  ->  3
 *   canCompleteCircuit([2, 3, 4], [3, 4, 3])      ->  -1
 *   canCompleteCircuit([5], [4])                  ->  0
 *   canCompleteCircuit([2], [2])                  ->  0    // n = 1, exactly enough fuel
 *   canCompleteCircuit([1], [2])                  ->  -1   // n = 1, not enough fuel
 *   canCompleteCircuit([3,1,1], [1,2,2])          ->  0    // the tank never dips below 0
 *
 * EDGE CASES
 *   - If total gas < total cost, no start works — return -1.
 *   - The tank starts empty and may never go negative mid-journey.
 *   - The route wraps around the end of the array.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — simulate a full circuit from every possible starting station.
 *   Target: O(n) time, O(1) space — one pass: if the running tank goes negative at i, no station
 *           up to i can be the start, so restart from i + 1.
 * ----------------------------------------------------------------------
 */

function canCompleteCircuit(gas, cost) {
  // TODO: your solution here
}

module.exports = { canCompleteCircuit };
