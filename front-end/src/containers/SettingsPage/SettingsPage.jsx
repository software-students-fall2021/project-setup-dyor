import React from "react";
import styles from "./SettingsPage.module.css";
import Typography from "@mui/material/Typography";
import { Stack, Paper } from "@material-ui/core";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function SettingsPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
      bgcolor="rgb(230, 248, 246)"
    >
      <item>
        <Typography
          weight="bolder"
          color="primary"
          variant="h4"
          className={styles.heading}
        >
          Settings
        </Typography>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem1}>
          <Typography weight="bolder" color="primary" variant="h6" ml={2}>
            test123@gmail.com
          </Typography>
        </Paper>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem1}>
          {/* Notifications Switch */}
          <FormGroup>
            <FormControlLabel
              label="Notifications"
              control={<Switch defaultChecked />}
            />
          </FormGroup>

          {/* Currency Dropdown */}
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Currency
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>USD</MenuItem>
            <MenuItem onClick={handleClose}>EUR</MenuItem>
            <MenuItem onClick={handleClose}>AED</MenuItem>
          </Menu>
          <br />

          {/* News Region Dropdown */}
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            News Region
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>US</MenuItem>
            <MenuItem onClick={handleClose}>Europe</MenuItem>
            <MenuItem onClick={handleClose}>Asia</MenuItem>
          </Menu>
        </Paper>
      </item>
      <item>
        <Paper elevation={2} className={styles.stackItem2}>
          <Typography
            weight="bolder"
            color="primary"
            variant="h6"
            mt={1}
            mb={1}
          >
            Help Center
          </Typography>
          <Button variant="contained">Logout</Button>
        </Paper>
      </item>
    </Stack>
  );
}
