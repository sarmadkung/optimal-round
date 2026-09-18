"""
028 — Multi-Head Self-Attention
Difficulty: Hard   ·   Track: AI Interview Drills   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Write the forward pass of multi-head self-attention, the core layer of every
  transformer, fully vectorised in NumPy.

  Implement `multi_head_attention(X, W_q, W_k, W_v, W_o, n_heads, causal=False)`
  returning `(out, weights)`.

  Inputs
    X        float array (B, T, d)   a batch of B sequences of T token vectors
    W_q, W_k, W_v, W_o   float arrays (d, d)
             Weights use the "(out_features, in_features)" convention, so a
             projection of row vectors is  X @ W.T  (no biases anywhere).
    n_heads  h, an int; d must be divisible by h, else raise ValueError
    causal   if True, position t may only attend to positions s <= t

  Steps
    1. Q = X @ W_q.T,  K = X @ W_k.T,  V = X @ W_v.T          each (B, T, d)
    2. Split into heads, d_head = d // h: reshape (B, T, h, d_head) then
       transpose to (B, h, T, d_head). Head i therefore uses feature columns
       i*d_head : (i+1)*d_head of the projected Q, K, V.
    3. scores = Q @ Kᵀ / sqrt(d_head)                          (B, h, T, T)
       (Kᵀ swaps the last two axes)
    4. If causal: set scores[..., t, s] = -inf for every s > t.
    5. weights = softmax(scores) over the LAST axis. It must be numerically
       stable: no nan or inf for large scores (subtract the row max first).
    6. heads = weights @ V                                     (B, h, T, d_head)
    7. Merge: transpose to (B, T, h, d_head), reshape to (B, T, d).
    8. out = merged @ W_o.T                                    (B, T, d)

  Return `out` with shape (B, T, d) and `weights` with shape (B, h, T, T).

WHY IT MATTERS
  "Implement attention from scratch" is the single most common coding question
  in ML and LLM engineering interviews. It tests whether you really know the
  shapes, the scaling, the mask, and the reshape/transpose dance that splits
  and merges heads, and whether you can vectorise instead of looping.

CONSTRAINTS
  1 <= B <= 8, 1 <= T <= 128, 1 <= d <= 256
  No Python loops over batch, heads or positions.

EXAMPLES
  Shapes and the softmax invariant, B=2, T=5, d=8, n_heads=4:
    out, weights = multi_head_attention(X, W_q, W_k, W_v, W_o, 4)
      out.shape             ->  (2, 5, 8)
      weights.shape         ->  (2, 4, 5, 5)
      weights.sum(axis=-1)  ->  1.0 everywhere
    Both arrays are plain float arrays (float64 for float64 inputs).

  The smallest readable case: B=1, T=2, d=2, n_heads=1, all four weights the
  identity, X = [[1, 0], [0, 1]]. Then Q = K = V = X and
  scores = X Xᵀ / sqrt(2) = [[0.7071, 0], [0, 0.7071]], so
    weights[0, 0]  ->  [[0.6698, 0.3302],
                        [0.3302, 0.6698]]
    (0.6698 ≈ e^0.7071 / (e^0.7071 + 1))
    out[0]         ->  the same two rows, because V = X and W_o = I

  Head splitting, B=1, T=2, d=4, n_heads=2, identity weights,
  X = [[1, 0, 0, 0], [0, 0, 1, 0]]. Head 0 sees only columns 0:2, where
  token 0 is [1, 0] and token 1 is [0, 0]; head 1 sees only columns 2:4, where
  the two are swapped. So the heads are mirror images:
    weights.shape  ->  (1, 2, 2, 2)
    weights[0, 0]  ->  [[0.6698, 0.3302], [0.5, 0.5]]
    weights[0, 1]  ->  [[0.5, 0.5], [0.3302, 0.6698]]
    out[0]         ->  [[0.6698, 0, 0.5, 0], [0.5, 0, 0.6698, 0]]
    A reshape without the transpose back gives the right shape and wrong rows.

  The mask alone, with W_q = 0 so every score is 0 and each row is uniform over
  what it is allowed to see (B=1, T=3, d=2, n_heads=1):
    multi_head_attention(X, zeros(2, 2), I, I, I, 1, causal=True)
      weights[0, 0]  ->  [[1.0,    0.0,    0.0   ],
                          [0.5,    0.5,    0.0   ],
                          [0.3333, 0.3333, 0.3333]]
    Without causal=True all nine entries are 0.3333. With it,
    weights[b, i, t, s] == 0 for s > t, and changing X[:, 4] of a longer
    sequence leaves out[:, :4] unchanged.

  T = 1: one position, nothing to choose between, so attention is a no-op.
    out, weights = multi_head_attention(X, W_q, W_k, W_v, W_o, 2, causal=True)
      weights  ->  all 1.0, shape (B, 2, 1, 1)
      out      ->  X @ W_v.T @ W_o.T           (W_q and W_k cannot matter)

  n_heads = 1 gives the classic single-head formula
    softmax(Q Kᵀ / sqrt(d)) V, then the output projection.
  d = 6 with n_heads = 4     ->  ValueError (6 is not divisible by 4)
  X * 1e4 with n_heads = 2   ->  out and weights still finite, rows still
                                 summing to 1 (a saturated row is one 1.0 and
                                 the rest 0.0, never nan)

EDGE CASES
  - T = 1: each token attends only to itself; weights are all 1.
  - d not divisible by n_heads: ValueError.
  - Huge input values (e.g. X * 1e4): still finite, rows still sum to 1.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. np.triu(np.ones((T, T), dtype=bool), k=1) is True exactly where s > t.
  2. np.where(mask, -np.inf, scores) broadcasts the (T, T) mask over (B, h).
  3. Subtracting the row max keeps every exponent <= 0; exp(-inf) is 0.
  4. Getting the merge wrong (reshape without transpose back) still gives the
     right shape but the wrong numbers. Compare with a per-head loop.

COMPLEXITY
  Target: O(B · T² · d) time, O(B · h · T²) extra space for the weights.
----------------------------------------------------------------------
"""

import numpy as np


def multi_head_attention(
    X: np.ndarray,
    W_q: np.ndarray,
    W_k: np.ndarray,
    W_v: np.ndarray,
    W_o: np.ndarray,
    n_heads: int,
    causal: bool = False,
) -> tuple[np.ndarray, np.ndarray]:
    # TODO: your solution here
    raise NotImplementedError
