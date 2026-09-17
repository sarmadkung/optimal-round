import pytest

from _fakes import FakeClock, FakeLLM
from _harness import load

m = load("024")


class ScriptedLLM:
    """Raises each exception instance in the script, returns each string."""

    def __init__(self, script):
        self.script = list(script)
        self.calls = []

    def __call__(self, messages):
        self.calls.append(messages)
        item = self.script.pop(0)
        if isinstance(item, BaseException):
            raise item
        return item


def msg(text):
    return [{"role": "user", "content": text}]


def test_token_bucket_waits_exactly():
    clock = FakeClock()
    bucket = m.TokenBucket(capacity=2, refill_rate=2.0, clock=clock)
    bucket.acquire()
    bucket.acquire()
    assert clock.sleeps == []
    bucket.acquire()
    assert clock.sleeps == [0.5] and clock.t == 0.5
    assert bucket.try_acquire() is False
    clock.t += 10.0  # refill is capped at capacity
    assert bucket.try_acquire(2) is True
    assert bucket.try_acquire() is False
    assert clock.sleeps == [0.5]
    with pytest.raises(ValueError):
        bucket.acquire(3)


def test_token_bucket_partial_refill():
    clock = FakeClock(start=100.0)
    bucket = m.TokenBucket(capacity=4, refill_rate=0.5, clock=clock)
    assert bucket.try_acquire(4) is True
    clock.t += 1.0  # +0.5 tokens
    bucket.acquire(2)  # needs 1.5 more at 0.5/s -> 3 seconds
    assert clock.sleeps == [3.0] and clock.t == 104.0
    assert bucket.tokens == pytest.approx(0.0)


def test_retries_with_exponential_backoff():
    clock = FakeClock()
    llm = ScriptedLLM([m.RateLimitError("429"), m.ServerError("503"), "hi"])
    client = m.ResilientClient(llm, clock, capacity=10)
    assert client.complete(msg("hey")) == "hi"
    assert clock.sleeps == [1.0, 2.0]
    assert len(llm.calls) == 3


def test_backoff_capped_then_raises_last_error():
    clock = FakeClock()
    errors = [m.RateLimitError(f"try {i}") for i in range(6)]
    llm = ScriptedLLM(errors)
    client = m.ResilientClient(llm, clock, capacity=100, max_retries=5,
                               base_delay=1.0, max_delay=5.0)
    with pytest.raises(m.RateLimitError) as info:
        client.complete(msg("x"))
    assert info.value is errors[-1]
    assert clock.sleeps == [1.0, 2.0, 4.0, 5.0, 5.0]
    assert len(llm.calls) == 6


def test_non_retryable_error_propagates_immediately():
    clock = FakeClock()
    llm = ScriptedLLM([ValueError("bad request"), "never"])
    client = m.ResilientClient(llm, clock)
    with pytest.raises(ValueError, match="bad request"):
        client.complete(msg("x"))
    assert clock.sleeps == [] and len(llm.calls) == 1
    # errors are not cached: the next call goes to the model
    assert client.complete(msg("x")) == "never"


def test_every_attempt_takes_a_token():
    clock = FakeClock()
    llm = ScriptedLLM([m.ServerError("503"), "ok", "second"])
    client = m.ResilientClient(llm, clock, capacity=1, refill_rate=1.0, base_delay=0.5)
    assert client.complete(msg("a")) == "ok"
    # attempt 0 uses the only token; backoff 0.5 refills half; wait 0.5 more
    assert clock.sleeps == [0.5, 0.5]
    assert client.complete(msg("b")) == "second"
    assert clock.sleeps == [0.5, 0.5, 1.0]


def test_cache_hits_skip_model_and_rate_limit():
    clock = FakeClock()
    llm = FakeLLM(rule=lambda messages: "echo:" + messages[-1]["content"])
    client = m.ResilientClient(llm, clock, capacity=1, refill_rate=0.5)
    assert client.complete(msg("q")) == "echo:q"
    assert client.complete(msg("q")) == "echo:q"
    assert client.complete([{"content": "q", "role": "user"}]) == "echo:q"
    assert len(llm.calls) == 1 and clock.sleeps == []
    assert client.complete(msg("Q")) == "echo:Q"
    assert clock.sleeps == [2.0] and len(llm.calls) == 2


def test_lru_eviction_order_and_disabled_cache():
    clock = FakeClock()
    llm = FakeLLM(rule=lambda messages: messages[-1]["content"].upper())
    client = m.ResilientClient(llm, clock, capacity=100, cache_size=2)
    for text in ["a", "b", "a", "c", "b", "c", "a"]:
        assert client.complete(msg(text)) == text.upper()
    assert [call[-1]["content"] for call in llm.calls] == ["a", "b", "c", "b", "a"]

    llm = FakeLLM(rule=lambda messages: "x")
    client = m.ResilientClient(llm, clock, capacity=100, cache_size=0)
    client.complete(msg("same"))
    client.complete(msg("same"))
    assert len(llm.calls) == 2
