import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import {makeStyles} from '@material-ui/core/styles'
import Header from "./components/HeaderforLandingPage/Header";
import { Portfolio } from "./components/FeaturesforLandingPage/Portfolio";

import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";
import { CssBaseline } from "@material-ui/core";
// import Button from "@mui/material/Button";

const theme = createTheme({
    palette: {
        primary: {
            main: "#088F8F",
        },
        secondary: {
            main: "#0D98BA",
        },
    },
});

const useStyles = makeStyles((theme) => ({
  root:{
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_2.png"})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

  },
}));

function App() {
  const classes = useStyles();
  return (
    // <ThemeProvider theme={theme}>
    //   <PortfolioPage></PortfolioPage>
    //   <BottomBar></BottomBar>
    // </ThemeProvider>
    <div className = {classes.root}>
    <CssBaseline/>
    <Header />
    <Portfolio/>
  </div>
  );
}

export default App;
