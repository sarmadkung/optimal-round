/**
 * 072 — Binary Tree Maximum Path Sum
 * Difficulty: Hard   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   A path is any sequence of nodes connected by edges, appearing at most once each, and
 *   need not pass through the root. Return the maximum sum of node values along any path.
 *
 * CONSTRAINTS
 *   The tree holds 1 to 3 * 10^4 nodes.
 *   -1000 <= Node.val <= 1000
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   maxPathSum([1, 2, 3])                        ->  6   // 2 + 1 + 3
 *   maxPathSum([-10, 9, 20, null, null, 15, 7])  ->  42  // 15 + 20 + 7
 *   maxPathSum([-3])                             ->  -3  // all-negative tree
 *   maxPathSum([2, -1])                          ->  2   // the negative child is dropped
 *   maxPathSum([-2, -1])                         ->  -1  // best is the single largest node
 *   maxPathSum([1, -2, -3, 1, 3, -2, null, -1])  ->  3   // the best path avoids the root
 *
 * EDGE CASES
 *   - All values negative — the answer is the single largest node, never 0.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. A path may bend at a node, but what you RETURN upward may not.
 *   2. Clamp a negative subtree contribution to 0 before adding it.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — evaluate every possible path from every node.
 *   Target: O(n) time, O(h) space — DFS returning the best straight-line downward sum, while
 *           separately tracking the best bent path seen.
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

function maxPathSum(root) {
  // TODO: your solution here
}

module.exports = { maxPathSum };
