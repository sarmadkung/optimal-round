from _harness import load

m = load("026")

TARGET = 24


def propose24(n):
    return [c for c in (n + 1, n * 2, n * 3) if c <= TARGET]


def closeness(n):
    return -abs(TARGET - n)


def divisor_aware(n):
    return -abs(TARGET - n) if TARGET % n == 0 else -100 - abs(TARGET - n)


def is24(n):
    return n == TARGET


def graph_fns(children, scores, goals):
    return (
        lambda s: list(children.get(s, [])),
        lambda s: scores[s],
        lambda s: s in goals,
    )


def test_root_is_goal():
    def propose(_):
        raise AssertionError("propose must not be called when the root is a goal")

    assert m.tree_of_thoughts(24, propose, closeness, is24, 3, 5) == [24]


def test_misleading_score_needs_more_depth():
    assert m.tree_of_thoughts(1, propose24, closeness, is24, 3, 6) is None
    assert m.tree_of_thoughts(1, propose24, closeness, is24, 3, 9) == [
        1, 3, 9, 18, 19, 20, 21, 22, 23, 24,
    ]


def test_good_value_function_makes_greedy_work():
    assert m.tree_of_thoughts(1, propose24, divisor_aware, is24, 1, 6) == [1, 3, 6, 12, 24]


def test_wide_beam_finds_shortest_path():
    assert m.tree_of_thoughts(1, propose24, closeness, is24, 50, 6) == [1, 3, 6, 12, 24]


def test_ties_keep_earliest_generated_and_prune_the_rest():
    children = {"S": ["a", "b", "c"], "a": ["a1"], "b": ["b1"], "c": ["gc"]}
    scores = {"S": 0, "a": 1, "b": 1, "c": 1, "a1": 0, "b1": 0, "gc": 9}
    propose, score, is_goal = graph_fns(children, scores, {"gc"})
    # breadth 2 keeps a and b (ties -> generation order); c and its goal are pruned
    assert m.tree_of_thoughts("S", propose, score, is_goal, 2, 3) is None
    assert m.tree_of_thoughts("S", propose, score, is_goal, 3, 3) == ["S", "c", "gc"]


def test_goal_choice_by_score_then_generation_order_before_pruning():
    children = {"S": ["hi", "lo"], "hi": ["x", "g1"], "lo": ["g2", "g3"]}
    scores = {"S": 0, "hi": 10, "lo": -10, "x": 50, "g1": -5, "g2": 3, "g3": 3}
    propose, score, is_goal = graph_fns(children, scores, {"g1", "g2", "g3"})
    # breadth 1 keeps only "hi", so g2/g3 are never generated
    assert m.tree_of_thoughts("S", propose, score, is_goal, 1, 2) == ["S", "hi", "g1"]
    # breadth 2: g2 and g3 tie on the best goal score, g2 was generated first
    assert m.tree_of_thoughts("S", propose, score, is_goal, 2, 2) == ["S", "lo", "g2"]


def test_shallow_goal_beats_deeper_better_goal():
    children = {"S": ["g", "a"], "a": ["G"]}
    scores = {"S": 0, "g": -100, "a": 100, "G": 1000}
    propose, score, is_goal = graph_fns(children, scores, {"g", "G"})
    assert m.tree_of_thoughts("S", propose, score, is_goal, 1, 5) == ["S", "g"]


def test_dead_ends_and_zero_depth():
    propose, score, is_goal = graph_fns({"S": ["a"]}, {"S": 0, "a": 0}, set())
    assert m.tree_of_thoughts("S", propose, score, is_goal, 4, 10) is None
    assert m.tree_of_thoughts(1, propose24, closeness, is24, 5, 0) is None
