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
};
