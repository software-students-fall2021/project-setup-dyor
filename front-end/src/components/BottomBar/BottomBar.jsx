import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PageviewIcon from "@mui/icons-material/Pageview";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "./BottomBar.css";

export function BottomBar({ currentPage, setCurrentPage }) {
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={currentPage}
          onChange={(event, newValue) => {
            setCurrentPage(newValue);
          }}
        >
          <Link to="/dashboard">
            <BottomNavigationAction
              showLabel={true}
              label="Dashboard"
              icon={<DashboardIcon />}
            />
          </Link>
          <Link to="/portfolio">
            <BottomNavigationAction
              showLabel={true}
              label="Portfolio"
              icon={<AccountBalanceWalletIcon />}
            />
          </Link>
          <Link to="/news">
            <BottomNavigationAction
              showLabel={true}
              label="News"
              icon={<DescriptionIcon />}
            />
          </Link>
          <Link to="/nfa">
            <BottomNavigationAction
              showLabel={true}
              label="NFA"
              icon={<PageviewIcon />}
            />
          </Link>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
