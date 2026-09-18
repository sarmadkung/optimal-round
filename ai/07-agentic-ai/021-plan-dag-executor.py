"""
021 — Plan DAG Executor
Difficulty: Hard   ·   Track: Agentic AI   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  A planner model writes a plan as a list of tool steps, where some steps use
  the outputs of others. Check the plan, then run it in dependency order, with
  retries, and skip whatever depends on a step that failed.

  Implement `execute_plan(steps, tools, max_retries=0)` returning a dict.
    - steps: list of dicts
        {"id": str, "tool": str, "args": dict, "depends_on": list[str]}
      "args" may be missing (means {}). "depends_on" may be missing (means []).
    - tools: dict mapping tool name -> callable, called as fn(**resolved_args)
    - max_retries: int >= 0. A step is tried at most 1 + max_retries times.

  References
    - A top-level value in "args" that is a str starting with "$" is a
      reference: "$fetch" means "the output of step fetch". It is replaced by
      that whole output value (any type). Nested values are NOT scanned.
    - The dependencies of a step are: its "depends_on" ids, then the ids it
      references in "args" (in args key order). Duplicates are fine.
    - Do not modify the input steps or their args dicts.

  Validation. Before running ANY tool, check the plan in this order and raise
  PlanError (defined below) with the exact message for the first problem found:
      1. a step id that appeared earlier in the list
           -> "duplicate step id: <id>"
      2. walking steps in list order, a step whose tool is not in tools
           -> "unknown tool <tool> in step <id>"
      3. walking steps in list order, and each step's dependencies in the order
         defined above, a dependency that is not a step id
           -> "step <id> depends on unknown step <dep>"
      4. the dependency graph has a cycle (a step depending on itself counts)
           -> "cycle detected: " + ", ".join(sorted(ids))
         where ids is every step that can never be scheduled: the steps on a
         cycle AND every step that depends on them, directly or not.

  Waves
    - Wave 0 holds the steps with no dependencies. A step belongs to wave
      1 + (the largest wave among its dependencies).
    - waves is a list of lists of ids, each inner list sorted. Every step
      appears in exactly one wave (skipped steps too).

  Running
    - Go through waves in order, and through ids in sorted order inside a wave.
    - If any dependency has status "failed" or "skipped", the step gets status
      "skipped" and its tool is never called.
    - Otherwise resolve the args and call the tool. If it raises an Exception,
      call it again, up to 1 + max_retries calls in total.
        success -> status "ok", its return value is the output
        every attempt raised -> status "failed", error message
                  "<ExceptionClassName>: <str(exception)>" of the LAST attempt

  Return value:
      {"waves":    [[id, ...], ...],
       "status":   {id: "ok" | "failed" | "skipped"}  for every step,
       "outputs":  {id: output}                        only for "ok" steps,
       "errors":   {id: message}                       only for "failed" steps,
       "attempts": {id: number of tool calls made}     for every step (0 if skipped)}

WHY IT MATTERS
  "Plan then execute" agents are faster and cheaper than asking the model after
  every single step, and independent steps in the same wave can run in parallel.
  But a plan written by a model is untrusted: it can point at steps that do not
  exist or loop back on itself. And one flaky API call must not quietly feed
  garbage into the steps after it.

CONSTRAINTS
  0 <= len(steps) <= 10^4, total dependencies <= 10^5.
  Target is linear in steps + dependencies (no repeated full scans per step).

EXAMPLES
  steps = [
    {"id": "b", "tool": "double", "args": {"x": "$a"}},
    {"id": "a", "tool": "const",  "args": {"v": 5}},
    {"id": "c", "tool": "add",    "args": {"x": "$a", "y": "$b"}},
    {"id": "d", "tool": "const",  "args": {"v": 1}},
  ]
  tools = {"const": lambda v: v, "double": lambda x: 2 * x, "add": lambda x, y: x + y}
  execute_plan(steps, tools)
    -> {"waves": [["a", "d"], ["b"], ["c"]],
        "status": {"a": "ok", "b": "ok", "c": "ok", "d": "ok"},
        "outputs": {"a": 5, "b": 10, "c": 15, "d": 1},
        "errors": {},
        "attempts": {"a": 1, "b": 1, "c": 1, "d": 1}}

  steps a -> b -> c, and also e with no deps; a's tool always raises
  ValueError("down"), max_retries=2:
    status   {"a": "failed", "b": "skipped", "c": "skipped", "e": "ok"}
    errors   {"a": "ValueError: down"}
    attempts {"a": 3, "b": 0, "c": 0, "e": 1}

  [{"id": "x", "tool": "t", "depends_on": ["y"]},
   {"id": "y", "tool": "t", "depends_on": ["x"]},
   {"id": "z", "tool": "t", "depends_on": ["y"]},
   {"id": "w", "tool": "t"}]
    -> PlanError("cycle detected: x, y, z")

  The smallest plans: one step with no args and no dependencies, and no steps.
  execute_plan([{"id": "s", "tool": "now"}], {"now": lambda: "ok"})
    -> {"waves": [["s"]], "status": {"s": "ok"}, "outputs": {"s": "ok"},
        "errors": {}, "attempts": {"s": 1}}
  execute_plan([], {})
    -> {"waves": [], "status": {}, "outputs": {}, "errors": {}, "attempts": {}}

  A flaky tool that raises TimeoutError("slow") on its first two calls and
  returns "done" on the third:
  execute_plan([{"id": "s", "tool": "flaky"}], {"flaky": flaky}, max_retries=2)
    -> status {"s": "ok"}, outputs {"s": "done"}, errors {}, attempts {"s": 3}
  With the default max_retries=0 the same tool gives status {"s": "failed"},
  errors {"s": "TimeoutError: slow"} and attempts {"s": 1}.

  Bad plans are rejected before any tool runs (tools = {"t": t}):
  execute_plan([{"id": "a", "tool": "t"}, {"id": "b", "tool": "zzz"}], tools)
    -> PlanError("unknown tool zzz in step b")
  execute_plan([{"id": "a", "tool": "t"},
                {"id": "b", "tool": "t", "args": {"x": "$ghost"}}], tools)
    -> PlanError("step b depends on unknown step ghost")
  execute_plan([{"id": "a", "tool": "t"}, {"id": "a", "tool": "t"}], tools)
    -> PlanError("duplicate step id: a")

EDGE CASES
  - An empty plan returns waves [] and four empty dicts.
  - A step that depends on the same id twice is fine.
  - Validation errors are raised before any tool runs.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Kahn's algorithm: count each step's unmet dependencies (its in-degree),
     start from the zero ones, and remove them level by level. Each level is a
     wave. Whatever never reaches zero is the cycle set.
  2. Deduplicate each step's dependency list before counting in-degrees, or a
     repeated dependency will never reach zero.
  3. Skipping falls out naturally: check the dependencies' statuses when you
     reach a step, since they all ran (or were skipped) in earlier waves.

COMPLEXITY
  Target: O(V + E) validation and scheduling, plus the tool calls.
----------------------------------------------------------------------
"""

from typing import Any, Callable


class PlanError(Exception):
    """Raised when a plan is invalid (see the messages above)."""


def execute_plan(
    steps: list[dict],
    tools: dict[str, Callable[..., Any]],
    max_retries: int = 0,
) -> dict:
    # TODO: your solution here
    raise NotImplementedError
