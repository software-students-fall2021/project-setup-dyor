/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  presentPriceAndChangeURL,
  userAssetDataURL,
} from "../../back-end_routes";
import DeleteIcon from "@mui/icons-material/Delete";

const CoinImage = (props) => {
  const coinID = props.coinID;
  const coinSymbol = props.symbolsDict[coinID];
  const lowerCoinSymbol = (coinSymbol && coinSymbol.toLowerCase()) || "generic";

  const clickHandler = () => {
    console.log(`${coinID} has been clicked.`);
  };

  return (
    <Link
      to={`/coinDetails/${coinID}/${coinSymbol}`}
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
  let formatedVal = Math.round(val * multiplier) / multiplier;
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
  const [showDelete, setShowDelete] = useState(false);
  const [rate, setRate] = useState(1);
  const refresh = props.onRefresh;

  const currency = localStorage.getItem("currency");

  useEffect(() => {
    const presentPrice = async () => {
      await axios
        .request(presentPriceAndChangeURL)
        .then((response) => {
          setDailyPricesAndChanges(() => response.data);
          console.log("DAILY PRICE AND CHANGE");
          console.log(response.data);
        })
        .catch((err) => {
          console.log("PORTFOLIO TABLE: GET DAILY PRICE AND CHANGE FAILED");
          console.log(err);
        });
    };
    const currencyAPI = async () => {
      await axios
        .get(`/users/currency/${currency}`)
        .then((res) => {
          console.log(res.data);
          setRate(res.data.rate);
        })
        .catch((err) => {});
    };
    currencyAPI();
    presentPrice();
  }, []);

  const deleteButtonHandler = () => {
    setShowDelete((prevShowDelete) => !prevShowDelete);
  };

  const onDeleteAsset = (name) => {
    axios
      .delete(userAssetDataURL, {
        params: {
          assetID: name,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        refresh();
      })
      .catch((err) => {
        console.log("Deletion Unsuccessful");
        console.log(err);
      });
  };

  const TableEntries = () => {
    let totalProfitAndLoss = 0;

    const returnObjects = props.userData.map((userDataElement) => {
      const lowerCaseID = userDataElement.id.toLowerCase().split(" ").join("-");

      const coinStaticPrice =
        (dailyPricesAndChanges[lowerCaseID] &&
          dailyPricesAndChanges[lowerCaseID].price) ||
        0;

      const coinRealTimePrice =
        props.pricesData[lowerCaseID] || coinStaticPrice;

      const coinDailyChange =
        (dailyPricesAndChanges[lowerCaseID] &&
          dailyPricesAndChanges[lowerCaseID].priceChange) ||
        "";

      const userProfit =
        (coinStaticPrice - userDataElement.unitPrice) *
        userDataElement.quantityPurchased *
        rate;

      const coinPrice = coinRealTimePrice * rate;

      console.log(
        `staticPrice: ${coinStaticPrice} | coinRealTimePrice: ${coinRealTimePrice} | coinDailyChange: ${coinDailyChange} | userProfit: ${userProfit} | rate ${rate} | coinPrice: ${coinPrice}`,
      );

      totalProfitAndLoss += userProfit;

      return (
        <TableRow key={userDataElement.id}>
          {showDelete ? (
            <TableCell component="th" scope="row">
              <Button onClick={() => onDeleteAsset(userDataElement.id)}>
                <DeleteIcon></DeleteIcon>
              </Button>
            </TableCell>
          ) : (
            <></>
          )}
          <TableCell component="th" scope="row">
            <CoinImage
              coinID={userDataElement.id}
              symbolsDict={props.coinNameToSymbolDict}
            ></CoinImage>
          </TableCell>
          <TableCell align="right">
            <NumericEntry
              val={`${coinPrice}`}
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
    });
    console.log(`P&L is ${totalProfitAndLoss}`);
    props.setProfitAndLoss(() => totalProfitAndLoss);
    return returnObjects;
  };

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
              {showDelete ? (
                <TableCell>
                  <Typography className={styles.tableHeading} variant="h7">
                    <> </>
                  </Typography>
                </TableCell>
              ) : (
                <></>
              )}
              <TableCell>
                <Typography className={styles.tableHeading} variant="h7">
                  Coin
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  Price ({currency})
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  24H&nbsp;Change
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className={styles.tableHeading} variant="h7">
                  P/Loss ({currency})
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{TableEntries()}</TableBody>
        </Table>
        <Box className={styles.button}>
          <Button
            variant="contained"
            color="secondary"
            style={{ maxWidth: "100%", minWidth: "50%" }}
            onClick={deleteButtonHandler}
          >
            Delete Asset
          </Button>
        </Box>
        <Box className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            style={{ maxWidth: "100%", minWidth: "50%" }}
            onClick={props.onAddAsset}
          >
            Add Asset
          </Button>
        </Box>
      </Box>
    </>
  );
}
