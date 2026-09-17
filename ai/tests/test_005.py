import math

import numpy as np
import pytest

from _harness import load

m = load("005")


def tiny():
    return {
        "W1": np.array([[1.0]]),
        "b1": np.array([0.0]),
        "W2": np.array([[1.0], [-1.0]]),
        "b2": np.array([0.0, 0.0]),
    }


def random_params(rng, d, h, C):
    return {
        "W1": rng.normal(size=(h, d)),
        "b1": rng.normal(size=h) * 0.1,
        "W2": rng.normal(size=(C, h)),
        "b2": rng.normal(size=C) * 0.1,
    }


def test_forward_hand_value():
    loss, _ = m.forward(tiny(), np.array([[1.0]]), np.array([0]))
    assert isinstance(loss, float)
    assert loss == pytest.approx(math.log(1 + math.exp(-2)))


def test_backward_hand_value():
    params = tiny()
    _, cache = m.forward(params, np.array([[1.0]]), np.array([0]))
    g = m.backward(params, cache)
    p0 = 1 / (1 + math.exp(-2))
    assert set(g) == {"W1", "b1", "W2", "b2"}
    assert np.allclose(g["W2"], [[p0 - 1], [1 - p0]])
    assert np.allclose(g["b2"], [p0 - 1, 1 - p0])
    assert np.allclose(g["W1"], [[2 * (p0 - 1)]])
    assert np.allclose(g["b1"], [2 * (p0 - 1)])


def test_gradient_check_and_shapes():
    rng = np.random.default_rng(0)
    params = random_params(rng, d=3, h=4, C=3)
    X = rng.normal(size=(6, 3))
    y = rng.integers(0, 3, size=6)
    before = {k: v.copy() for k, v in params.items()}
    _, cache = m.forward(params, X, y)
    grads = m.backward(params, cache)
    for k in params:
        assert np.array_equal(params[k], before[k])  # not modified
    h = 1e-6
    for k, P in params.items():
        assert grads[k].shape == P.shape
        num = np.zeros_like(P)
        for idx in np.ndindex(P.shape):
            old = P[idx]
            P[idx] = old + h
            lp, _ = m.forward(params, X, y)
            P[idx] = old - h
            lm, _ = m.forward(params, X, y)
            P[idx] = old
            num[idx] = (lp - lm) / (2 * h)
        assert np.allclose(grads[k], num, atol=1e-5), k


def test_dead_relu_has_zero_first_layer_grads():
    rng = np.random.default_rng(3)
    params = random_params(rng, d=2, h=3, C=2)
    params["W1"][1] = 0.0
    params["b1"][1] = -5.0  # unit 1 is always off
    X = rng.normal(size=(5, 2))
    y = np.array([0, 1, 0, 1, 1])
    _, cache = m.forward(params, X, y)
    g = m.backward(params, cache)
    assert np.all(g["W1"][1] == 0.0)
    assert g["b1"][1] == 0.0


def test_training_with_grads_reduces_loss_and_predicts():
    rng = np.random.default_rng(7)
    X = rng.normal(size=(200, 2))
    y = (X[:, 0] * X[:, 1] > 0).astype(int)  # XOR-like, not linearly separable
    params = random_params(rng, d=2, h=16, C=2)
    loss0, _ = m.forward(params, X, y)
    for _ in range(1500):
        _, cache = m.forward(params, X, y)
        g = m.backward(params, cache)
        for k in params:
            params[k] -= 0.2 * g[k]
    loss1, _ = m.forward(params, X, y)
    assert loss1 < loss0 / 2
    pred = m.predict(params, X)
    assert pred.shape == (200,)
    assert (pred == y).mean() >= 0.9


def test_predict_tie_goes_to_lowest_class():
    params = {
        "W1": np.zeros((2, 2)),
        "b1": np.zeros(2),
        "W2": np.zeros((3, 2)),
        "b2": np.array([0.0, 1.0, 1.0]),
    }
    assert m.predict(params, np.ones((2, 2))).tolist() == [1, 1]
