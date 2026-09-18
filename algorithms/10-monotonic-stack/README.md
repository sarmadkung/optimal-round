# Monotonic Stack

> For every element, find the nearest bigger (or smaller) element to its side, in one pass.

**Family:** Stack · Arrays  
**Complexity:** O(n) time · O(n) space  
**Practice:** [062 Daily Temperatures](../../problems/04-stack/062-daily-temperatures.js) · [016 Largest Rectangle in Histogram](../../problems/04-stack/016-largest-rectangle-in-histogram.js)

---

## In 60 seconds

**The idea.** Keep a line of people still waiting to see someone taller. The line is always
decreasing in height, so a newcomer settles everyone shorter at the back, all at once, then joins
the line themselves.

**The rule to remember.** Hold a stack of **indices** whose answer is not known yet. For each `i`:
while the value on top loses to `a[i]`, pop it — `a[i]` is its answer. Then push `i`. Whatever is
left on the stack at the end has no answer.

**Reach for it when** the question is "next greater", "next smaller", "next warmer", "how many days
until", or a span that ends at the first taller or shorter item. The brute force is a nested loop
scanning outward from every element.

**The traps.** Pushing values instead of indices, so you lose the distance. Using `if` instead of
`while` when popping, when one newcomer may settle many. Forgetting the leftovers on the stack.

Everything below is those same ideas, slowly.

## The problem it solves

For each position in an array you want its **next greater element**: the first value to its right
that is bigger. (Or next smaller, previous greater, previous smaller. They are all the same trick.)

The obvious way scans right from every position until it finds something bigger. That is O(n²) on
a decreasing array. A monotonic stack answers the question for **every** position in one
left-to-right pass.

## The core idea

Imagine people standing in a queue, each waiting to see someone taller than themselves arrive.
People who are still waiting stand in a line, and that line is always in **decreasing height**
from front to back. It can't be otherwise: if someone taller had arrived after a shorter person,
the shorter person would already have their answer and would no longer be waiting.

When a new person walks in, everyone at the back of the line who is **shorter** than them has
finally found their answer. They leave. Then the newcomer joins the back of the line to wait for
their own answer.

The line is the stack. It stays **monotonic** (always decreasing, from bottom to top), and that is
where the name comes from.

## Step by step

Keep a stack of **indices** whose answer is not known yet. For each index `i` with value `x`:

1. **While the stack is not empty and the value at the top is less than `x`**: pop the top index
   `j`. Its next greater element is `x` (at distance `i − j`).
2. **Push `i`.**

When the loop ends, every index still on the stack has **no** greater element to its right.

Store indices, not values. From an index you can always read the value, and you also get the
distance and the position.

## Worked trace

Array: `[4, 2, 1, 3, 6, 5]`. Find each element's next greater **value** (−1 if none).
Stack entries are written `index(value)`, bottom to top.

| i | x | Popped (answer = x) | Stack after          | Answers so far              |
|:-:|:-:|:--------------------|:---------------------|:----------------------------|
| 0 | 4 | –                   | 0(4)                 | `[−1, −1, −1, −1, −1, −1]`  |
| 1 | 2 | –                   | 0(4) 1(2)            | `[−1, −1, −1, −1, −1, −1]`  |
| 2 | 1 | –                   | 0(4) 1(2) 2(1)       | `[−1, −1, −1, −1, −1, −1]`  |
| 3 | 3 | 2(1), 1(2)          | 0(4) 3(3)            | `[−1, 3, 3, −1, −1, −1]`    |
| 4 | 6 | 3(3), 0(4)          | 4(6)                 | `[6, 3, 3, 6, −1, −1]`      |
| 5 | 5 | –                   | 4(6) 5(5)            | `[6, 3, 3, 6, −1, −1]`      |

Indices 4 and 5 are left on the stack, so they keep −1. Result: **`[6, 3, 3, 6, −1, −1]`**. ✓

The same pass, drawn as shapes. Each column shows the stack *after* that index has been handled,
with the top of the stack at the top of the column and entries written `index(value)`:

```
  i = 0        i = 1        i = 2        i = 3        i = 4        i = 5
  x = 4        x = 2        x = 1        x = 3        x = 6        x = 5

                            2(1) <- top
               2(2) <- top  1(2)         3(3) <- top               5(5) <- top
  0(4) <- top  0(4)         0(4)         0(4)         4(6) <- top  4(6)
  -----------  -----------  -----------  -----------  -----------  -----------
  push 0       push 1       push 2       pop 2,1      pop 3,0      push 5
                                         push 3       push 4
```

Read the values up any column and they always decrease: `4, 2, 1` at `i = 2`, `6, 5` at `i = 5`.
That is the whole invariant. A newcomer eats the short entries off the top until the shape holds
again.

Notice that at step 3, a single new value settled two old ones. That is normal and is exactly what
saves the O(n²) scanning.

## Why it is correct

**Correct answers.** An index `j` is popped by the first later value that beats it. Every value
between `j` and `i` arrived while `j` was on the stack, and none of them popped `j`, so none of them
was bigger. Hence `x` is the **first** greater value to the right.

**Linear time.** Each index is pushed exactly once and popped at most once. The inner `while` can
run many times on one step, but across the whole pass it runs at most n times in total. So the
pass is O(n), not O(n²).

## Choosing the direction

Four questions, one pattern. Change only the comparison and the stack's order:

| You want, for each element…  | Stack order (bottom → top) | Pop while top is…  | Answer read when |
|:-----------------------------|:---------------------------|:-------------------|:-----------------|
| next **greater** to the right | decreasing                 | `<` current        | popping          |
| next **smaller** to the right | increasing                 | `>` current        | popping          |
| previous **greater** to the left | decreasing              | `<=` current       | after popping, the top (if any) |
| previous **smaller** to the left | increasing              | `>=` current       | after popping, the top (if any) |

Decide carefully whether "greater" means strict. With duplicates, `<` versus `<=` decides whether
an equal value counts as the answer.

## Both sides at once: the histogram trick

Some problems need **both** neighbours. For a bar of height `h`, the widest rectangle of height
exactly `h` stretches left until the previous **smaller** bar and right until the next **smaller**
bar.

An **increasing** stack gives you both in one pass. When bar `j` is popped by a lower bar `i`:

- `i` is its next smaller bar (the right wall).
- The index now on top of the stack, just below where `j` was, is its previous smaller bar (the
  left wall). An empty stack means the wall is the left edge of the array.

So the moment a bar is popped, its full width is known. Bars still on the stack at the end have no
right wall, so they stretch to the array's end. A common way to flush them is to process one extra
bar of height 0 after the last real one.

## Loop shape

**Use a `for` with a `while` inside**, the same shape as [Sliding Window](../05-sliding-window/README.md):

- **`for` over `i`.** Every index is pushed exactly once.
- **`while` to pop.** One new value may settle zero, one or many waiting indices.

It is O(n) despite the nesting: each index is popped at most once over the whole run.

- **Right-to-left variants:** `for (i = n − 1; i >= 0; i--)`.
- **Histogram flush:** run the `for` to `i <= n` and treat `i == n` as a bar of height 0, so no
  second loop is needed for the bars left on the stack.

## How to recognise it

- "Next greater", "next warmer", "next smaller", "how many days until".
- For each element, the **nearest** element to one side that satisfies a comparison.
- A range limited by the first taller or shorter item: spans, visibility, histograms, "trapping
  rain water".
- The brute force is a nested loop scanning outward from each element.

## Common mistakes

- **Pushing values instead of indices.** You lose the distance or width you need.
- **Wrong strictness.** `<` versus `<=` changes how equal values behave.
- **Forgetting the leftovers.** Indices still on the stack after the loop need their default
  answer (0, −1, or "reaches the end").
- **Using `if` instead of `while`** when popping. One new value may settle many old ones.
- **Off-by-one widths** in the histogram. The rectangle lies strictly **between** the two walls.

## Practice

1. **[062 Daily Temperatures](../../problems/04-stack/062-daily-temperatures.js)** (Medium): the
   direct use. For each day, find the next strictly warmer day, and report a distance rather than a
   value.
2. **[016 Largest Rectangle in Histogram](../../problems/04-stack/016-largest-rectangle-in-histogram.js)**
   (Hard): the two-sided version. Every bar needs both of its smaller neighbours, and the stack
   finds them at the moment the bar is popped.

Run them with `./practice c 062` and `./practice c 016`.
