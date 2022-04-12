const mongoose = require("mongoose");

const coinPredictSchema = new mongoose.Schema({
    name: String,
    prediction: Number,
    currentdate: String, 
  });
  
mongoose.model("coin_predict", coinPredictSchema);

// module.exports = coinPredictMod;