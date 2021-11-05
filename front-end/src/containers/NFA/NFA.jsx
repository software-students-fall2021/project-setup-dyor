import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WordCloud from "../../components/WordCloud/WordCloud";
import ComboBox from "../../components/Search/Search";
import NFASocialMedia from "../../components/NFASocialMedia/NFASocialMedia";
import { NFATable } from "../../components/NFATable/NFATable";

import styles from "./NFA.module.css";
class OwnedAsset {
  constructor(id, quantityPurchased, unitPrice, datePurchased) {
    this.id = id;
    this.quantityPurchased = quantityPurchased;
    this.unitPrice = unitPrice;
    const [year, month, day] = datePurchased.split("/").reverse();
    this.datePurchased = Date(year, month, day);
  }
}

const DefaultUserAssets = [
  new OwnedAsset("bitcoin", 2, 30000, "10/5/2021"),
  new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
  new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
];

let tweets = [];
//const facebook = [];

export default function NFA() {
  const [media, setMedia] = React.useState(20);
  const [coin, setCoin] = React.useState("bitcoin");
  let pricesWebSocket = useRef(null);
  const [tickers, setTickers] = useState({});
  const [coinPrices, setCoinPrices] = useState([]);
  const [userData] = useState(DefaultUserAssets);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setMedia(event.target.value);
  };

  const getTweets = async () => {
    if (Object.keys(tweets).length === 0) {
      await axios
        .get(`/social/tweets/${coin}`)
        .then((res) => {
          tweets = res.data;
          // console.log(tweets)
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (tweets.length !== 0) setLoading(false);
  };

  useEffect(() => {
    getTweets();
  }, [coin, media]);

  useEffect(() => {
    getTweets();

    //this will initiate a reach out to the websocket for dynamic prices
    pricesWebSocket.current = new WebSocket(
      "wss://ws.coincap.io/prices?assets=ALL"
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
          {}
        );
        setTickers(() => tickersDict);
      })
      .catch((err) => {
        console.log("Get Ticker Data Failed.");
        console.log(err);
      });
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

  return (
    <>
      <h1>It is still loading: {loading ? "true" : "false"}</h1>
      {!loading && (
        <>
          <Box className={styles.nfaPageDiv}>
            <Stack
              sx={{ padding: "5%" }}
              direction='column'
              justifyContent='center'
              alignItems='stretch'
              spacing={1}>
              <Typography weight='bold' color='primary' variant='h4'>
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
                      <Typography
                        weight='bold'
                        color='primary'
                        display='inline'>
                        Social Media Filter
                      </Typography>
                    </div>
                    <div>
                      <FormControl
                        variant='standard'
                        sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          labelId='demo-simple-select-standard-label'
                          id='demo-simple-select-standard'
                          value={media}
                          onChange={handleChange}
                          label='Media'>
                          <MenuItem value={10}>Facebook</MenuItem>
                          <MenuItem value={20}>Twitter</MenuItem>
                          <MenuItem value={30}>Google</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className={styles.displayInline}>
                    {/* This is the search bar  */}
                    <ComboBox currentCoin={setCoin} />
                  </div>
                  {/* This is the social media tiles  */}
                  <NFASocialMedia posts={tweets} />

                  <div className={styles.displayInline}>
                    <Button variant='contained' size='small'>
                      Sentiment Level Gauge
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Typography weight='bold' color='primary' display='inline'>
                  Sentiment on your Portfolio
                </Typography>
              </div>
              <div>
                <NFATable
                  pricesData={coinPrices}
                  userData={userData}
                  coinLabels={tickers}></NFATable>
              </div>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
