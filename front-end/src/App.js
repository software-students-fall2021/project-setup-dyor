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

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
                {isLoggedIn && (
                    <BrowserRouter>
                        <TopBar></TopBar>
                        <Switch>
                            <Route exact path="/">
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
                            <Route
                                path="/loginPage"
                                component={LoginPage}
                            ></Route>
                        </Switch>
                        <BottomBar></BottomBar>
                    </BrowserRouter>
                )}
                {!isLoggedIn && <LandingPage setSign={setLoggedIn} />}
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
