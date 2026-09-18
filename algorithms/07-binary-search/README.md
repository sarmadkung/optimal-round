# Binary Search

> Keep a range that must contain the answer, look at its middle, and throw away the half that cannot.

**Family:** Searching · Divide and Conquer  
**Complexity:** O(log n) time · O(1) space (on the answer: O(log R) checks, each costing whatever the check costs)  
**Practice:** [017 Binary Search](../../problems/05-binary-search/017-binary-search.js) · [065 Koko Eating Bananas](../../problems/05-binary-search/065-koko-eating-bananas.js)

---

## In 60 seconds

**The idea.** Keep a range that must contain the answer. Look at its middle, and throw away the half
that cannot hold it. Every look halves what is left, so a billion elements take about 30 looks.

**The rule to remember.** Before writing the loop, say in one sentence what `lo` and `hi` mean, then
pick one style and stick to it: closed `[lo, hi]` with `while (lo <= hi)`, or half-open / "first yes"
with `while (lo < hi)`. Never mix the two.

**Reach for it when** the input is sorted, the problem demands O(log n), or it asks for the minimum
or maximum `x` that passes a yes/no check that is **monotone** — once `x` works, every bigger `x`
works too.

**The traps.** Writing `hi = mid − 1` when `mid` passed in a first-yes search, which can throw away
the answer. A search range whose ends are not real answers. Rounding the wrong way inside the check.

Everything below is those same ideas, slowly.

## The problem it solves

You need to find something in a **sorted** array, or more generally in any range where a yes/no
question flips only once from "no" to "yes". Scanning every position is O(n).

Binary search halves the range with every look. A million elements take about 20 looks. A billion
take about 30.

## The core idea

Think of guessing a number between 1 and 100 when someone tells you "higher" or "lower". You do
not guess 1, 2, 3. You guess 50, and whatever the reply, half the numbers are gone.

Binary search keeps two bounds, `lo` and `hi`, and one promise called the **loop invariant**:

- **If the target exists, it is inside `lo..hi`.**

Every step looks at the middle and moves one bound past it, keeping the promise true. When the
range is empty, the promise says the target was never there.

## Step by step

For finding `target` in a sorted array, start with `lo = 0` and `hi = n − 1` (both inclusive).
While `lo <= hi`:

1. **Middle:** `mid = lo + (hi − lo) / 2`, rounded down.
2. **If `a[mid]` equals the target**, return `mid`.
3. **If `a[mid]` is smaller**, the target can only be to the right: `lo = mid + 1`.
4. **If `a[mid]` is larger**, the target can only be to the left: `hi = mid − 1`.

If the loop ends, the range is empty, so the target is absent.

## Worked trace

Array `[2, 5, 8, 12, 16, 23, 38, 56]` (indices 0 to 7).

**Target 16** (present):

| Step | lo | hi | mid | a[mid] | Action          |
|-----:|---:|---:|----:|-------:|:----------------|
| 1    | 0  | 7  | 3   | 12     | smaller → lo = 4 |
| 2    | 4  | 7  | 5   | 23     | larger → hi = 4  |
| 3    | 4  | 4  | 4   | 16     | found           |

Found at index **4**. ✓

The same three steps as a picture. Each line shows the live range *before* the step: `|` walls off
what has been discarded, and `^` sits under `mid`.

```
  [    2    5    8   12   16   23   38   56 ]   mid = 12, smaller than 16  ->  lo = 4
                      ^
  [    2    5    8   12  |16   23   38   56 ]   mid = 23, larger than 16   ->  hi = 4
                                ^
  [    2    5    8   12  |16  |23   38   56 ]   mid = 16, found
                           ^
```

Nothing outside the walls is ever looked at again, and the live stretch is at most half as wide
after every step.

**Target 13** (absent):

| Step | lo | hi | mid | a[mid] | Action          |
|-----:|---:|---:|----:|-------:|:----------------|
| 1    | 0  | 7  | 3   | 12     | smaller → lo = 4 |
| 2    | 4  | 7  | 5   | 23     | larger → hi = 4  |
| 3    | 4  | 4  | 4   | 16     | larger → hi = 3  |

Now `lo = 4 > hi = 3`, the range is empty, so the answer is **not found**. ✓ Notice that `lo` ends on
index 4, which is exactly where 13 would be inserted.

## Why it is correct

Every move keeps the invariant. When `a[mid] < target`, everything at or left of `mid` is also
smaller (the array is sorted), so dropping `0..mid` cannot drop the target. The other case is the
mirror image. Every step also removes at least `mid` itself, so the range strictly shrinks and the
loop ends. Halving `n` gets to 0 after about `log₂ n` steps.

## Loop invariants and off-by-one

Almost every binary search bug is a mismatch between **what the bounds mean** and **how they move**.
Pick one style and stick to it:

| Style             | Range        | Loop while | Discard left  | Discard right |
|:------------------|:-------------|:-----------|:--------------|:--------------|
| Closed `[lo, hi]` | both inclusive | `lo <= hi` | `lo = mid + 1` | `hi = mid − 1` |
| Half-open `[lo, hi)` | `hi` excluded | `lo < hi`  | `lo = mid + 1` | `hi = mid`     |

Mixing them, for example `lo < hi` with `hi = mid − 1`, either skips the last element or loops
forever. Before writing the loop, say in one sentence what `lo` and `hi` mean.

## Binary search on the answer

Sometimes nothing is sorted, but the **answer** is a number in a known range, and you can check
"is `x` good enough?" with a yes/no test. If the test is **monotone**, meaning once `x` works every
bigger `x` works too, the answers look like `no no no yes yes yes`. Binary search finds the first
`yes`.

For that "first yes" search, keep this invariant: **the first yes is inside `lo..hi`**. While
`lo < hi`:

- If `mid` passes, it might be the first yes, so keep it: `hi = mid`.
- If `mid` fails, the first yes is later: `lo = mid + 1`.

When `lo == hi`, that is the answer.

Example: piles `[4, 9, 10]`, `h = 6` hours, find the slowest eating speed that finishes in time.
Hours needed at speed `s` is the sum of each pile divided by `s`, rounded up. Speeds range from 1 to
the largest pile, 10.

| Step | lo | hi | mid | Hours at mid | Fits in 6? | Action     |
|-----:|---:|---:|----:|-------------:|:-----------|:-----------|
| 1    | 1  | 10 | 5   | 5            | yes        | hi = 5     |
| 2    | 1  | 5  | 3   | 9            | no         | lo = 4     |
| 3    | 4  | 5  | 4   | 7            | no         | lo = 5     |

`lo = hi = 5`, so the slowest speed is **5**. ✓ Three checks instead of up to ten.

## Loop shape

**Use `while`.** Each iteration moves `lo` **or** `hi`, never both, and never by a fixed step. The
header condition comes from your bound style (see the table above), not from the array length:

- Closed `[lo, hi]`: `while (lo <= hi)`. You may return from inside the loop.
- Half-open, or "first yes": `while (lo < hi)`. The answer is `lo` after the loop ends.

**Binary search on the answer** has two loops, and they do different jobs:

- The outer **`while`** halves the range of possible answers.
- The yes/no check is a **`for`** over the input ("how many hours at speed `mid`?" visits every
  pile once).

If your outer loop is a `for`, or your check function is a `while` that moves a pointer, stop and
re-read the problem.

## How to recognise it

- The input is **sorted**, or the problem demands **O(log n)**.
- "Find the minimum `x` such that ..." or "maximum `x` such that ...", with a huge range of `x`.
- Checking one candidate is easy, but finding the best one directly is hard.
- "Rotated sorted array", "first / last position", "insert position".

## Common mistakes

- **Mixing closed and half-open styles** (see the table above).
- **Writing `hi = mid − 1` when `mid` passed** in a first-yes search. You may have just thrown away
  the answer.
- **Wrong search range on the answer.** The low end must be a real possible answer (a speed of 0 is
  not), and the high end must be one that always works.
- **Rounding the wrong way** in the check, for example using plain division where you need to round up.
- **`(lo + hi) / 2` overflowing** in fixed-width languages. Use `lo + (hi − lo) / 2`.

## Practice

1. **[017 Binary Search](../../problems/05-binary-search/017-binary-search.js)** (Easy): the classic
   search. A sorted array of distinct values, return the index or -1.
2. **[065 Koko Eating Bananas](../../problems/05-binary-search/065-koko-eating-bananas.js)** (Medium):
   binary search on the answer. The eating speed is what you search for, and the check is "does she
   finish within `h` hours?".

Run them with `./practice c 017` and `./practice c 065`.
