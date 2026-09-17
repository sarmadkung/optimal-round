"""
009 — LLM Sampling: Greedy, Temperature, Top-k, Top-p
Difficulty: Medium   ·   Track: LLM Internals   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Turn a vector of next-token logits into a chosen token id.

  Implement `greedy(logits)`:
    - logits: float array of shape (V,)
    - return the index of the largest logit as a Python int; on ties return
      the LOWEST index (this is what np.argmax does)

  Implement `filtered_probs(logits, temperature=1.0, top_k=None, top_p=None)`
  returning a float64 array of shape (V,) that sums to 1. Apply these steps
  in exactly this order:
    1. temperature: z = logits / temperature   (temperature > 0 here)
    2. softmax:     p = exp(z - max z) / sum(exp(z - max z))   (stable)
    3. top-k (skip if top_k is None or top_k >= V):
         rank tokens by p descending; ties go to the LOWER token index
         (np.argsort(-p, kind="stable") gives this order). Keep the first
         top_k tokens, set every other p to 0, renormalise to sum 1.
    4. top-p / nucleus (skip if top_p is None or top_p >= 1.0):
         on the distribution from step 3, rank tokens the same way. Walk down
         the ranking adding probabilities. Keep tokens up to AND INCLUDING the
         first one at which the running sum is >= top_p - 1e-9 (so at least
         one token is always kept). Set every other p to 0, renormalise.
    5. return p

  Implement `sample(logits, rng, temperature=1.0, top_k=None, top_p=None)`
  returning a Python int:
    - if temperature == 0: return greedy(logits) and do NOT touch rng
    - otherwise p = filtered_probs(logits, temperature, top_k, top_p) and
      return int(rng.choice(len(p), p=p))   (exactly one rng.choice call,
      so the same seed gives the same token as the tests expect)
    - rng is a np.random.Generator (e.g. np.random.default_rng(0))

WHY IT MATTERS
  The `temperature`, `top_k` and `top_p` knobs on every LLM API are these
  few lines. Knowing the order they compose in explains why temperature 0 is
  deterministic, why top_p=1 changes nothing, and why a low top_p can make a
  model repeat itself.

CONSTRAINTS
  1 <= V <= 10^5, 1 <= top_k, 0 < top_p
  Vectorise: no Python loop over the vocabulary.

EXAMPLES
  logits = log([0.5, 0.2, 0.2, 0.1])
  greedy(logits)                        -> 0
  filtered_probs(logits)                -> [0.5, 0.2, 0.2, 0.1]
  filtered_probs(logits, top_k=2)       -> [5/7, 2/7, 0, 0]
      (index 1 beats index 2 on the tie)
  filtered_probs(logits, top_p=0.75)    -> [5/9, 2/9, 2/9, 0]
      (running sums 0.5, 0.7, 0.9: the first >= 0.75 is the third token)
  filtered_probs(logits, top_p=0.7)     -> [5/7, 2/7, 0, 0]
      (0.7 >= 0.7 - 1e-9, so the second token already closes the nucleus)

  logits = [0, log 4], temperature = 2   -> z = [0, log 2] -> [1/3, 2/3]

EDGE CASES
  - top_k = 1 or a tiny top_p both reduce to the single most likely token.
  - Very large logits (e.g. 1000) must not produce nan.
  - temperature = 0 means greedy, not division by zero.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Build one helper that zeroes everything outside a set of kept indices
     and renormalises; both top-k and top-p use it.
  2. For top-p: order = argsort(-p, stable); c = cumsum(p[order]);
     cut = first index where c >= top_p - 1e-9; keep order[:cut + 1].
     np.searchsorted or np.argmax on a boolean array finds that index.
  3. Lower temperature sharpens the distribution; higher flattens it.

COMPLEXITY
  Target: O(V log V) time (one sort), O(V) extra space.
----------------------------------------------------------------------
"""

import numpy as np


def greedy(logits: np.ndarray) -> int:
    # TODO: your solution here
    raise NotImplementedError


def filtered_probs(
    logits: np.ndarray,
    temperature: float = 1.0,
    top_k: int | None = None,
    top_p: float | None = None,
) -> np.ndarray:
    # TODO: your solution here
    raise NotImplementedError


def sample(
    logits: np.ndarray,
    rng: np.random.Generator,
    temperature: float = 1.0,
    top_k: int | None = None,
    top_p: float | None = None,
) -> int:
    # TODO: your solution here
    raise NotImplementedError
