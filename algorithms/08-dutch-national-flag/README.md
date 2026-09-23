# Dutch National Flag

> Sort an array of three kinds of values in one pass and O(1) memory, using three pointers.

**Family:** Arrays · Two Pointers · Partitioning  
**Complexity:** O(n) time · O(1) space  
**Practice:** [056 Sort Colors](../../problems/02-two-pointers/056-sort-colors.js)

---

## In 60 seconds

**The idea.** Three pointers cut the array into four zones: lows, middles, unknown, highs. `mid`
reads one unknown value at a time and swaps it into the zone where it belongs, until no unknown is
left.

**The rule to remember.** Start `low = 0`, `mid = 0`, `high = n − 1`. While `mid <= high`, look at
`nums[mid]`: a low swaps with `low` then `low += 1, mid += 1`; a middle just needs `mid += 1`; a
high swaps with `high` then `high -= 1` and **`mid` stays put**.

**Reach for it when** values fall into exactly three categories in a fixed order and the problem
says **in place** or **one pass** — or when you need a three-way partition around a pivot.

**The traps.** Advancing `mid` after a swap with `high`, which skips a value nobody has looked at.
Looping while `mid < high`, which never checks the last unknown.

Everything below is those same ideas, slowly.

## The problem it solves

Every value in the array belongs to one of **three groups**: "low", "middle" and "high". You want
all the lows first, then the middles, then the highs, rearranged **in place**.

A general sort costs O(n log n). Counting each group and overwriting the array is O(n) but needs
two passes. Dutch National Flag (named by Edsger Dijkstra after the red, white and blue flag) does
it in **one pass**, swapping values into place as it reads them.

## The core idea

Picture the array as a shelf being tidied from both ends at once. At any moment it is split into
four zones:

| Zone                  | Holds                         |
|:----------------------|:------------------------------|
| `[0, low)`            | lows, already in place        |
| `[low, mid)`          | middles, already in place     |
| `[mid, high]`         | **unknown**, not yet looked at |
| `(high, end]`         | highs, already in place       |

A snapshot of the array part-way through, with each pointer under the slot it names:

```
  [   lows    |   middles   |      unknown      |    highs     ]
               ^             ^                 ^
              low           mid              high
```

So `low` is the first middle, `mid` is the first unknown, and `high` is the last unknown.

`mid` is the reader. Each step it looks at one unknown value and moves it into the right zone,
shrinking the unknown zone by one. When the unknown zone is empty, the array is sorted.

## Step by step

Start with `low = 0`, `mid = 0`, `high = n − 1`. While `mid <= high`, look at `x = nums[mid]`:

1. **If `x` is low**, swap it with `nums[low]`. Then `low += 1` and `mid += 1`.
2. **If `x` is middle**, it is already in the middle zone: `mid += 1`.
3. **If `x` is high**, swap it with `nums[high]`. Then `high -= 1`, but **do not move `mid`**.

Why the difference between rules 1 and 3? The value swapped in from `low` came from the middle
zone, which `mid` has already seen, so it is known to be a middle. The value swapped in from
`high` came from the **unknown** zone, so `mid` must look at it before moving on.

## Worked trace

Array: `[1, 2, 0, 2, 1, 0]`, with 0 = low, 1 = middle, 2 = high.

| Step | low, mid, high (before) | x | Rule                            | Array after          | low, mid, high (after) |
|-----:|:------------------------|:-:|:--------------------------------|:---------------------|:-----------------------|
| 1    | 0, 0, 5                 | 1 | middle → mid+1                  | `[1, 2, 0, 2, 1, 0]` | 0, 1, 5                |
| 2    | 0, 1, 5                 | 2 | high → swap mid/high, high−1    | `[1, 0, 0, 2, 1, 2]` | 0, 1, 4                |
| 3    | 0, 1, 4                 | 0 | low → swap low/mid, low+1, mid+1 | `[0, 1, 0, 2, 1, 2]` | 1, 2, 4                |
| 4    | 1, 2, 4                 | 0 | low → swap low/mid, low+1, mid+1 | `[0, 0, 1, 2, 1, 2]` | 2, 3, 4                |
| 5    | 2, 3, 4                 | 2 | high → swap mid/high, high−1    | `[0, 0, 1, 1, 2, 2]` | 2, 3, 3                |
| 6    | 2, 3, 3                 | 1 | middle → mid+1                  | `[0, 0, 1, 1, 2, 2]` | 2, 4, 3                |

`mid` (4) has passed `high` (3), so the unknown zone is empty. Result: **`[0, 0, 1, 1, 2, 2]`**. ✓

Look at step 2: the `0` that arrived at index 1 was not skipped. `mid` stayed put and handled it
in step 3.

## Why it is correct

The four zones described above are an **invariant**: true before the loop, and kept true by every
rule.

- Rule 1 grows the low zone by one and pushes a known middle one slot right. Zones stay valid.
- Rule 2 grows the middle zone by one.
- Rule 3 grows the high zone by one and brings an unseen value into `mid`, which is still unknown.

Every step shrinks the unknown zone `[mid, high]` by exactly one, so the loop runs at most n times.
When it ends the unknown zone is empty, and the three remaining zones are in order.

## Partitioning around a pivot

The "three groups" don't have to be the literal values 0, 1, 2. Any rule that sorts values into
**less than / equal to / greater than** a pivot works the same way. This is the **three-way
partition** used by quicksort variants to handle many duplicate keys: everything equal to the pivot
lands in the middle zone and never needs to be sorted again.

With only **two** groups you need just one boundary, which is the simpler "move all zeros" or
"evens before odds" partition.

## Loop shape

**Use `while (mid <= high)`.** Rule 3 moves `high` but deliberately **leaves `mid` where it is**,
so `mid` does not advance on every iteration. A `for (mid …)` header would add 1 anyway and skip
the unknown value that was just swapped in.

This is a general rule: **if any branch must leave the index where it is, use `while`.**

The two-group partition (102 Move Zeroes) is different. The read pointer moves on every step and
only the write pointer waits, so it is a `for` over the read pointer.

## How to recognise it

- Values fall into **exactly three** categories, and the order of categories is fixed.
- The problem says **in place**, **one pass**, or forbids library sort.
- Quicksort with lots of repeated values, or "partition around a pivot".

## Common mistakes

- **Advancing `mid` after swapping with `high`.** The incoming value is unseen and gets skipped.
- **Looping while `mid < high`.** The last unknown value, where `mid == high`, never gets checked.
- **Moving `low` without moving `mid` in rule 1.** When `low == mid`, `low` then overtakes `mid`
  and the zones stop making sense.
- **Counting and overwriting** when the problem asks for one pass. It is correct, but it is the
  two-pass version.

## Where it is used in the real world

- **Sorting libraries.** Three-way partitioning is what keeps quicksort from degrading on arrays
  full of duplicates; production sorts such as Java's dual-pivot quicksort and Rust's pdqsort
  depend on it.
- **Graphics.** Building a BSP tree splits polygons into in-front, on, and behind a plane — the
  same three-way pass, done per node.
- **One-pass triage.** Bucketing records into pass / warn / fail, or messages into drop / retry /
  deliver, in a single scan with no extra buffers.

## Practice

1. **[056 Sort Colors](../../problems/02-two-pointers/056-sort-colors.js)** (Medium): the
   algorithm's namesake problem. The three colours are the three zones, and the array must be
   sorted in place in one pass.

Run it with `./practice c 056`.
