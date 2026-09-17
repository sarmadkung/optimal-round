import math

import numpy as np
import pytest

from _harness import load

m = load("002")


def test_sigmoid_values_and_stability():
    z = np.array([0.0, 1000.0, -1000.0, 2.0, -2.0])
    with np.errstate(over="raise", invalid="raise", divide="raise"):
        s = m.sigmoid(z)
    assert s.shape == z.shape
    assert s[0] == pytest.approx(0.5)
    assert s[1] == 1.0 and s[2] == 0.0
    assert s[3] == pytest.approx(1 / (1 + math.exp(-2)))
    assert s[3] + s[4] == pytest.approx(1.0)
    assert m.sigmoid(np.zeros((2, 3))).shape == (2, 3)


def test_bce_loss_at_zero_and_large_logits():
    X = np.array([[1.0, 2.0], [3.0, 4.0]])
    y = np.array([1.0, 0.0])
    loss = m.bce_loss(X, y, np.zeros(2), 0.0)
    assert isinstance(loss, float)
    assert loss == pytest.approx(math.log(2))
    # z = [1000, 1000]: first is right (≈0 loss), second costs ≈1000
    with np.errstate(over="raise", invalid="raise", divide="raise"):
        big = m.bce_loss(np.array([[1.0], [1.0]]), y, np.array([1000.0]), 0.0)
    assert big == pytest.approx(500.0)


def test_one_step_matches_formula():
    X = np.array([[1.0, 2.0], [3.0, 4.0]])
    y = np.array([1.0, 0.0])
    w, b = m.fit(X, y, lr=0.1, epochs=1)
    assert w.shape == (2,)
    assert np.allclose(w, [-0.05, -0.05])
    assert b == pytest.approx(0.0)
    assert isinstance(b, float)


def test_zero_epochs_returns_zeros():
    w, b = m.fit(np.ones((3, 2)), np.array([1.0, 0.0, 1.0]), lr=0.1, epochs=0)
    assert np.array_equal(w, np.zeros(2))
    assert b == 0.0


def test_learns_separable_blobs():
    rng = np.random.default_rng(0)
    X0 = rng.normal(loc=-2.0, size=(100, 2))
    X1 = rng.normal(loc=2.0, size=(100, 2))
    X = np.vstack([X0, X1])
    y = np.concatenate([np.zeros(100), np.ones(100)])
    loss0 = m.bce_loss(X, y, np.zeros(2), 0.0)
    w, b = m.fit(X, y, lr=0.5, epochs=300)
    assert m.bce_loss(X, y, w, b) < loss0 / 4
    pred = m.predict(X, w, b)
    assert pred.shape == (200,)
    assert np.issubdtype(pred.dtype, np.integer)
    assert (pred == y).mean() >= 0.97
    proba = m.predict_proba(X, w, b)
    assert proba.shape == (200,)
    assert np.all((proba >= 0) & (proba <= 1))


def test_predict_threshold_half_is_class_one():
    X = np.array([[0.0], [1.0], [-1.0]])
    w = np.array([3.0])
    assert m.predict_proba(X, w, 0.0)[0] == pytest.approx(0.5)
    assert m.predict(X, w, 0.0).tolist() == [1, 1, 0]
