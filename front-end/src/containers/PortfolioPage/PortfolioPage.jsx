import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import { Paper, Stack } from "@mui/material";
import AddAssetForm from "../../components/Forms/AddAssetForm";
import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import styles from "./PortfolioPage.module.css";
import axios from "axios";
import { userDataURL, coinLabelDataURL } from "../../back-end_routes";

const defaultUser = "John";

export function PortfolioPage() {
  const userID = defaultUser;
  const [coinNameToSymbolDict, setCoinNameToSymbolDict] = useState({});
  const [newAssetAdditionPending, setNewAssetAdditionPending] = useState(false);
  const [coinLabels, setCoinLabels] = useState([]);
  const pricesWebSocket = useRef(null);
  const [coinPrices, setCoinPrices] = useState([]);
  const [userData, setUserData] = useState([]);

  //This will obtain the initial set of coins
  useEffect(() => {
    //this will initiate a reach out to the websocket for dynamic prices
    pricesWebSocket.current = new WebSocket(
      "wss://ws.coincap.io/prices?assets=ALL"
    );

    pricesWebSocket.current.onerror = (event) => {
      console.log("FAILURE IN WS");
      pricesWebSocket.current.close();
    };

    //this will request the data pertaining to a particular user
    axios
      .request(userDataURL, {
        params: {
          userID,
        },
      })
      .then((response) => {
        setUserData(() => response.data);
      })
      .catch((err) => {
        console.log("Get User Data Failed.");
        console.log(err);
      });

    //this will request an array of all the coin data labels supported by our from the back-end, these have been defined by ourselves, and will largely be static only being update every now and then
    axios
      .request(coinLabelDataURL)
      .then((response) => {
        const dataArr = response.data;

        setCoinLabels(() => dataArr);
        const tempTickersDict = dataArr.reduce(
          (prev, present) => ({
            ...prev,
            [present.name]: present.symbol,
          }),
          {}
        );
        //these dictionaries are created since we must transition from full names and ids frequently
        setCoinNameToSymbolDict(() => tempTickersDict);
      })
      .catch((err) => {
        console.log("Get Coin Label Data Failed.");
        console.log(err);
      });

    return () => {
      pricesWebSocket.current.close();
    };
  }, []);

  //Will Update State to have present value of prices for all coins
  if (pricesWebSocket.current !== null) {
    pricesWebSocket.current.onmessage = (e) => {
      const dataResponseArr = JSON.parse(e.data);
      setCoinPrices((setCoinPrices) => ({
        ...coinPrices,
        ...dataResponseArr,
      }));
    };
  }

  const onAddNewAssetButtonClickHandler = () => {
    setNewAssetAdditionPending(() => true);
  };

  const onSubmitNewAssetButtonClickHandler = () => {
    setNewAssetAdditionPending(() => false);
  };

  //will not handle at the moment previously existing data for the sake of simplicity and each purchase will be treated a new distinct purchase even if the coin purchased is the same
  const addNewUserAssetData = ({
    coin,
    quantityPurchased,
    purchasePrice,
    datePurchased,
  }) => {
    setUserData((prevUserData) => [
      {
        id: coin,
        quantityPurchased,
        unitPrice: purchasePrice,
        datePurchased,
      },
      ...prevUserData,
    ]);
  };

  return (
    <Stack
      direction='column'
      justifyContent='space-evenly'
      alignItems='stretch'
      spacing={2}
      bgcolor='rgb(230, 248, 246)'>
      <item>
        <Typography
          weight='bolder'
          color='primary'
          variant='h4'
          className={styles.heading}>
          Portfolio
        </Typography>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem}>
          <PortfolioTable
            userID={userID}
            pricesData={coinPrices}
            userData={userData}
            coinNameToSymbolDict={coinNameToSymbolDict}
            onClick={onAddNewAssetButtonClickHandler}></PortfolioTable>
        </Paper>
      </item>
      <item>
        <Paper
          elevation={2}
          className={`${styles.stackItem} ${
            newAssetAdditionPending ? "" : styles.hidden
          }`}>
          <AddAssetForm
            coinLabels={coinLabels}
            onAddNewAssetHandler={addNewUserAssetData}
            onSubmit={onSubmitNewAssetButtonClickHandler}></AddAssetForm>
        </Paper>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem}>
          <DailyGraph></DailyGraph>
        </Paper>
      </item>
    </Stack>
  );
}
