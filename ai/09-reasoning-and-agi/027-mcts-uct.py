"""
027 — Monte Carlo Tree Search with UCT
Difficulty: Hard   ·   Track: Reasoning & AGI Research   ·   Language: Python (NumPy)
----------------------------------------------------------------------
PROBLEM
  Pick a move in a game by growing a search tree one simulated playout at a
  time, spending more playouts on the moves that look best so far.

  Implement `mcts(game, root_state, iterations, rng, c=math.sqrt(2))`
  returning `(best_move, stats)`.

  The game is any object with these methods (states and moves are opaque):
    game.legal_moves(state)      -> list of moves; its ORDER matters.
                                    Never empty for a non-terminal state.
    game.next_state(state, move) -> the state after playing move
    game.is_terminal(state)      -> bool
    game.current_player(state)   -> the player to move (any hashable).
                                    Works for 2-player alternating games and
                                    for single-player games (constant player).
    game.reward(state, player)   -> float in [0, 1], only called on terminal
                                    states: 1 win, 0 loss, 0.5 draw for that
                                    player (single-player: any score in [0, 1])

  Tree nodes. Each node holds a state, its children (created in legal_moves
  order), a visit count N and a value sum W. Every non-root node also records
  `player` = game.current_player(parent.state), the player who made the move
  into it. W is summed from THAT player's point of view, so each player picks
  what is good for themselves.

  Each iteration does exactly these four steps:
    1. SELECT. node = root. While node is not terminal AND every legal move of
       node already has a child: move to the child with the highest
           UCT = child.W / child.N + c * sqrt( ln(node.N) / child.N )
       (math.log, natural log). Ties go to the earliest child in
       legal_moves order.
    2. EXPAND. If node is not terminal: create the child for the FIRST legal
       move (in legal_moves order) that has no child yet, and set node to it.
    3. SIMULATE. state = node.state. While not game.is_terminal(state):
           moves = game.legal_moves(state)
           state = game.next_state(state, moves[rng.integers(len(moves))])
       This is the ONLY use of rng: exactly one rng.integers(len(moves)) call
       per rollout step, and none when node.state is already terminal.
    4. BACKPROPAGATE. For node and every ancestor up to and including the root:
       N += 1, and for every non-root node W += game.reward(state, node.player),
       where `state` is the terminal state reached in step 3.

  After all iterations:
    stats     = a list with one tuple (move, visits, value_sum) per legal move
                of the root, in legal_moves order. visits is an int, value_sum
                a float. Moves never expanded report (move, 0, 0.0).
    best_move = the move with the most visits; ties go to the earliest in
                legal_moves order.

  Raise ValueError if root_state is terminal.

WHY IT MATTERS
  MCTS is the search behind AlphaGo, AlphaZero and MuZero: self-play plus tree
  search plus a learned value function reached superhuman play with no human
  strategy built in. The same idea (spend test-time compute searching over
  possible continuations, guided by a value estimate) is a central thread in
  current research on LLM reasoning, from search over proof steps to
  planning agents.

CONSTRAINTS
  1 <= iterations <= 10^5
  rng is a numpy.random.Generator (np.random.default_rng(seed)).
  Games in the tests are small; a plain Python node class is fine.

EXAMPLES
  A one-move game: root "R" (player "A") has moves ["L", "Rt"]; "L" leads to a
  terminal state worth 1.0 to A, "Rt" to one worth 0.0.
    mcts(game, "R", 10, rng)
      -> ("L", [("L", 8, 8.0), ("Rt", 2, 0.0)])
    Iteration 1 expands L, iteration 2 expands Rt, then UCT picks L on every
    iteration until Rt's exploration bonus wins once, at iteration 7:
      UCT(L) = 1 + √2·sqrt(ln 6 / 5) ≈ 1.847  <  UCT(Rt) = 0 + √2·sqrt(ln 6 / 1) ≈ 1.893
    With c = 0 the search is pure greedy: ("L", [("L", 9, 9.0), ("Rt", 1, 0.0)]).

  Tic-tac-toe, X to move on
      X X .
      O O .
      . . .
  with 1000 iterations returns the winning square (index 2).

EDGE CASES
  - iterations smaller than the number of root moves: later moves report 0
    visits, and best_move is the earliest most-visited move.
  - A child whose state is terminal is never expanded further, and its
    rollout makes no rng calls.
  - Root is terminal: ValueError.

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. A node is fully expanded when len(children) == len(legal moves). Cache
     the legal moves on the node when you create it.
  2. Every child is visited in the iteration that creates it, so child.N >= 1
     whenever UCT is computed: no division by zero.
  3. Store `player` on the child at expansion time; then backpropagation is a
     simple walk up parent pointers.
  4. In a two-player game, W from the mover's view is what makes the opponent
     pick replies that are bad for you, which is exactly minimax in the limit.

COMPLEXITY
  Target: O(iterations · (tree depth · branching + rollout length)) time,
  O(iterations) nodes of memory.
----------------------------------------------------------------------
"""

import math


def mcts(game, root_state, iterations: int, rng, c: float = math.sqrt(2)) -> tuple:
    # TODO: your solution here
    raise NotImplementedError
