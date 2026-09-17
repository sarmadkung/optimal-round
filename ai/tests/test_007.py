from _harness import load

m = load("007")


def test_wikipedia_example_merges():
    assert m.train("aaabdaaabac", 3) == [("a", "a"), ("a", "b"), ("aa", "ab")]


def test_all_counts_one_uses_tuple_tie_break():
    # every pair occurs once: ("a","b") is smallest, then ("ab","c") beats ("c","d")
    assert m.train("abcd", 2) == [("a", "b"), ("ab", "c")]
    # a later step where the smallest pair has a shorter left string
    assert m.train("aaabdaaabac", 4)[3] == ("a", "c")


def test_overlapping_pairs_merge_left_to_right():
    merges = m.train("aaa", 1)
    assert merges == [("a", "a")]
    assert m.encode("aaa", merges) == ["aa", "a"]
    assert m.encode("aaaa", merges) == ["aa", "aa"]


def test_encode_reproduces_training_and_round_trips():
    text = "the cat sat on the mat. the cat ate."
    merges = m.train(text, 12)
    assert len(merges) == 12
    tokens = m.encode(text, merges)
    assert m.decode(tokens) == text
    assert len(tokens) < len(text)
    assert all(isinstance(t, str) for t in tokens)
    unseen = "that hat? zebra!"
    assert m.decode(m.encode(unseen, merges)) == unseen


def test_encode_applies_merges_in_given_order():
    assert m.encode("aaab", [("a", "a"), ("a", "b"), ("aa", "ab")]) == ["aaab"]
    # reversed order: ("aa","ab") cannot fire before its parts exist, so it is skipped
    assert m.encode("aaab", [("aa", "ab"), ("a", "b"), ("a", "a")]) == ["aa", "ab"]
    assert m.decode(["aaab", "d"]) == "aaabd"


def test_edge_cases():
    assert m.train("hello", 0) == []
    assert m.train("", 5) == []
    assert m.train("x", 5) == []
    assert m.train("ab", 5) == [("a", "b")]  # stops early once one token is left
    assert m.encode("", [("a", "b")]) == []
    assert m.decode([]) == ""
