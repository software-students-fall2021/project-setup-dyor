const axios = require("axios");
const database = require("../data");
var { userAssets, assetNews, allImages } = database;

const coins = [];

const getImagesAPI = async () => {
  const images = "https://picsum.photos/v2/list?page=2&limit=20";
  await axios
    .get(images)
    .then((res) => {
      for (let i = 0; i < 20; ++i) {
        allImages.push(res.data[i].download_url);
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log("Error response from API", err.response.status);
      } else if (err.request) {
        console.log("No response from API", err.response.status);
      }
    });
};

const getCryptoNews = async () => {
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
  for (let i = 0; i < userAssets.length; ++i) {
    coins.push(userAssets[i].id);
  }

  // const date = new Date("2021-10-26");
  const url = "https://my.api.mockaroo.com/articles.json?key=9371d6e0";
  // const url = `https://newsapi.org/v2/everything?qInTitle=+${coins[i]}&from=${date}&language=en&sortBy=relevancy&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=20`

  let isSucces = false;
  await axios
    .get(url)
    .then((res) => {
      let j = 0;
      assetNews["cryptocurrency"] = res.data.slice(j, j + 10);
      j = j + 10;
      for (let i = 0; i < coins.length; ++i) {
        assetNews[coins[i]] = res.data.slice(j, j + 20);
        j = j + 20;
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

var newsAPI = (module.exports = {
  articlesAPI: getArticles,
  imagesAPI: getImagesAPI,
  cryptoAPI: getCryptoNews,
});
