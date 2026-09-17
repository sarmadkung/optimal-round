"""
001 — Linear Regression with Gradient Descent
Difficulty: Easy   ·   Track: ML Fundamentals   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Fit y ≈ X·w + b by batch gradient descent on mean squared error.

  Implement `fit(X, y, lr, epochs)` returning `(w, b)`:
    - X: float array of shape (n, d), y: shape (n,)
    - start from w = zeros(d), b = 0.0
    - each epoch does ONE full-batch update:
        pred = X·w + b
        err  = pred - y
        dw   = (2/n) · Xᵀ·err
        db   = (2/n) · sum(err)
        w   -= lr · dw ;  b -= lr · db
    - return w as an ndarray of shape (d,) and b as a Python float

  Implement `predict(X, w, b)` returning X·w + b, shape (n,).

WHY IT MATTERS
  This loop — forward pass, loss gradient, parameter update — is the same loop
  that trains an LLM with billions of parameters. Only the model and the
  optimizer get fancier.

CONSTRAINTS
  1 <= n <= 10^4, 1 <= d <= 50
  Vectorise: no Python loop over samples (a loop over epochs is fine).

EXAMPLES
  X = [[1],[2],[3],[4]], y = [3,5,7,9]   (y = 2x + 1)
  fit(X, y, lr=0.05, epochs=2000)  ->  w ≈ [2.0], b ≈ 1.0

EDGE CASES
  - epochs = 0 returns the initial zeros.
  - A learning rate that is too large diverges; that is expected, not a bug.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. `X @ w` gives all n predictions at once.
  2. The gradient of mean((pred - y)^2) w.r.t. pred is (2/n)·(pred - y).

COMPLEXITY
  Target: O(epochs · n · d) time, O(n + d) extra space.
----------------------------------------------------------------------
"""

import numpy as np


def fit(X: np.ndarray, y: np.ndarray, lr: float, epochs: int) -> tuple[np.ndarray, float]:
    # TODO: your solution here
    raise NotImplementedError


def predict(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError
