import pytest

from _harness import load

m = load("019")

WEATHER = {
    "type": "object",
    "properties": {
        "city": {"type": "string"},
        "days": {"type": "integer"},
        "metric": {"type": "boolean"},
        "tags": {"type": "array"},
        "scale": {"type": "number"},
    },
    "required": ["city", "days"],
}


def weather(city, days, metric=True, tags=None, scale=1.0):
    return f"{city}:{days}:{metric}:{tags}:{scale}"


def make():
    reg = m.ToolRegistry()
    reg.register("weather", weather, WEATHER)
    reg.register("add", lambda a, b: a + b, {
        "type": "object",
        "properties": {"a": {"type": "number"}, "b": {"type": "number"}},
        "required": ["a", "b"],
    })
    return reg


def test_successful_calls():
    reg = make()
    assert reg.dispatch({"name": "add", "arguments": '{"a": 2, "b": 3.5}'}) == {"ok": True, "result": 5.5}
    out = reg.dispatch({"name": "weather",
                        "arguments": '{"city": "Oslo", "days": 3, "metric": false, "tags": ["x"]}'})
    assert out == {"ok": True, "result": "Oslo:3:False:['x']:1.0"}


def test_unknown_tool_and_bad_json():
    reg = make()
    assert reg.dispatch({"name": "mul", "arguments": "{}"}) == {"ok": False, "error": "unknown tool: mul"}
    assert reg.dispatch({"arguments": "{}"}) == {"ok": False, "error": "unknown tool: None"}
    assert reg.dispatch({"name": "add", "arguments": '{"a": 2'}) == {"ok": False, "error": "invalid JSON arguments"}
    assert reg.dispatch({"name": "add", "arguments": "[1, 2]"}) == {
        "ok": False, "error": "arguments must be a JSON object"}


def test_missing_and_unexpected_arguments():
    reg = make()
    assert reg.dispatch({"name": "add", "arguments": '{"a": 2}'}) == {
        "ok": False, "error": "missing required argument: b"}
    assert reg.dispatch({"name": "weather", "arguments": "{}"}) == {
        "ok": False, "error": "missing required argument: city"}
    assert reg.dispatch({"name": "add", "arguments": '{"a": 1, "b": 2, "zz": 0, "c": 3}'}) == {
        "ok": False, "error": "unexpected argument: c"}


def test_type_checks_including_bool_trap():
    reg = make()
    assert reg.dispatch({"name": "add", "arguments": '{"a": 2, "b": "3"}'}) == {
        "ok": False, "error": "argument b must be number"}
    assert reg.dispatch({"name": "add", "arguments": '{"a": true, "b": 1}'}) == {
        "ok": False, "error": "argument a must be number"}
    assert reg.dispatch({"name": "weather", "arguments": '{"city": "Oslo", "days": 2.5}'}) == {
        "ok": False, "error": "argument days must be integer"}
    assert reg.dispatch({"name": "weather", "arguments": '{"city": "Oslo", "days": false}'}) == {
        "ok": False, "error": "argument days must be integer"}
    assert reg.dispatch({"name": "weather", "arguments": '{"city": 1, "days": 1, "tags": "x"}'}) == {
        "ok": False, "error": "argument city must be string"}
    assert reg.dispatch({"name": "weather", "arguments": '{"city": "a", "days": 1, "metric": 1}'}) == {
        "ok": False, "error": "argument metric must be boolean"}


def test_check_order_first_problem_wins():
    reg = make()
    # unexpected beats missing beats wrong type
    assert reg.dispatch({"name": "weather", "arguments": '{"days": "x", "extra": 1}'}) == {
        "ok": False, "error": "unexpected argument: extra"}
    assert reg.dispatch({"name": "weather", "arguments": '{"days": "x"}'}) == {
        "ok": False, "error": "missing required argument: city"}


def test_tool_exception_becomes_error():
    reg = m.ToolRegistry()
    reg.register("divide", lambda a, b: a / b, {
        "properties": {"a": {"type": "number"}, "b": {"type": "number"}}, "required": ["a", "b"]})
    assert reg.dispatch({"name": "divide", "arguments": '{"a": 1, "b": 0}'}) == {
        "ok": False, "error": "tool divide failed: ZeroDivisionError: division by zero"}


def test_empty_arguments_and_none_result():
    reg = m.ToolRegistry()
    reg.register("ping", lambda: None, {"properties": {}})
    assert reg.dispatch({"name": "ping", "arguments": ""}) == {"ok": True, "result": None}
    assert reg.dispatch({"name": "ping", "arguments": "   "}) == {"ok": True, "result": None}
    assert reg.dispatch({"name": "ping"}) == {"ok": True, "result": None}


def test_duplicate_registration_raises():
    reg = make()
    with pytest.raises(ValueError, match="tool already registered: add"):
        reg.register("add", lambda: 0, {"properties": {}})
