# Boyer-Moore Voting

> Find the element that appears more than half the time, in one pass and O(1) memory.

**Family:** Arrays · Counting  
**Complexity:** O(n) time · O(1) space  
**Practice:** [101 Majority Element](../../problems/01-arrays-hashing/101-majority-element.js) · [167 Majority Element II](../../problems/01-arrays-hashing/167-majority-element-ii.js)

---

## The problem it solves

You have a list, and one value makes up **more than half** of it. Which one?

The obvious answer is to count every value in a hash map. That works, but the map can grow to
n entries. Boyer-Moore gets the same answer while remembering only **two things**: one candidate
and one counter.

## The core idea

Think of an election where every vote is a person standing in a room. Pair up any two people
who voted for **different** candidates and send both of them out. Keep doing that until no
mismatched pair is left.

Every pair you remove takes out **at most one** majority voter. The majority has more voters
than everyone else combined, so the others run out of partners first. Whoever is still in the
room at the end must be the majority.

Boyer-Moore does this pairing on the fly as it reads the array from left to right:

- The **candidate** is who is currently standing in the room.
- The **counter** is how many of them are standing there, not yet paired off.

## Step by step

Start with `count = 0` and no candidate. For each value `x`:

1. **If `count` is 0**, the room is empty. `x` becomes the new candidate.
2. **If `x` equals the candidate**, one more supporter walks in: `count += 1`.
3. **Otherwise**, `x` pairs off with one supporter and both leave: `count -= 1`.

When the loop ends, the candidate is the answer.

## Worked trace

Array: `[2, 2, 1, 1, 1, 2, 2]`. The majority is `2` (4 of 7).

| Step | x | Before (candidate, count) | Rule           | After (candidate, count) |
|-----:|:-:|:--------------------------|:---------------|:-------------------------|
| 1    | 2 | –, 0                      | empty → adopt  | 2, 1                     |
| 2    | 2 | 2, 1                      | same → +1      | 2, 2                     |
| 3    | 1 | 2, 2                      | different → −1 | 2, 1                     |
| 4    | 1 | 2, 1                      | different → −1 | 2, 0                     |
| 5    | 1 | 2, 0                      | empty → adopt  | 1, 1                     |
| 6    | 2 | 1, 1                      | different → −1 | 1, 0                     |
| 7    | 2 | 1, 0                      | empty → adopt  | 2, 1                     |

Final candidate: **2**. ✓

Notice that the candidate was briefly `1`. That's fine. The candidate in the **middle** of the
pass means nothing. Only the **final** candidate is guaranteed, and only when a majority exists.

## Why it is correct

Each time the counter drops, one candidate supporter and one non-matching value cancel out.
Suppose the majority value `m` appears `k > n/2` times. All the other values together number
`n − k < k`. Even if every one of them cancels a copy of `m`, at least `k − (n − k) ≥ 1` copies
of `m` are left over, so `m` has to be standing at the end.

## The guarantee matters

Boyer-Moore always returns **some** value. On an array with **no** majority, such as `[1, 2, 3]`,
it returns `3`, which is wrong. So:

- If the problem **guarantees** a majority exists (101), you can trust the candidate directly.
- If it **doesn't** (167), make a **second pass** that counts how often the candidate really
  appears.

## Generalising: more than n/k

At most `k − 1` values can each appear more than `n/k` times. So keep **`k − 1` candidates**,
each with its own counter:

- If `x` matches a candidate, add 1 to that candidate's counter.
- Otherwise, if some counter is 0, `x` takes that slot with count 1.
- Otherwise, subtract 1 from **every** counter (x cancels one of each).

Then verify every candidate with a counting pass. For `n/3` this means **two** candidates, which
is exactly 167.

## Loop shape

**Use `for`.** Every value is looked at exactly once, in order, and nothing is ever skipped or
revisited. The loop variable is just "the next voter". The candidate and the count are state you
update inside the body; they never decide where the loop goes next.

The n/k version is the same shape, followed by a **second, separate `for`** that counts each
candidate. Keep the two passes apart: the candidates are not final until the first pass ends.

## How to recognise it

- The words "more than n/2" or "more than n/3".
- A follow-up asks for **O(1) space**, which rules out the hash map.
- A single pass over a stream you cannot store.

## Common mistakes

- **Checking `count == 0` after the match test.** Check it first, or an empty room compares `x`
  against a stale candidate.
- **Skipping verification** when no majority is guaranteed.
- **For n/3, checking the zero slot before the match test.** A value could then fill both
  slots. Always test "matches candidate A / B" before "slot A / B is empty".
- **Using `>=` instead of `>`.** "More than n/3" is strict.

## Practice

1. **[101 Majority Element](../../problems/01-arrays-hashing/101-majority-element.js)** (Easy):
   the direct use. A majority is guaranteed, so one pass is enough.
2. **[167 Majority Element II](../../problems/01-arrays-hashing/167-majority-element-ii.js)**
   (Medium): the n/3 version. Two candidates, then verify.

Run them with `./practice c 101` and `./practice c 167`.
