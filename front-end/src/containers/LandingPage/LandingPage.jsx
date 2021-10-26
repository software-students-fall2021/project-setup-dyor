import React from "react";
import { makeStyles } from "@mui/styles";
import Header from "../../components/HeaderforLandingPage/Header";
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

const LandingPage = ({setSign}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header setSign={setSign}/>
      <PortfolioCard />
    </div>
  );
};

export default LandingPage;
