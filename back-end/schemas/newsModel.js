const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  news: {
    type: Array,
    required: true,
  },
  dateRefreshed: {
    type: Date,
    required: true,
  },
});

const newsModel = mongoose.model("news", newsSchema);

module.exports = newsModel;
