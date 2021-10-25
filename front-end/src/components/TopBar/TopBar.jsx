import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Toolbar className="topBar">
          <Box className="logo">
            <Typography className={styles.logoTitle}>DYOR</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
