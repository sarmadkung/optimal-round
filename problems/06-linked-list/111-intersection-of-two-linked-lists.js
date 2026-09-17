/**
 * 111 — Intersection of Two Linked Lists
 * Difficulty: Easy   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the heads of two singly linked lists, return the node where they intersect,
 *   or null if they never do. Intersection is by NODE IDENTITY, not value.
 *   Aim for O(1) extra space.
 *
 * CONSTRAINTS
 *   The lists hold 1 to 3 * 10^4 nodes each.
 *   1 <= Node.val <= 10^5
 *   The lists retain their original structure.
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   listA = 4 -> 1 -> 8 -> 4 -> 5, listB = 5 -> 6 -> 1 -> 8 -> 4 -> 5
 *     getIntersectionNode(listA, listB)     ->  the node holding 8
 *   Two entirely separate lists             ->  null
 *   listA = 1 -> 9 -> 1 -> 2 -> 4, listB = 3 -> 2 -> 4, sharing the 2 -> 4 tail
 *     getIntersectionNode(listA, listB)     ->  the node holding 2
 *   Both heads are the very same node 7     ->  that node  // a list may intersect at its head
 *   listA = 1 -> 3, listB is listA's second node
 *     getIntersectionNode(listA, listB)     ->  the node holding 3
 *   listA = 1 -> 1 -> 1 -> 1, listB = 1 -> 1 -> 1, sharing only the last node
 *     getIntersectionNode(listA, listB)     ->  that last node  // equal values prove nothing
 *
 * EDGE CASES
 *   - Lists of different lengths — the classic difficulty.
 *   - Equal values do not imply intersection; compare node references.
 *   - No intersection must return null, not a value.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(m * n) time — compare every node of A against every node of B. O(n) space if you
 *           use a visited Set.
 *   Target: O(m + n) time, O(1) space — walk both lists, and on reaching the end switch to the
 *           other list's head; the pointers meet at the intersection (or both hit null).
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

function getIntersectionNode(headA, headB) {
  // TODO: your solution here
}

module.exports = { getIntersectionNode };
