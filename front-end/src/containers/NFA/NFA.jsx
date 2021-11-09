import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography, Stack, CircularProgress } from "@mui/material";
import { bgcolor, Box, typography } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WordCloud from "../../components/WordCloud/WordCloud";
import ComboBox from "../../components/Search/Search";
import NFASocialMedia from "../../components/NFASocialMedia/NFASocialMedia";
import { NFATable } from "../../components/NFATable/NFATable";
import styles from "./NFA.module.css";
import { userAssetDataURL, sentimentAnalysisURL } from "../../back-end_routes";

class OwnedAsset {
  constructor(id, quantityPurchased, unitPrice, datePurchased) {
    this.id = id;
    this.quantityPurchased = quantityPurchased;
    this.unitPrice = unitPrice;
    const [year, month, day] = datePurchased.split("/").reverse();
    this.datePurchased = Date(year, month, day);
  }
}

// const DefaultUserAssets = [
//   new OwnedAsset("bitcoin", 2, 30000, "10/5/2021"),
//   new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
//   new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
// ];

// let _tweets = [];
const socialMedia = ["Facebook", "Twitter"];

const userCoin = [
  { label: "BTC" },
  { label: "ETH" },
  { label: "SHIB" },
  { label: "DOGE" },
  { label: "LTC" },
  { label: "DOT" },
];

let facebook = [];
let twitter = [];

export default function NFA() {
  const userID = "John";
  const [userData, setUserData] = useState([]);
  const [media, setMedia] = useState(1);
  const [coin, setCoin] = useState(userCoin[0].label);
  const [posts, setPosts] = useState([]);
  const [tickers, setTickers] = useState({});
  const [coinPrices, setCoinPrices] = useState([]);
  const [sentimentData, setSentimentData] = useState({});


  const [loading, setLoading] = useState(false);
  let pricesWebSocket = useRef(null);

  const handleChange = (event) => {
    setMedia(event.target.value);
  };

  const getPosts = async () => {
    const social = socialMedia[media];
    await axios
      .get(`/social/${social}/${coin}`)
      .then((res) => {
        if (media === 0) facebook = res.data;
        else twitter = res.data;

        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPosts();
  }, [coin]);

  useEffect(() => {
    if (media === 0) {
      if (facebook.length !== 0) {
        setPosts(facebook);
      } else {
        getPosts();
      }
    } else {
      if (twitter.length !== 0) {
        setPosts(twitter);
      } else {
        getPosts();
      }
    }
    getPosts();
  }, [media]);

  useEffect(() => {
    if (posts.length !== 0) {
      setLoading(false);
    }
  }, [posts]);

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
        const dataArr = response.data.data.map(({ id, symbol }) => ({
          id: id,
          label: symbol,
        }));
        const tickersDict = dataArr.reduce(
          (a, x) => ({ ...a, [x.id]: x.label }),
          {},
        );
        setTickers(() => tickersDict);
      })
      .catch((err) => {
        console.log("Get Ticker Data Failed.");
        console.log(err);
      });

    //this will request the data pertaining to a particular user
    axios
      .request(userAssetDataURL, {
        params: {
          userID,
        },
      })
      .then((response) => {
        setUserData(() => response.data);
        // userCoin = userData.forEach((data) => {
        //   returndata.id;
        // });
      })
      .catch((err) => {
        console.log("Get User Data Failed.");
        console.log(err);
      });

      axios
      .get(sentimentAnalysisURL)
      .then((response) => {
        // console.log(response.data);
        setSentimentData(response.data);
      }).catch((err) => {
        console.log("Get Sentiment Data Failed.");
        console.log(err);
      })
  }, []);

  if (pricesWebSocket.current !== null) {
    pricesWebSocket.current.onmessage = (e) => {
      const dataResponseArr = JSON.parse(e.data);

      setCoinPrices((setCoinPrices) => ({
        ...coinPrices,
        ...dataResponseArr,
      }));
    };
  }

  const sentimentScore = 0;
  if (sentimentData === true) {
    sentimentScore = sentimentData['data'][0].sell_pressure - sentimentData['data'][0].buy_pressure;
  };
  // sentimentData['data'][0].buy_pressure


  return (
    <>
      {loading ? (
        <div className={styles.circularProgress}>
          <CircularProgress
            className={styles.progressBar}
            size={100}
            thickness={2.0}
          />
        </div>
      ) : (
        <Box className={styles.nfaPageDiv}>
          <Stack
            sx={{ padding: "5%" }}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
          >
            <Typography weight="bold" color="primary" variant="h4">
              NFA
            </Typography>
            <div>
              <WordCloud />
            </div>

            <div>
              {/* The darker colored section. Contains: social media filter, search bar and the social media tiles */}
              <div className={styles.bgColor}>
                <div className={styles.displayInline}>
                  <div>
                    <Typography weight="bold" color="primary" display="inline">
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
                        <MenuItem value={0}>Facebook</MenuItem>
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
                {/* This is the social media tiles  */}
                <NFASocialMedia posts={posts} />

                <div className={styles.displayInline}>
                  <Button variant="contained" size="small">
                    Market Sentiment:
                      <Typography>
                      {sentimentScore<0 ? <Typography color="red"> Bearish</Typography> : <Typography color="yellow"> Bullish</Typography>}
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Typography weight="bold" color="primary" display="inline">
                Sentiment on your Portfolio
              </Typography>
            </div>
            <div>
              <NFATable
                pricesData={coinPrices}
                userData={userData}
                coinLabels={tickers}
              ></NFATable>
            </div>
          </Stack>
        </Box>
      )}
    </>
  );
}
