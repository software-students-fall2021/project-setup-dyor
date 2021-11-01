// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app;

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
