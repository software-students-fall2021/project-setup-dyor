import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./DailyGraph.module.css";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

let pnlData = [12, -19, -3, 5, 2, -3];
let dates = [
  "23-12-21",
  "24-12-21",
  "25-12-21",
  "26-12-21",
  "27-12-21",
  "28-12-21",
];
let barColors = [];
let barBorders = [];

for (let i = 0; i < pnlData.length; i++) {
  if (pnlData[i] < 0) {
    barColors.push("rgba(255, 99, 132, 0.2)");
  } else {
    barColors.push("rgba(42, 187, 155, 0.2)");
  }
}

for (let i = 0; i < pnlData.length; i++) {
  if (pnlData[i] < 0) {
    barBorders.push("rgba(255, 99, 132, 1)");
  } else {
    barBorders.push("rgba(42, 187, 155, 1)");
  }
}

const data = {
  labels: dates,
  datasets: [
    {
      label: "Profit",
      data: pnlData,
      backgroundColor: barColors,
      borderColor: barBorders,
      borderWidth: 1,
    },
  ],
};

export function DailyGraph() {
  return (
    <Box className={styles.DailyGraphBox}>
      <Typography variant="h7">PnL</Typography>

      <Bar data={data} options={options}></Bar>
    </Box>
  );
}
