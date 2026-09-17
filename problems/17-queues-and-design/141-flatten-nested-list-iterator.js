/**
 * 141 — Flatten Nested List Iterator
 * Difficulty: Medium   ·   Topic: Queues & Design
 * ----------------------------------------------------------------------
 * PROBLEM
 *   You are given a nested list of integers, where each element is either an integer or a
 *   list whose elements are also integers or lists.
 *   Implement an iterator with next() and hasNext() that flattens it.
 *
 * CONSTRAINTS
 *   1 <= nestedList.length <= 500
 *   Integer values are in the range [-10^6, 10^6].
 *
 * API
 *   new NestedIterator(nestedList)              initialize the iterator over a nested list
 *   next()                          -> number   return the next integer in the flattened order
 *   hasNext()                       -> boolean  return true if an integer remains
 *
 * EXAMPLES
 *   const it = new NestedIterator([[1, 1], 2, [1, 1]]);
 *     iterating gives  ->  [1, 1, 2, 1, 1]
 *   Below, the result is what draining the iterator with next() yields.
 *   new NestedIterator([1, [4, [6]]])            ->  [1, 4, 6]
 *   new NestedIterator([1, 2, 3])                ->  [1, 2, 3]   // already flat
 *   new NestedIterator([[[[5]]]])                ->  [5]         // deeply nested
 *   new NestedIterator([[]])                     ->  []          // hasNext() is false at once
 *   new NestedIterator([[], [1], [], [2, [3]]])  ->  [1, 2, 3]   // empty lists are skipped
 *
 * EDGE CASES
 *   - Empty nested lists contribute nothing and must be skipped.
 *   - Nesting can be arbitrarily deep.
 *   - hasNext() may need to descend through several empty lists before answering.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  Flattening everything eagerly in the constructor is simple but defeats the purpose of
 *           an iterator and costs O(n) memory up front.
 *   Target: O(1) amortized per next() — a stack of iterators or reversed elements, unwrapping
 *           lists lazily only when hasNext() is called.
 * ----------------------------------------------------------------------
 */

class NestedIterator {
  // TODO: your solution here
}

module.exports = { NestedIterator };
