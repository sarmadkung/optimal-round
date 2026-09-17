import pytest

from _fakes import FakeLLM
from _harness import load

m = load("020")

TOOLS = {"add": lambda a, b: a + b, "echo": lambda text: text}


def test_immediate_final_answer():
    llm = FakeLLM(replies=["Final Answer: Paris"])
    out = m.run_react(llm, TOOLS, "Capital of France?")
    assert out == {"answer": "Paris", "finished": True, "trace": [
        {"step": 1, "reply": "Final Answer: Paris", "type": "final", "tool": None,
         "args": None, "observation": None}]}
    assert llm.calls == [[
        {"role": "system", "content": "Tools: add, echo"},
        {"role": "user", "content": "Question: Capital of France?"},
    ]]


def test_action_then_final_with_thought_line():
    action = 'Thought: I need to add.\nAction: add[{"a": 2, "b": 3}]'
    llm = FakeLLM(replies=[action, "Final Answer: 5"])
    out = m.run_react(llm, TOOLS, "What is 2+3?")
    assert out["answer"] == "5" and out["finished"] is True
    assert out["trace"][0] == {"step": 1, "reply": action, "type": "action", "tool": "add",
                               "args": {"a": 2, "b": 3}, "observation": "Observation: 5"}
    assert out["trace"][1]["step"] == 2 and out["trace"][1]["type"] == "final"
    assert len(llm.calls) == 2
    assert llm.calls[1][2:] == [
        {"role": "assistant", "content": action},
        {"role": "user", "content": "Observation: 5"},
    ]


def test_observation_formats():
    tools = {
        "text": lambda: "5",
        "listy": lambda: [1, 2],
        "boom": lambda: 1 / 0,
    }
    llm = FakeLLM(replies=["Action: text[{}]", "Action: listy[{}]", "Action: boom[{}]",
                           'Action: nope[{"x": 1}]', "Final Answer: done"])
    out = m.run_react(llm, tools, "q", max_steps=10)
    assert [t["observation"] for t in out["trace"]] == [
        "Observation: 5",
        "Observation: [1, 2]",
        "Observation: error: ZeroDivisionError: division by zero",
        "Observation: error: unknown tool nope",
        None,
    ]
    assert out["trace"][3]["tool"] == "nope" and out["trace"][3]["args"] == {"x": 1}
    assert llm.calls[0][0] == {"role": "system", "content": "Tools: boom, listy, text"}
    assert llm.calls[-1][-1] == {"role": "user", "content": "Observation: error: unknown tool nope"}


def test_invalid_replies_get_correction():
    llm = FakeLLM(replies=["I think the answer is 4", 'Action: add[{"a": 1]', "Action: add[3]",
                           "Final Answer: 4"])
    out = m.run_react(llm, TOOLS, "q")
    assert out["answer"] == "4"
    assert [t["type"] for t in out["trace"]] == ["invalid", "invalid", "invalid", "final"]
    for t in out["trace"][:3]:
        assert t["tool"] is None and t["args"] is None and t["observation"] == m.CORRECTION
    assert llm.calls[1][-1] == {"role": "user", "content": m.CORRECTION}
    assert len(llm.calls[3]) == 2 + 3 * 2


def test_max_steps_exhausted():
    llm = FakeLLM(rule=lambda msgs: 'Action: echo[{"text": "again"}]')
    out = m.run_react(llm, TOOLS, "loop forever", max_steps=3)
    assert out["answer"] is None and out["finished"] is False
    assert len(out["trace"]) == 3 and len(llm.calls) == 3
    assert [t["step"] for t in out["trace"]] == [1, 2, 3]
    assert all(t["observation"] == "Observation: again" for t in out["trace"])


def test_multiline_and_empty_final_answer():
    llm = FakeLLM(replies=["Thought: done\n  Final Answer: line one\nline two\n"])
    assert m.run_react(llm, {}, "q")["answer"] == "line one\nline two"
    llm = FakeLLM(replies=["Final Answer:"])
    out = m.run_react(llm, {}, "q")
    assert out["answer"] == "" and out["finished"] is True
    assert llm.calls[0][0] == {"role": "system", "content": "Tools: "}


def test_max_steps_must_be_positive():
    with pytest.raises(ValueError):
        m.run_react(FakeLLM(replies=[]), TOOLS, "q", max_steps=0)
