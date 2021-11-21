const mongoose = require("mongoose");

const coinPredictSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    prediction: {
      type: Number,
      required: true,
    },
  });
  
  const newsModel = mongoose.model("coinPredict", coinPredictSchema);
  
  module.exports = newsModel;