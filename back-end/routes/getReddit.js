const express = require("express");
const router = express.Router();
const redditDatabase = require("../schemas/redditModel");

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
  const docs = await redditDatabase.find({}, { _id: 0, coin: 1, posts: 1 });
  let j = 0;
  for (let i = 0; i < docs.length; ++i) {
    const { coin, posts } = docs[i];
    const shortForm = Object.keys(coins).find((key) => coins[key] === coin);
    extractWords(posts, shortForm);
    j = j + 1;
  }
  if (j >= docs.length) {
    res.status(201).json({ message: "Written successfully" });
  } else {
    res.status(500).json({ message: "Writing failed" });
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
          res.status(404).json({ message: "Page not found" });
        }
      });
    } else {
      res.status(404).json({
        message: "Page not found",
      });
    }
  }
});

const extractWords = (posts, shortForm) => {
  try {
    //  Extract the keywords
    const stringData = JSON.stringify(
      posts.map((data) => data.data.selftext + " "),
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
          // console.log("Succesful Writing.");
        }
      },
    );
  } catch (err) {
    console.log("STRINGIFY FAILED FOR NEW DATA.");
  }
};

module.exports = router;
