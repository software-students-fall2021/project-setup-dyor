import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";
import TopBar from "./components/TopBar/TopBar";
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
      <TopBar />
      <PortfolioPage></PortfolioPage>
      <BottomBar></BottomBar>
    </ThemeProvider>
  );
}

export default App;
