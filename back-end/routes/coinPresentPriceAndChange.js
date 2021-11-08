const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

//gets the present price and the present percantage price change relative to the previous 24 hours for all coins that the API supports
router.get("/", (req, res) => {
  axios
    .request("https://api.coincap.io/v2/assets")
    .then((response) => {
      const presentPriceAndChange = response.data.data.map(
        ({ id, changePercent24Hr, priceUsd }) => ({
          id: id,
          price: priceUsd,
          priceChange: changePercent24Hr,
        }),
      );
      const presentPriceAndChangeDict = presentPriceAndChange.reduce(
        (a, x) => ({
          ...a,
          [x.id]: { price: x.price, priceChange: x.priceChange },
        }),
        {},
      );
      console.log(
        `coinPresentPriceAndChange: GET DAILY PRICE-&-CHANGE FOR ALL COINS SUCCEEDED`,
      );
      res.status(200).json(presentPriceAndChangeDict);
    })
    .catch((err) => {
      console.log(
        `coinPresentPriceAndChange: GET DAILY PRICE-&-CHANGE FOR ALL COINS FAILED`,
      );
      console.log(err);
      res.status(500).json({
        message: `coinPresentPriceAndChange: GET DAILY PRICE-&-CHANGE FOR ALL COINS FAILED`,
      });
    });
});

//get the present price and the present percantage price change relative to the previous 24 hours for only a select coin
//note that coinID has to be lower case
router.get("/:coinID", (req, res) => {
  const coinID = req.params.coinID;
  axios
    .request(`https://api.coincap.io/v2/assets/${coinID}`)
    .then((response) => {
      console.log(`coinID = ${coinID}`);
      if (coinID === response.data.data.id) {
        const presentPriceAndChange = {
          price: response.data.data.priceUsd,
          priceChange: response.data.data.changePercent24Hr,
        };
        res.status(200).json(presentPriceAndChange);
      } else {
        throw err;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `coinPresentPriceAndChange: GET DAILY PRICE-&-CHANGE FOR ${coinID} FAILED`,
      });
    });
});

module.exports = router;
