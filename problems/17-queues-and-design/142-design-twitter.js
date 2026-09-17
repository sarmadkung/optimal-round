/**
 * 142 — Design Twitter
 * Difficulty: Medium   ·   Topic: Queues & Design
 * ----------------------------------------------------------------------
 * PROBLEM
 *   Design a simplified Twitter: postTweet(userId, tweetId), getNewsFeed(userId) returning
 *   the 10 most recent tweet ids from the user and those they follow (most recent first),
 *   follow(followerId, followeeId) and unfollow(followerId, followeeId).
 *
 * CONSTRAINTS
 *   1 <= userId, followerId, followeeId <= 500
 *   0 <= tweetId <= 10^4
 *   At most 3 * 10^4 calls are made.
 *
 * API
 *   new Twitter()                                  initialize the object
 *   postTweet(userId, tweetId)        -> void      compose a new tweet; each tweetId is used at
 *                                                  most once
 *   getNewsFeed(userId)               -> number[]  return the 10 most recent tweet ids in the
 *                                                  user's feed, most recent first
 *   follow(followerId, followeeId)    -> void      followerId starts following followeeId
 *   unfollow(followerId, followeeId)  -> void      followerId stops following followeeId
 *
 * EXAMPLES
 *   const t = new Twitter();
 *   t.getNewsFeed(1)                    ->  []       // no tweets yet
 *   t.postTweet(1, 5);
 *   t.getNewsFeed(1)                    ->  [5]
 *   t.follow(1, 2); t.postTweet(2, 6);
 *   t.getNewsFeed(1)                    ->  [6, 5]   // most recent first
 *   t.getNewsFeed(2)                    ->  [6]      // 2 does not follow 1
 *   t.follow(1, 1); t.getNewsFeed(1)    ->  [6, 5]   // a self-follow adds no duplicates
 *   t.unfollow(1, 3);                                // never followed — a harmless no-op
 *   t.unfollow(1, 2); t.getNewsFeed(1)  ->  [5]
 *
 * EDGE CASES
 *   - A user's own tweets always appear in their feed, followed or not.
 *   - Following yourself must not duplicate tweets.
 *   - Unfollowing someone you do not follow must not throw.
 *
 * -------------------------- SPOILERS BELOW --------------------------
 *
 * COMPLEXITY
 *   Naive:  O(total tweets) per feed — gather every tweet from every followee and sort them all.
 *   Target: O(k log f) per feed — keep each user's tweets newest-first with a global timestamp,
 *           then merge the followees' lists with a heap, stopping after 10.
 * ----------------------------------------------------------------------
 */

class Twitter {
  // TODO: your solution here
}

module.exports = { Twitter };
