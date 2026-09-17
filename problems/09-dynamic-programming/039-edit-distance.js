/**
 * 039 — Edit Distance
 * Difficulty: Hard   ·   Topic: Dynamic Programming
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two strings `word1` and `word2`, return the minimum number of operations to
 *   convert word1 into word2. Permitted operations: insert, delete, replace a character.
 *
 * CONSTRAINTS
 *   0 <= word1.length, word2.length <= 500
 *   Both consist of lowercase English letters.
 *
 * EXAMPLES
 *   minDistance("horse", "ros")            ->  3
 *   minDistance("intention", "execution")  ->  5
 *   minDistance("", "abc")                 ->  3   // three inserts
 *   minDistance("abc", "")                 ->  3   // three deletes
 *   minDistance("abc", "abc")              ->  0   // already equal
 *   minDistance("kitten", "sitting")       ->  3   // replace, replace, insert
 *
 * EDGE CASES
 *   - Either string empty — the answer is the other's length.
 *   - Identical strings cost 0.
 *   - All three operations cost exactly 1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(3^n) time — recurse over every operation at every position.
 *   Target: O(m * n) time and space (reducible to O(min(m, n))) — the Levenshtein DP grid.
 * ----------------------------------------------------------------------
 */

function minDistance(word1, word2) {
  // TODO: your solution here
}

module.exports = { minDistance };
