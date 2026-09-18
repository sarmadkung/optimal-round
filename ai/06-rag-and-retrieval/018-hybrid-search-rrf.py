"""
018 — Hybrid Search with Reciprocal Rank Fusion
Difficulty: Medium   ·   Track: RAG & Retrieval   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Combine a dense (embedding) ranking with a sparse (keyword) ranking, then
  check that an answer's citations point at chunks you actually retrieved.

  A chunk is a dict {"id": str, "text": str}. `embed(text) -> list[float]` is
  an embedding model passed in by the caller.

  1. `cosine(a, b) -> float`
       dot(a, b) / (|a| · |b|). If either vector has norm 0, return 0.0.
       a and b are equal-length lists of floats.

  2. `dense_rank(query, chunks, embed) -> list[str]`
       - Call embed once for the query and once per chunk text.
       - Return ALL chunk ids ordered by cosine(query_vec, chunk_vec)
         descending; equal scores keep the chunks' original order.

  3. `rrf(rankings, k=60) -> list[tuple[str, float]]`
       - rankings: a list of rankings; each ranking is a list of ids, best first.
       - Ranks are 1-based. For every id:
             score(id) = sum over rankings that contain id of 1 / (k + rank)
         If an id appears more than once in the same ranking, only its first
         (best) position counts.
       - Return (id, score) for every id seen, sorted by score descending,
         then id ascending (plain string comparison) on ties.

  4. `hybrid_search(query, chunks, embed, sparse_ranking, top_n=5, k=60)`
       -> list[tuple[str, float]]
       - Fuse [dense_rank(query, chunks, embed), sparse_ranking] with rrf(..., k)
         and return the first top_n pairs. sparse_ranking is a list of chunk
         ids from a keyword search (e.g. BM25, problem 017), used as given.

  5. `ground_citations(answer, retrieved_ids) -> dict`
       - A citation is "[" digits "]" in the answer, e.g. "[2]". Citation n
         refers to retrieved_ids[n - 1] (1-based).
       - Return {"cited": [...], "invalid": [...]}:
           cited   = the ids of valid citations (1 <= n <= len(retrieved_ids)),
                     in order of first appearance, without duplicates
           invalid = the integers n that are out of range (including 0),
                     in order of first appearance, without duplicates
       - Anything else in brackets ("[a]", "[1,2]", "[ 1 ]") is not a citation.

WHY IT MATTERS
  Dense search finds paraphrases; keyword search finds exact names and codes.
  Their raw scores live on different scales, so you cannot just add them. RRF
  only uses ranks, needs no tuning, and is what most vector databases ship as
  "hybrid". Checking citations is the cheapest guardrail against an answer
  that cites a source it never saw.

CONSTRAINTS
  Up to 10^4 chunks, embedding dimension up to 4096, answers up to 10^5 chars.

EXAMPLES
  rrf([["a", "b", "c"], ["c", "a", "d"]])
    a: 1/61 + 1/62   c: 1/63 + 1/61   b: 1/62   d: 1/63
    -> [("a", 0.03252...), ("c", 0.03226...), ("b", 0.01613...), ("d", 0.01587...)]

  rrf([["x", "y"], ["y", "x"]])  -> x and y tie; "x" < "y", so x first.

  The two rankers disagree on the winner but agree "b" is decent:
  rrf([["a", "b"], ["c", "b"]])
    b: 1/62 + 1/62   a: 1/61   c: 1/61
    -> [("b", ≈0.03226), ("a", ≈0.01639), ("c", ≈0.01639)]
       (neither ranker put b first, yet b wins; a and c tie, "a" < "c")

  cosine([1.0, 0.0], [1.0, 1.0])  -> ≈0.7071
  cosine([0.0, 0.0], [1.0, 1.0])  -> 0.0        (zero vector, no ZeroDivision)

  One chunk, and a keyword search that returned nothing:
  embed maps "q" -> [1.0, 0.0] and "alpha" -> [0.0, 1.0]
  dense_rank("q", [{"id": "c1", "text": "alpha"}], embed)  -> ["c1"]
    (every chunk id is returned, even at cosine 0.0)
  hybrid_search("q", [{"id": "c1", "text": "alpha"}], embed, [], top_n=5)
    -> [("c1", ≈0.01639)]      1/(60 + 1), from the dense ranking only

  ground_citations("Paris [1] is big [3][1]. See [0].", ["c7", "c2"])
    -> {"cited": ["c7"], "invalid": [3, 0]}

EDGE CASES
  - rrf([]) and rrf([[], []]) return [].
  - cosine with a zero vector is 0.0, not a division error.
  - An id that only one ranking contains still gets a score from that ranking.
  - An answer with no citations -> {"cited": [], "invalid": []}.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Python's sort is stable: sorting indices by -score keeps original order
     on ties, which is exactly the dense_rank tie rule.
  2. For rrf, a dict id -> score, and a per-ranking `seen` set for duplicates.
  3. re.findall(r"\\[(\\d+)\\]", answer) gives every citation number as a string
     (single backslashes in real code).

COMPLEXITY
  Target: O(C · dim + C log C) for dense_rank (C chunks),
          O(R log R) for rrf (R total ranked items), O(len(answer)) for citations.
----------------------------------------------------------------------
"""


def cosine(a: list[float], b: list[float]) -> float:
    # TODO: your solution here
    raise NotImplementedError


def dense_rank(query: str, chunks: list[dict], embed) -> list[str]:
    # TODO: your solution here
    raise NotImplementedError


def rrf(rankings: list[list[str]], k: int = 60) -> list[tuple[str, float]]:
    # TODO: your solution here
    raise NotImplementedError


def hybrid_search(query: str, chunks: list[dict], embed, sparse_ranking: list[str],
                  top_n: int = 5, k: int = 60) -> list[tuple[str, float]]:
    # TODO: your solution here
    raise NotImplementedError


def ground_citations(answer: str, retrieved_ids: list[str]) -> dict:
    # TODO: your solution here
    raise NotImplementedError
