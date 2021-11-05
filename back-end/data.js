//A constructor that create a user data object for all the data pertaining to a user
class OwnedAsset {
  constructor(id, quantityPurchased, unitPrice, datePurchased) {
    this.id = id;
    this.quantityPurchased = quantityPurchased;
    this.unitPrice = unitPrice;
    const [year, month, day] = datePurchased.split("/").reverse();
    this.datePurchased = Date(year, month, day);
  }
}

//An array that shall be used to store all the data pertaining to the assets of a user
const userAssets = [
  new OwnedAsset("bitcoin", 2, 30000, "10/05/2021"),
  new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
  new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
];

//News Data
var assetNews = {};
var cryptoNews = [];
var allImages = [];
var tweets = [];

var database = (module.exports = {
  userAssets: userAssets,
  assetNews: assetNews,
  cryptoNews: cryptoNews,
  allImages: allImages,
  tweets : tweets
});
