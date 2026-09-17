import copy

import pytest

from _harness import load

m = load("013")


def test_basic_render_with_spaces():
    template = [
        {"role": "system", "content": "You are {{persona}}."},
        {"role": "user", "content": "Hi, I am {{ name }}."},
    ]
    out = m.render(template, {"persona": "a pirate", "name": "Ada", "unused": 1})
    assert out == [
        {"role": "system", "content": "You are a pirate."},
        {"role": "user", "content": "Hi, I am Ada."},
    ]


def test_escape_produces_literal_braces():
    template = [{"role": "user", "content": "Use \\{{name}} syntax, {{name}}"}]
    assert m.render(template, {"name": "Bo"}) == [
        {"role": "user", "content": "Use {{name}} syntax, Bo"}
    ]


def test_missing_variable_raises_keyerror_with_name():
    with pytest.raises(KeyError) as excinfo:
        m.render([{"role": "user", "content": "hello {{ missing }}"}], {})
    assert excinfo.value.args[0] == "missing"


def test_unknown_role_raises_valueerror_before_keyerror():
    template = [
        {"role": "user", "content": "{{missing}}"},
        {"role": "robot", "content": "hi"},
    ]
    with pytest.raises(ValueError):
        m.render(template, {})


def test_values_are_stringified_repeated_and_not_rescanned():
    template = [{"role": "assistant", "content": "{{a}}+{{a}}={{b}}; {{c}}; {{d}}"}]
    out = m.render(template, {"a": 1, "b": 2.5, "c": None, "d": "{{a}}"})
    assert out == [{"role": "assistant", "content": "1+1=2.5; None; {{a}}"}]


def test_invalid_placeholders_and_other_backslashes_unchanged():
    template = [{"role": "tool", "content": "{{ }} {{1st}} {x} C:\\path {{x}}"}]
    out = m.render(template, {"x": "ok"})
    assert out == [{"role": "tool", "content": "{{ }} {{1st}} {x} C:\\path ok"}]


def test_empty_and_does_not_mutate_or_keep_extra_keys():
    assert m.render([], {"x": 1}) == []
    template = [{"role": "user", "content": "{{x}}", "name": "extra"}]
    before = copy.deepcopy(template)
    out = m.render(template, {"x": "y"})
    assert template == before
    assert out == [{"role": "user", "content": "y"}]
    assert out[0] is not template[0]
