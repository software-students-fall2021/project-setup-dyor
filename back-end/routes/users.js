const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { User } = require("../models/users");

const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UserController = require("../controllers/users");

const passportSignIn = passport.authenticate("local", { session: false });

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
    const { email, currentPassword, password } = req.body;
    const currentPasswordHashed = bcrypt.hashSync(currentPassword, 10);
    const passwordHashed = bcrypt.hashSync(password, 10);

    const query = { email: email };
    const update = {
      password: passwordHashed,
    };
    const opts = { new: true, upsert: false };

    const response = await User.findOneAndUpdate(query, update, opts);

    if (response && response.email === email) {
      console.log(response);
      console.log(
        "The password are the same",
        response.password === passwordHashed,
      );
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

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UserController.signIn,
  );

module.exports = router;
