/**
 * 071 — Diameter of Binary Tree
 * Difficulty: Easy   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, return its diameter: the length of the longest path
 *   between any two nodes, measured in EDGES. The path need not pass through the root.
 *
 * CONSTRAINTS
 *   The tree holds 1 to 10^4 nodes.
 *   -100 <= Node.val <= 100
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   diameterOfBinaryTree([1, 2, 3, 4, 5])           ->  3   // path 4 - 2 - 1 - 3
 *   diameterOfBinaryTree([1, 2])                    ->  1
 *   diameterOfBinaryTree([1])                       ->  0   // a single node has no edges
 *   diameterOfBinaryTree([1, 2, 3, 4, 5, 6, 7])     ->  4   // perfectly balanced: 4 - 2 - 1 - 3 - 6
 *   diameterOfBinaryTree([1, null, 2, null, 3])     ->  2   // a skewed chain of three nodes
 *   diameterOfBinaryTree([1, 2, null, 3, null, 4])  ->  3   // left-skewed chain of four
 *
 * EDGE CASES
 *   - A single node has diameter 0, not 1.
 *   - Edges, not nodes: a path of k nodes has k - 1 edges.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. The longest path often avoids the root entirely.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — compute both subtree heights afresh at every node.
 *   Target: O(n) time, O(h) space — one DFS returning height while updating a running best of
 *           (leftHeight + rightHeight) at each node.
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

function diameterOfBinaryTree(root) {
  // TODO: your solution here
}

module.exports = { diameterOfBinaryTree };
