# Agentic AI

> An agent is a loop around a model that is allowed to act. The model decides; your code checks, runs, and reports back.

**Track:** 07 · **Problems:** 019–021  
**Language:** Python (stdlib only)  
**Fakes used:** `FakeLLM` from `ai/_fakes` (passed in as an argument, never imported)

---

## What this track is

A plain chat model can only talk. An **agent** can also *do* things: search, run code, call an API.
But the model never runs anything itself. It writes text that *describes* an action, and your code
decides whether that action is valid, runs it, and shows the model what happened.

So an agent has three moving parts, one per problem in this track:

- **Tool dispatch:** turn "call `get_weather` with `{"city": "Oslo"}`" into a checked, real function call.
- **The loop:** ask, act, observe, repeat, until the model gives an answer or the step budget runs out.
- **Plans:** let the model write the whole list of steps up front, then run them in dependency order.

## Why it matters for AI engineering

Agent demos are easy. Agents that survive real traffic are not. Models invent tool names, send broken
JSON, loop forever, and write plans that point at steps that do not exist. Interviewers for agent
roles care less about which framework you know and more about whether you can build the checks
yourself: what happens on a bad call, when does the loop stop, what runs after a step fails? This track
is those checks, in plain code.

## Core concepts

### Tools are a contract

A tool is a function plus a **schema**: its name, its parameters, their types, and which ones are
required. The model sees the schema and writes a call as text. Your dispatcher checks the call
against the schema *before* running anything.

**Intuition:** a tool schema is a form with labelled boxes. The model fills it in; you check every box
before you act on it.

### Bad model input is data, not a crash

When a call is wrong, do not raise. Return an error result with a **clear message**, such as
`missing required argument: city`, and let the model see it. Models are good at fixing their own
mistakes when told exactly what the mistake was. A crash throws away the whole run.

**Intuition:** a good API returns a 400 with a helpful message. It does not reboot the server.

### The ReAct loop

ReAct means "reason + act". Each turn, the model writes some thinking and then either an **action**
(`Action: search[{"q": "..."}]`) or a **final answer**. Your loop parses that, runs the tool, and
appends an **observation** (`Observation: ...`) as a new message. The model then sees the whole story so
far and picks the next move.

**Intuition:** a detective's notebook. Each line is a hunch, a thing checked, or what was found, and
the next hunch is written after reading the notebook so far.

### Budgets and stop conditions

Every loop needs a **maximum number of steps**. Without one, a confused model burns money forever. When
the budget runs out, return a clear "not finished" result instead of pretending you have an answer.

**Intuition:** a timer on an exam. When it rings you hand in what you have and mark it unfinished.

### Recovering from format drift

Sometimes the model replies in free text instead of the agreed format. Do not crash, and do not guess.
Append a short **correction message** that restates the format and let it try again. That turn still
counts against the budget.

### Plans as a DAG

Instead of deciding one step at a time, a **planner** can write every step up front, each with the
steps it depends on. That is a directed acyclic graph (DAG). You run it in **waves**: wave 0 is every
step with no dependencies, wave 1 is every step whose dependencies are all in wave 0, and so on. Steps
in the same wave do not depend on each other, so they could run in parallel.

**Intuition:** cooking a dinner. Boil water and chop onions at the same time; the sauce waits for the
onions; plating waits for everything.

### Validate the plan before running it

A plan written by a model is untrusted input. Check it first: duplicate ids, unknown tools, references
to steps that do not exist, and **cycles** (A needs B, B needs A), which can never finish. Kahn's
algorithm finds the waves and the cycles in one pass: whatever never reaches "all dependencies done"
is stuck.

### Retries and failure spread

Tools fail for boring reasons: timeouts, flaky networks. Retry a step a few times. If it still fails,
every step that depends on it, directly or through other steps, must be **skipped**, not run with
missing inputs. Steps on other branches carry on.

**Intuition:** if the bridge is out, the trucks that need that bridge wait. Trucks on other roads keep
driving.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 019 | [Tool Call Dispatcher](./019-tool-call-dispatcher.py) | Easy | Check a model's tool call against a schema and return a result or a clear error, never a crash |
| 020 | [ReAct Agent Loop](./020-react-agent-loop.py) | Medium | Ask, act, observe, repeat: parse actions, feed back observations, correct bad formats, respect a step budget |
| 021 | [Plan DAG Executor](./021-plan-dag-executor.py) | Hard | Validate a plan, run it in topological waves with output references, retries, and skipped dependents |

Run one with `./practice 019` from the `ai/` folder.

## Common mistakes

- **Letting a bad tool call raise.** One typo from the model ends the whole run. Return an error result.
- **Forgetting that `True` is an `int` in Python.** A schema that wants an integer will accept `true`
  unless you check for bool first.
- **Vague error messages.** "invalid call" gives the model nothing to fix. Name the argument and the
  expected type.
- **No step limit.** A loop that only stops on a final answer will, one day, never stop.
- **Stopping on the first line that mentions "Action".** Models write thinking first. Scan for the line
  that actually starts with the keyword.
- **Crashing on a reply in the wrong format** instead of sending a correction and counting the step.
- **Running plan steps in list order.** The model does not promise to list dependencies first; sort by
  the graph.
- **Counting a repeated dependency twice** in Kahn's algorithm, so a step's in-degree never reaches
  zero and a valid plan looks like a cycle.
- **Only skipping direct dependents** of a failed step. A step two levels down still has no valid input.
- **Running any tool before validation finishes.** A cycle found halfway through leaves side effects
  behind.

## Suggested order

1. **019 Tool Call Dispatcher** (Easy): the checks every agent needs. Read the error strings and their
   order in the header carefully; the tests compare them exactly.
2. **020 ReAct Agent Loop** (Medium): write a small parser first, then the loop. Use `FakeLLM.calls` in
   the tests to see exactly what the model was shown each turn.
3. **021 Plan DAG Executor** (Hard): do it in two halves. First validation and waves (Kahn's algorithm),
   then execution with retries and skipping.
