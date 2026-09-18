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

  p = [array([0.0])], SGDMomentum(lr=0.1, momentum=0.9), grad [1.0] each step
    step 1: buf = 1.0, p = -0.1
    step 2: buf = 1.9, p = -0.29
    step 3: buf = 2.71, p = -0.561

  Adam's second step, same optimizer as above, now with grad [-1.0]
    t = 2: m = 0.9·0.2 + 0.1·(-1) = 0.08 ; v = 0.999·0.004 + 0.001·1 = 0.004996
    m_hat = 0.08/(1 - 0.9²) ≈ 0.421053 ; v_hat = 0.004996/(1 - 0.999²) ≈ 2.4995
    p ≈ -0.1 - 0.1·0.421053/1.581 ≈ -0.126634
  opt.t  ->  2   (t counts step() calls and is incremented first)

  Zero gradients and independent per-param state, Adam(lr=0.01):
  params = [array([1.0, 1.0, 1.0]), array([[5.0, 5.0]])]
  grads  = [array([1e3, -1e-3, 0.0]), array([[0.0, 7.0]])]
  after one step  ->  [array([0.99, 1.01, 1.0]), array([[5.0, 4.99]])]
    (every non-zero gradient moves its entry by lr regardless of magnitude;
     a zero gradient leaves the entry untouched, 0/(0 + eps) = 0)

  SGDMomentum keeps a separate buffer per list position, lr=1.0,
  momentum=0.5, a = array([0.0]), b = array([[0.0, 0.0]])
    step 1, grads [[1.0], [[0.0, 2.0]]]: a = [-1.0], b = [[0.0, -2.0]]
    step 2, grads [[0.0], [[0.0, 2.0]]]: a's buf 1 -> 0.5, b[1]'s buf 2 -> 3
  after both steps  ->  a = [-1.5], b = [[0.0, -5.0]]
    (a and b are the same array objects throughout: updates are in place)

  Adam minimises a quadratic. params = [zeros(3)], grad = 2·(w - target)
  with target = [3.0, -2.0, 0.5] and Adam(lr=0.05)
  after 2000 steps  ->  w ≈ [3.0, -2.0, 0.5]   (to within 1e-3)

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
