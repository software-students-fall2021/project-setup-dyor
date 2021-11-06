// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
require("dotenv").config();

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const dotenv = require("dotenv"); // access API_KEYS
dotenv.config({ path: "./.env" });
//MiddleWares
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
  res.status(200).json({ message: "Root: Hello, world!" });
});

//Importing and Using the userData route
const userRouter = require("./routes/userData");

app.use("/userData", userRouter);

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
const newsRoutes = require("./routes/getNews");
const newsRouter = newsRoutes.router;
const socialRouter = require("./routes/getSocials");
app.use("/news", newsRouter);
app.use("/social", socialRouter);

module.exports = app;
