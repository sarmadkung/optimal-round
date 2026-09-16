# Interval Merging

> Sort intervals by where they start, then sweep once, gluing each one onto the last if they overlap.

**Family:** Intervals · Sorting · Greedy sweep  
**Complexity:** O(n log n) time (the sort) · O(n) space for the output; O(n) time if already sorted  
**Practice:** [043 Merge Intervals](../../problems/11-intervals-greedy/043-merge-intervals.js) · [085 Insert Interval](../../problems/11-intervals-greedy/085-insert-interval.js)

---

## The problem it solves

You have a pile of ranges such as meetings, bookings or covered stretches of a road, each written
as `[start, end]`. Some overlap. You want the smallest list of ranges that covers exactly the same
ground.

Comparing every pair and merging until nothing changes is O(n²) or worse. Sorting first turns it
into a single left-to-right sweep.

## The core idea

Picture laying strips of tape on a ruler, in order of where each strip **starts**. You only ever
need to look at the **last** strip you laid down:

- If the new strip starts **before or at** the end of the last one, it overlaps. Stretch the last
  strip to cover it.
- If it starts **after** that end, there is a gap. Nothing laid later can bridge it (they all start
  even further right), so the last strip is finished. Start a new one.

Sorting by start is what makes "only look at the last one" safe.

## Step by step

1. Sort the intervals by `start`.
2. Create an empty output list.
3. For each interval `cur`:
   - **If output is empty, or `cur.start > last.end`** → push a copy of `cur`.
   - **Otherwise** they overlap → `last.end = max(last.end, cur.end)`.
4. Return the output.

## Worked trace

Input: `[[5,7], [1,4], [2,3], [6,9], [11,12], [9,10]]`.
Sorted by start: `[[1,4], [2,3], [5,7], [6,9], [9,10], [11,12]]`.

| Step | cur       | last before | Test               | Action                 | Output after                  |
|-----:|:----------|:------------|:-------------------|:-----------------------|:------------------------------|
| 1    | `[1,4]`   | –           | output empty       | push                   | `[1,4]`                       |
| 2    | `[2,3]`   | `[1,4]`     | 2 ≤ 4              | end = max(4,3) = 4     | `[1,4]`                       |
| 3    | `[5,7]`   | `[1,4]`     | 5 > 4              | push                   | `[1,4] [5,7]`                 |
| 4    | `[6,9]`   | `[5,7]`     | 6 ≤ 7              | end = max(7,9) = 9     | `[1,4] [5,9]`                 |
| 5    | `[9,10]`  | `[5,9]`     | 9 ≤ 9 (touching)   | end = max(9,10) = 10   | `[1,4] [5,10]`                |
| 6    | `[11,12]` | `[5,10]`    | 11 > 10            | push                   | `[1,4] [5,10] [11,12]`        |

Result: `[[1,4], [5,10], [11,12]]`. ✓

Step 2 shows why `max` matters: `[2,3]` sits entirely inside `[1,4]`, so the end must **not**
shrink to 3.

## Why it is correct

After sorting, each interval starts no earlier than the ones before it. Suppose the current
interval starts after `last.end`. Every later interval starts at least as far right, so none of
them can reach back and overlap anything that ended at `last.end` or earlier. Closing `last` is
therefore final. If it starts at or before `last.end`, the two share at least one point, so they
belong in the same merged range, and the union is `[last.start, max(ends)]` because `last.start`
is already the smaller start.

## Insert: when the list is already sorted

If the intervals are already sorted and non-overlapping and you add **one** new interval, you
don't need to sort again. The sweep splits into three phases:

1. **Before:** copy every interval that **ends before** the new one starts.
2. **Overlap:** while an interval **starts at or before** the new one's end, absorb it:
   new start = min of starts, new end = max of ends. Then push the grown interval.
3. **After:** copy everything left.

Trace: intervals `[[1,2], [4,5], [7,9], [12,14]]`, new interval `[3,8]`.

| Phase   | Interval  | Why                    | New interval after |
|:--------|:----------|:-----------------------|:-------------------|
| before  | `[1,2]`   | 2 < 3                  | `[3,8]`            |
| overlap | `[4,5]`   | 4 ≤ 8                  | `[3,8]`            |
| overlap | `[7,9]`   | 7 ≤ 8                  | `[3,9]`            |
| push    | –         | `[12,14]` starts > 9   | `[3,9]` pushed     |
| after   | `[12,14]` | copy                   | –                  |

Result: `[[1,2], [3,9], [12,14]]`. ✓ One pass, O(n).

## Loop shape

- **Merge: `for` over the sorted intervals.** Each one is looked at once and compared with the last
  interval in the output.
- **Insert: one index `i`, declared once, and three `while` loops in a row** (before, overlap,
  after). Each phase uses up an unknown number of intervals, and the next phase carries on from
  where the last one stopped. A `for` per phase would restart the index.

## How to recognise it

- Input is a list of `[start, end]` pairs and the words "overlapping", "merge", "cover", "union".
- "Minimum number of rooms / arrows / removals" problems often start with the same sort.
- The input is "not sorted", which is a hint that sorting is step one.

## Common mistakes

- **Forgetting to sort** (043 input is unsorted).
- **Setting `last.end = cur.end`** instead of the max. A contained interval then shrinks the range.
- **Using `<` instead of `≤`** when touching endpoints are supposed to merge.
- **Sorting by end** for merging. Merging needs sort-by-start.
- **Mutating the input intervals** by pushing references and then stretching them.
- **In insert, forgetting the empty list** or a new interval that lands before all or after all.

## Practice

1. **[043 Merge Intervals](../../problems/11-intervals-greedy/043-merge-intervals.js)** (Medium):
   the direct use. Sort by start, sweep, and stretch the last output interval on overlap.
2. **[085 Insert Interval](../../problems/11-intervals-greedy/085-insert-interval.js)** (Medium):
   the input is already sorted, so skip the sort and use the three-phase sweep for O(n).

Run them with `./practice c 043` and `./practice c 085`.
