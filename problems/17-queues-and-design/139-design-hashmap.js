/**
 * 139 — Design HashMap
 * Difficulty: Easy   ·   Topic: Queues & Design
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a HashMap without using any built-in hash table library.
 *   Support put(key, value), get(key) returning -1 if absent, and remove(key).
 *
 * CONSTRAINTS
 *   0 <= key, value <= 10^6
 *   At most 10^4 calls are made.
 *
 * API
 *   new MyHashMap()             initialize an empty map
 *   put(key, value)  -> void    insert the pair, or update the value if key is already present
 *   get(key)         -> number  return the value for key, or -1 if it is absent
 *   remove(key)      -> void    remove key and its value if present
 *
 * EXAMPLES
 *   const m = new MyHashMap();
 *   m.put(1, 1); m.put(2, 2);
 *   m.get(1)                ->  1
 *   m.get(3)                ->  -1   // an absent key returns -1, not undefined
 *   m.put(1, 10); m.get(1)  ->  10   // put on an existing key updates
 *   m.remove(2); m.get(2)   ->  -1
 *   m.remove(99);                    // removing an absent key is a no-op
 *   m.put(0, 0); m.get(0)   ->  0    // 0 is a legal key and a legal value
 *   m.put(1000000, 7);
 *   m.get(1000000)          ->  7    // the largest permitted key
 *
 * EDGE CASES
 *   - A missing key returns -1, not undefined.
 *   - put on an existing key updates rather than duplicating.
 *   - Collisions must be handled — this is the point of the exercise.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  A single array of size 10^6 works here but does not generalize and wastes memory.
 *   Target: O(1) average — an array of buckets indexed by hash, each bucket a list handling
 *           collisions by chaining.
 * ----------------------------------------------------------------------
 */

class MyHashMap {
  // TODO: your solution here
}

module.exports = { MyHashMap };
