import copy

import pytest

from _fakes import FakeLLM, count_tokens
from _harness import load

m = load("015")

SYS = {"role": "system", "content": "Be brief"}
Q1 = {"role": "user", "content": "q1 one"}
A1 = {"role": "assistant", "content": "a1 one"}
Q2 = {"role": "user", "content": "q2 two"}
A2 = {"role": "assistant", "content": "a2 two"}
Q3 = {"role": "user", "content": "q3"}
CHAT = [SYS, Q1, A1, Q2, A2, Q3]  # overhead 0: costs 2, 2, 2, 2, 2, 1 = 11


def test_fits_returns_copy_without_calling_llm():
    llm = FakeLLM(replies=[])
    out = m.fit_to_budget(CHAT, 11, count_tokens, overhead=0, llm=llm)
    assert out == CHAT
    assert out is not CHAT
    assert llm.calls == []


def test_drops_oldest_turns_first():
    before = copy.deepcopy(CHAT)
    assert m.fit_to_budget(CHAT, 7, count_tokens, overhead=0) == [SYS, Q2, A2, Q3]
    assert m.fit_to_budget(CHAT, 6, count_tokens, overhead=0) == [SYS, Q3]
    assert CHAT == before


def test_budget_too_small_raises():
    with pytest.raises(ValueError) as excinfo:
        m.fit_to_budget(CHAT, 2, count_tokens, overhead=0)
    assert str(excinfo.value) == "budget too small"


def test_default_overhead_is_four_per_message():
    # costs with overhead 4: 6, 6, 6, 6, 6, 5 = 35
    assert m.fit_to_budget(CHAT, 35, count_tokens) == CHAT
    assert m.fit_to_budget(CHAT, 23, count_tokens) == [SYS, Q2, A2, Q3]
    assert m.fit_to_budget(CHAT, 22, count_tokens) == [SYS, Q3]
    with pytest.raises(ValueError):
        m.fit_to_budget(CHAT, 10, count_tokens)


def test_turn_grouping_keeps_pairs_together():
    s = {"role": "system", "content": "S"}
    lone = {"role": "assistant", "content": "hello"}
    u1 = {"role": "user", "content": "u1"}
    u2 = {"role": "user", "content": "u2"}
    a2 = {"role": "assistant", "content": "a2"}
    q = {"role": "user", "content": "q"}
    chat = [s, lone, u1, u2, a2, q]  # turns: [lone], [u1], [u2, a2]
    assert m.fit_to_budget(chat, 5, count_tokens, overhead=0) == [s, u1, u2, a2, q]
    assert m.fit_to_budget(chat, 4, count_tokens, overhead=0) == [s, u2, a2, q]
    assert m.fit_to_budget(chat, 3, count_tokens, overhead=0) == [s, q]


def test_summary_replaces_dropped_turns():
    llm = FakeLLM(replies=["  Asked about q1 in detail.  ", "  Short  "])
    out = m.fit_to_budget(CHAT, 9, count_tokens, overhead=0, llm=llm)
    summary = {"role": "system", "content": "Summary of earlier conversation: Short"}
    assert out == [SYS, summary, Q3]
    assert len(llm.calls) == 2
    instruction = {"role": "system", "content": "Summarize the following conversation in a few sentences."}
    assert llm.calls[0] == [instruction, {"role": "user", "content": "user: q1 one\nassistant: a1 one"}]
    assert llm.calls[1] == [
        instruction,
        {"role": "user", "content": "user: q1 one\nassistant: a1 one\nuser: q2 two\nassistant: a2 two"},
    ]


def test_summary_that_fits_on_first_try():
    s = {"role": "system", "content": "S"}
    long_q = {"role": "user", "content": "a b c d e f g h"}
    long_a = {"role": "assistant", "content": "i j k l m n o p"}
    x = {"role": "user", "content": "x"}
    y = {"role": "assistant", "content": "y"}
    z = {"role": "user", "content": "z"}
    chat = [s, long_q, long_a, x, y, z]  # total 20
    llm = FakeLLM(replies=["Hi"])
    out = m.fit_to_budget(chat, 10, count_tokens, overhead=0, llm=llm)
    assert out == [s, {"role": "system", "content": "Summary of earlier conversation: Hi"}, x, y, z]
    assert len(llm.calls) == 1
    assert llm.calls[0][1] == {"role": "user", "content": "user: a b c d e f g h\nassistant: i j k l m n o p"}


def test_skips_llm_when_base_over_budget_and_falls_back():
    llm = FakeLLM(replies=["this reply is far too long"])
    out = m.fit_to_budget(CHAT, 6, count_tokens, overhead=0, llm=llm)
    assert out == [SYS, Q3]
    assert len(llm.calls) == 1  # d=1 skipped (base cost 7 > 6), only d=2 summarised
