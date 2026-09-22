/**
 * 009 — Container With Most Water
 * Difficulty: Medium   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an integer array `height` where each value is a vertical line at that index,
 *   find two lines that together with the x-axis form a container holding the most water.
 *   Return the maximum area. You may not slant the container.
 *
 * CONSTRAINTS
 *   2 <= height.length <= 10^5
 *   0 <= height[i] <= 10^4
 *
 * EXAMPLES
 *   maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])  ->  49
 *   maxArea([1, 1])                       ->  1
 *   maxArea([0, 2])                       ->  0   // a zero-height line holds nothing
 *   maxArea([1, 2, 1])                    ->  2   // the two outer 1s beat any taller-but-closer pair
 *   maxArea([4, 4, 4, 4])                 ->  12   // all equal: width wins
 *   maxArea([2, 3, 4, 5, 18, 17, 6])      ->  17   // min(18, 17) * 1
 *
 * EDGE CASES
 *   - Zero-height lines contribute no area.
 *   - Exactly two lines.
 *   - Area is min(h[l], h[r]) * (r - l), not the sum.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — evaluate every pair of lines.
 *   Target: O(n) time, O(1) space — two pointers at the ends, always moving the shorter line
 *           inward.
 * ----------------------------------------------------------------------
 */

function maxArea(height) {
  
  let right = height.length-1;
  let areaMax = 0;
  let left = 0

  while(left<right) {
    let width = right - left;
    let leftH = height[left];
    let rightH = height[right]

    let h = Math.min(leftH,rightH);
    let area = width * h;

    if(areaMax < area) {
      areaMax = area;
    }
    if(leftH<rightH){
      left++
    } else {
      right--
    }
  }
  return areaMax;
}

module.exports = { maxArea };
