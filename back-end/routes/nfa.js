const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");
// const { listen } = require("../app");
// var { cryptoSymbols, assetNews, allImages } = database;

let endpoint;
// for now using mockaroo to mock the behavior of api
const getCryptoInfo = async () => {
  database.cryptoData = [];
  const url = "https://my.api.mockaroo.com/tweets.json?key=a2c1d970";
  let isSucces = false;

  await axios
    .get(url)
    .then((res) => {
      database.cryptoData = res.data;
      isSucces = true;
    })
    .catch((err) => {
      if (err.response) {
        console.log("Error response from API", err.response.status);
      } else if (err.request) {
        console.log("No response from API", err.response.status);
      }
    });

  return isSucces;
};

router.get("/wordcloud", (req, res) => {
  let tickers;

  let recievedData;
  const getData = async () => {
    recievedData = await getCryptoInfo();
    if (recievedData === true) {
      tickers = database.cryptoData.map((a) => a.description);
      endpoint = `https://quickchart.io/wordcloud?text=${tickers}&format=png&width=310&height=150`;
    } else {
      res.status(500);
    }

    if (endpoint) {
      res.status(200).json({ data: endpoint });
    } else {
      res.status(500);
    }
  };
  getData();
});

module.exports = router;
