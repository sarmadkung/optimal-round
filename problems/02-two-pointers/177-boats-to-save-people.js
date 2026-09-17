/**
 * 177 — Boats to Save People
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   `people[i]` is the weight of person i, and every boat can carry at most `limit` weight.
 *   Each boat carries AT MOST TWO people at once, provided their total weight is <= limit.
 *   Return the minimum number of boats needed to carry everyone.
 *
 * CONSTRAINTS
 *   1 <= people.length <= 5 * 10^4
 *   1 <= people[i] <= limit <= 3 * 10^4
 *
 * EXAMPLES
 *   numRescueBoats([1, 2], 3)        ->  1   // (1, 2)
 *   numRescueBoats([3, 2, 2, 1], 3)  ->  3   // (1, 2), (2), (3)
 *   numRescueBoats([3, 5, 3, 4], 5)  ->  4   // everyone alone
 *   numRescueBoats([1], 3)           ->  1   // a single person
 *   numRescueBoats([1, 1, 1, 1], 4)  ->  2   // all four fit by weight, but two per boat is the cap
 *   numRescueBoats([5, 1, 4, 2], 6)  ->  2   // (1, 5), (2, 4)
 *
 * EDGE CASES
 *   - Someone weighing exactly `limit` always rides alone.
 *   - Two people is the cap even when three would fit under the limit.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The heaviest person needs a boat no matter what. Who is the best partner for them?
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each person, search for the best remaining partner.
 *   Target: O(n log n) time, O(1) extra space — sort; the heaviest boards every boat, taking
 *           the lightest along whenever the pair fits.
 * ----------------------------------------------------------------------
 */

function numRescueBoats(people, limit) {
  // TODO: your solution here
}

module.exports = { numRescueBoats };
