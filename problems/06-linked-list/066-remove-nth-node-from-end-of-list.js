/**
 * 066 — Remove Nth Node From End of List
 * Difficulty: Medium   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the head of a linked list, remove the nth node from the end and return the head.
 *   Try to do it in one pass.
 *
 * CONSTRAINTS
 *   The list holds 1 to 30 nodes.
 *   1 <= n <= number of nodes
 *   -100 <= Node.val <= 100
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   removeNthFromEnd(1 -> 2 -> 3 -> 4 -> 5, n = 2)   ->  1 -> 2 -> 3 -> 5
 *   removeNthFromEnd(1, n = 1)                       ->  null
 *   removeNthFromEnd(1 -> 2, n = 2)                  ->  2  // removes the head
 *   removeNthFromEnd(1 -> 2, n = 1)                  ->  1  // removes the tail
 *   removeNthFromEnd(1 -> 2 -> 3 -> 4 -> 5, n = 5)   ->  2 -> 3 -> 4 -> 5  // n = length
 *   removeNthFromEnd(-1 -> 0 -> 1, n = 3)            ->  0 -> 1  // negatives
 *
 * EDGE CASES
 *   - Removing the head itself.
 *   - A single-node list becomes empty.
 *   - n counts from the END, not the start.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. A dummy node placed before the head removes the special case of deleting the head.
 *
 * COMPLEXITY
 *   Naive:  O(n) time, two passes — measure the length, then walk to position (length - n).
 *   Target: O(n) time, O(1) space, one pass — advance a lead pointer n steps, then move both
 *           until the lead hits the end.
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

function removeNthFromEnd(head, n) {
  // TODO: your solution here
}

module.exports = { removeNthFromEnd };
