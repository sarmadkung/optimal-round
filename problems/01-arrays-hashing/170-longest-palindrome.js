/**
 * 170 — Longest Palindrome
 * Difficulty: Easy   ·   Topic: Arrays & Hashing
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a string `s` of lowercase and uppercase letters, return the length of the longest
 *   palindrome that can be BUILT from those letters (each letter used at most as many times as
 *   it appears). Letters are case sensitive: "Aa" is not a palindrome.
 *
 * CONSTRAINTS
 *   1 <= s.length <= 2000
 *   s consists of lowercase and/or uppercase English letters only.
 *
 * EXAMPLES
 *   longestPalindrome("abccccdd")  ->  7   // e.g. "dccaccd"
 *   longestPalindrome("a")         ->  1   // single letter
 *   longestPalindrome("Aa")        ->  1   // case sensitive — no pair here
 *   longestPalindrome("bb")        ->  2   // one clean pair
 *   longestPalindrome("abc")       ->  1   // no pairs; one odd letter sits in the middle
 *   longestPalindrome("abccba")    ->  6   // already a palindrome
 *
 * EDGE CASES
 *   - A letter with an odd count still contributes count - 1 letters.
 *   - At most ONE odd-count letter can sit in the middle.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. You do not need to build the palindrome — only count letter pairs.
 *
 * COMPLEXITY
 *   Naive:  Trying arrangements is exponential; there is no reason to.
 *   Target: O(n) time, O(1) space (52 letters) — count letters, add every even part, and add 1
 *           if any count was odd.
 * ----------------------------------------------------------------------
 */

// SOLUTION: Count the characters and use them in pairs
// 1. Count how often each character appears.
// 2. An even count can be used in full; an odd count contributes count - 1.
// 3. If any odd count existed, one spare character can sit in the middle, so add 1.
// Time O(n), space O(1), since the alphabet is a fixed size.
// The frequencyHash.size === 1 shortcut isn't needed — the loop below already handles that case.
function longestPalindrome(s) {
  let frequencyHash = new Map()
  let sLetters = s.split("");
  let longestPalindrome = 0
  let hasOdd = false;
  for (let i=0;i<sLetters.length;i++){
    let current = sLetters[i];
    if(frequencyHash.has(current)){
      frequencyHash.set(current,frequencyHash.get(current)+1)
    } else {
      frequencyHash.set(current,1);
    }
  }
  if(frequencyHash.size === 1){
    return sLetters.length
  }
  for (let [char,frequency] of frequencyHash){
    if(frequency %2 === 0){
      longestPalindrome += frequency
    } else {
    longestPalindrome += frequency - 1;
    hasOdd = true;
    }
  }
  if (hasOdd) {
    longestPalindrome += 1;
  }

  return longestPalindrome
}

module.exports = { longestPalindrome };
