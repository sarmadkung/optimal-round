import math

import numpy as np
import pytest

from _harness import load

m = load("006")


def test_adam_first_step_exact_and_in_place():
    p = np.array([0.0])
    opt = m.Adam(lr=0.1)
    assert opt.t == 0
    opt.step([p], [np.array([2.0])])
    assert opt.t == 1
    assert p[0] == pytest.approx(-0.1 * 2.0 / (2.0 + 1e-8), abs=1e-15)


def test_adam_second_step_exact():
    p = np.array([0.0])
    opt = m.Adam(lr=0.1)
    opt.step([p], [np.array([2.0])])
    opt.step([p], [np.array([-1.0])])
    # t=2: m = 0.9·0.2 + 0.1·(-1) = 0.08 ; v = 0.999·0.004 + 0.001·1 = 0.004996
    m_hat = 0.08 / (1 - 0.9**2)
    v_hat = 0.004996 / (1 - 0.999**2)
    expected = -0.1 * 2.0 / (2.0 + 1e-8) - 0.1 * m_hat / (math.sqrt(v_hat) + 1e-8)
    assert opt.t == 2
    assert p[0] == pytest.approx(expected, rel=1e-9)


def test_adam_first_step_is_lr_sign_and_zero_grad_does_nothing():
    p = np.array([1.0, 1.0, 1.0])
    q = np.array([[5.0, 5.0]])
    opt = m.Adam(lr=0.01)
    opt.step([p, q], [np.array([1e3, -1e-3, 0.0]), np.array([[0.0, 7.0]])])
    assert np.allclose(p, [0.99, 1.01, 1.0], atol=1e-8)
    assert np.allclose(q, [[5.0, 4.99]], atol=1e-8)


def test_adam_minimises_quadratic():
    target = np.array([3.0, -2.0, 0.5])
    w = np.zeros(3)
    opt = m.Adam(lr=0.05)
    for _ in range(2000):
        opt.step([w], [2 * (w - target)])
    assert np.allclose(w, target, atol=1e-3)


def test_sgd_momentum_exact_steps():
    p = np.array([0.0])
    opt = m.SGDMomentum(lr=0.1, momentum=0.9)
    opt.step([p], [np.array([1.0])])
    assert p[0] == pytest.approx(-0.1)
    opt.step([p], [np.array([1.0])])
    assert p[0] == pytest.approx(-0.29)


def test_sgd_momentum_independent_state_and_in_place():
    a = np.array([0.0])
    b = np.array([[0.0, 0.0]])
    ids = (id(a), id(b))
    opt = m.SGDMomentum(lr=1.0, momentum=0.5)
    opt.step([a, b], [np.array([1.0]), np.array([[0.0, 2.0]])])
    opt.step([a, b], [np.array([0.0]), np.array([[0.0, 2.0]])])
    # a: buf 1 -> 0.5, p = -1 - 0.5 ; b[1]: buf 2 -> 3, p = -2 - 3
    assert (id(a), id(b)) == ids
    assert np.allclose(a, [-1.5])
    assert np.allclose(b, [[0.0, -5.0]])


def test_sgd_momentum_minimises_quadratic():
    target = np.array([1.0, -4.0])
    w = np.zeros(2)
    opt = m.SGDMomentum(lr=0.05, momentum=0.9)
    for _ in range(500):
        opt.step([w], [2 * (w - target)])
    assert np.allclose(w, target, atol=1e-4)
