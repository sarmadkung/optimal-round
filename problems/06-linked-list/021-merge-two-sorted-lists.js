/**
 * 021 — Merge Two Sorted Lists
 * Difficulty: Easy   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given the heads of two sorted linked lists. Splice them together into one
 *   sorted list and return its head. The result must reuse the existing nodes.
 *
 * CONSTRAINTS
 *   Each list holds 0 to 50 nodes.
 *   -100 <= Node.val <= 100
 *   Both lists are sorted ascending.
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   mergeTwoLists(1 -> 2 -> 4, 1 -> 3 -> 4)      ->  1 -> 1 -> 2 -> 3 -> 4 -> 4
 *   mergeTwoLists(null, null)                    ->  null
 *   mergeTwoLists(null, 0)                       ->  0
 *   mergeTwoLists(1 -> 2 -> 3, null)             ->  1 -> 2 -> 3   // remainder attached as-is
 *   mergeTwoLists(2 -> 2, 2 -> 2)                ->  2 -> 2 -> 2 -> 2   // duplicates across lists
 *   mergeTwoLists(-100 -> -50, -75 -> 0 -> 100)  ->  -100 -> -75 -> -50 -> 0 -> 100
 *
 * EDGE CASES
 *   - Either or both lists empty.
 *   - Duplicate values across lists.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Remember to attach the non-empty remainder at the end.
 *
 * COMPLEXITY
 *   Naive:  O((m+n) log(m+n)) time — concatenate then sort, discarding the sorted structure.
 *   Target: O(m + n) time, O(1) space — a dummy head node plus two pointers, always taking the
 *           smaller front node.
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

function mergeTwoLists(list1, list2) {
  // TODO: your solution here
}

module.exports = { mergeTwoLists };
