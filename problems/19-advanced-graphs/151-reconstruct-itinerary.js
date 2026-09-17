/**
 * 151 — Reconstruct Itinerary
 * Difficulty: Hard   ·   Topic: Advanced Graphs
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Given a list of airline tickets [from, to], reconstruct the itinerary in order.
 *   All tickets belong to a man departing from "JFK" and must be used exactly once.
 *   If several valid itineraries exist, return the smallest in lexical order.
 *
 * CONSTRAINTS
 *   1 <= tickets.length <= 300
 *   Airports are three uppercase letters.
 *   At least one valid itinerary is guaranteed.
 *
 * EXAMPLES
 *   findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]])
 *     ->  ["JFK","MUC","LHR","SFO","SJC"]
 *   findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])
 *     ->  ["JFK","ATL","JFK","SFO","ATL","SFO"]
 *   findItinerary([["JFK","ATL"]])
 *     ->  ["JFK","ATL"]   // one ticket, the smallest possible input
 *   findItinerary([["JFK","SFO"],["JFK","ATL"],["ATL","JFK"]])
 *     ->  ["JFK","ATL","JFK","SFO"]   // ATL is taken first, being lexically smaller
 *   findItinerary([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]])
 *     ->  ["JFK","NRT","JFK","KUL"]   // taking KUL first would strand the trip
 *   findItinerary([["JFK","ATL"],["JFK","ATL"],["ATL","JFK"]])
 *     ->  ["JFK","ATL","JFK","ATL"]   // duplicate tickets, each used exactly once
 *
 * EDGE CASES
 *   - EVERY ticket must be used exactly once.
 *   - Duplicate tickets between the same pair are allowed.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * HINTS
 *   1. Greedily taking the lexically smallest next airport can strand you — the route may need
 *      backtracking.
 *
 * COMPLEXITY
 *   Naive:  Backtracking over every permutation of tickets is factorial.
 *   Target: O(E log E) time — Hierholzer's algorithm for an Eulerian path: visit destinations in
 *           sorted order, and append an airport to the result only once it has no unused tickets
 *           left, then reverse.
 * ----------------------------------------------------------------------
 */

function findItinerary(tickets) {
  // TODO: your solution here
}

module.exports = { findItinerary };
