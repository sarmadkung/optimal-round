# Topological Sort

> Put tasks in an order where every task comes after the tasks it depends on, or prove no such order exists.

**Family:** Graphs · Directed acyclic graphs  
**Complexity:** O(V + E) time · O(V + E) space  
**Practice:** [030 Course Schedule](../../problems/08-graphs/030-course-schedule.js) · [147 Course Schedule II](../../problems/19-advanced-graphs/147-course-schedule-ii.js)

---

## In 60 seconds

**The idea.** Repeatedly take a task with nothing left blocking it, place it, and tick it off every
task it was blocking. Socks and trousers before shoes. Get stuck with tasks left over and you have
found a cycle.

**The rule to remember.** Count each task's **in-degree**, the arrows pointing into it. Seed a queue
with every task at 0. Take one out, append it to the order, and lower the in-degree of everything it
points at; anything that hits 0 joins the queue. At the end, compare the order's length with the
number of tasks.

**Reach for it when** the words are "prerequisites", "dependencies", "must come before", "build
order" or "task scheduling", when the question is "is it possible to finish everything?", or when an
order has to be derived from pairwise hints.

**The traps.** Reversing the arrow: `[a, b]` meaning "b before a" is the arrow `b → a`. Seeding from
one node when several start free. Forgetting the final length check, which *is* the cycle test.

Everything below is those same ideas, slowly.

## The problem it solves

You have tasks and dependencies: "b must happen before a". Draw each dependency as an arrow
`b → a`. You want a **line-up** of all the tasks in which every arrow points forward.

Such a line-up exists **exactly when the graph has no cycle**. If a depends on b and b depends on
a, neither can go first. So the same algorithm answers two questions: "give me an order" and "is
this even possible?"

## The core idea

Think of getting dressed. Socks before shoes, trousers before shoes, shirt before tie. At any
moment, look for items with **nothing left blocking them**. Put one on. That may unblock something
else (once socks and trousers are on, shoes are free). Repeat.

If you ever get stuck, with items left over but every one of them still blocked, the blockers form
a loop. There is no way to get dressed.

This is **Kahn's algorithm**. The "number of things still blocking a task" is its **in-degree**:
the number of arrows pointing into it that haven't been used up yet.

## Step by step

1. **Build the graph.** For each dependency `b → a`, add `a` to `b`'s list of outgoing arrows and
   add 1 to `indegree[a]`.
2. **Seed a queue** with every task whose in-degree is 0. These have no prerequisites.
3. **While the queue is not empty:**
   - Take a task `u` out and append it to the order.
   - For each arrow `u → v`: `indegree[v] -= 1`. If it reaches 0, add `v` to the queue.
4. **Check the length.** If the order contains every task, it is a valid topological order.
   If it is shorter, the missing tasks sit on or behind a cycle.

## Worked trace

6 tasks, arrows `3→1`, `0→1`, `0→4`, `1→2`, `4→2`, `2→5`.

Starting in-degrees: `[0, 2, 2, 0, 1, 1]` (index = task). Tasks 0 and 3 have none, so the queue
starts as `[0, 3]`.

Drawn out, with each task's **current** in-degree in brackets. Every snapshot shows only the tasks
not yet placed, and anything reading `[0]` is sitting in the queue:

```
  start: queue [0, 3]

        3[0] ──────┐
                   v
        0[0] ────> 1[2] ────┐
        │                   v
        └────────> 4[1] ──> 2[2] ──> 5[1]

  0 and 3 placed: queue [4, 1]

        1[0] ────┐
                 v
        4[0] ──> 2[2] ──> 5[1]

  4 and 1 placed: queue [2]

        2[0] ──> 5[1]

  2 placed: queue [5]

        5[0]
```

Each placed task takes its outgoing arrows with it, so the brackets behind it fall. Nothing else
ever changes a count.

| Take | In-degree changes | In-degrees after       | Queue after | Order so far             |
|:----:|:------------------|:-----------------------|:------------|:-------------------------|
| 0    | 1→1, 4→0          | `[0, 1, 2, 0, 0, 1]`   | `[3, 4]`    | `[0]`                    |
| 3    | 1→0               | `[0, 0, 2, 0, 0, 1]`   | `[4, 1]`    | `[0, 3]`                 |
| 4    | 2→1               | `[0, 0, 1, 0, 0, 1]`   | `[1]`       | `[0, 3, 4]`              |
| 1    | 2→0               | `[0, 0, 0, 0, 0, 1]`   | `[2]`       | `[0, 3, 4, 1]`           |
| 2    | 5→0               | `[0, 0, 0, 0, 0, 0]`   | `[5]`       | `[0, 3, 4, 1, 2]`        |
| 5    | –                 | `[0, 0, 0, 0, 0, 0]`   | `[]`        | `[0, 3, 4, 1, 2, 5]`     |

All 6 tasks were placed, so **`[0, 3, 4, 1, 2, 5]`** is a valid order. ✓ Check: every arrow points
from an earlier position to a later one.

Now add one more arrow, `5→0`. Task 0 starts with in-degree 1, only task 3 is free, and after
placing it task 1 still waits on 0. The queue empties with just `[3]` placed: the tasks
`0 → 1 → 2 → 5 → 0` form a cycle.

## Why it is correct

**Every emitted order is valid.** A task enters the queue only when its in-degree is 0, meaning
every task pointing into it has already been appended. So every arrow points forward.

**Stopping early means a cycle.** Suppose some tasks are never placed. Each of them still has an
arrow coming in from another unplaced task (otherwise its in-degree would have reached 0). Start at
any unplaced task and keep walking backwards along those arrows. There are only finitely many
tasks, so the walk must repeat one: that is a cycle. Conversely, no task on a cycle can ever reach
in-degree 0 first, so a cycle always stops the algorithm early.

**Linear time.** Each task is queued once, and each arrow is used once to lower an in-degree.

## The DFS version: three colours

Topological order can also come from DFS. Give each node a colour:

- **white**: not visited yet.
- **grey**: on the current DFS path, still being explored.
- **black**: fully finished, along with everything reachable from it.

Run a DFS from every white node. On entering a node, colour it grey. For each outgoing arrow:

- to a **grey** node: you have walked back onto your own path. **Cycle.**
- to a **black** node: already handled, skip it.
- to a **white** node: explore it.

When all of a node's arrows are done, colour it black and append it to a list. That list is in
**reverse** topological order (a node finishes only after everything it points to), so reverse it
at the end.

Why three colours and not two? With only "visited / not visited" you can't tell the two cases apart.
An arrow back to a node on the current path is a cycle; an arrow to a node already finished on
another branch is a harmless diamond. Kahn's is often easier to get right. DFS is natural when you are already writing a
recursive search.

## Loop shape

**Kahn's:** `for` loops to set things up, then a `while` to run it.

- **Build the graph:** `for` over the dependencies.
- **Seed the queue:** `for` over every task.
- **Main loop:** `while (queue is not empty)`, with a **`for` over the outgoing arrows** of the task
  you just took out.

**DFS version:** a `for` over every node that starts a DFS on each white one. Inside the DFS, a
`for` over the arrows, and recursion instead of a `while`.

## How to recognise it

- "Prerequisites", "dependencies", "must come before", "build order", "task scheduling".
- "Is it possible to finish everything?" (cycle detection in a directed graph).
- "Return any valid ordering".
- Deriving an order from pairwise hints, such as an alien dictionary.

## Common mistakes

- **Reversing the arrow.** `[a, b]` meaning "b before a" is the arrow `b → a`. Getting it backwards
  still detects cycles correctly, but the order comes out backwards.
- **Only seeding from one node.** Several tasks may have in-degree 0, and the graph may be in
  disconnected pieces. Seed with all of them.
- **Forgetting the final length check.** It is the entire cycle test.
- **Two-colour DFS** for cycle detection in a directed graph. It reports false cycles.
- **Treating a self-loop `[a, a]` specially.** It needs no special case: it gives `a` an in-degree
  that never reaches 0.

## Where it is used in the real world

- **Build systems.** `make`, Bazel and webpack all order work by dependency, and report a cycle
  rather than looping forever.
- **Package managers.** npm and apt decide install order so that nothing is configured before what
  it needs is present.
- **Spreadsheets.** Recalculating after an edit follows formula dependencies; a circular reference
  is a detected cycle, which is why the error has its own message.
- **Workflow schedulers.** Airflow DAGs and CI pipeline stages are topological orders, with
  independent nodes run in parallel by processing a whole level at once.
- **Compilers.** Instruction scheduling orders operations so each runs after the values it reads.

## Practice

1. **[030 Course Schedule](../../problems/08-graphs/030-course-schedule.js)** (Medium): the yes/no
   version. You only need to know whether every course can be placed.
2. **[147 Course Schedule II](../../problems/19-advanced-graphs/147-course-schedule-ii.js)**
   (Medium): the same algorithm, but return the order itself, or an empty array when a cycle stops
   it early.

Run them with `./practice c 030` and `./practice c 147`.
