# Two Pointers

> Walk inward from both ends, and let each comparison throw away a whole row of pairs at once.

**Family:** Arrays · Pointers  
**Complexity:** O(n) time · O(1) space  
**Practice:** [055 Two Sum II - Input Array Is Sorted](../../problems/02-two-pointers/055-two-sum-ii-input-array-is-sorted.js) · [009 Container With Most Water](../../problems/02-two-pointers/009-container-with-most-water.js)

---

## The problem it solves

Many questions ask about **pairs** in an array: two values that hit a target, two lines that hold
the most water. There are about n²/2 pairs, so checking them all is O(n²).

Converging two pointers checks only **n − 1** pairs. It works when the array has some order (usually
sorted) that tells you, after one look, which pointer can never be part of a better pair.

## The core idea

Put one finger on the far left and one on the far right. Look at the pair under your fingers and
ask: "Is there any point keeping this left value? Any point keeping this right value?"

In a sorted array looking for a target sum:

- If the sum is **too big**, the right value is too big even when paired with the **smallest**
  value left. It is useless with everyone, so move the right finger in.
- If the sum is **too small**, the left value is too small even with the **largest** value left.
  Move the left finger in.

Every move rules out one value **for good**, together with every pair it could still have made.

## Step by step

Start with `l = 0` and `r = n − 1`. While `l < r`:

1. **Look** at the pair `(l, r)` and compute its score (a sum, an area, ...).
2. **If it is what you want**, record it or return it.
3. **Otherwise**, move the pointer that cannot be part of any better pair: `l += 1` or `r -= 1`.

The loop runs at most `n − 1` times, because the gap shrinks by one each step.

## Worked trace

Sorted array `[1, 3, 4, 6, 8, 11]`, target `10`.

| Step | l | r | a[l] | a[r] | Sum | Action          |
|-----:|--:|--:|-----:|-----:|----:|:----------------|
| 1    | 0 | 5 | 1    | 11   | 12  | too big → r −1  |
| 2    | 0 | 4 | 1    | 8    | 9   | too small → l +1 |
| 3    | 1 | 4 | 3    | 8    | 11  | too big → r −1  |
| 4    | 1 | 3 | 3    | 6    | 9   | too small → l +1 |
| 5    | 2 | 3 | 4    | 6    | 10  | found           |

Found `4 + 6` at indices **2 and 3** (0-based). ✓ Five looks instead of fifteen pairs.

## Why it is correct

The only danger is moving a pointer past a value that belonged to the answer. Take step 1: `11`
was dropped because `1 + 11 > 10`. Every other partner for `11` is at least `1` (the array is
sorted), so every pair using `11` is also too big. Nothing was lost. The same argument, mirrored,
covers every "too small" move. So the answer pair is never skipped, and since the gap closes each
step, the pointers must reach it.

## Beyond sums: moving the weaker side

The rule "move the pointer that cannot do better" is not only for sums. When a pair's score is
limited by the **smaller** of its two values, as with a container whose water level is set by its
shorter wall:

- Keeping the shorter side and moving the taller one inward can only make the width smaller while
  the height is still capped by that same short side. That pair can never improve.
- So the shorter side is the one that is used up. Move it.

Look at the score of every pair you visit and keep the best. You never need the pairs you skipped.

## Variant: same-direction read/write pointers

Two pointers can also move the **same** way. A fast **read** pointer scans every element, and a slow
**write** pointer marks where the next kept element goes. Whenever the read pointer finds something
worth keeping, copy it to the write slot and advance the write pointer. This removes duplicates or
filters an array in place, in O(n) time and O(1) space.

## Loop shape: `while` or `for`?

Ask one question: **does one pointer move on every single iteration, no matter what?**

- **No, the comparison decides which pointer moves.** Use `while`. This is the converging version:
  `while (l < r)`, and each branch moves `l` or `r`. Moving the pointers *is* the algorithm, so no
  `for` header can describe it.
- **Yes.** Make that pointer the `for` variable and keep the other one as a plain variable that
  moves inside the body. This is the read/write version: the read pointer visits every element,
  and the write pointer moves only when something is kept.

| Problem | Loop | Why |
|:--------|:-----|:----|
| 055 Two Sum II | `while (l < r)` | The sum decides which side moves |
| 009 Container With Most Water | `while (l < r)` | The shorter wall moves |
| 007 Valid Palindrome | `while (l < r)`, with inner `while`s to skip non-letters | Each side skips a different number of characters |
| 172 Squares of a Sorted Array | `for` over the output slot from the back, or `while (l <= r)` | The slot fills on every step; `l` and `r` still move by comparison. `<=` because the last element must be placed too |
| 054 Remove Duplicates, 102 Move Zeroes | `for` over the read pointer | Read moves every time, write only sometimes |
| 173 Is Subsequence | `for` over the long string | Its pointer moves every time; the short string's pointer moves only on a match |

## How to recognise it

- The input is **sorted**, or sorting it does not break the question.
- The question is about a **pair** (or a triple, by fixing one value and running two pointers on
  the rest).
- A follow-up asks for **O(1) extra space**, which rules out a hash map.
- "In place" on an array: that is usually the read/write variant.

## Common mistakes

- **Using `l <= r` for a pair.** A pair needs two different elements, so stop when they meet. (Use
  `l <= r` only when every element must be handled once, as in 172.)
- **Putting a converging pointer in a `for` header.** `for (l = 0; l < n; l++)` moves `l` on every
  iteration, even when the comparison says `r` should move. Add an `r--` in the body and both
  pointers now move together, so the comparison no longer chooses anything. Use `while (l < r)` and
  move exactly one pointer per branch.
- **Moving the wrong pointer.** Say out loud why the value you drop can never be in a better pair.
- **Forgetting the output format.** Some problems want 1-based indices, not 0-based.
- **Using it on unsorted data** for a sum. The "too big, so drop the right one" argument needs order.

## Practice

1. **[055 Two Sum II - Input Array Is Sorted](../../problems/02-two-pointers/055-two-sum-ii-input-array-is-sorted.js)**
   (Medium): the direct use. The array is sorted and exactly one pair works. Watch the indexing.
2. **[009 Container With Most Water](../../problems/02-two-pointers/009-container-with-most-water.js)**
   (Medium): not sorted, but the score is capped by the shorter line, so you always know which
   side to give up.

Run them with `./practice c 055` and `./practice c 009`.
