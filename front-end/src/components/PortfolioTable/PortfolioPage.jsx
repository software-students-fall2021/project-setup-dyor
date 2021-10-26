import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import axios from "axios";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import AddAssetForm from "../../components/Forms/AddAssetForm";
import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import styles from "./PortfolioPage.module.css";

class OwnedAsset {
    constructor(id, quantityPurchased, purchasePrice, datePurchased) {
        this.id = id;
        this.quantityPurchased = quantityPurchased;
        this.purchasePrice = purchasePrice;
        const [year, month, day] = datePurchased.split("/").reverse();
        this.datePurchased = Date(year, month, day);
    }
}

let DefaultUserAssets = [
    new OwnedAsset("bitcoin", 2, 30000, "10/5/2021"),
    new OwnedAsset("ethereum", 20, 2000, "12/06/2021"),
    new OwnedAsset("polkadot", 2, 30, "13/08/2021"),
];

export function PortfolioPage() {
    const [tickersDict, setTickersDict] = useState({});
    const [tickersArr, setTickersArr] = useState([]);
    const [coinValue, setCoinValue] = useState({ id: "bitcoin", label: "BTC" });
    const [coinInputValue, setCoinInputValue] = useState("BTC");
    let pricesWebSocket = useRef(null);
    const [coinPrices, setCoinPrices] = useState([]);
    const [userData, setUserData] = useState(DefaultUserAssets);

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

    //will not handle at the moment previously existing data for the sake of simplicity and each purchase will be treated a new distinct purchase even if the coin purchased is the same
    const addNewUserAssetData = (
        coin,
        quantityPurchased,
        purchasePrice,
        datePurchased
    ) => {
        console.log(datePurchased);
        return;
    };

    // return (
    //     <Box
    //         sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //         }}
    //     >
    //         <Autocomplete
    //             id="Coin-Select"
    //             value={coinValue}
    //             onChange={(event, newValue) => {
    //                 setCoinValue(newValue);
    //                 console.log(newValue);
    //             }}
    //             inputValue={coinInputValue}
    //             onInputChange={(event, newInputValue) => {
    //                 setCoinInputValue(newInputValue);
    //             }}
    //             options={tickers}
    //             sx={{ width: 200 }}
    //             isOptionEqualToValue={(option, value) => option.id === value.id}
    //             renderInput={(params) => <TextField {...params} label="Coin" />}
    //         />
    //         <h2>{`Price: ${coinPrice}`}</h2>
    //     </Box>

    return (
        <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={0.5}
        >
            <Typography weight="bold" color="primary" variant="h4">
                Portfolio
            </Typography>
            <Box className={styles.portfolioTable}>
                <PortfolioTable
                    pricesData={coinPrices}
                    userData={userData}
                    coinLabels={tickersDict}
                ></PortfolioTable>
            </Box>
            <Box className={styles.portfolioTable}>
                <DailyGraph></DailyGraph>
            </Box>
            <AddAssetForm
                coinLabels={tickersArr}
                onAddNewAssetHandler={addNewUserAssetData}
            ></AddAssetForm>
        </Stack>
    );
}
