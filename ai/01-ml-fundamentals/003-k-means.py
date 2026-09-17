"""
003 — K-Means Clustering
Difficulty: Medium   ·   Track: ML Fundamentals   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Implement Lloyd's algorithm for k-means, starting from given centroids
  (no randomness anywhere).

  Implement `kmeans(X, init_centroids, max_iters=100)` returning
  `(centroids, labels, inertia)`:
    - X: float array of shape (n, d)
    - init_centroids: float array of shape (k, d). Do NOT modify it; work on
      a copy.
    - Assignment step: each point gets the index of its nearest centroid by
      squared Euclidean distance. Ties go to the LOWEST centroid index
      (np.argmin does this).
    - Update step: each centroid becomes the mean of the points assigned to
      it. EMPTY CLUSTER RULE: a centroid with no points keeps its old value.
    - The loop, exactly:
        C = copy of init_centroids ; labels = None
        repeat at most max_iters times:
            new = assign(X, C)
            if labels is not None and new == labels (every entry): stop
            labels = new
            C = update(X, labels, C)
        labels = assign(X, C)        # final assignment to the returned C
    - inertia = sum over points of ||x_i - C[labels_i]||², as a Python float
    - Return centroids as a float ndarray (k, d), labels as an integer
      ndarray (n,), inertia as a float. The returned labels and inertia always
      describe the returned centroids.

WHY IT MATTERS
  k-means is the workhorse behind vector quantisation (IVF indexes in vector
  databases, product quantisation), topic clustering of embeddings, and
  deduplicating training data. It is also the cleanest example of
  alternating optimisation, the idea behind EM.

CONSTRAINTS
  1 <= n <= 10^4, 1 <= k <= 50, 1 <= d <= 100
  Vectorise the distance computation: an (n, k) distance matrix, not a
  Python loop over points. A loop over the k clusters is fine.

EXAMPLES
  X = [[0],[1],[10],[11]], init = [[0],[1]]
    iter 1: labels [0,1,1,1] -> C = [[0],[22/3]]
    iter 2: labels [0,0,1,1] -> C = [[0.5],[10.5]]
    iter 3: labels [0,0,1,1] unchanged -> stop
  kmeans(X, init)  ->  C = [[0.5],[10.5]], labels = [0,0,1,1], inertia = 1.0

  Same input with max_iters=1  ->  C = [[0],[22/3]], labels = [0,0,1,1],
    inertia = 0 + 1 + (10 - 22/3)² + (11 - 22/3)² = 1 + 64/9 + 121/9

EDGE CASES
  - max_iters = 0: centroids are the initial ones; labels and inertia are
    computed against them.
  - A centroid far from every point gets no points and stays where it is.
  - k = 1: the centroid is the mean of all points.
  - A point exactly halfway between two centroids goes to the lower index.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. X[:, None, :] - C[None, :, :] broadcasts to (n, k, d); square and sum
     over the last axis.
  2. For the update, loop over j in range(k) and use the mask labels == j.

COMPLEXITY
  Target: O(iters · n · k · d) time, O(n · k) extra space.
----------------------------------------------------------------------
"""

import numpy as np


def kmeans(
    X: np.ndarray, init_centroids: np.ndarray, max_iters: int = 100
) -> tuple[np.ndarray, np.ndarray, float]:
    # TODO: your solution here
    raise NotImplementedError
