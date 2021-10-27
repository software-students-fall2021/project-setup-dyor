import NFA from "./containers/NFA/NFA";
import * as React from "react";
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
        setLoggedIn(() => false);
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {isLoggedIn && <TopBar></TopBar>}
                    <Switch>
                        <Route path="/dashboard">
                            <DashboardPage />
                        </Route>
                        <Route path="/portfolio">
                            <PortfolioPage />
                        </Route>
                        <Route path="/news">
                            <NewsPage />
                        </Route>
                        <Route path="/nfa">
                            <NFA />
                        </Route>
                        <Route
                            path="/coinDetails:id"
                            component={IndividualCoinPage}
                        ></Route>
                        <Route path="/loginPage">
                            <LoginPage loginHandler={loginHandler}></LoginPage>
                        </Route>
                        <Route path="/signupPage">
                            <SignupPage
                                loginHandler={loginHandler}
                            ></SignupPage>
                        </Route>
                        <Route path="/settings">
                            <SettingsPage logoutHandler={logoutHandler} />
                        </Route>
                        <Route path="/resetPassword">
                            <ResetPassword />
                        </Route>
                        <Route path="/helpCenter">
                            <HelpCenterPage />
                        </Route>
                        <Route path="/">
                            <LandingPage />
                        </Route>
                    </Switch>
                    {isLoggedIn && <BottomBar></BottomBar>}
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
