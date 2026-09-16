# Fast and Slow Pointers (Floyd's Cycle Detection)

> Send a tortoise and a hare down the same path. If there is a loop, the hare laps the tortoise.

**Family:** Linked Lists · Cycle Detection  
**Complexity:** O(n) time · O(1) space  
**Practice:** [022 Linked List Cycle](../../problems/06-linked-list/022-linked-list-cycle.js) · [160 Happy Number](../../problems/22-number-theory/160-happy-number.js)

---

## The problem it solves

You follow a chain of "next" steps: `next` pointers in a linked list, or a rule like "replace the
number with something computed from it". Either the chain **ends**, or it falls into a **loop** and
goes round forever. Which one?

The obvious answer is to remember every place you have visited in a set, and stop when you see one
again. That works, but the set can hold n entries. Floyd's algorithm answers with **two pointers**
and no memory of the past.

## The core idea

Picture a running track with a straight road leading onto it. A tortoise walks one step at a time
and a hare runs two. If the road just ends, the hare reaches the end first and you are done: no
loop. If the road leads onto a circular track, both animals end up on it and go round and round.
Once both are on the loop, the hare gains **one step per turn**, so it cannot jump over the
tortoise. It has to land on it.

- The **slow** pointer moves one step per turn.
- The **fast** pointer moves two steps per turn.
- They meet **if and only if** there is a cycle.

## Step by step

Start with `slow` and `fast` both at the start.

1. **If `fast` or the step after `fast` is the end**, there is no cycle. Stop.
2. **Move:** `slow` one step, `fast` two steps.
3. **If `slow` and `fast` are now on the same node**, there is a cycle. Stop.
4. Otherwise go back to 1.

To also find **where the cycle starts**, continue after they meet:

5. Put one pointer back at the start and leave the other at the meeting point.
6. Move **both one step** at a time. The node where they meet is the start of the cycle.

## Worked trace

Nodes `0 → 1 → 2 → 3 → 4 → 5 → 6`, and node 6 points back to node 2. So the tail before the loop
is 2 nodes long and the loop holds 5 nodes (2 through 6).

**Phase 1: do they meet?**

| Turn | slow | fast |
|-----:|-----:|-----:|
| 0    | 0    | 0    |
| 1    | 1    | 2    |
| 2    | 2    | 4    |
| 3    | 3    | 6    |
| 4    | 4    | 3    |
| 5    | 5    | 5    |

They meet at node **5**, so there is a cycle. ✓ At turn 4 the hare had wrapped round from 6 to 3
and was chasing the tortoise from behind.

**Phase 2: where does it start?** One pointer restarts at node 0, the other stays at node 5.

| Turn | from start | from meeting point |
|-----:|-----------:|-------------------:|
| 0    | 0          | 5                  |
| 1    | 1          | 6                  |
| 2    | 2          | 2                  |

They meet at node **2**, which is where the loop begins. ✓

## Why it is correct

**They meet.** Once both pointers are inside the loop, the fast one is some number of steps behind
the slow one. Every turn that gap shrinks by exactly 1, so it reaches 0 within one lap. Nothing is
skipped, and the slow pointer has not even finished one lap, so the whole thing is O(n).

**Phase 2 finds the start.** Say the tail has `a` nodes, the loop has `c` nodes, and they met `b`
steps into the loop. Slow walked `a + b`, fast walked twice that. The extra `a + b` that fast walked
must be whole laps, so `a + b` is a multiple of `c`. That means walking `a` more steps from the
meeting point lands exactly on the loop start. Walking `a` steps from the head also lands there.
In the trace: `a = 2`, `b = 3`, `c = 5`, and `2 + 3` is one full lap.

## It is not only for linked lists

Any rule "from this value, the next value is f(value)" makes a chain, and if the values are limited
it must end up in a loop. Floyd works on it unchanged: "one step" means apply `f` once, "two steps"
means apply it twice. For example, replacing a number by the sum of the squares of its digits,
starting from 4, runs `4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4` and loops for ever. The tortoise
and hare catch that without storing any of those numbers.

The same pair of speeds also finds the **middle** of a list: when fast reaches the end, slow is
halfway.

## Loop shape

**Use `while`.** Nothing here is "for each element". The loop runs until `fast` falls off the end
or the pointers meet, and you cannot know in advance how many steps that takes.

- Put the **safety check in the header**: `while (fast && fast.next)`. Inside the body, move both
  pointers first, **then** compare them.
- **Finding the cycle start** is a second `while (a !== b)` that moves both pointers one step.
- **Number chains (160)** have no "end of list", but both pointers start on the same value. Either
  take one step before the loop or use `do … while`. Otherwise the "they met" test is true before
  anyone has moved.
- **Middle of a list** is the same `while (fast && fast.next)` loop with no meeting test.

## How to recognise it

- "Does it loop?", "does it ever repeat?", "detect a cycle".
- A follow-up asks for **O(1) memory**, which rules out the visited set.
- "Find where the cycle begins" or "find the duplicate" in a sequence that follows its own values.
- A process that repeats a function and might never reach its goal.

## Common mistakes

- **Checking `slow == fast` before moving.** They both start at the head, so they are equal on
  turn 0. Move first, then compare.
- **Not checking `fast.next` before taking two steps.** On a list with no cycle, the second step
  runs off the end.
- **Comparing values instead of nodes.** Two different nodes can hold the same value. Identity
  defines the cycle.
- **In phase 2, still moving one pointer two steps.** Both move one step at a time.

## Practice

1. **[022 Linked List Cycle](../../problems/06-linked-list/022-linked-list-cycle.js)** (Easy):
   the direct use. Phase 1 alone answers the question.
2. **[160 Happy Number](../../problems/22-number-theory/160-happy-number.js)** (Easy): there is no
   list. The "next" step is the digit-square sum, and you need to tell reaching 1 apart from
   looping.

Run them with `./practice c 022` and `./practice c 160`.
