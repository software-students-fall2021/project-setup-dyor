const express = require("express");
const axios = require("axios");
const { response } = require("../app");
const router = express.Router();

router.get("/", (req, res) => {
    axios.get("https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET")
    .then((response) => {
        res.status(200).json(response.data);
        //console.log(response.data);
    })
    .catch((err) => {
        if (err.response){
            console.log("Error Response from API", err.response.status);
        }
    })
});

module.exports = router;
