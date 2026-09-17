/**
 * 068 — Merge k Sorted Lists
 * Difficulty: Hard   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given an array of `k` linked lists, each sorted ascending.
 *   Merge them into one sorted linked list and return its head.
 *
 * CONSTRAINTS
 *   0 <= k <= 10^4
 *   0 <= lists[i].length <= 500
 *   -10^4 <= Node.val <= 10^4
 *   The total node count will not exceed 10^4.
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   mergeKLists([1 -> 4 -> 5, 1 -> 3 -> 4, 2 -> 6])  ->  1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
 *   mergeKLists([])                                  ->  null
 *   mergeKLists([null])                              ->  null
 *   mergeKLists([1 -> 2 -> 3])                       ->  1 -> 2 -> 3   // a single list, as-is
 *   mergeKLists([null, null, null])                  ->  null   // every list empty
 *   mergeKLists([-2 -> 0, -1, null])                 ->  -2 -> -1 -> 0   // negatives, one empty
 *
 * EDGE CASES
 *   - An empty array of lists, or lists that are themselves empty.
 *   - A single list is returned as-is.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Merging one list at a time into an accumulator is O(kN) — too slow when k is large.
 *
 * COMPLEXITY
 *   Naive:  O(k * N) time — repeatedly merge the next list into a running result, rescanning the
 *           accumulator each time.
 *   Target: O(N log k) time — merge pairs of lists divide-and-conquer style, or pull from a
 *           size-k min-heap of list heads.
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

function mergeKLists(lists) {
  // TODO: your solution here
}

module.exports = { mergeKLists };
