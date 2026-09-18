# Prim's Algorithm (Minimum Spanning Tree)

> Connect every node for the least total edge weight by growing one tree outward, always adding the cheapest edge that reaches a new node.

**Family:** Graphs · Minimum spanning tree · Greedy  
**Complexity:** O(E log V) with a heap · O(V²) with a plain array (best for dense graphs) · O(V) extra space  
**Practice:** [149 Min Cost to Connect All Points](../../problems/19-advanced-graphs/149-min-cost-to-connect-all-points.js)

---

## In 60 seconds

**The idea.** Lay cable outward from one building. Look at every cable running from a covered
building to an uncovered one, lay the cheapest, and that covers one more building. Repeat until
all V are covered, which takes exactly `V − 1` edges.

**The rule to remember.** Keep `best[v]`, the cheapest known single edge from the tree to `v`. Take
the node not yet in the tree with the smallest `best`, add it, then update every remaining node
with `best[v] = min(best[v], weight(u, v))` for the node `u` just added.

**Reach for it when** the words are "connect all" or "minimum total cost", and the answer is a
**sum** of edge weights rather than a distance between two nodes. Points on a plane where any pair
can be joined make a dense graph, which favours the O(V²) array version.

**The traps.** Ranking nodes by `dist[u] + w` as Dijkstra does, instead of by the single edge
weight `w` into the tree, and adding a node twice in the heap version.

Everything below is those same ideas, slowly.

## The problem it solves

You have nodes and weighted undirected edges between them. Pick a set of edges so that every
node is connected, there is exactly **one path** between any two nodes (no cycles), and the
total weight is as small as possible. That set is a **minimum spanning tree** (MST). With V
nodes it always has exactly `V − 1` edges.

Trying every possible tree is hopeless: a complete graph has `V^(V−2)` spanning trees. Prim's
builds the best one directly.

## The core idea

Imagine laying cable from a single building. You already cover some buildings. Look at every
cable that runs from a covered building to an uncovered one, and lay the **cheapest** of them.
Now one more building is covered. Repeat until every building is covered.

The tree only ever grows at its edge, one node at a time, and each step is the cheapest possible
way to add *some* new node.

## Step by step

Keep `best[v]`: the cheapest known edge from the tree to node `v` (infinity at first), and
`inTree[v]`.

1. Pick any start node and set its `best` to 0.
2. **Pick** the node not yet in the tree with the smallest `best`. Add it to the tree and add
   its `best` to the total.
3. **Update** every node not in the tree: `best[v] = min(best[v], weight(u, v))`, where `u` is the
   node just added.
4. Repeat until all V nodes are in the tree.

### Two ways to do step 2

- **Heap version.** Push `(weight, node)` offers into a min-heap, pop the smallest, and skip it
  if the node is already in the tree (the same lazy-deletion idea as
  [Dijkstra](../14-dijkstra/README.md)). O(E log V). Best when the graph is **sparse**.
- **Array version.** Scan the whole `best` array to find the minimum. That is V scans of V
  entries: O(V²), with no heap at all. When the graph is **dense** (E close to V², like "every
  pair of points can be joined"), O(V²) beats O(E log V) = O(V² log V).

## Worked trace

Points `P0 (0,0)`, `P1 (1,3)`, `P2 (4,1)`, `P3 (5,5)`, `P4 (2,6)`. Every pair can be joined, and
the cost is the Manhattan distance `|x1 − x2| + |y1 − y2|`. This uses the array version, starting
at P0. `best` is listed for P0 to P4, and ✓ means already in the tree.

| Step | Add       | Edge cost | Total | best after (P0..P4) |
|-----:|:----------|----------:|------:|:--------------------|
| 1    | P0 (0,0)  | 0         | 0     | ✓, 4, 5, 10, 8      |
| 2    | P1 (1,3)  | 4         | 4     | ✓, ✓, 5, 6, 4       |
| 3    | P4 (2,6)  | 4         | 8     | ✓, ✓, 5, 4, ✓       |
| 4    | P3 (5,5)  | 4         | 12    | ✓, ✓, 5, ✓, ✓       |
| 5    | P2 (4,1)  | 5         | 17    | ✓, ✓, ✓, ✓, ✓       |

Minimum total: **17**, using edges P0–P1, P1–P4, P4–P3 and P0–P2 (4 edges for 5 nodes). P1–P2 also
costs 5, so an equally cheap tree could use it instead: the MST's total is unique, its edges need
not be.

Notice step 2: adding P1 dropped `best[P4]` from 8 (direct from P0) to 4 (from P1). Also,
P2 had a cheap offer of 5 from the very first step, but it waited until last, because a 4 was
always available somewhere else.

## Why it is correct

The key fact is the **cut property**: split the nodes into two groups in any way. The cheapest
edge crossing between the groups belongs to some minimum spanning tree.

Prim's always splits the nodes into "in the tree" and "not in the tree", and adds the cheapest
edge crossing that split. So every edge it adds is safe. Suppose some MST skipped that edge. You
could add it, which makes a cycle, then remove another crossing edge on that cycle that costs at
least as much. The result is a tree that is no more expensive and does contain the edge.

## Prim's vs Kruskal's

Both are greedy, both produce an MST, and both rely on the cut property. They grow it differently.

| | Prim's | Kruskal's |
|:--|:--|:--|
| Grows | one connected tree, node by node | a forest of pieces that merge |
| Each step | cheapest edge leaving the tree | next cheapest edge overall, skipped if it joins two nodes already connected |
| Needs | a heap (or an array scan) | sort all edges + [union-find](../13-union-find/README.md) |
| Time | O(E log V), or O(V²) array | O(E log E) for the sort |
| Best for | dense graphs, or edges generated on the fly | sparse graphs given as an edge list |

On the trace above, Kruskal's sorts all 10 pair distances and takes 4, 4, 4, then 5, reaching the
same total of 17.

## Loop shape

The two versions from step 2 use different outer loops, and the difference is instructive:

- **Array version: `for` V times.** Every iteration adds exactly one node, so you know the count.
  Inside it are two `for`s over all nodes: one to find the minimum, one to update `best`.
- **Heap version: `while (added < V)`.** A stale pop adds nothing, so the number of iterations isn't
  known. Inside it is a `for` over the new node's edges.

Rule: **if every iteration makes guaranteed progress, count with `for`. If some iterations can be
wasted, loop with `while` on the progress itself.**

## How to recognise it

- "Connect all", "minimum total cost", "exactly one path between any two", "no cycles".
- Undirected weights, and the goal is the **sum** of chosen edges, not the distance between two nodes.
- Points on a plane where any pair can be linked: a complete, dense graph, a strong hint for the
  O(V²) array version.

## Common mistakes

- **Confusing it with Dijkstra.** Dijkstra ranks nodes by total distance from the start
  (`dist[u] + w`). Prim's ranks them by the **single edge** weight `w` into the tree.
- **Building all V² edges up front** for a complete graph. It works, but the array version
  computes each weight when needed and stores only V numbers.
- **Adding a node twice** in the heap version. Skip pops for nodes already in the tree.
- **Stopping at V edges** instead of `V − 1`, or forgetting that a single node costs 0.

## Practice

1. **[149 Min Cost to Connect All Points](../../problems/19-advanced-graphs/149-min-cost-to-connect-all-points.js)**
   (Medium): the points form a complete graph with Manhattan distances as weights, and the answer
   is the total weight of its minimum spanning tree. Prim's (either version) or Kruskal's both fit.

Run it with `./practice c 149`.
