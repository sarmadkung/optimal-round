import pytest

from _harness import load

m = load("022")


def test_normalize_answer():
    assert m.normalize_answer("The  Eiffel Tower!") == "eiffel tower"
    assert m.normalize_answer("Don't stop, U.S.A.") == "dont stop usa"
    assert m.normalize_answer("the. An apple, a day") == "apple day"
    assert m.normalize_answer("Theater and another") == "theater and another"
    assert m.normalize_answer("  \t ") == ""


def test_exact_match_multiple_golds():
    assert m.exact_match("eiffel tower", ["The Eiffel Tower", "Paris"]) == 1.0
    assert m.exact_match("Paris.", ["The Eiffel Tower", "paris"]) == 1.0
    assert m.exact_match("Paris France", ["Paris"]) == 0.0
    assert m.exact_match("", ["The"]) == 1.0


def test_f1_exact_values():
    assert m.f1_score("Paris, France", ["Paris"]) == pytest.approx(2 / 3)
    assert m.f1_score("the the cat", ["cat cat"]) == pytest.approx(2 / 3)
    # precision 2/4, recall 2/3 -> 2PR/(P+R) = 4/7
    assert m.f1_score("big red fox jumps", ["a red fox runs"]) == pytest.approx(4 / 7)
    assert m.f1_score("dog", ["cat"]) == 0.0


def test_f1_takes_max_over_golds():
    golds = ["cat", "black cat sat", "dog"]
    # vs "cat": P=1/2 R=1 -> 2/3 ; vs "black cat sat": P=1 R=2/3 -> 4/5
    assert m.f1_score("black cat", golds) == pytest.approx(0.8)


def test_f1_empty_token_lists():
    assert m.f1_score("", ["the"]) == 1.0
    assert m.f1_score("", ["cat"]) == 0.0
    assert m.f1_score("an", ["cat", "a"]) == 1.0
    assert m.f1_score("cat", ["!!"]) == 0.0


def test_empty_golds_raise():
    with pytest.raises(ValueError):
        m.exact_match("x", [])
    with pytest.raises(ValueError):
        m.f1_score("x", [])


def test_evaluate_aggregates():
    dataset = [
        {"id": "q1", "answers": ["Paris"]},
        {"id": "q2", "answers": ["the blue whale", "whale"]},
        {"id": "q3", "answers": ["42"]},
    ]
    assert m.evaluate({"q1": "Paris", "q2": "blue whale"}, dataset) == {
        "exact_match": 66.67, "f1": 66.67, "count": 3}
    out = m.evaluate({"q1": "Paris France", "q2": "whale", "q3": "41"}, dataset)
    # EM [0, 1, 0]; F1 [2/3, 1, 0] -> mean 5/9
    assert out == {"exact_match": 33.33, "f1": 55.56, "count": 3}
    assert m.evaluate({}, []) == {"exact_match": 0.0, "f1": 0.0, "count": 0}
