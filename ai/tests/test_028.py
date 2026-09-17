import numpy as np
import pytest

from _harness import load

m = load("028")


def make(seed, B, T, d):
    rng = np.random.default_rng(seed)
    X = rng.normal(size=(B, T, d))
    Ws = [rng.normal(size=(d, d)) / np.sqrt(d) for _ in range(4)]
    return X, Ws


def loop_reference(X, W_q, W_k, W_v, W_o, h, causal):
    """Slow, obvious version: one sequence, one head at a time."""
    B, T, d = X.shape
    dh = d // h
    out = np.zeros((B, T, d))
    weights = np.zeros((B, h, T, T))
    for b in range(B):
        Q, K, V = X[b] @ W_q.T, X[b] @ W_k.T, X[b] @ W_v.T
        head_outputs = []
        for i in range(h):
            q, k, v = (M[:, i * dh:(i + 1) * dh] for M in (Q, K, V))
            s = q @ k.T / np.sqrt(dh)
            for t in range(T):
                row = s[t].copy()
                if causal:
                    row[t + 1:] = -np.inf
                row = row - row.max()
                e = np.exp(row)
                weights[b, i, t] = e / e.sum()
            head_outputs.append(weights[b, i] @ v)
        out[b] = np.concatenate(head_outputs, axis=1) @ W_o.T
    return out, weights


def test_shapes_and_rows_sum_to_one():
    X, Ws = make(0, 2, 5, 8)
    out, w = m.multi_head_attention(X, *Ws, n_heads=4)
    assert out.shape == (2, 5, 8)
    assert w.shape == (2, 4, 5, 5)
    assert np.allclose(w.sum(axis=-1), 1.0)


def test_matches_per_head_loop():
    X, Ws = make(1, 3, 6, 12)
    out, w = m.multi_head_attention(X, *Ws, n_heads=3)
    ref_out, ref_w = loop_reference(X, *Ws, 3, causal=False)
    assert np.allclose(out, ref_out)
    assert np.allclose(w, ref_w)


def test_matches_per_head_loop_causal():
    X, Ws = make(2, 2, 7, 8)
    out, w = m.multi_head_attention(X, *Ws, n_heads=2, causal=True)
    ref_out, ref_w = loop_reference(X, *Ws, 2, causal=True)
    assert np.allclose(out, ref_out)
    assert np.allclose(w, ref_w)


def test_causal_mask_blocks_the_future():
    X, Ws = make(3, 2, 5, 8)
    out, w = m.multi_head_attention(X, *Ws, n_heads=4, causal=True)
    assert np.all(w[..., np.triu_indices(5, k=1)[0], np.triu_indices(5, k=1)[1]] == 0.0)
    X2 = X.copy()
    X2[:, 4] = 100.0
    out2, _ = m.multi_head_attention(X2, *Ws, n_heads=4, causal=True)
    assert np.allclose(out[:, :4], out2[:, :4])
    assert not np.allclose(out[:, 4], out2[:, 4])
    # without the mask, the future leaks into earlier positions
    nc, _ = m.multi_head_attention(X, *Ws, n_heads=4)
    nc2, _ = m.multi_head_attention(X2, *Ws, n_heads=4)
    assert not np.allclose(nc[:, :4], nc2[:, :4])


def test_single_head_is_classic_attention():
    X, (W_q, W_k, W_v, W_o) = make(4, 1, 4, 6)
    out, w = m.multi_head_attention(X, W_q, W_k, W_v, W_o, n_heads=1)
    Q, K, V = X[0] @ W_q.T, X[0] @ W_k.T, X[0] @ W_v.T
    s = Q @ K.T / np.sqrt(6)
    e = np.exp(s - s.max(axis=1, keepdims=True))
    A = e / e.sum(axis=1, keepdims=True)
    assert np.allclose(out[0], (A @ V) @ W_o.T)
    assert np.allclose(w[0, 0], A)


def test_single_token_and_bad_head_count():
    X, Ws = make(5, 2, 1, 4)
    out, w = m.multi_head_attention(X, *Ws, n_heads=2, causal=True)
    assert np.allclose(w, 1.0)
    assert np.allclose(out, X @ Ws[2].T @ Ws[3].T)
    X, Ws = make(6, 1, 3, 6)
    with pytest.raises(ValueError):
        m.multi_head_attention(X, *Ws, n_heads=4)


def test_numerically_stable_for_large_inputs():
    X, Ws = make(7, 2, 6, 8)
    for causal in (False, True):
        out, w = m.multi_head_attention(X * 1e4, *Ws, n_heads=2, causal=causal)
        assert np.all(np.isfinite(out))
        assert np.all(np.isfinite(w))
        assert np.allclose(w.sum(axis=-1), 1.0)
