"""
010 — Beam Search Decoding
Difficulty: Medium   ·   Track: Generative AI   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Decode a sequence from a language model with beam search.

  Implement `beam_search(next_log_probs, beam_width, max_len, eos,
                         length_penalty=0.0)`
  returning a list of `(tokens, score)` pairs:
    - next_log_probs(prefix) takes a tuple of str tokens and returns a
      non-empty dict {token: log-probability} for the next token.
    - A hypothesis is a tuple of tokens plus a raw score (the sum of the
      log-probabilities of its tokens). Start with one live hypothesis: the
      empty tuple () with raw score 0.0.
    - Run at most `max_len` steps. Each step:
        1. for every live hypothesis (prefix, s), call next_log_probs(prefix)
           once, and make a candidate (prefix + (tok,), s + lp) for each entry.
        2. sort ALL candidates of this step by (-raw score, tokens), i.e.
           highest raw score first, and on equal scores the tuple of tokens
           that is smaller under Python tuple comparison first.
        3. keep the first `beam_width` candidates. Any kept candidate whose
           last token == eos is FINISHED (it is never expanded again); the
           other kept candidates are the live hypotheses for the next step.
        4. if there are no live hypotheses left, stop.
    - After the loop, hypotheses still live (they hit max_len without eos)
      also count as finished.
    - Final score of a finished hypothesis:
          score = raw / len(tokens) ** length_penalty
      (length_penalty = 0.0 means score = raw; len counts the eos token).
    - Return EVERY finished hypothesis as (tokens: tuple[str, ...],
      score: float), sorted by (-score, tokens) with the same tie rule.
      Its eos token, if any, stays in `tokens`.
    - Beam pruning in step 3 always uses the RAW score; length_penalty only
      affects the final ranking.

WHY IT MATTERS
  Greedy decoding commits to the best next token and can walk into a
  low-probability dead end. Beam search keeps several candidates alive; it is
  still the default for translation, speech recognition and constrained
  generation, and the length-penalty trick fixes its bias toward short output.

CONSTRAINTS
  1 <= beam_width <= 20, 1 <= max_len <= 50, vocabulary <= 1000 per step
  Your code must never call next_log_probs on a prefix that ends in eos, or
  on a prefix of length >= max_len (the tests record every call).

EXAMPLES
  Model (probabilities shown; the function returns their logs):
    ()          -> {"a": 0.6, "b": 0.4}
    ("a",)      -> {"<eos>": 0.4, "x": 0.3, "y": 0.3}
    ("b",)      -> {"z": 0.9, "<eos>": 0.1}
    ("b", "z")  -> {"<eos>": 1.0}

  beam_width=1, max_len=5 (greedy):
    [(("a", "<eos>"), log 0.24)]
  beam_width=2, max_len=5:
    step 1: ("a",) 0.6, ("b",) 0.4
    step 2: ("b","z") 0.36, ("a","<eos>") 0.24 kept; ("a","<eos>") finishes
    step 3: ("b","z","<eos>") 0.36 finishes; nothing live, stop
    -> [(("b","z","<eos>"), log 0.36), (("a","<eos>"), log 0.24)]

EDGE CASES
  - max_len reached with no eos: those hypotheses are returned unfinished.
  - Equal scores are common (uniform models); the tie rule decides the order.
  - A step may finish every kept candidate, which ends the search early.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Keep `live` and `finished` as plain lists of (tokens, raw) tuples.
  2. candidates.sort(key=lambda c: (-c[1], c[0])) implements the tie rule.
  3. Apply the length penalty only when building the returned list.

COMPLEXITY
  Target: O(max_len · beam_width · V · log(beam_width · V)) time,
  O(beam_width · max_len) space for the hypotheses.
----------------------------------------------------------------------
"""

from typing import Callable


def beam_search(
    next_log_probs: Callable[[tuple[str, ...]], dict[str, float]],
    beam_width: int,
    max_len: int,
    eos: str,
    length_penalty: float = 0.0,
) -> list[tuple[tuple[str, ...], float]]:
    # TODO: your solution here
    raise NotImplementedError
