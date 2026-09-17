/**
 * 105 — Asteroid Collision
 * Difficulty: Medium   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   An array `asteroids` gives asteroid sizes; the sign is the direction (positive means
 *   right, negative left). Colliding asteroids destroy the smaller one, or both if equal.
 *   Asteroids moving the same way never meet. Return the final state.
 *
 * CONSTRAINTS
 *   2 <= asteroids.length <= 10^4
 *   -1000 <= asteroids[i] <= 1000, and asteroids[i] != 0
 *
 * EXAMPLES
 *   asteroidCollision([5, 10, -5])   ->  [5, 10]
 *   asteroidCollision([8, -8])       ->  []   // equal sizes destroy each other
 *   asteroidCollision([10, 2, -5])   ->  [10]
 *   asteroidCollision([-2, 2])       ->  [-2, 2]        // moving apart, never collide
 *   asteroidCollision([5, -5, 5])    ->  [5]            // pair annihilates, the last survives
 *   asteroidCollision([3, 1, -4])    ->  [-4]           // one asteroid destroys a whole chain
 *
 * EDGE CASES
 *   - A collision only happens when a positive is immediately left of a negative.
 *   - One asteroid may destroy several in a chain.
 *   - Equal sizes destroy BOTH.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Repeatedly scanning the array for a colliding pair until stable is O(n^2).
 *   Target: O(n) time, O(n) space — a stack: on a negative asteroid, pop while the top is a
 *           smaller positive, and only push if it survives.
 * ----------------------------------------------------------------------
 */

function asteroidCollision(asteroids) {
  // TODO: your solution here
}

module.exports = { asteroidCollision };
