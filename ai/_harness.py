"""
Shared harness for the AI problems.

  load("007")   import problem 007 as a module (tests use this)
  python _harness.py list [--todo]   show every problem and whether it is started

Set AI_IMPL_DIR to point `load` at a different folder of solutions (flat, or
with the same track sub-folders). The maintainer uses this to check the tests
against reference solutions that are NOT stored in this repository.
"""

import importlib.util
import os
import pathlib
import re
import sys

AI_ROOT = pathlib.Path(__file__).resolve().parent
STUB = "# TODO: your solution here"
TRACK_DIR = re.compile(r"^\d\d-")


def _find(base: pathlib.Path, num: str) -> pathlib.Path:
    matches = sorted(base.glob(f"{num}-*.py")) + sorted(
        p for d in base.iterdir() if d.is_dir() and TRACK_DIR.match(d.name)
        for p in d.glob(f"{num}-*.py")
    )
    if not matches:
        raise FileNotFoundError(f"no problem file {num}-*.py under {base}")
    return matches[0]


def load(num: str):
    base = pathlib.Path(os.environ.get("AI_IMPL_DIR") or AI_ROOT)
    path = _find(base, num)
    name = "ai_problem_" + path.stem.replace("-", "_")
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def problems():
    for track in sorted(d for d in AI_ROOT.iterdir() if d.is_dir() and TRACK_DIR.match(d.name)):
        for path in sorted(track.glob("[0-9][0-9][0-9]-*.py")):
            text = path.read_text()
            m = re.search(r"Difficulty:\s*(\w+)", text)
            title = re.search(r'^"""\s*\n?\s*\d+\s*—\s*(.+)$', text, re.M)
            yield {
                "num": path.name[:3],
                "track": track.name,
                "title": title.group(1).strip() if title else path.stem,
                "difficulty": m.group(1) if m else "?",
                "started": STUB not in text,
            }


def _list(todo_only: bool):
    rows = list(problems())
    track = None
    for r in rows:
        if todo_only and r["started"]:
            continue
        if r["track"] != track:
            track = r["track"]
            print(f"\n{track}")
        mark = "✅" if r["started"] else "⬜"
        print(f"  {mark} {r['num']}  {r['title']:<48} {r['difficulty']}")
    done = sum(r["started"] for r in rows)
    print(f"\n{done} of {len(rows)} started")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        _list("--todo" in sys.argv)
    else:
        print(__doc__)
