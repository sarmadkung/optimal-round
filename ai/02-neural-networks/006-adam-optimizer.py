"""
006 — Adam and SGD with Momentum
Difficulty: Medium   ·   Track: Neural Networks   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Implement the two optimizers that train almost every neural network, as
  classes that keep per-parameter state between steps.

  Both classes have `step(params, grads)`:
    - params: list of float ndarrays; grads: list of arrays of matching shapes
    - update every param IN PLACE (e.g. `p -= ...`), return None
    - state is created lazily on the first step (zeros shaped like each
      param) and is kept per list position; always pass the params in the
      same order.

  `Adam(lr=1e-3, beta1=0.9, beta2=0.999, eps=1e-8)`
    - attribute `t`: the number of step() calls so far (starts at 0,
      incremented once at the START of each step, so the first step uses t=1)
    - for each param p with gradient g:
        m     = beta1·m + (1 - beta1)·g
        v     = beta2·v + (1 - beta2)·g²
        m_hat = m / (1 - beta1^t)
        v_hat = v / (1 - beta2^t)
        p    -= lr · m_hat / (sqrt(v_hat) + eps)       (eps OUTSIDE the sqrt)

  `SGDMomentum(lr=0.01, momentum=0.9)`  (the PyTorch convention, no dampening)
    - for each param p with gradient g, buffer buf starting at zeros:
        buf = momentum·buf + g
        p  -= lr · buf

WHY IT MATTERS
  Adam (and its sibling AdamW) trains essentially every LLM. Its m and v
  buffers are why optimizer state takes twice the memory of the weights, and
  the bias correction is why the first few hundred steps behave sensibly.
  Knowing the update rule lets you reason about learning-rate warmup, eps
  choice, and mixed-precision issues.

CONSTRAINTS
  Any number of params, any shapes. No Python loop over array elements
  (a loop over the list of params is fine).

EXAMPLES
  p = [array([0.0])], Adam(lr=0.1), grad [2.0]
    m = 0.2, v = 0.004, m_hat = 2.0, v_hat = 4.0
    p = 0 - 0.1·2/(2 + 1e-8)  ≈  -0.1
  Because of bias correction, Adam's first step moves each entry by about
  lr·sign(g), whatever the size of g.

  p = [array([0.0])], SGDMomentum(lr=0.1, momentum=0.9), grad [1.0] twice
    step 1: buf = 1.0, p = -0.1
    step 2: buf = 1.9, p = -0.29

EDGE CASES
  - A zero gradient on Adam's first step leaves the param unchanged
    (0 / (0 + eps) = 0).
  - Two params have fully independent m, v (or buf) state.
  - The param arrays must be the same objects after step (updated in place).

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Keep lists self.m and self.v, one array per param, built on first step.
  2. In-place ops (`m *= beta1; m += ...`, `p -= ...`) update the caller's
     arrays; `p = p - ...` only rebinds a local name.

COMPLEXITY
  Target: O(total number of parameters) time per step, O(2 × parameters)
  state for Adam, O(parameters) for momentum.
----------------------------------------------------------------------
"""

import numpy as np


class Adam:
    def __init__(self, lr: float = 1e-3, beta1: float = 0.9, beta2: float = 0.999, eps: float = 1e-8):
        # TODO: your solution here
        raise NotImplementedError

    def step(self, params: list[np.ndarray], grads: list[np.ndarray]) -> None:
        # TODO: your solution here
        raise NotImplementedError


class SGDMomentum:
    def __init__(self, lr: float = 0.01, momentum: float = 0.9):
        # TODO: your solution here
        raise NotImplementedError

    def step(self, params: list[np.ndarray], grads: list[np.ndarray]) -> None:
        # TODO: your solution here
        raise NotImplementedError
