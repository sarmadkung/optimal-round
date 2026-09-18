"""
020 — ReAct Agent Loop
Difficulty: Medium   ·   Track: Agentic AI   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  An agent is a loop: ask the model what to do, do it, show the model what
  happened, repeat. ReAct ("reason + act") is the plain-text version of that
  loop. Write it.

  Implement `run_react(llm, tools, question, max_steps=5)` returning a dict.
    - llm: a callable llm(messages) -> str. messages is a list of
      {"role": ..., "content": ...} dicts.
    - tools: dict mapping tool name -> Python callable, called as fn(**args)
    - question: str
    - max_steps: int >= 1. If max_steps < 1 raise ValueError.

  Conversation start. messages begins as exactly two messages:
      {"role": "system", "content": "Tools: " + ", ".join(sorted(tools))}
      {"role": "user",   "content": "Question: " + question}
    (with no tools the system content is "Tools: ")

  Each step (a step = one llm call; at most max_steps steps):
    1. reply = llm(messages). Append {"role": "assistant", "content": reply}.
    2. Parse the reply. Look at its lines in order (split on "\\n") and strip
       each line. The FIRST stripped line that starts with "Final Answer:" or
       "Action:" decides. Lines before it (e.g. "Thought: ...") are ignored.
         - "Final Answer:" line -> the answer is the text after "Final Answer:"
           on that line, plus every later line of the reply (joined with
           "\\n"), with .strip() applied to the whole answer. Stop the loop.
         - "Action:" line -> the WHOLE stripped line must match
               Action: <tool>[<json>]
           i.e. the regex  Action:\\s*([A-Za-z_][A-Za-z0-9_]*)\\[(.*)\\]  as a
           full match, and <json> must json.loads to a dict. Otherwise the
           reply is invalid (next bullet).
         - no deciding line, or a malformed Action line -> invalid reply.
    3. Append ONE message with role "user", depending on the reply:
         - valid action, tool not in tools:
             "Observation: error: unknown tool <tool>"
         - valid action, tool raises an Exception:
             "Observation: error: <ExceptionClassName>: <str(exception)>"
         - valid action, tool returns value v:
             "Observation: " + (v if v is a str else json.dumps(v))
         - invalid reply:
             CORRECTION  (the constant defined below)
         - final answer: nothing is appended; return.

  Return value:
      {"answer": str or None,   # None if max_steps ran out
       "finished": bool,        # True only if a Final Answer was given
       "trace": [ ... one dict per step, in order ... ]}
  Each trace entry:
      {"step": 1-based step number,
       "reply": the raw reply string,
       "type": "final" | "action" | "invalid",
       "tool": tool name for "action", else None,
       "args": the decoded args dict for "action", else None,
       "observation": the content of the user message appended after this
                      step ("Observation: ..." or CORRECTION), or None for "final"}

  If max_steps steps pass with no final answer, return answer None and
  finished False. Do not call llm again.

WHY IT MATTERS
  Every agent framework is this loop plus decoration. Getting the details right
  (stop conditions, a step budget, feeding errors back instead of crashing,
  nudging a model that went off-format) is what keeps agents from looping
  forever or dying on the first odd reply.

CONSTRAINTS
  1 <= max_steps <= 50. Replies are at most a few thousand characters.

EXAMPLES
  llm replies, in order:
    'Thought: I need to add.\\nAction: add[{"a": 2, "b": 3}]'
    'Final Answer: 5'
  run_react(llm, {"add": lambda a, b: a + b}, "What is 2+3?")
    -> {"answer": "5", "finished": True, "trace": [
          {"step": 1, "reply": 'Thought: ...', "type": "action", "tool": "add",
           "args": {"a": 2, "b": 3}, "observation": "Observation: 5"},
          {"step": 2, "reply": "Final Answer: 5", "type": "final", "tool": None,
           "args": None, "observation": None}]}
  The second llm call saw 4 messages: system, question, the assistant's action,
  and {"role": "user", "content": "Observation: 5"}.

  The smallest run: one step, and the model answers straight away.
  llm replies, in order:
    'Final Answer: Paris'
  run_react(llm, {"add": lambda a, b: a + b}, "Capital of France?")
    -> {"answer": "Paris", "finished": True, "trace": [
          {"step": 1, "reply": "Final Answer: Paris", "type": "final", "tool": None,
           "args": None, "observation": None}]}
  That single llm call saw exactly 2 messages:
    {"role": "system", "content": "Tools: add"}
    {"role": "user", "content": "Question: Capital of France?"}

  Observation formats, a tool that raises, and a tool that does not exist.
  tools = {"div": lambda a, b: a / b, "listy": lambda: [1, 2]}
  llm replies, in order:
    'Action: div[{"a": 1, "b": 0}]'
    'Action: listy[{}]'
    'Action: nope[{}]'
    'Final Answer: done'
  run_react(llm, tools, "q", max_steps=5)
    -> answer "done", finished True, 4 trace entries whose observations are
         "Observation: error: ZeroDivisionError: division by zero"
         "Observation: [1, 2]"
         "Observation: error: unknown tool nope"
         None                      (a final step appends no message)
  The third entry still records tool "nope" and args {}, and the system
  message is {"role": "system", "content": "Tools: div, listy"} (sorted names).

  Off-format replies are corrected, not fatal.
  llm replies, in order:
    'I think it is 4'          (no "Action:" or "Final Answer:" line at all)
    'Action: add[{"a": 1]'     (an Action line whose JSON does not parse)
    'Final Answer: 4'
  run_react(llm, {"add": lambda a, b: a + b}, "q")
    -> answer "4", finished True, trace types ["invalid", "invalid", "final"]
  Each invalid step has tool None, args None, observation CORRECTION, and
  appends {"role": "user", "content": CORRECTION}; it still uses up a step.

  The step budget runs out.
  llm always replies 'Action: echo[{"text": "again"}]'
  run_react(llm, {"echo": lambda text: text}, "loop forever", max_steps=2)
    -> {"answer": None, "finished": False, "trace": [ 2 entries, steps 1 and 2 ]}
  Exactly 2 llm calls are made, both entries have observation
  "Observation: again", and llm is not called a third time.

  A multi-line and an empty final answer, with no tools at all.
  llm replies 'Thought: done\\n  Final Answer: line one\\nline two\\n'
  run_react(llm, {}, "q")["answer"]   ->  "line one\\nline two"
  llm replies 'Final Answer:'
  run_react(llm, {}, "q")             ->  answer "", finished True
  With no tools the system content is "Tools: ".

EDGE CASES
  - The observation for a tool returning 5 is "Observation: 5" (json.dumps(5)),
    for "5" it is also "Observation: 5", for [1, 2] it is "Observation: [1, 2]".
  - 'Action: add[{"a": 1]' is invalid (bad JSON). 'Action: add[3]' is invalid
    (not a dict). An invalid reply still uses up a step.
  - "Final Answer:" with nothing after it gives the answer "".

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Split the work: a parse(reply) helper that returns ("final", text),
     ("action", tool, args) or ("invalid",), and the loop that uses it.
  2. re.fullmatch with the regex above; then try json.loads.
  3. `for step in range(1, max_steps + 1)` gives you the budget for free.

COMPLEXITY
  Target: O(max_steps · total message length) (the history is re-sent each step).
----------------------------------------------------------------------
"""

from typing import Any, Callable

CORRECTION = (
    'Invalid format. Reply with "Action: tool_name[{json args}]" '
    'or "Final Answer: your answer".'
)


def run_react(
    llm: Callable[[list[dict]], str],
    tools: dict[str, Callable[..., Any]],
    question: str,
    max_steps: int = 5,
) -> dict:
    # TODO: your solution here
    raise NotImplementedError
