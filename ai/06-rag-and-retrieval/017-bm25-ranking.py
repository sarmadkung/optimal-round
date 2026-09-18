"""
017 — BM25 Ranking
Difficulty: Medium   ·   Track: RAG & Retrieval   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Rank documents for a keyword query with Okapi BM25, the sparse-retrieval
  baseline that dense embeddings are still measured against.

  1. `tokenize(text) -> list[str]`
       re.findall(r"\\w+", text.lower())   (one backslash in real code: this
       docstring is a normal string, so it doubles backslashes)

  2. `bm25_scores(corpus, query, k1=1.5, b=0.75) -> list[float]`
       - corpus: list of document strings; query: a string.
       - Returns one score per document, in corpus order.
       - Definitions (all on tokenized text):
           N       = number of documents
           dl(d)   = number of tokens in document d
           avgdl   = mean of dl over all documents
           tf(t,d) = how many times term t occurs in d
           df(t)   = number of documents containing t at least once
           idf(t)  = ln((N - df(t) + 0.5) / (df(t) + 0.5) + 1)     (natural log)
       - score(d) = sum over DISTINCT query terms t of
             idf(t) · tf(t,d) · (k1 + 1) / (tf(t,d) + k1 · (1 - b + b · dl(d) / avgdl))
         (a repeated query term counts once; a term with tf = 0 adds 0).
       - Empty corpus -> []. If avgdl == 0 (every document empty), every
         score is 0.0.

  3. `top_k(corpus, query, k, k1=1.5, b=0.75) -> list[tuple[int, float]]`
       - (doc_index, score) pairs for documents with score > 0 only,
         sorted by score descending, then doc_index ascending;
         at most k pairs. k <= 0 -> [].

WHY IT MATTERS
  BM25 nails exact terms that embeddings blur: error codes, product names,
  function names, rare jargon. Most production RAG runs BM25 next to a vector
  search and fuses the two (see problem 018). Knowing the formula tells you
  why long documents do not win just by repeating a word.

CONSTRAINTS
  Up to 10^4 documents and 10^6 tokens total. Tokenize each document once and
  compute document frequencies once per call.

EXAMPLES
  corpus = ["the cat sat", "the dog", "cats and dogs"]
  top_k(corpus, "cat", 5)
    N = 3, df("cat") = 1, idf = ln(2.5/1.5 + 1) = ln(8/3)
    avgdl = 8/3, doc 0: dl = 3, tf = 1
    score = ln(8/3) · 2.5 / (1 + 1.5 · (0.25 + 0.75 · 3/(8/3)))  ≈ 0.9286
    -> [(0, 0.9286...)]     ("cats" is a different token, so doc 2 scores 0)

  top_k(corpus, "the", 5)  -> doc 1 (shorter) before doc 0
    -> [(1, ≈0.5296), (0, ≈0.4450)]

  top_k(corpus, "cat dog", 5)   (the two terms prefer different documents)
    -> [(1, ≈1.1052), (0, ≈0.9286)]
       (doc 1 wins on "dog" alone; doc 2 has neither token and is left out)

  bm25_scores(corpus, "zzz")  -> [0.0, 0.0, 0.0]   (term in no document)
  top_k(corpus, "zzz", 5)     -> []
  top_k(corpus, "?!", 5)      -> []                (query tokenizes to [])

  bm25_scores(["hello world"], "world")  -> [≈0.2877]
    N = 1, df = 1, idf = ln(0.5/1.5 + 1) = ln(4/3); dl == avgdl == 2, so the
    length factor is 1 and the tf factor is 2.5/(1 + 1.5) = 1.0

  top_k(["zeta alpha", "alpha", "beta", "alpha beta gamma delta"],
        "alpha", 10, b=0.0)
    -> [(0, ≈0.3567), (1, ≈0.3567), (3, ≈0.3567)]
       (b = 0 removes length normalisation: equal tf gives exactly equal
        scores, so the three are ordered by doc index; doc 2 scores 0)

EDGE CASES
  - A query with no tokens (e.g. "?!") gives all-zero scores and top_k [].
  - b = 0 turns off length normalisation: equal tf gives equal scores.
  - Documents with equal scores are ordered by index.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. collections.Counter per document gives tf; a Counter over set(tokens)
     for each document gives df.
  2. With this "+ 1" IDF form, idf is always positive, even for a term that
     appears in every document.
  3. `sorted(pairs, key=lambda p: (-p[1], p[0]))` gives the required order.

COMPLEXITY
  Target: O(total tokens + N · |query|) time, O(total tokens) space.
----------------------------------------------------------------------
"""


def tokenize(text: str) -> list[str]:
    # TODO: your solution here
    raise NotImplementedError


def bm25_scores(corpus: list[str], query: str, k1: float = 1.5, b: float = 0.75) -> list[float]:
    # TODO: your solution here
    raise NotImplementedError


def top_k(corpus: list[str], query: str, k: int, k1: float = 1.5, b: float = 0.75) -> list[tuple[int, float]]:
    # TODO: your solution here
    raise NotImplementedError
