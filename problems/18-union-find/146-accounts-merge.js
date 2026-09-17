/**
 * 146 — Accounts Merge
 * Difficulty: Medium   ·   Topic: Union-Find
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Each account is [name, email1, email2, ...]. Two accounts belong to the same person if
 *   they share any email; names may be shared by different people.
 *   Merge them and return each account as its name followed by its emails in sorted order.
 *
 * CONSTRAINTS
 *   1 <= accounts.length <= 1000
 *   2 <= accounts[i].length <= 10
 *   Emails are lowercase and contain '@'.
 *
 * EXAMPLES
 *   accountsMerge([["John","a@m.com","b@m.com"], ["John","b@m.com","c@m.com"], ["Mary","m@m.com"]])
 *     ->  [["John","a@m.com","b@m.com","c@m.com"], ["Mary","m@m.com"]]   // account order not significant
 *   accountsMerge([["Alex","a@m.com"]])
 *     ->  [["Alex","a@m.com"]]   // one account, nothing to merge
 *   accountsMerge([["John","a@m.com"], ["John","b@m.com"]])
 *     ->  [["John","a@m.com"], ["John","b@m.com"]]   // same name, no shared email — two people
 *   accountsMerge([["Amy","x@m.com","y@m.com"], ["Amy","y@m.com","z@m.com"], ["Amy","z@m.com","w@m.com"]])
 *     ->  [["Amy","w@m.com","x@m.com","y@m.com","z@m.com"]]   // merging is transitive
 *   accountsMerge([["Kim","k@m.com","j@m.com"], ["Kim","j@m.com","k@m.com"]])
 *     ->  [["Kim","j@m.com","k@m.com"]]   // identical accounts collapse into one
 *   accountsMerge([["Zed","c@m.com","a@m.com","b@m.com"]])
 *     ->  [["Zed","a@m.com","b@m.com","c@m.com"]]   // emails come out sorted, not in input order
 *
 * EDGE CASES
 *   - The same NAME does not imply the same person — only a shared email does.
 *   - Merging is transitive: A shares with B, B with C, so all three merge.
 *   - Output emails must be sorted; the account order need not be.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(n^2) time — compare every pair of accounts for a shared email and merge repeatedly
 *           until stable.
 *   Target: O(n * k * log) time — union-find keyed by email (or DFS over an email graph), then
 *           group emails by root and sort each group.
 * ----------------------------------------------------------------------
 */

function accountsMerge(accounts) {
  // TODO: your solution here
}

module.exports = { accountsMerge };
