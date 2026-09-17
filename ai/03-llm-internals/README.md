# LLM Internals

> Text becomes tokens, tokens look at earlier tokens, and the last layer's scores become one chosen next token. Repeat.

**Track:** 03 · LLM Internals  
**Language:** Python, Python (NumPy)  
**Practice:** [007 BPE Tokenizer](007-bpe-tokenizer.py) · [008 Causal Self-Attention](008-causal-self-attention.py) · [009 LLM Sampling](009-llm-sampling.py)

---

## What this track is

A GPT-style model does three things every time it writes a token:

1. **Tokenize.** The text is cut into pieces from a fixed vocabulary, and each piece becomes an id.
2. **Attend.** Inside every layer, each position mixes in information from the positions before it.
3. **Sample.** The final layer gives a score (a logit) for every token in the vocabulary, and a
   decoding rule turns those scores into one token.

This track builds each of those three from scratch, small enough to check by hand.

## Why it matters for LLM and AI engineering

- **Cost and limits are counted in tokens.** Context windows, rate limits, prices and latency all
  depend on how the tokenizer cuts your text. Code, JSON, non-English text and long numbers often
  take many more tokens than you expect.
- **Strange model behaviour often comes from the tokenizer.** A model that cannot count the letters
  in a word never saw the letters, only the chunks.
- **Attention is where the compute and memory go.** Its cost grows with the square of the context
  length, which is why long contexts are expensive and why the KV cache exists.
- **`temperature`, `top_k` and `top_p` are on every API.** Knowing exactly what they do tells you
  why temperature 0 repeats itself, why a high temperature goes off the rails, and why you rarely
  need to set both top_k and top_p.

## Core concepts

### Byte-pair encoding (BPE)

Start with single characters (real tokenizers start with bytes). Find the adjacent pair that
appears most often, glue it into one new token, and write the rule down. Repeat until the
vocabulary is big enough.

```
"aaabdaaabac"   merge (a,a)  ->  aa a b d aa a b a c
                merge (a,b)  ->  aa ab d aa ab a c
                merge (aa,ab) -> aaab d aaab a c
```

To **encode** new text, replay the rules in the order they were learned. To **decode**, glue the
tokens back together. Common words end up as one token; rare words are spelled out in pieces, so
nothing is ever "unknown". The order of the merges matters: a merge can only fire once the tokens
it glues exist.

### Scaled dot-product attention

Each position makes a **query** ("what am I looking for?"), and every position offers a **key**
("what do I contain?") and a **value** ("what do I pass on?").

```
Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k + mask) · V
```

- `Q·Kᵀ` scores how well every query matches every key.
- Dividing by `√d_k` keeps the scores from growing with the vector size. Without it, the softmax
  saturates to nearly one-hot and gradients vanish.
- `softmax` along each row turns scores into weights that sum to 1.
- The output for each position is a weighted average of the values.

### The causal mask

A language model is trained to predict token `i+1` from tokens `0..i`. If position `i` could see
position `i+1`, it would just copy the answer. The fix is to add `−∞` to every score above the
diagonal before the softmax. `e^(−∞) = 0`, so the future gets exactly zero weight. This is what lets
a model train on every position of a sequence at once while still being a next-token predictor.

### Stable softmax

`softmax(z)_i = e^(z_i) / Σ_j e^(z_j)`. With `z = 1000`, `e^z` overflows. Subtracting the largest
score first changes nothing mathematically (it cancels in the fraction) but keeps every exponent at
or below 0.

### Decoding: greedy, temperature, top-k, top-p

- **Greedy:** always take the highest logit. Deterministic, but tends to loop and sound flat.
- **Temperature:** divide logits by `T` before the softmax. `T < 1` sharpens the distribution
  (more confident), `T > 1` flattens it (more random). `T = 0` is treated as greedy.
- **Top-k:** keep only the `k` most likely tokens and renormalise. Cuts off the long tail of
  nonsense tokens, but `k` is the same whether the model is sure or unsure.
- **Top-p (nucleus):** keep the smallest set of most likely tokens whose probabilities add up to at
  least `p`, then renormalise. When the model is confident, the set is tiny; when it is unsure, the
  set grows. That adaptivity is why top-p is the usual default.

The order matters. In problem 009 it is: temperature, softmax, top-k, top-p, then draw.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 007 | [BPE Tokenizer](007-bpe-tokenizer.py) | Medium | Learning merges by pair frequency, replaying them to encode |
| 008 | [Causal Self-Attention](008-causal-self-attention.py) | Medium | Scaled dot-product attention, stable softmax, the causal mask |
| 009 | [LLM Sampling: Greedy, Temperature, Top-k, Top-p](009-llm-sampling.py) | Medium | Turning logits into a token with the standard decoding knobs |

## Common mistakes

- **BPE: merging overlapping pairs.** `aaa` with the rule `(a,a)` becomes `aa a`, not `aa aa`. Scan
  left to right and skip past a pair once you merge it.
- **BPE: applying merges in the wrong order,** or picking "the best pair for this text" while
  encoding. Encoding replays the learned list, in order, nothing else.
- **BPE: an unstated tie-break.** Two pairs with the same count must be chosen the same way every
  time, or two runs produce different vocabularies.
- **Attention: transposing the wrong axes.** With a batch dimension, `K.T` reverses all three axes.
  Swap only the last two.
- **Attention: softmax over the wrong axis.** Each query's weights (each row) must sum to 1.
- **Attention: masking after the softmax.** Zeroing weights after the softmax leaves rows that no
  longer sum to 1. Add `−∞` before it.
- **Attention: using a large negative number like −1e9 and then checking for exact zeros.** Use
  `−inf`; the stable softmax handles it.
- **Sampling: dividing by a temperature of 0.** Handle it as greedy before any maths.
- **Sampling: forgetting to renormalise** after top-k or top-p, so the probabilities no longer sum
  to 1 and `rng.choice` raises.
- **Sampling: an off-by-one in top-p.** The token that pushes the running total past `p` is kept.

## Suggested order

1. **007** first: pure Python, no maths, and it shows you what a "token" really is.
2. **008** next: the one formula every transformer is built on, plus the stable softmax you reuse.
3. **009** last: the softmax again, then what happens to the model's output before you see it.

Run them from the `ai/` folder with `./practice 007`, `./practice 008` and `./practice 009`.
