import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import "./App.css";
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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <PortfolioPage></PortfolioPage>
        </ThemeProvider>
    );
}

export default App;
