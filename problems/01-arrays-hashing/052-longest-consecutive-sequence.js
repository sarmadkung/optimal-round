/**
 * 052 — Longest Consecutive Sequence
 * Difficulty: Medium   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an unsorted array `nums`, return the length of the longest sequence of
 *   consecutive integers in it. The elements need not be adjacent in the array.
 *   Must run in O(n) time.
 *
 * CONSTRAINTS
 *   0 <= nums.length <= 10^5
 *   -10^9 <= nums[i] <= 10^9
 *   Your solution must run in O(n) time.
 *
 * EXAMPLES
 *   longestConsecutive([100, 4, 200, 1, 3, 2])               ->  4   // [1,2,3,4]
 *   longestConsecutive([0,3,7,2,5,8,4,6,0,1])                ->  9
 *   longestConsecutive([])                                   ->  0   // empty array
 *   longestConsecutive([5])                                  ->  1   // single element
 *   longestConsecutive([1, 2, 0, 1])                         ->  3   // the duplicate 1 does not inflate [0,1,2]
 *   longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])  ->  7   // [3..9] beats [-1,0,1]
 *
 * EDGE CASES
 *   - Empty array returns 0.
 *   - Duplicates must not inflate the count.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n log n) time — sort and scan for runs. Correct, but misses the target.
 *   Target: O(n) time, O(n) space — put everything in a Set, and only start counting from x when
 *           x-1 is absent, so each run is walked once.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Hash set, count each run only from its starting number
// 1. Put every number in a set so lookups are instant and duplicates disappear.
// 2. A number starts a run only when num - 1 is missing from the set.
// 3. From each start, count upward while the next number exists.
// Counting only from the starts is what keeps this O(n) overall, space O(n).
function longestConsecutive(nums) {
  // HashSet Technique
  // we convert array into set then check for each item in set whether it starts a sequence
  // if it starts one we count forward, otherwise we skip it and move to the next item
  let uniqueNums = new Set(nums);
  let longest = 0;
  // loop through set, for of is best for our case
  for (let item of uniqueNums){
    // we will check if item don't has it's previous value then we will count onward
    if(!uniqueNums.has(item-1)){
      let length = 1;
      let currentValue = item;
      while(uniqueNums.has(currentValue+1)){
        currentValue++
        length++
      }
      longest = Math.max(longest,length)
    }
  } 
  return longest
}

module.exports = { longestConsecutive };
