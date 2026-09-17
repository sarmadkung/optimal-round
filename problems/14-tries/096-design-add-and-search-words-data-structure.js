/**
 * 096 — Design Add and Search Words Data Structure
 * Difficulty: Medium   ·   Topic: Tries
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a structure with addWord(word) and search(word), where the search string may
 *   contain '.' as a wildcard matching any single letter.
 *   Implement the WordDictionary class.
 *
 * CONSTRAINTS
 *   1 <= word.length <= 25
 *   addWord uses lowercase letters only; search may also use '.'.
 *   At most 10^4 calls are made.
 *
 * API
 *   new WordDictionary()              initialize an empty dictionary
 *   addWord(word)         -> void     add word to the dictionary
 *   search(word)          -> boolean  return true if any added word matches word, where '.'
 *                                     matches any single letter
 *
 * EXAMPLES
 *   const d = new WordDictionary();
 *   d.addWord("bad"); d.addWord("dad");
 *   d.search("pad")   ->  false
 *   d.search(".ad")   ->  true
 *   d.search("b..")   ->  true
 *   d.search("bad")   ->  true
 *   d.search("...")   ->  true    // all wildcards, and length 3 matches
 *   d.search("....")  ->  false   // longer than every stored word
 *
 * EDGE CASES
 *   - A search string may be entirely wildcards.
 *   - A search string longer than any stored word is false.
 *   - A word may be entirely wildcards.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. A '.' must try EVERY child, so search branches — this needs backtracking, not a single
 *      walk.
 *
 * COMPLEXITY
 *   Naive:  Scanning every stored word with a regex is O(n * L) per search.
 *   Target: A trie where search recurses: on a letter follow one child, on '.' recurse into all
 *           children and succeed if any branch matches.
 * ----------------------------------------------------------------------
 */

class WordDictionary {
  // TODO: your solution here
}

module.exports = { WordDictionary };
