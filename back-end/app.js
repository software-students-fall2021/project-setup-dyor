// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

//MiddleWares
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, world!" });
});

//Importing and Using the userData route
const userRouter = require("./routes/userData");
app.use("/userData", userRouter);

// export the express app we created to make it available to other modules
module.exports = app;
