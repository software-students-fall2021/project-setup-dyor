import TradingViewWidget from "react-tradingview-widget";
import { Box } from "@mui/system";
import Paper from "@material-ui/core/Paper";

export const LiveChartContainer = (props) => {
  const coinName = props.coinName;

  let coinArg = coinName.toUpperCase() + "USDT";
  return (
    <Paper elevation={2} style={{ borderRadius: "15px" }}>
      <TradingViewWidget symbol={coinArg} width="320" height="300" style="1" />
    </Paper>
  );
};
