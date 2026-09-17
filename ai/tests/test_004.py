import math

import numpy as np
import pytest

from _harness import load

m = load("004")


def test_softmax_uniform_and_rows_sum_to_one():
    assert np.allclose(m.softmax(np.zeros((1, 4))), [[0.25] * 4])
    rng = np.random.default_rng(0)
    L = rng.normal(size=(5, 7))
    p = m.softmax(L)
    assert p.shape == (5, 7)
    assert np.allclose(p.sum(axis=1), 1.0)
    assert np.allclose(m.softmax(L + 123.0), p)


def test_softmax_is_stable_for_huge_logits():
    with np.errstate(over="raise", invalid="raise", divide="raise"):
        p = m.softmax(np.array([[1000.0, 1000.0], [1000.0, -1000.0]]))
    assert np.allclose(p, [[0.5, 0.5], [1.0, 0.0]])


def test_softmax_hand_value():
    p = m.softmax(np.array([[0.0, math.log(3.0)]]))
    assert np.allclose(p, [[0.25, 0.75]])


def test_cross_entropy_values():
    loss = m.cross_entropy(np.zeros((1, 3)), np.array([2]))
    assert isinstance(loss, float)
    assert loss == pytest.approx(math.log(3))
    # mean over rows: row0 -log(0.25), row1 -log(0.75)
    L = np.array([[0.0, math.log(3.0)], [0.0, math.log(3.0)]])
    assert m.cross_entropy(L, np.array([0, 1])) == pytest.approx(
        (-math.log(0.25) - math.log(0.75)) / 2
    )


def test_cross_entropy_is_finite_when_probability_underflows():
    with np.errstate(over="raise", invalid="raise", divide="raise"):
        loss = m.cross_entropy(np.array([[0.0, 1000.0]]), np.array([0]))
    assert loss == pytest.approx(1000.0)


def test_gradient_hand_value_and_no_mutation():
    L = np.zeros((2, 2))
    g = m.cross_entropy_grad(L, np.array([0, 1]))
    assert np.allclose(g, [[-0.25, 0.25], [0.25, -0.25]])
    assert np.array_equal(L, np.zeros((2, 2)))


def test_gradient_matches_finite_differences():
    rng = np.random.default_rng(1)
    L = rng.normal(size=(4, 5))
    y = np.array([0, 3, 4, 1])
    g = m.cross_entropy_grad(L, y)
    assert g.shape == L.shape
    assert np.allclose(g.sum(axis=1), 0.0)
    h = 1e-6
    num = np.zeros_like(L)
    for i in range(4):
        for j in range(5):
            Lp = L.copy(); Lp[i, j] += h
            Lm = L.copy(); Lm[i, j] -= h
            num[i, j] = (m.cross_entropy(Lp, y) - m.cross_entropy(Lm, y)) / (2 * h)
    assert np.allclose(g, num, atol=1e-6)
