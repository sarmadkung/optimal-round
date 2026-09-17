/**
 * 099 — Roman to Integer
 * Difficulty: Easy   ·   Topic: Strings
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a roman numeral string, convert it to an integer.
 *   Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. A smaller symbol placed before
 *   a larger one means subtraction (IV = 4, IX = 9, CM = 900).
 *
 * CONSTRAINTS
 *   1 <= s.length <= 15
 *   s contains only the characters I, V, X, L, C, D, M.
 *   The input is a valid roman numeral in the range [1, 3999].
 *
 * EXAMPLES
 *   romanToInt("III")        ->  3
 *   romanToInt("I")          ->  1      // shortest possible input
 *   romanToInt("XL")         ->  40     // a subtractive pair
 *   romanToInt("LVIII")      ->  58     // L=50, V=5, III=3
 *   romanToInt("MCMXCIV")    ->  1994   // M=1000, CM=900, XC=90, IV=4
 *   romanToInt("MMMCMXCIX")  ->  3999   // the largest valid input
 *
 * EDGE CASES
 *   - Only six subtractive pairs exist: IV, IX, XL, XC, CD, CM.
 *   - Repeated symbols simply add.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The subtraction rule is purely local — compare each symbol with the next.
 *
 * COMPLEXITY
 *   Naive:  Hard-coding every two-character pair works but is verbose and error-prone.
 *   Target: O(n) time, O(1) space — sum each symbol's value, subtracting instead of adding
 *           whenever a symbol is smaller than the one after it.
 * ----------------------------------------------------------------------
 */

function romanToInt(s) {
  // TODO: your solution here
}

module.exports = { romanToInt };
