import numpy as np
import pytest

from _harness import load

m = load("029")

R = 1 / np.sqrt(2)


def ids_of(results):
    return [i for i, _ in results]


def test_example_search_and_scores():
    idx = m.VectorIndex(2)
    idx.add(["a", "b", "c"], [[1, 0], [0, 2], [3, 3]])
    assert len(idx) == 3
    res = idx.search([1, 0], k=2)
    assert ids_of(res) == ["a", "c"]
    assert [s for _, s in res] == pytest.approx([1.0, R])
    assert all(isinstance(s, float) for _, s in res)
    res = idx.search([0, 5], k=5)
    assert ids_of(res) == ["b", "c", "a"]
    assert [s for _, s in res] == pytest.approx([1.0, R, 0.0])


def test_vectors_are_normalised_on_insert():
    idx = m.VectorIndex(2)
    idx.add(["x", "y"], np.array([[3.0, 4.0], [-30.0, -40.0]]))
    res = idx.search(np.array([6.0, 8.0]), k=2)
    assert ids_of(res) == ["x", "y"]
    assert [s for _, s in res] == pytest.approx([1.0, -1.0])


def test_duplicate_id_replaces():
    idx = m.VectorIndex(2)
    idx.add(["a", "b", "c"], [[1, 0], [0, 2], [3, 3]])
    idx.add(["a"], [[0, -1]])
    assert len(idx) == 3
    res = idx.search([1, 0], k=3, filter=lambda i: i != "c")
    assert ids_of(res) == ["a", "b"]
    assert [s for _, s in res] == pytest.approx([0.0, 0.0])
    idx.add(["d", "d"], [[1, 0], [0, 1]])  # later one wins within a call
    assert len(idx) == 4
    assert idx.search([0, 1], k=1) == [("b", pytest.approx(1.0))]
    assert idx.search([1, 1], k=10, filter=lambda i: i == "d")[0][1] == pytest.approx(R)


def test_delete():
    idx = m.VectorIndex(3)
    idx.add(["p", "q", "r"], np.eye(3))
    assert idx.delete("p") is True
    assert idx.delete("p") is False
    assert idx.delete("zzz") is False
    assert len(idx) == 2
    assert ids_of(idx.search([1, 1, 1], k=5)) == ["q", "r"]
    idx.add(["p"], [[1, 0, 0]])
    assert ids_of(idx.search([1, 0, 0], k=1)) == ["p"]
    for i in ["p", "q", "r"]:
        idx.delete(i)
    assert len(idx) == 0
    assert idx.search([1, 0, 0], k=3) == []


def test_ties_break_by_id_even_at_the_cutoff():
    idx = m.VectorIndex(2)
    same = [[1.0, 1.0]] * 5
    idx.add(["e", "b", "d", "a", "c"], same)
    idx.add(["top"], [[1.0, 0.9]])
    idx.add(["low"], [[0.0, 1.0]])
    q = [1.0, 0.9]
    assert ids_of(idx.search(q, k=3)) == ["top", "a", "b"]
    assert ids_of(idx.search(q, k=7)) == ["top", "a", "b", "c", "d", "e", "low"]


def test_filter_k_and_empty_cases():
    idx = m.VectorIndex(2)
    assert idx.search([1, 0], k=3) == []
    idx.add(["doc1", "doc2", "img1"], [[1, 0], [1, 1], [1, 0.1]])
    only_docs = idx.search([1, 0], k=10, filter=lambda i: i.startswith("doc"))
    assert ids_of(only_docs) == ["doc1", "doc2"]
    assert idx.search([1, 0], k=5, filter=lambda i: False) == []
    assert idx.search([1, 0], k=0) == []


def test_validation_changes_nothing():
    idx = m.VectorIndex(3)
    idx.add(["a"], [[1, 2, 3]])
    with pytest.raises(ValueError):
        idx.add(["b", "c"], [[1, 0, 0], [0, 0, 0]])
    with pytest.raises(ValueError):
        idx.add(["b"], [[1, 0]])
    with pytest.raises(ValueError):
        idx.add(["b", "c"], [[1, 0, 0]])
    assert len(idx) == 1
    with pytest.raises(ValueError):
        idx.search([0, 0, 0], k=1)
    with pytest.raises(ValueError):
        idx.search([1, 0], k=1)


def test_matches_brute_force_on_random_data():
    rng = np.random.default_rng(42)
    V = rng.normal(size=(3000, 32))
    ids = [f"id{i:04d}" for i in range(3000)]
    idx = m.VectorIndex(32)
    idx.add(ids[:2000], V[:2000])
    idx.add(ids[1500:], V[1500:] * 2.5)
    for i in range(0, 3000, 7):
        idx.delete(ids[i])
    alive = [i for i in range(3000) if i % 7]
    U = V[alive] / np.linalg.norm(V[alive], axis=1, keepdims=True)
    for trial in range(5):
        q = rng.normal(size=32)
        scores = U @ (q / np.linalg.norm(q))
        expected = sorted(zip((-scores).tolist(), [ids[i] for i in alive]))[:10]
        got = idx.search(q, k=10)
        assert ids_of(got) == [i for _, i in expected]
        assert [s for _, s in got] == pytest.approx([-s for s, _ in expected])
