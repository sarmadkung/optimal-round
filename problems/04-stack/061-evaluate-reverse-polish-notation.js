/**
 * 061 — Evaluate Reverse Polish Notation
 * Difficulty: Medium   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Evaluate an arithmetic expression given in Reverse Polish Notation as an array of
 *   tokens. Valid operators are +, -, *, /. Division truncates toward zero.
 *
 * CONSTRAINTS
 *   1 <= tokens.length <= 10^4
 *   Each token is an operator or an integer in [-200, 200].
 *   The expression is always valid and never divides by zero.
 *
 * EXAMPLES
 *   evalRPN(["2", "1", "+", "3", "*"])       ->  9    // ((2 + 1) * 3)
 *   evalRPN(["4", "13", "5", "/", "+"])      ->  6    // (4 + (13 / 5))
 *   evalRPN(["-7", "2", "/"])                ->  -3   // truncates toward zero, not -4
 *   evalRPN(["5"])                           ->  5    // a lone operand
 *   evalRPN(["3", "4", "-"])                 ->  -1   // left operand is the second pop: 3 - 4
 *   evalRPN(["4", "-2", "/", "2", "-"])      ->  -4   // negative token, then (4 / -2) - 2
 *
 * EDGE CASES
 *   - Division truncates toward ZERO — use Math.trunc, not Math.floor.
 *   - Operand order matters: the second pop is the left operand for - and /.
 *   - Negative number tokens are valid input, not operators.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  There is no meaningfully worse approach — a single stack pass is the natural
 *           solution.
 *   Target: O(n) time, O(n) space — push numbers, and on an operator pop two, apply, and push the
 *           result.
 * ----------------------------------------------------------------------
 */

function evalRPN(tokens) {
  // TODO: your solution here
}

module.exports = { evalRPN };
