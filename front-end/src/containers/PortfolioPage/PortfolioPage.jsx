import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import { Paper, Stack } from "@mui/material";
import AddAssetForm from "../../components/Forms/AddAssetForm";
import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import styles from "./PortfolioPage.module.css";
import axios from "axios";
import { invert } from "underscore";
// import { response } from "../../../../back-end/app";

// class OwnedAsset {
//     constructor(id, quantityPurchased, unitPrice, datePurchased) {
//         this.id = id;
//         this.quantityPurchased = quantityPurchased;
//         this.unitPrice = unitPrice;
//         const [year, month, day] = datePurchased.split("/").reverse();
//         this.datePurchased = Date(year, month, day);
//     }
// }

// const DefaultUserAssets = [
//     new OwnedAsset("bitcoin", 2, 30000, "10/5/2021"),
//     new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
//     new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
// ];

const userDataURL = "/userData";

export function PortfolioPage() {
    const [tickersDict, setTickersDict] = useState({});
    const [invertedTickersDict, setInvertedTickersDict] = useState({});
    const [newAssetAdditionPending, setNewAssetAdditionPending] =
        useState(false);
    const [tickersArr, setTickersArr] = useState([]);
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

        axios
            .request(userDataURL)
            .then((response) => {
                console.log(response);
                setUserData(() => response.data);
            })
            .catch((err) => {
                console.log("Get User Data Failed.");
                console.log(err);
            });

        axios
            .request("https://api.coincap.io/v2/assets")
            .then((response) => {
                const dataArr = response.data.data.map(({ id, symbol }) => ({
                    id: id,
                    label: symbol,
                }));
                setTickersArr(() => dataArr);
                const tempTickersDict = dataArr.reduce(
                    (a, x) => ({ ...a, [x.id]: x.label }),
                    {}
                );
                setTickersDict(() => tempTickersDict);
                setInvertedTickersDict(() => invert(tempTickersDict));
            })
            .catch((err) => {
                console.log("Get Ticker Data Failed.");
                console.log(err);
            });
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
            { id: coin, quantityPurchased, purchasePrice, datePurchased },
            ...prevUserData,
        ]);
    };

    return (
        <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={2}
            bgcolor="rgb(230, 248, 246)"
        >
            <item>
                <Typography
                    weight="bolder"
                    color="primary"
                    variant="h4"
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
                        coinLabels={tickersDict}
                        onClick={onAddNewAssetButtonClickHandler}
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
                        coinLabels={tickersArr}
                        onAddNewAssetHandler={addNewUserAssetData}
                        labelsToCoinsDict={invertedTickersDict}
                        onSubmit={onSubmitNewAssetButtonClickHandler}
                    ></AddAssetForm>
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
