"""
030 — LoRA Linear Layer
Difficulty: Medium   ·   Track: AI Interview Drills   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Fine-tune a big linear layer by training only a tiny low-rank update next to
  it. The pretrained weight stays frozen; the update B·A has rank at most r.

  Implement class `LoRALinear`:

  LoRALinear(W, A, alpha)
    W      float array (out, in)   the frozen pretrained weight
    A      float array (r, in)     the trainable down-projection, given
    alpha  float                   the LoRA scaling numerator
    Set these public attributes:
      self.W      a float COPY of W
      self.A      a float COPY of A
      self.B      np.zeros((out, r))       trainable up-projection, starts at 0
      self.r      r = A.shape[0]
      self.scale  alpha / r
    Raise ValueError if W or A is not 2-D, or A.shape[1] != W.shape[1].
    Tests may assign a new array to layer.B (or layer.A); forward, backward
    and merge must read the attributes at call time.

  forward(x) -> y
    x: (n, in).  y = x @ Wᵀ + scale · (x @ Aᵀ) @ Bᵀ,  shape (n, out).
    Remember x for backward. No bias.

  backward(grad_out) -> (dx, dA, dB)
    grad_out: (n, out) = dLoss/dy for the last forward call.
    Return the gradients of the loss with respect to
      dx  (n, in)    the input
      dA  (r, in)    A
      dB  (out, r)   B
    There is NO gradient for W (it is frozen). Do not update any parameter
    and do not modify W, A or B. Raise RuntimeError if forward was never called.

  merge() -> W_merged
    Return a NEW array W + scale · B @ A, shape (out, in), so that
    x @ W_mergedᵀ equals forward(x). Do not modify self.W.

WHY IT MATTERS
  LoRA (Hu et al., 2021) is how most people fine-tune large models: a 4096 x
  4096 projection has 16.7M weights, but a rank-8 update has 65K. B starts
  at zero so the fine-tuned model is exactly the pretrained model at step 0,
  and after training merge() folds the update back in, so inference costs
  nothing extra. Deriving the backward pass by hand is a favourite interview
  question because it checks matrix calculus and shape discipline at once.

CONSTRAINTS
  1 <= r <= min(in, out) <= 512, 1 <= n <= 1024
  Vectorise: no Python loops over samples or matrix entries.

EXAMPLES
  W = [[1, 2], [3, 4], [5, 6]]   (out=3, in=2),  A = [[1, 1]]  (r=1),  alpha=2
  layer = LoRALinear(W, A, alpha=2)       ->  scale = 2.0, B = zeros((3, 1))
  layer.forward([[1, 0]])                 ->  [[1, 3, 5]]   (the base layer)
  layer.B = [[1], [0], [-1]] as an array
  layer.forward([[1, 0]])                 ->  [[1 + 2·1, 3, 5 - 2·1]] = [[3, 3, 3]]
  layer.merge()                           ->  [[3, 4], [3, 4], [3, 4]]
  layer.W                                 ->  still [[1, 2], [3, 4], [5, 6]]

  The same layer on x = [[1, 2]]: h = x @ Aᵀ = [[3]], base = [[5, 11, 17]],
  update = 2 · 3 · [1, 0, -1] = [6, 0, -6].
  layer.forward([[1, 2]])                 ->  [[11, 11, 11]]
  layer.backward([[1, 0, 0]])             ->  dx = [[3, 4]]
                                              dA = [[2, 4]]
                                              dB = [[6], [0], [0]]

  At init B is zero, so the LoRA path carries no signal into A yet. With
  x = [[1, 0], [0, 1]] and grad_out all ones:
  layer = LoRALinear(W, A, alpha=2);  layer.forward(x);  layer.backward(ones)
    dx  ->  [[9, 12], [9, 12]]   = grad_out @ W, shape (2, 2)
    dA  ->  [[0, 0]]             all zeros, shape (1, 2)
    dB  ->  [[4], [4], [4]]      non-zero, shape (3, 1)

  alpha = r is the "no rescaling" setting, scale exactly 1.0. With r = 2,
  A = [[1, 0], [0, 1]] and alpha = 2:
  layer = LoRALinear(W, A, alpha=2)       ->  scale = 1.0, B = zeros((3, 2))
  layer.B = [[0, 0], [0, 0], [1, 0]] as an array
  layer.merge()                           ->  [[1, 2], [3, 4], [6, 6]]
                                              (only the last row shifts, by B @ A)

  Bad shapes, and use before forward:
  LoRALinear(ones((3, 4)), ones((2, 5)), 1.0)  ->  ValueError  (in dims differ)
  LoRALinear(ones((3, 4)), ones(4), 1.0)       ->  ValueError  (A is 1-D)
  LoRALinear(W, A, 2).backward(ones((1, 3)))   ->  RuntimeError (no forward yet)

EDGE CASES
  - At init (B = 0) the output equals x @ Wᵀ, dA is all zeros, but dB is not:
    gradient flows into B first, then into A.
  - backward before any forward: RuntimeError.
  - merge() must not change the layer's W.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Name the intermediate h = x @ Aᵀ, shape (n, r). Then y = x @ Wᵀ + scale · h @ Bᵀ.
  2. For y = u @ Mᵀ: dM = grad_yᵀ @ u and du = grad_y @ M. Apply it twice.
  3. dh = scale · grad_out @ B;  the input gets two paths: through W and through A.
  4. Check every gradient's shape against its parameter's shape.

COMPLEXITY
  Target: forward and backward O(n · (in · out + r · (in + out))) time,
  O(n · r) extra space.
----------------------------------------------------------------------
"""

import numpy as np


class LoRALinear:
    def __init__(self, W: np.ndarray, A: np.ndarray, alpha: float):
        # TODO: your solution here
        raise NotImplementedError

    def forward(self, x: np.ndarray) -> np.ndarray:
        # TODO: your solution here
        raise NotImplementedError

    def backward(self, grad_out: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
        # TODO: your solution here
        raise NotImplementedError

    def merge(self) -> np.ndarray:
        # TODO: your solution here
        raise NotImplementedError
