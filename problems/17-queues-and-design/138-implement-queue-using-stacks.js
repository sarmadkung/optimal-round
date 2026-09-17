/**
 * 138 — Implement Queue using Stacks
 * Difficulty: Easy   ·   Topic: Queues & Design
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Implement a FIFO queue using only two stacks. Support push(x), pop(), peek() and
 *   empty(). You may only use standard stack operations.
 *   Each operation should be O(1) AMORTIZED.
 *
 * CONSTRAINTS
 *   1 <= x <= 9
 *   At most 100 calls are made.
 *   pop and peek are only called on a non-empty queue.
 *
 * API
 *   new MyQueue()              initialize an empty queue
 *   push(x)        -> void     push x to the back of the queue
 *   pop()          -> number   remove and return the element at the front
 *   peek()         -> number   return the element at the front without removing it
 *   empty()        -> boolean  return true if the queue is empty
 *
 * EXAMPLES
 *   const q = new MyQueue();
 *   q.empty()  ->  true    // nothing pushed yet
 *   q.push(1); q.push(2);
 *   q.peek()   ->  1
 *   q.pop()    ->  1
 *   q.empty()  ->  false
 *   q.push(3);
 *   q.pop()    ->  2       // FIFO survives an interleaved push
 *   q.pop()    ->  3
 *
 * EDGE CASES
 *   - All calls are guaranteed valid, so pop and peek are never called on an empty queue.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Moving every element on each operation gives O(n), not amortized O(1).
 *   2. Only transfer from the input stack to the output stack when the output stack is EMPTY.
 *   3. Each element is moved at most once, which is what makes it amortized O(1).
 *
 * COMPLEXITY
 *   Naive:  O(n) per operation — shuttle all elements between the stacks on every push or pop.
 *   Target: O(1) amortized — an input stack for pushes and an output stack for pops, refilled
 *           only when it runs empty.
 * ----------------------------------------------------------------------
 */

class MyQueue {
  // TODO: your solution here
}

module.exports = { MyQueue };
