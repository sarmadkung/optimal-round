import pytest

from _fakes import FakeLLM
from _harness import load

m = load("025")


def test_normalize_answer_rules():
    assert m.normalize_answer("  Paris.  ") == "paris"
    assert m.normalize_answer("42.0") == "42"
    assert m.normalize_answer("3.50") == "3.5"
    assert m.normalize_answer("007") == "7"
    assert m.normalize_answer("-0") == "0"
    assert m.normalize_answer("1e3") == "1e3"
    assert m.normalize_answer("12.. ") == "12"
    assert m.normalize_answer("B") == "b"


def test_extract_uses_last_answer_line():
    text = "Answer: 1\nhmm, wait, that is wrong\n  Answer: 2.  \ndone"
    assert m.extract_answer(text) == "2"
    assert m.extract_answer("The Answer: 5 is not at line start") is None
    assert m.extract_answer("answer: 5") is None  # case-sensitive
    assert m.extract_answer("no answer here") is None
    assert m.extract_answer("Answer:   ") is None
    assert m.extract_answer("Answer: .") is None


def test_example_majority_vote():
    replies = [
        "6 * 7 is 42.\nAnswer: 42",
        "Let me think... Answer: 41\nAnswer: 42.0",
        "Answer: 41",
    ]
    llm = FakeLLM(replies=replies)
    out = m.self_consistency(llm, "What is 6*7?", 3)
    assert out["answer"] == "42"
    assert list(out["votes"].items()) == [("42", 2), ("41", 1)]
    assert out["agreement"] == pytest.approx(2 / 3)
    assert isinstance(out["agreement"], float)


def test_calls_llm_n_times_with_the_question():
    llm = FakeLLM(replies=["Answer: x"] * 4)
    m.self_consistency(llm, "Q?", 4)
    assert len(llm.calls) == 4
    assert all(c == [{"role": "user", "content": "Q?"}] for c in llm.calls)


def test_completions_without_answer_are_ignored():
    replies = ["I am not sure", "Answer: 7", "Answer:", "Answer: 8", "Answer: 7."]
    out = m.self_consistency(FakeLLM(replies=replies), "q", 5)
    assert out["answer"] == "7"
    assert list(out["votes"].items()) == [("7", 2), ("8", 1)]
    assert out["agreement"] == pytest.approx(2 / 3)


def test_tie_goes_to_earliest_first_seen():
    replies = ["Answer: B", "Answer: a", "Answer: A", "Answer: b", "Answer: c"]
    out = m.self_consistency(FakeLLM(replies=replies), "q", 5)
    assert out["answer"] == "b"
    assert list(out["votes"].keys()) == ["b", "a", "c"]
    assert out["agreement"] == pytest.approx(2 / 5)


def test_no_answers_at_all():
    out = m.self_consistency(FakeLLM(replies=["nothing", "still nothing"]), "q", 2)
    assert out == {"answer": None, "votes": {}, "agreement": 0.0}
