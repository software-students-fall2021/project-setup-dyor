const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  dateRefreshed: {
    type: Date,
    required: true,
  },
});

const tweetModel = mongoose.model("tweets", tweetSchema);

module.exports = tweetModel;
