import * as React from "react";
import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";
import DashboardPage from "./containers/Dashboard/Dashboard";
import NewsPage from "./containers/NewsPage/newsPage";
import { PortfolioPage } from "./containers/PortfolioPage/PortfolioPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Pages = [<DashboardPage />, <PortfolioPage />, <NewsPage />, <PortfolioPage />]
function App() {
  const [currentPage, setPage] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      {Pages[currentPage]}
      <BottomBar currentPage={currentPage} setCurrentPage={setPage}></BottomBar>
    </ThemeProvider>
  );
}

export default App;
