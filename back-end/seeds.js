require("../schemas/coinLabelModel");
const mongoose = require("mongoose");
const coinLabel = mongoose.model("coinLabel");
const { cryptoSymbols } = require("../data");

const seedDB = async () => {
  await coinLabel.deleteMany({});
  await coinLabel.insertMany(cryptoSymbols);
};

seedDB().then(() => {
  mongoose.connection.close();
});
