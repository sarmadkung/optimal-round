/**
 * 115 — Construct Binary Tree from Preorder and Inorder Traversal
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given two arrays `preorder` and `inorder` representing the traversals of the same
 *   binary tree with unique values, reconstruct and return the tree.
 *
 * CONSTRAINTS
 *   1 <= preorder.length <= 3000
 *   inorder.length == preorder.length
 *   All values are unique, and inorder is a genuine in-order traversal of the same tree.
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])          ->  [3, 9, 20, null, null, 15, 7]
 *   buildTree([-1], [-1])                                    ->  [-1]
 *   buildTree([1, 2], [2, 1])                                ->  [1, 2]   // two nodes, leaning left
 *   buildTree([1, 2], [1, 2])                                ->  [1, null, 2]   // leaning right
 *   buildTree([1, 2, 3, 4], [4, 3, 2, 1])                    ->  [1, 2, null, 3, null, 4]   // skewed
 *   buildTree([1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7])  ->  [1, 2, 3, 4, 5, 6, 7]   // balanced
 *
 * EDGE CASES
 *   - A single node.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. preorder[0] is always the current subtree's root.
 *   2. Its index in inorder splits the left and right subtrees — the sizes must be carried
 *      carefully.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — a fresh linear scan of inorder to locate each root.
 *   Target: O(n) time — a value-to-index map over inorder for O(1) root lookup, recursing with
 *           index ranges rather than array slices.
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

function buildTree(preorder, inorder) {
  // TODO: your solution here
}

module.exports = { buildTree };
