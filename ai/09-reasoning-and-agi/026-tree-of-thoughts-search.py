"""
026 — Tree-of-Thoughts Beam Search
Difficulty: Medium   ·   Track: Reasoning & AGI Research   ·   Language: Python
----------------------------------------------------------------------
PROBLEM
  Instead of committing to one chain of thought, grow a tree of partial
  "thoughts", score them, and keep only the most promising few at each depth.

  Implement `tree_of_thoughts(root, propose, score, is_goal, breadth, max_depth)`
  returning a path (list of states from root to a goal) or None.

    root                 the starting state (any Python object)
    propose(state)       -> list of child states, in a fixed order
    score(state)         -> float, higher means more promising
    is_goal(state)       -> bool
    breadth              beam width b >= 1: states kept per depth
    max_depth            maximum number of expansion rounds, >= 0

  Algorithm (follow it exactly; the tests check tie-breaks):
    1. If is_goal(root), return [root] (nothing else is called).
    2. frontier = [[root]]   (a list of paths)
    3. Repeat max_depth times:
       a. Build `candidates`: for each path in frontier (in frontier order),
          for each child in propose(path[-1]) (in the order returned),
          append path + [child]. This is the candidate's GENERATION ORDER.
          Do NOT deduplicate states: the same state reached along two paths
          is two candidates.
       b. If there are no candidates, return None.
       c. Goal check on ALL candidates, before any pruning: if any candidate's
          last state is a goal, return the goal path whose last state has the
          highest score; ties go to the earliest in generation order.
       d. Otherwise sort candidates by score of the last state, descending,
          ties by generation order (a stable sort), and keep the first
          `breadth` of them as the new frontier.
    4. If the loop ends without a goal, return None.

  Because goals are checked level by level, the returned path is always one of
  the shortest goal paths the beam could see.

WHY IT MATTERS
  Tree of Thoughts (Yao et al., 2023) turns reasoning into search: a model
  proposes next steps, a value function (often the same model) scores them,
  and a classic search algorithm decides what to explore. The same
  propose / evaluate / prune loop sits under many "reasoning" systems. The
  hard part in practice is the scorer: a bad heuristic prunes the right
  answer, and no amount of search brings it back.

CONSTRAINTS
  1 <= breadth <= 1000, 0 <= max_depth <= 50
  propose, score and is_goal are deterministic.

EXAMPLES
  Reach 24 from 1 using the steps n+1, n*2, n*3 (in that order), never
  going above 24:
    propose = lambda n: [c for c in (n + 1, n * 2, n * 3) if c <= 24]
    is_goal = lambda n: n == 24

  With "closeness" as the score, score = lambda n: -abs(24 - n):
    tree_of_thoughts(1, propose, score, is_goal, breadth=3, max_depth=6) -> None
    tree_of_thoughts(1, propose, score, is_goal, breadth=3, max_depth=9)
      -> [1, 3, 9, 18, 19, 20, 21, 22, 23, 24]
    (the beam rushes to 18, the closest number, then can only crawl with +1)

  A wide enough beam prunes nothing, so the same bad score still finds a
  shortest path, because goals are checked level by level:
    tree_of_thoughts(1, propose, score, is_goal, breadth=50, max_depth=6)
      -> [1, 3, 6, 12, 24]

  With a score that knows 24's divisors,
    score = lambda n: -abs(24 - n) if 24 % n == 0 else -100 - abs(24 - n)
    tree_of_thoughts(1, propose, score, is_goal, breadth=1, max_depth=6)
      -> [1, 3, 6, 12, 24]
    Four expansions are all it needs, so max_depth=4 gives the same path:
    tree_of_thoughts(1, propose, score, is_goal, breadth=1, max_depth=4)
      -> [1, 3, 6, 12, 24]
    (a beam of 1 under the closeness score above never reaches 24 by depth 6)

  The root is tested before anything else, so propose is never called:
    tree_of_thoughts(24, propose, score, is_goal, breadth=1, max_depth=5)
      -> [24]

  No expansion rounds, or nowhere to expand to:
    tree_of_thoughts(1, propose, score, is_goal, breadth=3, max_depth=0)
      -> None
    tree_of_thoughts(1, lambda n: [], score, is_goal, breadth=3, max_depth=5)
      -> None

EDGE CASES
  - The root is a goal: [root].
  - max_depth = 0 and the root is not a goal: None.
  - Every state is a dead end (propose returns []): None.
  - A goal child that would be pruned by the beam is still found (step c
    runs before step d).

-------------------------- SPOILERS BELOW --------------------------

HINTS
  1. Store each candidate as (score, generation_index, path); then a sort key
     of (-score, generation_index) gives the exact tie-break.
  2. Call score once per candidate and reuse it for the goal choice and the
     pruning.
  3. Scan goal candidates in generation order and replace the best only on a
     strictly higher score.

COMPLEXITY
  Target: O(max_depth · b · k · log(b · k)) time for branching factor k,
  O(b · k · max_depth) space for the candidate paths.
----------------------------------------------------------------------
"""


def tree_of_thoughts(root, propose, score, is_goal, breadth: int, max_depth: int) -> list | None:
    # TODO: your solution here
    raise NotImplementedError
