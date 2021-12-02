import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Paper, Stack } from "@mui/material";
import AddAssetForm from "../../components/Forms/AddAssetForm";
import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import styles from "./PortfolioPage.module.css";
import axios from "axios";
import { userAssetDataURL, coinLabelDataURL } from "../../back-end_routes";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/portfoliobackground3.png"})`,
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
  },
}));

export function PortfolioPage() {
  const [coinNameToSymbolDict, setCoinNameToSymbolDict] = useState({});
  const [newAssetAdditionPending, setNewAssetAdditionPending] = useState(false);
  const [coinLabels, setCoinLabels] = useState([]);
  const pricesWebSocket = useRef(null);
  const [coinPrices, setCoinPrices] = useState([]);
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const classes = useStyles();


  //This will obtain the initial set of coins
  useEffect(() => {
    //this will initiate a reach out to the websocket for dynamic prices
    pricesWebSocket.current = new WebSocket(
      "wss://ws.coincap.io/prices?assets=ALL",
    );

    pricesWebSocket.current.onerror = (event) => {
      console.log("FAILURE IN WS");
      pricesWebSocket.current.close();
    };

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
          {},
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
  }, [refresh]);

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

  const onSetRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  //will not handle at the moment previously existing data for the sake of simplicity and each purchase will be treated a new distinct purchase even if the coin purchased is the same
  const addNewUserAssetData = ({
    coin,
    quantityPurchased,
    purchasePrice,
    datePurchased,
  }) => {
    const newAsset = {
      id: coin,
      quantityPurchased,
      unitPrice: purchasePrice,
      datePurchased,
    };
    axios
      .post(
        userAssetDataURL,
        {
          ...newAsset,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      )
      .then((response) => {
        console.log(response);
        setUserData((prevUserData) => [
          {
            ...newAsset,
          },
          ...prevUserData,
        ]);
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Asset Addition Failed. Try again. Note that duplicate assets may not be added.`,
        );
      });
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
      bgcolor="rgb(230, 248, 246)"
    ><div className = {classes.root}>
      <item>
        <Typography
          weight="bolder"
          color="#fff"
          variant="h4"
          align="center"

          className={styles.heading}
        >
          Portfolio
        </Typography>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem}>
          <PortfolioTable
            pricesData={coinPrices}
            userData={userData}
            coinNameToSymbolDict={coinNameToSymbolDict}
            onAddAsset={onAddNewAssetButtonClickHandler}
            onRefresh={onSetRefresh}
          ></PortfolioTable>
        </Paper>
      </item>
      <item>
        <Paper
          elevation={2}
          className={`${styles.stackItem} ${
            newAssetAdditionPending ? "" : styles.hidden
          }`}
        >
          <AddAssetForm
            coinLabels={coinLabels}
            onAddNewAssetHandler={addNewUserAssetData}
            onSubmit={onSubmitNewAssetButtonClickHandler}
          ></AddAssetForm>
        </Paper>
      </item>
      </div>
    </Stack>
  );
}
