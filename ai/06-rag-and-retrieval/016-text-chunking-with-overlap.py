"""
016 — Text Chunking with Overlap
Difficulty: Easy   ·   Track: RAG & Retrieval   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Split a document into pieces small enough to embed and retrieve.

  Words are `text.split()` (runs of non-whitespace). Word positions are
  0-based indices into that list. Every chunk is a dict
      {"text": " ".join(words[start:end]), "start": start, "end": end}
  where `end` is EXCLUSIVE. Chunks are returned in order of `start`.

  1. `chunk_words(text, max_words, overlap) -> list[dict]`
       - If max_words < 1, or overlap < 0, or overlap >= max_words, raise
         ValueError.
       - If there are no words, return [].
       - The first chunk starts at 0. Each chunk is
         [start, min(start + max_words, n)). The next chunk starts at
         start + (max_words - overlap). Stop right after the chunk whose end
         is n (so the last chunk may be shorter, and no chunk is contained
         entirely in the previous one).

  2. `chunk_sentences(text, max_words) -> list[dict]`
       - If max_words < 1, raise ValueError. No words -> [].
       - Sentences: a sentence ends at a word whose LAST character is ".",
         "!" or "?". Words left over at the end form a final sentence.
       - Pack whole sentences greedily, in order: add the next sentence to the
         current chunk if the chunk would still have <= max_words words;
         otherwise close the current chunk and start a new one with it.
       - A sentence longer than max_words: close the current chunk (if any),
         then cut that sentence into consecutive pieces of max_words words
         (the last piece may be shorter). Each piece is its own chunk, and the
         next sentence starts a new chunk (it is never packed with a piece).
       - No overlap in this variant.

WHY IT MATTERS
  Retrieval quality is decided before any embedding happens. Chunks that are
  too big dilute the match; chunks cut mid-sentence lose meaning; no overlap
  means a fact that straddles a boundary is found by neither chunk. Offsets
  let you cite and highlight the exact source span.

CONSTRAINTS
  Up to 10^6 words. O(n) time.

EXAMPLES
  text = "a b c d e f g h i j"   (10 words)
  chunk_words(text, 4, 1)
    -> [{"text": "a b c d", "start": 0, "end": 4},
        {"text": "d e f g", "start": 3, "end": 7},
        {"text": "g h i j", "start": 6, "end": 10}]

  chunk_words("a b c d e", 2, 0)
    -> [{"text": "a b", "start": 0, "end": 2},
        {"text": "c d", "start": 2, "end": 4},
        {"text": "e", "start": 4, "end": 5}]          (overlap 0: back to back)

  chunk_words("a b c d", 3, 2)
    -> [{"text": "a b c", "start": 0, "end": 3},
        {"text": "b c d", "start": 1, "end": 4}]
       (stop as soon as end == n, so no chunk sits inside the previous one)

  chunk_words("a b c", 3, 3)   -> ValueError   (overlap >= max_words)
  chunk_words("   ", 5, 1)     -> []           (no words)
  chunk_words("  hello   big  world ", 10, 3)
    -> [{"text": "hello big world", "start": 0, "end": 3}]
       (fewer words than max_words: one chunk, extra whitespace collapsed)

  chunk_sentences("One two. Three four five. Six!", 5)
    -> [{"text": "One two. Three four five.", "start": 0, "end": 5},
        {"text": "Six!", "start": 5, "end": 6}]

  chunk_sentences("Hi. one two three four five six seven. Bye now.", 3)
    -> [{"text": "Hi.", "start": 0, "end": 1},
        {"text": "one two three", "start": 1, "end": 4},
        {"text": "four five six", "start": 4, "end": 7},
        {"text": "seven.", "start": 7, "end": 8},
        {"text": "Bye now.", "start": 8, "end": 10}]
       (the over-long sentence is cut into pieces; "Bye now." starts fresh)

EDGE CASES
  - Fewer words than max_words: one chunk covering everything.
  - chunk_words with overlap = 0: plain back-to-back pieces.
  - Extra whitespace and newlines disappear, because words are re-joined with
    single spaces.
  - A trailing sentence with no punctuation is still a sentence.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. For chunk_words, a `while True` loop with a `break` when end == n is the
     simplest way to get the stopping rule right.
  2. For chunk_sentences, first turn the words into (start, end) sentence
     spans, then pack spans. Keep "current chunk start" and "current end".

COMPLEXITY
  Target: O(n) time, O(n) space for the output.
----------------------------------------------------------------------
"""


def chunk_words(text: str, max_words: int, overlap: int) -> list[dict]:
    # TODO: your solution here
    raise NotImplementedError


def chunk_sentences(text: str, max_words: int) -> list[dict]:
    # TODO: your solution here
    raise NotImplementedError
