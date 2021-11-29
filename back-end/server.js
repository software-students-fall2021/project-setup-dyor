#!/usr/bin/env node
const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 3001;
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongo = async () => {
  await mongoose.connect(dbURI, options);
  return mongoose;
};

connectToMongo()
  .then(() => {
    console.log("Connected to database");
    server.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
