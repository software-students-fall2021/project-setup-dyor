import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Grid } from "@material-ui/core";
import styles from "./NFATable.module.css";
import Icon from "react-crypto-icons";

const CoinImage = (props) => {
  const coinID = props.id;
  const coinSymbol =
    props.symbolsDict[coinID] && props.symbolsDict[coinID].toLowerCase();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
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

export function NFATable(props) {
  const [userPrediction, setUserPrediction] = useState();

  return (
    <>
      <Box className={styles.tableBox}>
        <Table
          sx={{ minWidth: 200 }}
          size="small"
          aria-label="a dense table"
          className={styles.tableDesign}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="subtitle2">
                  Coin
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="subtitle2">
                  {" "}
                  Price
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography className={styles.tableHeading} variant="subtitle2">
                  Prediction
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userData.map((userDataElement) => {
              const coinPrice = props.pricesData[userDataElement.id];

              return (
                <TableRow key={userDataElement.id}>
                  <TableCell component="th" scope="row">
                    <CoinImage
                      id={userDataElement.id}
                      symbolsDict={props.coinLabels}
                    ></CoinImage>
                  </TableCell>
                  <TableCell align="center">
                    <NumericEntry
                      val={coinPrice}
                      numDecimalPlaces={2}
                    ></NumericEntry>
                  </TableCell>

                  <TableCell align="center">
                    <NumericEntry
                      val={
                        Math.random() > 0.5
                          ? Math.random() * 10
                          : Math.random() * -10
                      }
                      isColor={true}
                      numDecimalPlaces={2}
                    ></NumericEntry>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
