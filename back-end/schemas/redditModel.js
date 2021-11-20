const mongoose = require("mongoose");

const redditSchema = new mongoose.Schema({
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

const redditModel = mongoose.model("reddit", redditSchema);

module.exports = redditModel;
