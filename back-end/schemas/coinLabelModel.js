const mongoose = require("mongoose");

const coinLabelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

const coinLabelModel = mongoose.model("coinLabel", coinLabelSchema);

module.exports = coinLabelModel;
