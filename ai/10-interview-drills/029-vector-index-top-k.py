"""
029 — In-Memory Vector Index with Top-k Search
Difficulty: Medium   ·   Track: AI Interview Drills   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Build the tiny core of a vector database: store embeddings under string
  ids and return the k most similar ones to a query, vectorised with NumPy.

  Implement class `VectorIndex`:

  VectorIndex(dim)
    An empty index for vectors of length dim.

  add(ids, vectors) -> None
    ids: list[str] of length n; vectors: array-like of shape (n, dim).
    - Validate first, and change nothing if the call is invalid: raise
      ValueError if vectors is not 2-D with shape (len(ids), dim), or if any
      vector has L2 norm 0.
    - Store each vector L2-NORMALISED (v / ||v||).
    - An id that is already in the index is replaced (the index size does
      not grow). If the same id appears twice in one call, the later one wins.

  delete(id) -> bool
    Remove id. Return True if it was present, False otherwise.

  __len__() -> int
    Number of ids currently stored.

  search(query, k, filter=None) -> list[tuple[str, float]]
    query: array-like of shape (dim,). Raise ValueError on the wrong shape or
    a zero-norm query.
    - score = cosine similarity = dot(normalised query, stored vector)
    - filter: None, or a callable filter(id) -> bool; only ids for which it
      returns True are candidates
    - return up to k (id, score) pairs, score as a Python float, sorted by
      score DESCENDING, ties (exactly equal float scores) by id ASCENDING
      (plain string comparison). If fewer than k candidates exist, return
      them all. k <= 0 or no candidates: return [].
    - The tie-break must hold at the k-th place too: if several ids tie for
      the last slot, the smallest ids get in.

WHY IT MATTERS
  Every RAG system, recommender and semantic search box sits on this
  operation. Interviewers use it to see if you know why you normalise once at
  insert time (cosine becomes a plain dot product), how to take top-k without
  sorting everything (argpartition / partition), how deletes and upserts keep
  ids and rows in sync, and whether you handle ties deterministically.

CONSTRAINTS
  1 <= dim <= 1024, up to 10^5 stored vectors
  search must compute all scores with one matrix-vector product, not a Python
  loop over stored vectors. (Applying `filter` to ids in Python is fine.)

EXAMPLES
  idx = VectorIndex(2)
  idx.add(["a", "b", "c"], [[1, 0], [0, 2], [3, 3]])
  idx.search([1, 0], k=2)   ->  [("a", 1.0), ("c", 0.7071...)]
  idx.search([0, 5], k=5)   ->  [("b", 1.0), ("c", 0.7071...), ("a", 0.0)]
  idx.search([1, 0], k=1)   ->  [("a", 1.0)]
  idx.search([1, 0], k=0)   ->  []
  idx.add(["a"], [[0, -1]])            # replaces "a"; len(idx) is still 3
  idx.search([1, 0], k=3, filter=lambda i: i != "c")
                            ->  [("a", 0.0), ("b", 0.0)]    (tie -> id order)
  idx.delete("b") -> True;  idx.delete("zzz") -> False;  len(idx) -> 2

  Only direction counts, because both sides are normalised:
  n = VectorIndex(2);  n.add(["v"], [[3, 4]])
  n.search([6, 8], k=1)     ->  [("v", 1.0)]

  The tie-break decides the last slot, not just the order. Five ids share the
  vector [1, 1]:
  t = VectorIndex(2)
  t.add(["e", "b", "d", "a", "c"], [[1, 1]] * 5)
  t.add(["top"], [[1, 0.9]]);  t.add(["low"], [[0, 1]])
  t.search([1, 0.9], k=3)   ->  [("top", ≈1.0), ("a", 0.9986...), ("b", 0.9986...)]
                                (a and b win the tie on id order; c, d, e are cut)
  ids from t.search([1, 0.9], k=7)
                            ->  ["top", "a", "b", "c", "d", "e", "low"]

  Nothing stored, or nothing survives the filter:
  VectorIndex(3).search([1, 0, 0], k=3)            ->  []
  idx.search([1, 0], k=3, filter=lambda i: False)  ->  []

  A rejected add leaves the index exactly as it was:
  z = VectorIndex(3);  z.add(["a"], [[1, 2, 3]])
  z.add(["b", "c"], [[1, 0, 0], [0, 0, 0]])  ->  ValueError, len(z) still 1
  z.search([0, 0, 0], k=1)                   ->  ValueError  (zero-norm query)
  z.search([1, 0], k=1)                      ->  ValueError  (wrong shape)

EDGE CASES
  - Empty index, or a filter that rejects everything: [].
  - k larger than the number of candidates: all candidates, sorted.
  - [3, 4] stored and [6, 8] queried: score 1.0 (both are normalised).
  - A zero vector in add, or a zero query: ValueError (and add changes nothing).

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Keep a (N, dim) matrix of unit rows, a list of ids by row, and a dict
     id -> row. To delete in O(dim), move the last row into the hole.
  2. The k-th largest score is np.partition(scores, N - k)[N - k]. Keep every
     row whose score is >= that value (this keeps all ties), then sort that
     small set by (-score, id) and cut to k.
  3. argpartition alone can drop a tied id that should have won on id order.

COMPLEXITY
  Target: search O(N · dim + m log m) where m is the number of rows scoring
  at least the k-th score (usually about k); add O(n · dim); delete O(dim).
----------------------------------------------------------------------
"""

import numpy as np


class VectorIndex:
    def __init__(self, dim: int):
        # TODO: your solution here
        raise NotImplementedError

    def add(self, ids: list[str], vectors) -> None:
        # TODO: your solution here
        raise NotImplementedError

    def delete(self, id: str) -> bool:
        # TODO: your solution here
        raise NotImplementedError

    def __len__(self) -> int:
        # TODO: your solution here
        raise NotImplementedError

    def search(self, query, k: int, filter=None) -> list[tuple[str, float]]:
        # TODO: your solution here
        raise NotImplementedError
