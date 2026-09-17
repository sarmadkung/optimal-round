/**
 * 094 — Find Median from Data Stream
 * Difficulty: Hard   ·   Topic: Heap / Priority Queue
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a data structure supporting addNum(num) to ingest a stream of integers and
 *   findMedian() to return the median of everything seen so far.
 *   Implement the MedianFinder class.
 *
 * CONSTRAINTS
 *   -10^5 <= num <= 10^5
 *   findMedian is only called after at least one addNum.
 *   At most 5 * 10^4 calls are made.
 *
 * API
 *   new MedianFinder()             initialize an empty stream
 *   addNum(num)         -> void    add num to the stream
 *   findMedian()        -> number  return the median of everything added so far
 *
 * EXAMPLES
 *   const mf = new MedianFinder();
 *   mf.addNum(1); mf.addNum(2);
 *   mf.findMedian()                 ->  1.5
 *   mf.addNum(3);  mf.findMedian()  ->  2.0
 *   mf.addNum(4);  mf.findMedian()  ->  2.5   // even count averages 2 and 3
 *   mf.addNum(-5); mf.findMedian()  ->  2.0   // negatives are allowed
 *
 *   const one = new MedianFinder();
 *   one.addNum(6); one.findMedian()  ->  6.0   // a single number is its own median
 *
 *   const dup = new MedianFinder();
 *   dup.addNum(2); dup.addNum(2); dup.addNum(2);
 *   dup.findMedian()                 ->  2.0   // duplicates are kept, not collapsed
 *
 *   const one = new MedianFinder();
 *   one.addNum(7);  one.findMedian()  ->  7.0   // a single element is its own median
 *   one.addNum(7);  one.findMedian()  ->  7.0   // duplicates are kept
 *
 * EDGE CASES
 *   - An even count averages the two middle values and may return a non-integer.
 *   - A single element is its own median.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Re-sorting on every insert is far too slow at 5 * 10^4 calls.
 *
 * COMPLEXITY
 *   Naive:  O(n log n) per query — keep an array and sort it on each findMedian call.
 *   Target: O(log n) insert, O(1) query — two heaps: a max-heap for the lower half and a min-heap
 *           for the upper, kept balanced within one element.
 * ----------------------------------------------------------------------
 */

class MedianFinder {
  // TODO: your solution here
}

module.exports = { MedianFinder };
