import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import styles from "./PortfolioTable.module.css";

function createData(coin, price, chance, pnl) {
  return { coin, price, chance, pnl };
}

const rows = [
  createData("Bitcoin", 159, 6.0, 24),
  createData("Ethereum", 237, 9.0, 37),
  createData("Doge Coin", 262, 16.0, 24),
  createData("Cardano", 305, 3.7, 67),
];

export function PortfolioTable() {
  return (
    <TableContainer component="Paper">
      <Box
        sx={{
          justifyContent: "center",
        }}
      >
        <Box className={styles.tableBox}>
          <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow style={{ height: 10 }}>
                <TableCell>Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24H</TableCell>
                <TableCell align="right">Profit/Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.coin}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.coin}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.chance}</TableCell>
                  <TableCell align="right">{row.pnl}</TableCell>
                </TableRow>
              ))}
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
