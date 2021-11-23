const express = require("express");
const router = express.Router();
const newsDatabase = require("../schemas/newsModel");
const { cryptoSymbols } = require("../data");

const coins = ["cryptocurrency"];
for (let i = 0; i < cryptoSymbols.length; ++i) {
  const { name } = cryptoSymbols[i];
  coins.push(name.toLowerCase());
}

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

router.get("/:coin", async (req, res) => {
  let coin = req.params.coin;
  if (coin === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  } else {
    if (coins.includes(coin.toLowerCase())) {
      await newsDatabase.findOne({ coin: coin.toLowerCase() }, (err, response) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Could not get news from API" });
        } else if (response) {
          res.status(200).json(response["news"]);
        } else {
          res.status(404).json({ message: "Page not found" });
        }
      });
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  }
});

module.exports = router;
