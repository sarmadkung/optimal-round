"""
Deterministic stand-ins for the expensive, random parts of AI systems, so every
problem runs offline, for free, with the same result every time.

  FakeLLM       a chat model: replays scripted replies, or answers with a rule
  FakeEmbedder  a text embedder: hashed bag-of-words, L2-normalised
  FakeClock     a clock you advance by hand (for retries, rate limits, timeouts)
  count_tokens  a simple, predictable tokenizer: words and punctuation marks

Your solutions never import these. They receive them as arguments (an `llm`,
an `embed`, a `clock`), exactly as production code receives a real client.
"""

import copy
import hashlib
import math
import re

_TOKEN = re.compile(r"\w+|[^\w\s]")


def count_tokens(text: str) -> int:
    """Number of tokens: each run of word characters, and each punctuation mark."""
    return len(_TOKEN.findall(text))


class FakeLLM:
    """
    A chat model. Call it with a list of messages ({"role", "content"} dicts) and
    it returns a string.

      FakeLLM(replies=["a", "b"])        returns "a", then "b", then raises
      FakeLLM(rule=lambda messages: ...) returns whatever the rule returns

    Every call is recorded in `.calls` (a deep copy of the messages it was given).
    """

    def __init__(self, replies=None, rule=None):
        if (replies is None) == (rule is None):
            raise ValueError("pass exactly one of replies= or rule=")
        self._replies = list(replies) if replies is not None else None
        self._rule = rule
        self.calls = []

    def __call__(self, messages):
        self.calls.append(copy.deepcopy(messages))
        if self._rule is not None:
            return self._rule(messages)
        if not self._replies:
            raise RuntimeError("FakeLLM ran out of scripted replies")
        return self._replies.pop(0)


class FakeEmbedder:
    """Hashed bag-of-words embedding. Texts sharing words get a positive cosine."""

    def __init__(self, dim: int = 64):
        self.dim = dim

    def __call__(self, text: str) -> list[float]:
        vec = [0.0] * self.dim
        for word in re.findall(r"\w+", text.lower()):
            h = int(hashlib.md5(word.encode()).hexdigest(), 16)
            vec[h % self.dim] += 1.0 if (h >> 8) % 2 == 0 else -1.0
        norm = math.sqrt(sum(v * v for v in vec))
        return [v / norm for v in vec] if norm else vec


class FakeClock:
    """now() returns the current fake time in seconds; sleep(s) advances it."""

    def __init__(self, start: float = 0.0):
        self.t = start
        self.sleeps = []

    def now(self) -> float:
        return self.t

    def sleep(self, seconds: float) -> None:
        self.sleeps.append(seconds)
        self.t += seconds
