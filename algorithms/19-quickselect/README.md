# Quickselect

> Find the kth smallest (or largest) value without sorting everything, in O(n) time on average.

**Family:** Arrays · Partitioning · Divide and conquer  
**Complexity:** O(n) average time · O(n²) worst case · O(1) extra space (iterative)  
**Practice:** [092 Kth Largest Element in an Array](../../problems/13-heap-priority-queue/092-kth-largest-element-in-an-array.js)

---

## The problem it solves

You want **one** value by rank: the median, the 3rd largest, the 10th smallest. Sorting gives it
to you in O(n log n), but sorting puts **every** value in its final place when you only need
**one** of them.

Quickselect is Quicksort with most of the work skipped. It puts one value in its final place,
then keeps going on **only the side** that holds the rank you want.

## The core idea

Pick any value as the **pivot** and split the array around it: smaller values to the left,
bigger or equal values to the right, the pivot in between. After that split, the pivot sits at
exactly the index it would have in the sorted array. It is "done".

Now compare that index to the index you are looking for:

- **Equal:** the pivot is your answer.
- **Target is to the right:** the answer is among the bigger values. Forget the left side.
- **Target is to the left:** the answer is among the smaller values. Forget the right side.

Each round throws part of the array away and never looks at it again. That is the saving.

"Kth largest" is just "kth smallest" counted from the other end: in ascending order it lives at
index `n − k`.

## Step by step

Set `target = n − k` (for kth largest), `lo = 0`, `hi = n − 1`. Repeat:

1. **Pick a pivot** in `lo..hi` (ideally at random, see below) and move it to `hi`.
2. **Partition `lo..hi`** (Lomuto scheme):
   - Keep a boundary `i = lo`. Everything left of `i` is smaller than the pivot.
   - Walk `j` from `lo` to `hi − 1`. If `a[j] < pivot`, swap `a[i]` and `a[j]`, then `i += 1`.
   - Finally swap the pivot from `hi` into index `i`.
3. **Compare `i` with `target`:** equal → return `a[i]`. `i < target` → `lo = i + 1`.
   `i > target` → `hi = i − 1`.

## Worked trace

Array: `[7, 2, 9, 4, 1, 8, 5]`, `k = 3`. Sorted it would be `[1, 2, 4, 5, 7, 8, 9]`, so the 3rd
largest is `7` at `target = 7 − 3 = 4`. For a readable trace the pivot is simply the last value.

**Round 1** (`lo = 0`, `hi = 6`, pivot `5`). The partition pass:

| j | a[j] | vs pivot 5 | Action              | i after | Array after             |
|--:|:----:|:-----------|:--------------------|:-------:|:------------------------|
| 0 | 7    | ≥          | leave               | 0       | `[7, 2, 9, 4, 1, 8, 5]` |
| 1 | 2    | <          | swap idx 0 and 1    | 1       | `[2, 7, 9, 4, 1, 8, 5]` |
| 2 | 9    | ≥          | leave               | 1       | `[2, 7, 9, 4, 1, 8, 5]` |
| 3 | 4    | <          | swap idx 1 and 3    | 2       | `[2, 4, 9, 7, 1, 8, 5]` |
| 4 | 1    | <          | swap idx 2 and 4    | 3       | `[2, 4, 1, 7, 9, 8, 5]` |
| 5 | 8    | ≥          | leave               | 3       | `[2, 4, 1, 7, 9, 8, 5]` |

Place the pivot at `i = 3`: `[2, 4, 1, 5, 9, 8, 7]`.

| Round | lo..hi | Pivot | Array after partition   | Pivot index | vs target 4 |
|------:|:------:|:-----:|:------------------------|:-----------:|:------------|
| 1     | 0..6   | 5     | `[2, 4, 1, 5, 9, 8, 7]` | 3           | go right    |
| 2     | 4..6   | 7     | `[2, 4, 1, 5, 7, 8, 9]` | 4           | found       |

Answer: **7**. ✓ Notice that `[2, 4, 1]` was never sorted. Quickselect doesn't care.

## Why it is correct

After a partition, every value left of `i` is smaller than the pivot and every value right of
it is at least the pivot. So exactly `i` values (within the whole array) come before the pivot
in sorted order, which means the pivot's sorted index **is** `i`. The value at `target` must
lie on the side that contains `target`, and partitioning never moves values across `lo` or
`hi`, so discarding the other side loses nothing.

## Average O(n), worst O(n²), and the random pivot

- **Good pivots** cut the range roughly in half: `n + n/2 + n/4 + … ≈ 2n` steps. **O(n)**.
- **Bad pivots** remove only one value per round: `n + (n−1) + … ≈ n²/2`. On the already
  sorted `[1, 2, 3, 4, 5]`, asking for the smallest with a last-value pivot costs 10 comparisons,
  the full `5·4/2`.
- A **random pivot** makes the bad case astronomically unlikely for any input, so the expected
  time is O(n). Always pick the pivot at random (then swap it to `hi`) in real code.
- Many equal values also hurt Lomuto. A three-way split (less / equal / greater) fixes that.

## Hoare partition, briefly

Hoare's scheme moves **two** pointers inward from both ends and swaps a big value on the left
with a small value on the right. It does fewer swaps than Lomuto, but the pivot does **not**
necessarily end at the split index, so you recurse on `lo..split` or `split+1..hi` instead of
checking "is the pivot at target". Lomuto is easier to get right; Hoare is faster in practice.

## Loop shape

- **Outer: `while (lo <= hi)`.** Like binary search, the range shrinks by an amount you can't
  predict.
- **Lomuto partition: `for (j = lo; j < hi; j++)`**, with the boundary `i` moving only inside the
  body. This is the read/write shape from [Two Pointers](../03-two-pointers/README.md): `j` moves
  on every step, `i` only on a swap.
- **Hoare partition: `while`.** Two pointers move in from both ends and stop by comparison, like
  converging two pointers.

## How to recognise it

- "kth largest", "kth smallest", "median", "the k closest / k smallest" when order among them
  does not matter.
- Sorting is allowed but "not the intended complexity".
- A heap gives O(n log k); Quickselect is the O(n) average alternative.

## Common mistakes

- **Mixing up kth largest and kth smallest.** Kth largest is index `n − k` ascending.
- **Recursing into both sides.** That's Quicksort. Quickselect picks one.
- **Ignoring duplicates.** On an array of all-equal values, plain Lomuto lands the pivot at `lo`
  every round, so the range shrinks by only one. A three-way split avoids this.
- **Always choosing the first or last value** as pivot. Sorted input then hits O(n²).
- **Treating "kth distinct".** Duplicates count as separate positions.

## Practice

1. **[092 Kth Largest Element in an Array](../../problems/13-heap-priority-queue/092-kth-largest-element-in-an-array.js)**
   (Medium): translate "kth largest" into a sorted index, then partition until the pivot lands
   on it. Compare against the size-k min-heap version.

Run it with `./practice c 092`.
