const express = require("express");
const needle = require("needle");
const router = express.Router();
const database = require("../data");

router.get("/tweets/:id", (req, res) => {
  if (database.tweets.length === 0) {
    const tweets = async () => {
      const endpoint = "https://api.twitter.com/2/tweets/search/recent";
      const isSucces = await getTweets(endpoint, req.params.id);
      if (isSucces === true) res.status(200).json(database.tweets);
      else res.status(500).send("Could not get data from API");
    };
    tweets();
  } else {
    res.status(200).json(database.tweets);
  }
});

const getTweets = async (endpoint, coin) => {
  const token = process.env.TWITTER_BEARER_TOKEN;
  const query = `(#${coin} OR #Btc) lang:en -is:retweet -is:reply is:verified`;
  let isSucces = false;

  const params = {
    query: query,
    "user.fields": "name,username",
    "tweet.fields": "author_id",
    max_results: 100,
    expansions: "author_id",
  };

  const res = await needle("get", endpoint, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    database.tweets = res.body.data;
    console.log(res.body);
    isSucces = true;
  } else {
    throw new Error("Unsuccessful request");
  }

  return isSucces;
};

module.exports = router;
