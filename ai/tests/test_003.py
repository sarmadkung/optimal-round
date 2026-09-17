import numpy as np
import pytest

from _harness import load

m = load("003")

X4 = np.array([[0.0], [1.0], [10.0], [11.0]])


def test_hand_example_converges():
    init = np.array([[0.0], [1.0]])
    C, labels, inertia = m.kmeans(X4, init)
    assert C.shape == (2, 1)
    assert np.allclose(C, [[0.5], [10.5]])
    assert labels.tolist() == [0, 0, 1, 1]
    assert np.issubdtype(labels.dtype, np.integer)
    assert isinstance(inertia, float)
    assert inertia == pytest.approx(1.0)
    assert np.array_equal(init, [[0.0], [1.0]])  # input not modified


def test_max_iters_one_stops_after_one_update():
    C, labels, inertia = m.kmeans(X4, np.array([[0.0], [1.0]]), max_iters=1)
    assert np.allclose(C, [[0.0], [22 / 3]])
    assert labels.tolist() == [0, 0, 1, 1]
    assert inertia == pytest.approx(1 + 64 / 9 + 121 / 9)


def test_max_iters_zero_uses_initial_centroids():
    init = np.array([[0.0], [1.0]])
    C, labels, inertia = m.kmeans(X4, init, max_iters=0)
    assert np.array_equal(C, init)
    assert labels.tolist() == [0, 1, 1, 1]
    assert inertia == pytest.approx(0 + 0 + 81 + 100)


def test_empty_cluster_keeps_old_centroid():
    init = np.array([[0.0], [11.0], [1000.0]])
    C, labels, inertia = m.kmeans(X4, init)
    assert np.allclose(C, [[0.5], [10.5], [1000.0]])
    assert labels.tolist() == [0, 0, 1, 1]
    assert inertia == pytest.approx(1.0)


def test_tie_goes_to_lowest_index_and_k_equals_one():
    C, labels, inertia = m.kmeans(np.array([[1.0]]), np.array([[0.0], [2.0]]), max_iters=0)
    assert labels.tolist() == [0]
    X = np.array([[0.0, 0.0], [2.0, 0.0], [4.0, 6.0]])
    C, labels, inertia = m.kmeans(X, np.array([[100.0, 100.0]]))
    assert np.allclose(C, [[2.0, 2.0]])
    assert labels.tolist() == [0, 0, 0]
    assert inertia == pytest.approx(8 + 4 + 20)


def test_three_gaussian_blobs():
    rng = np.random.default_rng(42)
    centers = np.array([[0.0, 0.0], [10.0, 0.0], [0.0, 10.0]])
    X = np.vstack([c + rng.normal(scale=0.5, size=(50, 2)) for c in centers])
    init = np.array([[1.0, 1.0], [8.0, 1.0], [1.0, 8.0]])
    C, labels, inertia = m.kmeans(X, init)
    assert np.allclose(C, centers, atol=0.3)
    assert labels.tolist() == [0] * 50 + [1] * 50 + [2] * 50
    expected = sum(((X[labels == j] - C[j]) ** 2).sum() for j in range(3))
    assert inertia == pytest.approx(expected)
