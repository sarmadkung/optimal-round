/**
 * 104 — Decode String
 * Difficulty: Medium   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an encoded string of the form k[encoded_string], meaning the bracketed string
 *   repeats exactly k times, return its decoded form. Brackets may be nested.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 30
 *   s consists of lowercase letters, digits and square brackets.
 *   The input is always valid; k is a positive integer.
 *
 * EXAMPLES
 *   decodeString("3[a]2[bc]")      ->  "aaabcbc"
 *   decodeString("3[a2[c]]")       ->  "accaccacc"       // nested
 *   decodeString("2[abc]3[cd]ef")  ->  "abcabccdcdcdef"
 *   decodeString("abc")            ->  "abc"             // no brackets at all
 *   decodeString("1[a]")           ->  "a"               // a repeat count of 1
 *   decodeString("12[a]")          ->  "aaaaaaaaaaaa"    // multi-digit repeat count
 *
 * EDGE CASES
 *   - Multi-digit repeat counts (12[a]) must be parsed as one number.
 *   - Plain text may appear outside any bracket.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Nesting requires a stack, not a single counter.
 *
 * COMPLEXITY
 *   Naive:  Repeated regex passes on the innermost bracket work but rescan the string each time.
 *   Target: O(n * k) time — push the string and count built so far when '[' is seen, and pop and
 *           expand on ']'.
 * ----------------------------------------------------------------------
 */

function decodeString(s) {
  // TODO: your solution here
}

module.exports = { decodeString };
