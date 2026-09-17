import numpy as np
import pytest

from _harness import load

m = load("030")


def make(seed, n=4, d_in=5, d_out=3, r=2, alpha=4.0):
    rng = np.random.default_rng(seed)
    W = rng.normal(size=(d_out, d_in))
    A = rng.normal(size=(r, d_in))
    x = rng.normal(size=(n, d_in))
    return rng, W, A, x, alpha


def test_init_output_equals_base_layer():
    _, W, A, x, alpha = make(0)
    layer = m.LoRALinear(W, A, alpha)
    assert layer.r == 2
    assert layer.scale == pytest.approx(2.0)
    assert np.array_equal(layer.B, np.zeros((3, 2)))
    assert np.allclose(layer.forward(x), x @ W.T)


def test_example_forward_and_merge():
    W = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
    A = np.array([[1.0, 1.0]])
    layer = m.LoRALinear(W, A, alpha=2)
    assert np.allclose(layer.forward(np.array([[1.0, 0.0]])), [[1, 3, 5]])
    layer.B = np.array([[1.0], [0.0], [-1.0]])
    assert np.allclose(layer.forward(np.array([[1.0, 0.0]])), [[3, 3, 3]])
    assert np.allclose(layer.merge(), [[3, 4], [3, 4], [3, 4]])


def test_merge_matches_forward_and_does_not_mutate():
    rng, W, A, x, alpha = make(1, r=3)
    layer = m.LoRALinear(W, A, alpha)
    layer.B = rng.normal(size=(3, 3))
    merged = layer.merge()
    assert merged.shape == W.shape
    assert np.allclose(x @ merged.T, layer.forward(x))
    assert np.allclose(layer.W, W)
    W[0, 0] = 999.0  # the layer keeps its own copy
    assert layer.W[0, 0] != 999.0


def numeric_grad(f, P, eps=1e-6):
    g = np.zeros_like(P)
    for idx in np.ndindex(P.shape):
        old = P[idx]
        P[idx] = old + eps
        up = f()
        P[idx] = old - eps
        down = f()
        P[idx] = old
        g[idx] = (up - down) / (2 * eps)
    return g


def test_gradients_match_numerical_check():
    rng, W, A, x, alpha = make(2, n=6, d_in=5, d_out=4, r=2, alpha=3.0)
    layer = m.LoRALinear(W, A, alpha)
    layer.B = rng.normal(size=(4, 2))
    G = rng.normal(size=(6, 4))  # loss = sum(forward(x) * G), so dLoss/dy = G

    def loss():
        return float(np.sum(layer.forward(x) * G))

    layer.forward(x)
    dx, dA, dB = layer.backward(G)
    assert dx.shape == x.shape and dA.shape == (2, 5) and dB.shape == (4, 2)
    assert np.allclose(dA, numeric_grad(loss, layer.A), atol=1e-5)
    assert np.allclose(dB, numeric_grad(loss, layer.B), atol=1e-5)
    assert np.allclose(dx, numeric_grad(loss, x), atol=1e-5)


def test_at_init_only_B_gets_gradient():
    rng, W, A, x, alpha = make(3)
    layer = m.LoRALinear(W, A, alpha)
    layer.forward(x)
    G = rng.normal(size=(4, 3))
    dx, dA, dB = layer.backward(G)
    assert np.allclose(dA, 0.0)
    assert not np.allclose(dB, 0.0)
    assert np.allclose(dx, G @ W)


def test_backward_does_not_touch_parameters_and_needs_forward():
    rng, W, A, x, alpha = make(4)
    layer = m.LoRALinear(W, A, alpha)
    with pytest.raises(RuntimeError):
        layer.backward(np.ones((4, 3)))
    layer.B = rng.normal(size=(3, 2))
    before = (layer.W.copy(), layer.A.copy(), layer.B.copy())
    layer.forward(x)
    layer.backward(rng.normal(size=(4, 3)))
    assert all(np.array_equal(a, b) for a, b in zip(before, (layer.W, layer.A, layer.B)))


def test_training_the_adapter_fits_a_low_rank_shift():
    rng, W, A, x, alpha = make(5, n=64, d_in=6, d_out=4, r=2, alpha=2.0)
    x = rng.normal(size=(64, 6))
    target_delta = rng.normal(size=(4, 2)) @ rng.normal(size=(2, 6))
    y_target = x @ (W + target_delta).T
    layer = m.LoRALinear(W, A * 0.1, alpha)
    losses = []
    for _ in range(300):
        y = layer.forward(x)
        losses.append(float(np.mean(np.sum((y - y_target) ** 2, axis=1))))
        _, dA, dB = layer.backward(2 * (y - y_target) / len(x))
        layer.A = layer.A - 0.01 * dA
        layer.B = layer.B - 0.01 * dB
    assert losses[-1] < 1e-3 * losses[0]
    assert np.allclose(layer.W, W)


def test_shape_validation():
    with pytest.raises(ValueError):
        m.LoRALinear(np.ones((3, 4)), np.ones((2, 5)), 1.0)
    with pytest.raises(ValueError):
        m.LoRALinear(np.ones((3, 4)), np.ones(4), 1.0)
