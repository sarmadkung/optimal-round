/**
 * 095 — Implement Trie (Prefix Tree)
 * Difficulty: Medium   ·   Topic: Tries
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Implement a trie supporting insert(word), search(word) returning whether the exact
 *   word was inserted, and startsWith(prefix) returning whether any inserted word has
 *   that prefix.
 *
 * CONSTRAINTS
 *   1 <= word.length, prefix.length <= 2000
 *   All inputs consist of lowercase English letters.
 *   At most 3 * 10^4 calls are made.
 *
 * API
 *   new Trie()                      initialize an empty trie
 *   insert(word)        -> void     insert word into the trie
 *   search(word)        -> boolean  return true if word was inserted before
 *   startsWith(prefix)  -> boolean  return true if any inserted word begins with prefix
 *
 * EXAMPLES
 *   const t = new Trie();
 *   t.insert("apple");
 *   t.search("apple")      ->  true
 *   t.search("app")        ->  false   // inserted as a prefix only
 *   t.startsWith("app")    ->  true
 *   t.startsWith("apple")  ->  true    // a word is a prefix of itself
 *   t.startsWith("b")      ->  false
 *   t.insert("app"); t.insert("app");  // a duplicate insert is harmless
 *   t.search("app")        ->  true
 *
 * EDGE CASES
 *   - search must distinguish a full word from a mere prefix.
 *   - Inserting the same word twice is harmless.
 *   - The empty prefix matches anything (if permitted by constraints).
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Flag terminal nodes: a node that ends a word carries a boolean.
 *
 * COMPLEXITY
 *   Naive:  Storing words in an array makes startsWith O(n * L) per query.
 *   Target: O(L) per operation, where L is the word length — a node per character with a children
 *           map and an isEnd flag.
 * ----------------------------------------------------------------------
 */

class Trie {
  // TODO: your solution here
}

module.exports = { Trie };
