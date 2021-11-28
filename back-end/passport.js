require("dotenv").config({ silent: true });

const passport = require("passport");

const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("./models/users");

// providing the secret and token to passport to decode
// recieve the decoded payload

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        //finding the user specified in the token
        const user = await User.findById(payload.sub);
        // if the user doesn't exist
        if (!user) {
          console.log("Valid Token but user is absent.");
          return done(null, false);
        }
        // console.log(user.id);
        // otherwise return the user
        // done(null, user);
        done(null, { id: user.id, email: user.email });
      } catch (error) {
        console.log("PASSPORT: ERROR HELLO");
        done(error, false);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // find the user given the email
        const user = await User.findOne({ email });
        // console.log(user);
        // if not handle it
        if (!user) {
          return done(null, false);
        }

        user.isValidPassword(password, (error, match) => {
          if (!match) {
            return done(null, false);
          }
        });

        // const isMatch = await user.isValidPassword(password);
        // console.log(isMatch);
        // if (!isMatch) {
        //   return done(null, false);
        // }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
