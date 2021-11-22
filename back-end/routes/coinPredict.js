require( "../schemas/coinPredictModel");

const mongoose = require("mongoose");

const express = require("express");
const axios = require("axios");
const { response } = require("../app");
const router = express.Router();

// const mongoose = require("mongoose");

// const coinPredictSchema = new mongoose.Schema({
//     name: String,
//     prediction: Number,
//     currentdate: String, 
//   });
  
const coinPredictMod = mongoose.model("coin_predict");

var today = new Date(),
date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


router.get("/", (req, res) => {
  coinPredictMod.find({currentdate:date}, (err,docs)=>{
    if( docs.length == 0){
      console.log("Ye Le")
      console.log("ljklj",docs)
      axios
        .get(
          "https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET",
        )
        .then((response) => {
          res.status(200).json(response.data);
          console.log(response.data);
    
          for (let i = 0; i<response.data.length;i++){
            if (docs.name != response.data[i].id){
              new coinPredictMod({
                name: response.data[i].id,
                prediction: response.data[i].prediction,
                currentdate: date,
              }).save(function(err,doc){
                if (err) return console.error(err);
                console.log("Document inserted successfully")
              });
            }
          }
        })
        .catch((err) => {
          // if (err.response){
          console.log("Error Response from API", err.response.status);
          // }
        });
    }
    else if(err){
      console.log(err);
      res.status(404);
      console.log("KHarr bachiya")  
    }
    else{
      console.log("COnsole LOG already found")
      res.status(200).json(docs);
      // console.log(docs)
    }
  })
  
  // axios
    // .get(
    //   "https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET",
    // )
    // .then((response) => {
    //   res.status(200).json(response.data);
    //   console.log(response.data);

    //   for (let i = 0; i<response.data.length;i++){
    //     const new_prediction = new coinPredictMod({
    //       name: response.data[i].id,
    //       prediction: response.data[i].prediction,
    //       currentdate: date,
    //     });

    //     new_prediction.save(function(err,doc){
    //       if (err) return console.error(err);
    //       console.log("Document inserted successfully")
    //     });
    //   }

    // })
    // .catch((err) => {
    //   // if (err.response){
    //   console.log("Error Response from API", err.response.status);
    //   // }
    // });
});

// for (let i = 0; i<getPredict.length;i++){
//   const new_predicti on = new coinPredictMod({
//     name: getPredict[i].id,
//     prediction: getPredict[i].prediction,
//   });

//   new_prediction.save(function(err,doc){
//     if (err) return console.error(err);
//     console.log("Document inserted successfully")
//   });
// }

module.exports = router;
