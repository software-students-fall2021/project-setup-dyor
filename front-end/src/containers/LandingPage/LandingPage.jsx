import React from "react";
import axios from "axios";
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

const LandingPage = () => {
  const classes = useStyles();

  React.useEffect(() => {
    const getArticles = async () => {
    await axios
      .put("/news")
      .then((res) => {
        console.log("Asset news called successfully");
      })
      .catch((err) => {
        console.log(err.response);
      });
    
    await axios
      .put("/reddit")
      .then((res) => {
        console.log("Asset reddit called successfully");
      })
      .catch((err) => {
        console.log(err.response);
      });
    }
    getArticles();
  }, [])
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PortfolioCard />
    </div>
  );
};

export default LandingPage;
