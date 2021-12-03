const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User1", userSchema);
