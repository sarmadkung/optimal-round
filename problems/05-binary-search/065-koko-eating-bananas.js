/**
 * 065 — Koko Eating Bananas
 * Difficulty: Medium   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Koko eats bananas from `piles` at k bananas per hour: each hour she picks one pile
 *   and eats up to k from it, moving on if the pile is smaller.
 *   Return the smallest integer k that lets her finish all piles within `h` hours.
 *
 * CONSTRAINTS
 *   1 <= piles.length <= 10^4
 *   piles.length <= h <= 10^9
 *   1 <= piles[i] <= 10^9
 *
 * EXAMPLES
 *   minEatingSpeed([3, 6, 7, 11], 8)          ->  4
 *   minEatingSpeed([30, 11, 23, 4, 20], 5)    ->  30
 *   minEatingSpeed([30, 11, 23, 4, 20], 6)    ->  23
 *   minEatingSpeed([4], 1)                    ->  4   // one pile, one hour
 *   minEatingSpeed([3, 6, 7, 11], 4)          ->  11  // h == pile count, so k = max(piles)
 *   minEatingSpeed([3, 6, 7, 11], 27)         ->  1   // 27 hours is exactly enough at k = 1
 *
 * EDGE CASES
 *   - h equal to the pile count forces k to be the largest pile.
 *   - Hours for one pile are ceil(pile / k) — she never mixes piles in an hour.
 *   - k is at least 1 and at most max(piles).
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(max(piles) * n) time — try every speed from 1 upward. With piles up to 10^9 this
 *           never finishes.
 *   Target: O(n log(max piles)) time — binary search the ANSWER over k in [1, max(piles)],
 *           testing feasibility at each step.
 * ----------------------------------------------------------------------
 */

function minEatingSpeed(piles, h) {
  // TODO: your solution here
}

module.exports = { minEatingSpeed };
