# Reasoning & AGI Research

> Nobody can code AGI today. What you can code is the machinery current research uses to make
> models think longer and better: sample many thoughts, search over them, and check the results.

**Track:** Reasoning & AGI Research  
**Problems:** 025 – 027  
**Practice:** [025 Self-Consistency Voting](025-self-consistency-voting.py) · [026 Tree-of-Thoughts Beam Search](026-tree-of-thoughts-search.py) · [027 Monte Carlo Tree Search with UCT](027-mcts-uct.py)

---

## An honest starting point

"AGI" has no agreed definition, no known recipe, and no test that would tell you it has arrived.
Anyone selling you a file called `agi.py` is selling you something. So this track does not pretend.

What it does cover is real and useful: the **reasoning and search techniques** that frontier labs and
academic groups use when they try to push models towards more general problem solving. They share
one idea:

> A model that gets to **try several times, look ahead, and check its work** beats the same model
> answering in one shot.

That idea goes by the name **test-time compute** (or inference-time compute): spend more computation
when answering, not only when training. It is behind "reasoning" models that think before they
answer, behind AlphaGo's superhuman play, and behind systems that search for proofs and programs.
The three problems here are the three classic building blocks.

## Core concepts

### 1. Sampling and voting (self-consistency)

A language model sampled at temperature > 0 gives a different chain of thought each time. Some
chains make a slip; many independent chains rarely make **the same** slip. So sample n chains,
pull out each final answer, and take a majority vote.

- **Intuition:** the right answer is a stable attractor; wrong answers are scattered.
- **Key formula:** answer = argmaxₐ #{i : extract(sampleᵢ) = a}, agreement = top votes / valid votes.
- **What matters in practice:** the answer extractor and the normaliser. "42", "42.0" and "42." must
  count as one vote, or the vote splits and the method looks worse than it is.
- **Agreement is a free confidence score.** Low agreement is a good signal to abstain, escalate, or
  spend more compute.

### 2. Search over thoughts (Tree of Thoughts, beam search)

Voting only compares finished answers. Search lets you prune bad partial reasoning early.
Represent reasoning as a tree: a node is a partial solution, `propose` suggests next steps, `score`
estimates how promising a node is, and a search algorithm decides what to expand.

- **Beam search** keeps the best `b` nodes at each depth. Cheap, simple, and greedy when `b = 1`.
- **Intuition:** a wide beam hedges against a scorer that is wrong about one branch.
- **The scorer is everything.** Problem 026 shows it directly: with a "how close is the number"
  score the beam races to a near miss and gets stuck, while a score that understands the task
  solves it with a beam of width one. In LLM systems the scorer is often the model itself
  ("rate this partial solution 1–10") or a trained value model.
- **Deterministic tie-breaks** matter more than they seem: without them search results are not
  reproducible, and you cannot debug or evaluate them.

### 3. Verifiers and value functions

Both techniques above need a way to judge work:

- An **outcome verifier** checks a finished answer: run the unit tests, check the proof, compare
  with the known result.
- A **process reward model** scores each intermediate step, which is what a search needs.
- **Best-of-n with a verifier** (sample n, keep the one the verifier likes most) is often stronger
  than majority voting when a good verifier exists, because it can pick a rare correct answer.

The general lesson: generating candidates is easy; knowing which one is right is the hard part.
Research on reasoning is to a large degree research on better verifiers.

### 4. Monte Carlo Tree Search and self-play

MCTS grows a search tree one simulated game at a time and balances two pressures:

- **Exploitation:** keep playing moves that have scored well.
- **Exploration:** try moves you know little about, since their estimate is unreliable.

UCT puts both into one number per child:

    UCT = W / N  +  c · sqrt( ln(N_parent) / N )

The first term is the average result so far. The second shrinks as a move is tried more, so
neglected moves eventually get another look. `c = √2` is the textbook default.

Each iteration is **select → expand → simulate → backpropagate**. In two-player games, each node's
value is stored from the point of view of the player who made the move into it, so each side
picks what is good for itself. Over many iterations this converges towards minimax play.

AlphaGo and AlphaZero replaced random rollouts with a learned value network and guided selection
with a learned policy, then trained both on games the system played against itself (**self-play**).
That loop (search to produce better play, learn from the search, search again with the better
network) is the most successful "system that improves itself" we have, and it inspires a lot of
current work on reasoning in language models.

## Problems in this track

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 025 | [Self-Consistency Voting](025-self-consistency-voting.py) | Easy | Sample many chains of thought, normalise answers, majority vote with a stable tie-break |
| 026 | [Tree-of-Thoughts Beam Search](026-tree-of-thoughts-search.py) | Medium | Propose / score / prune search over partial reasoning, and how the scorer decides success |
| 027 | [Monte Carlo Tree Search with UCT](027-mcts-uct.py) | Hard | Select, expand, simulate, backpropagate; exploration vs exploitation; two-player perspective |

Run them with `./practice 025`, `./practice 026`, `./practice 027` from the `ai/` folder.

## Common mistakes

- **Voting on raw strings.** Without normalisation, "Paris" and "paris." are different answers.
- **Counting unanswered samples in the denominator.** A completion with no answer is not a vote.
- **Ties decided by dict or set order you did not choose.** State the tie-break and implement it.
- **Pruning before checking for goals.** A goal with a low heuristic score can be thrown away by the
  beam in the same step it was found.
- **Deduplicating when the spec says not to** (or the reverse). It silently changes which paths
  survive the beam.
- **MCTS values from the wrong player's view.** If every node stores reward for the root player,
  the opponent picks moves that help you, and the search recommends blunders.
- **Dividing by zero in UCT.** Expand every child before applying UCT; a new child is visited in
  the iteration that creates it.
- **Returning the move with the best average instead of the most visits.** A move tried once with a
  lucky win has a perfect average. Visit count is the robust choice.
- **Treating any of this as "solving intelligence".** These are search and selection methods. They
  multiply the ability of the model or policy underneath; they do not create it.

## Suggested order

1. **025 Self-Consistency Voting.** The smallest possible form of test-time compute, and a baseline
   every search method has to beat.
2. **026 Tree-of-Thoughts Beam Search.** Move from voting on finished answers to searching over
   partial ones. Pay attention to how much the scorer matters.
3. **027 Monte Carlo Tree Search with UCT.** The full algorithm behind AlphaZero-style systems:
   adaptive exploration, simulation, and two-player values. Trace the tiny-tree example by hand
   before writing code.
