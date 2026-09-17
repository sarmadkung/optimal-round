from _harness import load

m = load("023")


def test_luhn_valid():
    assert m.luhn_valid("79927398713") is True
    assert m.luhn_valid("79927398710") is False
    assert m.luhn_valid("4111111111111111") is True
    assert m.luhn_valid("4111111111111112") is False
    assert m.luhn_valid("0") is True
    assert m.luhn_valid("") is False
    assert m.luhn_valid("4111-1111") is False


def test_emails_reuse_placeholder_case_insensitively():
    text, mapping = m.redact("Mail Jane@X.io or jane@x.io, cc bob.smith+ai@mail.example.co.")
    assert text == "Mail [EMAIL_1] or [EMAIL_1], cc [EMAIL_2]."
    assert mapping == {"[EMAIL_1]": "Jane@X.io", "[EMAIL_2]": "bob.smith+ai@mail.example.co"}


def test_phone_formats():
    text, mapping = m.redact(
        "call (555) 123-4567 or 555.123.4567, +1 212-555-0199, +1-212 555 0199, id 5551234567"
    )
    assert text == "call [PHONE_1] or [PHONE_1], [PHONE_2], [PHONE_2], id 5551234567"
    assert mapping == {"[PHONE_1]": "(555) 123-4567", "[PHONE_2]": "+1 212-555-0199"}
    # a digit right before or after blocks the match
    assert m.redact("x1555-123-4567 and 555-123-45678") == ("x1555-123-4567 and 555-123-45678", {})


def test_cards_need_luhn():
    text, mapping = m.redact(
        "card 4111-1111-1111-1111, order 4111-1111-1111-1112, amex 378282246310005, "
        "again 4111111111111111, spaced 5500 0000 0000 0004"
    )
    assert text == ("card [CARD_1], order 4111-1111-1111-1112, amex [CARD_2], "
                    "again [CARD_1], spaced [CARD_3]")
    assert mapping == {"[CARD_1]": "4111-1111-1111-1111", "[CARD_2]": "378282246310005",
                       "[CARD_3]": "5500 0000 0000 0004"}
    # 12 digits is too short, even though 4111 1111 1117 passes Luhn
    assert m.luhn_valid("411111111117") is True
    assert m.redact("ref 4111 1111 1117") == ("ref 4111 1111 1117", {})
    # a 24-digit run is not a card, and no 16-digit piece of it is either
    long_run = "4111 1111 1111 1111 1111 1111"
    assert m.redact(long_run) == (long_run, {})


def test_ipv4_bounds():
    text, mapping = m.redact(
        "hosts 10.0.0.1, 192.168.1.254 and 10.0.0.1. bad 256.1.1.1 and 1.2.3.4.5 v2.10.0.0.1"
    )
    assert text == "hosts [IPV4_1], [IPV4_2] and [IPV4_1]. bad 256.1.1.1 and 1.2.3.4.5 v2.10.0.0.1"
    assert mapping == {"[IPV4_1]": "10.0.0.1", "[IPV4_2]": "192.168.1.254"}


def test_mixed_numbering_is_per_label():
    text, mapping = m.redact(
        "a@b.com c@d.org tel 555-000-1111 card 4111 1111 1111 1111 from 8.8.8.8 and a@b.com"
    )
    assert text == "[EMAIL_1] [EMAIL_2] tel [PHONE_1] card [CARD_1] from [IPV4_1] and [EMAIL_1]"
    assert mapping == {
        "[EMAIL_1]": "a@b.com", "[EMAIL_2]": "c@d.org", "[PHONE_1]": "555-000-1111",
        "[CARD_1]": "4111 1111 1111 1111", "[IPV4_1]": "8.8.8.8",
    }


def test_no_pii_and_empty():
    assert m.redact("") == ("", {})
    s = "Version 3.2 shipped on 2024-01-05 to 12 users @ noon."
    assert m.redact(s) == (s, {})
