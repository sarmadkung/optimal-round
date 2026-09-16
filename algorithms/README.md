# Algorithms

`problems/` is organised by **topic**. This folder is organised by **technique**: 23 named
algorithms, each explained in plain words, with 1–2 practice problems it solves.

The explanations have no solution code on purpose. Read the explanation, then solve the linked
problem yourself and check it with `./practice c NNN`.

Not sure which algorithm a problem needs? Start with the [problem-reading guide](../GUIDE.md).

Every explainer has the same sections: the problem it solves, the core idea, step-by-step
rules, a worked trace, why it is correct, which loop to use (`for` or `while`), how to recognise
it, common mistakes, and practice.

## Arrays & sequences

| # | Algorithm | In one line | Practice |
|---|-----------|-------------|----------|
| 01 | [Boyer-Moore Voting](01-boyer-moore-voting/README.md) | Majority element in O(1) space by cancelling pairs | 101 · 167 |
| 02 | [Kadane's Algorithm](02-kadanes-algorithm/README.md) | Best subarray: extend the current run or start fresh | 004 · 079 |
| 03 | [Two Pointers](03-two-pointers/README.md) | Squeeze from both ends of a sorted array | 055 · 009 |
| 04 | [Fast & Slow Pointers](04-fast-and-slow-pointers/README.md) | Floyd's cycle detection: the fast runner laps the slow one | 022 · 160 |
| 05 | [Sliding Window](05-sliding-window/README.md) | Grow the right edge, shrink the left while the window is invalid | 012 · 057 |
| 06 | [Prefix Sum](06-prefix-sum/README.md) | Any range sum in O(1); with a hash map, count subarrays | 156 · 053 |
| 07 | [Binary Search](07-binary-search/README.md) | Halve the search space, including searching on the answer | 017 · 065 |
| 08 | [Dutch National Flag](08-dutch-national-flag/README.md) | Three-way partition in one pass | 056 |
| 09 | [Cyclic Sort](09-cyclic-sort/README.md) | Values in 1..n are their own indices | 166 · 169 |
| 19 | [Quickselect](19-quickselect/README.md) | k-th element in average O(n) by partitioning | 092 |
| 20 | [XOR Tricks](20-xor-tricks/README.md) | Pairs cancel out: x ^ x = 0 | 046 · 089 |
| 21 | [Reversal Algorithm](21-reversal-algorithm/README.md) | Rotate and rearrange in place with reversals | 103 · 178 |
| 22 | [Interval Merging](22-interval-merging/README.md) | Sort by start, then sweep | 043 · 085 |
| 23 | [Heap Top-K](23-heap-top-k/README.md) | Keep a size-k heap of the best so far | 006 · 093 |

## Stacks, graphs & search

| # | Algorithm | In one line | Practice |
|---|-----------|-------------|----------|
| 10 | [Monotonic Stack](10-monotonic-stack/README.md) | Next greater or smaller element for everyone in O(n) | 062 · 016 |
| 11 | [BFS & DFS](11-bfs-and-dfs/README.md) | Flood fill a grid; BFS level by level | 029 · 074 |
| 12 | [Topological Sort](12-topological-sort/README.md) | Order tasks by dependencies (Kahn's algorithm) | 030 · 147 |
| 13 | [Union-Find](13-union-find/README.md) | Merge sets and ask "same group?" in near O(1) | 143 · 145 |
| 14 | [Dijkstra](14-dijkstra/README.md) | Shortest paths with non-negative weights using a min-heap | 148 |
| 15 | [Bellman-Ford](15-bellman-ford/README.md) | Shortest paths by relaxing every edge, with a limit on edges | 150 |
| 16 | [Prim's MST](16-prims-mst/README.md) | Grow a minimum spanning tree one cheapest edge at a time | 149 |
| 17 | [Backtracking](17-backtracking/README.md) | Choose, explore, un-choose | 040 · 041 |
| 18 | [Sieve of Eratosthenes](18-sieve-of-eratosthenes/README.md) | Cross out multiples to find every prime up to n | 162 |
