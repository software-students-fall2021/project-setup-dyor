const twitterDatabase = require("../schemas/tweetsModel");
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

const refreshTwitter = async () => {
  let i = 0;
  for (let coin in coins) {
    const tweets = await getTweets(coin, coins[coin]);
    const success = await putInDatabase(coins[coin], tweets);
    if(success) i = i + 1;
  }

  if (i >= 8) {
    console.log("Success");
  } else console.log("Failed");
};

const getTweets = async (shortForm, coin) => {
  const endpoint = "https://api.twitter.com/2/tweets/search/recent";
  const token = process.env.TWITTER_BEARER_TOKEN;
  const query = `(#${coin} OR #${shortForm}) lang:en -is:retweet -is:reply is:verified`;

  let tweets = [];

  const params = {
    query: query,
    "user.fields": "name,username",
    "tweet.fields": "author_id,lang",
    max_results: 100,
    expansions: "author_id",
  };

  const res = await needle("get", endpoint, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res && res.body) {
    const map = new Map();
    const allTweets = res.body.data;
    let users = res.body.includes.users;

    //Put posters in a map
    for (let i = 0; i < users.length; ++i) {
      let user = users[i];
      map.set(user.id, [user.name, user.username]);
    }

    //Go through tweets and posters to them
    for (let i = 0; i < allTweets.length; ++i) {
      let tweet = allTweets[i];
      let idx = tweet.text.indexOf("https://t.co/");
      let url = "";
      if (idx !== -1) {
        while (
          idx < tweet.text.length &&
          tweet.text[idx] !== " " &&
          tweet.text[idx] !== "\n"
        ) {
          url += tweet.text[idx];
          ++idx;
        }
      }

      const author = tweet.author_id;
      authorDetails = map.get(author);
      tweets.push({
        name: map.has(author) ? authorDetails[0] : tweet.author_id,
        username: map.has(author) ? authorDetails[1] : tweet.author_id,
        tweet: tweet.text,
        url: url,
      });
    }
    // extractWords(tweets, shortForm);
  } else {
    console.log("Unsuccesful request");
  }

  return tweets;
};

const putInDatabase = async (coin, tweets) => {
  const query = { coin: coin.toLowerCase() };
  const update = {
    coin: coin.toLowerCase(),
    posts: tweets,
    dateRefreshed: Date.now(),
  };
  const opts = { new: true, upsert: true };

  const { error } = socials(update);
  if (error) return false;

  const result = await twitterDatabase.findOneAndUpdate(query, update, opts);
  if (result && result.coin.toLowerCase() === coin.toLowerCase()) return true;
  else return false;
};

module.exports = refreshTwitter;
