import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./TopBar.module.css";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { borderRight } from "@mui/system";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <>
      <AppBar position="sticky" className={styles.header}>
        <Toolbar className={styles.topBar}>
          <Box className={styles.logo}>
            <Typography className={styles.logoTitle}>DYOR</Typography>
          </Box>
          <Box className={styles.settingsIcon} sx={{ alignItems: borderRight }}>
            <Link to="/settings">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <SettingsIcon style={{ color: "white" }} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
