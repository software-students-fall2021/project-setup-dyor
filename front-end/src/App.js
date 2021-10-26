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

// const Pages = [<DashboardPage />, <PortfolioPage />, <NewsPage />, <NFA />];
const Pages = [<DashboardPage />, <PortfolioPage />, <LandingPage />, <NFA />];
function App() {
  const [currentPage, setPage] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <TopBar></TopBar>
      {Pages[currentPage]}
      <BottomBar currentPage={currentPage} setCurrentPage={setPage}></BottomBar>
    
    </ThemeProvider>
  )
  }

export default App;
