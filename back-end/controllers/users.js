const JWT = require("jsonwebtoken");
const express = require("express");

const { User } = require("../models/users");

// setting up the token (payload)
signToken = (user) => {
  return JWT.sign(
    {
      iss: "DYOR",
      sub: user.id,
      iat: new Date().getTime(),
    },
    process.env.JWT_SECRET,
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    console.log(email, password);
    // checking if the user is alredy created with the given email
    const foundUser = await User.findOne({ email });
    console.log("Found", foundUser);

    if (foundUser) {
      return res.status(403);
    }

    // creating a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // responding with the webtoken
    const token = signToken(newUser);

    res.status(200).json({ success: true, email: newUser.email, token: token });
  },

  signIn: async (req, res, next) => {
    console.log("IN SIGNIN PATH");
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      email: req.user.email,
      token: token,
      currency: req.user.currency,
    });
  },

  remove: async (req, res, next) => {
    const userID = req.user.id;
    console.log(`IN REMOVE PATH FOR USER ${userID}`);

    // Checking if the present user exists in the Database
    const PresentUser = await User.findOne({ _id: userID });

    if (!PresentUser) {
      console.log(
        `Present User with ID:${userID} could not be deleted since said user is absent from the DB`,
      );
      return res.status(500);
    }

    await PresentUser.deleteOne({ _id: userID });
    console.log(`Present User with ID:${userID} has been deleted`);

    //deletion has been completed
    res.status(200).json({
      success: true,
    });
  },

  secret: async (req, res, next) => {
    res.status(200).json({ success: true });
  },
};
