/**
 * 155 — Largest Number
 * Difficulty: Medium   ·   Topic: Sorting
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a list of non-negative integers `nums`, arrange them so they form the largest
 *   possible number, and return it as a string.
 *
 * CONSTRAINTS
 *   1 <= nums.length <= 100
 *   0 <= nums[i] <= 10^9
 *
 * EXAMPLES
 *   largestNumber([10, 2])            ->  "210"
 *   largestNumber([3, 30, 34, 5, 9])  ->  "9534330"
 *   largestNumber([0, 0])             ->  "0"   // not "00"
 *   largestNumber([0])                ->  "0"   // a single zero
 *   largestNumber([432, 43243])       ->  "43243432"   // the longer number does not win by length
 *   largestNumber([121, 12])          ->  "12121"   // "12121" beats "12112"
 *
 * EDGE CASES
 *   - All zeros must produce "0", not a string of zeroes.
 *   - The result may exceed the safe integer range — keep it a string.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Sorting numerically descending is WRONG: [3, 30] gives 330, not 303.
 *
 * COMPLEXITY
 *   Naive:  Trying every permutation is O(n!) and infeasible past a handful of numbers.
 *   Target: O(n log n) time — sort with the comparator (a + b) vs (b + a) on the string forms,
 *           then join and strip the all-zero case.
 * ----------------------------------------------------------------------
 */

function largestNumber(nums) {
  // TODO: your solution here
}

module.exports = { largestNumber };
