# ML Fundamentals

> Guess, measure how wrong you are, nudge the guess downhill, repeat. Every model in this repo, up to an LLM, is trained with this loop.

**Track:** 01 · ML Fundamentals  
**Language:** Python (NumPy)  
**Practice:** [001 Linear Regression](001-linear-regression-gradient-descent.py) · [002 Logistic Regression](002-logistic-regression.py) · [003 K-Means](003-k-means.py)

---

## What this track is

Before transformers, attention, or agents, there are three small ideas:

1. A **model** is a function with numbers inside it (weights).
2. A **loss** is one number that says how wrong the model is on the data.
3. **Training** changes the weights to make the loss smaller.

Linear and logistic regression teach you the supervised version of this (you have the right
answers). K-means teaches the unsupervised version (no answers, just structure to find).

## Why it matters for LLM and AI engineering

- An LLM's training step is the same as problem 001: forward pass, loss, gradient, update. Only
  the model is bigger.
- An LLM's output layer is logistic regression with a softmax instead of a sigmoid. The gradient
  `(p − y)·x` you derive in 002 is the one that trains it.
- Vector databases use k-means to split millions of embeddings into buckets (IVF indexes) so a
  search only looks at a few of them. Clustering embeddings is also how you find topics and
  near-duplicates in a dataset.

## Core concepts

### Gradient descent

The gradient of the loss points uphill. Take a small step the other way:

```
w ← w − lr · ∂loss/∂w
```

`lr` (learning rate) is the step size. Too small and training crawls. Too big and every step
overshoots, so the loss grows instead of shrinking. **Batch** gradient descent uses the whole
dataset for every step. That makes it exact and easy to test, and it is why these problems give
the same answer every run.

### Mean squared error (regression)

For predicting a number: `loss = mean((pred − y)²)`. Squaring punishes big misses more than small
ones, and the gradient is simple: `(2/n) · Xᵀ(pred − y)`.

### Sigmoid and binary cross-entropy (classification)

To predict a probability, squash the score `z = x·w + b` into (0, 1):

```
sigmoid(z) = 1 / (1 + e^(−z))
BCE        = −[ y·log p + (1 − y)·log(1 − p) ]
```

BCE is huge when the model is confident and wrong, and near zero when it is confident and right.
The nice surprise: the gradient with respect to `z` is just `p − y`.

### Numerical stability

Computers have a largest float. `e^1000` overflows to `inf`, and `log(0)` is `−inf`. Real models
produce extreme scores all the time, so:

- compute `sigmoid` with a formula whose exponent is never positive (one formula for `z ≥ 0`,
  another for `z < 0`);
- compute BCE straight from the score, `log(1 + e^z) − y·z`, instead of taking `log` of a
  probability that may have rounded to 0.

This is the same trick that keeps LLM training from turning into `nan`.

### K-means (Lloyd's algorithm)

Pick `k` centres. Then repeat two steps:

1. **Assign:** every point joins its nearest centre.
2. **Update:** every centre moves to the mean of its points.

Each step can only lower the **inertia** (total squared distance from points to their centres), so
the loop always stops. It finds a *local* best, not always the global one, which is why the
starting centres matter. Here they are given to you so the answer is deterministic.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 001 | [Linear Regression with Gradient Descent](001-linear-regression-gradient-descent.py) | Easy | MSE loss and the basic training loop |
| 002 | [Logistic Regression](002-logistic-regression.py) | Medium | Stable sigmoid, binary cross-entropy, the `p − y` gradient |
| 003 | [K-Means Clustering](003-k-means.py) | Medium | Alternating assign/update, empty clusters, inertia |

## Common mistakes

- **Summing instead of averaging the gradient.** Then the right learning rate depends on the
  dataset size. Divide by `n` exactly where the problem says.
- **Rebinding instead of updating.** `w - lr * dw` computed but never stored gives a model that
  never learns.
- **Naive sigmoid.** `1 / (1 + np.exp(-z))` overflows for very negative `z`. It "works" until real
  data arrives.
- **`log` of a probability.** A probability of exactly 0 gives `inf` loss. Work from the score.
- **Looping over samples.** A Python loop over rows is 100× slower than one matrix multiply.
- **K-means: mutating the caller's centroids.** Work on a copy.
- **K-means: dividing by zero for an empty cluster.** A cluster with no points has no mean. Keep
  the old centre.
- **K-means: returning labels that do not match the returned centroids.** Assign once more at the
  end.

## Suggested order

1. **001** first: it is the whole training loop with the simplest possible loss.
2. **002** next: same loop, new loss, and your first taste of numerical stability.
3. **003** last: no gradients at all, a different way to optimise.

Run them from the `ai/` folder with `./practice 001`, `./practice 002` and `./practice 003`.
