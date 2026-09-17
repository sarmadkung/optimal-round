/**
 * 028 — Binary Tree Level Order Traversal
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, return its level-order traversal: the node values
 *   grouped level by level, from left to right.
 *
 * CONSTRAINTS
 *   The tree holds 0 to 2000 nodes.
 *   -1000 <= Node.val <= 1000
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   levelOrder([3, 9, 20, null, null, 15, 7])  ->  [[3], [9, 20], [15, 7]]
 *   levelOrder([1])                            ->  [[1]]
 *   levelOrder(null)                           ->  []
 *   levelOrder([1, 2, 3, 4, 5, 6, 7])          ->  [[1], [2, 3], [4, 5, 6, 7]]  // perfectly balanced
 *   levelOrder([1, null, 2, null, 3])          ->  [[1], [2], [3]]  // skewed: one node per level
 *   levelOrder([-1, -2, -3])                   ->  [[-1], [-2, -3]]  // negatives
 *
 * EDGE CASES
 *   - Empty tree returns an empty array.
 *   - Null children must not be enqueued.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Capture the queue size at the start of each level to know where it ends.
 *
 * COMPLEXITY
 *   Naive:  O(n * h) time — repeatedly walk the tree collecting one depth at a time.
 *   Target: O(n) time, O(n) space — a BFS queue, processing exactly one level per outer
 *           iteration.
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

function levelOrder(root) {
  // TODO: your solution here
}

module.exports = { levelOrder };
