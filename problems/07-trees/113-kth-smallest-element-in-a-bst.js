/**
 * 113 — Kth Smallest Element in a BST
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary search tree and an integer `k`, return the kth smallest
 *   value in the tree (1-indexed).
 *
 * CONSTRAINTS
 *   The tree holds n nodes, 1 <= k <= n <= 10^4
 *   0 <= Node.val <= 10^4
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   kthSmallest([3, 1, 4, null, 2], k = 1)              ->  1
 *   kthSmallest([5, 3, 6, 2, 4, null, null, 1], k = 3)  ->  3
 *   kthSmallest([1], k = 1)                             ->  1
 *   kthSmallest([3, 1, 4, null, 2], k = 4)              ->  4   // k = n gives the maximum
 *   kthSmallest([2, 1, 3], k = 2)                       ->  2   // perfectly balanced BST
 *   kthSmallest([1, null, 2, null, 3], k = 3)           ->  3   // right-skewed BST
 *
 * EDGE CASES
 *   - k is 1-indexed, so k = 1 is the minimum.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. An in-order traversal of a BST is sorted — that is the whole trick.
 *   2. You can stop as soon as the kth value is reached; no need to finish the traversal.
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — collect all values and sort them, discarding the BST property.
 *   Target: O(h + k) time — an in-order traversal (iterative with a stack) that counts nodes and
 *           returns the moment the counter hits k.
 * ----------------------------------------------------------------------
 */

const { TreeNode } = require('../_lib/structures');

/**
 * Definition for a binary tree node — available here exactly as a platform provides it:
 *
 *   class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *       this.val = val;
 *       this.left = left;
 *       this.right = right;
 *     }
 *   }
 */

function kthSmallest(root, k) {
  // TODO: your solution here
}

module.exports = { kthSmallest };
