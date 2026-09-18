# Prefix Sum

> Add up the array once from the left, and every range sum becomes one subtraction.

**Family:** Arrays · Hashing  
**Complexity:** O(n) to build · O(1) per range sum · O(n) space for the prefix array (O(1) with a running total)  
**Practice:** [156 Find Pivot Index](../../problems/21-prefix-sum/156-find-pivot-index.js) · [053 Subarray Sum Equals K](../../problems/01-arrays-hashing/053-subarray-sum-equals-k.js)

---

## In 60 seconds

**The idea.** `P[i]` is an odometer reading: the total of everything **before** index `i`. Any range
sum is then the difference of two readings, so it costs one subtraction instead of a loop.

**The rule to remember.** `P[0] = 0`, `P[i + 1] = P[i] + nums[i]`, and the sum of `nums[i..j]` is
`P[j + 1] − P[i]`. For counting subarrays that sum to `k`, keep a map of prefix total → count, seed
it with `{0: 1}`, and at each element look up `pre − k` **before** recording `pre`.

**Reach for it when** you need many range sums on an array that does not change, a "left sum equals
right sum" balance point, or a count of subarrays summing to `k` — especially when negative numbers
rule out a sliding window.

**The traps.** Off by one: `P` has `n + 1` entries and `P[i]` excludes `nums[i]`. Forgetting the
`{0: 1}` seed. Recording `pre` before looking up `pre − k`. Storing "seen or not" instead of a count.

Everything below is those same ideas, slowly.

## The problem it solves

"What is the sum of the elements from index `i` to index `j`?" Answering by adding them up costs up
to O(n) each time. If you ask about many ranges, or about every range, that turns into O(n²).

Prefix sums pay O(n) **once**, and after that any range sum costs O(1).

## The core idea

Think of a car's odometer. You do not measure each leg of a trip separately. You read the odometer
at the start of the leg and at the end, and subtract.

A prefix sum array is an odometer for the array: `P[i]` is the total of everything **before** index
`i`. The distance covered between two points is the difference of the two readings.

- `P[0] = 0`: nothing has been added yet.
- `P[i + 1] = P[i] + nums[i]`.
- **Sum of `nums[i..j]` = `P[j + 1] − P[i]`.**

## Step by step

1. **Build:** start from `0` and write down the running total after each element. The array `P`
   has `n + 1` entries.
2. **Query:** for the range `i..j` inclusive, subtract `P[i]` from `P[j + 1]`.
3. **Often you do not need the array.** If you scan left to right and only ever ask about "everything
   so far", a single running total is enough.

## Worked trace

Array `[3, 1, -2, 5, 2]`.

| Index   | 0 | 1 | 2  | 3 | 4 | 5 |
|:--------|--:|--:|---:|--:|--:|--:|
| nums[i] | 3 | 1 | -2 | 5 | 2 | – |
| P[i]    | 0 | 3 | 4  | 2 | 7 | 9 |

Sum of `nums[1..3]` = `P[4] − P[1]` = `7 − 3` = **4**. ✓ (`1 − 2 + 5 = 4`)

The total of the whole array is the last entry, `P[5] = 9`. The sum of everything to the **left** of
index `i` is `P[i]`, and everything to the **right** of it is `total − P[i] − nums[i]`.

## Why it is correct

`P[j + 1]` is `nums[0] + ... + nums[j]`. `P[i]` is `nums[0] + ... + nums[i − 1]`. Subtract, and every
element before `i` cancels, leaving exactly `nums[i] + ... + nums[j]`. This holds for any numbers,
negative ones included, which is a big advantage over the sliding window.

## Prefix sum + hash map: counting ranges

A harder question: "How many subarrays sum to exactly `k`?" A subarray ending at index `j` sums to `k`
when some earlier reading `P[i]` satisfies `P[j + 1] − P[i] = k`. Rearranged, that is
`P[i] = P[j + 1] − k`.

So scan once, keeping a **hash map from each prefix total to how many times it has appeared**:

1. Seed the map with `{0: 1}`. That is the empty prefix, for subarrays that start at index 0.
2. At each element, update the running total `pre`.
3. Look up `pre − k` in the map and add its count to the answer.
4. Then record `pre` in the map (`count += 1`).

Array `[1, 2, -1, 2, 1]`, `k = 3`:

| i | x  | pre | Look for pre − k | Found | Answer | Map after              |
|--:|---:|----:|-----------------:|------:|-------:|:-----------------------|
| 0 | 1  | 1   | -2               | 0     | 0      | 0:1 1:1                |
| 1 | 2  | 3   | 0                | 1     | 1      | 0:1 1:1 3:1            |
| 2 | -1 | 2   | -1               | 0     | 1      | 0:1 1:1 3:1 2:1        |
| 3 | 2  | 4   | 1                | 1     | 2      | 0:1 1:1 3:1 2:1 4:1    |
| 4 | 1  | 5   | 2                | 1     | 3      | 0:1 1:1 3:1 2:1 4:1 5:1|

Answer: **3**. ✓ The subarrays are `[1, 2]`, `[2, -1, 2]` and `[2, 1]`. Each "Found" points back to
the earlier prefix where one of them began.

This version is O(n) time and O(n) space.

## Loop shape

**Use `for`, every time.** No pointer ever moves conditionally here.

- **Build:** one `for` over the elements, writing `P[i + 1] = P[i] + nums[i]`.
- **Query:** no loop at all; it is one subtraction.
- **Two-pass problems (156):** a first `for` gets the total, and a second `for` walks the running
  left sum.
- **Counting with a hash map (053):** one `for`. Inside the body the order matters: look up
  `pre − k` **before** you record `pre`.

If you find yourself reaching for a `while` that moves a left edge, you are writing a sliding window
instead. Check the "Sliding window vs prefix sum" section of the [guide](../../GUIDE.md) to see
which one the problem allows.

## How to recognise it

- "Sum of a range", "sum of a subarray", many range queries on an array that does not change.
- "Left sum equals right sum", "balance point".
- "Count the subarrays with sum `k`", especially when **negative numbers** rule out a sliding window.
- The same trick works with other operations that can be undone: XOR, or counts of a property.

## Common mistakes

- **Off by one between `P` and `nums`.** `P` has `n + 1` entries and `P[i]` excludes `nums[i]`.
- **Forgetting the `{0: 1}` seed.** Subarrays that start at index 0 are silently missed.
- **Recording `pre` before looking up `pre − k`.** When `k = 0`, the element would match itself
  as an empty subarray.
- **Storing "seen or not" instead of a count.** The same prefix total can appear many times, and each
  one starts a different subarray.
- **Reaching for a sliding window** when the array has negatives.

## Practice

1. **[156 Find Pivot Index](../../problems/21-prefix-sum/156-find-pivot-index.js)** (Easy): the
   direct use. Compare the sum on the left with the sum on the right, using one running total.
2. **[053 Subarray Sum Equals K](../../problems/01-arrays-hashing/053-subarray-sum-equals-k.js)**
   (Medium): the counting version. Prefix totals plus a hash map of how often each has appeared.

Run them with `./practice c 156` and `./practice c 053`.
