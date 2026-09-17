# AI Problems

**30 hands-on problems across ML, LLMs, generative AI, RAG, agentic AI and reasoning.
Built by hand, graded offline.**

`problems/` teaches algorithms in JavaScript. This folder teaches the parts that modern AI
systems are built from, in **Python**, the main language for AI work. Each problem is a stub you fill in,
and `./practice` grades it. The same pledge applies: **the solutions are yours, written by
hand.**

Nothing here calls a paid API or downloads a model. Language models, embedders and clocks
are replaced by deterministic fakes in [`_fakes/`](_fakes/__init__.py). Your code receives
them as arguments (`llm`, `embed`, `clock`), the same way production code receives a real
client, so every test is free and gives the same result every time.

## Setup

You need [uv](https://docs.astral.sh/uv/). It installs Python dependencies (NumPy, pytest)
into `ai/.venv` on first run.

```bash
cd ai
./practice list          # every problem and whether you've started it
./practice 008           # grade one problem
./practice all           # grade everything you've started
```

A problem counts as **started** once its `# TODO: your solution here` line is gone.

## Tracks

Each track folder has a README that explains its concepts in plain words. Read it before you
start the problems.

| # | Track | What you build | Problems |
|---|-------|----------------|----------|
| 01 | [ML Fundamentals](01-ml-fundamentals/README.md) | Linear/logistic regression, k-means: the training loop itself | 001–003 |
| 02 | [Neural Networks](02-neural-networks/README.md) | Softmax + cross-entropy, backprop, Adam | 004–006 |
| 03 | [LLM Internals](03-llm-internals/README.md) | BPE tokenizer, causal attention, sampling (temperature/top-k/top-p) | 007–009 |
| 04 | [Generative AI](04-generative-ai/README.md) | Beam search, diffusion forward process, VAE loss | 010–012 |
| 05 | [LLM App Engineering](05-llm-app-engineering/README.md) | Prompt templates, structured output with retries, context-window budgeting | 013–015 |
| 06 | [RAG & Retrieval](06-rag-and-retrieval/README.md) | Chunking, BM25, hybrid search with rank fusion + citations | 016–018 |
| 07 | [Agentic AI](07-agentic-ai/README.md) | Tool dispatch, ReAct loop, plan-DAG executor | 019–021 |
| 08 | [Evals, Safety & Production](08-evals-safety-production/README.md) | QA metrics, PII redaction, rate limiting + retries + caching | 022–024 |
| 09 | [Reasoning & AGI Research](09-reasoning-and-agi/README.md) | Self-consistency, Tree-of-Thoughts, MCTS | 025–027 |
| 10 | [AI Interview Drills](10-interview-drills/README.md) | Multi-head attention, vector index, LoRA, done against a timer | 028–030 |

## Suggested path

Tracks 01–04 are the **model side**: how models learn and generate. Tracks 05–08 are the
**engineering side**: how to build reliable products on top of models. You can start either
side, but the best order for each goal is:

- **LLM engineer (building products):** 05 → 06 → 07 → 08, then 03 so you know what's
  underneath, then 10.
- **Understanding models deeply:** 01 → 02 → 03 → 04 → 09, then 10.
- **Interview prep:** 03 and 06 first, then 10 against a timer.

## Layout

```
ai/
  NN-track/NNN-problem.py   the stub: header with the spec, hints below the spoiler line
  NN-track/README.md        the concept explainer for that track
  tests/test_NNN.py         the grader
  _fakes/                   FakeLLM, FakeEmbedder, FakeClock, count_tokens
  _harness.py               loads problems for the tests; `list`
  practice                  the runner
```
