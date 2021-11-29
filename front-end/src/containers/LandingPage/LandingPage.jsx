import React from "react";
import {Redirect} from "react-router-dom";
// import axios from "axios";
import { makeStyles } from "@mui/styles";
import Header from "../../components/HeaderforLandingPage/Header";
import { CircularProgress } from "@mui/material";
import { PortfolioCard } from "../../components/FeaturesforLandingPage/PortfolioCard";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_2.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(undefined);

  React.useEffect(() => {
    console.log("Is user loggedIn", localStorage.getItem("isLoggedIn"));
    console.log("Is localStorage same three", localStorage.getItem("isLoggedIn")=== "true");
    if (localStorage.getItem("isLoggedIn") === "true"){
      console.log("logged In");
      setLoggedIn(true);
    } else {
      console.log("Not logged in");
      setLoggedIn(false);
    }
  }, []);
  
  React.useEffect(() => {
    console.log("loading off now");
    setLoading(false);
  }, [isLoggedIn]);
  
  return (
    <>
      {isLoading ? (
        <div className="circularProgress">
          <CircularProgress
            className="progressBar"
            size={100}
            thickness={2.0}
          />
        </div>
      ) : (
        <>
        {isLoggedIn ? (
          <Redirect to = "/dashboard" />
          ): (
            <div className={classes.root}>
            <CssBaseline />
            <Header />
            <PortfolioCard />
          </div>
          )
        }
        </>
      )
    }
    </>
  );
};

export default LandingPage;

