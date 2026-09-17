/**
 * 164 — Contains Duplicate II
 * Difficulty: Easy   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` and an integer `k`, return true if there are two DISTINCT
 *   indices i and j such that nums[i] == nums[j] and |i - j| <= k.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   -10^9 <= nums[i] <= 10^9
 *   0 <= k <= 10^5
 *
 * EXAMPLES
 *   containsNearbyDuplicate([1, 2, 3, 1], 3)        ->  true
 *   containsNearbyDuplicate([1, 0, 1, 1], 1)        ->  true
 *   containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)  ->  false   // duplicates exist, but too far apart
 *   containsNearbyDuplicate([1, 1], 1)              ->  true   // adjacent duplicates
 *   containsNearbyDuplicate([1, 1], 0)              ->  false   // k = 0 can never succeed
 *   containsNearbyDuplicate([1, 2, 3, 1], 10)       ->  true   // k larger than the array
 *
 * EDGE CASES
 *   - k = 0 can never succeed — the indices must be distinct.
 *   - k larger than the array length behaves like plain Contains Duplicate.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. You only ever care about the last k values you have seen.
 *
 * COMPLEXITY
 *   Naive:  O(n * k) time — for every index, scan the next k elements.
 *   Target: O(n) time, O(min(n, k)) space — a sliding-window Set of the last k values (or a map
 *           of value -> last index seen).
 * ----------------------------------------------------------------------
 */

// SOLUTION: Hash map of value -> the last index it was seen at
// 1. Store the most recent index for every value.
// 2. When a value repeats, check the gap to that stored index: a gap of k or less is a hit.
// 3. If the gap is too big, keep the newer index, since it gives later values a better chance.
// Time O(n), space O(n).
function containsNearbyDuplicate(nums, k) {

  let seen = new Map();

  for(let i=0;i<nums.length;i++){
    let current= nums[i];
    let isSeen = seen.has(current)
    if(isSeen){
      let previousIndex = seen.get(current);
      if(i - previousIndex <= k){
        return true
      } else {
        seen.set(current,i);
      }
    } else {
      seen.set(current,i)
    }
  }
  return false
}

module.exports = { containsNearbyDuplicate };
