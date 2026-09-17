import pytest

from _harness import load

m = load("016")


def c(text, start, end):
    return {"text": text, "start": start, "end": end}


def test_word_chunks_with_overlap_example():
    assert m.chunk_words("a b c d e f g h i j", 4, 1) == [
        c("a b c d", 0, 4),
        c("d e f g", 3, 7),
        c("g h i j", 6, 10),
    ]


def test_word_chunks_short_last_chunk_and_no_overlap():
    assert m.chunk_words("a b c d e f g h i j k", 4, 1)[-1] == c("j k", 9, 11)
    assert m.chunk_words("a b c d e", 2, 0) == [c("a b", 0, 2), c("c d", 2, 4), c("e", 4, 5)]
    # stop once the end is reached: no chunk fully inside the previous one
    assert m.chunk_words("a b c d", 3, 2) == [c("a b c", 0, 3), c("b c d", 1, 4)]


def test_word_chunks_edge_cases():
    assert m.chunk_words("", 5, 1) == []
    assert m.chunk_words("   \n  ", 5, 1) == []
    assert m.chunk_words("  hello\n\n  big   world ", 10, 3) == [c("hello big world", 0, 3)]


def test_word_chunks_invalid_arguments():
    for max_words, overlap in [(0, 0), (3, 3), (3, 5), (3, -1)]:
        with pytest.raises(ValueError):
            m.chunk_words("a b c", max_words, overlap)


def test_sentence_packing_example():
    assert m.chunk_sentences("One two. Three four five. Six!", 5) == [
        c("One two. Three four five.", 0, 5),
        c("Six!", 5, 6),
    ]
    assert m.chunk_sentences("A b. C d? E f. G", 4) == [c("A b. C d?", 0, 4), c("E f. G", 4, 7)]


def test_long_sentence_is_split_and_not_packed():
    text = "Hi. one two three four five six seven. Bye now."
    assert m.chunk_sentences(text, 3) == [
        c("Hi.", 0, 1),
        c("one two three", 1, 4),
        c("four five six", 4, 7),
        c("seven.", 7, 8),
        c("Bye now.", 8, 10),
    ]


def test_sentence_edge_cases():
    assert m.chunk_sentences("", 3) == []
    assert m.chunk_sentences("no punctuation at all here", 10) == [c("no punctuation at all here", 0, 5)]
    with pytest.raises(ValueError):
        m.chunk_sentences("a.", 0)
