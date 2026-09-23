# Dijkstra's Algorithm

> Shortest paths from one start node in a weighted graph with no negative edges, always expanding the closest unfinished node next.

**Family:** Graphs · Shortest paths · Greedy  
**Complexity:** O((V + E) log V) time with a binary heap · O(V + E) space  
**Practice:** [148 Network Delay Time](../../problems/19-advanced-graphs/148-network-delay-time.js)

---

## In 60 seconds

**The idea.** Water poured in at the start spreads along the pipes at a steady speed, and each
pipe is as long as its weight. Keep a min-heap of "I can reach X for total cost D" offers and
always take the smallest. The first time a node comes out of the heap, its cost is final.

**The rule to remember.** Pop the cheapest offer `(d, u)`. If `d > dist[u]` it is a stale leftover,
so skip it. Otherwise relax every edge `u → v`: if `d + w < dist[v]`, lower `dist[v]` and push the
new offer.

**Reach for it when** the graph is weighted, every weight is zero or positive, and there is a
single source. Equal weights everywhere mean plain BFS is enough.

**The traps.** Marking a node done when it is **pushed** rather than when it **pops**, and using a
FIFO queue, which is just BFS ignoring the weights. Negative edges break the greedy choice
outright.

Everything below is those same ideas, slowly.

## The problem it solves

You have a graph whose edges have **costs** (time, distance, price), and you want the cheapest
way to reach every node from one start node.

Plain BFS finds the path with the **fewest edges**, which is only the cheapest path when every
edge costs the same. As soon as one edge costs 1 and another costs 100, BFS gives wrong
answers. Dijkstra handles any weights, as long as none of them is **negative**.

## The core idea

Picture pouring water in at the start node. The water spreads along the pipes at a steady
speed, and each pipe's length is its weight. Nodes get wet in order of their distance from the
start: the closest one first, then the next closest, and so on.

Dijkstra simulates that. It keeps a **min-heap** of "I can reach node X at total cost D"
offers and always takes the **smallest** one next. The first time a node comes out of the
heap, the water has reached it, and that cost is final. No later path can be cheaper, because
every later offer already starts from a cost at least as large.

## Step by step

Keep `dist[node]` (best known cost, all infinity except `dist[start] = 0`) and a min-heap
holding `(0, start)`.

1. **Pop** the smallest `(d, u)` from the heap.
2. **Skip stale entries:** if `d > dist[u]`, a cheaper offer for `u` was already handled. Ignore
   this one and go back to step 1.
3. **Relax each outgoing edge** `u → v` with weight `w`: if `d + w < dist[v]`, set
   `dist[v] = d + w` and push `(d + w, v)`.
4. Repeat until the heap is empty.

Every node with a finite `dist` is reachable, and that value is its shortest distance.

### Why there are stale entries at all

A textbook heap has no cheap "decrease this key" operation. So when a node gets a better
offer, we do not edit its old entry. We simply **push a second one**. The old, larger entry stays
in the heap and pops out later. The check in step 2 throws it away. This is called
**lazy deletion**. The heap can hold up to E entries instead of V, but log E ≤ 2 log V, so the
complexity is the same.

## Worked trace

Directed edges: `1→2 (4)`, `1→3 (1)`, `3→2 (2)`, `2→4 (1)`, `3→4 (5)`, `4→5 (3)`. Start at node 1.

`dist` is listed for nodes 1, 2, 3, 4, 5. The heap is shown sorted as `(cost, node)`.

| Step | Pop    | Action                          | dist after       | Heap after              |
|-----:|:-------|:--------------------------------|:-----------------|:------------------------|
| 1    | (0, 1) | settle: 2: ∞→4, 3: ∞→1          | 0, 4, 1, ∞, ∞    | (1,3) (4,2)             |
| 2    | (1, 3) | settle: 2: 4→3, 4: ∞→6          | 0, 3, 1, 6, ∞    | (3,2) (4,2) (6,4)       |
| 3    | (3, 2) | settle: 4: 6→4                  | 0, 3, 1, 4, ∞    | (4,2) (4,4) (6,4)       |
| 4    | (4, 2) | **stale** (4 > dist[2] = 3), skip | 0, 3, 1, 4, ∞  | (4,4) (6,4)             |
| 5    | (4, 4) | settle: 5: ∞→7                  | 0, 3, 1, 4, 7    | (6,4) (7,5)             |
| 6    | (6, 4) | **stale** (6 > dist[4] = 4), skip | 0, 3, 1, 4, 7  | (7,5)                   |
| 7    | (7, 5) | settle: no outgoing edges       | 0, 3, 1, 4, 7    | empty                   |

Final distances: node 2 = 3 (via 3), node 4 = 4 (via 3 and 2), node 5 = 7. The direct edge
`1→2 (4)` lost to the detour `1→3→2 (3)`, and its leftover heap entry was the stale pop at step 4.

## Why it is correct

When `(d, u)` pops and is not stale, every other offer still in the heap costs at least `d`.
Any other route to `u` has to leave the set of finished nodes through one of those offers, and
then keep walking along edges that cost **zero or more**. So that route costs at least `d` too.
The popped value is therefore the true shortest distance.

## Why negative edges break it

That argument leans on "walking further never makes a path cheaper". A negative edge breaks
exactly that. Edges `A→B (2)`, `A→C (3)`, `C→B (−2)`, `B→D (1)`, start at A:

| Order | Node finalised | Cost | Note                                               |
|------:|:---------------|-----:|:---------------------------------------------------|
| 1     | A              | 0    |                                                    |
| 2     | B              | 2    | smallest offer, so it looks final                  |
| 3     | C              | 3    | edge `C→B` would give B cost 1, but B is done      |
| 4     | D              | 3    | built on B = 2, true answer is 2 (A→C→B→D)         |

Dijkstra reports B = 2 and D = 3. The real answers are 1 and 2. For negative weights use
[Bellman-Ford](../15-bellman-ford/README.md) instead.

## Loop shape

**Use `while (heap is not empty)` with a `for` over the edges inside.** The stale-entry check is a
`continue` at the top of the body.

It is not a `for` over the nodes. With lazy deletion a node can pop several times, and nodes that
can't be reached never pop at all, so the number of iterations isn't known in advance. If you only
need one target, `break` when it pops.

## How to recognise it

- A weighted graph (or grid) and the word "shortest", "minimum time", "cheapest".
- All weights are **zero or positive**.
- One source. For "all nodes receive a signal", take the **largest** of the shortest distances.
- If all weights are equal, plain BFS is enough. If there is a limit on the number of edges,
  Dijkstra's greedy choice may be wrong (see Bellman-Ford).

## Common mistakes

- **Forgetting the stale check.** The answer stays right (an outdated cost can never beat
  `dist[v]`), but you scan the node's edges again for nothing, which gets slow on dense graphs.
  If you track finished nodes in a set instead, skip any node that is already in it.
- **Marking a node done when it is pushed** instead of when it is popped. A cheaper offer may
  still arrive before it pops.
- **Using a FIFO queue** instead of a min-heap. That is BFS, and it ignores the weights.
- **Treating directed edges as undirected.** `[u, v, w]` goes one way only.
- **Leaving unreachable nodes at infinity** and returning infinity instead of the problem's
  "not reachable" value.

## Where it is used in the real world

- **Internet routing.** OSPF and IS-IS are link-state protocols: every router learns the whole
  topology and runs Dijkstra to build its forwarding table.
- **Maps and navigation.** Turn-by-turn routing is Dijkstra at heart, with precomputation
  (contraction hierarchies) and A* heuristics layered on to make continental-scale queries instant.
- **Telecoms.** Least-cost call and traffic routing, where the edge weight is price or latency
  rather than distance.
- **Robotics and games.** Path planning over a cost map, where mud, stairs or enemy fire make some
  tiles more expensive than others rather than impassable.

## Practice

1. **[148 Network Delay Time](../../problems/19-advanced-graphs/148-network-delay-time.js)**
   (Medium): run Dijkstra from `k` over the directed `times` edges. The signal reaches everyone
   when the slowest node gets it, and one unreached node means -1.

Run it with `./practice c 148`.
