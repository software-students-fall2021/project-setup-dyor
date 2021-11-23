require("../schemas/coinLabelModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const coinLabel = mongoose.model("coinLabel");
const { cryptoSymbols } = require('../data')

router.post("/", (req, res) => {
  const { name, symbol } = req.body;

  const newCoin = new coinLabel({
    name: name,
    symbol: symbol,
  });

  newCoin.save((err, newCoin) => {
    if (err) {
      return err;
    }
    res.status(201).json(newCoin);
  });
});

router.get("/", (req, res) => {
  coinLabel.find((err, coins) => {
    if (err) {
      return err
    }
    res.json(coins)
  })
});

module.exports = router;
