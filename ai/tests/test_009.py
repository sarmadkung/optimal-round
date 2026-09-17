import math

import numpy as np
import pytest

from _harness import load

m = load("009")

L = np.log([0.5, 0.2, 0.2, 0.1])


def test_greedy_and_ties():
    assert m.greedy(L) == 0
    assert m.greedy(np.array([1.0, 3.0, 3.0, 2.0])) == 1
    assert isinstance(m.greedy(L), int)


def test_plain_softmax_and_temperature():
    assert np.allclose(m.filtered_probs(L), [0.5, 0.2, 0.2, 0.1])
    p = m.filtered_probs(np.array([0.0, math.log(4.0)]), temperature=2.0)
    assert np.allclose(p, [1 / 3, 2 / 3])
    cold = m.filtered_probs(L, temperature=0.1)
    hot = m.filtered_probs(L, temperature=10.0)
    assert cold[0] > 0.99 and hot.max() - hot.min() < 0.2
    big = m.filtered_probs(np.array([1000.0, 999.0, -1000.0]))
    assert np.all(np.isfinite(big)) and big.sum() == pytest.approx(1.0)


def test_top_k_exact_with_index_tie_break():
    assert np.allclose(m.filtered_probs(L, top_k=2), [5 / 7, 2 / 7, 0, 0])
    assert np.allclose(m.filtered_probs(L, top_k=1), [1, 0, 0, 0])
    assert np.allclose(m.filtered_probs(L, top_k=10), [0.5, 0.2, 0.2, 0.1])


def test_top_p_inclusion_rule():
    assert np.allclose(m.filtered_probs(L, top_p=0.75), [5 / 9, 2 / 9, 2 / 9, 0])
    assert np.allclose(m.filtered_probs(L, top_p=0.7), [5 / 7, 2 / 7, 0, 0])
    assert np.allclose(m.filtered_probs(L, top_p=0.01), [1, 0, 0, 0])
    assert np.allclose(m.filtered_probs(L, top_p=1.0), [0.5, 0.2, 0.2, 0.1])


def test_composition_order_temperature_then_k_then_p():
    logits = np.log([0.4, 0.3, 0.2, 0.1]) * 2.0  # temperature 2 undoes the *2
    # after temperature: [.4,.3,.2,.1]; top_k=3 -> [4/9, 3/9, 2/9, 0]
    # top_p=0.7 on that: running sums .444, .778 -> keep two -> [4/7, 3/7, 0, 0]
    p = m.filtered_probs(logits, temperature=2.0, top_k=3, top_p=0.7)
    assert np.allclose(p, [4 / 7, 3 / 7, 0, 0])
    assert p.dtype == np.float64


def test_sample_uses_one_rng_choice():
    logits = np.log([0.1, 0.2, 0.3, 0.4])
    for seed in range(5):
        expected = int(np.random.default_rng(seed).choice(4, p=m.filtered_probs(logits, 0.8, 3, 0.9)))
        got = m.sample(logits, np.random.default_rng(seed), temperature=0.8, top_k=3, top_p=0.9)
        assert got == expected and isinstance(got, int)


def test_temperature_zero_is_greedy_and_does_not_use_rng():
    rng = np.random.default_rng(3)
    before = rng.bit_generator.state
    assert m.sample(np.array([0.1, 2.0, 2.0]), rng, temperature=0) == 1
    assert rng.bit_generator.state == before


def test_filtered_tokens_are_never_sampled():
    rng = np.random.default_rng(7)
    logits = np.log([0.3, 0.25, 0.25, 0.2])
    draws = [m.sample(logits, rng, top_k=2) for _ in range(2000)]
    assert set(draws) == {0, 1}
    assert np.mean(np.array(draws) == 0) == pytest.approx(0.3 / 0.55, abs=0.04)
