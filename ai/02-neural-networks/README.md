# Neural Networks

> Stack simple layers, score the output with cross-entropy, send the blame backward with the chain rule, and let the optimizer spend it.

**Track:** 02 · Neural Networks  
**Language:** Python (NumPy)  
**Practice:** [004 Softmax and Cross-Entropy](004-softmax-cross-entropy.py) · [005 MLP Backprop](005-mlp-backprop.py) · [006 Adam and SGD with Momentum](006-adam-optimizer.py)

---

## What this track is

A neural network is logistic regression with more layers in front. This track builds the three
pieces every network needs, by hand, with no autograd:

1. **The output and loss:** softmax turns scores into probabilities, cross-entropy scores them.
2. **The backward pass:** backpropagation computes the gradient of the loss for every weight.
3. **The optimizer:** turns gradients into weight updates, with memory of past steps.

## Why it matters for LLM and AI engineering

- An LLM predicts the next token with a softmax over its whole vocabulary and is trained on
  cross-entropy. That is problem 004 with `C = 100,000`.
- Every transformer layer contains an MLP block: Linear → activation → Linear. That is problem 005.
- Almost every LLM is trained with Adam or AdamW. Its two state buffers are why optimizer memory is
  twice the size of the model, and its bias correction and `eps` show up in real training bugs.
  That is problem 006.
- When a loss turns into `nan`, a layer stops learning, or training diverges, the fix comes from
  understanding these pieces, not from the framework.

## Core concepts

### Softmax

Turns a row of any real scores (logits) into probabilities that sum to 1:

```
softmax(z)_j = e^(z_j) / Σ_k e^(z_k)
```

Adding the same number to every logit changes nothing. So subtract the row's max first: the
biggest exponent becomes `e^0 = 1` and nothing overflows.

### Cross-entropy

The loss for the true class `y` is `−log p_y`: small when the model gave the right answer a high
probability, huge when it gave it almost none. Compute it via **log-softmax**,
`(z_y − m) − log Σ e^(z_k − m)`, so a probability that rounds to 0 still gives a finite loss.

The gradient with respect to the logits is the famous one:

```
∂loss/∂z = softmax(z) − one_hot(y)        (divided by n for a mean over a batch)
```

"Push up the right answer, push down everything else, in proportion to how much it was believed."

### Backpropagation

The chain rule, applied layer by layer from the loss back to the input. Each layer receives the
gradient of the loss with respect to its **output** and returns:

- the gradient for its own **weights** (to update them), and
- the gradient for its **input** (to pass further back).

For a linear layer `out = x·Wᵀ + b`: `dW = doutᵀ·x`, `db = sum(dout)`, `dx = dout·W`.
For ReLU `out = max(0, x)`: the gradient passes through where `x > 0` and is blocked elsewhere.

**The shape rule:** a gradient always has the same shape as the thing it is the gradient of. If
your shapes line up, you are usually right.

**The gradient check:** nudge one weight by `±h`, measure how the loss changes, and compare
`(loss⁺ − loss⁻) / 2h` with your analytic gradient. They should agree to about six digits.

### Momentum

Plain gradient descent zig-zags across steep valleys. Momentum keeps a running velocity:

```
buf = momentum · buf + g
w  -= lr · buf
```

Directions that agree step after step build speed; directions that flip back and forth cancel out.

### Adam

Adam keeps two running averages per weight: `m` (the mean gradient, like momentum) and `v` (the
mean **squared** gradient, the typical size). The step is `m / √v`, so every weight gets its own
step size: weights with small, consistent gradients move as fast as weights with large ones.

```
m = β1·m + (1 − β1)·g          m̂ = m / (1 − β1^t)
v = β2·v + (1 − β2)·g²         v̂ = v / (1 − β2^t)
w -= lr · m̂ / (√v̂ + eps)
```

`m` and `v` start at zero, so early on they are too small. Dividing by `1 − β^t` (**bias
correction**) fixes that. A result worth knowing: Adam's very first step moves each weight by
almost exactly `lr` in the direction against its gradient, no matter how big the gradient is.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 004 | [Softmax and Cross-Entropy](004-softmax-cross-entropy.py) | Easy | Stable softmax, log-softmax loss, the `p − y` gradient |
| 005 | [MLP Forward and Backprop](005-mlp-backprop.py) | Medium | Chain rule through Linear → ReLU → Linear, gradient checking |
| 006 | [Adam and SGD with Momentum](006-adam-optimizer.py) | Medium | Optimizer state, bias correction, in-place updates |

## Common mistakes

- **Softmax over the wrong axis.** Normalise each **row** (`axis=1`), not each column or the whole
  matrix.
- **Forgetting `keepdims=True`.** A `(n,)` max will not broadcast against `(n, C)` the way you want.
- **Computing `log(softmax(z))` in two steps.** Underflow to 0 gives `−inf`. Use log-softmax.
- **Forgetting the `1/n`.** The loss is a mean, so the gradient is too.
- **Writing into the logits or params.** `g = softmax(z); g[...] -= 1` is fine; doing that to the
  input array is not.
- **ReLU derivative using `>=`.** The convention here is that the gradient at exactly 0 is 0.
- **Transposes in the wrong place.** `dW` has the shape of `W`. Check it on every line.
- **Optimizer updates that do not stick.** `p = p - lr * step` rebinds a local name; the caller's
  array never changes. Use `p -= ...`.
- **Adam's `t` per parameter.** It counts `step()` calls, once per call, starting at 1 on the first.
- **`eps` inside the square root.** It goes outside: `√v̂ + eps`.

## Suggested order

1. **004** first: the loss and its gradient are the starting point of every backward pass.
2. **005** next: reuse 004's ideas and push the gradient back through two layers.
3. **006** last: you now have gradients; this is what a real training loop does with them.

Run them from the `ai/` folder with `./practice 004`, `./practice 005` and `./practice 006`.
