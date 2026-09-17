/**
 * 129 — Task Scheduler
 * Difficulty: Medium   ·   Topic: Heap / Priority Queue
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given an array of CPU `tasks` labelled A-Z and a cooldown `n`, identical tasks must be
 *   separated by at least n intervals. Each task takes one interval, and the CPU may idle.
 *   Return the minimum number of intervals needed to finish all tasks.
 *
 * CONSTRAINTS
 *   1 <= tasks.length <= 10^4
 *   tasks[i] is an uppercase English letter.
 *   0 <= n <= 100
 *
 * EXAMPLES
 *   leastInterval(["A","A","A","B","B","B"], 2)  ->  8   // A B idle A B idle A B
 *   leastInterval(["A","A","A","B","B","B"], 0)  ->  6   // no cooldown
 *   leastInterval(["A","A","A","A"], 2)          ->  10
 *   leastInterval(["A"], 0)                      ->  1   // a single task
 *   leastInterval(["A","B","C","D"], 2)          ->  4   // all distinct, never idle
 *   leastInterval(["A","A","B","B"], 2)          ->  5   // a tie for most frequent shrinks idling
 *
 * EDGE CASES
 *   - n = 0 means the answer is simply the task count.
 *   - The answer is never below the total number of tasks.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Several tasks tied for the most frequent shrink the idle time.
 *
 * COMPLEXITY
 *   Naive:  Simulating interval by interval with a scan for the best available task is O(total *
 *           26).
 *   Target: O(n) time — either a max-heap with a cooldown queue, or the closed form:
 *           max(tasks.length, (maxFreq - 1) * (n + 1) + countOfMaxFreq).
 * ----------------------------------------------------------------------
 */

function leastInterval(tasks, n) {
  // TODO: your solution here
}

module.exports = { leastInterval };
