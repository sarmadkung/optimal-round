/**
 * 116 — Serialize and Deserialize Binary Tree
 * Difficulty: Hard   ·   Topic: Trees
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design an algorithm to serialize a binary tree to a string and deserialize that string
 *   back into the identical tree. There is no restriction on the format you choose.
 *
 * CONSTRAINTS
 *   The tree holds 0 to 10^4 nodes.
 *   -1000 <= Node.val <= 1000
 *
 * API
 *   new Codec()                     initialize the codec
 *   serialize(root)    -> string    encode a tree as a string; the format is yours to choose
 *   deserialize(data)  -> TreeNode  decode a string produced by serialize back into the identical
 *                                   tree
 *
 * INPUT FORMAT
 *   `root` is a TreeNode object, not an array. The arrays in EXAMPLES are the level-order
 *   serialization the platforms print — breadth-first, with `null` for a missing child. The
 *   test runner builds a real tree from that array before calling your function.
 *
 * EXAMPLES
 *   serialize([1, 2, 3, null, null, 4, 5])  ->  e.g. "1,2,#,#,3,4,#,#,5,#,#"
 *   deserialize(that string)                ->  a tree identical to the original
 *   serialize(null)                         ->  a string that deserializes back to null
 *   serialize([1])                          ->  e.g. "1,#,#"   // a single node
 *   serialize([1, null, 2])                 ->  e.g. "1,#,2,#,#"   // right child only
 *   serialize([-1, null, -2])               ->  e.g. "-1,#,-2,#,#"   // '-' cannot be a separator
 *
 * EDGE CASES
 *   - An empty tree must round-trip correctly.
 *   - Null children MUST be encoded, or the shape is ambiguous.
 *   - Negative values mean you cannot use '-' as a separator.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Storing only the values without null markers loses the structure — the tree cannot be
 *           rebuilt.
 *   Target: O(n) for both directions — a pre-order walk emitting a sentinel for null, rebuilt by
 *           consuming the tokens in the same order.
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

class Codec {
  // TODO: your solution here
}

module.exports = { Codec };
