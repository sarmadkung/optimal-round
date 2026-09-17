import copy

import pytest

from _fakes import FakeLLM
from _harness import load

m = load("014")


def test_extract_from_fence_and_prose():
    assert m.extract_json('Sure! ```json\n{"a": 1}\n``` Hope that helps.') == {"a": 1}
    assert m.extract_json('```\n{"b": true}\n```') == {"b": True}
    assert m.extract_json('The answer is {"a": [1, 2], "c": {"d": null}} okay') == {
        "a": [1, 2],
        "c": {"d": None},
    }


def test_extract_error_messages():
    with pytest.raises(ValueError) as e1:
        m.extract_json("no braces here }{")
    assert str(e1.value) == "no JSON object found"
    with pytest.raises(ValueError) as e2:
        m.extract_json("here {not: valid} json")
    assert str(e2.value) == "invalid JSON"
    with pytest.raises(ValueError) as e3:
        m.extract_json("```json [1, 2] ```")
    assert str(e3.value) == "expected a JSON object"


def test_validate_rules_and_messages():
    schema = {"name": str, "age": int, "score": float, "ok": bool, "tags": list, "meta": dict}
    good = {"name": "Ada", "age": 36, "score": 3, "ok": False, "tags": [], "meta": {}, "extra": 1}
    assert m.validate(good, schema) is None
    with pytest.raises(ValueError) as e1:
        m.validate({"name": "Ada"}, {"name": str, "age": int})
    assert str(e1.value) == "missing field: age"
    with pytest.raises(ValueError) as e2:
        m.validate({"age": "36", "x": 1}, {"x": str, "age": int})
    assert str(e2.value) == "field x must be str, got int"
    with pytest.raises(ValueError) as e3:
        m.validate({"ok": True}, {"ok": int})
    assert str(e3.value) == "field ok must be int, got bool"
    with pytest.raises(ValueError) as e4:
        m.validate({"s": True}, {"s": float})
    assert str(e4.value) == "field s must be float, got bool"


def test_first_try_success_single_call_no_mutation():
    llm = FakeLLM(replies=['Here you go:\n```json\n{"city": "Oslo", "pop": 709000, "note": "x"}\n```'])
    messages = [{"role": "user", "content": "City?"}]
    before = copy.deepcopy(messages)
    out = m.structured_call(llm, messages, {"city": str, "pop": int})
    assert out == {"city": "Oslo", "pop": 709000, "note": "x"}
    assert len(llm.calls) == 1
    assert llm.calls[0] == before
    assert messages == before


def test_retry_appends_bad_reply_and_exact_error():
    llm = FakeLLM(replies=["oops", '{"age": "36"}', '{"age": 36}'])
    messages = [{"role": "system", "content": "JSON only."}, {"role": "user", "content": "Age?"}]
    out = m.structured_call(llm, messages, {"age": int}, max_retries=2)
    assert out == {"age": 36}
    assert len(llm.calls) == 3
    assert llm.calls[1] == messages + [
        {"role": "assistant", "content": "oops"},
        {"role": "user", "content": "Your reply was invalid: no JSON object found. Reply with only a JSON object."},
    ]
    assert llm.calls[2] == llm.calls[1] + [
        {"role": "assistant", "content": '{"age": "36"}'},
        {"role": "user", "content": "Your reply was invalid: field age must be int, got str. Reply with only a JSON object."},
    ]
    assert len(messages) == 2


def test_exhausted_raises_with_last_error():
    llm = FakeLLM(replies=["nope", "{bad}", '{"x": 1}'])
    with pytest.raises(m.StructuredOutputError) as excinfo:
        m.structured_call(llm, [{"role": "user", "content": "go"}], {"y": int}, max_retries=2)
    assert str(excinfo.value) == "failed after 3 attempts: missing field: y"
    assert len(llm.calls) == 3


def test_zero_retries_means_one_call():
    llm = FakeLLM(replies=["nothing", '{"y": 1}'])
    with pytest.raises(m.StructuredOutputError) as excinfo:
        m.structured_call(llm, [{"role": "user", "content": "go"}], {"y": int}, max_retries=0)
    assert str(excinfo.value) == "failed after 1 attempts: no JSON object found"
    assert len(llm.calls) == 1
