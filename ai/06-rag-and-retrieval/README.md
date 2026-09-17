# RAG & Retrieval

> A model can only use what you put in front of it. Retrieval decides what that is.

**Track:** 06 · **Problems:** 016–018  
**Language:** Python (stdlib only)  
**Fakes used:** `FakeEmbedder` from `ai/_fakes` (passed in as `embed`, never imported)

---

## What this track is

Retrieval-augmented generation (RAG) answers a question in three steps:

1. **Index:** cut your documents into chunks, and make them searchable (keywords, embeddings, or
   both).
2. **Retrieve:** for a question, find the few chunks most likely to contain the answer.
3. **Generate:** give those chunks to the model, and ask it to answer and cite them.

This track builds the retrieval half by hand: chunking, a keyword ranker, a vector ranker, the fusion
of the two, and a check that the model's citations point at real sources.

## Why it matters for AI engineering

When a RAG system gives a wrong answer, the model is usually not the problem. The right chunk was never
retrieved, or it was cut in half, or the keyword that mattered was blurred away by an embedding. Being
able to reason about each stage, and to name the trade-off it makes, is the core skill in building and
debugging these systems, and a common interview topic.

## Core concepts

### Chunking and overlap

Embeddings and prompts work on bounded pieces of text, so documents are split into **chunks**. Too big,
and a chunk's embedding is an average of many topics, so it matches nothing sharply. Too small, and a
chunk lacks the context to be useful. **Overlap** repeats a few words between neighbours, so a fact that
straddles a boundary is still whole in at least one chunk. **Sentence-aware** chunking goes further and
only cuts between sentences. **Offsets** (start and end word) let you highlight and cite the exact span.

**Intuition:** cutting a long banner into posters. Overlap each poster by a hand's width so no word is
sliced through the middle.

### Sparse retrieval: BM25

BM25 scores a document by the query words it contains, with three ideas in one formula:

- **Rare words count more** (inverse document frequency). Matching "the" says little; matching
  "ECONNRESET" says a lot.
- **Repeats have diminishing returns** (term-frequency saturation, controlled by `k1`). The tenth
  mention of a word adds far less than the first.
- **Long documents are discounted** (length normalisation, controlled by `b`). A long document matches
  more words by accident, so each match is worth a bit less.

**Intuition:** a librarian who trusts unusual keywords, is not fooled by a page that repeats one word
fifty times, and knows a 400-page book mentions everything once.

### Dense retrieval: embeddings and cosine similarity

An embedding model maps text to a vector so that texts with similar meaning point in similar directions.
**Cosine similarity** measures the angle between two vectors and ignores their length. Dense search
finds paraphrases ("car" for "automobile") that keyword search misses, but can blur exact identifiers.

**Intuition:** every text is an arrow; similar meanings point the same way.

### Hybrid search and Reciprocal Rank Fusion

Dense and sparse search fail in different ways, so running both and combining them beats either alone.
Their raw scores are on unrelated scales (a BM25 score of 12 and a cosine of 0.8 cannot be added). **RRF**
ignores the scores and uses only **ranks**: each list gives an item `1 / (k + rank)`, and the item's
fused score is the sum. The constant `k` (usually 60) keeps the top rank from dominating, and an item
ranked well by both lists rises to the top.

**Intuition:** two judges each hand in a ranked list. You do not compare their scoring styles, only
where each placed each contestant.

### Grounding and citations

Asking the model to cite chunks as `[1]`, `[2]` makes answers checkable. The cheapest guardrail is
mechanical: every citation number must point at a chunk that was actually retrieved. A citation to a
chunk that does not exist is a sign the model is making things up.

**Intuition:** a footnote that points to page 300 of a 12-page report.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 016 | [Text Chunking with Overlap](./016-text-chunking-with-overlap.py) | Easy | Fixed-size word chunks with overlap, and sentence-aware packing, with offsets |
| 017 | [BM25 Ranking](./017-bm25-ranking.py) | Medium | Okapi BM25 scoring: IDF, term saturation, length normalisation, top-k |
| 018 | [Hybrid Search with Reciprocal Rank Fusion](./018-hybrid-search-rrf.py) | Medium | Cosine ranking, RRF fusion of dense and sparse lists, citation checking |

Run one with `./practice 016` from the `ai/` folder.

## Common mistakes

- **An off-by-one stopping rule in chunking.** Loop until the start passes the end, and you emit a final
  chunk that sits entirely inside the previous one.
- **Allowing `overlap >= chunk size`.** The window never moves forward, and the loop never ends.
- **Using the wrong IDF form.** Classic BM25 IDF can go negative for very common words; the `+ 1` form
  used here keeps it positive. Use the formula you are given, exactly.
- **Counting a repeated query word twice.** Decide whether query terms are distinct and stick to it.
- **Tokenising the corpus again for every query term.** Tokenise once, count once.
- **Adding raw BM25 and cosine scores.** Different scales; the larger one silently wins. Fuse ranks.
- **0-based ranks in RRF.** The formula uses rank 1 for the top item; rank 0 changes every score.
- **Dividing by zero in cosine** for an empty text whose embedding is all zeros.
- **Unstable tie-breaking.** Retrieval results must be reproducible; state the tie rule and apply it.
- **Trusting `[n]` citations without checking the range,** including `[0]`.

## Suggested order

1. **016 Text Chunking with Overlap** (Easy): careful loop bounds, then a greedy packer.
2. **017 BM25 Ranking** (Medium): get the counts (tf, df, lengths) right first; the formula is then one
   line per term.
3. **018 Hybrid Search with RRF** (Medium): builds on both. Rank with cosine, fuse with RRF, and finish
   with the citation check.
