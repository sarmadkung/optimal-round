/**
 * 114 — Binary Tree Right Side View
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, imagine standing to its right.
 *   Return the values of the nodes visible from top to bottom.
 *
 * CONSTRAINTS
 *   The tree holds 0 to 100 nodes.
 *   -100 <= Node.val <= 100
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   rightSideView([1, 2, 3, null, 5, null, 4])  ->  [1, 3, 4]
 *   rightSideView([1, null, 3])                 ->  [1, 3]
 *   rightSideView(null)                         ->  []
 *   rightSideView([1])                          ->  [1]   // a single node
 *   rightSideView([1, 2, 3, 4, 5, 6, 7])        ->  [1, 3, 7]   // perfectly balanced
 *   rightSideView([1, 2, null, 3, null, 4])     ->  [1, 2, 3, 4]  // a left-only tree shows all
 *
 * EDGE CASES
 *   - An empty tree returns an empty array.
 *   - The visible node is the LAST at each level, which is not always a right child.
 *   - A left-only tree shows every one of its nodes.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Walking only right children is wrong — it misses left nodes whose level has no right
 *           sibling.
 *   Target: O(n) time — a level-order BFS taking the final node of each level, or a DFS visiting
 *           right before left and recording the first node seen at each new depth.
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

function rightSideView(root) {
  // TODO: your solution here
}

module.exports = { rightSideView };
