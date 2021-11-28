const express = require("express");
const router = express.Router();
// const database = require("../data");
const passport = require("passport");
// const { Users } = database;
const { User } = require("../models/users");

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

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/landingPage",
  }),
  async (req, res) => {
    const userID = req.user.id;
    if (userID) {
      const { id, quantityPurchased, unitPrice, datePurchased } = req.body;
      const newUserAsset = {
        name: id,
        quantityPurchased,
        unitPrice,
        datePurchased,
      };
      // console.log("The new user asset is", newUserAsset);
      if (!id || !quantityPurchased || !unitPrice || !datePurchased) {
        res.status(400).send({
          Input: { ...newUserAsset },
          userMessage: "Invalid Input.",
        });
      } else {
        const userDBObj = await User.findById(userID);
        if (!userDBObj) {
          console.log(
            "User though authenticated, cannot be found in DB for POST /userAssetData",
          );
          res.status(400).json({
            userMessage:
              "User though authenticated, cannot be found in DB for POST /userAssetData",
          });
        }

        //this determines whether we are to push or assign
        if (userDBObj.data.assets) {
          //if we have to check whether or not the same asset previously exists, if it does the post will fail
          const matchesFound = userDBObj.data.assets.filter(
            (asset) => asset.name === newUserAsset.name,
          ).length;
          if (matchesFound) {
            console.log(
              "Unsuccesful POST /userAssetData, an asset pertaining to a given coin may be added only once",
            );
            res.status(400).json({
              userMessage:
                "Unsuccesful POST /userAssetData, an asset pertaining to a given coin may be added only once",
            });
            return;
          }
          userDBObj.data.assets.push({ ...newUserAsset });
        } else {
          userDBObj.data = { ...userDBObj.dat, assets: [{ ...newUserAsset }] };
        }

        try {
          const updatedCollection = await userDBObj.save();
          if (updatedCollection) {
            res.status(200).json({
              userMessage: "SUCCESSFUL POST /userAssetData REQUEST ",
            });
          } else {
            console.log(
              "SOMETHING TERRIBLE HAS HAPPENED WITH THE DB POST /userAssetData REQUEST, SAVE FAILED ",
            );
            res.status(400).json({
              userMessage:
                "SOMETHING TERRIBLE HAS HAPPENED WITH THE DB POST /userAssetData REQUEST, SAVE FAILED ",
              output: updatedCollection,
            });
          }
        } catch (err) {
          console.log("UNSUCCESSFUL POST /userAssetData REQUEST");
          // console.log(err);
          res.status(400).json({
            userMessage: "UNSUCCESSFUL POST /userAssetData REQUEST ",
          });
        }
      }
    } else {
      res.status(400).json({
        userMessage:
          "UNEXPECTED BEHAVIOR IN AUTHENTICATION POST /userAssetData REQUEST ",
      });
    }
  },
);

// Will return the asset object assosciated with a particular asset id where asset id is the name of the coin, and an error otherwise
// A default UserID of John exists and he owns three assets namely "Bitcoin", "Ethereum", "Polkadot"
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/landingPage",
  }),
  async (req, res) => {
    const userID = req.user.id;
    const assetID = req.query.assetID || "";
    console.log(`userID: <${userID}> | assetID: <${assetID}>`);
    const userDBObj = await User.findById(userID);
    //checking if user is found
    if (!userDBObj) {
      res.status(400).json({
        userMessage:
          "User though authenticated, cannot be found in DB for GET /userAssetData",
      });
      return;
    }
    // console.log("User present in DB");

    let assetDBObj = [];
    try {
      assetDBObj = userDBObj.data.assets.filter((asset) =>
        assetID ? asset.name === assetID : true,
      );
    } catch (err) {
      console.log("Filter Failed");
      console.log(err);
      res.status(400).json({
        userMessage: `User though authenticated and found in DB, filter for asset information failed for GET /userAssetData?assetID=${assetID}`,
      });
      return;
    }
    // console.log("Filter Succeeded");
    // console.log(assetDBObj);

    if (userDBObj && assetID && !assetDBObj.length) {
      //checking if any asset information has been found given that we are searching for a particular asset, if not an error is in order, it is no problem if the user has no assets at all but when a specific asset is being search for and it is absent, this must be flagged
      console.log("RELEVANT ASSET NOT FOUND");
      res.status(400).json({
        userMessage: `User though authenticated and found in DB, asset information cannot be found in DB for GET /userAssetData?assetID=${assetID}, it is simply absent`,
      });
      return;
    } else {
      let revisedData;
      try {
        //rest syntax does not work for some reason
        // console.log("ASSET(S) PRESENT");
        revisedData = assetDBObj.map((asset) => {
          return {
            id: asset.name,
            quantityPurchased: asset.quantityPurchased,
            unitPrice: asset.unitPrice,
            datePurchased: asset.datePurchased,
          };
        });
      } catch (err) {
        console.log("Mapping Failed");
        console.log(err);
        res.status(400).json({
          userMessage: `User though authenticated and found in DB, mapping for filtered asset information failed`,
        });
        return;
      }
      // console.log("Mapping Succeded");
      // console.log(revisedData);
      revisedData =
        assetID && revisedData.length >= 1 ? revisedData[0] : revisedData;
      // console.log(revisedData);
      res.status(200).json(revisedData);
    }
  },
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/landingPage",
  }),
  async (req, res) => {
    const userID = req.user.id;
    const assetID = req.query.assetID || "";
    if (!assetID) {
      res.status(400).json({
        userMessage: "No asset specified for DELETE /userAssetData",
      });
      return;
    }

    const userDBObj = await User.findById(userID);
    if (!userDBObj) {
      res.status(400).json({
        userMessage:
          "User though authenticated, cannot be found in DB for DELETE /userAssetData",
      });
      return;
    }

    if (userDBObj.data.assets) {
      userDBObj.data.assets = userDBObj.data.assets.filter(
        (asset) => asset.name !== assetID,
      );

      try {
        const updatedCollection = await userDBObj.save();
        if (updatedCollection) {
          res.status(200).json({
            userMessage: "SUCCESSFUL DELETE /userAssetData REQUEST ",
          });
        } else {
          console.log(
            "SOMETHING TERRIBLE HAS HAPPENED WITH THE DB DELETE /userAssetData REQUEST, SAVE FAILED ",
          );
          res.status(400).json({
            userMessage:
              "SOMETHING TERRIBLE HAS HAPPENED WITH THE DB DELTE /userAssetData REQUEST, SAVE FAILED ",
            output: updatedCollection,
          });
        }
      } catch (err) {
        console.log("UNSUCCESSFUL DELETE /userAssetData REQUEST");
        // console.log(err);
        res.status(400).json({
          userMessage: "UNSUCCESSFUL DELETE /userAssetData REQUEST ",
        });
        return;
      }
    } else {
      res.status(400).json({
        userMessage: "User does not have any assets to delete",
      });
      return;
    }
  },
);

module.exports = router;
