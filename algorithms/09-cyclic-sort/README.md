# Cyclic Sort

> When the values are in the range 1..n, use each value as the index it belongs at.

**Family:** Arrays · In-place hashing  
**Complexity:** O(n) time · O(1) extra space  
**Practice:** [166 Find All Numbers Disappeared in an Array](../../problems/01-arrays-hashing/166-find-all-numbers-disappeared-in-an-array.js) · [169 First Missing Positive](../../problems/01-arrays-hashing/169-first-missing-positive.js)

---

## The problem it solves

You have an array of length n, and the interesting values lie in **1..n**. You want to know which
values are missing, duplicated, or present, without a hash set.

A Set answers all of these in O(n) time but O(n) memory. The trick here is that a value in 1..n is
**already a valid index** (after subtracting 1). So the array can act as its own hash set: slot
`v − 1` records whether `v` was seen.

There are two common ways to do that recording: **placing** each value in its home slot by
swapping, and **marking** the home slot by flipping its sign.

## The core idea

Think of a row of numbered lockers, 1 to n, and a pile of numbered keys stuffed into random
lockers. Walk along the row. Whenever a locker holds a key that belongs somewhere else, take it out
and put it in its own locker, swapping with whatever key was there. Keep doing that at the same
locker until it holds the right key or a key that has no home.

At the end, every key that could go home **is** home. Any locker still holding the wrong key tells
you its own number was never in the pile.

## Step by step

**Cyclic placement.** Start with `i = 0`. While `i < n`, let `v = nums[i]`:

1. **If `v` is in 1..n and `nums[v − 1]` is not already `v`**, swap `nums[i]` with `nums[v − 1]`.
   Do **not** move `i`: a new value just arrived and needs checking.
2. **Otherwise** (`v` is out of range, already home, or a duplicate of a value that is home),
   `i += 1`.

Afterwards, scan once: slot `i` is "correct" when `nums[i] == i + 1`. The first incorrect slot
names the first missing value.

**Sign marking.** When every value is guaranteed to be in 1..n, you can skip the swaps. For each
value, read `v = |nums[i]|` and make `nums[v − 1]` negative. Afterwards, every slot that is still
positive is a value that never appeared. The absolute value matters, because a slot may already
have been flipped before you read it.

## Worked trace

**Cyclic placement** on `[3, 5, −2, 1, 3]` (n = 5).

| Step | i | v  | Rule                               | Array after           |
|-----:|:-:|:--:|:-----------------------------------|:----------------------|
| 1    | 0 | 3  | home is index 2 → swap             | `[−2, 5, 3, 1, 3]`    |
| 2    | 0 | −2 | out of range → i+1                 | `[−2, 5, 3, 1, 3]`    |
| 3    | 1 | 5  | home is index 4 → swap             | `[−2, 3, 3, 1, 5]`    |
| 4    | 1 | 3  | index 2 already holds 3 (dup) → i+1 | `[−2, 3, 3, 1, 5]`    |
| 5    | 2 | 3  | already home → i+1                 | `[−2, 3, 3, 1, 5]`    |
| 6    | 3 | 1  | home is index 0 → swap             | `[1, 3, 3, −2, 5]`    |
| 7    | 3 | −2 | out of range → i+1                 | `[1, 3, 3, −2, 5]`    |
| 8    | 4 | 5  | already home → i+1                 | `[1, 3, 3, −2, 5]`    |

Final scan: index 0 holds 1 ✓, index 1 holds 3 ✗. So **2** is the first value that is absent. ✓

**Sign marking** on `[3, 1, 3, 2, 1]` (every value is in 1..5).

| Read v | Flip index | Array after             |
|:------:|:----------:|:------------------------|
| 3      | 2          | `[3, 1, −3, 2, 1]`      |
| 1      | 0          | `[−3, 1, −3, 2, 1]`     |
| 3      | 2          | `[−3, 1, −3, 2, 1]`     |
| 2      | 1          | `[−3, −1, −3, 2, 1]`    |
| 1      | 0          | `[−3, −1, −3, 2, 1]`    |

Indices 3 and 4 stayed positive, so **4 and 5** never appeared. ✓ (Flipping an already negative
slot leaves it negative, which is why the third row changes nothing.)

## Why it is correct

**Placement.** Each swap sends one value to its home slot, where it stays for good, because rule 1
never moves a value that is already home. There are at most n homes, so there are at most n swaps
in total. Together with at most n steps of `i += 1`, the loop is O(n) even though `i` sometimes
stands still. When it ends, every value `v` in 1..n that exists somewhere in the array sits at
index `v − 1`. So a slot that doesn't hold its own number proves that number is missing.

**Marking.** Slot `v − 1` is negative exactly when some element had absolute value `v`. Taking the
absolute value on each read means earlier flips never corrupt later reads.

## Why only 1..n matters

For an array of length n, the smallest missing positive is **always in 1..n+1**: n slots can hold
at most the n values 1..n, and if they do, the answer is n + 1. So zeros, negatives and anything
above n can be treated as junk and left wherever they land. That is what makes the technique work
on arbitrary integers, not just on permutations.

## Loop shape

**Placement: use `while (i < n)`.** The swap branch deliberately does not move `i`, for the same
reason as [Dutch National Flag](../08-dutch-national-flag/README.md). Writing `for` and then `i--`
after a swap also works, but it hides the intent.

An equally correct form is a `for` over `i` with an **inner `while`** that keeps swapping until slot
`i` holds a value that is home, out of range, or a duplicate. Both are O(n), because every swap puts
one value home for good. Pick one form and don't mix them.

**Sign marking and the final scan: use `for`.** Each visits every slot exactly once.

## How to recognise it

- Values are promised to be in **1..n** or **0..n**, or only such values matter.
- "Find the missing / duplicate / disappeared numbers".
- A follow-up asks for **O(1) extra space**, ruling out a Set.
- You are allowed to modify the input array.

## Common mistakes

- **Advancing `i` after a swap.** The value that just arrived may also be out of place.
- **Swapping when the home slot already holds the same value.** With duplicates this swaps two
  equal values forever. Test `nums[v − 1] != v`, not `i != v − 1`.
- **Forgetting the range check** before using `v − 1` as an index.
- **Reading `nums[i]` without `abs`** in sign marking, which produces a negative index.
- **Using sign marking when zeros or negatives are allowed.** A 0 can't be flipped and an existing
  negative looks "seen". Clean or ignore those values first, or use placement instead.

## Practice

1. **[166 Find All Numbers Disappeared in an Array](../../problems/01-arrays-hashing/166-find-all-numbers-disappeared-in-an-array.js)**
   (Easy): every value is in 1..n, so either technique can record what was seen. Report every slot
   that never got recorded.
2. **[169 First Missing Positive](../../problems/01-arrays-hashing/169-first-missing-positive.js)**
   (Hard): arbitrary integers, O(1) space. Only values in 1..n have a home, so place those and
   ignore the rest.

Run them with `./practice c 166` and `./practice c 169`.
