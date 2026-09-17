import numpy as np
import pytest

from _harness import load

m = load("027")


class TreeGame:
    """A game given as nested dicts: children[state] = {move: next_state}."""

    def __init__(self, children, players, rewards):
        self.children, self.players, self.rewards = children, players, rewards

    def legal_moves(self, s):
        return list(self.children.get(s, {}).keys())

    def next_state(self, s, move):
        return self.children[s][move]

    def is_terminal(self, s):
        return s in self.rewards

    def current_player(self, s):
        return self.players[s]

    def reward(self, s, player):
        return self.rewards[s][player]


class Coins:
    """Single player: pick h or t three times; score 1 if at least two heads."""

    def legal_moves(self, s):
        return ["h", "t"]

    def next_state(self, s, move):
        return s + move

    def is_terminal(self, s):
        return len(s) == 3

    def current_player(self, s):
        return "me"

    def reward(self, s, player):
        return 1.0 if s.count("h") >= 2 else 0.0


LINES = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]


class TicTacToe:
    """State: a 9-char string of 'X', 'O', '.', row by row. X moves first."""

    def winner(self, s):
        for a, b, c in LINES:
            if s[a] != "." and s[a] == s[b] == s[c]:
                return s[a]
        return None

    def legal_moves(self, s):
        return [i for i, v in enumerate(s) if v == "."]

    def next_state(self, s, move):
        return s[:move] + self.current_player(s) + s[move + 1:]

    def is_terminal(self, s):
        return self.winner(s) is not None or "." not in s

    def current_player(self, s):
        return "X" if s.count("X") == s.count("O") else "O"

    def reward(self, s, player):
        w = self.winner(s)
        return 0.5 if w is None else (1.0 if w == player else 0.0)


def one_move_game():
    return TreeGame(
        {"R": {"L": "win", "Rt": "lose"}},
        {"R": "A"},
        {"win": {"A": 1.0}, "lose": {"A": 0.0}},
    )


def test_exact_visit_counts_on_tiny_tree():
    best, stats = m.mcts(one_move_game(), "R", 10, np.random.default_rng(0))
    assert best == "L"
    assert [(mv, n) for mv, n, _ in stats] == [("L", 8), ("Rt", 2)]
    assert [w for _, _, w in stats] == pytest.approx([8.0, 0.0])
    assert all(isinstance(n, int) for _, n, _ in stats)


def test_exploration_constant_changes_visits():
    _, greedy = m.mcts(one_move_game(), "R", 10, np.random.default_rng(0), c=0.0)
    assert [(mv, n) for mv, n, _ in greedy] == [("L", 9), ("Rt", 1)]
    _, curious = m.mcts(one_move_game(), "R", 10, np.random.default_rng(0), c=100.0)
    assert [(mv, n) for mv, n, _ in curious] == [("L", 5), ("Rt", 5)]


def test_unexpanded_moves_report_zero_and_terminal_root_raises():
    best, stats = m.mcts(one_move_game(), "R", 1, np.random.default_rng(0))
    assert best == "L"
    assert stats == [("L", 1, 1.0), ("Rt", 0, 0.0)]
    with pytest.raises(ValueError):
        m.mcts(one_move_game(), "win", 5, np.random.default_rng(0))


def test_rollouts_use_rng_exactly_as_specified():
    best, stats = m.mcts(Coins(), "", 6, np.random.default_rng(7))
    assert best == "h"
    assert stats == [("h", 4, 2.0), ("t", 2, 0.0)]
    best, stats = m.mcts(Coins(), "", 300, np.random.default_rng(7))
    assert best == "h"
    assert stats == [("h", 206, 199.0), ("t", 94, 80.0)]


def test_two_player_values_use_the_movers_perspective():
    # "a" lets the opponent win with "y"; "b" forces a draw. Minimax says "b".
    game = TreeGame(
        {"R": {"a": "A1", "b": "B1"}, "A1": {"x": "tx", "y": "ty"}, "B1": {"z": "tz"}},
        {"R": "A", "A1": "B", "B1": "B"},
        {
            "tx": {"A": 1.0, "B": 0.0},
            "ty": {"A": 0.0, "B": 1.0},
            "tz": {"A": 0.5, "B": 0.5},
        },
    )
    best, stats = m.mcts(game, "R", 200, np.random.default_rng(0))
    assert best == "b"
    assert stats == [("a", 27, 3.0), ("b", 173, 86.5)]


def test_tictactoe_takes_the_win():
    best, _ = m.mcts(TicTacToe(), "XX.OO....", 1000, np.random.default_rng(0))
    assert best == 2


def test_tictactoe_blocks_the_threat():
    for seed in range(3):
        best, _ = m.mcts(TicTacToe(), "XX.O.....", 2000, np.random.default_rng(seed))
        assert best == 2


def test_tictactoe_avoids_losing_corner_reply():
    # X holds opposite corners; O must answer on an edge (a corner loses).
    for seed in range(3):
        best, stats = m.mcts(TicTacToe(), "X...O...X", 3000, np.random.default_rng(seed))
        assert best in (1, 3, 5, 7)
        assert sum(n for _, n, _ in stats) == 3000
