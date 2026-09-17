/**
 * 023 — LRU Cache
 * Difficulty: Medium   ·   Topic: Linked List
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a Least Recently Used cache with a fixed positive capacity.
 *   get(key) returns the value or -1; put(key, value) inserts or updates, evicting the
 *   least recently used key when over capacity. Both must run in O(1) average time.
 *
 * CONSTRAINTS
 *   1 <= capacity <= 3000
 *   0 <= key <= 10^4, 0 <= value <= 10^5
 *   At most 2 * 10^5 calls to get and put.
 *
 * API
 *   new LRUCache(capacity)             initialize the cache with a positive capacity
 *   get(key)                -> number  return the value for key, or -1 if it is absent
 *   put(key, value)         -> void    insert or update key; evict the least recently used key if
 *                                      over capacity
 *
 * EXAMPLES
 *   const c = new LRUCache(2);
 *   c.put(1, 1); c.put(2, 2); c.get(1)  ->  1
 *   c.put(3, 3);            // evicts key 2, because the get(1) above refreshed key 1
 *   c.get(2)                            ->  -1
 *   c.get(3)                            ->  3
 *   c.put(1, 10); c.get(1)              ->  10   // an update refreshes and does not grow the size
 *
 *   const one = new LRUCache(1);
 *   one.put(1, 1); one.put(2, 2);
 *   one.get(1)                          ->  -1   // capacity 1: every put evicts the previous key
 *   one.get(2)                          ->  2
 *   new LRUCache(2).get(42)             ->  -1   // reading an absent key from an empty cache
 *
 *   const d = new LRUCache(1);
 *   d.put(1, 1); d.put(2, 2); d.get(1)  ->  -1   // capacity 1 evicts on every new key
 *   d.get(2)                            ->  2
 *
 * EDGE CASES
 *   - A `get` counts as a use and refreshes recency.
 *   - Updating an existing key also refreshes it and must not grow the size.
 *   - Capacity of 1.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) per operation — an array scanned for the oldest entry.
 *   Target: O(1) per operation — a hash map to nodes of a doubly linked list (or exploit JS Map
 *           insertion order).
 * ----------------------------------------------------------------------
 */

class LRUCache {
  // TODO: your solution here
}

module.exports = { LRUCache };
