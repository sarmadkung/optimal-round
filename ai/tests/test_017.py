import math

import pytest

from _harness import load

m = load("017")

CORPUS = ["the cat sat", "the dog", "cats and dogs"]


def test_tokenize():
    assert m.tokenize("Hello, World! it's GPT_4o-mini 2024") == [
        "hello", "world", "it", "s", "gpt_4o", "mini", "2024",
    ]
    assert m.tokenize("?! ...") == []


def test_single_term_exact_score():
    idf = math.log((3 - 1 + 0.5) / (1 + 0.5) + 1)
    expected = idf * 1 * 2.5 / (1 + 1.5 * (1 - 0.75 + 0.75 * 3 / (8 / 3)))
    scores = m.bm25_scores(CORPUS, "cat")
    assert len(scores) == 3
    assert scores[0] == pytest.approx(expected, rel=1e-9)
    assert expected == pytest.approx(0.9286, abs=1e-4)
    assert scores[1] == 0.0 and scores[2] == 0.0
    assert m.top_k(CORPUS, "cat", 5) == [(0, pytest.approx(expected, rel=1e-9))]


def test_shorter_document_wins_and_idf_always_positive():
    res = m.top_k(CORPUS, "the", 5)
    assert [i for i, _ in res] == [1, 0]
    assert res[0][1] > res[1][1] > 0
    idf = math.log((3 - 2 + 0.5) / (2 + 0.5) + 1)
    assert res[0][1] == pytest.approx(idf * 2.5 / (1 + 1.5 * (0.25 + 0.75 * 2 / (8 / 3))), rel=1e-9)


def test_multi_term_duplicates_count_once_and_custom_params():
    corpus = ["apple apple banana", "banana split", "cherry"]
    s1 = m.bm25_scores(corpus, "apple banana", k1=1.2, b=0.5)
    s2 = m.bm25_scores(corpus, "APPLE apple banana banana", k1=1.2, b=0.5)
    assert s1 == pytest.approx(s2)
    n, avgdl = 3, 6 / 3
    idf_apple = math.log((n - 1 + 0.5) / 1.5 + 1)
    idf_banana = math.log((n - 2 + 0.5) / 2.5 + 1)
    norm0 = 1.2 * (1 - 0.5 + 0.5 * 3 / avgdl)
    expected0 = idf_apple * 2 * 2.2 / (2 + norm0) + idf_banana * 1 * 2.2 / (1 + norm0)
    assert s1[0] == pytest.approx(expected0, rel=1e-9)
    assert s1[2] == 0.0


def test_b_zero_and_ties_broken_by_index():
    corpus = ["zeta alpha", "alpha", "beta", "alpha beta gamma delta"]
    res = m.top_k(corpus, "alpha", 10, b=0.0)
    assert [i for i, _ in res] == [0, 1, 3]
    assert res[0][1] == res[1][1] == res[2][1]


def test_top_k_limits_and_empty_cases():
    corpus = ["a b", "a", "a c d", "e"]
    assert [i for i, _ in m.top_k(corpus, "a", 2)] == [1, 0]
    assert m.top_k(corpus, "a", 0) == []
    assert m.top_k(corpus, "?!", 3) == []
    assert m.bm25_scores(corpus, "zzz") == [0.0, 0.0, 0.0, 0.0]
    assert m.bm25_scores([], "a") == []
    assert m.top_k([], "a", 3) == []
    assert m.bm25_scores(["", "!!"], "a") == [0.0, 0.0]
