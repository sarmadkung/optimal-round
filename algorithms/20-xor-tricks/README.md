# XOR Tricks

> Make matching values cancel each other out, so the odd one out is all that is left.

**Family:** Math · Bit manipulation  
**Complexity:** O(n) time · O(1) space  
**Practice:** [046 Single Number](../../problems/12-math-bits/046-single-number.js) · [089 Missing Number](../../problems/12-math-bits/089-missing-number.js)

---

## The problem it solves

You have a pile of values where almost everything comes in **pairs**, and you want the one value
that does not. A hash map or set can count them, but that costs O(n) memory.

XOR finds the unpaired value with a single running number: one pass, no extra memory.

## The core idea

XOR (`^`) compares two numbers bit by bit: a result bit is `1` when the two bits **differ** and
`0` when they are the **same**. Think of every bit as a light switch: XOR-ing a `1` into it flips
it, XOR-ing a `0` leaves it alone.

Flip the same switch twice and it is back where it started. So if you XOR a value in twice, it
leaves no trace. Everything that appears an even number of times disappears, and only the values
that appear an odd number of times remain switched on.

## The three rules

| Rule                      | In words                                            |
|:--------------------------|:----------------------------------------------------|
| `x ^ x = 0`               | A value cancels itself.                             |
| `x ^ 0 = x`               | Zero changes nothing, so it is the starting value.  |
| `a ^ b = b ^ a`, and `(a ^ b) ^ c = a ^ (b ^ c)` | Order and grouping don't matter. |

The last rule is the one people forget, and it is what makes the trick work: the pairs do **not**
need to be next to each other. You can mentally rearrange the whole chain so each pair sits
together, cancel it to `0`, and see what survives.

## Step by step

1. Start with `acc = 0`.
2. For every value `x`, do `acc = acc ^ x`.
3. At the end, `acc` is the XOR of all values that appeared an odd number of times.

## Worked trace

Array: `[5, 3, 5, 6, 3]`. Every value is paired except `6`.

| Step | x (binary) | acc before | acc after |
|-----:|:----------:|:----------:|:---------:|
| 1    | 5 (`101`)  | 0 (`000`)  | 5 (`101`) |
| 2    | 3 (`011`)  | 5 (`101`)  | 6 (`110`) |
| 3    | 5 (`101`)  | 6 (`110`)  | 3 (`011`) |
| 4    | 6 (`110`)  | 3 (`011`)  | 5 (`101`) |
| 5    | 3 (`011`)  | 5 (`101`)  | 6 (`110`) |

Result: **6**. ✓

The **middle** values of `acc` are mixtures of several values and mean nothing on their own (it
even equals `6` after step 2, by coincidence). Only the final value means anything.

## Why it is correct

By the commutative and associative rules, `5 ^ 3 ^ 5 ^ 6 ^ 3` equals
`(5 ^ 5) ^ (3 ^ 3) ^ 6`. Each bracket is `0` by `x ^ x = 0`, which leaves `0 ^ 0 ^ 6`, which is
`6` by `x ^ 0 = x`. The same regrouping works for any order and any number of pairs.

## Making your own pairs

Sometimes nothing is paired yet, but you can **add** the partners yourself. Suppose a list should
hold every number in a known range, and one is missing:

- XOR in every value you **have**.
- XOR in every value you **should** have (the full range).

Every present number now appears twice and cancels. The missing one appears only once. Trace on
`[4, 0, 1, 3]` (range `0..4`), pairing each index `i` with the value at that index:

| i | value | acc before | acc after (`acc ^ i ^ value`) |
|--:|:-----:|:----------:|:-----------------------------:|
| 0 | 4     | 0          | 4                             |
| 1 | 0     | 4          | 5                             |
| 2 | 1     | 5          | 6                             |
| 3 | 3     | 6          | 6                             |

The indices only reach `3`, so XOR in `4` as well: `6 ^ 4 = 2`. Missing: **2**. ✓

(The sum formula `n(n+1)/2 − sum` works too. XOR has the small advantage of never overflowing
in languages with fixed-size integers.)

## Loop shape

**Use `for`.** Every value is XORed in exactly once. For the missing number, one `for` over the
indices XORs in both `i` and `nums[i]`, and `n` is added after the loop.

Bit problems that work on **one number** are the exception. Clearing the lowest set bit until
nothing is left, `while (x !== 0) { x &= x − 1; }`, runs once per set bit, and you don't know how
many there are. That makes it a `while`.

## How to recognise it

- "Every element appears **twice** except one."
- "Find the missing / duplicated number" in a known range, with **O(1) space** demanded.
- You need to detect **differences** between two collections that should be identical.

## Common mistakes

- **Starting `acc` at the first element and then XOR-ing the whole array**, which counts that
  element twice and cancels it.
- **Forgetting the last range value** when pairing indices with values: indices stop at `n − 1`
  but the range goes to `n`.
- **Using it when values repeat three times.** XOR only cancels **even** counts. "Appears three
  times" needs per-bit counting instead.
- **Worrying about negatives.** XOR works on the bit pattern, so negative numbers cancel fine.

## Practice

1. **[046 Single Number](../../problems/12-math-bits/046-single-number.js)** (Easy): the direct
   use. Every value is already paired except one.
2. **[089 Missing Number](../../problems/12-math-bits/089-missing-number.js)** (Easy): nothing is
   paired yet. Supply the partners from the range `0..n` yourself.

Run them with `./practice c 046` and `./practice c 089`.
