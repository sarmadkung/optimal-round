# Backtracking

> Build every candidate one choice at a time: choose, explore what follows, then undo the choice and try the next one.

**Family:** Recursion · Exhaustive search  
**Complexity:** proportional to the size of the decision tree: O(n · 2ⁿ) for subsets, O(n · n!) for permutations · O(n) extra space for the path and call stack  
**Practice:** [040 Subsets](../../problems/10-backtracking/040-subsets.js) · [041 Permutations](../../problems/10-backtracking/041-permutations.js)

---

## In 60 seconds

**The idea.** Every candidate is one route through a decision tree. Walk that tree depth-first
using a single shared list, the path: choose, explore, un-choose.

**The rule to remember.** One recursive function. Record the path if it is an answer, then for
each allowed choice: push it, recurse, pop it. Record a **copy**, never the path itself.

**Reach for it when** the question says "return **all**" subsets, permutations, combinations or
placements, and the input limit is tiny (n up to about 10–20).

**The traps.** Saving the path instead of a copy, forgetting to un-choose, and mixing up the two
"allowed" rules: a `start` index for subsets, a `used` flag for permutations.

Everything below is those same ideas, slowly.

## The problem it solves

Some questions ask for **every** arrangement: all subsets, all orderings, all ways to place
queens, all words on a board. There is no shortcut, because the answer itself is huge. What you
need is a clean, systematic way to visit each candidate **exactly once** without storing them
all while you build them.

Backtracking does that with a single growing and shrinking list, the **path**, and recursion.

## The core idea

Think of walking through a maze with a piece of chalk. At each fork you **choose** a branch and
mark it, then **explore** everything down that branch. When you come back to the fork you
**erase** the mark and take the next branch. You only ever carry one route in your head: the one
you are on right now.

Every problem of this kind is a **decision tree**:

- Each level of the tree is one decision ("include this element or not", "which element goes in
  position 2").
- Each root-to-node route is a partial candidate, the path.
- Backtracking is a depth-first walk over that tree.

## Step by step

Write one recursive function `explore(state)`:

1. **Record or stop.** If the path is a complete answer, save a **copy** of it. (For subsets,
   every node of the tree is an answer. For permutations, only the leaves are.)
2. **For each choice** still allowed from this state:
   - **Choose:** push it onto the path (and mark it used, if needed).
   - **Explore:** call `explore` on the new state.
   - **Un-choose:** pop it from the path (and unmark it), so the path is exactly as before.

The un-choose step is what makes one shared path safe: when a call returns, it leaves nothing behind.

### What "allowed" means

- **Subsets (combinations):** only elements **after** the last one chosen. Passing a `start`
  index forward means `[4, 5]` is built, but `[5, 4]` is never built as a duplicate.
- **Permutations:** any element **not already used**. Order matters, so every unused element may
  go in the next position. A `used` flag per element (or swapping in place) tracks this.

## Worked trace

Subsets of `[4, 5, 6]` with a `start` index. Each call records the current path first, then
tries the elements from `start` onward.

Here is the whole decision tree. Each arrow is a **choose**, each node is the path at that moment
and is recorded as an answer, and coming back up an arrow is the **un-choose**. Calls are numbered
in the order they actually happen, so reading the numbers top to bottom is the depth-first walk.

```
  []                                                        call 1   record []
  |
  +--choose 4--> [4]                                        call 2   record [4]
  |              |
  |              +--choose 5--> [4, 5]                      call 3   record [4, 5]
  |              |              |
  |              |              +--choose 6--> [4, 5, 6]    call 4   record [4, 5, 6]
  |              |
  |              +--choose 6--> [4, 6]                      call 5   record [4, 6]
  |
  +--choose 5--> [5]                                        call 6   record [5]
  |              |
  |              +--choose 6--> [5, 6]                      call 7   record [5, 6]
  |
  +--choose 6--> [6]                                        call 8   record [6]
```

A node's children are only the elements **after** the one it just took, which is what the `start`
index enforces. That is why `[5, 4]` never appears anywhere in the tree.

| Call | Path when called | Recorded  | Then, in order                                               |
|-----:|:-----------------|:----------|:-------------------------------------------------------------|
| 1    | []               | []        | choose 4 → call 2; un-choose 4; choose 5 → call 6; un-choose 5; choose 6 → call 8; un-choose 6 |
| 2    | [4]              | [4]       | choose 5 → call 3; un-choose 5; choose 6 → call 5; un-choose 6 |
| 3    | [4, 5]           | [4, 5]    | choose 6 → call 4; un-choose 6                               |
| 4    | [4, 5, 6]        | [4, 5, 6] | nothing left, return                                         |
| 5    | [4, 6]           | [4, 6]    | nothing left, return                                         |
| 6    | [5]              | [5]       | choose 6 → call 7; un-choose 6                               |
| 7    | [5, 6]           | [5, 6]    | nothing left, return                                         |
| 8    | [6]              | [6]       | nothing left, return                                         |

8 calls, 8 subsets, which is 2³. The path never held more than 3 items at once.

For permutations of the same `[4, 5, 6]`, the decision tree picks a position at a time from the
unused elements, and only full-length paths are recorded:

```
                       []
          /            |             \
        [4]           [5]            [6]
       /   \         /   \          /   \
   [4,5]  [4,6]   [5,4]  [5,6]   [6,4]  [6,5]
     |      |       |      |       |      |
  [4,5,6][4,6,5] [5,4,6][5,6,4] [6,4,5][6,5,4]
```

Walking it depth-first yields 456, 465, 546, 564, 645, 654: 3! = 6 results.

## Why it is correct

Every candidate corresponds to exactly one route from the root of the decision tree: the
sequence of choices that builds it. The loop in step 2 tries every allowed choice at every node,
so every route is walked. The rules for "allowed" make sure two different routes never build the
same candidate. And because every choose is matched by an un-choose, each call starts with the
path exactly as its parent left it. No route is ever polluted by a sibling's choices.

## Counting the cost

The running time is roughly (number of nodes in the tree) × (work per node).

| Problem      | Answers | Work to copy one answer | Total        |
|:-------------|--------:|:------------------------|:-------------|
| Subsets      | 2ⁿ      | up to n                 | O(n · 2ⁿ)    |
| Permutations | n!      | n                       | O(n · n!)    |

That is why these problems have tiny limits like n ≤ 10 or n ≤ 6. When a branch can be shown
to lead nowhere (a sum is already too big, a queen is attacked), **prune** it: return early and
skip that whole subtree.

Same tree as above, but now only subsets summing to **9 or less** count. Every node shows its path
and its sum; a node marked `✗` is rejected on sight, so no call is made and nothing below it is
built.

```
  []                                                        sum  0
  |
  +--choose 4--> [4]                                        sum  4
  |              |
  |              +--choose 5--> [4, 5]                      sum  9
  |              |              |
  |              |              +--choose 6--> [4, 5, 6]    sum 15  ✗ prune, no call
  |              |
  |              +--choose 6--> [4, 6]                      sum 10  ✗ prune, no call
  |
  +--choose 5--> [5]                                        sum  5
  |              |
  |              +--choose 6--> [5, 6]                      sum 11  ✗ prune, no call
  |
  +--choose 6--> [6]                                        sum  6
```

Three of the eight nodes are cut here. On a real input, one cut near the root removes an
exponential number of candidates at once.

## Loop shape

**Use recursion with a `for` over the choices.** The recursion is the "keep going deeper" loop, and
the `for` inside each call tries every choice at that level. There is no `while`.

- **Subsets:** `for (i = start; i < n; i++)`, then recurse with `i + 1`.
- **Permutations:** `for (i = 0; i < n; i++)`, skipping every `i` already used.

The classic slip is recursing with `start + 1` instead of `i + 1`. That lets the next level reuse
elements the current `for` has already moved past, and you get duplicates.

## How to recognise it

- "Return **all** subsets / permutations / combinations / partitions / placements".
- Very small input limits (n up to about 10–20).
- A candidate is built by a sequence of choices, and you can check or finish it along the way.

## Common mistakes

- **Saving the path itself instead of a copy.** Every saved answer is the same list, which ends
  up empty after the last un-choose.
- **Forgetting to un-choose.** Elements leak into sibling branches.
- **Mixing up the two "allowed" rules.** A `start` index for permutations misses orderings; a
  `used` flag for subsets produces `[4, 5]` and `[5, 4]` as duplicates.
- **Recording only at the leaves for subsets.** Every node of the subset tree is an answer,
  including the empty one at the root.

## Practice

1. **[040 Subsets](../../problems/10-backtracking/040-subsets.js)** (Medium): every node of the
   include-in-order decision tree is a subset, so record at each call and move forward only.
2. **[041 Permutations](../../problems/10-backtracking/041-permutations.js)** (Medium): each level
   fills the next position with an unused element, and only full-length paths are results.

Run them with `./practice c 040` and `./practice c 041`.
