# Union-Find

> Keep track of which items are in the same group while groups keep merging, in nearly O(1) per operation.

**Family:** Graphs · Disjoint sets  
**Complexity:** O(α(n)) amortised per operation (effectively constant) · O(n) space  
**Practice:** [143 Number of Connected Components in an Undirected Graph](../../problems/18-union-find/143-number-of-connected-components-in-an-undirected-graph.js) · [145 Redundant Connection](../../problems/18-union-find/145-redundant-connection.js)

---

## The problem it solves

You have n items, each starting in its own group. Two kinds of request arrive, in any order:

- **union(a, b)**: merge the group containing a with the group containing b.
- **find(a)**: which group is a in? (Mostly used as "are a and b in the same group?")

You could rerun a BFS over all edges for every question, but that costs O(V + E) each time.
Union-Find (also called a **disjoint set union**, or DSU) answers each request in almost constant
time, and it handles edges arriving one at a time without ever rebuilding anything.

## The core idea

Every group is a **club with a president**. Each member knows one other member, their `parent`,
and following parents upward always ends at the president, who is their own parent.

- **find(a)**: follow parents until you reach someone who is their own parent. That is the
  president, and the president's id **is** the group's id.
- **union(a, b)**: find both presidents. If they are the same person, a and b are already in one
  club. Otherwise, one president agrees to report to the other, and the two clubs become one.

Two small habits keep the chains of parents short:

- **Path compression:** after a find, point every member you walked past **directly** at the
  president. The next find from any of them takes one step.
- **Union by size (or rank):** when merging, the **smaller** club's president reports to the
  bigger club's president. Chains grow only when they must.

## Step by step

Start with `parent[i] = i` and `size[i] = 1` for every item. Optionally keep `groups = n`.

**find(x):**

1. Walk up from `x` until you reach `r` with `parent[r] == r`.
2. Walk the same path again, setting each node's parent to `r`.
3. Return `r`.

**union(a, b):**

1. `ra = find(a)`, `rb = find(b)`.
2. **If `ra == rb`**, they are already joined. Report "no merge" (this is where cycles show up).
3. **Otherwise**, make the root with the smaller size a child of the other root, add the sizes, and
   `groups -= 1`. Report "merged".

## Worked trace

7 items (0 to 6). Edges processed in this order: `[0,1]`, `[2,3]`, `[1,2]`, `[4,5]`, `[3,0]`,
`[5,6]`. On a tie in size, the first endpoint's root stays on top.

| Edge  | Roots found        | Action                         | parent after                | size after (roots)   | Groups |
|:-----:|:-------------------|:-------------------------------|:----------------------------|:---------------------|:------:|
| start | –                  | –                              | `[0, 1, 2, 3, 4, 5, 6]`     | all 1                | 7      |
| [0,1] | 0 and 1            | merge: 1 under 0               | `[0, 0, 2, 3, 4, 5, 6]`     | 0:2                  | 6      |
| [2,3] | 2 and 3            | merge: 3 under 2               | `[0, 0, 2, 2, 4, 5, 6]`     | 0:2, 2:2             | 5      |
| [1,2] | 0 and 2            | merge: 2 under 0               | `[0, 0, 0, 2, 4, 5, 6]`     | 0:4                  | 4      |
| [4,5] | 4 and 5            | merge: 5 under 4               | `[0, 0, 0, 2, 4, 4, 6]`     | 0:4, 4:2             | 3      |
| [3,0] | 0 and 0            | **same root, no merge**        | `[0, 0, 0, 0, 4, 4, 6]`     | 0:4, 4:2             | 3      |
| [5,6] | 4 and 6            | merge: 6 under 4 (smaller)     | `[0, 0, 0, 0, 4, 4, 4]`     | 0:4, 4:3             | 2      |

Final: **2** groups, `{0, 1, 2, 3}` and `{4, 5, 6}`. ✓

Two things to notice:

- Edge `[3,0]` joined two items that were **already connected** (through 3→2→0). That edge closes a
  cycle.
- In that same row, `parent[3]` changed from 2 to 0 even though nothing merged. That is path
  compression: the find from 3 walked 3→2→0 and then pointed 3 straight at 0.

## Why it is correct

**Groups are trees.** Every item has exactly one path of parents up to one root, so "same root"
means exactly "same group". A union only ever changes a **root's** parent, which joins two whole
trees and never splits one. Path compression only re-points nodes to the root they already had, so
it never changes anyone's group.

**Counting groups.** There are n groups at the start, and every successful merge turns two groups
into one. Failed merges (same root) change nothing. So the count is `n − (successful merges)`.

**Why it is fast.** With union by size, a node's tree at least doubles in size every time the node
gets one level deeper, so no tree is more than log₂ n deep even without compression. Adding path
compression brings the amortised cost down to O(α(n)), where α is the inverse Ackermann function.
It is at most 4 for any n you will ever store, which is why it is treated as constant.

## Cycle detection in undirected graphs

Process edges one at a time. An edge whose two endpoints **already share a root** connects two
nodes that were already joined by some other path, so adding it closes a cycle. The first such edge
is the first moment the graph stops being a forest.

That makes Union-Find the natural tool for "which edge makes this a cycle", and it is the heart of
**Kruskal's minimum spanning tree**: sort edges by weight, and keep each edge only if it merges.

## Loop shape

- **`find`: use `while (parent[x] !== x)`.** You walk up until you reach the root, and the depth is
  unknown. Path compression is a second `while` over the same path (or write `find` recursively).
- **`union`:** no loop. It is two `find` calls and one comparison.
- **Setup and driving:** a `for` to set `parent[i] = i`, then a `for` over the edges that calls
  `union`.

## How to recognise it

- "Number of connected components / provinces / groups", especially when edges are given as a list.
- "Are these two connected?" asked many times, or with edges being **added** over time.
- "Which edge creates a cycle?" in an **undirected** graph.
- Merging accounts, equivalences, or "these two are the same" relations.

Union-Find handles **adding** connections. It cannot remove them. For directed graphs or shortest
paths, use BFS/DFS or topological sort instead.

## Common mistakes

- **Linking `a` to `b` instead of root to root.** `parent[a] = b` can orphan the rest of a's tree.
  Always find both roots first.
- **Comparing `parent[a] == parent[b]`** instead of `find(a) == find(b)`. Parents are not roots.
- **Decrementing the group count on every edge**, including edges inside one group.
- **Off-by-one labels.** If nodes are 1-indexed, size the arrays `n + 1` or subtract 1.
- **Skipping both optimisations.** Chains can then grow to length n, and every find becomes O(n).

## Practice

1. **[143 Number of Connected Components in an Undirected Graph](../../problems/18-union-find/143-number-of-connected-components-in-an-undirected-graph.js)**
   (Medium): start with every node alone and let the edges merge groups. The answer is how many
   groups remain.
2. **[145 Redundant Connection](../../problems/18-union-find/145-redundant-connection.js)**
   (Medium): a tree plus one extra edge. Processing edges in input order, watch for the edge whose
   endpoints are already in the same group. Mind the 1-indexed labels.

Run them with `./practice c 143` and `./practice c 145`.
