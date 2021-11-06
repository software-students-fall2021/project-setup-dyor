import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { LiveChartContainer } from "../LiveChartContainer/LiveChartContainer";
import axios from "axios";
import { historicalPriceDataURL, userDataURL } from "../../back-end_routes";
import { DailyGraph } from "../../components/DailyGraph/DailyGraph";

const IndividualCoinPage = () => {
    const { userID, assetID, coinSymbol } = useParams();
    const [assetDetails, setAssetDetails] = useState({});
    const [historicalPriceData, setHistoricalPriceData] = useState([]);

    useEffect(() => {
        axios
            .request(userDataURL, {
                params: {
                    userID,
                    assetID,
                },
            })
            .then((response) => {
                const tempAssetDetails = response.data;
                setAssetDetails(() => tempAssetDetails);

                const presentDate = new Date();
                const previousDate = new Date();
                previousDate.setFullYear(previousDate.getFullYear() - 1);

                // The historicalPriceDataURL requires the following query parameters
                // coin_symbol, peroid_id, time_start, time_end, limit
                axios
                    .request(historicalPriceDataURL, {
                        params: {
                            coin_symbol: coinSymbol,
                            period_id: "1DAY",
                            time_start: previousDate,
                            time_end: presentDate,
                            limit: 365,
                        },
                    })
                    .then((response) => {
                        console.log(
                            "INDIVIDUAL COIN PAGE: RECEIVED HISTORICAL DATA"
                        );
                        setHistoricalPriceData(() => response.data);
                    })
                    .catch((err) => {
                        console.log(
                            `INDIVIDUAL COIN PAGE: FAILED TO GET HISTORICAL DATA FOR ${userID} | ${coinSymbol}`
                        );
                    });
            })
            .catch((err) =>
                console.log("INDIVIDUAL COIN PAGE: OBTAINING USERDATA FAILED")
            );
    }, []);

    return (
        <Box>
            <h1>{assetID}</h1>
            <Paper elevation={2}>
                <LiveChartContainer coinName={coinSymbol}></LiveChartContainer>
                <DailyGraph
                    assetDetails={assetDetails}
                    historicalPriceData={historicalPriceData}
                ></DailyGraph>
            </Paper>
        </Box>
    );
};

export default IndividualCoinPage;
