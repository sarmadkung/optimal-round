/**
 * 118 — Word Ladder
 * Difficulty: Hard   ·   Topic: Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given `beginWord`, `endWord` and a `wordList`, a transformation sequence changes one
 *   letter at a time and every intermediate word must be in the list.
 *   Return the number of words in the shortest such sequence, or 0 if none exists.
 *
 * CONSTRAINTS
 *   1 <= beginWord.length <= 10
 *   1 <= wordList.length <= 5000
 *   All words are the same length, lowercase, and unique.
 *   beginWord need not be in wordList.
 *
 * EXAMPLES
 *   ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])  ->  5
 *   ladderLength("hit", "cog", ["hot","dot","dog","lot","log"])        ->  0
 *   ladderLength("a", "c", ["a","b","c"])                              ->  2
 *   ladderLength("hit", "hit", ["hit"])                                ->  1   // begin equals end
 *   ladderLength("hot", "dog", ["hot","dog"])                          ->  0   // 2 letters differ
 *   ladderLength("hot", "dog", ["hot","dot","dog"])                    ->  3   // via dot
 *
 * EDGE CASES
 *   - endWord absent from wordList makes it impossible — return 0.
 *   - The count INCLUDES both the begin and end words.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Comparing every pair of words to build edges is O(n^2 * L).
 *
 * COMPLEXITY
 *   Naive:  DFS explores paths that are not shortest and can blow up exponentially.
 *   Target: O(n * L * 26) time — BFS from beginWord, generating neighbors by substituting each
 *           of the 26 letters at each position and checking a Set.
 * ----------------------------------------------------------------------
 */

function ladderLength(beginWord, endWord, wordList) {
  // TODO: your solution here
}

module.exports = { ladderLength };
