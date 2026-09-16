# Kadane's Algorithm

> Find the best contiguous subarray in one pass by asking, at every index, "extend or restart?"

**Family:** Arrays · Dynamic Programming  
**Complexity:** O(n) time · O(1) space  
**Practice:** [004 Maximum Subarray](../../problems/01-arrays-hashing/004-maximum-subarray.js) · [079 Maximum Product Subarray](../../problems/09-dynamic-programming/079-maximum-product-subarray.js)

---

## The problem it solves

You have an array of numbers, some of them negative. Which **contiguous** stretch of it has the
largest sum?

The obvious answer is to try every start and every end: O(n²) subarrays. Kadane's algorithm gets
the same answer in a single left-to-right pass while remembering only **two numbers**.

## The core idea

Imagine walking along the array carrying a bag of everything you have picked up since your last
fresh start. At each new number you have exactly two choices:

- **Extend:** add the number to the bag you are carrying.
- **Restart:** throw the bag away and start a new one holding only this number.

A bag whose total is negative can only hurt whatever comes next. So the rule is simple: if the bag
you are carrying is worth less than nothing, drop it.

Kadane keeps two values:

- **`cur`**, the best sum of a subarray that **ends exactly here**.
- **`best`**, the best `cur` ever seen, anywhere.

## Step by step

Start with `cur = best = nums[0]`. For each later value `x`:

1. **Extend or restart:** `cur = max(x, cur + x)`.
2. **Record:** `best = max(best, cur)`.

When the loop ends, `best` is the answer.

## Worked trace

Array: `[3, -4, 2, -1, 3, -5, 4]`.

| i | x  | cur + x | Choice  | cur after | best after |
|--:|---:|--------:|:--------|----------:|-----------:|
| 0 | 3  | –       | start   | 3         | 3          |
| 1 | -4 | -1      | extend  | -1        | 3          |
| 2 | 2  | 1       | restart | 2         | 3          |
| 3 | -1 | 1       | extend  | 1         | 3          |
| 4 | 3  | 4       | extend  | 4         | 4          |
| 5 | -5 | -1      | extend  | -1        | 4          |
| 6 | 4  | 3       | restart | 4         | 4          |

Final answer: **4**. ✓ Two subarrays reach it: `[2, -1, 3]` and `[4]`.

Notice step 2: `cur` was `-1`, so carrying it would turn `2` into `1`. Restarting keeps the full `2`.

## Why it is correct

Every subarray ends at some index `i`. The best subarray ending at `i` is either `nums[i]` alone,
or `nums[i]` glued onto the best subarray ending at `i − 1`. Nothing else can win: if a longer
subarray ending at `i` beat that, its part ending at `i − 1` would beat the best one ending at
`i − 1`, which is a contradiction. So `cur` is always right, and `best` looks at every possible
ending index.

This is dynamic programming with the table squashed down to one cell, because each step only
needs the step before it.

## Variant: products need a max and a min

For the largest **product**, "extend or restart" is not enough. A negative number flips signs: the
**most negative** product so far becomes the **most positive** the moment you multiply it by
another negative. So carry both:

- **`hi`**, the largest product ending here.
- **`lo`**, the smallest (most negative) product ending here.

At each `x`, the new `hi` and `lo` are the largest and smallest of three candidates: `x` alone,
`hi × x`, and `lo × x`. Compute both from the **old** values. A zero makes all three candidates 0
or `x`, which is a natural restart.

Array `[2, -5, -2, 0, -3, 4]`:

| i | x  | Candidates (x, hi·x, lo·x) | hi | lo  | best |
|--:|---:|:---------------------------|---:|----:|-----:|
| 0 | 2  | start                      | 2  | 2   | 2    |
| 1 | -5 | -5, -10, -10               | -5 | -10 | 2    |
| 2 | -2 | -2, 10, 20                 | 20 | -2  | 20   |
| 3 | 0  | 0, 0, 0                    | 0  | 0   | 20   |
| 4 | -3 | -3, 0, 0                   | 0  | -3  | 20   |
| 5 | 4  | 4, 0, -12                  | 4  | -12 | 20   |

At step 2 the `20` came from `lo`, not `hi`. Tracking only the max would have missed it.

## Loop shape

**Use `for`, starting at index 1.** Every element is visited once, and "extend or restart" is a
decision about `cur`, not about where to go next. The index just walks forward.

Start at 1 because `cur = best = nums[0]` has already used the first value. Starting at 0 counts
`nums[0]` twice. The product variant has the same shape, with `hi` and `lo` in place of `cur`.

## How to recognise it

- "Contiguous subarray" plus "maximum" or "minimum" of a sum or product.
- The brute force is "every start, every end", and each step only depends on the previous one.
- A follow-up asks for O(1) space.

## Common mistakes

- **Starting `best` at 0.** On an all-negative array the answer is the largest single element,
  not 0. Start from `nums[0]`.
- **Restarting on a negative `x`** instead of on a negative `cur`. A negative number can still be
  worth carrying through.
- **Product variant: updating `hi` first, then using the new `hi` to compute `lo`.** Save the old
  values before either update.
- **Product variant: tracking only the max.** Two negatives make a positive.

## Practice

1. **[004 Maximum Subarray](../../problems/01-arrays-hashing/004-maximum-subarray.js)** (Medium):
   the direct use. One running sum, one best.
2. **[079 Maximum Product Subarray](../../problems/09-dynamic-programming/079-maximum-product-subarray.js)**
   (Medium): the product version. Carry the running max and min together.

Run them with `./practice c 004` and `./practice c 079`.
