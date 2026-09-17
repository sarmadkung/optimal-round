/**
 * 084 — Letter Combinations of a Phone Number
 * Difficulty: Medium   ·   Topic: Backtracking
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string of digits 2-9, return all letter combinations the number could spell,
 *   using the standard telephone keypad mapping. Any order is acceptable.
 *
 * CONSTRAINTS
 *   0 <= digits.length <= 4
 *   digits[i] is in the range '2'..'9'.
 *
 * EXAMPLES
 *   letterCombinations("23")    ->  ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *   letterCombinations("")      ->  []
 *   letterCombinations("2")     ->  ["a","b","c"]
 *   letterCombinations("7")     ->  ["p","q","r","s"]   // 7 maps to four letters
 *   letterCombinations("79")    ->  16 strings   // 4 * 4, any order
 *   letterCombinations("2345")  ->  81 strings   // the longest allowed input
 *
 * EDGE CASES
 *   - The empty string returns an empty array, NOT [""].
 *   - 7 (pqrs) and 9 (wxyz) map to four letters, the rest to three.
 *   - 1 and 0 never appear in the input.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  There is no polynomial approach — the output itself is up to 4^n entries.
 *   Target: O(4^n * n) time — backtracking over one digit per level, appending each mapped
 *           letter.
 * ----------------------------------------------------------------------
 */

function letterCombinations(digits) {
  // TODO: your solution here
}

module.exports = { letterCombinations };
