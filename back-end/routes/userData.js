const express = require("express");
const router = express.Router();
const {userAssets} = require("../data");

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
