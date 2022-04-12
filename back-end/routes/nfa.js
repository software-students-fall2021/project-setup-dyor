const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");
const fs = require("fs");
// const { listen } = require("../app");
// var { cryptoSymbols, assetNews, allImages } = database;
let tickers;
let endpoint;
// // for now using mockaroo to mock the behavior of api
// const getCryptoInfo = async () => {
//   database.cryptoData = [];
//   const url = "https://my.api.mockaroo.com/tweets.json?key=a2c1d970";
//   let isSucces = false;

//   await axios
//     .get(url)
//     .then((res) => {
//       database.cryptoData = res.data;
//       isSucces = true;
//     })
//     .catch((err) => {
//       if (err.response) {
//         console.log("Error response from API", err.response.status);
//       } else if (err.request) {
//         console.log("No response from API", err.response.status);
//       }
//     });

//   return isSucces;
// };

router.get("/wordcloud/:id", (req, res) => {
  let coin = req.params.id;

  fs.readFile(`./public/socials/${coin}.json`, "utf-8", (err, jsonString) => {
    //if the data has not been previously written to file it will now be fetched
    if (err) {
      // console.log(`DATA NOT PRESENT`);
      // res.status(500);
      res.status(500).json({ error: "Error Getting the wordcloud" });
    } else {
      //if the data has been previously written to file it shall be fetched from thereon
      // console.log(`DATA ALREADY PRESENT`);
      try {
        tickers = JSON.parse(jsonString);
        endpoint = `https://quickchart.io/wordcloud?text=${tickers}&format=png&width=310&height=150`;
        res.status(200).json({ data: endpoint });
      } catch (err) {
        // console.log(err);
        console.log("PARSE FAILED FOR EXISTING DATA.");
      }
    }
  });
  // if (endpoint) {
  // res.status(200).json({ data: endpoint });
  // } else {
  //   res.status(500);
  // }
});

module.exports = router;
