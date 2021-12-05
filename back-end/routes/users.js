const express = require("express");
const router = express.Router();
const passport = require("passport");

const bcrypt = require("bcryptjs");
const axios = require("axios");
const { User } = require("../models/users");
require("dotenv").config();
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UserController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const currencies = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "₣": "CHF",
  "₵": "GHS",
  "₹": "INR",
  AED: "AED",
  CAD: "CAD",
  "¥": "JPY",
  "₨": "PKR",
};

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

router.post("/resetPassword", async (req, res) => {
  console.log("Resetting Password");
  console.log(req.body);

  if (req.body === undefined) {
    res
      .status(404)
      .json({ success: false, message: "Could not reset password" });
  } else {
    const { email, password } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10);

    const query = { email: email };
    const update = {
      password: passwordHashed,
    };
    const opts = { new: true, upsert: false };

    const response = await User.findOneAndUpdate(query, update, opts);

    if (response && response.email === email) {
      res
        .status(201)
        .json({ success: true, message: "Password changed successfully" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Could not reset password" });
    }
  }
});

router.get("/currency/:curr", async (req, res) => {
  const curr = req.params.curr;
  const newCurr = currencies[curr];
  console.log(curr);
  if (!newCurr) {
    res.status(404).json({ error: "Invalid currency" });
  }
  if (newCurr === "USD") res.status(200).json({ rate: 1 });
  else {
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCY_CHANGE}&base_currency=USD`;

    await axios
      .get(url)
      .then(function (response) {
        data = response.data.data;
        rate = data[newCurr];
        console.log(rate);
        res.status(200).json({ rate: rate });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
});

router.put("/currency", async (req, res) => {
  const { email, curr } = req.body;
  const query = { email: email };
  const opts = { new: true, upsert: true };

  const response = await User.findOne(query);
  if (response) {
    const data = response.data;
    const assets = data.assets;
    const newAssets = await convert(assets, req.body);
    data.assets = newAssets;
    const update = {
      currency: curr,
      data: data,
    };
    const results = await User.findOneAndUpdate(query, update, opts);
    if (results) {
      if (results["email"] === email)
        res.status(200).json({ currency: results["currency"] });
      else res.status(500).json({ message: "Internal Server Error" });
    } else res.status(404).json({ message: "Error" });
  } else res.status(404).json({ message: "User does not exist" });
});

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UserController.signIn,
  );

router.route("/remove").delete(
  passport.authenticate("jwt", {
    session: false,
  }),
  UserController.remove,
);

const convert = async (assets, { old, curr }) => {
  const oldCurr = currencies[old];
  const newCurr = currencies[curr];
  let rate = 1;
  if (oldCurr !== newCurr) {
    const url = `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCY_CHANGE}&base_currency=${oldCurr}`;
    await axios
      .get(url)
      .then(function (response) {
        data = response.data.data;
        rate = data[newCurr];
      })
      .catch(function (error) {
        console.error("There was an error");
      });
  }

  for (let i = 0; i < assets.length; ++i) {
    const { unitPrice } = assets[i];
    assets[i].unitPrice = unitPrice * rate;
  }
  return assets;
};
module.exports = router;
