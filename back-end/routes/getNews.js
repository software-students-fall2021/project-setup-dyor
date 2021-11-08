const express = require("express");
const axios = require("axios");
const router = express.Router();
const database = require("../data");
var { cryptoSymbols, assetNews, allImages } = database;

const coins = [];

//Get news from mockaroo (Mocking it for the time being)
router.get("/", (req, res) => {
  if (Object.keys(assetNews).length === 0) {
    const articles = async () => {
      const isSucces = await getArticles();
      if (isSucces === true) res.status(200).json(assetNews);
      else res.status(500).send("Could not get data from API");
    };
    articles();
  } else {
    res.status(200).json(assetNews);
  }
});

router.get("/asset/:coin", (req, res) => {
  let asset = req.params.coin;
  let flag = false;
  for (let i = 0; i < cryptoSymbols.length; ++i) {
    if (cryptoSymbols[i].name.toLowerCase() === asset.toLowerCase()) {
      flag = true;
      break;
    }
  }
  if (flag) {
    if (database.cryptoNews.length === 0) {
      const articles = async () => {
        const isSucces = await getArticles();
        if (isSucces === true) {
          res.status(200).json(database.assetNews[asset]);
        } else res.status(500).send("Could not get data from API");
      };
      articles();
    } else {
      res.status(200).send(database.cryptoNews);
    }
  } else {
    res.status(404).send("Page not found");
  }
});

router.get("/crypto", (req, res) => {
  if (database.cryptoNews.length === 0) {
    const articles = async () => {
      const isSucces = await getCrytoNews();
      if (isSucces === true) {
        res.status(200).json(database.cryptoNews);
      } else res.status(500).send("Could not get data from API");
    };
    articles();
  } else {
    res.status(200).send(database.cryptoNews);
  }
});

router.get("/images", (req, res) => {
  if (allImages.length === 0) {
    const images = async () => {
      const isSucces = await getImages();
      if (isSucces === true) res.status(200).json(allImages);
      else res.status(500).send("Could not get data from API");
    };
    images();
  } else {
    res.status(200).json(allImages);
  }
});

const getImages = async () => {
  const images = "https://picsum.photos/v2/list?page=2&limit=20";
  let isSucces = false;
  await axios
    .get(images)
    .then((res) => {
      for (let i = 0; i < 20; ++i) {
        allImages.push(res.data[i].download_url);
      }
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

const getCrytoNews = async () => {
  database.cryptoNews = [];
  const url = "https://my.api.mockaroo.com/crypto.json?key=9371d6e0";
  let isSucces = false;

  await axios
    .get(url)
    .then((res) => {
      database.cryptoNews = res.data;
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

const getArticles = async () => {
  for (let i = 0; i < cryptoSymbols.length; ++i) {
    coins.push(cryptoSymbols[i].name.toLowerCase());
  }

  // const date = new Date("2021-10-26");
  const url = "https://my.api.mockaroo.com/articles.json?key=9371d6e0";
  // const url = `https://newsapi.org/v2/everything?qInTitle=+${coins[i]}&from=${date}&language=en&sortBy=relevancy&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`

  let isSucces = false;
  await axios
    .get(url)
    .then((res) => {
      let j = 0;
      for (let i = 0; i < coins.length; ++i) {
        assetNews[coins[i]] = res.data.slice(j, j + 10);
        j = (j + 10) % 1000;
      }
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

var newsRoutes = (module.exports = {
  router: router,
  getCrytoNews: getCrytoNews,
  getAllNews: getArticles,
  getImages: getImages,
});
