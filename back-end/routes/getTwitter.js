const express = require("express");
const needle = require("needle");
const twitterDatabase = require("../schemas/tweetsModel");
const router = express.Router();
const fs = require("fs");
const keyword_extractor = require("keyword-extractor");

let twitter = {};
const coins = {
  BTC: "bitcoin",
  DOGE: "dogecoin",
  ETH: "ethereum",
  ADA: "cardano",
  LTC: "litecoin",
  SHIB: "shiba inu",
  DOT: "polkadot",
  crypto: "cryptocurrency",
  SOL: "solana",
};

router.put("/", async (req, res) => {
  const allTweets = await twitterDatabase.find({});
  const totalCoins = Object.keys(allTweets).length;

  if (totalCoins === 0) {
    const success = await getAllTweets();
    if (success) {
      res
        .status(200)
        .json({ message: "Everything in Database working allTweets" });
    }
  } else {
    const lastRefreshed = allTweets[0]["dateRefreshed"];
    const parsedDate = Date.parse(lastRefreshed);
    const currentTime = Date.now();
    const timeDiff = (currentTime - parsedDate) / 1000;
    const timeInHours = timeDiff / 3600;

    if (timeInHours < 1) {
      res
        .status(200)
        .json({ message: "Everything in Database working allTweets" });
    } else {
      console.log("Past 12 hours");
      const success = await getAllTweets();
      if (success) {
        extractWords();
        res
          .status(200)
          .json({ message: "Everything in Database working allTweets" });
      }
    }
  }
});

router.get("/:coin", async (req, res) => {
  let coin = req.params.coin;
  if (coin === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  } else {
    if (Object.keys(coins).includes(coin.toUpperCase())) {
      coin = coins[coin.toUpperCase()];
    }
    if (coin !== undefined) {
      await twitterDatabase.findOne({ coin: coin }, (err, response) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Could not get news from API" });
        } else if (response) {
          res.status(200).json(response["posts"]);
        } else {
          res.status(500).json({ message: "Could not get tweets from API" });
        }
      });
    } else {
      res.status(404).json({
        message: "Page not found",
      });
    }
  }
});

const getAllTweets = async () => {
  let i = 0;
  for (let coin in coins) {
    const articles = async () => {
      const tweets = await getTweets(coin, coins[coin]);
      const success = await putInDatabase(coins[coin], tweets);
      console.log(success ? "PutDatabase Success" : "PutDatabase Failed");
      twitter[coin.toLowerCase()] = tweets;
    };
    articles();

    i = i + 1;
  }

  if (i >= 8) return true;
  else return false;
};

//Get Tweets
const getTweets = async (shortForm, coin) => {
  const endpoint = "https://api.twitter.com/2/tweets/search/recent";
  const token = process.env.TWITTER_BEARER_TOKEN;
  const query = `(#${coin} OR #${shortForm}) lang:en -is:retweet -is:reply is:verified`;

  let tweets = [];

  const params = {
    query: query,
    "user.fields": "name,username",
    "tweet.fields": "author_id,lang",
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
    const map = new Map();
    const allTweets = res.body.data;
    let users = res.body.includes.users;

    //Put posters in a map
    for (let i = 0; i < users.length; ++i) {
      let user = users[i];
      map.set(user.id, [user.name, user.username]);
    }

    //Go through tweets and posters to them
    for (let i = 0; i < allTweets.length; ++i) {
      let tweet = allTweets[i];
      let idx = tweet.text.indexOf("https://t.co/");
      let url = "";
      if (idx !== -1) {
        while (
          idx < tweet.text.length &&
          tweet.text[idx] !== " " &&
          tweet.text[idx] !== "\n"
        ) {
          url += tweet.text[idx];
          ++idx;
        }
      }

      const author = tweet.author_id;
      authorDetails = map.get(author);
      tweets.push({
        name: map.has(author) ? authorDetails[0] : tweet.author_id,
        username: map.has(author) ? authorDetails[1] : tweet.author_id,
        tweet: tweet.text,
        url: url,
      });
    }
    extractWords(tweets, shortForm);
  } else {
    console.log("Unsuccesful request");
  }

  return tweets;
};

const putInDatabase = async (coin, tweets) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    posts: tweets,
    dateRefreshed: Date.now(),
  };
  const opts = { new: true, upsert: true };

  const response = await twitterDatabase.findOneAndUpdate(query, update, opts);
  if (response.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

const extractWords = (tweets, shortForm) => {
  try {
    //  Extract the keywords
    const stringData = JSON.stringify(
      tweets.map((data) => data.tweet + " "),
    ).replace(/[^a-zA-Z ]/g, "");
    const extraction_result = keyword_extractor.extract(stringData, {
      language: "english",
      remove_digits: true,
      remove_duplicates: false,
    });
    fs.writeFile(
      `./public/socials/${shortForm}.json`,
      '["' + extraction_result.join(" ").substring(0, 1500) + '"]',
      (err) => {
        if (err) console.log(err);
        else {
          console.log("Succesful Writing.");
        }
      },
    );
  } catch (err) {
    console.log("STRINGIFY FAILED FOR NEW DATA.");
  }
};

module.exports = router;
