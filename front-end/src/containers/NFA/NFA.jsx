import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WordCloud from "../../components/WordCloud/WordCloud";
import ComboBox from "../../components/Search/Search";
import NFASocialMedia from "../../components/NFASocialMedia/NFASocialMedia";
import { NFATable } from "../../components/NFATable/NFATable";
import { Paper } from "@mui/material";
import styles from "./NFA.module.css";
import {
  userAssetDataURL,
  sentimentAnalysisURL,
  coinLabelDataURL,
} from "../../back-end_routes";

// class OwnedAsset {
//   constructor(id, quantityPurchased, unitPrice, datePurchased) {
//     this.id = id;
//     this.quantityPurchased = quantityPurchased;
//     this.unitPrice = unitPrice;
//     const [year, month, day] = datePurchased.split("/").reverse();
//     this.datePurchased = Date(year, month, day);
//   }
// }

// const DefaultUserAssets = [
//   new OwnedAsset("bitcoin", 2, 30000, "10/5/2021"),
//   new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
//   new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
// ];

// let _tweets = [];

const socialMedia = ["reddit", "twitter"];

const userCoin = [
  { label: "BTC" },
  { label: "ETH" },
  { label: "SHIB" },
  { label: "DOGE" },
  { label: "LTC" },
  { label: "DOT" },
];

export default function NFA() {
  const userID = "John";
  const [userData, setUserData] = useState([]);
  const [media, setMedia] = useState(1);
  const [coin, setCoin] = useState(userCoin[0].label);
  const [posts, setPosts] = useState([]);
  // const [tickers, setTickers] = useState({});
  const [coinPrices, setCoinPrices] = useState([]);
  const [sentimentData, setSentimentData] = useState({});
  const [WC, setWC] = useState(null);
  // const [coinLabels, setCoinLabels] = useState([]);
  const [coinNameToSymbolDict, setCoinNameToSymbolDict] = useState({});

  const [loading, setLoading] = useState(true);
  let pricesWebSocket = useRef(null);

  const handleChange = (event) => {
    setLoading(true);
    setMedia(event.target.value);
  };

  useEffect(() => {
    async function extract() {
      await axios
        .put("/twitter")
        .then((res) => {
        })
        .catch((err) => {
          console.log(err.response);
        });

      await axios
        .put("/reddit")
        .then((res) => {
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    extract();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      const social = socialMedia[media];
      await axios
        .get(`/${social}/${coin}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getPosts();
  }, [coin, media]);

  useEffect(() => {
    if (posts.length !== 0) {
      setLoading(false);
    }
  }, [posts]);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    //this will initiate a reach out to the websocket for dynamic prices
    pricesWebSocket.current = new WebSocket(
      "wss://ws.coincap.io/prices?assets=ALL",
    );

    pricesWebSocket.current.onerror = (event) => {
      console.log("FAILURE IN WS");
      pricesWebSocket.current.close();
    };

    axios
      .request("https://api.coincap.io/v2/assets")
      .then((response) => {
        // const dataArr = response.data.data.map(({ id, symbol }) => ({
        //   id: id,
        //   label: symbol,
        // }));
        // const tickersDict = dataArr.reduce(
        //   (a, x) => ({ ...a, [x.id]: x.label }),
        //   {},
        // );
        // setTickers(() => tickersDict);
      })
      .catch((err) => {
        console.log("Get Ticker Data Failed.");
        console.log(err);
      });

    //this will request the data pertaining to a particular user
    axios
      .request(userAssetDataURL, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(() => response.data);
      })
      .catch((err) => {
        console.log("Get User Data Failed.");
        console.log(err);
      });

    axios
      .request(coinLabelDataURL)
      .then((response) => {
        const dataArr = response.data;

        // setCoinLabels(() => dataArr);
        const tempTickersDict = dataArr.reduce(
          (prev, present) => ({
            ...prev,
            [present.name]: present.symbol,
          }),
          {},
        );
        //these dictionaries are created since we must transition from full names and ids frequently
        setCoinNameToSymbolDict(() => tempTickersDict);
      })
      .catch((err) => {
        console.log("Get Coin Label Data Failed.");
        console.log(err);
      });

    axios
      .get(sentimentAnalysisURL)
      .then((response) => {
        setSentimentData(response.data);
      })
      .catch((err) => {
        console.log("Get Sentiment Data Failed.");
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (!loading) {
      axios
        .get(`/nfa/wordcloud/${coin}`)
        .then((res) => {
          setWC(res.data["data"]);
        })
        .catch((err) => {
          return err;
        });
    }
  }, [loading, coin]);

  if (pricesWebSocket.current !== null) {
    pricesWebSocket.current.onmessage = (e) => {
      const dataResponseArr = JSON.parse(e.data);

      setCoinPrices((setCoinPrices) => ({
        ...coinPrices,
        ...dataResponseArr,
      }));
    };
  }

  let sentimentScore = 0;
  if (sentimentData === true) {
    sentimentScore =
      sentimentData["data"][0].sell_pressure -
      sentimentData["data"][0].buy_pressure;
  }
  // sentimentData['data'][0].buy_pressure

  return (
    <>
      <Box className={styles.nfaPageDiv}>
        <Stack
          sx={{ padding: "5%" }}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <item>
            <Typography weight="bold" color="primary" variant="h4">
              NFA
            </Typography>
          </item>
          <item>
            <Paper elevation={2}>
              <div>
                {loading ? (
                  <div className={styles.circularProgress}>
                    <CircularProgress
                      className={styles.progressBar}
                      size={50}
                      thickness={2.0}
                    />
                  </div>
                ) : (
                  { WC } && <WordCloud wcData={WC} />
                )}
              </div>
            </Paper>
          </item>

          <item>
            <Paper elevation={2}>
              <div>
                {/* The darker colored section. Contains: social media filter, search bar and the social media tiles */}
                <div className={styles.bgColor}>
                  <div className={styles.displayInline}>
                    <div>
                      <Typography
                        weight="bold"
                        color="primary"
                        display="inline"
                      >
                        Social Media Filter
                      </Typography>
                    </div>
                    <div>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={media}
                          onChange={handleChange}
                          label="Media"
                        >
                          <MenuItem value={0}>Reddit</MenuItem>
                          <MenuItem value={1}>Twitter</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className={styles.displayInline}>
                    {/* This is the search bar  */}
                    <ComboBox
                      coins={userCoin}
                      currentCoin={coin}
                      changeCoin={setCoin}
                    />
                  </div>
                  {loading ? (
                    <div className={styles.circularProgress}>
                      <CircularProgress
                        className={styles.progressBar}
                        size={50}
                        thickness={2.0}
                      />
                    </div>
                  ) : (
                    <NFASocialMedia media={media} posts={posts} />
                  )}
                  <div className={styles.displayInline}>
                    <Button variant="contained" size="small">
                      Market Sentiment:
                      <Typography style={{ marginRight: "5px" }}>
                        {sentimentScore < 0 ? (
                          <Typography color="red"> Bearish</Typography>
                        ) : (
                          <Typography color="yellow">Bullish</Typography>
                        )}
                      </Typography>
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </item>
          <item>
            <Paper elevation={2}>
              <div className={styles.pricePredic}>
                <Typography weight="bold" color="primary" display="inline">
                  NFA Price Prediction
                </Typography>
              </div>
              <div>
                <NFATable
                  userID={userID}
                  pricesData={coinPrices}
                  userData={userData}
                  // coinLabels={tickers}
                  coinNameToSymbolDict={coinNameToSymbolDict}
                ></NFATable>
              </div>
            </Paper>
          </item>
        </Stack>
      </Box>
    </>
  );
}
