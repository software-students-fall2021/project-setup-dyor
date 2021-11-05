const express = require("express");
const router = express.Router();
const database = require("../data");
const { Users } = database;

//Expects a JSON Object of the Form as Input
// {
//     "id": "theta",
//     "quantityPurchased": 10,
//     "unitPrice": 5,
//     "stringDate": "Tue Nov 02 2021 01:41:19 GMT-0400 (Eastern Daylight Time)"
// }
// Will add the new data into the above array and return the newly added JSON object
// The addition will have to be done for a particular userID, a default userID of John exists in the Data
// This will assist Talal in his task greatly, he must now only create appropiate modify the existing submission forms
router.post("/", (req, res) => {
    const userID = req.query.userID;
    if (userID) {
        const { id, quantityPurchased, unitPrice, stringDate } = req.body;
        const datePurchased = new Date(stringDate);
        const newUserAsset = {
            id,
            quantityPurchased,
            unitPrice,
            datePurchased,
        };
        if (!id || !quantityPurchased || !unitPrice || !datePurchased) {
            res.status(400).send({
                ...newUserAsset,
                message: "Invalid Input.",
            });
        } else {
            const getUser = Users.find(
                (userDetails) => userDetails.id === userID
            );
            if (getUser) {
                getUser.data.assets.push(newUserAsset);
                res.status(200).json(newUserAsset);
            } else {
                console.log(
                    `INVALID POST REQUEST, userID ${userID} NOT FOUND.`
                );
                res.status(500).json({
                    message: `INVALID POST REQUEST, userID ${userID} NOT FOUND.`,
                });
            }
        }
    } else {
        console.log("INVALID POST REQUEST, userID IS REQUIRED PARAMETER");
        res.status(500).json({
            message: "INVALID POST REQUEST, userID IS REQUIRED PARAMETER",
        });
    }
});

// //Get news from mockaroo (Mocking it for the time being)
// router.get("/cryptoNews", (req, res) => {
//   if (database.cryptoNews.length === 0) {
//     const articles = async () => {
//       const isSucces = await cryptoAPI();
//       if (isSucces === true)
//         res.status(200).json({ data: database.cryptoNews });
//       else res.status(500).send("Could not get data from API");
//     };
//     articles();
//   } else {
//     res.status(200).send(database.cryptoNews);
//   }
// });

// router.get("/assetNews", (req, res) => {
//   if (Object.keys(assetNews).length === 0) {
//     const articles = async () => {
//       const isSucces = await articlesAPI();
//       if (isSucces === true) res.status(200).json(assetNews);
//       else res.status(500).send("Could not get data from API");
//     };
//     articles();
//   } else {
//     res.status(200).json(assetNews);
//   }
// });

// router.get("/images", (req, res) => {
//     if (allImages.length === 0) {
//         imagesAPI();
//     }
//     res.status(200).json(allImages);
// });

// Will return the asset object assosciated with a particular asset id where asset id is the name of the coin, and an error otherwise
// A default UserID of John exists and he owns three assets namely "Bitcoin", "Ethereum", "Polkadot"
router.get("/", (req, res) => {
    const userID = req.query.userID;
    const assetID = req.query.assetID;

    if (userID) {
        const getUser = Users.find((userDetails) => userDetails.id === userID);
        if (getUser) {
            if (assetID) {
                const getAsset = getUser.data.assets.find(
                    (asset) => asset.id === assetID
                );
                if (getAsset) {
                    res.status(200).json(getAsset);
                } else {
                    console.log(
                        `INVALID GET REQUEST, assetID ${assetID} for userID ${userID} NOT FOUND.`
                    );
                    res.status(500).json({
                        message: `INVALID GET REQUEST, assetID ${assetID} for userID ${userID} NOT FOUND.`,
                    });
                }
            } else {
                res.status(200).json(getUser.data.assets);
            }
        } else {
            console.log(`INVALID GET REQUEST, userID ${userID} NOT FOUND.`);
            res.status(500).json({
                message: `INVALID GET REQUEST, userID ${userID} NOT FOUND.`,
            });
        }
    } else {
        console.log(`INVALID GET REQUEST, userID IS REQUIRED PARAMETERS`);
        res.status(500).json({
            message: `INVALID GET REQUEST, userID IS REQUIRED PARAMETERS`,
        });
    }
});

//Deletion to be implemented by Hanzallah

module.exports = router;
