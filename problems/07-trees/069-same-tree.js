/**
 * 069 — Same Tree
 * Difficulty: Easy   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given the roots of two binary trees, return true if they are structurally identical
 *   and every corresponding node holds the same value.
 *
 * CONSTRAINTS
 *   Each tree holds 0 to 100 nodes.
 *   -10^4 <= Node.val <= 10^4
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   isSameTree([1, 2, 3], [1, 2, 3])  ->  true
 *   isSameTree([1, 2], [1, null, 2])  ->  false  // same values, different shape
 *   isSameTree(null, null)            ->  true
 *   isSameTree([1], null)             ->  false  // one empty, one not
 *   isSameTree([1, 2, 1], [1, 1, 2])  ->  false  // mirrored children, not identical
 *   isSameTree([0, -1], [0, -1])      ->  true   // negatives compare like any other value
 *
 * EDGE CASES
 *   - Two empty trees are the same.
 *   - One empty and one not is false.
 *   - Structure matters as much as values.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Serialising both trees to strings and comparing works but allocates O(n) and is
 *           fragile about null markers.
 *   Target: O(n) time, O(h) space — compare the roots, then recurse into left-with-left and
 *           right-with-right.
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

function isSameTree(p, q) {
  // TODO: your solution here
}

module.exports = { isSameTree };
