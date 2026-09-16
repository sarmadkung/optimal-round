/**
 * 174 — Reverse String
 * Difficulty: Easy   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Write a function that reverses an array of characters `s` IN PLACE. Do not return anything;
 *   modify `s` directly using O(1) extra memory.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 10^5
 *   s[i] is a printable ASCII character.
 *
 * EXAMPLES
 *   reverseString(["h", "e", "l", "l", "o"])       ->  s becomes ["o", "l", "l", "e", "h"]
 *   reverseString(["H", "a", "n", "n", "a", "h"])  ->  s becomes ["h", "a", "n", "n", "a", "H"]
 *
 * EDGE CASES
 *   - A single character is unchanged.
 *   - Odd length: the middle character stays put.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — build a reversed copy and write it back (breaks the rule).
 *   Target: O(n) time, O(1) space — swap s[l] and s[r], moving both pointers inward.
 * ----------------------------------------------------------------------
 */

function reverseString(s) {
  let left = 0;
  let right = s.length-1;

  while(left<right){
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}

module.exports = { reverseString };
