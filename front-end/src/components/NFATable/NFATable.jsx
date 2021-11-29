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
// import axios from "axios";
// import { coinPredict } from "../../back-end_routes";
import { Link } from "react-router-dom";
import {useState} from "react";

let count = 0;

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

export function NFATable(props) {
  // const [userPrediction, setUserPrediction] = useState();
  const [getPredict, setGetPredict] = useState({});


  // const pseudoGetPredict = [
  //   {
  //     id: "Internet Computer",
  //     prediction: 76245,
  //   },
  //   {
  //     id: "Polygon",
  //     prediction: 99753,
  //   },
  //   {
  //     id: "Chainlink",
  //     prediction: 46722,
  //   },
  //   {
  //     id: "XRP",
  //     prediction: 92885,
  //   },
  //   {
  //     id: "Bitcoin",
  //     prediction: 19707,
  //   },
  //   {
  //     id: "Stellar",
  //     prediction: 63319,
  //   },
  //   {
  //     id: "Algorand",
  //     prediction: 99660,
  //   },
  //   {
  //     id: "Axie Infinity",
  //     prediction: 60048,
  //   },
  //   {
  //     id: "Polygon",
  //     prediction: 86553,
  //   },
  //   {
  //     id: "Polygon",
  //     prediction: 84314,
  //   },
  //   {
  //     id: "Bitcoin Cash",
  //     prediction: 59927,
  //   },
  //   {
  //     id: "Dogecoin",
  //     prediction: 84588,
  //   },
  //   {
  //     id: "Polkadot",
  //     prediction: 66333,
  //   },
  //   {
  //     id: "Axie Infinity",
  //     prediction: 24978,
  //   },
  //   {
  //     id: "Binance USD",
  //     prediction: 73354,
  //   },
  //   {
  //     id: "EOS",
  //     prediction: 65867,
  //   },
  //   {
  //     id: "Tether",
  //     prediction: 78823,
  //   },
  //   {
  //     id: "USD Coin",
  //     prediction: 46139,
  //   },
  //   {
  //     id: "Dogecoin",
  //     prediction: 67584,
  //   },
  //   {
  //     id: "Ethereum",
  //     prediction: 61335,
  //   },
  //   {
  //     id: "Litecoin",
  //     prediction: 64583,
  //   },
  //   {
  //     id: "Elrond",
  //     prediction: 59916,
  //   },
  //   {
  //     id: "Axie Infinity",
  //     prediction: 31871,
  //   },
  //   {
  //     id: "VeChain",
  //     prediction: 83628,
  //   },
  //   {
  //     id: "Polygon",
  //     prediction: 21154,
  //   },
  // ];

  // var intervalId = setInterval(function(){
    if (count % 30 === 0){
      axios
      .get(coinPredict)
      .then((response) => {
        // console.log(response.data);
        console.log("Front-end")

        setGetPredict(response.data);
        // console.log("GET PREDICT")
        // console.log(getPredict)
        // setGetTemp("0");
      })
      .catch((err) => {
        // console.log("Coin Predict Failed");
        console.log(err);
        console.log("Error")
      });
    }

    count = count + 1;
    // console.log(count)
  // }, 50000);

    // clearInterval(intervalId)

  
  // GetPredict ? GetPredict.map((obj) =>
        // obj.id === userDataElement.id ? 
        // obj.prediction : "",
    //   )
    // : 0}

//////..........................


  // for (let i = 0; i<getPredict.length;i++){
  //   const new_prediction = new coinPredictMod({
  //     name: getPredict[i].id,
  //     prediction: getPredict[i].prediction,
  //   });

  //   new_prediction.save(function(err,doc){
  //     if (err) return console.error(err);
  //     console.log("Document inserted successfully")
  //   });
  // }

  // const new_prediction = new coinPredictMod({
  //   name: GetPredict.id,
  //   prediction: GetPredict.prediction,
  // });


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
                    {/* <NumericEntry
                      val={
                        Math.random() > 0.5
                          ? Math.random() * 10
                          : Math.random() * -10
                      }
                      isColor={true}
                      numDecimalPlaces={2}
                    ></NumericEntry> */}

                    {/* if getPredict is object containing objects */}
                    {/* {getPredict
                      ? Object.keys(getPredict).map((objNum) => {
                          if (getPredict[objNum].id === "bitcoin") {
                            return getPredict[objNum].prediction;
                          }
                        })
                      : 0} */}

                    {/* if getPredict is array of objects --- For Working Api*/}

                    {getPredict && !(typeof getPredict === 'object' && !Array.isArray(getPredict) && getPredict !== null)
                      ? 
                      getPredict.map((obj) =>
                          obj.name === userDataElement.id ? obj.prediction : "",
                          
                        )
                      // console.log(getPredict)
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