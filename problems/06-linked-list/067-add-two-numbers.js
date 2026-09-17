/**
 * 067 — Add Two Numbers
 * Difficulty: Medium   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given two non-empty linked lists representing non-negative integers whose
 *   digits are stored in REVERSE order, one digit per node.
 *   Add them and return the sum as a linked list in the same reverse-order form.
 *
 * CONSTRAINTS
 *   Each list holds 1 to 100 nodes.
 *   0 <= Node.val <= 9
 *   No leading zeros except the number 0 itself.
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   addTwoNumbers(2 -> 4 -> 3, 5 -> 6 -> 4)  ->  7 -> 0 -> 8   // 342 + 465 = 807
 *   addTwoNumbers(0, 0)                      ->  0
 *   addTwoNumbers(9 -> 9, 1)                 ->  0 -> 0 -> 1   // 99 + 1 = 100
 *   addTwoNumbers(5, 5)                      ->  0 -> 1   // 5 + 5 = 10, carry makes a new node
 *   addTwoNumbers(1 -> 2 -> 3, 7)            ->  8 -> 2 -> 3   // 321 + 7 = 328
 *   addTwoNumbers(0, 7 -> 3)                 ->  7 -> 3   // 0 + 37 = 37, different lengths
 *
 * EDGE CASES
 *   - Lists of different lengths.
 *   - A final carry needs an extra node (99 + 1).
 *   - Digits are already reversed, so add left to right.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Converting each list to a number, adding, and rebuilding overflows for 100-digit
 *           inputs.
 *   Target: O(max(m, n)) time — walk both lists together, tracking a carry and emitting sum % 10
 *           each step.
 * ----------------------------------------------------------------------
 */

const { ListNode } = require('../_lib/structures');

/**
 * Definition for a singly linked list node — available here exactly as a platform provides it:
 *
 *   class ListNode {
 *     constructor(val = 0, next = null) {
 *       this.val = val;
 *       this.next = next;
 *     }
 *   }
 */

function addTwoNumbers(l1, l2) {
  // TODO: your solution here
}

module.exports = { addTwoNumbers };
