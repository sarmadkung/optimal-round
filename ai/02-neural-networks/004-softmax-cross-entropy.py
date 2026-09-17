"""
004 — Softmax and Cross-Entropy
Difficulty: Easy   ·   Track: Neural Networks   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Turn logits into probabilities, score them against the true class, and
  compute the gradient that trains every classifier and every LLM.

  All inputs: logits is a float array of shape (n, C) (always 2-D);
  labels is an integer array of shape (n,) with values in [0, C).

  Implement `softmax(logits)` returning an (n, C) float array where each row is
      softmax(z)_j = exp(z_j) / sum_k exp(z_k)
  It must be numerically stable: subtract each row's max before exp, so
  logits like [1000, 1000] give [0.5, 0.5] with no overflow and no nan.

  Implement `cross_entropy(logits, labels)` returning a Python float:
      loss = mean over rows i of  -log softmax(logits_i)[labels_i]
  Compute it through log-softmax,
      log softmax(z)_j = (z_j - m) - log(sum_k exp(z_k - m)),  m = max(z)
  so it stays finite even when the true class's probability underflows to 0
  (e.g. logits [[0, 1000]] with label 0 gives exactly 1000.0, not inf).

  Implement `cross_entropy_grad(logits, labels)` returning an (n, C) array,
  the gradient of the MEAN loss w.r.t. the logits:
      grad = (softmax(logits) - one_hot(labels)) / n
  Do not modify the input logits.

WHY IT MATTERS
  Every LLM ends in exactly this: a softmax over the vocabulary and a
  cross-entropy loss on the next token. The "subtract the max" trick is why
  training does not blow up with nan, and the (p - y) gradient is what flows
  back into the whole network.

CONSTRAINTS
  1 <= n <= 10^4, 2 <= C <= 10^4
  Vectorise: no Python loop over rows.

EXAMPLES
  softmax([[0, 0, 0, 0]])            ->  [[0.25, 0.25, 0.25, 0.25]]
  softmax([[1000, 1000]])            ->  [[0.5, 0.5]]
  cross_entropy([[0, 0, 0]], [2])    ->  log(3) ≈ 1.098612
  cross_entropy([[0, 1000]], [0])    ->  1000.0
  cross_entropy_grad([[0, 0], [0, 0]], [0, 1])
                                     ->  [[-0.25, 0.25], [0.25, -0.25]]

EDGE CASES
  - Adding the same constant to a whole row changes nothing.
  - A confident, correct prediction gives loss ≈ 0 and gradient ≈ 0.
  - Each row of the gradient sums to 0.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. `logits.max(axis=1, keepdims=True)` keeps the shape (n, 1) so it
     broadcasts against (n, C).
  2. `arr[np.arange(n), labels]` picks one entry per row.

COMPLEXITY
  Target: O(n · C) time and extra space.
----------------------------------------------------------------------
"""

import numpy as np


def softmax(logits: np.ndarray) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def cross_entropy(logits: np.ndarray, labels: np.ndarray) -> float:
    # TODO: your solution here
    raise NotImplementedError


def cross_entropy_grad(logits: np.ndarray, labels: np.ndarray) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError
