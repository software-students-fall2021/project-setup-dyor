#!/usr/bin/env node
const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3001;

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(dbURI, options)
  .then((res) => {
    console.log("Connected to database");
    server.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// a function to stop listening to the port
// const close = () => {
//   listener.close();
// };
// module.exports = {
//   close: close,
// };
