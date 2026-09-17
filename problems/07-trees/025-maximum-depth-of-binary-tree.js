/**
 * 025 — Maximum Depth of Binary Tree
 * Difficulty: Easy   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, return its maximum depth: the number of nodes
 *   along the longest path from the root down to a leaf.
 *
 * CONSTRAINTS
 *   The tree holds 0 to 10^4 nodes.
 *   -100 <= Node.val <= 100
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   maxDepth([3, 9, 20, null, null, 15, 7])  ->  3
 *   maxDepth([1, null, 2])                   ->  2
 *   maxDepth(null)                           ->  0
 *   maxDepth([1])                            ->  1   // a single node has depth 1
 *   maxDepth([1, 2, 3, 4, 5, 6, 7])          ->  3   // perfectly balanced
 *   maxDepth([1, 2, null, 3, null, 4])       ->  4   // fully left-skewed, depth equals n
 *
 * EDGE CASES
 *   - Empty tree returns 0, not 1.
 *   - A single node has depth 1.
 *   - A degenerate (skewed) tree of 10^4 nodes can exhaust the recursion stack.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. An iterative BFS avoids the recursion depth entirely.
 *
 * COMPLEXITY
 *   Naive:  None — a full traversal is required either way.
 *   Target: O(n) time, O(h) space — 1 + max(depth(left), depth(right)), or a level-counting BFS.
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

function maxDepth(root) {
  // TODO: your solution here
}

module.exports = { maxDepth };
