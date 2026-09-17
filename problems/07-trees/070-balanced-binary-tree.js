/**
 * 070 — Balanced Binary Tree
 * Difficulty: Easy   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, determine whether it is height-balanced: every node's
 *   two subtrees differ in height by at most 1.
 *
 * CONSTRAINTS
 *   The tree holds 0 to 5000 nodes.
 *   -10^4 <= Node.val <= 10^4
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   isBalanced([3, 9, 20, null, null, 15, 7])          ->  true
 *   isBalanced([1, 2, 2, 3, 3, null, null, 4, 4])      ->  false
 *   isBalanced(null)                                   ->  true
 *   isBalanced([1])                                    ->  true   // a single node is balanced
 *   isBalanced([1, 2, 3, 4, 5, 6, 7])                  ->  true   // perfectly balanced
 *   isBalanced([1, null, 2, null, 3])                  ->  false  // a skewed chain of three
 *
 * EDGE CASES
 *   - An empty tree is balanced.
 *   - EVERY node must satisfy the condition, not just the root.
 *   - A skewed tree of 5000 nodes stresses the recursion depth.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — compute the height of both subtrees at every node independently.
 *   Target: O(n) time, O(h) space — one bottom-up pass returning a height, propagating a sentinel
 *           (-1) the moment imbalance is found.
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

function isBalanced(root) {
  // TODO: your solution here
}

module.exports = { isBalanced };
