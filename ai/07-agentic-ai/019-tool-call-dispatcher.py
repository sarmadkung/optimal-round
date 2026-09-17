"""
019 — Tool Call Dispatcher
Difficulty: Easy   ·   Track: Agentic AI   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  A model that "calls a tool" only produces text: a tool name and a JSON string
  of arguments. Your code must check that call and run the real function.
  Build the registry that does that.

  Implement class `ToolRegistry`:

  `ToolRegistry()` creates an empty registry.

  `register(name, fn, parameters)` adds a tool.
    - name: str, fn: a Python callable, parameters: a dict shaped like
        {"type": "object",
         "properties": {"city": {"type": "string"}, "days": {"type": "integer"}},
         "required": ["city"]}
      "properties" is always present. "required" may be missing (means []).
      "type": "object" may be missing; ignore it.
    - Allowed property types and the Python values they accept:
        "string"  -> str
        "integer" -> int, but NOT bool
        "number"  -> int or float, but NOT bool
        "boolean" -> bool
        "array"   -> list
    - Registering a name that is already registered raises
      ValueError("tool already registered: <name>"). (This is a programmer
      error, so raising is right.)
    - Returns None.

  `dispatch(call)` runs one tool call and returns a result dict. It must NEVER
  raise because of what the model sent. The call is a dict
      {"name": "get_weather", "arguments": "{\\"city\\": \\"Oslo\\"}"}
  where "arguments" is a JSON string.

    Checks, in this exact order. Stop at the FIRST problem and return
    {"ok": False, "error": <message>}:
      1. call.get("name") is not a registered tool
           -> "unknown tool: <name>"            (name as str(), e.g. "unknown tool: None")
      2. "arguments" is missing, None, or a string of only whitespace: treat
         it as "{}" (models often send "" for tools with no parameters).
         Otherwise json.loads fails
           -> "invalid JSON arguments"
      3. the decoded JSON is not an object (dict)
           -> "arguments must be a JSON object"
      4. an argument name that is not in "properties". If several, report the
         alphabetically smallest
           -> "unexpected argument: <arg>"
      5. a required argument is absent. If several, report the first one in
         the order of the "required" list
           -> "missing required argument: <arg>"
      6. an argument whose value has the wrong type. If several, report the
         alphabetically smallest argument name
           -> "argument <arg> must be <type>"   (e.g. "argument days must be integer")
      7. the tool itself raises an Exception while running
           -> "tool <name> failed: <ExceptionClassName>: <str(exception)>"
              (e.g. "tool divide failed: ZeroDivisionError: division by zero")

    If everything passes, call fn(**arguments) and return
      {"ok": True, "result": <whatever fn returned>}

    The result dict has exactly two keys: "ok" and either "result" or "error".

WHY IT MATTERS
  Models get tool calls wrong all the time: made-up tool names, broken JSON,
  a string where a number belongs. A good agent turns every one of those into a
  clear error message it can show the model, so the model can fix its own call.
  One crash here ends the whole agent run.

CONSTRAINTS
  At most 100 tools, at most 50 properties per tool.
  Optional properties that are not sent are simply not passed to fn.

EXAMPLES
  reg = ToolRegistry()
  reg.register("add", lambda a, b: a + b,
               {"type": "object",
                "properties": {"a": {"type": "number"}, "b": {"type": "number"}},
                "required": ["a", "b"]})

  reg.dispatch({"name": "add", "arguments": '{"a": 2, "b": 3.5}'})
    -> {"ok": True, "result": 5.5}
  reg.dispatch({"name": "mul", "arguments": "{}"})
    -> {"ok": False, "error": "unknown tool: mul"}
  reg.dispatch({"name": "add", "arguments": '{"a": 2'})
    -> {"ok": False, "error": "invalid JSON arguments"}
  reg.dispatch({"name": "add", "arguments": '{"a": 2}'})
    -> {"ok": False, "error": "missing required argument: b"}
  reg.dispatch({"name": "add", "arguments": '{"a": 2, "b": "3"}'})
    -> {"ok": False, "error": "argument b must be number"}
  reg.dispatch({"name": "add", "arguments": '{"a": 1, "b": 2, "c": 3}'})
    -> {"ok": False, "error": "unexpected argument: c"}

EDGE CASES
  - true is a bool in Python, and bool is a subclass of int. It must NOT pass
    as "integer" or "number".
  - "arguments": "" on a tool with no required parameters succeeds.
  - "arguments": "[1, 2]" is valid JSON but not an object.
  - A tool that returns None gives {"ok": True, "result": None}.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Keep a dict name -> (fn, parameters).
  2. A small dict from type name to a check function keeps step 6 tidy; handle
     bool first.
  3. Wrap json.loads in try/except json.JSONDecodeError, and the tool call in
     try/except Exception.

COMPLEXITY
  Target: O(len(arguments) + number of properties) per dispatch.
----------------------------------------------------------------------
"""

from typing import Any, Callable


class ToolRegistry:
    def __init__(self) -> None:
        # TODO: your solution here
        raise NotImplementedError

    def register(self, name: str, fn: Callable[..., Any], parameters: dict) -> None:
        # TODO: your solution here
        raise NotImplementedError

    def dispatch(self, call: dict) -> dict:
        # TODO: your solution here
        raise NotImplementedError
