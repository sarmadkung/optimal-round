import numpy as np
import pytest

from _harness import load

m = load("001")


def test_recovers_simple_line():
    X = np.array([[1.0], [2.0], [3.0], [4.0]])
    y = np.array([3.0, 5.0, 7.0, 9.0])
    w, b = m.fit(X, y, lr=0.05, epochs=2000)
    assert w.shape == (1,)
    assert w[0] == pytest.approx(2.0, abs=1e-3)
    assert b == pytest.approx(1.0, abs=1e-3)
    assert isinstance(b, float)


def test_zero_epochs_returns_zeros():
    X = np.ones((3, 2))
    w, b = m.fit(X, np.array([1.0, 2.0, 3.0]), lr=0.1, epochs=0)
    assert np.array_equal(w, np.zeros(2))
    assert b == 0.0


def test_one_step_matches_formula():
    X = np.array([[1.0, 2.0], [3.0, 4.0]])
    y = np.array([1.0, -1.0])
    w, b = m.fit(X, y, lr=0.1, epochs=1)
    # pred = 0, err = -y, dw = (2/2)·Xᵀ(-y) = [2, 2], db = 0
    assert np.allclose(w, [-0.2, -0.2])
    assert b == pytest.approx(0.0)


def test_multivariate_fit_and_predict():
    rng = np.random.default_rng(0)
    X = rng.normal(size=(200, 3))
    true_w = np.array([1.5, -2.0, 0.5])
    y = X @ true_w + 4.0
    w, b = m.fit(X, y, lr=0.1, epochs=500)
    assert np.allclose(w, true_w, atol=1e-3)
    assert b == pytest.approx(4.0, abs=1e-3)
    assert np.allclose(m.predict(X[:5], w, b), y[:5], atol=1e-2)
