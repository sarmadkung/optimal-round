/**
 * 007 — Valid Palindrome
 * Difficulty: Easy   ·   Topic: Two Pointers
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s`, return `true` if it is a palindrome after converting all
 *   uppercase letters to lowercase and removing every non-alphanumeric character.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 2 * 10^5
 *   s consists of printable ASCII characters.
 *
 * EXAMPLES
 *   isPalindrome("A man, a plan, a canal: Panama")  ->  true
 *   isPalindrome("race a car")                      ->  false
 *   isPalindrome(" ")                               ->  true   // empty after cleaning
 *   isPalindrome("a")                               ->  true   // single character
 *   isPalindrome(".,")                              ->  true   // no alphanumeric characters at all
 *   isPalindrome("0P")                              ->  false   // '0' and 'p' are both alphanumeric, but differ
 *
 * EDGE CASES
 *   - A string with no alphanumeric characters is a palindrome.
 *   - Mixed case.
 *   - Digits count as alphanumeric.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n) time, O(n) space — build a cleaned string, then compare it to its reverse.
 *   Target: O(n) time, O(1) space — two pointers walking inward, skipping non-alphanumeric
 *           characters in place.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Two pointers from both ends
// 1. Lowercase the string and drop anything that isn't a letter or digit.
// 2. Compare the first character with the last, then step inward.
// 3. Any mismatch means it is not a palindrome.
// Time O(n), space O(n) for the cleaned string.
// The loop runs the full length, so every pair is compared twice; stopping at the middle is enough.
function isPalindrome(s) {
  // Naive Technique
  // let cleanedStr = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
  // let reveredStr = cleanedStr.split("").reverse().join("");
  // if(cleanedStr === reveredStr){
  //   return true
  // }
  // return false

  // Two Pointer

  let cleanedStr = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
  let last = cleanedStr.length-1;
  for(let first = 0; first < cleanedStr.length; first++) {
    if(cleanedStr[first] !== cleanedStr[last]) {
      return false;
    }
    last--;
  }
  return true;

}

module.exports = { isPalindrome };
