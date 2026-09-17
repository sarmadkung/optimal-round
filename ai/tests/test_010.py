import math

import pytest

from _harness import load

m = load("010")

EOS = "<eos>"


def table_model(table, calls=None):
    logs = {k: {t: math.log(p) for t, p in v.items()} for k, v in table.items()}

    def next_log_probs(prefix):
        assert isinstance(prefix, tuple)
        if calls is not None:
            calls.append(prefix)
        return dict(logs[prefix])

    return next_log_probs


EXAMPLE = {
    (): {"a": 0.6, "b": 0.4},
    ("a",): {EOS: 0.4, "x": 0.3, "y": 0.3},
    ("b",): {"z": 0.9, EOS: 0.1},
    ("b", "z"): {EOS: 1.0},
}


def test_width_one_is_greedy():
    out = m.beam_search(table_model(EXAMPLE), beam_width=1, max_len=5, eos=EOS)
    assert len(out) == 1
    tokens, score = out[0]
    assert tokens == ("a", EOS)
    assert score == pytest.approx(math.log(0.24))
    assert isinstance(score, float)


def test_width_two_finds_better_sequence():
    calls = []
    out = m.beam_search(table_model(EXAMPLE, calls), beam_width=2, max_len=5, eos=EOS)
    assert [t for t, _ in out] == [("b", "z", EOS), ("a", EOS)]
    assert out[0][1] == pytest.approx(math.log(0.36))
    assert out[1][1] == pytest.approx(math.log(0.24))
    # finished hypotheses are never expanded
    assert all(not p or p[-1] != EOS for p in calls)
    assert sorted(calls) == sorted([(), ("a",), ("b",), ("b", "z")])


LENGTH = {
    (): {EOS: 0.5, "a": 0.5},
    ("a",): {"b": 0.6, EOS: 0.4},
    ("a", "b"): {EOS: 1.0},
}


def test_raw_scores_prefer_short_output():
    out = m.beam_search(table_model(LENGTH), beam_width=2, max_len=5, eos=EOS)
    assert [t for t, _ in out] == [(EOS,), ("a", "b", EOS), ("a", EOS)]
    assert [s for _, s in out] == pytest.approx([math.log(0.5), math.log(0.3), math.log(0.2)])


def test_length_penalty_changes_the_winner():
    out = m.beam_search(table_model(LENGTH), beam_width=2, max_len=5, eos=EOS, length_penalty=1.0)
    assert [t for t, _ in out] == [("a", "b", EOS), (EOS,), ("a", EOS)]
    assert out[0][1] == pytest.approx(math.log(0.3) / 3)
    assert out[2][1] == pytest.approx(math.log(0.2) / 2)


def test_max_len_truncates_and_ties_break_on_tokens():
    calls = []

    def uniform(prefix):
        calls.append(prefix)
        return {"b": math.log(0.5), "a": math.log(0.5)}

    out = m.beam_search(uniform, beam_width=2, max_len=3, eos=EOS)
    assert [t for t, _ in out] == [("a", "a", "a"), ("a", "a", "b")]
    assert out[0][1] == pytest.approx(3 * math.log(0.5))
    assert max(len(p) for p in calls) == 2


def test_everything_finishes_in_one_step():
    model = table_model({(): {EOS: 0.7, "q": 0.3}})
    out = m.beam_search(model, beam_width=1, max_len=10, eos=EOS)
    assert out == [((EOS,), pytest.approx(math.log(0.7)))]
