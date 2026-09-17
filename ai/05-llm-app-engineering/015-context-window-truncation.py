"""
015 — Context Window Truncation
Difficulty: Medium   ·   Track: LLM App Engineering   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  A long chat no longer fits the model's context window. Cut it down to a
  token budget without losing what matters most.

  Implement `fit_to_budget(messages, budget, count_tokens, overhead=4, llm=None)`
  returning a new list of messages.

  Inputs
    - messages: list of {"role", "content"} dicts, len >= 2.
      messages[0] is the system message; messages[-1] is the latest user
      message. Everything in between is the "middle".
    - budget: int, the maximum total cost allowed.
    - count_tokens(text) -> int: the tokenizer to use (do not write your own).
    - overhead: extra tokens charged per message (role markers, separators).
    - llm: optional chat model, llm(messages) -> str, used to summarise.

  Cost
    cost(message) = count_tokens(message["content"]) + overhead
    cost(list)    = sum of cost(message) over the list

  Turns (how the middle is grouped)
    Walk the middle from left to right. If the current message has role "user"
    and the next middle message has role "assistant", those two form one turn.
    Otherwise the current message forms a turn on its own. Turns are dropped
    whole, so a question is never kept without its answer.

  Algorithm
    1. If cost(messages) <= budget, return a copy of the list unchanged.
       (Do not call llm.)
    2. If cost([system, latest_user]) > budget, raise
       ValueError("budget too small").
    3. Otherwise, for d = 1, 2, ..., number_of_turns: drop the d OLDEST turns.
         base = [system] + messages of the remaining turns + [latest_user]
       - If llm is None: if cost(base) <= budget, return base.
       - If llm is given:
           * If cost(base) > budget, move on to the next d WITHOUT calling llm
             (adding a summary can only make it longer).
           * Otherwise call llm exactly once with
               [{"role": "system", "content": "Summarize the following conversation in a few sentences."},
                {"role": "user", "content": transcript}]
             where transcript = "\\n".join(f"{role}: {content}") over the
             dropped messages, oldest first.
             Build the summary message
               {"role": "system", "content": "Summary of earlier conversation: " + reply.strip()}
             and candidate = [system, summary] + remaining turn messages + [latest_user].
             If cost(candidate) <= budget, return candidate.
             Otherwise continue with the next d.
    4. If no d worked with llm given, return [system, latest_user] (no summary).
       (Without llm, d = number_of_turns always fits, by step 2.)

  Never modify the input list. Returned message dicts must have the same
  content as the originals (reusing the same dict objects is fine).

WHY IT MATTERS
  Every chat product hits the context limit. The system prompt holds the rules
  and the latest user message holds the question, so those always stay. Old
  turns go first, whole, and a rolling summary keeps the gist for a few tokens.

CONSTRAINTS
  2 <= len(messages) <= 10^4. count_tokens is O(len(text)); call it at most a
  few times per message (cache costs).

EXAMPLES
  count_tokens = words and punctuation marks (see ai/_fakes), overhead = 0.
  messages = [sys "Be brief",                       cost 2
              user "q1 one", assistant "a1 one",    turn 1, cost 4
              user "q2 two", assistant "a2 two",    turn 2, cost 4
              user "q3"]                            cost 1
  total = 11
  fit_to_budget(messages, 11, count_tokens, overhead=0) -> unchanged copy
  fit_to_budget(messages, 7,  count_tokens, overhead=0)
    -> [sys, user "q2 two", assistant "a2 two", user "q3"]   (turn 1 dropped)
  fit_to_budget(messages, 2,  count_tokens, overhead=0) -> ValueError

EDGE CASES
  - An empty middle that still does not fit is caught by step 2.
  - A lone assistant message at the start of the middle is its own turn.
  - A user message followed by another user message is its own turn.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Compute every message's cost once up front; then the cost of "drop d
     turns" is total - (cost of the dropped turns), which a running sum gives.
  2. Build the turns list first (a list of lists of messages); the rest is a
     loop over d.
  3. Skipping llm calls when the base alone is over budget is a real cost
     saving: summaries are paid for with another model call.

COMPLEXITY
  Target: O(n) token counting plus O(n) per llm call; O(n) without llm.
----------------------------------------------------------------------
"""


def fit_to_budget(messages: list[dict], budget: int, count_tokens, overhead: int = 4, llm=None) -> list[dict]:
    # TODO: your solution here
    raise NotImplementedError
