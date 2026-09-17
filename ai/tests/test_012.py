import math

import numpy as np
import pytest

from _harness import load

m = load("012")


def test_reparameterize_exact():
    z = m.reparameterize(np.array([[1.0, 2.0]]), np.array([[0.0, math.log(4.0)]]), np.array([[0.5, -1.0]]))
    assert z.shape == (1, 2)
    assert np.allclose(z, [[1.5, 0.0]])


def test_reparameterize_moments():
    rng = np.random.default_rng(0)
    n = 50000
    mu = np.tile([[2.0, -1.0]], (n, 1))
    logvar = np.tile([[math.log(9.0), math.log(0.25)]], (n, 1))
    z = m.reparameterize(mu, logvar, rng.normal(size=(n, 2)))
    assert np.allclose(z.mean(axis=0), [2.0, -1.0], atol=0.05)
    assert np.allclose(z.std(axis=0), [3.0, 0.5], atol=0.05)


def test_kl_hand_values():
    assert m.kl_divergence(np.zeros((3, 4)), np.zeros((3, 4))) == 0.0
    assert m.kl_divergence(np.array([[1.0]]), np.array([[0.0]])) == pytest.approx(0.5)
    assert m.kl_divergence(np.array([[0.0]]), np.array([[math.log(4.0)]])) == pytest.approx(
        -0.5 * (1 + math.log(4.0) - 4.0)
    )
    assert isinstance(m.kl_divergence(np.array([[1.0]]), np.array([[0.0]])), float)


def test_kl_sums_dims_and_averages_batch():
    mu = np.array([[1.0, 1.0], [0.0, 0.0]])  # example KLs: 1.0 and 0.0
    logvar = np.zeros((2, 2))
    assert m.kl_divergence(mu, logvar) == pytest.approx(0.5)
    rng = np.random.default_rng(1)
    assert m.kl_divergence(rng.normal(size=(16, 8)), rng.normal(size=(16, 8))) >= 0.0


def test_reconstruction_sum_over_features_mean_over_batch():
    x = np.array([[1.0, 2.0], [0.0, 0.0]])
    xr = np.array([[1.0, 0.0], [1.0, 1.0]])
    r = m.reconstruction_loss(x, xr)
    assert r == pytest.approx(3.0) and isinstance(r, float)
    img = np.ones((2, 1, 2, 2))
    assert m.reconstruction_loss(img, np.zeros_like(img)) == pytest.approx(4.0)


def test_elbo_composition_and_beta():
    x = np.array([[1.0, 2.0], [0.0, 0.0]])
    xr = np.array([[1.0, 0.0], [1.0, 1.0]])
    mu, logvar = np.array([[1.0], [1.0]]), np.zeros((2, 1))
    loss, recon, kl = m.elbo_loss(x, xr, mu, logvar, beta=2.0)
    assert (loss, recon, kl) == pytest.approx((4.0, 3.0, 0.5))
    assert all(isinstance(v, float) for v in (loss, recon, kl))
    assert m.elbo_loss(x, xr, mu, logvar)[0] == pytest.approx(3.5)
    assert m.elbo_loss(x, xr, mu, logvar, beta=0.0)[0] == pytest.approx(3.0)
