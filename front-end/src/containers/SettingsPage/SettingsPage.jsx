import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { Switch, Divider } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LanguageIcon from "@mui/icons-material/Language";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownMenu from "../../components/DropDownMenu/drop_down_menu";
import "./SettingsPage.css";

const Currencies = ["$", "€", "£", "AED", "CAD", "¥"];
const regions = [
  "Africa",
  "Asia",
  "Central America",
  "Europe",
  "Middle East",
  "North America",
  "Carribean",
];

export default function SettingsPage({ logoutHandler }) {
  const [isSwitched, setIsSwitched] = React.useState(false);
  const [currency, setCurrency] = React.useState(Currencies[0]);
  const [region, setRegion] = React.useState("Asia");

  return (
    <Box className='settings'>
      <h2 className='settingsTitle'>Settings</h2>
      <Paper className='settingsTile user' elevation={3}>
        <h4 className='userEmail'>johndoe@dyor.com</h4>
        <Link className='link' to='/resetPassword'>
          <IconButton
            className='settingsArrow'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Link>
      </Paper>
      <Paper className='settingsTile tools' elevation={3}>
        <Box className='setting notifications'>
          <Box className='iconAndLabel'>
            <NotificationsIcon className='notification-icon' />
            <span className='label'>Notifications</span>
          </Box>
          <Switch
            className='handle'
            checked={isSwitched}
            onChange={() => setIsSwitched(!isSwitched)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
        <Divider variant='inset' />
        <Box className='setting currency'>
          <Box className='iconAndLabel'>
            <LocalAtmIcon className='notification-icon' />
            <span className='label'>Currency</span>
          </Box>
          <DropDownMenu
            className='handle'
            selectedValue={currency}
            options={Currencies}
            set={setCurrency}
          />
        </Box>
        <Divider variant='inset' />
        <Box className='setting regions'>
          <Box className='iconAndLabel'>
            <LanguageIcon className='notification-icon' />
            <span className='label'>News Region</span>
          </Box>
          <DropDownMenu
            className='handle'
            selectedValue={region}
            options={regions}
            set={setRegion}
          />
        </Box>
      </Paper>
      <Paper className='settingsTile user' elevation={3}>
        <Box className='iconAndLabel'>
          <HelpCenterIcon className='notification-icon' />
          <h4 className='label'>Help Center</h4>
        </Box>
        <IconButton
          className='settingsArrow'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}>
          <Link className='link' to='/helpCenter'>
            <ArrowForwardIosIcon />
          </Link>
        </IconButton>
      </Paper>
      <Paper className='settingsTile user' elevation={3}>
        <h4 className='logout'>Logout</h4>
        <IconButton
          className='settingsArrow'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}>
          <Link className='link' to='/'>
            <LogoutIcon onClick={logoutHandler} />
          </Link>
        </IconButton>
      </Paper>
      <Paper className='settingsTile user' elevation={3}>
        <h4 className='deleteAccount'>Delete Account</h4>
        <IconButton
          className='settingsArrow'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}>
          <Link to='/signupPage'>
            <DeleteIcon color='warning' />
          </Link>
        </IconButton>
      </Paper>
    </Box>
  );
}
