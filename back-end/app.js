// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const passport = require("passport");
require("dotenv").config();

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const dotenv = require("dotenv"); // access API_KEYS and other details
const mongoose = require("mongoose"); // interface to better access MONGO_DB
dotenv.config({ path: "./.env" });
//MiddleWares
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

app.use(passport.initialize());
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.status(200).json({ message: "Root: Hello, world!" });
});

app.get(
  "/signedinuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Authentication Attempt");
    res.json({ id: req.user.id });
  },
);

//Importing and Using the userData route
const userAssetDataRouter = require("./routes/userAssetData");
app.use("/userAssetData", userAssetDataRouter);

//Importing and Using the coinLabelData route
const coinLabelRouter = require("./routes/coinLabelData");
app.use("/coinLabelData", coinLabelRouter);

//Importing and Using the coinPriceTimeSeries route
const coinPriceTimeSeriesRouter = require("./routes/coinPriceTimeSeries");
app.use("/coinPriceTimeSeries", coinPriceTimeSeriesRouter);

//Importing and Using the coinPresentPriceAndChange route
//will return a dictionary containing the 24-hour-percentage-change-in-price and the price of all cryptocurrencies at the time of invocation if /
//will return the 24-hour-percentage-change and the price of a particular currency if /:id
const coinPresentPriceAndChangeRouter = require("./routes/coinPresentPriceAndChange");
app.use("/coinPresentPriceAndChange", coinPresentPriceAndChangeRouter);

//General news and social media filters
const newsRouter = require("./routes/getNews");
const twitterRouter = require("./routes/getTwitter");
const redditRouter = require("./routes/getReddit");
app.use("/news", newsRouter);
app.use("/twitter", twitterRouter);
app.use("/reddit", redditRouter);

//Routing for NFA
const wordCloudRoute = require("./routes/nfa.js");
// //Routes for wordcloud
app.use("/nfa", wordCloudRoute);

const users = require("./routes/users.js");
app.use("/users", users);

const sentimentRouter = require("./routes/sentimentAnalysis");
app.use("/sentimentAnalysis", sentimentRouter);

const predictionRouter = require("./routes/coinPredict");
// const teamMember = require("./schemas/teamMemberModel");
app.use("/coinPredict", predictionRouter);

module.exports = app;
