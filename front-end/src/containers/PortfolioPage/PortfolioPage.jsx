import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PortfolioTable } from "../../components/PortfolioTable/PortfolioTable";
import Typography from "@mui/material/Typography";
import styles from "./PortfolioPage.module.css";
import { Box } from "@mui/system";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";
import { Stack } from "@mui/material";
import AddAssetForm from "../../components/Forms/AddAssetForm";

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

export function PortfolioPage() {
    const [tickers, setTickers] = useState({});
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
                const tickersDict = dataArr.reduce(
                    (a, x) => ({ ...a, [x.id]: x.label }),
                    {}
                );
                setTickers(() => tickersDict);
                console.log(tickersDict);
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
            // console.log("RAW PRICES:");
            // console.log(dataResponseArr);
            // console.log("CUMULATED PRICES:");
            setCoinPrices((setCoinPrices) => ({
                ...coinPrices,
                ...dataResponseArr,
            }));
            // console.log(coinPrices);
        };
    }

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
                    coinLabels={tickers}
                ></PortfolioTable>
            </Box>
            <Box className={styles.portfolioTable}>
                <DailyGraph></DailyGraph>
            </Box>
            <AddAssetForm></AddAssetForm>
        </Stack>
    );
}
