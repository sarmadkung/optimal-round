# Sieve of Eratosthenes

> Find every prime below n by crossing out the multiples of each prime, instead of testing numbers one by one.

**Family:** Number theory · Math  
**Complexity:** O(n log log n) time · O(n) space  
**Practice:** [162 Count Primes](../../problems/22-number-theory/162-count-primes.js)

---

## In 60 seconds

**The idea.** Do not ask "is x prime?" for each x. Instead let each prime announce that all its
multiples are **not** prime, and cross them off a board of flags. Whatever is never crossed out
is prime.

**The rule to remember.** Outer loop `p` from 2 while `p × p < n`, skipping any `p` already
crossed out. Inner loop crosses out `p × p`, `p × p + p`, `p × p + 2p`, ... up to n − 1. Start at
`p × p`, not `2p`, and stop once `p × p ≥ n`.

**Reach for it when** the question wants **all** primes below n, a count of them, or many
primality questions over a range that one prebuilt table can answer by lookup.

**The traps.** The bound is strict, so "less than n" excludes n itself; handle n = 0, 1 and 2.
And never count 0 or 1 as prime just because nothing crossed them out.

Everything below is those same ideas, slowly.

## The problem it solves

You need **all** the primes below some bound n, or how many there are.

Testing each number on its own ("does anything from 2 to √x divide x?") costs about √x per
number, so O(n √n) overall. For n in the millions that is billions of divisions. The sieve
turns the question around: instead of asking "is x prime?" for every x, each prime announces
"all my multiples are **not** prime".

## The core idea

Write the numbers 2, 3, 4, ... n − 1 on a board. The first number not crossed out is 2, so it is
prime. Cross out every multiple of 2. The next number still standing is 3, so it is prime (nothing
smaller divided it). Cross out its multiples. Keep going. Whatever is never crossed out is prime.

Two observations make it fast:

- **Start crossing at p × p.** Any smaller multiple `p × m` with `m < p` has a factor smaller
  than p, so it was already crossed out when that smaller prime had its turn.
- **Stop once p × p ≥ n.** If p × p is already out of range, p has no multiples left to cross
  out that are not already gone. Every composite number below n has a prime factor at most √n.

## Step by step

Make a boolean array `isComposite` of size n, all false.

1. For `p` from 2 while `p × p < n`:
   - If `p` is already crossed out, skip it (it is composite, and its prime factors did its job).
   - Otherwise cross out `p × p`, `p × p + p`, `p × p + 2p`, ... up to n − 1.
2. Every `x` from 2 to n − 1 that is not crossed out is prime.

0 and 1 are not prime, so they are never counted.

## Worked trace

Primes below `n = 30`. The outer loop runs while `p × p < 30`, so p goes 2, 3, 4, 5 and stops
at 6 (36 ≥ 30).

The board, one row per pass. A number printed as itself is **still standing**, `X` is crossed out
**on this pass**, and `.` was already crossed out on an earlier pass.

```
               2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
p = 2          2  3  X  5  X  7  X  9  X 11  X 13  X 15  X 17  X 19  X 21  X 23  X 25  X 27  X 29
p = 3          2  3  .  5  .  7  .  X  . 11  . 13  .  X  . 17  . 19  .  X  . 23  . 25  .  X  . 29
p = 4 skip     2  3  .  5  .  7  .  .  . 11  . 13  .  .  . 17  . 19  .  .  . 23  . 25  .  .  . 29
p = 5          2  3  .  5  .  7  .  .  . 11  . 13  .  .  . 17  . 19  .  .  . 23  .  X  .  .  . 29
still up       2  3  .  5  .  7  .  .  . 11  . 13  .  .  . 17  . 19  .  .  . 23  .  .  .  .  . 29
```

Notice how little each later pass does. The `p = 2` row does almost all the crossing out, `p = 3`
adds four numbers, `p = 4` is skipped because 4 is itself crossed out, and `p = 5` crosses out a
single number. The same trace as a table:

| p | p is...          | Start at p·p | Newly crossed out                      | Hit again (already out) |
|--:|:-----------------|-------------:|:---------------------------------------|:------------------------|
| 2 | prime            | 4            | 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28 | –              |
| 3 | prime            | 9            | 9, 15, 21, 27                          | 12, 18, 24              |
| 4 | crossed out, skip | –           | –                                      | –                       |
| 5 | prime            | 25           | 25                                     | –                       |
| 6 | stop: 36 ≥ 30    |              |                                        |                         |

Still standing: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, which is **10 primes**.

Look at what the shortcuts saved:

- p = 3 started at 9, not 6. The 6 was already crossed out by 2.
- p = 5 started at 25. Its smaller multiples 10, 15 and 20 were already gone.
- 7, 11, 13 and the rest never ran at all. 7 × 7 = 49 is past the end, so every multiple of 7
  below 30 (14, 21, 28) already had a smaller prime factor.

## Why it is correct

- **Nothing prime is crossed out.** A number is only crossed out as `p × m` with `m ≥ p ≥ 2`,
  so it has a divisor other than 1 and itself.
- **Every composite is crossed out.** A composite `x < n` has a smallest prime factor `q`, and
  `x = q × m` with `m ≥ q`, so `x ≥ q × q`. That means `q × q < n`, so the outer loop reaches
  `q`. And `q` is still standing, because nothing smaller divides a prime. So the crossing for
  `q` runs; it starts at `q × q ≤ x` and steps by `q`, so it lands on `x`.

## Why O(n log log n)

Prime p crosses out about n / p numbers. The total work is n × (1/2 + 1/3 + 1/5 + 1/7 + ...) over
primes up to √n, and that sum of prime reciprocals grows like log log n. It is so slow-growing
that in practice the sieve behaves almost linearly. The price is memory: one flag per number.

## Loop shape

**Use two nested `for` loops.** Both have a fixed step decided up front:

- **Outer:** `for (p = 2; p * p < n; p++)`.
- **Inner:** `for (m = p * p; m < n; m += p)`.

A step other than 1 is still a `for`. What matters is that the step is fixed, not decided by the
data. Counting the primes at the end is one more `for`.

## How to recognise it

- "Count the primes less than n", "list all primes up to n".
- Many primality questions over a range, rather than one number: build the sieve once and
  answer each question by lookup.
- Variants: storing the **smallest prime factor** instead of a boolean lets you factor any
  number below n quickly.

## Common mistakes

- **Off-by-one on the bound.** "Less than n" means index n itself is excluded; allocate and loop
  with that in mind, and handle n = 0, 1 and 2 (no primes).
- **Starting the inner loop at 2p.** Still correct, but it repeats work the smaller primes already did.
- **Looping p all the way to n.** Also correct, but wasted: past √n nothing new gets crossed out.
- **Crossing out from composite p.** Skip p when it is already crossed out; its multiples are
  covered by its prime factors.
- **Counting 0 and 1 as prime** because they were never crossed out.

## Practice

1. **[162 Count Primes](../../problems/22-number-theory/162-count-primes.js)** (Medium): the bound
   is up to 5 × 10⁶, so trial division is too slow. Sieve below n and count what is left standing,
   remembering the bound is strict.

Run it with `./practice c 162`.
