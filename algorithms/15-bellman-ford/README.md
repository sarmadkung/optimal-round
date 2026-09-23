# Bellman-Ford

> Shortest paths by relaxing every edge again and again. Slower than Dijkstra, but it handles negative edges, detects negative cycles and can cap the number of edges used.

**Family:** Graphs · Shortest paths · Dynamic programming  
**Complexity:** O(V · E) time (O(k · E) when limited to k rounds) · O(V) space  
**Practice:** [150 Cheapest Flights Within K Stops](../../problems/19-advanced-graphs/150-cheapest-flights-within-k-stops.js)

---

## In 60 seconds

**The idea.** No greedy choice at all. Relax every edge, round after round, until nothing changes.
After round r, every cost is the cheapest path using **at most r edges**, so `V − 1` rounds settle
everything.

**The rule to remember.** **k stops = k + 1 edges**, so run `k + 1` rounds. And when the number of
edges is capped, **copy the array**: read from last round's `cost`, write into `next`, swap at the
end of the round. Without the copy a single round can chain several edges and quietly overshoot
the limit.

**Reach for it when** weights can be negative, a negative cycle has to be detected (run one extra
round and see if anything still drops), or the path may use at most k edges.

**The traps.** Running k rounds for k stops, skipping the copy under an edge limit, and relaxing
from a node still at infinity when infinity is a big sentinel number.

Everything below is those same ideas, slowly.

## The problem it solves

You want the cheapest path from one source, but one of these is true:

- Some edges have **negative** weight, so [Dijkstra](../14-dijkstra/README.md) gives wrong answers.
- You must detect a **negative cycle** (a loop you could go around forever to get cheaper).
- The path may use **at most a fixed number of edges**, so the cheapest route overall might not
  be allowed.

Bellman-Ford makes no greedy choice. It just keeps improving every estimate until nothing
changes.

## The core idea

Think of rumours spreading one hop at a time. At the start only the source knows its cost (0).
In each **round**, every node tells each of its neighbours: "I can reach you for my cost plus
this edge." A neighbour keeps the offer if it is cheaper than what it had.

After round 1, every node knows the cheapest path that uses **at most 1 edge**. After round 2,
at most 2 edges. After round r, at most r edges. A shortest path with no cycles uses at most
`V − 1` edges, so `V − 1` rounds are enough for everything.

## Step by step

Set `cost[src] = 0` and every other cost to infinity.

1. **One round:** for every edge `u → v` with weight `w`, if `cost[u]` is finite and
   `cost[u] + w < cost[v]`, set `cost[v] = cost[u] + w`. This is called **relaxing** the edge.
2. **Repeat the round `V − 1` times** (or stop early when a round changes nothing).
3. **Negative-cycle check:** run one more round. If any cost still drops, a negative cycle is
   reachable, and "shortest" has no meaning for the nodes it touches.

### The copy-the-array trick (limiting edges)

In step 1, a round that writes into `cost` while it reads from `cost` can chain several edges in
one round. It lowers `cost[u]`, and then a later edge in the same round reads that new `cost[u]`
right away. That is fine for plain shortest paths (it only converges faster), but it breaks the
promise "after round r, at most r edges".

To keep that promise:

- At the start of each round, make `next` a **copy** of `cost`.
- **Read** from `cost` (last round's values). **Write** into `next`.
- At the end of the round, `cost = next`.

Now round r can extend a path by exactly one edge, no more. Running exactly `L` rounds gives
the cheapest path using **at most L edges**.

## Worked trace

Directed edges, in this order: `0→2 (50)`, `2→1 (20)`, `1→3 (100)`, `0→1 (100)`, `0→3 (500)`.
Source 0. Costs are listed for nodes 0, 1, 2, 3.

Three routes reach node 3: `0→3` (500, 1 edge), `0→1→3` (200, 2 edges) and `0→2→1→3` (170, 3 edges).

**With the copy** (each round reads last round's costs):

| Round | Improvements written      | cost after       | Cheapest to 3 using ≤ round edges |
|------:|:--------------------------|:-----------------|:----------------------------------|
| start | –                         | 0, ∞, ∞, ∞       | –                                 |
| 1     | 0→2: 50, 0→1: 100, 0→3: 500 | 0, 100, 50, 500 | 500                               |
| 2     | 2→1: 70, 1→3: 200         | 0, 70, 50, 200   | 200                               |
| 3     | 1→3: 170                  | 0, 70, 50, 170   | 170                               |

Each round the answer for node 3 is exactly the best route with that many edges.

**Without the copy** (reading and writing the same array), round 1 already goes too far:

| Round | Improvements written              | cost after     |
|------:|:----------------------------------|:---------------|
| 1     | 0→2: 50, 2→1: 70, 1→3: 170        | 0, 70, 50, 170 |

`2→1` read the 50 that `0→2` had just written, and `1→3` read that 70. After one round node 3
shows 170, which needs 3 edges. With a 1-edge limit, the right answer was 500.

## Why it is correct

By induction on rounds. Before any round, `cost` is right for paths of 0 edges. Suppose after
round r it holds the best cost using at most r edges. A best path with at most r + 1 edges is a
best path with at most r edges to some node `u`, plus one edge `u → v`. Round r + 1 tries that
exact edge from that exact cost, so it finds it. Without negative cycles, some shortest path
repeats no node, so it has at most `V − 1` edges, and `V − 1` rounds are enough.

## Detecting a negative cycle

Edges `0→1 (4)`, `1→2 (−3)`, `2→1 (1)`, source 0, V = 3. The loop `1→2→1` costs −2.

| Round | cost after (0, 1, 2) |
|------:|:---------------------|
| 1     | 0, 2, 1              |
| 2     | 0, 0, −1             |
| 3 (extra check) | 0, −2, −3  |

After the `V − 1 = 2` required rounds the costs should be final. Round 3 still lowers them, so a
negative cycle exists. Without a cycle, that extra round could never improve anything.

## Loop shape

**Use two nested `for` loops.** This is one of the rare graph algorithms without a `while`:

- **Outer: `for (round = 0; round < V − 1; round++)`.** The number of rounds is fixed in advance,
  which is exactly what `for` is for. With the edge limit, it runs `L` rounds. "At most k stops"
  means k + 1 edges, so 150 runs `k + 1` rounds.
- **Inner: `for` over every edge.**

To stop early, keep a `changed` flag and `break` from the outer loop when a round changes nothing.

## How to recognise it

- Negative edge weights, or "detect an arbitrage / negative cycle".
- "At most k stops", "at most k edges", "within k moves". Remember that **k stops = k + 1
  edges**, so run k + 1 rounds with the copy trick.
- Small graphs (V · E fits easily) where a simple, safe method beats a clever one.

## Common mistakes

- **Skipping the copy** when the number of edges is limited. The answer silently uses too many edges.
- **Running k rounds for k stops.** A route with k stops has k + 1 flights.
- **Relaxing from infinity.** If "infinity" is a big sentinel number, sentinel plus a negative
  weight looks like a real cost. Skip edges whose start cost is still unreached.
- **Using Dijkstra on a stop-limited problem.** It keeps only the cheapest cost per node and can
  throw away a pricier route with fewer stops that was the only legal one.

## Where it is used in the real world

- **Distance-vector routing.** RIP is Bellman-Ford run across routers, each telling its neighbours
  its current best distances; the "count to infinity" problem is this algorithm's failure mode.
- **Currency arbitrage.** Take `-log(rate)` as the edge weight and a negative cycle is a loop of
  trades that returns more than it costs. Trading systems scan for exactly this.
- **Constrained travel search.** "Cheapest flight with at most k stops" needs the limited-relaxation
  form, because the cheapest route overall may use too many hops.
- **Planning with penalties.** Any shortest-path problem where some moves pay you back, which
  Dijkstra cannot handle at all.

## Practice

1. **[150 Cheapest Flights Within K Stops](../../problems/19-advanced-graphs/150-cheapest-flights-within-k-stops.js)**
   (Medium): the flight count is capped, so this is Bellman-Ford with a fixed number of rounds
   and the copy trick. Mind the difference between stops and flights, and return -1 if `dst`
   stays unreachable.

Run it with `./practice c 150`.
