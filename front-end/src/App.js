import NFA from "./containers/NFA/NFA";
import * as React from "react";
import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";
import DashboardPage from "./containers/Dashboard/Dashboard";
import NewsPage from "./containers/NewsPage/newsPage";
import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

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

const Pages = [
    <DashboardPage />,
    <PortfolioPage />,
    <NewsPage />,
    <PortfolioPage />,
];
function App() {
    const [currentPage, setPage] = React.useState(0);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <ThemeProvider theme={theme}>
                {Pages[currentPage]}
                <BottomBar
                    currentPage={currentPage}
                    setCurrentPage={setPage}
                ></BottomBar>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
