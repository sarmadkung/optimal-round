/**
 * 020 — Reverse Linked List
 * Difficulty: Easy   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the head of a singly linked list, reverse the list and return the new head.
 *   A node is { val, next }.
 *
 * CONSTRAINTS
 *   The list holds 0 to 5000 nodes.
 *   -5000 <= Node.val <= 5000
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   reverseList(1 -> 2 -> 3 -> 4 -> 5)  ->  5 -> 4 -> 3 -> 2 -> 1
 *   reverseList(1 -> 2)                 ->  2 -> 1
 *   reverseList(null)                   ->  null
 *   reverseList(1)                      ->  1   // a single node is its own reverse
 *   reverseList(-3 -> 0 -> 3)           ->  3 -> 0 -> -3   // negatives
 *   reverseList(7 -> 7 -> 7)            ->  7 -> 7 -> 7   // duplicates look unchanged
 *
 * EDGE CASES
 *   - Empty list.
 *   - Single node.
 *
 * FOLLOW-UP
 *   - A linked list can be reversed either iteratively or recursively. Could you implement both?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Save `next` BEFORE rewriting the pointer or you lose the rest of the list.
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — copy values into an array and rebuild.
 *   Target: O(n) time, O(1) space — iterate with prev/curr/next pointers, re-linking as you go.
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

function reverseList(head) {
  // TODO: your solution here
}

module.exports = { reverseList };
