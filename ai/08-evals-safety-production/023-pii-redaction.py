"""
023 — PII Redaction
Difficulty: Medium   ·   Track: Evals, Safety & Production   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Before user text goes into a prompt, a log, or a training set, remove the
  personal data in it and keep a private mapping so it can be put back later.

  Implement `luhn_valid(digits)` -> bool
    - digits: a str. Return False if it is empty or has any non-digit character.
    - Luhn check: from the RIGHTMOST digit going left, double every second digit
      (the 2nd, 4th, ... from the right); if a doubled value is > 9, subtract 9.
      Sum everything. Valid if the sum % 10 == 0.

  Implement `redact(text)` -> (redacted_text, mapping)

  Four kinds of PII, each with a placeholder label:
    EMAIL  local part: one or more of letters, digits, and . _ % + -
           then "@", then one or more domain labels (letters, digits, -) joined
           by ".", with at least one ".", where the last label is 2 or more
           letters only.       e.g. jane.doe+ai@mail.example.co
    CARD   a run of digits where each pair of neighbouring digits is separated
           by nothing, ONE space, or ONE dash. The run must be as long as
           possible: it is not directly preceded by a digit, or by a space/dash
           that has a digit before it, and the same on the right. The run must
           hold 13 to 19 digits in total, and be Luhn-valid (check the digits
           only). A longer run (20+ digits) is not a card and no piece of it is.
                               e.g. 4111 1111 1111 1111, 4111-1111-1111-1111
    PHONE  optional prefix "+1 " or "+1-", then an area code written either as
           "(NNN) " (brackets, then one space) or as "NNN" plus one separator,
           then "NNN", one separator, "NNNN". A separator is one "-", "." or
           space. Not directly preceded or followed by a digit.
                               e.g. 555-123-4567, (555) 123-4567, +1 555.123.4567
           A bare run of 10 digits (5551234567) is NOT a phone.
    IPV4   four numbers joined by ".", each 1 to 3 digits with value 0..255.
           Not directly preceded by a digit or "."; not directly followed by a
           digit, or by "." and then a digit.
                               e.g. 10.0.0.1, 192.168.1.254   (not 256.1.1.1)

  Detection order: handle the kinds one after another: EMAIL, then CARD, then
  PHONE, then IPV4. Each pass scans the CURRENT text left to right (so it sees
  the placeholders written by earlier passes, never the text they replaced),
  finds non-overlapping matches, and replaces them. A match is the whole text
  described above, including a "+1 " prefix or brackets. A CARD candidate that
  fails Luhn is left in the text as it was, so a later pass may still match
  part of it.

  Placeholders: "[<LABEL>_<k>]", e.g. "[EMAIL_1]", "[CARD_2]". For each label,
  number distinct values 1, 2, 3, ... in order of their first appearance in the
  text. Two matches are the SAME value when their canonical forms are equal:
    EMAIL -> lowercased;   CARD, PHONE -> digits only;   IPV4 -> as written.
  The same value gets the same placeholder every time.

  mapping: dict placeholder -> the matched text of that value's FIRST
  occurrence, exactly as written. Text without PII returns (text, {}).

WHY IT MATTERS
  Prompts get logged, cached, sent to vendors, and sometimes used for training.
  A regex-plus-validation redaction layer is the usual first line of defence,
  and the checksum step matters: without Luhn, every order number and tracking
  code gets flagged as a credit card.

CONSTRAINTS
  len(text) <= 10^5. Regular expressions are fine; the Luhn check needs code.

EXAMPLES
  redact("Mail Jane@X.io or jane@x.io, call (555) 123-4567 or 555.123.4567.")
    -> ("Mail [EMAIL_1] or [EMAIL_1], call [PHONE_1] or [PHONE_1].",
        {"[EMAIL_1]": "Jane@X.io", "[PHONE_1]": "(555) 123-4567"})

  redact("card 4111-1111-1111-1111, order 4111-1111-1111-1112, host 10.0.0.1.")
    -> ("card [CARD_1], order 4111-1111-1111-1112, host [IPV4_1].",
        {"[CARD_1]": "4111-1111-1111-1111", "[IPV4_1]": "10.0.0.1"})

  redact("+1 212-555-0199 rings, id 5551234567 does not.")
    -> ("[PHONE_1] rings, id 5551234567 does not.",
        {"[PHONE_1]": "+1 212-555-0199"})
    (the "+1 " prefix is part of the match; a bare run of 10 digits is not a
     phone at all)

  redact("ref 4111 1111 1117 stays, so does 4111 1111 1111 1111 1111 1111.")
    -> (the text unchanged, {})
    (12 digits is too short even though it is Luhn-valid, and a 24-digit run is
     not a card, nor is any 16-digit piece of it)

  redact("Version 3.2 shipped on 2024-01-05 to 12 users @ noon.")
    -> (the text unchanged, {})        # no PII, so the mapping is empty
  redact("") -> ("", {})

  luhn_valid("79927398713") -> True
  luhn_valid("79927398710") -> False
  luhn_valid("4111-1111") -> False     # non-digit characters
  luhn_valid("") -> False

EDGE CASES
  - A sentence-ending "." after an IP or email is not part of the match.
  - "1.2.3.4.5" is not an IPv4 (it runs on); neither is "256.1.1.1".
  - A Luhn-invalid 16-digit number stays in the text unchanged.
  - Numbers restart per label: the first phone is [PHONE_1] even if two
    emails came before it.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Use lookarounds for the "not preceded/followed by" rules: (?<!\\d), (?!\\d).
  2. For CARD, match a candidate with a regex like
       (?<!\\d)(?<!\\d[ -])\\d(?:[ -]?\\d){12,18}(?![ -]?\\d)
     then use re.sub with a function that returns the match unchanged when the
     Luhn check fails.
  3. For IPV4, capture the four numbers and check each is <= 255 inside the
     replacement function.
  4. Keep one dict per label: canonical value -> placeholder.

COMPLEXITY
  Target: O(len(text)).
----------------------------------------------------------------------
"""


def luhn_valid(digits: str) -> bool:
    # TODO: your solution here
    raise NotImplementedError


def redact(text: str) -> tuple[str, dict[str, str]]:
    # TODO: your solution here
    raise NotImplementedError
