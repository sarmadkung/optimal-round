# Heap Top-K

> Keep the k best items seen so far in a small heap whose top is the **worst** of them.

**Family:** Heap / Priority queue · Selection  
**Complexity:** O(n log k) time · O(k) space  
**Practice:** [006 Top K Frequent Elements](../../problems/01-arrays-hashing/006-top-k-frequent-elements.js) · [093 K Closest Points to Origin](../../problems/13-heap-priority-queue/093-k-closest-points-to-origin.js)

---

## In 60 seconds

**The idea.** A club with k chairs and a bouncer. The bouncer only needs to know the **weakest**
person seated: a newcomer who beats them takes their chair, anyone else is turned away.

**The rule to remember.** Order the heap so its top is the **worst** kept item — the opposite of
the goal. Min-heap for the k largest, max-heap for the k smallest. Push while size < k, then
replace the top only when the new item beats it.

**Reach for it when** the ask is "k most frequent", "k closest", "top k", any order accepted, or
the data is a stream and `n` is much bigger than `k`. O(n log k) instead of O(n log n).

**The traps.** Using the same ordering as the goal, so you can't evict the worst cheaply. Pushing
everything and popping k times, which is just sorting. Taking square roots for distances.

Everything below is those same ideas, slowly.

## The problem it solves

You have n items and want the **k best** by some score: most frequent, closest, largest. Sorting
all n items costs O(n log n) and orders items you will throw away.

A size-k heap only ever holds k items, so each step costs O(log k). When k is much smaller than
n, that is a big saving, and it works on a stream you can't store.

## The core idea

Think of a club with **k chairs** and a bouncer. The bouncer only needs to know one thing: who
is the **weakest** person currently seated. When someone new arrives:

- If a chair is free, they sit.
- If they beat the weakest seated person, that person is thrown out and the newcomer sits.
- Otherwise they are turned away.

At the end, the k seated people are the k best.

A heap is the tool that always tells you the weakest seated person in O(1) and lets you swap them
out in O(log k). The twist that confuses everyone is the **ordering is opposite to the goal**:

| You want the k…      | Weakest = | Use a…    |
|:---------------------|:----------|:----------|
| largest / most frequent | smallest  | **min**-heap |
| smallest / closest   | largest   | **max**-heap |

## Step by step

With a heap ordered so the top is the **worst** kept item:

1. For each item `x`:
   - **If heap size < k** → push `x`.
   - **Else if `x` is better than the top** → pop the top, push `x` (or replace the top).
   - **Else** → skip `x`.
2. When done, the heap holds the answer (in heap order, not sorted).

## Worked trace

Find the **3 largest** of `[4, 9, 1, 7, 3, 8, 6]` with a min-heap of size 3. The heap contents
are listed in sorted order for readability; "top" is the smallest.

| Step | x | Heap before | Rule                   | Heap after  | Top |
|-----:|:-:|:------------|:-----------------------|:------------|:---:|
| 1    | 4 | –           | size < 3 → push        | `4`         | 4   |
| 2    | 9 | `4`         | size < 3 → push        | `4 9`       | 4   |
| 3    | 1 | `4 9`       | size < 3 → push        | `1 4 9`     | 1   |
| 4    | 7 | `1 4 9`     | 7 > 1 → replace top    | `4 7 9`     | 4   |
| 5    | 3 | `4 7 9`     | 3 ≤ 4 → skip           | `4 7 9`     | 4   |
| 6    | 8 | `4 7 9`     | 8 > 4 → replace top    | `7 8 9`     | 7   |
| 7    | 6 | `7 8 9`     | 6 ≤ 7 → skip           | `7 8 9`     | 7   |

Result: **7, 8, 9**. ✓ And the top, `7`, is the 3rd largest by itself.

## Why it is correct

The heap always holds the k best items among those seen so far. That is true while it is filling
up. Afterwards, a new item enters only by beating the current worst kept item, so the kept set
stays the best k. An item that is skipped or evicted is beaten by k kept items. Those items never
leave except for even better ones, so it can never belong in the final top k.

## JavaScript has no built-in heap

Python has `heapq` and Java has `PriorityQueue`; JavaScript has neither. In an interview you can:

- **Write a small binary heap** on an array: parent of `i` is `(i − 1) >> 1`, children are
  `2i + 1` and `2i + 2`. You need "sift up" after a push and "sift down" after replacing the top.
  Pass a comparator so the same code serves as a min-heap or max-heap.
- **Say so and use an alternative** below when the problem allows it.

## Alternatives worth knowing

- **Bucket sort by frequency (006).** A count can never exceed `n`, so make buckets `0..n` and put
  each value in the bucket for its count. Then walk buckets from `n` down, collecting values until
  you have k. That is **O(n)** with no heap at all. For `[7, 7, 3, 3, 3, 9, 1, 1, 1, 1]` the
  counts give buckets `1: [9]`, `2: [7]`, `3: [3]`, `4: [1]`.
- **Quickselect (093).** Partition by score to put the k best on one side in O(n) average. See
  [19 Quickselect](../19-quickselect/README.md).
- **Sorting** is fine when k is close to n.

## Loop shape

- **Driver: `for` over the items.** Each one is offered to the heap once.
- **Inside the heap: `while`.** Sift-up and sift-down move an item until it is in place, and the
  number of levels it moves depends on the values.
- **Draining the answer:** `while (heap.size > 0)`.

## How to recognise it

- "k most frequent", "k closest", "k largest / smallest", "top k".
- "Any order is acceptable": you don't need the whole list sorted.
- A stream, or `n` much bigger than `k`.

## Common mistakes

- **Using the heap with the same ordering as the goal** (a max-heap for the k largest). Then the
  top is the best item, the one you should keep, and you can't evict the worst cheaply.
- **Pushing everything and popping k times.** Correct, but O(n log n), no better than sorting.
- **Taking square roots** for distances. Compare squared distances; the order is the same.
- **Counting and selecting in one go** for frequency problems. Count everything first, then run
  the heap over the distinct values.

## Where it is used in the real world

- **Search engines.** Lucene scans posting lists and keeps only the best k documents in a bounded
  priority queue; the rest are scored and discarded without ever being sorted.
- **Vector search.** Approximate nearest-neighbour indexes such as HNSW carry a heap of the best
  candidates found so far, and use its worst entry to decide when to stop exploring.
- **Leaderboards and trends.** Top k hashtags, best-selling products, slowest queries — computed
  over a stream far larger than the answer.
- **Schedulers and simulations.** The same structure is the ready queue in a priority scheduler and
  the event queue in a discrete-event simulator.
- **Other algorithms.** Dijkstra, Prim's and A* are all built on this priority queue.

## Practice

1. **[006 Top K Frequent Elements](../../problems/01-arrays-hashing/006-top-k-frequent-elements.js)**
   (Medium): count first, then keep the k highest counts in a min-heap, or skip the heap and try
   bucket sort for O(n).
2. **[093 K Closest Points to Origin](../../problems/13-heap-priority-queue/093-k-closest-points-to-origin.js)**
   (Medium): "closest" means smallest distance, so the worst kept point is the farthest one. Pick
   the heap ordering to match.

Run them with `./practice c 006` and `./practice c 093`.
