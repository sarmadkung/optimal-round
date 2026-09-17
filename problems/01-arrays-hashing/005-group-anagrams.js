/**
 * 005 — Group Anagrams
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of strings `strs`, group the anagrams together.
 *   Return the groups in any order; the strings inside a group may be in any order.
 *
 * CONSTRAINTS
 *   1 <= strs.length <= 10^4
 *   0 <= strs[i].length <= 100
 *   strs[i] consists of lowercase English letters.
 *
 * EXAMPLES
 *   groupAnagrams(["eat","tea","tan","ate","nat","bat"])
 *     ->  [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 *   groupAnagrams(["ab","ba","abc","cba","bac"])
 *     ->  [["ab","ba"], ["abc","cba","bac"]]   // groups and members may be in any order
 *   groupAnagrams([""])            ->  [[""]]   // the empty string is its own group
 *   groupAnagrams(["a"])           ->  [["a"]]   // single string
 *   groupAnagrams(["abc", "def"])  ->  [["abc"], ["def"]]   // no anagrams at all
 *   groupAnagrams(["", "", "a"])   ->  [["", ""], ["a"]]   // equal empty strings group together
 *
 * EDGE CASES
 *   - The empty string is its own group.
 *   - Single-character strings.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Words of different lengths can never be anagrams.
 *
 * COMPLEXITY
 *   Naive:  O(n^2 * k) time — compare each string against every group.
 *   Target: O(n * k) time — key each string by a 26-slot character count (or its sorted form) in
 *           a hash map.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Sort the letters of each word to build a grouping key
// 1. Sorting a word's letters gives all its anagrams the same key: "eat" and "tea" both become "aet".
// 2. Store the original words in a map under that key.
// 3. The answer is the map's values.
// Time O(n * k log k) for n words of length k, space O(n * k).
function groupAnagrams(strs) {
  // Sorting + Map
  const groupMap = new Map()
  for (let word of strs){
    let sortedWord = word.split("").sort().join("");
    if(!groupMap.has(sortedWord)){
      groupMap.set(sortedWord,[word]);
    } else {
      groupMap.get(sortedWord).push(word)
    }
  }
  return [...groupMap.values()]
}

module.exports = { groupAnagrams };
