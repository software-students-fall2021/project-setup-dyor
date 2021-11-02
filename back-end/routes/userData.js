const express = require("express");
const router = express.Router();
const database = require("../data");
const getNews = require("./getNews");

const { userAssets, assetNews, allImages } = database;
const { articlesAPI, imagesAPI, cryptoAPI } = getNews;

//Will return all the assets owned by the user
router.get("/", (req, res) => {
  res.status(200).json(userAssets);
});

//Expects a JSON Object of the Form as Input
// {
//     "id": "theta",
//     "quantityPurchased": 10,
//     "unitPrice": 5,
//     "stringDate": "Tue Nov 02 2021 01:41:19 GMT-0400 (Eastern Daylight Time)"
// }
// Will add the new data into the above array and return the newly added JSON object
router.post("/", (req, res) => {
  console.log(req.body);
  const { id, quantityPurchased, unitPrice, stringDate } = req.body;
  const datePurchased = new Date(stringDate);
  const newUserAsset = {
    id,
    quantityPurchased,
    unitPrice,
    datePurchased,
  };
  if (!id || !quantityPurchased || !unitPrice || !datePurchased) {
    res.status(400).send({ ...newUserAsset, message: "Invalid Input." });
  } else {
    userAssets.push(newUserAsset);
    res.status(200).json(newUserAsset);
  }
});

//Get news from mockaroo (Mocking it for the time being)
router.get("/cryptoNews", (req, res) => {
  if (database.cryptoNews.length === 0) {
    const articles = async () => {
      const isSucces = await cryptoAPI();
      if (isSucces === true)
        res.status(200).json({ data: database.cryptoNews });
      else res.status(500).send("Could not get data from API");
    };
    articles();
  } else {
    res.status(200).send(database.cryptoNews);
  }
});

router.get("/assetNews", (req, res) => {
  if (Object.keys(assetNews).length === 0) {
    const articles = async () => {
      const isSucces = await articlesAPI();
      if (isSucces === true) res.status(200).json(assetNews);
      else res.status(500).send("Could not get data from API");
    };
    articles();
  } else {
    res.status(200).json(assetNews);
  }
});

router.get("/images", (req, res) => {
  if (allImages.length === 0) {
    imagesAPI();
  }
  res.status(200).json(allImages);
});

// Will return the asset object assosciated with a particular asset id where asset id is the name of the coin, and an error otherwise
router.get("/:id", (req, res) => {
  const assetID = req.params.id;
  console.log(assetID || "Nothing");
  const getAsset = userAssets.find((asset) => asset.id === assetID);
  if (getAsset) res.status(200).json(getAsset);
  else res.status(500).json({ message: "Asset with ID not found." });
});

//Deletion to be implemented by Hanzallah

module.exports = router;
