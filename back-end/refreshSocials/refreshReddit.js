const redditDatabase = require("../schemas/redditModel");
const { socials } = require("./validate");
const needle = require("needle");
require("dotenv").config();

const coins = {
  BTC: "bitcoin",
  DOGE: "dogecoin",
  ETH: "ethereum",
  ADA: "cardano",
  LTC: "litecoin",
  SHIB: "shiba inu",
  DOT: "polkadot",
  crypto: "cryptocurrency",
  SOL: "solana",
};

const refreshReddit = async () => {
  let i = 0;
  for (let coin in coins) {
    const posts = await getPost(coin);
    const success = await putInDatabase(coins[coin], posts);
    i = i + 1;
  }

  if (i >= 8) console.log("Success");
  else console.log("Failed");
};

const getPost = async (shortForm) => {
  let posts = [];
  const channels = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SHIB: "Shibacoin",
    DOGE: "dogecoin",
    LTC: "litecoin",
    DOT: "dot",
    ADA: "cardano",
    SOL: "solana",
    crypto: "CryptoCurrency",
  };

  const url = `https://www.reddit.com/r/${channels[shortForm]}/hot.json?limit=100`;
  const res = await needle("get", url);
  if (res.body.data.children) {
    posts = res.body.data.children.filter((post) => post.data.selftext !== "");
  } else {
    console.log("Unsuccesful request");
  }
  return posts;
};

const putInDatabase = async (coin, posts) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    posts: posts,
    dateRefreshed: Date.now(),
  };

  const { error } = socials(update);
  if (error) return false;

  const opts = { new: true, upsert: true };

  const response = await redditDatabase.findOneAndUpdate(query, update, opts);
  if (response.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

module.exports = refreshReddit;
