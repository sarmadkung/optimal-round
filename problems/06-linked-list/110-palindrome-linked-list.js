/**
 * 110 — Palindrome Linked List
 * Difficulty: Easy   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the head of a singly linked list, return true if it reads the same forwards and
 *   backwards. Aim for O(n) time and O(1) space.
 *
 * CONSTRAINTS
 *   The list holds 1 to 10^5 nodes.
 *   0 <= Node.val <= 9
 *
 * INPUT FORMAT
 *   `head` is a ListNode object, not an array. The arrays in EXAMPLES list the node values in
 *   order; the test runner links them into real nodes before calling your function.
 *
 * EXAMPLES
 *   isPalindrome(1 -> 2 -> 2 -> 1)  ->  true
 *   isPalindrome(1 -> 2)            ->  false
 *   isPalindrome(1)                 ->  true
 *   isPalindrome(1 -> 2 -> 1)       ->  true   // odd length, middle node skipped
 *   isPalindrome(0 -> 0)            ->  true   // two equal nodes
 *   isPalindrome(1 -> 0 -> 1 -> 1)  ->  false  // nearly symmetric, but not quite
 *
 * EDGE CASES
 *   - A single node is a palindrome.
 *   - Odd lengths leave a middle node that can be skipped.
 *
 * FOLLOW-UP
 *   - Copying values to an array is O(n) space and misses the target.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — copy the values into an array and compare with two pointers.
 *   Target: O(n) time, O(1) space — find the middle with slow/fast pointers, reverse the second
 *           half, compare the halves, then restore the list.
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

function isPalindrome(head) {
  // TODO: your solution here
}

module.exports = { isPalindrome };
