const mongoose = require("mongoose");

const coinPredictSchema = new mongoose.Schema({
    name: String,
    tomorrow: Number,
    week: Number,
    currentdate: String, 
});
  
mongoose.model("coin_predict_api", coinPredictSchema);

// module.exports = coinPredictMod;