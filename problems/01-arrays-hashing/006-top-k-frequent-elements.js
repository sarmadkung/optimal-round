/**
 * 006 — Top K Frequent Elements
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `nums` and an integer `k`, return the `k` most frequent
 *   elements. The answer may be returned in any order.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 10^5
 *   k is in the range [1, number of distinct elements]
 *   The answer is guaranteed to be unique.
 *
 * EXAMPLES
 *   topKFrequent([1, 1, 1, 2, 2, 3], 2)    ->  [1, 2]
 *   topKFrequent([1], 1)                   ->  [1]   // single element
 *   topKFrequent([1, 2], 2)                ->  [1, 2]   // every value ties at count 1; any order
 *   topKFrequent([4, 4, 4, 4], 1)          ->  [4]   // all identical
 *   topKFrequent([-1, -1, 2, 2, 2, 3], 2)  ->  [2, -1]   // negatives are valid keys; any order
 *   topKFrequent([1, 1, 2, 2, 3], 3)       ->  [1, 2, 3]   // k === number of distinct values
 *
 * EDGE CASES
 *   - k equals the number of distinct elements — return them all.
 *   - All elements identical.
 *   - Negative values are valid keys.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — count, then sort every distinct value by frequency.
 *   Target: O(n) time — bucket sort by frequency (a frequency can never exceed n), or a size-k
 *           heap for O(n log k).
 * ----------------------------------------------------------------------
 */

// SOLUTION: Count in a hash map, then sort by count
// 1. Count how many times each number appears.
// 2. Sort the map entries by count, highest first.
// 3. Take the first k keys.
// Time O(n log n) because of the sort, space O(n).
// The O(n) version is bucket sort: index an array by count instead of sorting.
function topKFrequent(nums, k) {
  let frequent = new Map();
  let result = [];

  for (let i=0;i<nums.length;i++){
    let num = nums[i];
    let isExist = frequent.has(num);
    if(isExist){
      frequent.set(num,frequent.get(num)+1)
    } else {
      frequent.set(num,1)
    }
  }

  let sortedMap = new Map([...frequent].sort((a,b)=>b[1]-a[1]))

  let start = 0;
  for (const [key,value] of sortedMap) {

    if(start===k){
      break;
    }
    result.push(key);
    start++
  }

  return result

}

module.exports = { topKFrequent };
