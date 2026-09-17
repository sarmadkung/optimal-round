/**
 * 026 — Validate Binary Search Tree
 * Difficulty: Medium   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, determine whether it is a valid binary search tree:
 *   every node in a left subtree is strictly less than the node, every node in a right
 *   subtree is strictly greater, and both subtrees are themselves valid BSTs.
 *
 * CONSTRAINTS
 *   The tree holds 1 to 10^4 nodes.
 *   -2^31 <= Node.val <= 2^31 - 1
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   isValidBST([2, 1, 3])                         ->  true
 *   isValidBST([5, 1, 4, null, null, 3, 6])       ->  false  // 3 sits left of 5 but under 4
 *   isValidBST([1, 1])                            ->  false  // equal values are not allowed
 *   isValidBST([1])                               ->  true   // a single node is a valid BST
 *   isValidBST([1, null, 2, null, 3])             ->  true   // a right-skewed chain still qualifies
 *   isValidBST([-2147483648, null, 2147483647])   ->  true   // the 32-bit extremes are legal values
 *
 * EDGE CASES
 *   - Duplicate values make it invalid.
 *   - Node values can reach the 32-bit limits.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Comparing only against the immediate parent is the classic wrong answer.
 *   2. Seed the recursion's bounds with +/-Infinity so genuine 32-bit extremes still pass.
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — for each node scan its whole subtree for violations.
 *   Target: O(n) time, O(h) space — carry a (min, max) bound down the recursion, or verify that
 *           an in-order traversal is strictly increasing.
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

function isValidBST(root) {
  // TODO: your solution here
}

module.exports = { isValidBST };
