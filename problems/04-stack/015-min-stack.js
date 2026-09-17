/**
 * 015 — Min Stack
 * Difficulty: Medium   ·   Topic: Stack
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a stack supporting push, pop, top and retrieving the minimum element,
 *   EVERY operation in O(1) time.
 *   Implement the MinStack class with push(val), pop(), top() and getMin().
 *
 * CONSTRAINTS
 *   -2^31 <= val <= 2^31 - 1
 *   pop, top and getMin are only called on a non-empty stack.
 *   At most 3 * 10^4 calls are made.
 *   getMin must run in O(1) time.
 *
 * API
 *   new MinStack()             initialize an empty stack
 *   push(val)       -> void    push val onto the stack
 *   pop()           -> void    remove the element on top of the stack
 *   top()           -> number  return the element on top of the stack
 *   getMin()        -> number  return the minimum element currently in the stack
 *
 * EXAMPLES
 *   const st = new MinStack();
 *   st.push(-2); st.push(0); st.push(-3);
 *   st.getMin()                          ->  -3
 *   st.pop(); st.top()  ->  0;  st.getMin()  ->  -2
 *
 *   const a = new MinStack(); a.push(5);
 *   a.top()  ->  5;  a.getMin()          ->  5    // one element is both top and min
 *
 *   const b = new MinStack(); b.push(2); b.push(2); b.push(1); b.pop();
 *   b.getMin()                           ->  2    // a duplicated min must survive one pop
 *
 *   const c = new MinStack(); c.push(3); c.push(1); c.pop(); c.push(4);
 *   c.getMin()                           ->  3    // popping the min restores the previous one
 *
 *   const d = new MinStack(); d.push(7); d.push(7); d.push(7); d.pop();
 *   d.getMin()                           ->  7    // all-equal values
 *
 *   const one = new MinStack();
 *   one.push(7);
 *   one.top()  ->  7;  one.getMin()  ->  7    // single element: top is also the min
 *
 *   const dup = new MinStack();
 *   dup.push(2); dup.push(2); dup.push(5);
 *   dup.getMin()  ->  2
 *   dup.pop(); dup.pop(); dup.getMin()  ->  2  // duplicate minimum survives one pop
 *
 *   const asc = new MinStack();
 *   asc.push(1); asc.push(3); asc.push(5);
 *   asc.getMin()  ->  1                        // min stays at the bottom, never on top
 *
 *   const neg = new MinStack();
 *   neg.push(0); neg.push(-1);
 *   neg.getMin()  ->  -1
 *   neg.pop(); neg.getMin()  ->  0             // popping the min restores the previous one
 *
 * EDGE CASES
 *   - Duplicate minimums must survive a single pop.
 *   - Negative values.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) getMin — scan the whole stack on every call.
 *   Target: O(1) for every operation — keep a parallel stack (or store [val, minSoFar] pairs) so
 *           each entry carries the minimum beneath it.
 * ----------------------------------------------------------------------
 */

class MinStack {
  // TODO: your solution here
}

module.exports = { MinStack };
