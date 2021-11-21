const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");

const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UserController = require("../controllers/users");

const passportSignIn = passport.authenticate("local", { session: false });

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UserController.signIn,
  );

module.exports = router;
