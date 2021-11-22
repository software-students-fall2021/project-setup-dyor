const newsDatabase = require("../schemas/newsModel");
const { news } = require("./validate");
const needle = require("needle");
require("dotenv").config();
const { cryptoSymbols } = require("../data");

const allCoins = ["cryptocurrency"];
for (let i = 0; i < cryptoSymbols.length; ++i) {
  const { name } = cryptoSymbols[i];
  allCoins.push(name.toLowerCase());
}

const refreshNews = async () => {
  let coins = await newsDatabase.find({}, { _id: 0, coin: 1 });
  let i = 0;

  if (coins.length < allCoins.length) {
    for (let j = 0; j < allCoins.length; ++j) {
      const coin = allCoins[j];
      const coinNews = await getArticle(coin);
      const success = await putInDatabase(coin, coinNews);
      i = i + 1;
    }
    if (i >= 8) console.log("Success");
    else console.log("Failed");
  } else {
    for (let j = 0; j < coins.length; ++j) {
      const { coin } = coins[j];
      const coinNews = await getArticle(coin);
      const success = await putInDatabase(coin, coinNews);
      i = i + 1;
    }

    if (i >= 8) console.log("Success");
    else console.log("Failed");
  }
};

const getArticle = async (coin) => {
  const today = new Date().toISOString().slice(0, 10);
  let received = [];

  const url = `https://newsapi.org/v2/everything?q=+${coin}&from=${today}&language=en&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`;
  await needle("get", url)
    .then((res) => {
      received = res.body.articles;
    })
    .catch((err) => {
      console.error(err);
    });
  return received;
};

const putInDatabase = async (coin, coinNews) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    news: coinNews,
    dateRefreshed: Date.now(),
  };

  const { error } = news(update);
  if (error) return false;

  const opts = { new: true, upsert: true };

  const response = await newsDatabase.findOneAndUpdate(query, update, opts);
  if (response.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

module.exports = refreshNews;
