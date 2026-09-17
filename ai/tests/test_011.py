import math

import numpy as np
import pytest

from _harness import load

m = load("011")


def test_schedule_and_cumprod():
    b = m.linear_beta_schedule(1000)
    assert b.shape == (1000,)
    assert b[0] == pytest.approx(1e-4) and b[-1] == pytest.approx(0.02)
    assert np.allclose(np.diff(b), np.diff(b)[0])
    assert np.allclose(m.linear_beta_schedule(2, 0.1, 0.2), [0.1, 0.2])
    abar = m.alphas_cumprod(np.array([0.1, 0.2]))
    assert np.allclose(abar, [0.9, 0.72])
    full = m.alphas_cumprod(b)
    assert np.all(np.diff(full) < 0) and 0 < full[-1] < 1e-3


def test_q_sample_hand_computed():
    x = m.q_sample(np.array([[1.0]]), np.array([1]), np.array([[1.0]]), np.array([0.9, 0.72]))
    assert x.shape == (1, 1)
    assert x[0, 0] == pytest.approx(math.sqrt(0.72) + math.sqrt(0.28))


def test_q_sample_per_example_timesteps_4d():
    abar = np.array([0.9, 0.72, 0.5])
    x0 = np.ones((2, 1, 2, 2))
    noise = np.full((2, 1, 2, 2), 2.0)
    x = m.q_sample(x0, np.array([0, 2]), noise, abar)
    assert x.shape == (2, 1, 2, 2)
    assert np.allclose(x[0], math.sqrt(0.9) + 2 * math.sqrt(0.1))
    assert np.allclose(x[1], math.sqrt(0.5) + 2 * math.sqrt(0.5))


def test_predict_x0_inverts_q_sample():
    rng = np.random.default_rng(0)
    abar = m.alphas_cumprod(m.linear_beta_schedule(100))
    x0 = rng.normal(size=(8, 5))
    eps = rng.normal(size=(8, 5))
    t = rng.integers(0, 100, size=8)
    xt = m.q_sample(x0, t, eps, abar)
    assert np.allclose(m.predict_x0(xt, t, eps, abar), x0)


def test_q_sample_statistics():
    rng = np.random.default_rng(1)
    abar = m.alphas_cumprod(m.linear_beta_schedule(50))
    n = 20000
    x0 = np.full((n, 1), 3.0)
    t = np.full(n, 30)
    xt = m.q_sample(x0, t, rng.normal(size=(n, 1)), abar)
    assert xt.mean() == pytest.approx(math.sqrt(abar[30]) * 3.0, abs=0.03)
    assert xt.var() == pytest.approx(1 - abar[30], abs=0.03)


def test_posterior_hand_computed():
    mean, var = m.posterior_mean_variance(
        np.array([[1.0]]), np.array([[2.0]]), np.array([1]), np.array([0.1, 0.2])
    )
    expected = math.sqrt(0.9) * 0.2 / 0.28 + math.sqrt(0.8) * 0.1 / 0.28 * 2
    assert mean.shape == (1, 1) and var.shape == (1,)
    assert mean[0, 0] == pytest.approx(expected)
    assert var[0] == pytest.approx(1 / 14)


def test_posterior_at_t0_and_bounds():
    rng = np.random.default_rng(2)
    betas = m.linear_beta_schedule(20)
    x0 = rng.normal(size=(20, 3))
    xt = rng.normal(size=(20, 3))
    t = np.arange(20)
    mean, var = m.posterior_mean_variance(x0, xt, t, betas)
    assert mean.shape == (20, 3) and var.shape == (20,)
    assert np.allclose(mean[0], x0[0]) and var[0] == pytest.approx(0.0, abs=1e-15)
    assert np.all(var[1:] > 0) and np.all(var <= betas + 1e-15)
