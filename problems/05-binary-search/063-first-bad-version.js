/**
 * 063 — First Bad Version
 * Difficulty: Easy   ·   Topic: Binary Search
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Versions 1..n were released in order, and every version after the first bad one is
 *   also bad. Given an API `isBadVersion(v)` returning a boolean, find the first bad
 *   version using the fewest possible API calls.
 *
 * CONSTRAINTS
 *   1 <= bad <= n <= 2^31 - 1
 *   isBadVersion is monotonic: once true, it stays true.
 *   You must minimize the number of calls to isBadVersion.
 *
 * INPUT FORMAT
 *   On the platforms `isBadVersion(version)` is an ambient API already in scope, and the
 *   signature is just firstBadVersion(n). Here it is passed in as a second argument so the
 *   test runner can supply its own — the algorithm you write is identical.
 *
 * EXAMPLES
 *   n = 5,   bad = 4   ->  firstBadVersion(5) returns 4
 *   n = 1,   bad = 1   ->  firstBadVersion(1) returns 1    // smallest possible input
 *   n = 2,   bad = 1   ->  firstBadVersion(2) returns 1    // the very first version is bad
 *   n = 2,   bad = 2   ->  firstBadVersion(2) returns 2    // only the last version is bad
 *   n = 10,  bad = 10  ->  firstBadVersion(10) returns 10  // the boundary is the last version
 *   n = 100, bad = 37  ->  firstBadVersion(100) returns 37 // a boundary in the middle
 *
 * EDGE CASES
 *   - The first version may itself be bad.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Computing mid as (low + high) / 2 overflows in fixed-width languages — use low + ((high -
 *      low) >> 1).
 *
 * COMPLEXITY
 *   Naive:  O(n) time — call the API on every version from 1 upward.
 *   Target: O(log n) time — binary search for the boundary, keeping mid as a candidate when it is
 *           bad rather than discarding it.
 * ----------------------------------------------------------------------
 */

function firstBadVersion(n, isBadVersion) {
  // TODO: your solution here
}

module.exports = { firstBadVersion };
