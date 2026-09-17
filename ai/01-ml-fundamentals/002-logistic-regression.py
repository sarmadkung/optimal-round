"""
002 — Logistic Regression
Difficulty: Medium   ·   Track: ML Fundamentals   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Fit a binary classifier p(y=1 | x) = sigmoid(x·w + b) by batch gradient
  descent on the mean binary cross-entropy (BCE).

  Implement `sigmoid(z)`:
    - z: float ndarray of any shape; return an ndarray of the same shape with
      1 / (1 + exp(-z)) applied element-wise.
    - It must be numerically stable: no overflow warnings and no nan for huge
      |z| (e.g. z = ±1000 gives exactly 1.0 and 0.0). Use 1/(1+exp(-z)) where
      z >= 0 and exp(z)/(1+exp(z)) where z < 0.

  Implement `bce_loss(X, y, w, b)` returning the mean BCE as a Python float:
        z    = X·w + b
        loss = mean( log(1 + exp(z)) - y·z )
    (this equals mean(-y·log p - (1-y)·log(1-p)) but never takes log(0);
     `np.logaddexp(0, z)` computes log(1 + exp(z)) stably.)

  Implement `fit(X, y, lr, epochs)` returning `(w, b)`:
    - X: float array of shape (n, d); y: shape (n,) with values 0.0 or 1.0
    - start from w = zeros(d), b = 0.0
    - each epoch does ONE full-batch update:
        p    = sigmoid(X·w + b)
        err  = p - y
        dw   = (1/n) · Xᵀ·err
        db   = (1/n) · sum(err)
        w   -= lr · dw ;  b -= lr · db
    - return w as an ndarray of shape (d,) and b as a Python float

  Implement `predict_proba(X, w, b)` returning sigmoid(X·w + b), shape (n,).
  Implement `predict(X, w, b)` returning an integer ndarray of shape (n,):
    1 where predict_proba >= 0.5 (a probability of exactly 0.5 is class 1),
    else 0.

WHY IT MATTERS
  Logistic regression is a one-layer neural network. Its gradient,
  (p - y)·x, is exactly the gradient an LLM's output layer gets from softmax
  cross-entropy, just with two classes instead of fifty thousand. The
  stable-sigmoid trick is the same one every framework uses.

CONSTRAINTS
  1 <= n <= 10^4, 1 <= d <= 50
  Vectorise: no Python loop over samples (a loop over epochs is fine).

EXAMPLES
  sigmoid(np.array([0.0, 1000.0, -1000.0]))  ->  [0.5, 1.0, 0.0]

  X = [[1,2],[3,4]], y = [1,0]
  fit(X, y, lr=0.1, epochs=1)  ->  w = [-0.05, -0.05], b = 0.0
    (p = [0.5, 0.5], err = [-0.5, 0.5], dw = ½·[1.0, 1.0], db = 0)

  bce_loss(X, y, zeros(2), 0.0)  ->  log(2) ≈ 0.693147

EDGE CASES
  - epochs = 0 returns the initial zeros.
  - Perfectly separable data: the weights keep growing with more epochs; the
    predictions are still correct. That is expected.
  - Huge logits must not produce overflow warnings, inf, or nan.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Split the array with a boolean mask (z >= 0) and fill each part with the
     formula whose exponent is never positive.
  2. The derivative of BCE w.r.t. the logit z is simply p - y.

COMPLEXITY
  Target: O(epochs · n · d) time, O(n + d) extra space.
----------------------------------------------------------------------
"""

import numpy as np


def sigmoid(z: np.ndarray) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def bce_loss(X: np.ndarray, y: np.ndarray, w: np.ndarray, b: float) -> float:
    # TODO: your solution here
    raise NotImplementedError


def fit(X: np.ndarray, y: np.ndarray, lr: float, epochs: int) -> tuple[np.ndarray, float]:
    # TODO: your solution here
    raise NotImplementedError


def predict_proba(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def predict(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError
