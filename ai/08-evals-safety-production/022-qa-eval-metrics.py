"""
022 — QA Eval Metrics (Exact Match and F1)
Difficulty: Easy   ·   Track: Evals, Safety & Production   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Score a question-answering system the way the SQuAD benchmark does.

  Implement `normalize_answer(s)` -> str, applying these steps IN THIS ORDER:
    1. lowercase the string
    2. remove every character that is in string.punctuation (deleted, not
       replaced by a space: "don't" -> "dont", "U.S." -> "us")
    3. replace every whole word a, an, the with a space, using the regex
       r"\\b(a|an|the)\\b"
    4. collapse whitespace: " ".join(s.split())

  Implement `exact_match(prediction, golds)` -> float
    - 1.0 if normalize_answer(prediction) equals normalize_answer(g) for ANY
      gold answer g in golds, else 0.0.

  Implement `f1_score(prediction, golds)` -> float
    - For one gold: pred_tokens = normalize_answer(prediction).split(),
      gold_tokens = normalize_answer(gold).split().
        * If either list is empty: 1.0 if both are empty, else 0.0.
        * common = the number of shared tokens, counted with multiplicity
          (Counter intersection: min of the two counts for each token).
        * If common == 0: 0.0.
        * precision = common / len(pred_tokens), recall = common / len(gold_tokens),
          F1 = 2 · precision · recall / (precision + recall).
    - Return the MAX F1 over all golds.

  Both exact_match and f1_score raise ValueError if golds is empty.

  Implement `evaluate(predictions, dataset)` -> dict
    - predictions: dict mapping question id -> predicted answer str
    - dataset: list of {"id": str, "answers": list[str]}
    - A question with no entry in predictions is scored with prediction "".
    - Returns {"exact_match": 100 · mean EM, "f1": 100 · mean F1, "count": n},
      both percentages rounded with round(x, 2).
    - An empty dataset returns {"exact_match": 0.0, "f1": 0.0, "count": 0}.

WHY IT MATTERS
  You cannot improve a model you cannot measure. Plain string equality calls
  "The Eiffel Tower" wrong when the gold answer is "Eiffel Tower", and a strict
  metric that punishes harmless differences hides real progress. Normalization
  plus token F1 is the standard fix, and the same idea sits under many LLM eval
  harnesses.

CONSTRAINTS
  Up to 10^5 questions, answers up to a few hundred characters.

EXAMPLES
  normalize_answer("The  Eiffel Tower!")      -> "eiffel tower"
  exact_match("eiffel tower", ["The Eiffel Tower", "Paris"])   -> 1.0
  f1_score("Paris, France", ["Paris"])
    pred ["paris", "france"], gold ["paris"], common 1
    P = 0.5, R = 1.0, F1 = 0.6666...
  f1_score("the the cat", ["cat cat"])
    pred ["cat"] (both "the" removed), gold ["cat", "cat"], common 1
    P = 1.0, R = 0.5, F1 = 0.6666...

  evaluate({"q1": "Paris", "q2": "blue whale"},
           [{"id": "q1", "answers": ["Paris"]},
            {"id": "q2", "answers": ["the blue whale", "whale"]},
            {"id": "q3", "answers": ["42"]}])
    EM = [1, 1, 0], F1 = [1, 1, 0]
    -> {"exact_match": 66.67, "f1": 66.67, "count": 3}

EDGE CASES
  - Punctuation is removed BEFORE articles, so "the." still loses its "the".
  - "theater" and "another" keep their letters: only whole words are articles.
  - A prediction of "" against a gold of "The" scores EM 1.0 and F1 1.0 (both
    normalize to empty). This is how "no answer" questions are scored.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. str.maketrans("", "", string.punctuation) with str.translate deletes
     punctuation in one pass.
  2. collections.Counter supports `&` for the shared multiset of tokens.
  3. Write the single-gold F1 as a helper, then take max over golds.

COMPLEXITY
  Target: O(total characters) per example.
----------------------------------------------------------------------
"""


def normalize_answer(s: str) -> str:
    # TODO: your solution here
    raise NotImplementedError


def exact_match(prediction: str, golds: list[str]) -> float:
    # TODO: your solution here
    raise NotImplementedError


def f1_score(prediction: str, golds: list[str]) -> float:
    # TODO: your solution here
    raise NotImplementedError


def evaluate(predictions: dict[str, str], dataset: list[dict]) -> dict:
    # TODO: your solution here
    raise NotImplementedError
