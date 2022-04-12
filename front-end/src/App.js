import NFA from "./containers/NFA/NFA";
import React, { useEffect } from "react";
import axios from "axios";
import DashboardPage from "./containers/Dashboard/Dashboard";
import NewsPage from "./containers/NewsPage/newsPage";
import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./components/TopBar/TopBar";
import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";
import LandingPage from "./containers/LandingPage/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import IndividualCoinPage from "./containers/IndividualCoinPage/IndividualCoinPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import SettingsPage from "./containers/SettingsPage/SettingsPage";
import SignupPage from "./containers/SignupPage/SignupPage";
import HelpCenterPage from "./containers/HelpCenterPage/HelpCenterPage";
import ResetPassword from "./containers/ResetPasswordPage/ResetPassword";
import Footer from "./components/Footer/footer";

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

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const loginHandler = () => {
    console.log("LOGGING IN");
    setLoggedIn(() => true);
  };

  const logoutHandler = () => {
    console.log("LOGGING OUT");

    setLoggedIn(false);
  };

  // check everytime the page render if the user is logged in or not (compare the token from the local storage)
  useEffect(() => {
    axios("/signedinuser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.id) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              {isLoggedIn && (
                <>
                  <TopBar></TopBar>
                  <DashboardPage />
                  <BottomBar></BottomBar>
                </>
              )}
            </Route>
            <Route path="/portfolio">
              {isLoggedIn && (
                <>
                  <TopBar></TopBar>
                  <PortfolioPage />
                  <BottomBar></BottomBar>
                </>
              )}
            </Route>
            <Route path="/news">
              {isLoggedIn && (
                <>
                  <TopBar></TopBar>
                  <NewsPage />
                  <BottomBar></BottomBar>
                </>
              )}
            </Route>
            <Route path="/nfa">
              {isLoggedIn && (
                <>
                  <TopBar></TopBar>
                  <NFA />
                  <BottomBar></BottomBar>
                </>
              )}
            </Route>
            <Route path="/coinDetails/:assetID/:coinSymbol">
              {isLoggedIn && (
                <>
                  <TopBar></TopBar>
                  <IndividualCoinPage />
                  <BottomBar></BottomBar>
                </>
              )}
            </Route>
            <Route path="/loginPage">
              <LoginPage loginHandler={loginHandler}></LoginPage>
            </Route>
            <Route path="/signupPage">
              <SignupPage loginHandler={loginHandler}></SignupPage>
            </Route>
            <Route path="/settings">
              <TopBar></TopBar>
              <SettingsPage logoutHandler={logoutHandler} />
              <BottomBar></BottomBar>
            </Route>
            <Route path="/resetPassword">
              <ResetPassword />
            </Route>
            <Route path="/helpCenter">
              <TopBar></TopBar>
              <HelpCenterPage />
            </Route>
            <Route path="/landingPage">
              <LandingPage />
              <Footer />
            </Route>
            <Route path="/">
              <LandingPage />
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
