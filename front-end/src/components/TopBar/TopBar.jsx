import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./TopBar.module.css";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function TopBar({ setCurrentPage }) {
  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Toolbar className="topBar">
          <Box className="logo">
            <Typography className={styles.logoTitle}>DYOR</Typography>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setCurrentPage(4)}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
