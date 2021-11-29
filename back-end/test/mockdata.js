const JWT = require("jsonwebtoken");

const MockAssets = [
  {
    name: "Ethereum",
    quantityPurchased: 1,
    unitPrice: 3000,
    datePurchased: "2021-11-21T00:56:01.438+00:00",
  },
  {
    name: "Bitcoin",
    quantityPurchased: 1,
    unitPrice: 60000,
    datePurchased: "2021-10-21T00:56:01.438+00:00",
  },
];

const MockUserOneRepeatedAsset = {
  id: "Ethereum",
  quantityPurchased: 2,
  unitPrice: 2500,
  datePurchased: "2021-11-21T00:56:01.438+00:00",
};

const MockNewAsset = {
  id: "Polkadot",
  quantityPurchased: 10,
  unitPrice: 20,
  datePurchased: "2021-10-27T00:56:01.438+00:00",
};

const MockUserOne = {
  _id: "61a339ebbe67295a6cfd0ade",
  email: "johncena@gmail.com",
  data: {
    assets: MockAssets,
  },
  password: "you_can't_see_me",
};

const MockUserTwo = {
  _id: "619339ebbe67295a6cfd0ade",
  email: "reymysterio@gmail.com",
  data: {},
  password: "619",
};

const MockUserOneJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "61a339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_SECRET,
);

const MockUserTwoJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "619339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_SECRET,
);

//this is a valid token, but the user being referred to is not present in the data base he has been deleted
const ValidDeletedUserJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "60d339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_SECRET,
);

const InValidJWT = JWT.sign(
  {
    iss: "DYOR",
    sub: "61a339ebbe67295a6cfd0ade",
    iat: new Date().getTime(),
  },
  process.env.JWT_INVALID_SECRET,
);

const MockNewsOne = {
  coin: "bitcoin",
  dateRefreshed: Date.now(),
  news: [
    {
      source: {},
      author: "cshumba@insider.com (Camomile Shumba)",
      title:
        "Cryptocurrencies recover from last week's sell-off as traders mull the...",
      description:
        "Bitcoin recovered from Friday's steep sell-off, rising around 5% and l...",
      url: "https://markets.businessinsider.com/news/currencies/bitcoin-ether-shib...",
      urlToImage:
        "https://images2.markets.businessinsider.com/61a4c8b71ca5280018119b1b?f...",
      publishedAt: "2021-11-29T12:54:16Z",
      content:
        "MicroStrategy CEO Michael SaylorJoe Raedle/Getty Images MicroStrategy...",
    },
    {
      source: {},
      author: "cshumba@insider.com (Camomile Shumba)",
      title:
        "Michael Saylor's MicroStrategy buys another 7,002 bitcoins for $414 mi...",
      description:
        "Tech firm MicroStrategy bought the bitcoin in the past two months, whe...",
      url: "https://markets.businessinsider.com/news/currencies/michael-saylor-mic...",
      urlToImage:
        "https://images2.markets.businessinsider.com/61a4e5061ca5280018119f68?f...",
      publishedAt: "2021-11-29T16:53:22Z",
      content:
        "MicroStrategy CEO Michael SaylorJoe Raedle/Getty Images MicroStrategy...",
    },
  ],
};
const MockNewsTwo = {
  coin: "ethereum",
  dateRefreshed: Date.now(),
  news: [
    {
      source: {},
      author: "cshumba@insider.com (Camomile Shumba)",
      title:
        "Cryptocurrencies recover from last week's sell-off as traders mull the...",
      description:
        "Ethereum recovered from Friday's steep sell-off, rising around 5% and l...",
      url: "https://markets.businessinsider.com/news/currencies/bitcoin-ether-shib...",
      urlToImage:
        "https://images2.markets.businessinsider.com/61a4c8b71ca5280018119b1b?f...",
      publishedAt: "2021-11-29T12:54:16Z",
      content:
        "MicroStrategy CEO Michael SaylorJoe Raedle/Getty Images MicroStrategy...",
    },
    {
      source: {},
      author: "cshumba@insider.com (Camomile Shumba)",
      title:
        "Michael Saylor's MicroStrategy buys another 7,002 bitcoins for $414 mi...",
      description:
        "Tech firm MicroStrategy bought the ethereum in the past two months, whe...",
      url: "https://markets.businessinsider.com/news/currencies/michael-saylor-mic...",
      urlToImage:
        "https://images2.markets.businessinsider.com/61a4e5061ca5280018119f68?f...",
      publishedAt: "2021-11-29T16:53:22Z",
      content:
        "MicroStrategy CEO Michael SaylorJoe Raedle/Getty Images MicroStrategy...",
    },
  ],
};

const RedditOne = {
  coin: "bitcoin",
  dateRefreshed: Date.now(),
  posts: [
    {
      kind: "t3",
      data: {
        selftext:
          "^(Disclaimer: This guide describes a Windows-10 setup, uses the Testne...",
        title:
          "[HowTo] Create and use a Taproot wallet on Testnet in Bitcoin Core v22...",
        url: "https://www.reddit.com/r/Bitcoin/comments/r37ky5/howto_create_and_use_...",
        author: "brianddk",
      },
    },
    {
      kind: "t3",
      data: {
        selftext:
          "^(Disclaimer: This guide describes a Windows-10 setup, uses the Testne...",
        title:
          "[HowTo] Create and use a Taproot wallet on Testnet in Bitcoin Core v22...",
        url: "https://www.reddit.com/r/Bitcoin/comments/r37ky5/howto_create_and_use_...",
        author: "desmond",
      },
    },
  ],
};

const RedditTwo = {
  coin: "ethereum",
  dateRefreshed: Date.now(),
  posts: [
    {
      kind: "t3",
      data: {
        selftext:
          "^(Disclaimer: This guide describes a Windows-10 setup, uses the Testne...",
        title:
          "[HowTo] Create and use a Taproot wallet on Testnet in Ethereum Core v22...",
        url: "https://www.reddit.com/r/Bitcoin/comments/r37ky5/howto_create_and_use_...",
        author: "brianddk",
      },
    },
    {
      kind: "t3",
      data: {
        selftext:
          "^(Disclaimer: This guide describes a Windows-10 setup, uses the Testne...",
        title:
          "[HowTo] Create and use a Taproot wallet on Testnet in Ethereum Core v22...",
        url: "https://www.reddit.com/r/Bitcoin/comments/r37ky5/howto_create_and_use_...",
        author: "desmond",
      },
    },
  ],
};

const TwitterOne = {
  coin: "bitcoin",
  dateRefreshed: Date.now(),
  posts: [
    {
      name: "Mark Jeffrey",
      username: "markjeffrey",
      tweet:
        "Looks like #Bitcoin is getting @jack's fulltime attention from now on....",
      url: "https://t.co/q8HYOKrawd",
    },
    {
      name: "Mark Desmonf",
      username: "markdes",
      tweet:
        "Looks like #Bitcoin is getting @jack's fulltime attention from now on....",
      url: "https://t.co/q8HYOKrawd",
    },
  ],
};

const TwitterTwo = {
  coin: "ethereum",
  dateRefreshed: Date.now(),
  posts: [
    {
      name: "Mark Jeffrey",
      username: "markjeffrey",
      tweet:
        "Looks like #Ethereum is getting @jack's fulltime attention from now on....",
      url: "https://t.co/q8HYOKrawd",
    },
    {
      name: "Mark Desmonf",
      username: "markdes",
      tweet:
        "Looks like #Ethereum is getting @jack's fulltime attention from now on....",
      url: "https://t.co/q8HYOKrawd",
    },
  ],
};

module.exports = {
  MockAssets,
  MockUserOneRepeatedAsset,
  MockNewAsset,
  MockUserOne,
  MockUserTwo,
  MockUserOneJWT,
  MockUserTwoJWT,
  ValidDeletedUserJWT,
  InValidJWT,
  MockNewsOne,
  MockNewsTwo,
  RedditOne,
  RedditTwo,
  TwitterOne,
  TwitterTwo,
};
