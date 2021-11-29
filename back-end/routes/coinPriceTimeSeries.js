const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const { parse } = require("path");

router.get("/", (req, res) => {
  const baseURL = "rest.coinapi.io";
  const coin_symbol = req.query.coin_symbol;
  const period_id = req.query.period_id;
  const time_start = req.query.time_start;
  const time_end = req.query.time_end;
  const limit = req.query.limit;
  const apikey = process.env.COIN_API_KEY;

  const formatted_time_start = moment(new Date(req.query.time_start)).format(
    "MM-DD-YYYY",
  );
  const formatted_time_end = moment(new Date(req.query.time_end)).format(
    "MM-DD-YYYY",
  );

  console.log("IN GET OF coinPriceTimeSeries ROUTE");

  try {
    fs.readFile(
      `./public/timeSeriesData/${coin_symbol}_${formatted_time_start}_${formatted_time_end}.json`,
      "utf-8",
      (err, jsonString) => {
        //if the data has not been previously written to file it will now be fetched
        if (err) {
          console.log("FILE NOT PRESENT");

          console.log(
            `DATA ${coin_symbol}_${formatted_time_start}_${formatted_time_end} NOT PRESENT`,
          );
          axios
            .request(
              `https://${baseURL}/v1/exchangerate/${coin_symbol}/USD/history`,
              {
                params: {
                  period_id,
                  time_start,
                  time_end,
                  limit,
                  apikey,
                },
              },
            )
            .then((response) => {
              try {
                const stringData = JSON.stringify(response.data);
                fs.writeFile(
                  `./public/timeSeriesData/${coin_symbol}_${formatted_time_start}_${formatted_time_end}.json`,
                  stringData,
                  (err) => {
                    if (err) console.log(err);
                    else console.log("Succesful Writing.");
                  },
                );
                res.status(200).json(response.data);
              } catch (err) {
                console.log("STRINGIFY FAILED FOR NEW DATA.");
              }
            })
            .catch((err) => {
              res.status(500).json({
                message: "FAILURE TO GET TIME SERIES DATA.",
              });
            });
        } else {
          console.log("FILE PRESENT");
          //if the data has been previously written to file it shall be fetched from thereon
          console.log(
            `DATA ${coin_symbol}_${formatted_time_start}_${formatted_time_end} ALREADY PRESENT`,
          );
          // console.log(jsonString);
          try {
            const parsedJSON = JSON.parse(jsonString);
            console.log("PARSE SUCCEEDED");
            res.status(200).json(parsedJSON);
          } catch (err) {
            console.log(err);
            console.log("PARSE FAILED FOR EXISTING DATA.");
            res.sendStatus(500);
          }
        }
      },
    );
  } catch (err) {
    console.log("fs.readFile FAILED");
    console.log(err);
  }
});

module.exports = router;
