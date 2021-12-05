import React from "react";
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
import axios from "axios";
import { coinPredict } from "../../back-end_routes";
import { Link } from "react-router-dom";
import {useState} from "react";

let count = 0;

const CoinImage = (props) => {
  const userID = props.userID;
  const coinID = props.coinID;
  const coinSymbol = props.symbolsDict[coinID];
  const lowerCoinSymbol = (coinSymbol && coinSymbol.toLowerCase()) || "generic";

  const clickHandler = () => {
    console.log(`${coinSymbol} has been clicked.`);
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

export function NFATable(props) {
  const [getPredict, setGetPredict] = useState({});

  if (count % 30 === 0){
      axios
      .get(coinPredict)
      .then((response) => {
        console.log("Front-end")
        for (let i = 0; i<2;i++){
          console.log(props.userData[i].id)
        }

        setGetPredict(response.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error")
      });
    }
    count = count + 1;

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
                  Tomorrow
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userData.map((userDataElement) => {
              const lowerCaseID = userDataElement.id.toLowerCase();
              const coinPrice = props.pricesData[lowerCaseID];

              return (
                <TableRow key={userDataElement.id}>
                  <TableCell component="th" scope="row">
                    <CoinImage
                      userID={props.userID}
                      coinID={userDataElement.id}
                      symbolsDict={props.coinNameToSymbolDict}
                    ></CoinImage>

                  </TableCell>
                  <TableCell align="center">
                    <NumericEntry
                      val={coinPrice}
                      numDecimalPlaces={2}
                    ></NumericEntry>
                  </TableCell>
                  <TableCell align="center">
                    {getPredict && !(typeof getPredict === 'object' && !Array.isArray(getPredict) && getPredict !== null)
                      ? 
                      getPredict.map((obj) =>
                          obj.name === userDataElement.id ? obj.predictions.toFixed(4): "",
                        )
                      : 'loading...'}

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