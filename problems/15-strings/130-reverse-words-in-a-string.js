/**
 * 130 — Reverse Words in a String
 * Difficulty: Medium   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, reverse the order of the words. Words are separated by one or more
 *   spaces. The result must have single spaces between words and no leading or trailing
 *   space.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 10^4
 *   s contains English letters, digits and spaces, and has at least one word.
 *
 * EXAMPLES
 *   reverseWords("the sky is blue")   ->  "blue is sky the"
 *   reverseWords("  hello world  ")   ->  "world hello"      // outer spaces stripped
 *   reverseWords("a good   example")  ->  "example good a"   // space runs collapse
 *   reverseWords("hello")             ->  "hello"            // a lone word is unchanged
 *   reverseWords("   a   ")           ->  "a"
 *   reverseWords("1 2 3")             ->  "3 2 1"
 *
 * EDGE CASES
 *   - Leading and trailing spaces must be stripped.
 *   - Multiple spaces between words collapse into one.
 *   - Word ORDER reverses; the letters inside each word do not.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Splitting naively on a single space produces empty strings that must be filtered.
 *   Target: O(n) time — split on runs of whitespace, reverse the list, and join with single
 *           spaces. (O(1) space in place: reverse the whole string, then each word.)
 * ----------------------------------------------------------------------
 */

function reverseWords(s) {
  // TODO: your solution here
}

module.exports = { reverseWords };
