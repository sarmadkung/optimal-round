# AI Interview Drills

> The questions AI and ML engineering interviews actually ask you to code, practised the way you will
> face them: from a blank file, against a clock, with the shapes in your head.

**Track:** AI Interview Drills  
**Problems:** 028 – 030  
**Practice:** [028 Multi-Head Self-Attention](028-multi-head-attention.py) · [029 In-Memory Vector Index with Top-k Search](029-vector-index-top-k.py) · [030 LoRA Linear Layer](030-lora-linear-layer.py)

---

## How AI/ML engineer coding interviews run

Most loops for ML engineer, LLM engineer, applied scientist and research engineer roles include one
or two **ML coding** rounds next to the usual algorithms round. They tend to look like this:

- **45 to 60 minutes**, of which about 35 to 45 are coding. The rest is questions and discussion.
- **A shared editor or a notebook**, usually Python with NumPy, sometimes PyTorch. Often no
  autocomplete, and often you are not expected to run the code, so you must reason about it.
- **Implement a core building block from scratch:** attention, a layer's forward and backward pass,
  an optimizer, k-means, a tokenizer, top-k retrieval, beam search, a metric.
- **Follow-ups that change the problem:** "add a causal mask", "now make it batched", "what if the
  index has a billion vectors?", "how would you merge the adapter for inference?".

The code is rarely long. What is being tested is whether you understand the thing well enough to
build it without a library, and whether you think like someone who ships it.

## How to practise these under a timer

1. **Read the header once, then close it.** Write down the signature, input and output shapes and the
   one or two conventions that matter (tie-breaks, weight layout). That is your spec.
2. **Set a time box** and start the clock before you write any code:

   | Problem | Difficulty | Time box | Stretch goal |
   |:--------|:-----------|:---------|:-------------|
   | 029 Vector index | Medium | 30 min | 20 min |
   | 030 LoRA layer | Medium | 30 min | 20 min |
   | 028 Multi-head attention | Hard | 40 min | 25 min |

3. **Talk out loud** (or type comments) as you go, as if an interviewer were listening. Say the
   shape of every tensor you create.
4. **Write a tiny check before running the tests**: a 2×2 example you can do by hand, or a loop
   version to compare against the vectorised one. Interviewers like this more than a lucky first run.
5. **Run `./practice NNN`** when you believe you are done. If a test fails, note which convention you
   missed, not only the fix.
6. **Repeat a problem a week later from a blank stub.** The goal is fluency: the second time should
   take half as long.

If you blow the time box, stop, finish it untimed, and schedule a retry. A drill you finish slowly
still counts; a drill you abandon does not.

## What interviewers look for

- **Shape discipline.** Can you say what shape every array has at every line? Most bugs in these
  problems are a transpose in the wrong place, and the fix starts with writing shapes down.
- **Correct maths, stated first.** Say the formula (`softmax(QKᵀ/√d)V`, `dB = scale·Gᵀh`) before
  coding it. It shows you know it and gives the interviewer a chance to redirect you early.
- **Vectorisation.** A loop over tokens or samples works but signals you have not written this for
  real. Loops over layers or epochs are fine.
- **Numerical care.** Stable softmax, no division by a zero norm, `-inf` masks that do not make nan.
- **Edge cases and determinism.** Empty inputs, k larger than n, ties. Deciding them explicitly is a
  sign of production experience.
- **Verification.** A gradient check, a comparison with a slow reference, an invariant such as "LoRA
  output equals the base layer at init". Knowing how to test ML code is half the job.
- **Trade-off discussion.** Memory of the attention matrix, exact vs approximate nearest neighbours,
  why LoRA starts B at zero. You will almost always get a "how would this scale?" question.

## Core concepts in this track

### Multi-head attention

Each token builds a query, a key and a value with learned projections. The attention weights for
token t are softmax over "how well does my query match each key", scaled by `1/√d_head` so the dot
products do not blow up with dimension. The output is the weighted sum of values.

    Attention(Q, K, V) = softmax(Q Kᵀ / √d_head + mask) V

"Multi-head" means splitting the d features into h groups and running attention in each group in
parallel, so different heads can attend to different things. Splitting is a reshape to
`(B, T, h, d_head)` and a transpose to `(B, h, T, d_head)`; merging is the exact reverse, then an
output projection. A **causal mask** sets scores for future positions to `-inf` so a language model
cannot peek ahead.

### Vector search

Embeddings put similar texts near each other. Cosine similarity compares directions:
`cos(a, b) = a·b / (‖a‖ ‖b‖)`. If you normalise every vector once when you store it, cosine becomes a
single matrix-vector product at query time. Taking the top k does not need a full sort:
`np.partition` finds the k-th largest score in linear time, and you only sort the few rows above it.
Real vector databases add approximate indexes (HNSW, IVF, product quantisation) on top of exactly this.

### LoRA

Fine-tuning every weight of a large model is expensive. LoRA freezes the pretrained weight W and
learns a low-rank update:

    y = x Wᵀ + (α / r) · x Aᵀ Bᵀ,     A: (r, in),  B: (out, r),  r ≪ min(in, out)

B starts at zero, so the model is unchanged at step 0. Only A and B get gradients. After training,
`W + (α/r)·B·A` merges the update back into one matrix, so inference costs nothing extra.

## Problems in this track

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 028 | [Multi-Head Self-Attention](028-multi-head-attention.py) | Hard | Q/K/V projections, head split and merge, scaling, causal mask, stable softmax |
| 029 | [In-Memory Vector Index with Top-k Search](029-vector-index-top-k.py) | Medium | Normalise on insert, cosine as dot product, partition-based top-k with exact tie-breaks, upsert and delete |
| 030 | [LoRA Linear Layer](030-lora-linear-layer.py) | Medium | Low-rank adapters, hand-derived backward pass, gradient checking, merging for inference |

## Common mistakes

- **Reshaping to heads without the transpose** (or merging without transposing back). The shapes
  still work, so nothing crashes; the numbers are just wrong.
- **Scaling by √d instead of √d_head.**
- **Masking after the softmax** instead of before it, or masking the wrong triangle.
- **Softmax on raw scores** that overflow for large inputs. Subtract the row max first.
- **Normalising at query time only**, so stored vectors of different lengths get unfair scores.
- **Using argpartition's k rows as the final answer.** It breaks ties arbitrarily at the cut-off.
- **Deleting by rebuilding the whole matrix** on every call, or letting the id-to-row map go stale.
- **Returning a gradient for the frozen W** in LoRA, or updating parameters inside `backward`.
- **Initialising both A and B to zero.** Then neither ever receives a gradient.
- **Skipping the check.** A 10-line numerical gradient check catches almost every backward bug.

## Suggested order

1. **029 In-Memory Vector Index.** Warm up on NumPy vectorisation and careful edge cases in a
   familiar setting.
2. **030 LoRA Linear Layer.** Derive a backward pass by hand and prove it with a gradient check.
3. **028 Multi-Head Self-Attention.** The one you are most likely to be asked. Do it untimed first,
   then under the 40-minute box until you can write it cleanly in 25.
