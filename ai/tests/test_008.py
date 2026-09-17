import numpy as np

from _harness import load

m = load("008")


def small_example():
    Q = np.array([[[1.0], [1.0]]])
    K = np.array([[[0.0], [np.log(3.0)]]])
    V = np.array([[[10.0], [20.0]]])
    return Q, K, V


def test_exact_small_example_non_causal():
    out, w = m.attention(*small_example())
    assert w.shape == (1, 2, 2) and out.shape == (1, 2, 1)
    assert np.allclose(w, [[[0.25, 0.75], [0.25, 0.75]]])
    assert np.allclose(out, [[[17.5], [17.5]]])


def test_exact_small_example_causal():
    out, w = m.attention(*small_example(), causal=True)
    assert np.allclose(w, [[[1.0, 0.0], [0.25, 0.75]]])
    assert np.allclose(out, [[[10.0], [17.5]]])


def test_causal_mask_values():
    mask = m.causal_mask(3)
    assert mask.shape == (3, 3)
    assert np.array_equal(np.isneginf(mask), np.triu(np.ones((3, 3), dtype=bool), k=1))
    assert np.all(mask[np.tril_indices(3)] == 0.0)


def test_rows_sum_to_one_and_future_weights_are_zero():
    rng = np.random.default_rng(0)
    B, T, dk, dv = 3, 6, 4, 5
    Q, K = rng.normal(size=(B, T, dk)), rng.normal(size=(B, T, dk))
    V = rng.normal(size=(B, T, dv))
    out, w = m.attention(Q, K, V, causal=True)
    assert out.shape == (B, T, dv) and w.shape == (B, T, T)
    assert np.allclose(w.sum(axis=-1), 1.0)
    future = np.triu(np.ones((T, T), dtype=bool), k=1)
    assert np.all(w[:, future] == 0.0)
    assert np.allclose(out[:, 0], V[:, 0])
    # matches the formula
    s = Q @ K.transpose(0, 2, 1) / np.sqrt(dk)
    s = np.where(future, -np.inf, s)
    e = np.exp(s - s.max(axis=-1, keepdims=True))
    ref = e / e.sum(axis=-1, keepdims=True)
    assert np.allclose(w, ref) and np.allclose(out, ref @ V)


def test_causal_output_ignores_future_tokens():
    rng = np.random.default_rng(1)
    Q, K, V = (rng.normal(size=(2, 5, 3)) for _ in range(3))
    out1, _ = m.attention(Q, K, V, causal=True)
    K2, V2 = K.copy(), V.copy()
    K2[:, 3:] += 5.0
    V2[:, 3:] -= 7.0
    out2, _ = m.attention(Q, K2, V2, causal=True)
    assert np.allclose(out1[:, :3], out2[:, :3])
    assert not np.allclose(out1[:, 3:], out2[:, 3:])


def test_cross_attention_shapes_and_single_token():
    rng = np.random.default_rng(2)
    Q = rng.normal(size=(2, 3, 4))
    K = rng.normal(size=(2, 7, 4))
    V = rng.normal(size=(2, 7, 6))
    out, w = m.attention(Q, K, V)
    assert out.shape == (2, 3, 6) and w.shape == (2, 3, 7)
    assert np.allclose(w.sum(axis=-1), 1.0)
    out1, w1 = m.attention(Q[:, :1], K[:, :1], V[:, :1], causal=True)
    assert np.allclose(w1, 1.0) and np.allclose(out1, V[:, :1])


def test_softmax_is_numerically_stable():
    x = np.array([[1000.0, 1000.0, -np.inf], [0.0, np.log(3.0), -1e4]])
    p = m.softmax(x, axis=-1)
    assert np.all(np.isfinite(p))
    assert np.allclose(p[0], [0.5, 0.5, 0.0]) and p[0, 2] == 0.0
    assert np.allclose(p[1], [0.25, 0.75, 0.0])
    Q = np.full((1, 2, 1), 100.0)
    out, w = m.attention(Q, Q * 10, np.ones((1, 2, 1)))
    assert np.all(np.isfinite(w)) and np.all(np.isfinite(out))
