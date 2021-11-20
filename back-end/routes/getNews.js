const express = require("express");
const axios = require("axios");
const router = express.Router();
const newsDatabase = require("../schemas/newsModel");
const needle = require("needle");

const coins = [
  "bitcoin",
  "dogecoin",
  "ethereum",
  "cardano",
  "litecoin",
  "shiba inu",
  "polkadot",
  "cryptocurrency",
];

const assetNews = {};

router.get("/", async (req, res) => {
  const allNews = await newsDatabase.find({});
  const totalCoins = Object.keys(allNews).length;

  if (totalCoins === 0) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  } else {
    let resNews = {};
    for (let i = 0; i < allNews.length; ++i) {
      const { coin, news } = allNews[i];
      resNews[coin] = news;
    }
    res.status(200).json(resNews);
  }
});

router.put("/", async (req, res) => {
  const allNews = await newsDatabase.find({});
  const totalCoins = Object.keys(allNews).length;

  if (totalCoins === 0) {
    const success = await getAllArticles();
    if (success) {
      res
        .status(200)
        .json({ message: "Everything in Database working finally" });
    }
  } else {
    const lastRefreshed = allNews[0]["dateRefreshed"];
    const parsedDate = Date.parse(lastRefreshed);
    const currentTime = Date.now();
    const timeDiff = (currentTime - parsedDate) / 1000;
    const timeInHours = timeDiff / 3600;

    if (timeInHours < 12) {
      res
        .status(200)
        .json({ message: "Everything in Database working finally" });
    } else {
      const success = await getAllArticles();
      if (success) {
        res
          .status(200)
          .json({ message: "Everything in Database working finally" });
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
    if (coins.includes(coin.toLowerCase())) {
      await newsDatabase.findOne({ coin: coin }, (err, response) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Could not get news from API" });
        } else if (response) {
          res.status(200).json(response["news"]);
        } else {
          res.status(500).json({ message: "Could not get news from API" });
        }
      });
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  }
});

const getAllArticles = async () => {
  let i = 0;
  for (let coin in coins) {
    const articles = async () => {
      const coinNews = await getArticle(coins[coin]);
      const success = await putInDatabase(coins[coin], coinNews);
      // console.log(success ? "PutDatabase Success" : "PutDatabase Failed");
      assetNews[coins[coin].toLowerCase()] = coinNews;
    };
    articles();

    i = i + 1;
  }

  if (i >= 8) return true;
  else return false;
};

const getArticle = async (coin) => {
  const today = new Date().toISOString().slice(0, 10);
  let received = [];

  const url = `https://newsapi.org/v2/everything?q=+${coin}&from=${today}&language=en&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`;
  await needle("get", url)
    .then((res) => {
      received = res.body.articles;
    })
    .catch((err) => {
      console.error(err);
    });
  return received;
};

const putInDatabase = async (coin, coinNews) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    news: coinNews,
    dateRefreshed: Date.now(),
  };
  const opts = { new: true, upsert: true };

  const response = await newsDatabase.findOneAndUpdate(query, update, opts);
  if (response.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

module.exports = router;
