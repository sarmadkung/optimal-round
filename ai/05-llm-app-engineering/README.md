# LLM App Engineering

> The model is one function call. Everything around that call is what makes it a product.

**Track:** 05 · **Problems:** 013–015  
**Language:** Python (stdlib only)  
**Fakes used:** `FakeLLM`, `count_tokens` from `ai/_fakes` (passed in as arguments, never imported)

---

## What this track is

A chat model takes a list of messages and returns a string. That sounds simple, and the call itself
is. The hard part is the code on both sides of it:

- **Before the call:** building the messages from templates and user data, and fitting them into
  the context window.
- **After the call:** turning free text into data your program can trust, and recovering when the
  model gets it wrong.

This is where most real LLM bugs live. The model rarely crashes. Instead a variable silently renders
as an empty string, a JSON reply arrives wrapped in a friendly sentence, or a long chat quietly loses
its system prompt. None of these show up as exceptions unless you write code that makes them.

## Why it matters for AI engineering

Interviews for LLM roles lean on this layer because it is where judgement shows. Anyone can call an
API. The questions are: what happens when the reply is malformed, what gets cut when the conversation
is too long, and how do you keep user text from changing the shape of your prompt? The answers are
plain, testable code, which is exactly what this track practises.

## Core concepts

### Messages and roles

A conversation is a list of `{"role", "content"}` dicts. `system` sets the rules, `user` asks,
`assistant` is the model's past replies, `tool` carries tool results. A role typo (`"robot"`) is not
an error the API always catches, so check it yourself.

**Intuition:** roles are the stage directions of the script. Get one wrong and the model reads a line
in the wrong voice.

### Templates fail loudly

A prompt template is a string with holes. The two classic bugs are a hole with no value (which should
**raise**, not render as nothing) and a value that contains something that looks like a hole (which
must stay **literal**, or user input can rewrite your prompt). An escape syntax lets you write the
hole characters on purpose.

**Intuition:** a missing variable is a failed build, not a warning.

### Parse, validate, retry

Models wrap JSON in markdown fences and polite prose. So the pipeline is: **extract** the JSON, **parse**
it, **validate** it against a schema, and if any step fails, **show the model its own bad reply plus
the exact error** and ask again. Bound the number of retries, then raise a clear error.

**Intuition:** you are a teacher returning homework with the mistake circled. A vague "try again"
gets the same mistake back; "field age must be int, got str" usually does not.

### Token budgets

The context window is a hard limit counted in tokens, not characters. Every message also costs a few
tokens of **overhead** for the role markers. When a conversation does not fit, you choose what to
lose:

1. The **system message** stays: it holds the rules.
2. The **latest user message** stays: it is the question being answered.
3. **Old turns go first**, and a user message and its assistant reply go **together**, so the model
   never sees an answer without its question.
4. Optionally, the dropped turns are **summarised** into one short message, which costs one extra
   model call.

**Intuition:** packing a suitcase with a weight limit. The passport and ticket go in first; old
clothes come out, a whole outfit at a time; a note saying "packed three shirts, see other bag" is
cheaper than the shirts.

### Inject your dependencies

Every function here receives `llm` and `count_tokens` as arguments. That is not only for testing: it
is how production code swaps models, adds logging, or points at a cheaper tokenizer without touching
the logic.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 013 | [Prompt Template Renderer](./013-prompt-template-renderer.py) | Easy | `{{var}}` substitution with escapes, missing-variable errors, and role checks |
| 014 | [Structured Output with Retry](./014-structured-output-with-retry.py) | Medium | Extract JSON from messy replies, validate a schema, feed errors back and retry |
| 015 | [Context Window Truncation](./015-context-window-truncation.py) | Medium | Fit a chat into a token budget by dropping whole old turns, with optional summary |

Run one with `./practice 013` from the `ai/` folder.

## Common mistakes

- **Rendering a missing variable as `""`.** The prompt still "works", just badly, and nobody notices
  for weeks. Raise.
- **Substituting values in a loop of `str.replace`.** A value that contains `{{other}}` then gets
  substituted again. One left-to-right pass avoids it.
- **`json.loads(reply)` with no extraction step.** The first time the model says "Sure! Here is the
  JSON:", it breaks.
- **Forgetting that `True` is an `int` in Python.** `isinstance(True, int)` is `True`, so a schema
  that wants an int will accept a bool unless you check for bool first.
- **Retrying without telling the model what was wrong.** You pay for another call and usually get the
  same reply.
- **Mutating the caller's message list** while appending retry messages. The caller's history grows
  with your internal back-and-forth.
- **Dropping messages one at a time.** You end up keeping an assistant reply whose question is gone.
- **Counting characters instead of tokens,** or forgetting the per-message overhead, so the "fitted"
  prompt is still rejected by the API.
- **Calling the summariser when it cannot help.** If the remaining turns alone are over budget, a
  summary only adds tokens; skip the call.

## Suggested order

1. **013 Prompt Template Renderer** (Easy): one regular expression pass, and the habit of failing
   loudly.
2. **014 Structured Output with Retry** (Medium): three small functions and a bounded loop. Read the
   exact error strings in the header carefully; the tests compare them.
3. **015 Context Window Truncation** (Medium): group the turns first, then loop over "how many turns
   to drop". Add the summary branch last.
