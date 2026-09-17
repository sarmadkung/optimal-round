/**
 * 014 — Valid Parentheses
 * Difficulty: Easy   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s` containing only the characters '()[]{}', determine whether the
 *   input is valid: brackets must close in the correct order and be of the same type.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 10^4
 *   s consists only of the characters '()[]{}'.
 *
 * EXAMPLES
 *   isValid("()")      ->  true
 *   isValid("()[]{}")  ->  true
 *   isValid("(]")      ->  false
 *   isValid("([)]")    ->  false  // wrong nesting order
 *   isValid("(")       ->  false  // odd length; stack still non-empty at the end
 *   isValid("())")     ->  false  // closer with an empty stack
 *
 * EDGE CASES
 *   - Odd-length strings can never be valid.
 *   - A closing bracket with an empty stack is invalid.
 *   - A non-empty stack at the end is invalid.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — repeatedly strip out adjacent matching pairs.
 *   Target: O(n) time, O(n) space — push openers onto a stack and pop-match on every closer.
 * ----------------------------------------------------------------------
 */

function isValid(s) {
  // TODO: your solution here
}

module.exports = { isValid };
