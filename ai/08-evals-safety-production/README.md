# Evals, Safety & Production

> A model you cannot measure, that leaks user data, and that falls over on the first 429 is a demo, not a product.

**Track:** 08 · **Problems:** 022–024  
**Language:** Python (stdlib only)  
**Fakes used:** `FakeClock`, `FakeLLM` from `ai/_fakes` (passed in as arguments, never imported)

---

## What this track is

Getting a model to answer well once is the start. Shipping it means three more jobs:

- **Evals:** a number that says whether today's version is better than yesterday's.
- **Safety:** making sure personal data does not leak into prompts, logs, or training sets.
- **Production resilience:** staying up when the provider rate-limits you, has an outage, or just gets
  slow, and not paying twice for the same answer.

None of this is glamorous, and all of it is what separates a prototype from a service people rely on.

## Why it matters for AI engineering

"How do you know it works?" and "what happens when the API returns 429?" are standard questions in LLM
engineering interviews. The honest answers are metrics with clear definitions, redaction with real
validation, and clients with limiters, backoff, and caches. Each of these is a small piece of code with
exact behaviour that is easy to get subtly wrong.

## Core concepts

### Normalize before you compare

A model that answers "The Eiffel Tower." when the gold answer is "Eiffel Tower" is right. Plain string
equality says it is wrong. The SQuAD recipe fixes the harmless differences first: lowercase, remove
punctuation, drop the articles *a*, *an*, *the*, collapse whitespace. The order matters, because
removing punctuation first turns "the." into "the", which is then removed as an article.

**Intuition:** grade the answer, not the handwriting.

### Exact match and token F1

**Exact match (EM)** is all or nothing: after normalization, is the answer identical to some gold
answer? **Token F1** gives partial credit. Treat both answers as bags of words, count the words they
share, and combine **precision** (how much of what you said was right) with **recall** (how much of
the right answer you said). With several acceptable golds, take the best score.

**Intuition:** EM asks "did you write the answer?". F1 asks "how much of the answer did you write, and
how much junk did you add?"

### Report the aggregate the same way every time

Scores are averaged over the dataset and reported as percentages. Decide up front what a missing
prediction counts as (here, an empty answer) and how to round, or two runs of the same eval will not
agree.

### Redact PII with patterns and checks

Emails, phone numbers, card numbers, and IP addresses are found with regular expressions. But a pattern
alone is too eager: every 16-digit order number looks like a credit card. Real card numbers pass the
**Luhn checksum**, and IPv4 octets must be **0–255**. Validate each match before you redact it.

**Intuition:** a metal detector finds every bottle cap. You still look before you dig.

### Placeholders keep the text useful

Replace each value with a **numbered placeholder** like `[EMAIL_1]`, and reuse the same number when the
same value appears again. The model can still reason ("email [EMAIL_1] twice"), and a private mapping
lets you restore the real values in the reply.

**Intuition:** witness A and witness B in a court report. You can follow the story without the names.

### Rate limiting with a token bucket

A **token bucket** holds up to `capacity` tokens and refills at `refill_rate` tokens per second. Each
request takes one. If the bucket is empty, wait exactly as long as it takes to refill. Bursts up to
the capacity are allowed; the long-run rate is capped.

**Intuition:** a water tank with a slow tap. You can fill a few glasses fast, then you wait for the tap.

### Retries with exponential backoff

Some errors are temporary (429 rate limit, 5xx server trouble); retry them. Others are your fault (a
bad request); retrying only wastes money, so raise at once. Wait longer after each failure:
`base · 2^attempt`, capped at a maximum, so a struggling server gets room to recover. Real clients add
random jitter so thousands of clients do not retry at the same moment. Here it is left out so the waits
are exact.

**Intuition:** knocking on a door. Knock, wait a bit, knock, wait longer. Do not hammer.

### Inject the clock

Code that calls `time.sleep` directly is slow to test and impossible to test exactly. Pass in a `clock`
with `now()` and `sleep()`. In production it is the real clock; in tests it is a fake that records
every sleep and returns at once.

### Caching with LRU eviction

The same prompt gives the same useful answer often enough (evals, retries, popular questions) that
caching pays. Key the cache on the **exact messages**, keep only the most recently used N entries, and
never cache errors. A cache hit should skip the rate limiter too: nothing was sent.

**Intuition:** the drawer by your desk. Things you used lately stay in; the thing you have not touched
longest goes back to the shelf when the drawer is full.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 022 | [QA Eval Metrics (Exact Match and F1)](./022-qa-eval-metrics.py) | Easy | SQuAD normalization, exact match, token F1 over several golds, dataset averages |
| 023 | [PII Redaction](./023-pii-redaction.py) | Medium | Regex detection plus Luhn and octet checks, numbered placeholders, a restore mapping |
| 024 | [LLM Client: Retries, Rate Limiting, Caching](./024-llm-client-retry-and-rate-limit.py) | Medium | Token bucket, capped exponential backoff on retryable errors, LRU response cache |

Run one with `./practice 022` from the `ai/` folder.

## Common mistakes

- **Normalizing in the wrong order.** Articles are removed after punctuation, so "the." loses its
  "the"; do it the other way and it survives.
- **Counting shared tokens with sets.** "cat cat" and "cat" share one token, not two and not "all of
  them". Use counts (a multiset).
- **Averaging F1 over golds** instead of taking the best one. A prediction only needs to match one
  acceptable answer.
- **Redacting any 16-digit number as a card.** Without Luhn you destroy order ids and tracking numbers.
- **Numbering placeholders per match instead of per value.** The same email becomes `[EMAIL_1]` and
  `[EMAIL_2]`, and the model thinks there are two people.
- **Forgetting lookarounds,** so a phone number is found inside a longer run of digits.
- **Retrying every exception.** A bad request fails the same way every time; retrying it just costs
  more.
- **Off-by-one in backoff.** The first wait is `base · 2^0`, and there is no wait after the last
  attempt: the error is raised instead.
- **Calling `time.sleep` instead of the injected clock,** so tests are slow and cannot check the waits.
- **Taking a rate-limit token on a cache hit,** or caching an error so it is served back forever.

## Suggested order

1. **022 QA Eval Metrics** (Easy): short pure functions. Get normalization exactly right and the rest
   follows.
2. **023 PII Redaction** (Medium): one kind of PII at a time. Write `luhn_valid` first, then emails,
   cards, phones, IPs, and check the test after each.
3. **024 LLM Client** (Medium): build and test the `TokenBucket` on its own first, then the retry loop,
   then the cache.
