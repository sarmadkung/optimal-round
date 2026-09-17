/**
 * 024 — Invert Binary Tree
 * Difficulty: Easy   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the root of a binary tree, invert it — swap every node's left and right
 *   children — and return the root. A node is { val, left, right }.
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
 *   invertTree([4,2,7,1,3,6,9])    ->  [4,7,2,9,6,3,1]
 *   invertTree([2,1,3])            ->  [2,3,1]
 *   invertTree(null)               ->  null
 *   invertTree([1])                ->  [1]   // a single node is its own inverse
 *   invertTree([1,2])              ->  [1,null,2]   // the lone left child moves right
 *   invertTree([1,null,2,null,3])  ->  [1,2,null,3]   // a right-skewed chain becomes left-skewed
 *
 * EDGE CASES
 *   - Empty tree.
 *   - A single node is its own inverse.
 *   - Skewed trees, where recursion depth equals n.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  There is no meaningfully worse approach — every node must be visited once.
 *   Target: O(n) time, O(h) space where h is the height — swap the children, then recurse into
 *           both sides.
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

function invertTree(root) {
  // TODO: your solution here
}

module.exports = { invertTree };
