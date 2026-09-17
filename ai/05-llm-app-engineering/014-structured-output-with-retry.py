"""
014 — Structured Output with Retry
Difficulty: Medium   ·   Track: LLM App Engineering   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Get a JSON object out of a chat model reliably: extract it, check it against
  a schema, and if it is wrong, show the model its mistake and ask again.

  1. `extract_json(text) -> dict`
       - If `text` contains a code fence, use the FIRST one. A fence is three
         backticks, optionally followed immediately by the word `json`, then
         the content, then the next three backticks. Strip whitespace from
         the content and parse it with json.loads.
       - Otherwise take the substring from the first "{" to the last "}"
         (inclusive) and parse it with json.loads. If there is no "{", or no
         "}" after it, raise ValueError("no JSON object found").
       - If json.loads fails, raise ValueError("invalid JSON").
       - If the parsed value is not a dict, raise
         ValueError("expected a JSON object").

  2. `validate(data, schema) -> None`
       - schema maps field name -> Python type, e.g. {"name": str, "age": int}.
         Allowed types: str, int, float, bool, list, dict.
       - Check fields in the schema's order; raise on the FIRST problem:
           missing field  -> ValueError(f"missing field: {name}")
           wrong type     -> ValueError(f"field {name} must be {typ.__name__}, got {type(value).__name__}")
       - Type rules: a bool is NOT accepted as int or float; an int IS
         accepted as float. Otherwise the value must be an instance of the type.
       - Extra fields not in the schema are allowed.

  3. `structured_call(llm, messages, schema, max_retries=2) -> dict`
       - `llm(messages) -> str` is a chat model; `messages` is a list of
         {"role", "content"} dicts. Do not modify the caller's list; work on
         a copy.
       - Call llm with the conversation. Run extract_json then validate on the
         reply. If both succeed, return the parsed dict (including extra fields).
       - If either raises ValueError `e`, and fewer than `max_retries` retries
         have been used, append these two messages to the conversation and
         call llm again:
           {"role": "assistant", "content": <the bad reply, unchanged>}
           {"role": "user", "content": f"Your reply was invalid: {e}. Reply with only a JSON object."}
       - So llm is called at most max_retries + 1 times. When the last attempt
         also fails, raise
           StructuredOutputError(f"failed after {max_retries + 1} attempts: {e}")
         where e is the LAST error.

WHY IT MATTERS
  Models wrap JSON in prose and markdown, forget fields, and put numbers in
  quotes. Production code that trusts `json.loads(reply)` breaks daily. The
  "feed the error back" loop fixes most of these on the second try, and a
  bounded retry count keeps cost and latency under control.

CONSTRAINTS
  0 <= max_retries <= 10. Replies are at most 10^5 characters.

EXAMPLES
  extract_json('Sure! ```json\\n{"a": 1}\\n``` Hope that helps.')  -> {"a": 1}
  extract_json('The answer is {"a": [1, 2]} okay')              -> {"a": [1, 2]}
  extract_json('no braces here')        -> ValueError("no JSON object found")

  validate({"name": "Ada"}, {"name": str, "age": int})
    -> ValueError("missing field: age")
  validate({"age": "36"}, {"age": int})
    -> ValueError("field age must be int, got str")

  llm replies: 'oops', then '{"age": 36}'
  structured_call(llm, [{"role": "user", "content": "Age?"}], {"age": int})
    -> {"age": 36}, and llm's second call received:
       [{"role": "user", "content": "Age?"},
        {"role": "assistant", "content": "oops"},
        {"role": "user", "content": "Your reply was invalid: no JSON object found. Reply with only a JSON object."}]

EDGE CASES
  - max_retries = 0: exactly one call; failure raises StructuredOutputError.
  - A fenced block containing a list (```json [1, 2]```) -> "expected a JSON object".
  - {"ok": true} fails {"ok": int} with "field ok must be int, got bool".

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. `re.search(r"```(?:json)?(.*?)```", text, re.DOTALL)` finds the first fence.
  2. `str(e)` of ValueError("x") is "x", so an f-string with {e} gives the text.
  3. Check `isinstance(value, bool)` before the int/float check, because
     bool is a subclass of int in Python.
  4. A `for attempt in range(max_retries + 1)` loop keeps the count honest.

COMPLEXITY
  Target: O(attempts · reply length) time.
----------------------------------------------------------------------
"""


class StructuredOutputError(Exception):
    """Raised when the model never produced a valid object. (Given; do not change.)"""


def extract_json(text: str) -> dict:
    # TODO: your solution here
    raise NotImplementedError


def validate(data: dict, schema: dict[str, type]) -> None:
    # TODO: your solution here
    raise NotImplementedError


def structured_call(llm, messages: list[dict], schema: dict[str, type], max_retries: int = 2) -> dict:
    # TODO: your solution here
    raise NotImplementedError
