const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");
const { listen } = require("../app");
var { cryptoSymbols, assetNews, allImages } = database;

let endpoint;
router.get("/wordcloud", (req, res) => {
  const tickers = cryptoSymbols.map((ticker) => ticker.name);
  endpoint = `https://quickchart.io/wordcloud?text=${tickers}&format=png&width=310&height=150`;
  res.send(endpoint);
});

module.exports = router;
