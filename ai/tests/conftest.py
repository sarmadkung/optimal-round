import pathlib
import sys

# Make `_harness` and `_fakes` importable from every test.
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
