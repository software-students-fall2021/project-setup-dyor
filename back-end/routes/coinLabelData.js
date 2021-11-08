const express = require("express");
const router = express.Router();
const database = require("../data");

const { cryptoSymbols } = database;

//Will return all the cryptocurrencies which are supported by our platform, these have been taken to be the 200 most popular cypto-currencies\
router.get("/", (req, res) => {
  res.status(200).json(cryptoSymbols);
});

module.exports = router;
