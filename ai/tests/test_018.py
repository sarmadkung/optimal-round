import math

import pytest

from _fakes import FakeEmbedder
from _harness import load

m = load("018")

VECS = {
    "query": [1.0, 0.0],
    "exact": [2.0, 0.0],      # cosine 1.0
    "close": [6.0, 8.0],      # cosine exactly 0.6
    "close too": [3.0, 4.0],  # cosine exactly 0.6 (tie with "close")
    "far": [0.0, 1.0],        # cosine 0.0
    "empty": [0.0, 0.0],      # zero vector -> 0.0
    "opposite": [-1.0, 0.0],  # cosine -1.0
}


class CountingEmbed:
    def __init__(self):
        self.calls = []

    def __call__(self, text):
        self.calls.append(text)
        return VECS[text]


CHUNKS = [
    {"id": "c_opp", "text": "opposite"},
    {"id": "c_close", "text": "close"},
    {"id": "c_far", "text": "far"},
    {"id": "c_exact", "text": "exact"},
    {"id": "c_close2", "text": "close too"},
    {"id": "c_empty", "text": "empty"},
]


def test_cosine():
    assert m.cosine([1.0, 0.0], [1.0, 1.0]) == pytest.approx(1 / math.sqrt(2))
    assert m.cosine([1.0, 2.0], [-1.0, -2.0]) == pytest.approx(-1.0)
    assert m.cosine([0.0, 0.0], [1.0, 1.0]) == 0.0
    assert m.cosine([3.0, 4.0], [0.0, 0.0]) == 0.0


def test_dense_rank_order_ties_and_embed_calls():
    embed = CountingEmbed()
    assert m.dense_rank("query", CHUNKS, embed) == ["c_exact", "c_close", "c_close2", "c_far", "c_empty", "c_opp"]
    assert sorted(embed.calls) == sorted(["query"] + [c["text"] for c in CHUNKS])


def test_dense_rank_with_fake_embedder():
    chunks = [
        {"id": "a", "text": "pasta recipes with tomato sauce"},
        {"id": "b", "text": "the transformer attention mechanism explained"},
        {"id": "c", "text": "gardening tips for spring"},
    ]
    ranked = m.dense_rank("the transformer attention mechanism explained", chunks, FakeEmbedder())
    assert ranked[0] == "b"
    assert sorted(ranked) == ["a", "b", "c"]


def test_rrf_exact_scores_and_order():
    out = m.rrf([["a", "b", "c"], ["c", "a", "d"]])
    assert [i for i, _ in out] == ["a", "c", "b", "d"]
    expected = {"a": 1 / 61 + 1 / 62, "c": 1 / 63 + 1 / 61, "b": 1 / 62, "d": 1 / 63}
    for cid, score in out:
        assert score == pytest.approx(expected[cid], rel=1e-12)


def test_rrf_ties_duplicates_custom_k_and_empty():
    assert [i for i, _ in m.rrf([["y", "x"], ["x", "y"]])] == ["x", "y"]
    out = m.rrf([["b", "a", "b"], ["a"]], k=1)
    assert out == [("a", pytest.approx(1 / 3 + 1 / 2)), ("b", pytest.approx(1 / 2))]
    assert m.rrf([]) == []
    assert m.rrf([[], []]) == []


def test_hybrid_search_fuses_dense_and_sparse():
    sparse = ["c_far", "c_close2", "c_exact"]
    out = m.hybrid_search("query", CHUNKS, CountingEmbed(), sparse, top_n=3)
    # dense ranks: c_exact 1, c_close 2, c_close2 3, c_far 4, c_empty 5, c_opp 6
    expected = [
        ("c_exact", 1 / 61 + 1 / 63),
        ("c_far", 1 / 64 + 1 / 61),
        ("c_close2", 1 / 63 + 1 / 62),
    ]
    assert [i for i, _ in out] == [cid for cid, _ in expected]
    for (_, got), (_, want) in zip(out, expected):
        assert got == pytest.approx(want, rel=1e-12)
    assert len(m.hybrid_search("query", CHUNKS, CountingEmbed(), sparse)) == 5


def test_ground_citations():
    assert m.ground_citations("Paris [1] is big [3][1]. See [0].", ["c7", "c2"]) == {
        "cited": ["c7"],
        "invalid": [3, 0],
    }
    assert m.ground_citations("A [2], B [1], C [2], D [9], E [9]", ["x", "y"]) == {
        "cited": ["y", "x"],
        "invalid": [9],
    }
    assert m.ground_citations("no refs [a] [1,2] [ 1 ]", ["x"]) == {"cited": [], "invalid": []}
