/**
 * 022 — Linked List Cycle
 * Difficulty: Easy   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the head of a linked list, determine whether the list contains a cycle.
 *   A cycle exists if some node can be reached again by continuously following `next`.
 *
 * CONSTRAINTS
 *   The list holds 0 to 10^4 nodes.
 *   -10^5 <= Node.val <= 10^5
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. A case is given as [values, pos], where `pos` is
 *   the index the tail's `next` points back to (-1 for no cycle). The test runner builds that
 *   list — the cycle is real, so never print or JSON.stringify the list.
 *
 * EXAMPLES
 *   hasCycle(3 -> 2 -> 0 -> -4 -> back to node 2)  ->  true
 *   hasCycle(1 -> 2 -> back to node 1)             ->  true
 *   hasCycle(1)                                    ->  false
 *   hasCycle(null)                                 ->  false  // empty list
 *   hasCycle(1 -> back to node 1)                  ->  true   // a node pointing at itself
 *   hasCycle(1 -> 1 -> 1)                          ->  false  // repeated values, no cycle
 *
 * EDGE CASES
 *   - Empty list and single node without a cycle.
 *   - A node whose `next` points at itself.
 *   - Values may repeat — identity, not value, defines the cycle.
 *
 * FOLLOW-UP
 *   - Can you solve it using O(1) (i.e. constant) memory?
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — record visited nodes in a Set.
 *   Target: O(n) time, O(1) space — Floyd's tortoise and hare: a slow and a fast pointer must
 *           meet inside any cycle.
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

function hasCycle(head) {
  // TODO: your solution here
}

module.exports = { hasCycle };
