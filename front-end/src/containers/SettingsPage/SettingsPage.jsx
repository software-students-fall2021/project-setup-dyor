import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Switch, Divider } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownMenu from "../../components/DropDownMenu/drop_down_menu";
import axios from "axios";
import "./SettingsPage.css";

const Currencies = ["$", "€", "£", "₣", "₵", "₹", "₨", "د.إ", "CAD", "¥"];

export default function SettingsPage({ logoutHandler }) {
  const [isSwitched, setIsSwitched] = React.useState(false);
  const [currency, setCurrency] = React.useState(
    localStorage.getItem("currency"),
  );

  React.useEffect(() => {
    if (isSwitched) {
      alert("Notifications on");
      localStorage.setItem("notification", "on");
    } else {
      localStorage.setItem("notification", "off");
    }
  }, [isSwitched]);

  const postCurrency = async (newCurr) => {
    const body = {
      old: currency,
      curr: newCurr,
      email: localStorage.getItem("email"),
    };
    await axios
      .put("/users/currency", body)
      .then((response) => {
        if (response.status === 200) {
          setCurrency(response.data.currency);
          localStorage.setItem("currency", response.data.currency);
        } else console.log("currency change unsuccessful");
      })
      .catch((err) => console.log(err));
  };

  const augmentedLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("email");
    logoutHandler();
  };

  return (
    <>
      <Box className="settings">
        <h2 className="settingsTitle">Settings</h2>
        <Paper className="settingsTile user" elevation={0}>
          <h4 className="userEmail">
            {localStorage.getItem("email") || "johndoe@dyor.com"}
          </h4>
          <Link className="link" to="/resetPassword">
            <IconButton
              className="settingsArrow"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Link>
        </Paper>
        <Paper className="settingsTile tools" elevation={0}>
          <Box className="setting notifications">
            <Box className="iconAndLabel">
              <NotificationsIcon className="notification-icon" />
              <span className="label">Notifications</span>
            </Box>
            <Switch
              className="handle"
              checked={isSwitched}
              onChange={() => setIsSwitched(!isSwitched)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Divider variant="inset" />
          <Box className="setting currency">
            <Box className="iconAndLabel">
              <LocalAtmIcon className="notification-icon" />
              <span className="label">Currency</span>
            </Box>
            <DropDownMenu
              className="handle"
              selectedValue={currency}
              options={Currencies}
              set={postCurrency}
            />
          </Box>
        </Paper>
        <Paper className="settingsTile user" elevation={0}>
          <Box className="iconAndLabel">
            <HelpCenterIcon className="notification-icon" />
            <h4 className="label">Help Center</h4>
          </Box>
          <IconButton
            className="settingsArrow"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link className="link" to="/helpCenter">
              <ArrowForwardIosIcon />
            </Link>
          </IconButton>
        </Paper>
        <Paper className="settingsTile user" elevation={0}>
          <h4 className="logout">Logout</h4>
          <IconButton
            className="settingsArrow"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link className="link" to="/">
              <LogoutIcon onClick={augmentedLogoutHandler} />
            </Link>
          </IconButton>
        </Paper>
        <Paper className="settingsTile user" elevation={0}>
          <h4 className="deleteAccount">Delete Account</h4>
          <IconButton
            className="settingsArrow"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/">
              <DeleteIcon onClick={logoutHandler} color="warning" />
            </Link>
          </IconButton>
        </Paper>
      </Box>
      <script src="https://js.pusher.com/4.1/pusher.min.js"></script>
    </>
  );
}
