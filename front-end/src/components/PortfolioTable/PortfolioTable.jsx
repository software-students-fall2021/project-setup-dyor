import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import styles from "./PortfolioTable.module.css";
import Icon from "react-crypto-icons";
import axios from "axios";

const rounded2DP = (number) => Math.round(number * 100) / 100;

const CoinImage = (props) => {
    const coinID = props.id;
    const coinSymbol =
        props.symbolsDict[coinID] && props.symbolsDict[coinID].toLowerCase();

    return (
        <Grid
            container
            direction="columnn"
            alignItems="center"
            justifyContent="center"
            className={styles.coinAggregate}
        >
            <Grid item>
                <Icon name={coinSymbol} size={32}></Icon>
            </Grid>
            <Grid item>
                <Typography className={styles.coinText}>
                    {(coinSymbol && coinSymbol.toUpperCase()) || "NA"}
                </Typography>
            </Grid>
        </Grid>
    );
};

export function PortfolioTable(props) {
    const [dailyPercantageChanges, setDailyPercentageChanges] = useState({});

    useEffect(() => {
        axios
            .request("https://api.coincap.io/v2/assets")
            .then((response) => {
                const dailyPriceChange = response.data.data.map(
                    ({ id, changePercent24Hr }) => ({
                        id: id,
                        priceChange: changePercent24Hr,
                    })
                );
                const dailyPriceChangeDict = dailyPriceChange.reduce(
                    (a, x) => ({ ...a, [x.id]: x.priceChange }),
                    {}
                );
                setDailyPercentageChanges(() => dailyPriceChangeDict);
            })
            .catch((err) => {
                console.log("Get Daily Change Data Failed.");
                console.log(err);
            });
    }, []);

    return (
        <TableContainer component="Paper">
            <Box
                sx={{
                    justifyContent: "center",
                }}
            >
                <Box className={styles.tableBox}>
                    <Table
                        sx={{ minWidth: 200 }}
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead>
                            <TableRow style={{ height: 10 }}>
                                <TableCell>
                                    <Typography className={styles.tableHeading}>
                                        Coin
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography className={styles.tableHeading}>
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography className={styles.tableHeading}>
                                        Percentange Change (24 Hours)
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography className={styles.tableHeading}>
                                        Cumulative Profit/Loss
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log(props.userData)}
                            {props.userData.map((userDataElement) => {
                                return (
                                    <TableRow key={userDataElement.id}>
                                        <TableCell component="th" scope="row">
                                            {CoinImage({
                                                id: userDataElement.id,
                                                symbolsDict: props.coinLabels,
                                            })}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                props.pricesData[
                                                    userDataElement.id
                                                ]
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {`${rounded2DP(
                                                dailyPercantageChanges[
                                                    userDataElement.id
                                                ]
                                            )}%`}
                                        </TableCell>
                                        <TableCell align="right">
                                            {rounded2DP(
                                                (props.pricesData[
                                                    userDataElement.id
                                                ] -
                                                    userDataElement.unitPrice) *
                                                    userDataElement.quantityPurchased
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <Box className={styles.button}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                alert("clicked");
                            }}
                        >
                            Add Asset
                        </Button>
                    </Box>
                </Box>
            </Box>
        </TableContainer>
    );
}
