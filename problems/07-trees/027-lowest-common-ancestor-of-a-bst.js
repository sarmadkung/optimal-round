/**
 * 027 — Lowest Common Ancestor of a BST
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a binary search tree and two nodes `p` and `q` present in it, return their
 *   lowest common ancestor. A node may be a descendant of itself.
 *
 * CONSTRAINTS
 *   The tree holds 2 to 10^5 nodes.
 *   All Node.val are unique; p != q; both exist in the tree.
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   lowestCommonAncestor([6,2,8,0,4,7,9], 2, 8)  ->  6
 *   lowestCommonAncestor([6,2,8,0,4,7,9], 2, 4)  ->  2  // a node descends from itself
 *   lowestCommonAncestor([2,1], 2, 1)            ->  2
 *   lowestCommonAncestor([6,2,8,0,4,7,9], 0, 9)  ->  6  // the split happens at the root
 *   lowestCommonAncestor([6,2,8,0,4,7,9], 9, 7)  ->  8  // p > q, so do not assume an order
 *   lowestCommonAncestor([2,null,3], 3, 2)       ->  2  // right-skewed two-node tree
 *
 * EDGE CASES
 *   - One node is the ancestor of the other.
 *   - p may be larger than q — do not assume an order.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Use the BST property; a generic tree search wastes it.
 *
 * COMPLEXITY
 *   Naive:  O(n) time — find both root-to-node paths and compare them.
 *   Target: O(h) time, O(1) space — walk down: go left while both values are smaller, right while
 *           both are larger; the first split is the answer.
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

function lowestCommonAncestor(root, p, q) {
  // TODO: your solution here
}

module.exports = { lowestCommonAncestor };
