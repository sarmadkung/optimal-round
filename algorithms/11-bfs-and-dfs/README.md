# BFS and DFS

> The two basic ways to visit everything reachable from a starting point: go wide, or go deep.

**Family:** Graphs · Grids · Traversal  
**Complexity:** O(V + E) time · O(V) space. On an m × n grid: O(m · n) time and space  
**Practice:** [029 Number of Islands](../../problems/08-graphs/029-number-of-islands.js) · [074 Rotting Oranges](../../problems/08-graphs/074-rotting-oranges.js)

---

## The problem it solves

You have a graph: nodes joined by edges. Very often the graph is a **grid**, where each cell is a
node and its up, down, left and right neighbours are its edges. You want to answer questions like:

- Which cells can I reach from here? (flood fill)
- How many separate connected groups are there?
- What is the fewest number of steps from A to B?

Both traversals visit every reachable node **exactly once**. They differ only in the **order**
they visit them, and that order is what makes each one good at different questions.

## The core idea

Think of spilling ink on a map.

- **BFS (breadth-first search)** is a ripple. First everything 1 step away gets wet, then
  everything 2 steps away, then 3. It uses a **queue**: first discovered, first explored.
- **DFS (depth-first search)** is a person exploring a maze. They follow one corridor as far as it
  goes, then back up to the last junction and try the next corridor. It uses a **stack**, or plain
  recursion, which is a stack in disguise.

Both need a **visited** mark. Without it, two neighbouring cells keep adding each other forever.

## Step by step

The two share one skeleton. Only the container changes.

1. Put the start node in the container and **mark it visited**.
2. While the container is not empty:
   - Take a node out (BFS: from the **front** of the queue; DFS: from the **top** of the stack).
   - For each neighbour that is inside the grid, is passable, and **is not visited**: mark it
     visited and put it in the container.

**Count connected groups:** scan every node. Whenever you find one that isn't visited yet, that is
a new group: add 1, then run a traversal from it to mark the whole group.

**Measure distance in steps (BFS only):** process the queue **one level at a time**. Note the
queue's size, take out exactly that many nodes, and the nodes they add form the next level. Each
level is one more step.

**Multi-source BFS:** if the spread starts from several places at once, put **all** starting nodes
in the queue before the first level. Level k then holds everything at distance k from the
**nearest** source.

## Worked trace

**Counting groups with DFS.** `1` is land, `0` is water, connections are 4-directional.

```
      col 0 1 2 3
row 0     1 1 0 0
row 1     0 1 0 1
row 2     1 0 0 1
row 3     0 0 1 1
```

Scanning row by row, left to right:

| New unvisited land at | Cells marked by that traversal    | Groups so far |
|:----------------------|:----------------------------------|:-------------:|
| (0,0)                 | (0,0) (0,1) (1,1)                 | 1             |
| (1,3)                 | (1,3) (2,3) (3,3) (3,2)           | 2             |
| (2,0)                 | (2,0)                             | 3             |

Every other land cell was already marked when the scan reached it, so it started nothing.
Result: **3** groups. ✓ Cell (2,0) touches (1,1) only diagonally, which does not connect.

**Spreading by levels with multi-source BFS.** `2` is a source, `1` is a cell to reach, `0` is a
wall.

```
      col 0 1 2 3
row 0     2 1 1 0
row 1     1 0 1 1
row 2     0 1 1 2
```

| Level (steps) | Cells reached at this level  | Cells still unreached |
|:-------------:|:-----------------------------|:---------------------:|
| 0             | (0,0) (2,3), the two sources | 7                     |
| 1             | (1,0) (0,1) (1,3) (2,2)      | 3                     |
| 2             | (0,2) (1,2) (2,1)            | 0                     |

Everything is reached after **2** levels. ✓ Both sources spread at the same time: (2,2) was
reached from (2,3) in one step, without waiting for the ripple from (0,0).

## Why it is correct

**Every reachable node is visited once.** A node enters the container only when it is first
marked, and a marked node never enters again. Any reachable node is connected to the start by some
path, and each node on that path adds the next one if nobody else has already, so the traversal
reaches the whole path. That gives O(V + E): each node is taken out once, and each edge is looked
at from each of its ends.

**BFS levels are shortest distances.** The queue always holds nodes from at most two consecutive
levels, the current one in front of the next one. So all nodes at distance k are taken out before
any node at distance k + 1. The first time a node is reached is therefore along a shortest path.
With several sources in the starting queue, the same argument applies as if one invisible "super
source" were joined to all of them.

## BFS or DFS?

| Question                                    | Use            | Why                                        |
|:--------------------------------------------|:---------------|:-------------------------------------------|
| Count or fill connected groups              | either         | Only "reached or not" matters              |
| Fewest steps, unweighted edges              | **BFS**        | Levels are distances                       |
| Spread over time from several starts        | **multi-source BFS** | One level = one time unit            |
| Detect a cycle, explore all paths, backtrack | **DFS**       | The current path is exactly the stack      |
| Very large grid, deep recursion             | BFS or iterative DFS | Recursive DFS can overflow the call stack |

## Loop shape

| Part | Loop | Why |
|:-----|:-----|:----|
| BFS traversal | `while (queue is not empty)` | You can't know how many nodes are reachable |
| One BFS level | `for` over `size`, saved **before** the loop | The queue grows while you process the level |
| Iterative DFS | `while (stack is not empty)` | Same reason as BFS |
| Recursive DFS | no loop; the recursion replaces the `while` | The call stack is the container |
| Neighbours | `for` over the list of directions | Always exactly 4 (or 8) |
| Counting groups | nested `for` over rows and columns | Every cell is checked once as a possible start |

In JavaScript, `queue.shift()` is O(n). Keep a `head` index instead and loop with
`while (head < queue.length)`.

Level-by-level BFS is the one place people break: `for (k = 0; k < queue.length; k++)` re-reads
the length while you add to the queue. Nodes from the next level get pulled into this one, and the
step count comes out wrong. Save the size first.

## How to recognise it

- A grid of cells with "connected 4-directionally" or "adjacent".
- "Number of islands / regions / provinces / components".
- "Minimum steps", "shortest path" with every move costing the same.
- "Every minute, X spreads to its neighbours": that is BFS levels.

## Common mistakes

- **Marking visited when a node is taken out instead of when it is added.** The same node can then
  be added to the queue many times.
- **Forgetting the bounds check** before reading a neighbour.
- **Connecting diagonals** when the problem says 4-directional.
- **Starting a BFS per source** when the spread is simultaneous.
- **Counting one level too many.** The last level may add nothing new; don't count it as a step.
- **Recursion depth.** A 300 × 300 all-land grid is a 90,000-deep DFS in the worst case.

## Practice

1. **[029 Number of Islands](../../problems/08-graphs/029-number-of-islands.js)** (Medium): count
   connected groups on a grid. Each unvisited land cell starts a flood fill that claims one whole
   island.
2. **[074 Rotting Oranges](../../problems/08-graphs/074-rotting-oranges.js)** (Medium): a
   simultaneous spread from many sources. Levels of a multi-source BFS are the minutes, and you
   must also notice cells the spread never reaches.

Run them with `./practice c 029` and `./practice c 074`.
