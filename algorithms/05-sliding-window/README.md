# Sliding Window

> Grow a window from the right, shrink it from the left, and never look at the same element twice from either side.

**Family:** Arrays · Strings · Pointers  
**Complexity:** O(n) time · O(size of the window's summary) space, often just the alphabet  
**Practice:** [012 Longest Substring Without Repeating Characters](../../problems/03-sliding-window/012-longest-substring-without-repeating-characters.js) · [057 Longest Repeating Character Replacement](../../problems/03-sliding-window/057-longest-repeating-character-replacement.js)

---

## In 60 seconds

**The idea.** A caterpillar crawling along the array. The head always moves forward and eats one
new element. When the rule breaks, the tail creeps forward dropping elements until it holds again.
Neither end ever walks backwards.

**The rule to remember.** For each `r`: add element `r` to the window's summary, then while the
window is invalid remove element `l` and do `l += 1`, then record the length `r − l + 1`.

**Reach for it when** the question asks for the longest or shortest **contiguous** stretch obeying
a monotone rule: "no repeating", "at most k distinct", "at most k changes". A named length `k` means
the fixed-size version.

**The traps.** Using `if` instead of `while` to shrink, and recording `best` before the window is
valid again.

Everything below is those same ideas, slowly.

## The problem it solves

"Find the longest (or shortest) **contiguous** stretch that obeys some rule." There are about n²/2
substrings, and checking each one costs more time again, so brute force is O(n²) or worse.

A sliding window keeps **one** candidate stretch at a time and updates it by a single element at
each move. Each element enters the window once and leaves at most once, so the total work is O(n).

## The core idea

Think of a caterpillar crawling along the array. Its **head** (the right edge) always moves forward
and eats one new element. If what it is now holding breaks the rule, its **tail** (the left edge)
creeps forward, dropping elements, until the rule holds again. The caterpillar never walks
backwards.

To make this cheap, the window keeps a small **summary** of what is inside it: a set of characters,
a count per letter, a running sum. Adding or removing one element updates the summary in O(1).

- **`l`** is the left edge, **`r`** is the right edge. The window is `l..r`, inclusive.
- The **summary** describes exactly the elements in `l..r`.

## Step by step

Start with `l = 0` and an empty summary. For each `r` from `0` to `n − 1`:

1. **Grow:** add element `r` to the summary.
2. **Shrink while invalid:** while the window breaks the rule, remove element `l` from the summary
   and do `l += 1`.
3. **Record:** the window `l..r` is valid now, so update `best` with its length `r − l + 1`.

## Worked trace

String `"tmmzuxt"`. Rule: no character may appear twice. Summary: the set of characters in the window.

| r | Char | Removed from left | l | Window  | Length | best |
|--:|:----:|:------------------|--:|:--------|-------:|-----:|
| 0 | t    | –                 | 0 | `t`     | 1      | 1    |
| 1 | m    | –                 | 0 | `tm`    | 2      | 2    |
| 2 | m    | `t`, `m`          | 2 | `m`     | 1      | 2    |
| 3 | z    | –                 | 2 | `mz`    | 2      | 2    |
| 4 | u    | –                 | 2 | `mzu`   | 3      | 3    |
| 5 | x    | –                 | 2 | `mzux`  | 4      | 4    |
| 6 | t    | –                 | 2 | `mzuxt` | 5      | 5    |

Final answer: **5** (`"mzuxt"`). ✓

Step 6 is worth a look. `t` appeared before, at index 0, but that copy already left the window at
step 2. The summary describes only what is **inside** the window, so there is no clash.

The same run as a picture. Each line shows the window at one moment, and `r = 2` gets three lines
because the tail has to move twice before the rule holds again.

```
  index     0  1  2  3  4  5  6
  string    t  m  m  z  u  x  t

  r=0      [t]                          valid              best = 1
  r=1      [t  m]                       valid              best = 2
  r=2      [t  m  m]                    m twice   -> drop t
  r=2         [m  m]                    still bad -> drop m
  r=2            [m]                    valid              best = 2
  r=3            [m  z]                 valid              best = 2
  r=4            [m  z  u]              valid              best = 3
  r=5            [m  z  u  x]           valid              best = 4
  r=6            [m  z  u  x  t]        valid              best = 5
```

Neither edge ever moves left. That is the whole reason the caterpillar costs O(n), not O(n²).

## Why it is correct

Fix any right edge `r`. The window keeps the **smallest** `l` for which `l..r` is valid. That works
because the rule is **monotone**: if a stretch is valid, every shorter stretch inside it is valid
too, and if it is invalid, every longer stretch around it is invalid. So once the tail drops an
element, no later window could have wanted it back, and the tail never needs to move left. Each
`r` therefore sees its longest valid window, and `best` takes the longest of all of them.

## Fixed-size windows

When the problem names the length, for example "the largest sum of any 3 in a row", the window never
changes size. Once it holds `k` elements, every step adds element `r` and removes element `r − k` in
the same move. On `[2, 1, 5, 1, 3, 2]` with `k = 3` the sums are `8, 7, 9, 6`, each found from the
previous one with one add and one subtract. The best is **9**.

## Variable windows with a counted rule

Some rules are not "no repeats" but "this window can be **fixed up** cheaply". Keep a count per
value in the window, and phrase validity in terms of those counts and the window length. Grow, and
shrink only when the count-based test fails. The loop shape is exactly the same as above; only the
summary and the test change.

## Loop shape

**Use a `for` with a `while` inside.** This is the shape worth memorising:

- **`for` over `r`.** The right edge grows by exactly one on every iteration, no matter what.
- **`while` over `l`.** The left edge moves **zero or more** times, and only while the window is
  invalid. The data decides how many times, so it is a `while`.

Declare `l` **outside** the `for`. It keeps its value from one iteration to the next.

It looks like nested loops, but it is O(n). `l` only moves forward and never resets, so across the
whole run the inner `while` does at most n steps in total.

**Fixed-size windows** need no inner loop. The window drops exactly one element per step, so it is
`if (r >= k)`, remove element `r − k`.

## How to recognise it

- "Longest / shortest **substring** or **subarray**" (contiguous) that satisfies a rule.
- The rule is monotone: shrinking a valid window keeps it valid.
- "At most k changes", "at most k distinct", "no repeating".
- A fixed length `k` is given: that is the fixed-size version.

## Common mistakes

- **Using `if` instead of `while` to shrink.** One removal may not be enough.
- **Recording `best` before the window is valid again.** Shrink first, then record.
- **Forgetting to update the summary when `l` moves.** The summary must match `l..r` exactly.
- **Using it with negative numbers and a sum target.** Adding a negative makes the sum smaller, so
  the rule stops being monotone. That needs prefix sums instead.
- **Off by one on length.** An inclusive window `l..r` has `r − l + 1` elements.

## Practice

1. **[012 Longest Substring Without Repeating Characters](../../problems/03-sliding-window/012-longest-substring-without-repeating-characters.js)**
   (Medium): the direct use. The rule is "no character twice".
2. **[057 Longest Repeating Character Replacement](../../problems/03-sliding-window/057-longest-repeating-character-replacement.js)**
   (Medium): the rule is "at most `k` changes make it one letter". Work out what that means in terms
   of letter counts and the window length.

Run them with `./practice c 012` and `./practice c 057`.
