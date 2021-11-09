const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");

router.get("/", (req, res) => {
  const url =
    "https://api.cryptometer.io/trend-indicator-v3?api_key=9X26vit6801U1bq43wdt346U29hZ8gqsR4wXZrbD";

  axios
    .get(url)
    .then((response) => {
      // console.log(response.data['data'][0].sell_pressure - response.data['data'][0].buy_pressure);
      // sentimentData['data'][0].buy_pressure
      res.status(200).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("Error response from API", err.response.status);
      } else if (err.request) {
        console.log("No response from API", err.response.status);
      }
    });
});

module.exports = router;
