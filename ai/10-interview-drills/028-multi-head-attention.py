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
  B=2, T=5, d=8, n_heads=4:
    out.shape == (2, 5, 8),  weights.shape == (2, 4, 5, 5)
    every row weights[b, i, t] sums to 1
  n_heads = 1 gives the classic single-head formula
    softmax(Q Kᵀ / sqrt(d)) V, then the output projection.
  With causal=True, weights[b, i, t, s] == 0 for s > t, and changing X[:, 4]
  leaves out[:, :4] unchanged.

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
