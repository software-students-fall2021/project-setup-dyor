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



export function BottomBar({currentPage, setCurrentPage}) {
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
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction
            label="Portfolio"
            icon={<AccountBalanceWalletIcon />}
          />
          <BottomNavigationAction label="News" icon={<DescriptionIcon />} />
          <BottomNavigationAction label="NFA" icon={<PageviewIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
