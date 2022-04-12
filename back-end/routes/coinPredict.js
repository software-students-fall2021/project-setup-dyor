require("../schemas/coinPredictModel");
require("../schemas/coinPredictApiModel")




const mongoose = require("mongoose");
const { User } = require("../models/users");

const express = require("express");
const axios = require("axios");
const { response } = require("../app");
const router = express.Router();




const CryptoDict = {
  "Bitcoin":"BTC",
  "Ethereum":"ETH",
  "Binance Coin":"BNB",
  "Tether":"USDT",
  "Solana":"SOL",
  "Cardano":"ADA",
  "XRP":"XRP",
  "Polkadot":"DOT",
  "SHIBA INU":"SHIB",
  "Dogecoin":"DOGE",
  "USD Coin":"USDC",
  "Terra":"LUNA",
  "Uniswap":"UNI",
  "Avalanche":"AVAX",
  "Chainlink":"LINK",
  "Wrapped Bitcoin":"WBTC",
  "Polygon":"MATIC",
  "Litecoin":"LTC",
  "Binance USD":"BUSD",
  "ALgorand":"ALGO",
  "Bitcoin Cash":"BCH",
  "Stellar":"XLM",
  "VeChain":"VET",
  "Axie Infinity":"AXS",
  "Internet Computer":"ICP",
  "Cosmos":"ATOM",
  "Filecoin":"FIL",
  "TRON":"TRX",
  "THETA":"THETA",
  "FTX Token":"FTT",
  "Ethereum Classic":"ETC",
  "Fantom":"FTM",
  "Bitcoin BEP2":"BTCB",
  "Dai":"DAI",
  "Crypto.com Coin":"CRO",
  "Hedera":"HBAR",
  "NEAR Protocol":"NEAR",
  "Decentraland":"MANA",
  "Tezos":"XTZ",
  "Elrond":"EGLD",
  "Monero":"XMR",
  "The Graph":"GRT",
  "Klaytn":"KLAY",
  "EOS":"EOS",
  "PancakeSwap":"CAKE",
  "Flow":"FLOW",
  "THORChain":"RUNE",
  "Aave":"AAVE",
  "IOTA":"MIOTA",
  "Kusama":"KSM",
  "eCash":"XEC",
  "Quant":"QNT",
  "Neo":"NEO",
  "Bitcoin SV":"BSV",
  "UNUS SED LEO":"LEO",
  "Harmony":"ONE",
  "Chiliz":"CHZ",
  "Helium":"HNT",
  "Maker":"MKR",
  "TerraUSD":"UST",
  "Waves":"WAVES",
  "BitTorrent":"BTT",
  "The Sandbox":"SAND",
  "Stacks":"STX",
  "Enjin Coin":"ENJ",
  "Holo":"HOT",
  "Arweave":"AR",
  "Amp":"AMP",
  "Zcash":"ZEC",
  "Celo":"CELO",
  "Compound":"COMP",
  "Dash":"DASH",
  "OMG Network":"OMG",
  "NEM":"XEM",
  "Theta Fuel":"TFUEL",
  "Nexo":"NEXO",
  "Loopring":"LRC",
  "Huobi Token":"HT",
  "Curve DAO Token":"CRV",
  "Qtum":"QTUM",
  "ICON":"ICX",
  "SushiSwap":"SUSHI",
  "KuCoin Token":"KCS",
  "Decred":"DCR",
  "Basic Attention Token":"BAT",
  "Secret":"SCRT",
  "Revain":"REV",
  "Zilliqa":"ZIL",
  "OKB":"OKB",
  "yearn.finance":"YFI",
  "Mina":"MINA",
  "Ravencoin":"RVN",
  "Audius":"AUDIO",
  "XDC Network":"XDC",
  "Synthetix":"SNX",
  "TrueUSD":"TUSD",
  "Perpetual Protocol":"PERP",
  "Bitcoin Gold":"BTG",
  "Kadena":"KDA",
  "Ankr":"ANKR",
  "0x":"ZRX",
  "renBTC":"RENBTC",
  "Bancor":"BNT",
  "Serum":"SRM",
  "Celsius":"CEL",
  "Siacoin":"SC",
  "Telcoin":"TEL",
  "Horizen":"ZEN",
  "Ren":"REN",
  "Pax Dollar":"USDP",
  "IOST":"IOST",
  "dYdX":"DYDX",
  "Dogelon Mars":"ELON",
  "Ontology":"ONT",
  "OriginTrail":"TRAC",
  "Raydium":"RAY",
  "SKALE Network":"SKL",
  "DigiByte":"DGB",
  "1inch Network":"1INCH",
  "WAX":"WAXP",
  "Moonriver":"MOVR",
  "Nano":"NANO",
  "Mdex":"MDX",
  "UMA":"UMA",
  "IoTeX":"IOTX",
  "Dent":"DENT",
  "Celer Network":"CELR",
  "Gnosis":"GNO",
  "Voyager Token":"VGX",
  "WOO Network":"WOO",
  "Livepeer":"LPT",
  "Fetch.ai":"FET",
  "Ocean Protocol":"OCEAN",
  "NuCypher":"NU",
  "SwissBorg":"CHSB",
  "Storj":"STORJ",
  "WINkLink":"WIN",
  "Neutrino USD":"USDN",
  "WazirX":"WRX",
  "Golem":"GLM",
  "Nervos Network":"CKB",
  "Kava":"KAVA",
  "XYO":"XYO",
  "Reserve Rights":"RSR",
  "Reef":"REEF",
  "Alpha Finance Lab":"ALPHA",
  "Velas":"VLX",
  "DigitalBits":"XDB",
  "Polymath":"POLY",
  "COTI":"COTI",
  "Function X":"FX",
  "GateToken":"GT",
  "Injective Protocol":"INJ",
  "Swipe":"SXP",
  "Numeraire":"NMR",
  "Lisk":"LSK",
  "VeThor Token":"VTHO",
  "Orchid":"OXT",
  "Bitcoin Standard Hashrate Token":"BTCST",
  "Fei USD":"FEI",
  "MediBloc":"MED",
  "Bitcoin Diamond":"BCD",
  "BakeryToken":"BAKE",
  "iExec RLC":"RLC",
  "Verge":"XVG",
  "BORA":"BORA",
  "Origin Protocol":"OGN",
  "Cartesi":"CTSI",
  "NKN":"NKN",
  "Verasity":"VRA",
  "Ardor":"ARDR",
  "Unibright":"UBT",
  "Conflux":"CFX",
  "StormX":"STMX",
  "ASD":"ASD",
  "Constellation":"DAG",
  "MyNeighborAlice":"ALICE",
  "Band Protocol":"BAND",
  "Status":"SNT",
  "Ontology Gas":"ONG",
  "aelf":"ELF",
  "Casper":"CSPR",
  "Civic":"CVC",
  "PAX Gold":"PAXG",
  "Hive":"HIVE",
  "SingularityNET":"AGIX",
  "Prometeus":"PROM",
  "Energy Web Token":"EWT",
  "Venus":"XVS",
  "Chromia":"CHR",
  "Badger DAO":"BADGER",
  "Ampleforth":"AMPL",
  "Ergo":"ERG",
  "Oasis Network":"ROSE",
  "Stratis":"STRAX",
  "Orbs":"ORBS",
  "Augur":"REP",
  "Ark":"ARK",
  "Proton":"XPR",
  "MaidSafeCoin":"MAID"
}

const coinPredictMod = mongoose.model("coin_predict");
const coinPredictApiMod = mongoose.model("coin_predict_api");

// const coinsarr = []
// const coinsarrsymbols = []
// const coinsarrtemp = []
// const coinsarrsymbolstemp = []

// User.find({},(err,documents) => {  
//   if (!err){      
//     documents.map((document)=>{
//       try{
//         if (!coinsarr.includes(document.data.assets[0].name)) {
//           coinsarr.push(document.data.assets[0].name);
//           coinsarrtemp.push(document.data.assets[0].name);
//         }

//         coinsarr.map((coin) => {
//           if (!coinsarrsymbols.includes(CryptoDict[coin])){
//             coinsarrsymbols.push(CryptoDict[coin]);
//             coinsarrsymbolstemp.push(CryptoDict[coin]);
//           }
//         })
//       }
//       catch(error){
//       }
//     })
//   }
// })

// let used = []
// let flag = 0;
// let chaalo = 0

var today = new Date(),
  date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

var tomorrow = new Date(),
  datetom =
  tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + (tomorrow.getDate()+1);

router.get("/", (req, res) => {
  // chaalo +=1
  console.log(datetom)
  coinPredictMod.find({ currentdate: datetom}, (err, docs) => {
    if (docs.length == 0) {
      console.log("Docs length = 0: ", docs.length);
      // console.log(coinsarrsymbols.length)
      // console.log("SYmbTemp: ",coinsarrsymbolstemp.length)

      // if (chaalo % 2 == 0){
      // coinsarrsymbolstemp.map((symbol,count) =>{
      //   console.log("Symbol: ",symbol)
      //       var options = {
      //         method: 'GET',
      //         url: 'https://cryptorch.p.rapidapi.com/api/v2',
      //         params: {crypto: symbol, period: '8'},
      //         headers: {
      //           'x-rapidapi-host': 'cryptorch.p.rapidapi.com',
      //           'x-rapidapi-key': 'b891cd4b3emsh8dc187b4a00aa5fp1e90f2jsnbee066be3f00'
      //         }
      //       };
            
      //       console.log('bkl',coinsarrtemp[count]);

      //       // console.log(options.params);
    
      //       axios.request(options).then(function (response) {
      //         console.log(response.data);
    
      //         const el = JSON.parse(response.data.forecast);
      //         // console.log(el);
      //         new coinPredictApiMod({ 
      //           name: coinsarrtemp[count],
      //           tomorrow: el[1][0],
      //           week: el[7][0],
      //           currentdate: date,
    
      //         }).save(function (err, doc) {
      //           if (err) return console.error(err);
      //         });
    
      //       })
      //       .catch(function (error) {
      //         console.error(error);
      //         flag = 1;
      //       });
            
      //       if (flag !=1){
      //         used.push(symbol)
      //       }
      //       // count += 1;
      //     })
      //     //res
      //     used.map((usedsymb)=>{
      //       coinsarrsymbolstemp.map((remsymb)=>{
      //         if (usedsymb == remsymb){
      //           const index = coinsarrsymbolstemp.indexOf(usedsymb);
      //           if (index > -1){
      //             coinsarrsymbolstemp.splice(index,1);
      //           }
      //         }
      //       })
      //     })
      //   }
      //     res.status(200).json(docs);



      axios
        .get(
          "https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET",
        )
        .then((response) => {
          res.status(200).json(response.data);
          // console.log(response.data);

          for (let i = 0; i < response.data.length; i++) {
            if (docs.name != response.data[i].id) {
              new coinPredictMod({
                name: response.data[i].id,
                prediction: response.data[i].prediction,
                currentdate: date,
              }).save(function (err, doc) {
                if (err) return console.error(err);
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
    else if (err) 
    {
      console.log(err);
      console.log("Error - Backend");
      res.status(404);
    }
     else
    {
      res.status(200).json(docs);
      console.log("Else statement: ", docs.length);

    }
  });

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

// async () => {
//   try {
//     const user = await User.find({},(err,documents) => {
//       console.log("##!###!!##")
//       console.log(documents)
//     });

//   } catch (error) {
//     console.log("ERROR HELLO");
//   }
// }




// router.get("/", (req, res) => {
//   coinPredictMod.find({ currentdate: date }, (err, docs) => {
//     if (docs.length == 0) {
//       console.log("Docs length = 0: ", docs.length);
//       axios
//         .get(
//           "https://my.api.mockaroo.com/coins_mockeroo.json?key=0cc02cb0&__method=GET",
//         )
//         .then((response) => {
//           res.status(200).json(response.data);
//           // console.log(response.data);

//           for (let i = 0; i < response.data.length; i++) {
//             if (docs.name != response.data[i].id) {
//               new coinPredictMod({
//                 name: response.data[i].id,
//                 prediction: response.data[i].prediction,
//                 currentdate: date,
//               }).save(function (err, doc) {
//                 if (err) return console.error(err);
//               });
//             }
//           }
//         })
//         .catch((err) => {
//           // if (err.response){
//           console.log("Error Response from API", err.response.status);
//           // }
//         });
//     } else if (err) {
//       console.log(err);
//       console.log("Error - Backend");
//       res.status(404);
//     } else {
//       res.status(200).json(docs);
//       console.log("Else statement: ", docs.length);

//       User.find({},(err,documents) => {  
//         if (!err){      
//           const datauniquecoins = [];
//           const datauniquecoinsymbols = [];
//           documents.map((document)=>{
//             try{
//               if (!datauniquecoins.includes(document.data.assets[0].name)) {
//                 datauniquecoins.push(document.data.assets[0].name)
//               }
//             }
//             catch(error){
//             }
//           })

//           datauniquecoins.map((coin) => {
//             datauniquecoinsymbols.push(CryptoDict[coin])
//           })
          
//           datauniquecoinsymbols.map((symb)=>{
//             console.log(symb)
//           })
//         }
//       });

      
//     }
//   });
