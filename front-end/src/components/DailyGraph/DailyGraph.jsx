import React, { useState, useEffect } from "react";
// import { Typography } from "@mui/material";
import styles from "./DailyGraph.module.css";
import { Grid, Button } from "@mui/material";
import {
  format,
  isBefore,
  isAfter,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Stack } from "@mui/material";

//A hacky fix found online to get axis labels to display correctly, credit for this function is all due to https://github.com/recharts/recharts/issues/184
const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
  const isVert = axisType === "yAxis";
  const cx = isVert ? x : x + width / 2;
  const cy = isVert ? height / 2 + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rot})`}
      textAnchor="middle"
      stroke={stroke}
    >
      {children}
    </text>
  );
};

export function DailyGraph({ assetDetails, historicalPriceData }) {
  const [graphData, setGraphData] = useState([]);
  const [period, setPeriod] = useState("WEEK");

  useEffect(() => {
    console.log("HELLO");
    console.log("assetDetails");
    console.log(assetDetails);
    console.log("historicalPriceData");
    console.log(historicalPriceData);
    //Only if we have the datePurchased value for the assetDetails, may we proceed and plot matters
    if (assetDetails && assetDetails.datePurchased && historicalPriceData) {
      console.log(`assetDetails.datePurchased ${assetDetails.datePurchased}`);
      const purchaseDate = new Date(assetDetails.datePurchased);
      const purchaseDateFormatted = format(purchaseDate, "dd/MM/yyyy");
      const presentTime = new Date();

      //handle the different case of year, month, and week prior
      let priorTime;
      if (period === "WEEK") {
        priorTime = subDays(presentTime, 7);
      } else if (period === "MONTH") {
        priorTime = subMonths(presentTime, 1);
      } else if (period === "YEAR") {
        priorTime = subYears(presentTime, 1);
      } else {
        console.log("SOMETHING HAS GONE WRONG | RUNNING OFF");
        return;
      }

      const endDateFormatted = format(new Date(presentTime), "dd/MM/yyyy");

      const timePriorFormatted = format(priorTime, "dd/MM/yyyy");

      //the start date will be the later between the date purchased and the (year, month, week - depending on user selection) prior to the present
      const startDate = isAfter(purchaseDate, priorTime)
        ? purchaseDate
        : priorTime;
      //zeroing out hours, minutes and seconds
      startDate.setHours(0, 0, 0);

      const startDateFormatted = format(startDate, "dd/MM/yyyy");

      console.log(historicalPriceData);

      console.log(
        `purchaseDate = ${purchaseDateFormatted} | endDate = ${endDateFormatted} | timePrior = ${timePriorFormatted} | startDate = ${startDateFormatted}`,
      );

      const filteredData = historicalPriceData
        .map((dataElement) => {
          return {
            date: new Date(dataElement.time_period_start),
            price: (dataElement.rate_high + dataElement.rate_low) / 2,
          };
        })
        .filter((dataElement) => {
          const isRemove = !isBefore(dataElement.date, startDate);
          if (!isRemove)
            console.log(
              `REMOVAL WITH ${format(dataElement.date, "dd/MM/yyyy")} ${format(
                startDate,
                "dd/MM/yyyy",
              )}`,
            );
          return isRemove;
        });

      const profitLossData = [];

      for (let i = 1; i < filteredData.length; i++) {
        profitLossData.push({
          date: format(filteredData[i].date, "MM/dd/yy"),
          profitLoss:
            (filteredData[i].price - filteredData[i - 1].price) *
            assetDetails.quantityPurchased,
        });
      }

      console.log("DATA THAT WE HAVE");
      console.log(profitLossData);
      setGraphData(() => profitLossData);
    }
  }, [assetDetails, historicalPriceData, period]);

  const onClickHandler = (event) => {
    console.log("BUTTON CLICKED, EVENT DETAILS:");
    console.log(event.target.id);
    setPeriod(() => event.target.id);
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
    >
      <item>
        <h1>Historical Daily Profit/Loss</h1>
      </item>
      <item>
        <div className={styles.center}>
          <BarChart
            data={graphData}
            width={350}
            height={500}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={<AxisLabel axisType="yAxis">Date</AxisLabel>}
            />
            <YAxis label={<AxisLabel axisType="yAxis">USD</AxisLabel>} />
            <Tooltip />
            <Bar dataKey="profitLoss" unit="USD">
              {graphData.map((entry, index) => {
                console.log(entry);
                return (
                  <Cell
                    key={`${entry.date}`}
                    fill={entry.profitLoss > 0 ? "00FF00" : "FF0000"}
                    stroke={entry.profitLoss > 0 ? "00FF00" : "FF0000"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </div>
      </item>
      <item>
        <Grid container>
          <Grid item xs={4} className={styles.fullWidth}>
            <Button id="WEEK" onClick={onClickHandler} variant="contained">
              Past 7 Days
            </Button>
          </Grid>
          <Grid item xs={4} className={styles.fullWidth}>
            <Button id="MONTH" onClick={onClickHandler} variant="contained">
              Past Month
            </Button>
          </Grid>
          <Grid item xs={4} className={styles.fullWidth}>
            <Button id="YEAR" onClick={onClickHandler} variant="contained">
              Past Year
            </Button>
          </Grid>
        </Grid>
      </item>
    </Stack>
  );
}
