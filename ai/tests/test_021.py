import copy

import pytest

from _harness import load

m = load("021")

BASIC = {"const": lambda v: v, "double": lambda x: 2 * x, "add": lambda x, y: x + y}


def test_example_plan_with_references():
    steps = [
        {"id": "b", "tool": "double", "args": {"x": "$a"}},
        {"id": "a", "tool": "const", "args": {"v": 5}},
        {"id": "c", "tool": "add", "args": {"x": "$a", "y": "$b"}},
        {"id": "d", "tool": "const", "args": {"v": 1}},
    ]
    before = copy.deepcopy(steps)
    out = m.execute_plan(steps, BASIC)
    assert out == {
        "waves": [["a", "d"], ["b"], ["c"]],
        "status": {"a": "ok", "b": "ok", "c": "ok", "d": "ok"},
        "outputs": {"a": 5, "b": 10, "c": 15, "d": 1},
        "errors": {},
        "attempts": {"a": 1, "b": 1, "c": 1, "d": 1},
    }
    assert steps == before


def test_waves_use_longest_path_and_sorted_order():
    calls = []

    def rec(name):
        calls.append(name)
        return name

    tools = {"rec": rec, "join": lambda **kw: "+".join(sorted(kw.values()))}
    steps = [
        {"id": "z", "tool": "rec", "args": {"name": "z"}},
        {"id": "m", "tool": "rec", "args": {"name": "m"}, "depends_on": ["z"]},
        {"id": "k", "tool": "join", "args": {"p": "$z", "q": "$m"}},
        {"id": "a", "tool": "rec", "args": {"name": "a"}},
        {"id": "b", "tool": "rec", "args": {"name": "b"}, "depends_on": ["a", "a"]},
    ]
    out = m.execute_plan(steps, tools)
    assert out["waves"] == [["a", "z"], ["b", "m"], ["k"]]
    assert calls == ["a", "z", "b", "m"]
    assert out["outputs"]["k"] == "m+z"
    # reference to a non-string output is substituted as the whole value
    out = m.execute_plan([{"id": "l", "tool": "const", "args": {"v": [1, 2]}},
                          {"id": "n", "tool": "const", "args": {"v": "$l"}}], BASIC)
    assert out["outputs"]["n"] == [1, 2]


def test_retry_until_success():
    state = {"n": 0}

    def flaky():
        state["n"] += 1
        if state["n"] < 3:
            raise TimeoutError("slow")
        return "done"

    out = m.execute_plan([{"id": "s", "tool": "flaky"}], {"flaky": flaky}, max_retries=2)
    assert out["status"] == {"s": "ok"} and out["outputs"] == {"s": "done"}
    assert out["attempts"] == {"s": 3} and out["errors"] == {}


def test_failure_skips_transitive_dependents_only():
    tries = {"n": 0}

    def broken():
        tries["n"] += 1
        raise ValueError("down" if tries["n"] == 3 else f"try {tries['n']}")

    tools = dict(BASIC, broken=broken)
    steps = [
        {"id": "a", "tool": "broken"},
        {"id": "b", "tool": "double", "args": {"x": "$a"}},
        {"id": "c", "tool": "const", "args": {"v": 1}, "depends_on": ["b"]},
        {"id": "e", "tool": "const", "args": {"v": 7}},
        {"id": "f", "tool": "add", "args": {"x": "$e", "y": 1}},
    ]
    out = m.execute_plan(steps, tools, max_retries=2)
    assert out["status"] == {"a": "failed", "b": "skipped", "c": "skipped", "e": "ok", "f": "ok"}
    assert out["errors"] == {"a": "ValueError: down"}
    assert out["attempts"] == {"a": 3, "b": 0, "c": 0, "e": 1, "f": 1}
    assert out["outputs"] == {"e": 7, "f": 8}
    assert out["waves"] == [["a", "e"], ["b", "f"], ["c"]]


def test_no_retries_by_default():
    count = {"n": 0}

    def bad():
        count["n"] += 1
        raise RuntimeError("nope")

    out = m.execute_plan([{"id": "x", "tool": "bad"}], {"bad": bad})
    assert out["status"] == {"x": "failed"} and out["attempts"] == {"x": 1}
    assert out["errors"] == {"x": "RuntimeError: nope"} and count["n"] == 1


def test_validation_errors():
    ran = []
    tools = {"t": lambda: ran.append(1)}
    with pytest.raises(m.PlanError, match=r"^duplicate step id: a$"):
        m.execute_plan([{"id": "a", "tool": "t"}, {"id": "a", "tool": "zzz"}], tools)
    with pytest.raises(m.PlanError, match=r"^unknown tool zzz in step b$"):
        m.execute_plan([{"id": "a", "tool": "t", "depends_on": ["q"]}, {"id": "b", "tool": "zzz"}], tools)
    with pytest.raises(m.PlanError, match=r"^step b depends on unknown step ghost$"):
        m.execute_plan([{"id": "a", "tool": "t"},
                        {"id": "b", "tool": "t", "depends_on": ["a"], "args": {"x": "$ghost"}}], tools)
    assert ran == []


def test_cycles_report_blocked_steps():
    ran = []
    tools = {"t": lambda: ran.append(1)}
    steps = [
        {"id": "x", "tool": "t", "depends_on": ["y"]},
        {"id": "y", "tool": "t", "depends_on": ["x"]},
        {"id": "z", "tool": "t", "depends_on": ["y"]},
        {"id": "w", "tool": "t"},
    ]
    with pytest.raises(m.PlanError, match=r"^cycle detected: x, y, z$"):
        m.execute_plan(steps, tools)
    with pytest.raises(m.PlanError, match=r"^cycle detected: s$"):
        m.execute_plan([{"id": "s", "tool": "t", "depends_on": ["s"]}], tools)
    assert ran == []


def test_empty_plan():
    assert m.execute_plan([], {}) == {"waves": [], "status": {}, "outputs": {}, "errors": {},
                                      "attempts": {}}
