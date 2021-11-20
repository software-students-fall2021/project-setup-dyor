const express = require("express");
const router = express.Router();
const needle = require("needle");
const axios = require("axios");
const redditDatabase = require("../schemas/redditModel");
const fs = require("fs");
const keyword_extractor = require("keyword-extractor");

let redditPosts = {};
// let extractPosts = {};

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
  const allReddit = await redditDatabase.find({});
  const totalCoins = Object.keys(allReddit).length;

  if (totalCoins === 0) {
    const success = await getAllPosts();
    if (success) {
      res
        .status(200)
        .json({ message: "Everything in Database working allReddit" });
    }
  } else {
    const lastRefreshed = allReddit[0]["dateRefreshed"];
    const parsedDate = Date.parse(lastRefreshed);
    const currentTime = Date.now();
    const timeDiff = (currentTime - parsedDate) / 1000;
    const timeInHours = timeDiff / 3600;

    if (timeInHours < 1) {
      res
        .status(200)
        .json({ message: "Everything in Database working allReddit" });
    } else {
      console.log("Past 12 hours");
      const success = await getAllPosts();
      if (success) {
        res
          .status(200)
          .json({ message: "Everything in Database working allReddit" });
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
      await redditDatabase.findOne({ coin: coin }, (err, response) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Could not get news from API" });
        } else if (response) {
          res.status(200).json(response["posts"]);
        } else {
          res.status(500).json({ message: "Could not get posts from API" });
        }
      });
    } else {
      res.status(404).json({
        message: "Page not found",
      });
    }
  }
});

const getAllPosts = async () => {
  let i = 0;
  for (let coin in coins) {
    const articles = async () => {
      const posts = await getPost(coin);
      const success = await putInDatabase(coins[coin], posts);
      // console.log(success ? "PutDatabase Success" : "PutDatabase Failed");
      redditPosts[coin.toLowerCase()] = posts;
    };
    articles();
    i = i + 1;
  }

  if (i >= 8) return true;
  else return false;
};

//Get Reddit
const getPost = async (shortForm) => {
  let posts = [];
  const channels = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SHIB: "Shibacoin",
    DOGE: "dogecoin",
    LTC: "litecoin",
    DOT: "dot",
    ADA: "cardano",
    SOL: "solana",
    crypto: "CryptoCurrency",
  };

  const url = `https://www.reddit.com/r/${channels[shortForm]}/hot.json?limit=100`;
  const res = await needle("get", url);
  if (res.body) {
    posts = res.body.data.children.filter((post) => post.data.selftext !== "");
  } else {
    console.log("Unsuccesful request");
  }
  return posts;
};

const putInDatabase = async (coin, posts) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    posts: posts,
    dateRefreshed: Date.now(),
  };
  const opts = { new: true, upsert: true };

  const response = await redditDatabase.findOneAndUpdate(query, update, opts);
  if (response.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

// const extractWords = (posts, shortForm) => {
//   try {
//     const stringData = JSON.stringify(
//       posts.map((data1) => data1.data.selftext + " "),
//     );
//     const extraction_result = keyword_extractor.extract(stringData, {
//       language: "english",
//       remove_digits: true,
//       remove_duplicates: false,
//     });
//     fs.writeFile(
//       `./public/socials/${shortForm}.json`,
//       '["' + extraction_result.join(" ").substring(0, 1000) + '"]',
//       (err) => {
//         if (err) console.log(err);
//         else {
//           console.log("Succesful Writing.");
//         }
//       },
//     );
//   } catch (err) {
//     console.log("STRINGIFY FAILED FOR NEW DATA.");
//   }
// };

module.exports = router;
