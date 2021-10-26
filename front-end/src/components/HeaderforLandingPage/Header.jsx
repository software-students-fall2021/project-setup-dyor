import React, { useEffect, useState } from "react";
import { AppBar, Icon, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

//import { AppBar } from '@material-ui/core';
//import { Toolbar } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import { Link as Scroll } from "react-scroll";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Header({setSign}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div>
      <div className={classes.root} id="header">
        <AppBar className={classes.appbar} elevation={2}>
          <Toolbar className={classes.appbarWrapper}>
            <h1 className={classes.appbarTitle}>DYOR</h1>
            {/* <IconButton>
                        <AccountBalanceWalletIcon className = {classes.icon} />
                    </IconButton> */}
            <Scroll to="About_us" smooth={true}>
              <h3 className={classes.aboutus}> About Us</h3>
            </Scroll>
          </Toolbar>
        </AppBar>

        <Collapse
          in={checked}
          {...(checked ? { timeout: 1500 } : {})}
          collapseHeight={50}
        >
          <div className={classes.container}>
            <h1 className={classes.title}>
              WELCOME TO <br />{" "}
              <strong className={classes.Emphasis}> DYOR </strong> <br />
              Do Your Own Research
            </h1>
            <Stack spacing={2} direction="row">
              <Button onClick={()=> setSign(true)}
                variant="contained"
                size="large"
                className={classes.Button_root1}
              >
                Log-in
              </Button>
              <Button
                variant="contained"
                size="large"
                className={classes.Button_root2}
              >
                Sign-up
              </Button>
            </Stack>
            <Scroll to="Portfolio" smooth={true}>
              <IconButton>
                <KeyboardArrowDownIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // textAlign:'center',
    backgroundImage: `url(${process.env.PUBLIC_URL + "/front_elem3.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  appbar: {
    background: "#fff",
    opacity: "0.85",
    height: "10%",
  },
  appbarWrapper: {
    width: "100%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
    color: "#088F8F",
  },
  aboutus: {
    color: "#088F8F",
  },
  icon: {
    color: "#088F8F",
    fontSize: "2rem",
  },
  container: {
    textAlign: "justify",
    fontSize: "0.8rem",
  },
  title: {
    color: "#fff",
    lineHeight: "1.1",
    // fontSize: '2rem',
  },
  Emphasis: {
    fontSize: "3rem",
  },
  goDown: {
    color: "#fff",
    fontSize: "4rem",
  },
  Button_root1: {
    color: "#fff",
    width: "100%",
    height: "50px",
    border: "#fff",
    background: "#088f8f",
    border: "#fff",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  Button_root2: {
    color: "#088f8f",
    width: "100%",
    height: "50px",
    background: "#fff",
    border: "#fff",
    borderRadius: "10px",
    fontWeight: "bold",
  },
}));
