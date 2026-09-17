"""
008 — Causal Self-Attention
Difficulty: Medium   ·   Track: LLM Internals   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Implement batched scaled dot-product attention, the core of a transformer:

      Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k  +  mask) · V

  Implement `softmax(x, axis=-1)`:
    - numerically stable: subtract the max along `axis` before exponentiating
    - entries equal to -inf get probability exactly 0.0
    - returns a float array with the same shape as x

  Implement `causal_mask(T)` returning a float array of shape (T, T) with
  0.0 on and below the diagonal and -inf strictly above it
  (mask[i, j] = -inf when j > i).

  Implement `attention(Q, K, V, causal=False)` returning `(out, weights)`:
    - Q: shape (B, T_q, d_k), K: shape (B, T_k, d_k), V: shape (B, T_k, d_v)
    - scores  = Q @ Kᵀ / sqrt(d_k)          shape (B, T_q, T_k)
                (Kᵀ swaps the last two axes of K; d_k = Q.shape[-1])
    - if causal: T_q == T_k is guaranteed; add causal_mask(T) to every batch
      element, so query i may only look at keys 0..i
    - weights = softmax(scores, axis=-1)    shape (B, T_q, T_k)
    - out     = weights @ V                 shape (B, T_q, d_v)
    - both are float ndarrays

WHY IT MATTERS
  Every layer of every GPT-style model runs this. The causal mask is what
  makes a model "autoregressive": token i cannot peek at tokens after it, so
  training on all positions at once is the same as predicting one at a time.

CONSTRAINTS
  1 <= B <= 32, 1 <= T <= 256, 1 <= d_k, d_v <= 128
  Vectorise over batch and positions: no Python loops.

EXAMPLES
  B=1, T=2, d_k=1
    Q = [[[1],[1]]], K = [[[0],[ln 3]]], V = [[[10],[20]]]
    scores = [[0, ln 3], [0, ln 3]]
    non-causal: weights = [[1/4, 3/4], [1/4, 3/4]], out = [[17.5], [17.5]]
    causal:     weights = [[1, 0], [1/4, 3/4]],     out = [[10],   [17.5]]

  causal_mask(3) = [[0, -inf, -inf],
                    [0,    0, -inf],
                    [0,    0,    0]]

EDGE CASES
  - T = 1: the only weight is 1.0 and out equals V.
  - Huge scores (e.g. 1000) must not produce nan or inf.
  - With causal=True the first output row equals V[:, 0] exactly.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. K.transpose(0, 2, 1) or np.swapaxes(K, -1, -2) gives Kᵀ per batch.
  2. -inf minus a finite max is still -inf, and np.exp(-inf) is 0.0, so the
     stable softmax handles masked entries for free.
  3. np.triu(np.ones((T, T)), k=1) marks the future positions.

COMPLEXITY
  Target: O(B · T² · d) time, O(B · T²) extra space for the weights.
----------------------------------------------------------------------
"""

import numpy as np


def softmax(x: np.ndarray, axis: int = -1) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def causal_mask(T: int) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def attention(
    Q: np.ndarray, K: np.ndarray, V: np.ndarray, causal: bool = False
) -> tuple[np.ndarray, np.ndarray]:
    # TODO: your solution here
    raise NotImplementedError
