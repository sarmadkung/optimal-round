"""
005 — MLP Forward and Backprop
Difficulty: Medium   ·   Track: Neural Networks   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Build a 2-layer network by hand: Linear → ReLU → Linear → softmax
  cross-entropy. Compute the loss, then backpropagate to get every gradient.

  params is a dict of float arrays:
      "W1": (h, d)   "b1": (h,)   "W2": (C, h)   "b2": (C,)
  X: float array (n, d); y: integer array (n,) with values in [0, C).

  Implement `forward(params, X, y)` returning `(loss, cache)`:
      z1     = X·W1ᵀ + b1           (n, h)
      a1     = max(0, z1)           (n, h)
      logits = a1·W2ᵀ + b2          (n, C)
      loss   = mean over rows of -log softmax(logits)[y]     (Python float)
    Use a numerically stable log-softmax (subtract the row max).
    `cache` is anything you like; the tests only pass it to `backward`.

  Implement `backward(params, cache)` returning a dict with keys
  "W1", "b1", "W2", "b2", each the gradient of the MEAN loss with the same
  shape as the matching parameter:
      dlogits = (softmax(logits) - one_hot(y)) / n
      dW2 = dlogitsᵀ·a1 ;  db2 = sum of dlogits over rows
      da1 = dlogits·W2
      dz1 = da1 · [z1 > 0]          (ReLU derivative is 0 at exactly z1 = 0)
      dW1 = dz1ᵀ·X ;       db1 = sum of dz1 over rows
  Neither function may modify params.

  Implement `predict(params, X)` returning the integer ndarray (n,) of
  argmax logits (ties to the lowest class index, as np.argmax does).

WHY IT MATTERS
  Autograd frameworks do this for you, but debugging a transformer (a dead
  ReLU, a shape bug, an exploding gradient) needs the mental model of what
  flows backward through each layer. The MLP block inside every transformer
  layer is this exact Linear → activation → Linear stack.

CONSTRAINTS
  1 <= n <= 10^4, 1 <= d, h, C <= 512
  Vectorise over the batch: no Python loop over samples.

EXAMPLES
  W1 = [[1]], b1 = [0], W2 = [[1], [-1]], b2 = [0, 0], X = [[1]], y = [0]
    z1 = 1, a1 = 1, logits = [1, -1]
    p0 = sigmoid(2) ≈ 0.880797 ;  loss = log(1 + e^-2) ≈ 0.126928
    dlogits = [p0 - 1, 1 - p0] ≈ [-0.119203, 0.119203]
    dW2 ≈ [[-0.119203], [0.119203]] ;  db2 ≈ [-0.119203, 0.119203]
    da1 = dz1 ≈ -0.238406 ;  dW1 ≈ [[-0.238406]] ;  db1 ≈ [-0.238406]

EDGE CASES
  - A hidden unit whose z1 <= 0 for every sample is dead: its rows of dW1 and
    entries of db1 are exactly 0.
  - The gradients must match a finite-difference check to ~1e-6.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Save z1, a1, and the softmax probabilities in the cache; backward needs
     all three plus X and y.
  2. Check shapes at every line: a gradient always has the shape of the
     thing it is the gradient of.

COMPLEXITY
  Target: O(n · (d·h + h·C)) time, O(n · (h + C)) extra space.
----------------------------------------------------------------------
"""

import numpy as np


def forward(params: dict, X: np.ndarray, y: np.ndarray) -> tuple[float, object]:
    # TODO: your solution here
    raise NotImplementedError


def backward(params: dict, cache: object) -> dict:
    # TODO: your solution here
    raise NotImplementedError


def predict(params: dict, X: np.ndarray) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError
