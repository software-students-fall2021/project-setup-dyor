import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export const Portfolio = (props) => {
  const [tickers, setTickers] = useState([]);
  const [coinValue, setCoinValue] = useState({ id: "bitcoin", label: "BTC" });
  const [coinInputValue, setCoinInputValue] = useState("BTC");
  let pricesWebSocket = useRef(null);
  const [coinPrice, setCoinPrice] = useState(0);

  //This will obtain the initial set of coins
  useEffect(() => {
    axios
      .request("https://api.coincap.io/v2/assets")
      .then((response) => {
        const dataArr = response.data.data.map(({ id, symbol }) => ({
          id: id,
          label: symbol,
        }));
        setTickers(() => dataArr);

        pricesWebSocket.current = new WebSocket(
          "wss://ws.coincap.io/prices?assets=ALL",
        );

        pricesWebSocket.current.onerror = (event) => {
          console.log("FAILURE IN WS");
          pricesWebSocket.current.close();
        };
      })
      .catch((err) => {
        console.log("Get Ticker Data Failed.");
        console.log(err);
      });
  }, []);

  // //This will set the pricesWebSocket to the WebSocket of the presently selected coin
  // useEffect(() => {
  //     pricesWebSocket.current && pricesWebSocket.current.terminate();
  //     pricesWebSocket.current = new WebSocket(
  //         `wss://ws.coincap.io/prices?assets=${coinValue.id}`
  //     );
  //     console.log("Change was Made to Coin Selection");
  // }, [coinValue.id]);

  if (pricesWebSocket.current !== null) {
    pricesWebSocket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const presentPrice = data[coinValue.id];
      if (presentPrice) setCoinPrice(() => presentPrice);
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        id="Coin-Select"
        value={coinValue}
        onChange={(event, newValue) => {
          setCoinValue(newValue);
          console.log(newValue);
        }}
        inputValue={coinInputValue}
        onInputChange={(event, newInputValue) => {
          setCoinInputValue(newInputValue);
        }}
        options={tickers}
        sx={{ width: 200 }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Coin" />}
      />
      <h2>{`Price: ${coinPrice}`}</h2>
    </Box>
  );
};
