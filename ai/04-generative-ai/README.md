# Generative AI

> A generative model learns what the data looks like well enough to make new examples: one token at a time, by removing noise, or by decoding a point from a smooth latent space.

**Track:** 04 · Generative AI  
**Language:** Python, Python (NumPy)  
**Practice:** [010 Beam Search](010-beam-search.py) · [011 Diffusion Forward Process](011-diffusion-forward-process.py) · [012 VAE Reparameterization and ELBO](012-vae-reparameterization-elbo.py)

---

## What this track is

There are three big families of generative models, and each problem here is the piece of one family
that is easiest to get subtly wrong:

1. **Autoregressive models** (GPT, speech and translation models) write one token at a time.
   Problem 010 is **beam search**, a way to pick a whole sequence instead of one token at a time.
2. **Diffusion models** (Stable Diffusion, image and video generators) learn to undo noise.
   Problem 011 is the **forward process**: the exact maths of adding noise, and the formulas the
   reverse steps rely on.
3. **Variational autoencoders** (VAEs) squeeze data into a small random code and decode it back.
   Problem 012 is the **reparameterization trick** and the **ELBO** loss that trains them.

## Why it matters for LLM and AI engineering

- **Decoding strategy changes output quality** as much as the model does. Beam search is still the
  default wherever there is one right answer: translation, speech-to-text, structured or
  constrained generation.
- **Diffusion is the standard for images, video and audio.** If you fine-tune one, debug one, or
  choose a sampler, you are working with `ᾱ_t`, `q_sample` and the posterior formulas.
- **Latent diffusion runs inside a VAE.** Stable Diffusion's denoiser never sees pixels; a VAE
  encodes images into a smaller latent space first. The reparameterization trick is also how any
  model trains through a random sampling step.

## Core concepts

### Beam search

Greedy decoding keeps the single best prefix. Beam search keeps the best `beam_width` prefixes.
At each step, extend every kept prefix with every possible next token, score each candidate by the
**sum of log-probabilities**, and keep the top `beam_width` again.

- **Log-probabilities** are added instead of multiplying probabilities, which would underflow to 0
  on long sequences.
- A prefix that ends in **EOS** is finished and stops growing.
- A **tie-break rule** (here: smaller token tuple first) makes the result deterministic.

Why it helps: a token that looks slightly worse now can lead somewhere much better. Greedy never
finds out; a beam of 2 or more can.

### Length normalisation

Every extra token adds a negative log-probability, so raw scores always favour short outputs.
Dividing by `length^α` removes that bias:

```
score = log P(tokens) / len(tokens)^α        α = 0: raw,  α = 1: average per token
```

### The diffusion forward process

Add a little Gaussian noise at each of `T` steps, following a **noise schedule** `β_0 … β_{T−1}`
(here a straight line from `1e-4` to `0.02`). Let `α_t = 1 − β_t` and `ᾱ_t = α_0 · … · α_t`.
Chaining many small Gaussian steps gives one Gaussian, so you can jump straight to any step:

```
x_t = √ᾱ_t · x_0 + √(1 − ᾱ_t) · ε,      ε ~ N(0, I)
```

`ᾱ_t` starts near 1 (almost clean) and falls toward 0 (pure noise). Training picks a random `t`,
builds `x_t` this way, and asks a network to predict `ε`.

### Predicting x₀ and the posterior

Solve the same equation for `x_0` to turn a noise prediction into a clean-image guess:

```
x̂_0 = (x_t − √(1 − ᾱ_t) · ε̂) / √ᾱ_t
```

If you know `x_0`, the step back from `x_t` is also Gaussian, with a closed-form mean and variance:

```
mean = √ᾱ_{t−1} · β_t / (1 − ᾱ_t) · x_0  +  √α_t · (1 − ᾱ_{t−1}) / (1 − ᾱ_t) · x_t
var  = β_t · (1 − ᾱ_{t−1}) / (1 − ᾱ_t)
```

A DDPM sampler plugs `x̂_0` into this mean, adds noise with this variance, and repeats from
`t = T−1` down to 0. At `t = 0` the variance is 0: the last step adds no noise.

### The reparameterization trick

A VAE encoder outputs a mean `μ` and log-variance `log σ²`, and you need a sample `z ~ N(μ, σ²)`.
Sampling directly blocks gradients. Instead, draw the randomness separately and make `z` a plain
function of `μ` and `σ`:

```
z = μ + σ · ε,      σ = exp(0.5 · log σ²),      ε ~ N(0, I)
```

Now gradients flow into `μ` and `σ`, and `ε` is just an input. The network predicts `log σ²` rather
than `σ` so it can output any real number and `σ` stays positive.

### The ELBO loss

A VAE minimises the negative evidence lower bound, which has two parts:

```
loss = reconstruction + β · KL( N(μ, σ²) ‖ N(0, I) )
KL   = −0.5 · Σ_j (1 + log σ²_j − μ_j² − σ²_j)
```

- **Reconstruction** says "decode back to the input". Here it is the sum of squared errors.
- **KL** says "keep every code close to a standard normal", so the latent space has no holes and
  you can sample new points from it.
- **β** sets the trade-off. `β = 0` is a plain autoencoder; larger `β` gives a smoother, more
  disentangled latent space and blurrier reconstructions.

## Problems

| # | Problem | Difficulty | Concept |
|:--|:--------|:-----------|:--------|
| 010 | [Beam Search Decoding](010-beam-search.py) | Medium | Keeping the top-k prefixes, EOS handling, length normalisation |
| 011 | [Diffusion Forward Process (DDPM)](011-diffusion-forward-process.py) | Medium | Noise schedule, `ᾱ_t`, closed-form noising, the reverse-step posterior |
| 012 | [VAE Reparameterization and ELBO Loss](012-vae-reparameterization-elbo.py) | Medium | Sampling with gradients, KL to a standard normal, β-weighted loss |

## Common mistakes

- **Beam search: pruning per beam instead of globally.** Collect the candidates of all beams, then
  keep the top `beam_width` overall.
- **Beam search: expanding finished hypotheses.** Once a prefix ends in EOS, it is done.
- **Beam search: forgetting live hypotheses at `max_len`.** They are still answers; return them.
- **Beam search: using the length penalty while pruning.** Here it only affects the final ranking.
- **Diffusion: off-by-one timesteps.** These problems index `t` from 0. `ᾱ_{t−1}` at `t = 0` is 1.
- **Diffusion: `sqrt(β)` where `sqrt(1 − ᾱ)` belongs.** The noise scale for a direct jump uses the
  cumulative product, not a single step's beta.
- **Diffusion: broadcasting a `(B,)` coefficient against `(B, C, H, W)`.** NumPy aligns trailing
  axes, so reshape it to `(B, 1, 1, 1)` first.
- **VAE: treating `logvar` as the standard deviation.** `σ = exp(0.5 · logvar)`, not `logvar` and
  not `exp(logvar)`.
- **VAE: reducing in the wrong order.** Sum over latent dims (or pixels) first, then average over
  the batch. Averaging over everything shrinks the KL term by a factor of `D` and silently changes
  what `β` means.
- **VAE: sampling `ε` inside the function.** Pass it in, so results are reproducible and testable.

## Suggested order

1. **012** first: a handful of short NumPy formulas, and the idea of moving randomness into an input.
2. **010** next: pure logic, no maths beyond adding logs; watch the tie-break and EOS rules.
3. **011** last: several formulas that must agree with each other; the round trip
   `predict_x0(q_sample(...))` is a good self-check.

Run them from the `ai/` folder with `./practice 010`, `./practice 011` and `./practice 012`.
