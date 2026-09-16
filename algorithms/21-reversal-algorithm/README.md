# Reversal Algorithm

> Rearrange blocks of an array in place by reversing pieces of it with two pointers.

**Family:** Arrays · Two pointers  
**Complexity:** O(n) time · O(1) space  
**Practice:** [103 Rotate Array](../../problems/01-arrays-hashing/103-rotate-array.js) · [178 Next Permutation](../../problems/02-two-pointers/178-next-permutation.js)

---

## The problem it solves

You need to move a **block** of an array to a different place, for example "take the last k
values and put them in front", and you are not allowed a second array.

Shifting one step at a time costs O(n·k). Copying to a new array costs O(n) memory. Reversal
does it in O(n) time with nothing but a couple of index variables.

## The core idea

Reversing a stretch is the one in-place move that is easy: put a pointer at each end, swap, step
both inward, stop when they meet.

Reversing the **whole** array does two things at once. It moves the back block to the front
(good), but it also leaves both blocks **backwards** (bad). Reverse each block again on its own
and they read forwards, now in their new positions.

Picture a sentence `AB` where `A` and `B` are chunks. Reversing everything gives
`reverse(B) reverse(A)`. Reverse each chunk back and you get `BA`.

## Step by step

**The reverse primitive** on `l..r`: while `l < r`, swap `a[l]` and `a[r]`, then `l += 1`,
`r -= 1`.

**Rotate right by k:**

1. `k = k % n`. Rotating by `n` changes nothing.
2. Reverse the whole array `0..n−1`.
3. Reverse the first block `0..k−1`.
4. Reverse the rest `k..n−1`.

## Worked trace

Array: `[1, 2, 3, 4, 5, 6, 7, 8]`, rotate right by `k = 10`. First `k = 10 % 8 = 2`.
Expected result: the last two values `7, 8` move to the front.

| Step | Reverse range     | Array after                  |
|-----:|:------------------|:-----------------------------|
| –    | start             | `[1, 2, 3, 4, 5, 6, 7, 8]`   |
| 1    | whole, `0..7`     | `[8, 7, 6, 5, 4, 3, 2, 1]`   |
| 2    | first k, `0..1`   | `[7, 8, 6, 5, 4, 3, 2, 1]`   |
| 3    | rest, `2..7`      | `[7, 8, 1, 2, 3, 4, 5, 6]`   |

Result: `[7, 8, 1, 2, 3, 4, 5, 6]`. ✓

## Why it is correct

Write the array as `A` (first `n − k` values) followed by `B` (last `k` values). Reversing the
whole thing gives `rev(B) rev(A)`, with `rev(B)` occupying exactly the first `k` slots. Reversing
those `k` slots turns `rev(B)` back into `B`; reversing the remaining slots turns `rev(A)` back
into `A`. The array is now `B A`, which is the right rotation. Each value is swapped at most
twice, so the work is O(n).

## Reversal as a finishing move: next permutation

Reversal also shows up as the **last step** of other algorithms. The classic one is finding the
next permutation in dictionary order.

Scan from the right. The tail you pass over is **descending**, which means it is already the
**largest** arrangement of those values. To grow the number by the smallest possible amount:

1. Find the **pivot**: the first value from the right that is smaller than its right neighbour.
2. Swap it with the **rightmost** value in the tail that is strictly bigger than it.
3. The tail is still descending (its largest arrangement). **Reverse it** to make it ascending,
   its smallest arrangement.

Why reverse and not sort? Because the tail is already sorted backwards, so a reversal sorts it in
O(n). Trace on `[1, 5, 4, 2]`:

| Step              | Detail                                   | Array after      |
|:------------------|:-----------------------------------------|:-----------------|
| find pivot        | `1` at index 0 (tail `5, 4, 2` descends) | `[1, 5, 4, 2]`   |
| swap              | rightmost value > 1 is `2` at index 3    | `[2, 5, 4, 1]`   |
| reverse tail 1..3 | `5, 4, 1` → `1, 4, 5`                    | `[2, 1, 4, 5]`   |

`[2, 1, 4, 5]` is the smallest arrangement that begins with `2`, and nothing beginning with `1`
is bigger than `[1, 5, 4, 2]`. ✓

## Loop shape

- **Reverse primitive: `while (l < r)`**, or `for (l = a, r = b; l < r; l++, r--)`. Here both
  pointers move on **every** step, so both forms are fine. That is the difference from converging
  [Two Pointers](../03-two-pointers/README.md), where a comparison picks one pointer and only
  `while` works.
- **Rotate:** no loop of its own, just three calls to the reverse.
- **Next permutation: "scan until you find" is a `while`.** Finding the pivot means stepping left
  while the tail is still descending, and finding the swap partner means stepping left while the
  value is not bigger. Each stops on a condition, not a count.

## How to recognise it

- "Rotate", "shift by k", or "move the last k to the front", **in place**.
- Swapping two adjacent blocks of different lengths.
- A suffix or prefix is known to be **sorted backwards** and you need it sorted forwards.
- Reverse the words of a sentence: reverse everything, then each word.

## Common mistakes

- **Skipping `k % n`.** A `k` bigger than `n` then reverses out-of-range blocks.
- **Off-by-one block edges.** The first block is `0..k−1`, the second starts at `k`.
- **Reversing `0..k−1` and `k..n−1` first, then the whole array.** That order gives a **left**
  rotation by k instead. (To reverse the blocks first, split at `n − k`.)
- **In next permutation, sorting the tail** (O(n log n)) when a reversal already suffices, or
  swapping with the **first** larger value instead of the rightmost one when duplicates exist.

## Practice

1. **[103 Rotate Array](../../problems/01-arrays-hashing/103-rotate-array.js)** (Medium): the
   direct use. Three reversals rotate right in place, once `k` is reduced.
2. **[178 Next Permutation](../../problems/02-two-pointers/178-next-permutation.js)** (Medium):
   find the pivot and make the swap, then a reversal turns the descending suffix into the
   smallest one. Don't forget the wrap-around when there is no pivot.

Run them with `./practice c 103` and `./practice c 178`.
