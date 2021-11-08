import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import styles from "./PortfolioTable.module.css";
import Icon from "react-crypto-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { presentPriceAndChangeURL } from "../../back-end_routes";

const CoinImage = (props) => {
  const userID = props.userID;
  const coinID = props.coinID;
  const coinSymbol = props.symbolsDict[coinID];
  const lowerCoinSymbol = (coinSymbol && coinSymbol.toLowerCase()) || "generic";

  const clickHandler = () => {
    console.log(`${coinID} has been clicked.`);
  };

  return (
    <Link
      to={`/coinDetails/${userID}/${coinID}/${coinSymbol}`}
      className={styles.noDecoration}
    >
      <Grid
        container
        direction="columnn"
        alignItems="center"
        justifyContent="center"
        className={styles.coinAggregate}
        onClick={clickHandler}
      >
        <Grid item>
          <Icon name={lowerCoinSymbol} size={32}></Icon>
        </Grid>
        <Grid item>
          <Typography className={styles.coinText}>
            {coinSymbol || "NA"}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

const NumericEntry = ({
  val,
  isColor,
  numDecimalPlaces = 0,
  additionalSuffix = "",
}) => {
  const multiplier = 10 ** numDecimalPlaces;
  const formatedVal = Math.round(val * multiplier) / multiplier;
  const styleClass = isColor
    ? formatedVal > 0
      ? styles.profit
      : styles.loss
    : styles.normal;
  const outputString = `${formatedVal}${additionalSuffix}`;
  return <Typography className={styleClass}>{outputString}</Typography>;
};

export function PortfolioTable(props) {
  const [dailyPricesAndChanges, setDailyPricesAndChanges] = useState({});

  useEffect(() => {
    //get all previous day prices?
    // axios
    //     .request("https://api.coincap.io/v2/assets")
    //     .then((response) => {
    //         const dailyPriceChange = response.data.data.map(
    //             ({ id, changePercent24Hr }) => ({
    //                 id: id,
    //                 priceChange: changePercent24Hr,
    //             })
    //         );
    //         const dailyPriceChangeDict = dailyPriceChange.reduce(
    //             (a, x) => ({ ...a, [x.id]: x.priceChange }),
    //             {}
    //         );
    //         console.log(dailyPriceChangeDict);
    //         setDailyPercentageChanges(() => dailyPriceChangeDict);
    //     })
    //     .catch((err) => {
    //         console.log("Get Daily Change Data Failed.");
    //         console.log(err);
    //     });

    axios
      .request(presentPriceAndChangeURL)
      .then((response) => {
        setDailyPricesAndChanges(() => response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("PORTFOLIO TABLE: GET DAILY PRICE AND CHANGE FAILED");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className={styles.tableBox}>
        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <TableHead>
            <TableRow style={{ height: 5 }}>
              <TableCell>
                <Typography className={styles.tableHeading} variant="h7">
                  Coin
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  24H&nbsp;Change
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  Profit/Loss
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userData.map((userDataElement) => {
              const lowerCaseID = userDataElement.id.toLowerCase();
              const coinPrice = props.pricesData[lowerCaseID];
              const coinDailyChange =
                (dailyPricesAndChanges[lowerCaseID] &&
                  dailyPricesAndChanges[lowerCaseID].priceChange) ||
                "";
              const userProfit =
                (coinPrice - userDataElement.unitPrice) *
                userDataElement.quantityPurchased;

              return (
                <TableRow key={userDataElement.id}>
                  <TableCell component="th" scope="row">
                    <CoinImage
                      userID={props.userID}
                      coinID={userDataElement.id}
                      symbolsDict={props.coinNameToSymbolDict}
                    ></CoinImage>
                  </TableCell>
                  <TableCell align="right">
                    <NumericEntry
                      val={coinPrice}
                      numDecimalPlaces={2}
                    ></NumericEntry>
                  </TableCell>
                  <TableCell align="right">
                    <NumericEntry
                      val={coinDailyChange}
                      isColor={true}
                      numDecimalPlaces={2}
                      additionalSuffix="%"
                    ></NumericEntry>
                  </TableCell>
                  <TableCell align="right">
                    <NumericEntry
                      val={userProfit}
                      isColor={true}
                      numDecimalPlaces={2}
                    ></NumericEntry>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box className={styles.button}>
          <Button variant="contained" color="primary" onClick={props.onClick}>
            Add Asset
          </Button>
        </Box>
      </Box>
    </>
  );
}
