const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");
var { socials, assetNews} = database;

//Get news from mockaroo (Mocking it for the time being)
router.get("/", (req, res) => {
  if (Object.keys(assetNews).length === 0) {
    const articles = async () => {
      const isSucces = await getArticles();
      if (isSucces === true) {
        res.status(200).json(database.assetNews);
      } else res.status(500).send("Could not get data from API");
    };
    articles();
  } else {
    res.status(200).json(assetNews);
  }
});

router.get("/asset/:coin", (req, res) => {
  let asset = req.params.coin;
  if (asset === undefined) {
    res.status(404).json({
      message: "Page not found",
    });
  }
  let flag = false;
  for (let coin in socials) {
    if (socials[coin].name.toLowerCase() === asset.toLowerCase()) {
      flag = true;
      break;
    }
  }
  if (flag) {
    if (assetNews[asset].length === 0) {
      const articles = async () => {
        const isSucces = await getArticles();
        if (isSucces === true) {
          res.status(200).json(database.assetNews[asset]);
        } else res.status(500).send("Could not get data from API");
      };
      articles();
    } else {
      res.status(200).send(database.assetNews[asset]);
    }
  } else {
    res.status(404).json({ message: "Page not found" });
  }
});

const getArticles = async () => {
  const coins = [...getCoins(), "crypto"];
  const today = new Date().toISOString().slice(0, 10);

  let isSucces = false;

  for (let i = 0; i < coins.length; ++i) {
    const url = `https://newsapi.org/v2/everything?q=+${coins[i]}&from=${today}&language=en&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}&pageSize=20`;
    await axios
      .get(url)
      .then((res) => {
        assetNews[coins[i]] = res.data.articles;
        isSucces = true;
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error response from API", err.response.stausText);
        } else if (err.request) {
          console.log("No response from API", err.response.stausText);
        }
      });
  }

  return isSucces;
};

const getCoins = () => {
  //News for top 10 popular coins
  let coins = [];
  for (let coin in socials) {
    coins.push(socials[coin].name);
  }

  return coins;
};

var newsRoutes = (module.exports = {
  router: router,
  getAllNews: getArticles,
});
