"""
013 — Prompt Template Renderer
Difficulty: Easy   ·   Track: LLM App Engineering   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Turn a chat prompt template into the list of messages you send to a model.

  Implement `render(template, variables)` returning a list of messages:
    - template: a list of dicts, each with "role" and "content" (both str)
    - variables: a dict mapping names to values (any type)
    - returns a NEW list of NEW dicts, each exactly {"role": ..., "content": ...}
      in the same order as the template. Any other keys are dropped.
      The template itself must not be modified.

  Roles
    - Allowed roles: "system", "user", "assistant", "tool".
    - Check EVERY message's role before rendering anything. If any role is not
      allowed, raise ValueError (so a bad role wins over a missing variable).

  Placeholders
    - A placeholder is `{{name}}`, where name matches [A-Za-z_][A-Za-z0-9_]*.
      Spaces (or any whitespace) around the name are allowed: `{{ name }}`.
    - It is replaced by str(variables[name]).
    - If name is not in variables, raise KeyError(name), i.e. the exception's
      args[0] is the bare name string.
    - Anything else that looks like braces but is not a valid placeholder
      (e.g. `{{ }}`, `{{1st}}`, `{name}`) is left unchanged.
    - Variables that the template never uses are ignored.
    - Substituted values are NOT scanned again: if a value contains `{{x}}`,
      that text appears literally in the output.

  Escaping
    - A backslash immediately followed by `{{` (three characters) produces a
      literal `{{`, and what follows is plain text. So backslash + `{{name}}`
      renders as `{{name}}`.
    - A backslash anywhere else is an ordinary character and is kept.
    - NOTE: this docstring is a normal Python string, so every single
      backslash character is written `\\` below (as in Python source).

WHY IT MATTERS
  Every LLM app has prompt templates. Silent bugs here (a missing variable that
  renders as an empty string, a user's text that injects a new placeholder)
  ship straight into production prompts. Failing loudly is the feature.

CONSTRAINTS
  0 <= len(template) <= 100, content length <= 10^5 characters.
  Scan each content string once, left to right.

EXAMPLES
  render([{"role": "system", "content": "You are {{persona}}."},
          {"role": "user", "content": "Hi, I am {{ name }}."}],
         {"persona": "a pirate", "name": "Ada"})
  -> [{"role": "system", "content": "You are a pirate."},
      {"role": "user", "content": "Hi, I am Ada."}]

  render([{"role": "user", "content": "Use \\{{name}} syntax, {{name}}"}],
         {"name": "Bo"})
  -> [{"role": "user", "content": "Use {{name}} syntax, Bo"}]

  render([{"role": "user", "content": "{{missing}}"}], {})   -> KeyError('missing')
  render([{"role": "robot", "content": "hi"}], {})          -> ValueError

EDGE CASES
  - Empty template returns [].
  - A value of 3 renders as "3"; a value of None renders as "None".
  - A variable used twice is substituted twice.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. One regular expression with two alternatives (the escape sequence, or a
     placeholder) and `re.sub` with a replacement function handles both in one
     left-to-right pass.
  2. Because `re.sub` never rescans its own replacements, "values are not
     scanned again" comes for free.
  3. Validate all roles in a separate loop first.

COMPLEXITY
  Target: O(total content length) time and space.
----------------------------------------------------------------------
"""


def render(template: list[dict], variables: dict) -> list[dict]:
    # TODO: your solution here
    raise NotImplementedError
