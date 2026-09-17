/**
 * 087 — Partition Labels
 * Difficulty: Medium   ·   Topic: Intervals & Greedy
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, partition it into as many parts as possible so that each letter
 *   appears in at most one part. Return a list of the part sizes, in order.
 *   The parts concatenated in order must reconstruct s.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 500
 *   s consists of lowercase English letters.
 *
 * EXAMPLES
 *   partitionLabels("ababcbacadefegdehijhklij")  ->  [9, 7, 8]
 *   partitionLabels("eccbbbbdec")                ->  [10]
 *   partitionLabels("a")                         ->  [1]
 *   partitionLabels("aa")                        ->  [2]         // a repeat forces one part
 *   partitionLabels("abc")                       ->  [1, 1, 1]   // all distinct, maximal split
 *   partitionLabels("abab")                      ->  [4]         // interleaved letters cannot split
 *
 * EDGE CASES
 *   - A single character gives [1].
 *   - One letter spanning the whole string forces a single part.
 *   - The sizes must sum to s.length.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each candidate cut, verify no letter straddles it.
 *   Target: O(n) time, O(26) space — record each letter's LAST index, then sweep, closing a part
 *           when the cursor reaches the running maximum last-index.
 * ----------------------------------------------------------------------
 */

function partitionLabels(s) {
  // TODO: your solution here
}

module.exports = { partitionLabels };
