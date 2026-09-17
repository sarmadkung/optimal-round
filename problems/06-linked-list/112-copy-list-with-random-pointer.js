/**
 * 112 — Copy List with Random Pointer
 * Difficulty: Medium   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A linked list where each node has a `next` and a `random` pointer (which may point at
 *   any node or null). Return a DEEP COPY: new nodes whose pointers mirror the original
 *   structure but reference only copied nodes.
 *
 * CONSTRAINTS
 *   0 <= n <= 1000
 *   -10^4 <= Node.val <= 10^4
 *   Each random pointer is null or points to a node in the list.
 *
 * INPUT FORMAT
 *   `head` is a Node object, not an array. The array in EXAMPLES is how the platforms print this
 *   list: each entry is [val, randomIndex], where randomIndex is the index the `random` pointer
 *   targets, or null. The nodes themselves are linked by `next`.
 *
 * EXAMPLES
 *   copyRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]])
 *     ->  an identical list built entirely from new nodes
 *   copyRandomList(null)              ->  null
 *   copyRandomList([[1,null]])        ->  [[1,null]]   // one node, random is null
 *   copyRandomList([[1,0]])           ->  [[1,0]]   // random points at the node itself
 *   copyRandomList([[1,1],[2,1]])     ->  [[1,1],[2,1]]   // both randoms point forward
 *   copyRandomList([[-1,1],[-2,0]])   ->  [[-1,1],[-2,0]]   // randoms cross, negative values
 *
 * EDGE CASES
 *   - An empty list.
 *   - A random pointer may point backwards, forwards, at the node itself, or be null.
 *   - The copy must share NO node objects with the original.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each random pointer, walk the original list to find its index, then
 *           walk the copy to the same index.
 *   Target: O(n) time, O(n) space — a map from original node to copy, filled in a first pass and
 *           used to wire pointers in a second. (O(1) space is possible by interleaving copies
 *           into the original list.)
 * ----------------------------------------------------------------------
 */

/**
 * Definition for a node with an extra random pointer — as a platform provides it:
 *
 *   class Node {
 *     constructor(val, next = null, random = null) {
 *       this.val = val;
 *       this.next = next;
 *       this.random = random;
 *     }
 *   }
 */
class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head) {
  // TODO: your solution here
}

module.exports = { copyRandomList, Node };
